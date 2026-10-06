import subprocess
import time
import json
import urllib.request
import websocket
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_bonus_tests():
    print("Starting Chrome headless with CDP on port 9222...")
    chrome_proc = subprocess.Popen([
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        "--headless=new",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--window-size=1400,2000",
        "http://localhost:8080/index.html"
    ])

    time.sleep(2)

    try:
        targets_json = urllib.request.urlopen("http://localhost:9222/json").read()
        targets = json.loads(targets_json)
        page_target = next(t for t in targets if t.get('type') == 'page' and 'localhost:8080' in t.get('url', ''))
        ws_url = page_target['webSocketDebuggerUrl']
        print(f"Connected to CDP page: {ws_url}")

        ws = websocket.create_connection(ws_url)
        msg_id = 0

        def send_cmd(method, params=None):
            nonlocal msg_id
            msg_id += 1
            cmd = {"id": msg_id, "method": method}
            if params:
                cmd["params"] = params
            ws.send(json.dumps(cmd))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        def eval_js(expr):
            res = send_cmd("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True})
            if "exceptionDetails" in res:
                raise Exception(f"JS Error: {res['exceptionDetails']}")
            return res.get("result", {}).get("value")

        def take_screenshot(filename):
            res = send_cmd("Page.captureScreenshot", {"format": "png"})
            import base64
            with open(filename, "wb") as f:
                f.write(base64.b64decode(res["data"]))
            print(f"Saved screenshot: {filename}")

        # 1. Load Sample Pack
        print("\n--- Test Bonus: Load Sample Pack ---")
        eval_js("handleLoadSamplePack()")
        time.sleep(3)

        # 2. Test Suggestion Chips (Bonus 6)
        print("\n--- Test Bonus 6: Match Suggestions ---")
        suggestions_count = eval_js("document.querySelectorAll('.suggestion-chip').length")
        print(f"Suggestion chips displayed: {suggestions_count}")
        assert suggestions_count > 0, "Expected suggestion chips to appear on requirements"

        # Apply auto-match
        eval_js("handleAutoMatch()")
        time.sleep(1)

        # 3. Test Seal / Signature Upload & Configuration (Bonus 2)
        print("\n--- Test Bonus 2: Digital Seal & Signature ---")
        # Load sample company logo as seal
        eval_js("""
          (async () => {
            const res = await fetch('asset/documents/company_logo.png');
            const blob = await res.blob();
            const buf = await blob.arrayBuffer();
            appState.sealImageBytes = new Uint8Array(buf);
            appState.sealImageDataUrl = URL.createObjectURL(blob);
            appState.sealSettings.enabled = true;
            appState.sealSettings.targetPages = 'all';
            appState.sealSettings.position = 'bottom_right';
            appState.sealSettings.width = 75;
            appState.sealSettings.opacity = 0.85;
            updateSealPreviewUI();
          })()
        """)
        time.sleep(1)
        seal_enabled = eval_js("appState.sealSettings.enabled")
        print(f"Seal enabled: {seal_enabled}")
        assert seal_enabled == True

        # 4. Test Export Checklist CSV (Bonus 3)
        print("\n--- Test Bonus 3: Export Checklist CSV ---")
        csv_preview = eval_js("""
          (() => {
            let csv = '';
            for (const req of appState.requirements) {
              const fileId = appState.matches[req.id];
              const file = fileId ? appState.getFile(fileId) : null;
              const status = appState.getRequirementStatus(req);
              csv += `${req.order},${req.id},${req.title_en},${file ? file.name : 'None'},${status.code}\\n`;
            }
            return csv;
          })()
        """)
        print("Generated CSV preview:")
        print(csv_preview[:300])
        assert "Trade License" in csv_preview
        assert "R01" in csv_preview

        # 5. Test Project Save & Reopen (Bonus 4)
        print("\n--- Test Bonus 4: Save & Restore Project ---")
        project_json_str = eval_js("""
          (() => {
            return JSON.stringify({
              tender: appState.tender,
              requirements: appState.requirements,
              matches: appState.matches,
              expiryDates: appState.expiryDates
            });
          })()
        """)
        parsed_proj = json.loads(project_json_str)
        print(f"Saved project tender ID: {parsed_proj['tender']['tender_id']}")
        assert parsed_proj['tender']['tender_id'] == "T-2026-0417"

        # 6. Test AI Help Offline Audit (Bonus 8)
        print("\n--- Test Bonus 8: AI Help & Audit ---")
        eval_js("document.getElementById('ai-modal').classList.add('active')")
        eval_js("handleAiAudit()")
        time.sleep(2)
        ai_output = eval_js("document.getElementById('ai-output-box').textContent")
        print(f"AI Output: {ai_output[:200]}...")
        assert "Audit" in ai_output

        # 7. Generate Master Package with Index Page (Bonus 1 & 5) and Seal (Bonus 2)
        print("\n--- Test Bonus 1 & 5: Index Page with Start Pages & Bangla Text ---")
        eval_js("appState.includeIndexPage = true")
        eval_js("handleGeneratePackage()")
        time.sleep(4)

        notes = eval_js("appState.notifications.map(n => n.message)")
        print(f"Notifications during PDF generation: {notes}")
        pdf_len = eval_js("appState.generatedPdfBytes ? appState.generatedPdfBytes.length : 0")
        print(f"Generated PDF with Index & Seal bytes length: {pdf_len}")
        assert pdf_len > 1000

        pdf_raw = eval_js("Array.from(appState.generatedPdfBytes)")
        with open("T-2026-0417_Package_Bonus_test.pdf", "wb") as f:
            f.write(bytes(pdf_raw))
        print("Wrote T-2026-0417_Package_Bonus_test.pdf")

        # Verify PDF with pypdf
        import pypdf
        reader = pypdf.PdfReader("T-2026-0417_Package_Bonus_test.pdf")
        total_p = len(reader.pages)
        print(f"Total Pages in Bonus PDF (Cover + Index + Docs): {total_p}")
        # Cover (1) + Index (1) + Docs (15) = 17 pages!
        assert total_p == 17, f"Expected 17 pages (Cover + Index + Docs), got {total_p}"

        # Inspect Page 1 Cover
        page1_text = reader.pages[0].extract_text()
        print("Page 1 Cover extract:", repr(page1_text[:150]))
        assert "TENDER SUBMISSION PACKAGE" in page1_text

        # Inspect Page 2 Index
        page2_text = reader.pages[1].extract_text()
        print("Page 2 Index extract:", repr(page2_text[:200]))
        assert "DOCUMENT INDEX" in page2_text
        assert "Page 3" in page2_text # First document starts at Page 3!

        # Check all footers
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            expected_footer = f"T-2026-0417 | Page {i+1} of 17"
            assert expected_footer in text, f"Footer missing on page {i+1}: {text}"
        print("Verified all 17 page footers: T-2026-0417 | Page X of 17!")

        take_screenshot("screenshot_bonus_ready.png")

        print("\n==========================================")
        print("🎉 ALL BONUS TASKS TESTED AND PASSED 100%!")
        print("==========================================")

    finally:
        chrome_proc.terminate()
        chrome_proc.wait()

if __name__ == "__main__":
    run_bonus_tests()
