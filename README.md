# devfest-0242310005101810

# TenderPacker — Tender Document Preparation, Validation & Compilation Engine

A 100% frontend, in-browser tender package preparation, compliance verification, and PDF compilation system built for competitive tender submissions.

---

## 🌟 Architectural Guarantees & Constraints Compliance

- **100% Client-Side / Browser-Only**: No server-side document upload, no backend database, no online file storage. All parsing, SHA-256 duplicate hashing, page extraction, expiry validation, and PDF generation execute strictly in the browser.
- **Offline Ready**: Bundled offline vendor libraries (`pdf-lib` and `pdf.js`) with automatic CDN fallbacks.
- **Bilingual Interface**: Instant switching between **English** and **বাংলা** (Bangla), with document titles dynamically sourced from `title_en` and `title_bn`.
- **Tender Status Rules Engine**: Real-time evaluation of `Missing`, `Expiry date needed`, `Expired`, `Not provided`, and `OK` states.
- **Duplicate Detection**: Cryptographic SHA-256 binary hashing identifies identical files and blocks assigning duplicates to multiple requirements.
- **Tender Package Rules**:
  1. **Page 1 Cover Page (in English)**: Tender ID, Title, Procuring Entity, Bidder, Deadline, Creation Date, and Table of Contents in order.
  2. **Page 2 Index Page**: Shows where each document starts in the package, page ranges, and high-DPI rendered Bangla titles.
  3. **Original Document Order**: Documents attached sequentially after the index. Optional documents without a matched file are skipped.
  4. **Universal Footer**: `<tender_id> | Page X of Y` cleanly stamped on every single page (including Cover and Index) with high contrast and zero content overlap.
  5. **Standard Output Filename**: `<tender_id>_Package.pdf` (e.g. `T-2026-0417_Package.pdf`).

---

## 🚀 How to Run Locally

### Option 1: Local HTTP Server (Recommended)
```bash
python -m http.server 8080
```
Open Google Chrome and navigate to:
```
http://localhost:8080/index.html
```

### Option 2: Direct File Open
Double click or open `index.html` directly in Google Chrome:
```
file:///c:/Users/Administrator/Downloads/arif/index.html
```
*(Pre-embedded fallback data ensures complete functionality even without a local web server).*

---

## 📋 Main Tasks Checklist (100% Completed & Verified)

| # | Task | Description | Status |
| :---: | :--- | :--- | :---: |
| **1** | **Load the list** | Open `requirements.json`, show tender details & requirements sorted by order. | ✅ Done |
| **2** | **Upload files** | Multi-PDF upload, show name & pages, reject non-PDFs, allow file removal. | ✅ Done |
| **3** | **Match files** | 1-to-1 matching (1 file ↔ 1 document), change/undo match anytime. | ✅ Done |
| **4** | **Enter expiry dates** | Date picker for `has_expiry = true` matched documents (`YYYY-MM-DD`). | ✅ Done |
| **5** | **Check everything** | Real-time statuses: Missing, Expiry date needed, Expired, Not provided, OK. | ✅ Done |
| **6** | **Find duplicates** | SHA-256 detection, marks duplicates, prevents matching to different docs. | ✅ Done |
| **7** | **Make package** | Generate button disabled on blocking status with reason list; compiles when clear. | ✅ Done |
| **8** | **Download** | Downloads package as `<tender_id>_Package.pdf`. | ✅ Done |
| **9** | **Two languages** | Switch entire app between English and Bangla (`title_en` / `title_bn`). | ✅ Done |

---

## 🏆 Bonus Tasks Checklist (100% Completed & Verified)

| Bonus Task | Feature & Implementation Details | Status |
| :--- | :--- | :---: |
| **Index page after cover** | Generates an Index Page right after the Cover page showing the starting page number (e.g. "Starts at Page 3") and page range for each included document. | ✅ Done |
| **Seal or signature** | Upload a PNG image (or use sample company logo) and stamp it on chosen pages (All, Cover & Index, First page of each doc, or Custom pages) with position, width, and opacity controls. | ✅ Done |
| **Export checklist** | Export checklist to CSV/Excel (`<tender_id>_Checklist.csv`) with UTF-8 BOM encoding so Bangla and English text render clearly in Microsoft Excel. | ✅ Done |
| **Save & reopen work** | Auto-saves progress in browser storage; export/import complete `.json` project file restoring all uploaded PDF buffers, matches, expiry dates, and seal settings. | ✅ Done |
| **Bangla text on PDF** | Renders crisp Bangla font typography on the PDF Index page via high-DPI canvas PNG rasterization, eliminating WinAnsi font limitations and ensuring accurate ligatures (যুক্তবর্ণ). | ✅ Done |
| **Auto-match suggestions** | Intelligent filename keyword matcher displays suggestion chips (e.g., `💡 Suggest: trade_license_2026.pdf [✓]`) on each requirement row and supports 1-click Auto-Match All. | ✅ Done |
| **Handle bad files safely** | Encrypted or corrupted PDFs are caught gracefully and rejected with a clear warning without crashing the batch processing pipeline. | ✅ Done |
| **AI help (User API Key)** | AI Tender Advisor & Auditor modal allowing user to provide their own Gemini API key (Rulebook Section 5.5) for compliance audits, date advice, and interactive guidance, with offline fallback. | ✅ Done |

---

## 🧪 Automated Testing

Two automated Chrome DevTools Protocol (CDP) test suites are provided:
1. `test_suite.py`: Verifies all 9 main tasks, status transitions, duplicate constraints, and running footers.
2. `test_bonus_suite.py`: Verifies all bonus tasks including Index page, Seal placement, CSV export, Project JSON persistence, Bangla canvas rendering, and AI help.

Run tests via:
```bash
python test_suite.py
python test_bonus_suite.py
```
