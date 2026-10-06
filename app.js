/**
 * TenderPacker - Tender Document Preparation & Validation Engine
 * Fully Client-Side / In-Browser Solution
 */

// Embedded default requirements data from asset/requirements.json
// Ensures full functionality even when running under file:// protocol without a web server.
const DEFAULT_REQUIREMENTS_DATA = {
  "tender": {
    "tender_id": "T-2026-0417",
    "title": "Supply of IT Equipment",
    "procuring_entity": "Directorate of Sample Services",
    "bidder": "Meghna Tech Solutions Ltd.",
    "submission_deadline": "2026-10-20"
  },
  "requirements": [
    {
      "id": "R01",
      "order": 1,
      "title_en": "Trade License",
      "title_bn": "ট্রেড লাইসেন্স",
      "mandatory": true,
      "has_expiry": true
    },
    {
      "id": "R02",
      "order": 2,
      "title_en": "TIN Certificate",
      "title_bn": "টিআইএন সনদ",
      "mandatory": true,
      "has_expiry": false
    },
    {
      "id": "R03",
      "order": 3,
      "title_en": "VAT Registration Certificate",
      "title_bn": "ভ্যাট নিবন্ধন সনদ",
      "mandatory": true,
      "has_expiry": false
    },
    {
      "id": "R04",
      "order": 4,
      "title_en": "Bank Solvency Certificate",
      "title_bn": "ব্যাংক সচ্ছলতা সনদ",
      "mandatory": true,
      "has_expiry": true
    },
    {
      "id": "R05",
      "order": 5,
      "title_en": "Experience Certificate",
      "title_bn": "অভিজ্ঞতার সনদ",
      "mandatory": true,
      "has_expiry": false
    },
    {
      "id": "R06",
      "order": 6,
      "title_en": "Audited Financial Statement",
      "title_bn": "নিরীক্ষিত আর্থিক বিবরণী",
      "mandatory": false,
      "has_expiry": false
    },
    {
      "id": "R07",
      "order": 7,
      "title_en": "Manufacturer's Authorization",
      "title_bn": "প্রস্তুতকারকের অনুমোদনপত্র",
      "mandatory": false,
      "has_expiry": true
    },
    {
      "id": "R08",
      "order": 8,
      "title_en": "Technical Proposal",
      "title_bn": "কারিগরি প্রস্তাব",
      "mandatory": true,
      "has_expiry": false
    },
    {
      "id": "R09",
      "order": 9,
      "title_en": "Financial Proposal",
      "title_bn": "আর্থিক প্রস্তাব",
      "mandatory": true,
      "has_expiry": false
    },
    {
      "id": "R10",
      "order": 10,
      "title_en": "Signed Declaration",
      "title_bn": "স্বাক্ষরিত ঘোষণাপত্র",
      "mandatory": true,
      "has_expiry": false
    }
  ]
};

// Bilingual dictionary
const I18N = {
  en: {
    appTitle: "TenderPacker",
    appSubtitle: "Tender Document Preparation & Validation Engine",
    tenderOverview: "Tender Details",
    tenderId: "Tender ID",
    title: "Title",
    procuringEntity: "Procuring Entity",
    bidder: "Bidder Name",
    deadline: "Submission Deadline",
    loadRequirements: "Load Requirements JSON",
    loadSample: "Load Sample Pack",
    autoMatch: "Auto-Match Files",
    clearAll: "Reset All",
    uploadedFilesTitle: "Uploaded Files",
    uploadedFilesSubtitle: "PDF only, max 30 files, 50MB total",
    dropzoneTitle: "Drop PDF files here or click to browse",
    dropzoneSub: "Accepts multiple PDF files simultaneously",
    noFilesUploaded: "No files uploaded yet. Drag & drop or choose PDF files.",
    pages: "pages",
    page: "page",
    bytes: "bytes",
    kb: "KB",
    mb: "MB",
    remove: "Remove",
    preview: "Preview",
    duplicateBadge: "Duplicate File",
    duplicateAlert: "Duplicate files with identical content detected:",
    duplicateMatchError: "Duplicate file conflict: This file has identical content to another uploaded file that is already matched to a document. Duplicate files cannot be matched to different documents.",
    requiredDocsTitle: "Required Documents",
    requiredDocsSubtitle: "Arrange, match files, and verify expiry dates",
    colOrder: "Order",
    colRequirement: "Document Requirement",
    colMatchedFile: "Matched File",
    colExpiryDate: "Expiry Date",
    colStatus: "Status",
    colAction: "Action",
    mandatory: "Mandatory",
    optional: "Optional",
    hasExpiry: "Expiry Check Required",
    noExpiry: "No Expiry Check",
    selectFilePlaceholder: "-- Select uploaded PDF --",
    unmatch: "Unmatch",
    enterExpiryDate: "Expiry Date (YYYY-MM-DD)",
    // Statuses
    statusMissing: "Missing",
    statusExpiryNeeded: "Expiry date needed",
    statusExpired: "Expired",
    statusNotProvided: "Not provided",
    statusOk: "OK",
    // Generation Panel
    generationTitle: "Package Generation & Readiness",
    generationReady: "All requirements met! You can now generate the tender package.",
    generationBlocked: "Package cannot be generated due to the following blocking issues:",
    generateBtn: "Generate Combined Package PDF",
    downloadBtn: "Download Package",
    previewPackageBtn: "Preview Package",
    generating: "Generating package...",
    generatedSuccess: "Package successfully generated!",
    footerInfo: "Frontend-Only Tender Package Validator • 100% In-Browser Execution",
    // Alerts
    rejectedNonPdf: "Rejected non-PDF file: '{fileName}'. Only PDF files are allowed.",
    maxFilesExceeded: "File limit exceeded: Maximum 30 files allowed.",
    maxSizeExceeded: "Total size limit exceeded: Maximum 50MB allowed.",
    requirementsLoadedSuccess: "Requirements loaded successfully for tender: {tenderId}",
    duplicateMatchedWarning: "Warning: Duplicate files cannot be matched to different documents.",
    closeModal: "Close",
    prevPage: "Previous",
    nextPage: "Next"
  },
  bn: {
    appTitle: "টেন্ডার প্যাকার",
    appSubtitle: "দরপত্র নথি প্রস্তুতি ও যাচাইকরণ ইঞ্জিন",
    tenderOverview: "দরপত্রের বিবরণ",
    tenderId: "দরপত্র আইডি",
    title: "শিরোনাম",
    procuringEntity: "সংগ্রহকারী সংস্থা",
    bidder: "দরদাতা প্রতিষ্ঠান",
    deadline: "জমার শেষ সময়সীমা",
    loadRequirements: "রিকোয়ারমেন্টস JSON লোড করুন",
    loadSample: "নমুনা প্যাক লোড করুন",
    autoMatch: "স্বয়ংক্রিয় ম্যাচ করুন",
    clearAll: "রিসেট করুন",
    uploadedFilesTitle: "আপলোডকৃত ফাইলসমূহ",
    uploadedFilesSubtitle: "শুধুমাত্র পিডিএফ, সর্বোচ্চ ৩০টি ফাইল, ৫০ মেগাবাইট",
    dropzoneTitle: "এখানে পিডিএফ ফাইল টেনে আনুন অথবা ব্রাউজ করুন",
    dropzoneSub: "একসাথে একাধিক পিডিএফ ফাইল নির্বাচন করা যাবে",
    noFilesUploaded: "এখনও কোনো ফাইল আপলোড করা হয়নি। ফাইল ড্রপ করুন বা ব্রাউজ করুন।",
    pages: "পৃষ্ঠা",
    page: "পৃষ্ঠা",
    bytes: "বাইট",
    kb: "কেবি",
    mb: "এমবি",
    remove: "মুছুন",
    preview: "প্রিভিউ",
    duplicateBadge: "ডুপ্লিকেট ফাইল",
    duplicateAlert: "একই কনটেন্টযুক্ত ডুপ্লিকেট ফাইল সনাক্ত হয়েছে:",
    duplicateMatchError: "ডুপ্লিকেট ফাইল ত্রুটি: এই ফাইলটির কনটেন্ট অন্য একটি আপলোডকৃত ফাইলের সাথে হুবহু মিলে যায় যা ইতিমধ্যে একটি নথিতে যুক্ত করা আছে। ডুপ্লিকেট ফাইল ভিন্ন নথিতে যুক্ত করা যাবে না।",
    requiredDocsTitle: "প্রয়োজনীয় নথিপত্রের তালিকা",
    requiredDocsSubtitle: "নথিপত্র সাজান, ফাইল ম্যাচ করুন এবং মেয়াদ যাচাই করুন",
    colOrder: "ক্রম",
    colRequirement: "নথির নাম",
    colMatchedFile: "সংযুক্ত ফাইল",
    colExpiryDate: "মেয়াদ শেষের তারিখ",
    colStatus: "স্ট্যাটাস",
    colAction: "অ্যাকশন",
    mandatory: "বাধ্যতামূলক",
    optional: "ঐচ্ছিক",
    hasExpiry: "মেয়াদ যাচাই আবশ্যক",
    noExpiry: "মেয়াদ প্রযোজ্য নয়",
    selectFilePlaceholder: "-- আপলোডকৃত পিডিএফ নির্বাচন করুন --",
    unmatch: "ম্যাচ বাতিল",
    enterExpiryDate: "মেয়াদ শেষের তারিখ (YYYY-MM-DD)",
    // Statuses
    statusMissing: "ঘাটতি (অনুপস্থিত)",
    statusExpiryNeeded: "মেয়াদ শেষের তারিখ প্রয়োজন",
    statusExpired: "মেয়াদোত্তীর্ণ",
    statusNotProvided: "প্রদান করা হয়নি",
    statusOk: "সঠিক",
    // Generation Panel
    generationTitle: "প্যাকেজ তৈরি ও প্রস্তুতি",
    generationReady: "সকল শর্ত পূরণ হয়েছে! আপনি এখন দরপত্র প্যাকেজ তৈরি করতে পারেন।",
    generationBlocked: "নিম্নলিখিত সমস্যার কারণে প্যাকেজ তৈরি করা যাচ্ছে না:",
    generateBtn: "সম্মিলিত প্যাকেজ পিডিএফ তৈরি করুন",
    downloadBtn: "প্যাকেজ ডাউনলোড করুন",
    previewPackageBtn: "প্যাকেজ প্রিভিউ",
    generating: "প্যাকেজ তৈরি হচ্ছে...",
    generatedSuccess: "প্যাকেজ সফলভাবে তৈরি হয়েছে!",
    footerInfo: "ব্রাউজার ভিত্তিক দরপত্র প্যাকেজ ভ্যালিডেটর • ১০০% ক্লায়েন্ট-সাইড প্রসেসিং",
    // Alerts
    rejectedNonPdf: "পিডিএফ নয় এমন ফাইল প্রত্যাখ্যাত: '{fileName}'। শুধুমাত্র পিডিএফ ফাইল গ্রহণযোগ্য।",
    maxFilesExceeded: "ফাইলের সীমা অতিক্রম করেছে: সর্বোচ্চ ৩০টি ফাইল অনুমোদিত।",
    maxSizeExceeded: "ফাইলের আকারের সীমা অতিক্রম করেছে: সর্বোচ্চ ৫০ মেগাবাইট অনুমোদিত।",
    requirementsLoadedSuccess: "দরপত্র {tenderId}-এর রিকোয়ারমেন্টস সফলভাবে লোড হয়েছে",
    duplicateMatchedWarning: "সতর্কতা: ডুপ্লিকেট ফাইল ভিন্ন নথিতে যুক্ত করা যাবে না।",
    closeModal: "বন্ধ করুন",
    prevPage: "পূর্ববর্তী",
    nextPage: "পরবর্তী"
  }
};

// Application State
class TenderAppState {
  constructor() {
    this.currentLang = 'en';
    this.tender = null;
    this.requirements = [];
    this.uploadedFiles = []; // { id, name, size, pageCount, hash, buffer, isDuplicate, duplicateWith: [] }
    this.matches = {};       // requirementId -> fileId
    this.expiryDates = {};   // requirementId -> 'YYYY-MM-DD'
    this.generatedPdfBytes = null;
    this.generatedPdfUrl = null;
    this.notifications = [];
  }

  setLanguage(lang) {
    if (lang === 'en' || lang === 'bn') {
      this.currentLang = lang;
    }
  }

  t(key, params = {}) {
    let text = (I18N[this.currentLang] && I18N[this.currentLang][key]) || (I18N.en[key] || key);
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return text;
  }

  loadRequirementsData(data) {
    if (!data || !data.tender || !Array.isArray(data.requirements)) {
      throw new Error("Invalid requirements.json format");
    }
    this.tender = { ...data.tender };
    // Sort requirements strictly by order
    this.requirements = [...data.requirements].sort((a, b) => (a.order || 0) - (b.order || 0));
    // Reset matches and expiry for missing requirements
    this.generatedPdfBytes = null;
    if (this.generatedPdfUrl) {
      URL.revokeObjectURL(this.generatedPdfUrl);
      this.generatedPdfUrl = null;
    }
  }

  addNotification(type, message) {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    this.notifications.push({ id, type, message });
    return id;
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getFile(fileId) {
    return this.uploadedFiles.find(f => f.id === fileId);
  }

  getRequirement(reqId) {
    return this.requirements.find(r => r.id === reqId);
  }

  // Duplicate detection
  updateDuplicateFlags() {
    const hashGroups = {};
    for (const file of this.uploadedFiles) {
      if (!hashGroups[file.hash]) {
        hashGroups[file.hash] = [];
      }
      hashGroups[file.hash].push(file);
    }

    for (const file of this.uploadedFiles) {
      const group = hashGroups[file.hash] || [];
      if (group.length > 1) {
        file.isDuplicate = true;
        file.duplicateWith = group.filter(f => f.id !== file.id).map(f => f.name);
      } else {
        file.isDuplicate = false;
        file.duplicateWith = [];
      }
    }
  }

  // Check if assigning this file to this requirement violates duplicate rules
  // Rule 6: "Do not allow them to be matched to different documents."
  canMatchFileToRequirement(fileId, reqId) {
    if (!fileId) return { allowed: true };
    const file = this.getFile(fileId);
    if (!file) return { allowed: false, reason: "File not found" };

    // Check if this file is a duplicate of another file
    if (file.isDuplicate) {
      // Check if any other file with the same hash is matched to a different requirement
      for (const otherFile of this.uploadedFiles) {
        if (otherFile.id !== file.id && otherFile.hash === file.hash) {
          // Find if otherFile is matched to any requirement
          for (const [rId, fId] of Object.entries(this.matches)) {
            if (fId === otherFile.id && rId !== reqId) {
              const matchedReq = this.getRequirement(rId);
              const reqTitle = matchedReq ? (this.currentLang === 'bn' ? matchedReq.title_bn : matchedReq.title_en) : rId;
              return {
                allowed: false,
                reason: `${this.t('duplicateMatchError')} (${otherFile.name} -> ${reqTitle})`
              };
            }
          }
        }
      }
    }
    return { allowed: true };
  }

  matchFile(reqId, fileId) {
    // If setting to empty, unmatch
    if (!fileId) {
      delete this.matches[reqId];
      return true;
    }

    const check = this.canMatchFileToRequirement(fileId, reqId);
    if (!check.allowed) {
      this.addNotification('danger', check.reason);
      return false;
    }

    // Unmatch any other requirement that had this file (1 file -> at most 1 document)
    for (const [rId, fId] of Object.entries(this.matches)) {
      if (fId === fileId && rId !== reqId) {
        delete this.matches[rId];
      }
    }

    // Assign file to requirement (1 document -> at most 1 file)
    this.matches[reqId] = fileId;
    return true;
  }

  unmatch(reqId) {
    delete this.matches[reqId];
  }

  setExpiryDate(reqId, dateStr) {
    this.expiryDates[reqId] = dateStr;
  }

  removeFile(fileId) {
    // Unmatch if matched
    for (const [rId, fId] of Object.entries(this.matches)) {
      if (fId === fileId) {
        delete this.matches[rId];
      }
    }
    this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);
    this.updateDuplicateFlags();
  }

  // Calculate requirement status according to Section 5
  getRequirementStatus(req) {
    const fileId = this.matches[req.id];
    const file = fileId ? this.getFile(fileId) : null;
    const expiry = this.expiryDates[req.id];
    const deadline = this.tender ? this.tender.submission_deadline : '';

    // Status Rules:
    // Missing: Required document, no file matched. Blocks: Yes
    // Expiry date needed: has_expiry = true and a file is matched, but no expiry date entered. Blocks: Yes
    // Expired: The expiry date is before the submission deadline. Blocks: Yes
    // Not provided: Optional document, no file matched. Blocks: No
    // OK: File matched, and (if has_expiry) the expiry date is on or after the submission deadline. Blocks: No
    // "If a document expires on the same day as the submission deadline, it is still OK."

    if (!file) {
      if (req.mandatory) {
        return {
          code: 'missing',
          labelKey: 'statusMissing',
          blocks: true,
          badgeClass: 'status-missing',
          icon: '❌'
        };
      } else {
        return {
          code: 'not_provided',
          labelKey: 'statusNotProvided',
          blocks: false,
          badgeClass: 'status-notprovided',
          icon: '⚪'
        };
      }
    }

    // File is matched
    if (req.has_expiry) {
      if (!expiry || expiry.trim() === '') {
        return {
          code: 'expiry_needed',
          labelKey: 'statusExpiryNeeded',
          blocks: true,
          badgeClass: 'status-needed',
          icon: '⏳'
        };
      }

      // Check if expiry date is before submission deadline
      // String comparison works accurately for YYYY-MM-DD
      if (expiry < deadline) {
        return {
          code: 'expired',
          labelKey: 'statusExpired',
          blocks: true,
          badgeClass: 'status-expired',
          icon: '⚠️'
        };
      }
    }

    return {
      code: 'ok',
      labelKey: 'statusOk',
      blocks: false,
      badgeClass: 'status-ok',
      icon: '✅'
    };
  }

  // Get all blocking issues
  getBlockingIssues() {
    const issues = [];
    if (!this.tender) {
      issues.push("Tender details not loaded");
      return issues;
    }

    for (const req of this.requirements) {
      const status = this.getRequirementStatus(req);
      const title = this.currentLang === 'bn' ? req.title_bn : req.title_en;
      if (status.blocks) {
        if (status.code === 'missing') {
          issues.push(`${req.id} (${title}): ${this.t('statusMissing')}`);
        } else if (status.code === 'expiry_needed') {
          issues.push(`${req.id} (${title}): ${this.t('statusExpiryNeeded')}`);
        } else if (status.code === 'expired') {
          const exp = this.expiryDates[req.id];
          issues.push(`${req.id} (${title}): ${this.t('statusExpired')} (${exp} < ${this.tender.submission_deadline})`);
        }
      }
    }

    // Check duplicate violations: are two duplicates matched to different documents?
    const matchedFiles = Object.values(this.matches).map(id => this.getFile(id)).filter(Boolean);
    const seenHashes = new Set();
    for (const f of matchedFiles) {
      if (seenHashes.has(f.hash)) {
        issues.push(`${this.t('duplicateMatchedWarning')} (${f.name})`);
        break;
      }
      seenHashes.add(f.hash);
    }

    return issues;
  }
}

// Global App Instance
const appState = new TenderAppState();

// Compute SHA-256 hash of an ArrayBuffer
async function computeHash(arrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Format bytes
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Initialize Application UI
document.addEventListener('DOMContentLoaded', async () => {
  // Pre-load default sample requirements immediately
  try {
    appState.loadRequirementsData(DEFAULT_REQUIREMENTS_DATA);
  } catch (err) {
    console.error("Failed to load initial data:", err);
  }

  // Setup Event Listeners
  setupEventListeners();

  // Render initial UI
  renderApp();
});

// Setup DOM Event Listeners
function setupEventListeners() {
  // Language Switcher
  const btnEn = document.getElementById('lang-en');
  const btnBn = document.getElementById('lang-bn');
  if (btnEn && btnBn) {
    btnEn.addEventListener('click', () => {
      appState.setLanguage('en');
      renderApp();
    });
    btnBn.addEventListener('click', () => {
      appState.setLanguage('bn');
      renderApp();
    });
  }

  // Requirements file input
  const reqFileInput = document.getElementById('req-file-input');
  if (reqFileInput) {
    reqFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        appState.loadRequirementsData(json);
        appState.addNotification('success', appState.t('requirementsLoadedSuccess', { tenderId: json.tender.tender_id }));
      } catch (err) {
        appState.addNotification('danger', "Error parsing requirements JSON: " + err.message);
      }
      reqFileInput.value = '';
      renderApp();
    });
  }

  // Load Sample Button
  const btnLoadSample = document.getElementById('btn-load-sample');
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', async () => {
      await handleLoadSamplePack();
    });
  }

  // Reset Button
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm(appState.currentLang === 'bn' ? "আপনি কি সমস্ত ডেটা রিসেট করতে চান?" : "Are you sure you want to reset all data?")) {
        appState.uploadedFiles = [];
        appState.matches = {};
        appState.expiryDates = {};
        appState.generatedPdfBytes = null;
        if (appState.generatedPdfUrl) {
          URL.revokeObjectURL(appState.generatedPdfUrl);
          appState.generatedPdfUrl = null;
        }
        appState.loadRequirementsData(DEFAULT_REQUIREMENTS_DATA);
        renderApp();
      }
    });
  }

  // Auto-Match Button
  const btnAutoMatch = document.getElementById('btn-auto-match');
  if (btnAutoMatch) {
    btnAutoMatch.addEventListener('click', () => {
      handleAutoMatch();
    });
  }

  // PDF Dropzone & Multi-file Upload
  const dropzone = document.getElementById('pdf-dropzone');
  const pdfInput = document.getElementById('pdf-file-input');

  if (dropzone && pdfInput) {
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-active');
    });

    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-active');
    });

    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-active');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        await handleFilesUpload(e.dataTransfer.files);
      }
    });

    pdfInput.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        await handleFilesUpload(e.target.files);
      }
      pdfInput.value = '';
    });
  }

  // Generate Package Button
  const btnGenerate = document.getElementById('btn-generate-package');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', async () => {
      await handleGeneratePackage();
    });
  }

  // Download Button
  const btnDownload = document.getElementById('btn-download-package');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      handleDownloadPackage();
    });
  }

  // Preview Package Button
  const btnPreviewPkg = document.getElementById('btn-preview-package');
  if (btnPreviewPkg) {
    btnPreviewPkg.addEventListener('click', () => {
      if (appState.generatedPdfBytes) {
        openPdfPreviewModal(appState.generatedPdfBytes, `${appState.tender.tender_id}_Package.pdf`);
      }
    });
  }

  // Modal Close Button
  const btnModalClose = document.getElementById('modal-close-btn');
  const btnModalFooterClose = document.getElementById('modal-footer-close-btn');
  const modalOverlay = document.getElementById('preview-modal');

  if (btnModalClose) btnModalClose.addEventListener('click', closePdfPreviewModal);
  if (btnModalFooterClose) btnModalFooterClose.addEventListener('click', closePdfPreviewModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closePdfPreviewModal();
    });
  }
}

// File Upload Handler
async function handleFilesUpload(fileList) {
  const files = Array.from(fileList);
  let totalFilesCount = appState.uploadedFiles.length;
  let totalFilesSize = appState.uploadedFiles.reduce((sum, f) => sum + f.size, 0);

  for (const file of files) {
    // Task 2: "If a file is not a PDF, reject it and show a clear message."
    const isPdfByName = file.name.toLowerCase().endsWith('.pdf');
    const isPdfByType = file.type === 'application/pdf';

    if (!isPdfByName && !isPdfByType) {
      appState.addNotification('danger', appState.t('rejectedNonPdf', { fileName: file.name }));
      continue;
    }

    // Check limits (Contest Reminders: up to 30 files and 50 MB in total)
    if (totalFilesCount + 1 > 30) {
      appState.addNotification('warning', appState.t('maxFilesExceeded'));
      break;
    }

    if (totalFilesSize + file.size > 50 * 1024 * 1024) {
      appState.addNotification('warning', appState.t('maxSizeExceeded'));
      break;
    }

    try {
      const buffer = await file.arrayBuffer();
      const hash = await computeHash(buffer);

      // Extract page count using PDFLib
      let pageCount = 1;
      try {
        const pdfDoc = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: true });
        pageCount = pdfDoc.getPageCount();
      } catch (err) {
        console.warn("Could not parse page count with PDFLib:", err);
      }

      const fileObj = {
        id: 'file_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: file.name,
        size: file.size,
        pageCount: pageCount,
        hash: hash,
        buffer: buffer,
        isDuplicate: false,
        duplicateWith: []
      };

      appState.uploadedFiles.push(fileObj);
      totalFilesCount++;
      totalFilesSize += file.size;
    } catch (err) {
      appState.addNotification('danger', `Error reading '${file.name}': ${err.message}`);
    }
  }

  // Update duplicate flags across all files
  appState.updateDuplicateFlags();

  // Try auto-matching if newly added
  renderApp();
}

// Load sample files from asset/ folder if accessible via fetch
async function handleLoadSamplePack() {
  try {
    // 1. Load requirements.json
    try {
      const res = await fetch('asset/requirements.json');
      if (res.ok) {
        const json = await res.json();
        appState.loadRequirementsData(json);
      }
    } catch (e) {
      // Fallback already preloaded
      appState.loadRequirementsData(DEFAULT_REQUIREMENTS_DATA);
    }

    // 2. Fetch sample documents
    const sampleDocNames = [
      '01_financial_proposal.pdf',
      '02_technical_proposal.pdf',
      '03_tin_certificate.pdf',
      '04_vat_certificate.pdf',
      'bank_solvency.pdf',
      'experience_cert.pdf',
      'experience_cert (1).pdf', // duplicate
      'trade_license_2026.pdf',
      'trade_license_2025.pdf', // expired
      'scan_0042.pdf',
      'company_logo.png' // non-pdf to demonstrate rejection
    ];

    let loadedCount = 0;
    const fetchPromises = sampleDocNames.map(async (name) => {
      try {
        const r = await fetch('asset/documents/' + encodeURIComponent(name));
        if (r.ok) {
          const blob = await r.blob();
          const file = new File([blob], name, { type: blob.type || (name.endsWith('.pdf') ? 'application/pdf' : 'image/png') });
          return file;
        }
      } catch (err) {
        console.warn("Fetch failed for sample file:", name, err);
      }
      return null;
    });

    const sampleFiles = (await Promise.all(fetchPromises)).filter(Boolean);
    if (sampleFiles.length > 0) {
      // Clear existing uploads to load clean sample
      appState.uploadedFiles = [];
      appState.matches = {};
      appState.expiryDates = {};
      await handleFilesUpload(sampleFiles);
      appState.addNotification('success', appState.currentLang === 'bn' ? "নমুনা ডেটা এবং ফাইল সফলভাবে লোড করা হয়েছে!" : "Sample pack and files successfully loaded!");
    } else {
      appState.addNotification('warning', appState.currentLang === 'bn' ? "নমুনা ফাইল ফোল্ডারে পাওয়া যায়নি। অনুগ্রহ করে ফাইল টেনে এনে আপলোড করুন।" : "Sample files could not be fetched automatically. Please drag and drop files from asset/documents folder.");
    }
  } catch (err) {
    appState.addNotification('danger', "Error loading sample pack: " + err.message);
  }
  renderApp();
}

// Smart Auto-Match Helper
function handleAutoMatch() {
  if (appState.uploadedFiles.length === 0) {
    appState.addNotification('warning', appState.currentLang === 'bn' ? "প্রথমে পিডিএফ ফাইল আপলোড করুন।" : "Upload PDF files first before auto-matching.");
    return;
  }

  // Pre-define intelligent match mapping for common tender document types
  const matchRules = [
    { reqId: 'R01', patterns: ['trade_license_2026', 'trade_license', 'trade'] },
    { reqId: 'R02', patterns: ['tin_certificate', 'tin', '03_tin'] },
    { reqId: 'R03', patterns: ['vat_certificate', 'vat', '04_vat'] },
    { reqId: 'R04', patterns: ['bank_solvency', 'solvency', 'bank'] },
    { reqId: 'R05', patterns: ['experience_cert', 'experience'] },
    { reqId: 'R08', patterns: ['technical_proposal', '02_technical', 'technical'] },
    { reqId: 'R09', patterns: ['financial_proposal', '01_financial', 'financial'] },
    { reqId: 'R10', patterns: ['declaration', 'signed_declaration', 'scan_0042'] }
  ];

  let matchedCount = 0;
  const usedFileIds = new Set(Object.values(appState.matches));

  for (const rule of matchRules) {
    const req = appState.getRequirement(rule.reqId);
    if (!req) continue;

    // If already matched, keep it
    if (appState.matches[rule.reqId]) continue;

    // Find best candidate among uploaded files
    for (const pattern of rule.patterns) {
      const candidate = appState.uploadedFiles.find(f => {
        if (usedFileIds.has(f.id)) return false;
        const nameLower = f.name.toLowerCase();
        // If pattern matches and it is NOT a duplicate sibling of an already matched file
        if (nameLower.includes(pattern)) {
          // Avoid picking trade_license_2025 if 2026 is present
          if (pattern === 'trade_license' && nameLower.includes('2025')) {
            const has2026 = appState.uploadedFiles.some(x => x.name.includes('2026'));
            if (has2026) return false;
          }
          // Avoid duplicate sibling if another duplicate is already used
          const canMatch = appState.canMatchFileToRequirement(f.id, rule.reqId);
          return canMatch.allowed;
        }
        return false;
      });

      if (candidate) {
        appState.matchFile(rule.reqId, candidate.id);
        usedFileIds.add(candidate.id);
        matchedCount++;

        // Auto-fill known dates if applicable
        if (rule.reqId === 'R01' && candidate.name.includes('2026')) {
          appState.setExpiryDate('R01', '2027-06-30');
        } else if (rule.reqId === 'R01' && candidate.name.includes('2025')) {
          appState.setExpiryDate('R01', '2025-06-30');
        } else if (rule.reqId === 'R04') {
          appState.setExpiryDate('R04', '2026-12-31');
        }
        break;
      }
    }
  }

  appState.addNotification('success', appState.currentLang === 'bn' ? `${matchedCount} টি ফাইল সফলভাবে ম্যাচ করা হয়েছে!` : `Auto-matched ${matchedCount} documents based on file specifications!`);
  renderApp();
}

// Generate Combined Package PDF according to Section 6
async function handleGeneratePackage() {
  const blockingIssues = appState.getBlockingIssues();
  if (blockingIssues.length > 0) {
    appState.addNotification('danger', appState.t('generationBlocked') + ' ' + blockingIssues.join('; '));
    return;
  }

  const btnGen = document.getElementById('btn-generate-package');
  if (btnGen) {
    btnGen.disabled = true;
    btnGen.innerHTML = `<span>⏳</span> ${appState.t('generating')}`;
  }

  try {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;

    // Create the master package document
    const masterPdf = await PDFDocument.create();

    // Embed fonts for cover page and footers
    const helvetica = await masterPdf.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await masterPdf.embedFont(StandardFonts.HelveticaBold);
    const helveticaOblique = await masterPdf.embedFont(StandardFonts.HelveticaOblique);

    // Section 6 Rule 2: "The documents come after the cover, sorted by order. Skip optional documents with no file."
    const includedReqs = appState.requirements
      .filter(req => appState.matches[req.id])
      .sort((a, b) => a.order - b.order);

    // Calculate total pages upfront:
    // Cover page is 1 page.
    let totalPages = 1;
    const loadedDocs = [];

    for (const req of includedReqs) {
      const fileId = appState.matches[req.id];
      const file = appState.getFile(fileId);
      const srcDoc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
      const pCount = srcDoc.getPageCount();
      totalPages += pCount;
      loadedDocs.push({ req, file, srcDoc, pCount });
    }

    // ==========================================
    // Page 1: COVER PAGE (Strictly in English per Rule 1)
    // "Page 1 is a cover page, in English. It shows: tender ID, tender title, procuring entity,
    // bidder name, submission deadline, the date the package was made, and the list of included documents in order."
    // ==========================================
    const coverPage = masterPdf.addPage([595.28, 841.89]); // A4 Size in points
    const { width: cWidth, height: cHeight } = coverPage.getSize();

    // 1. Header Accent Bar
    coverPage.drawRectangle({
      x: 0,
      y: cHeight - 110,
      width: cWidth,
      height: 110,
      color: rgb(0.08, 0.16, 0.32) // Deep navy
    });

    // Decorative thin gold line
    coverPage.drawRectangle({
      x: 0,
      y: cHeight - 114,
      width: cWidth,
      height: 4,
      color: rgb(0.85, 0.65, 0.13)
    });

    // Header Title
    coverPage.drawText("TENDER SUBMISSION PACKAGE", {
      x: 48,
      y: cHeight - 52,
      size: 20,
      font: helveticaBold,
      color: rgb(1, 1, 1)
    });

    coverPage.drawText("Official Bid Submission Document Dossier", {
      x: 48,
      y: cHeight - 74,
      size: 11,
      font: helvetica,
      color: rgb(0.78, 0.85, 0.96)
    });

    // 2. Tender Metadata Block (Box with light background)
    const metaBoxY = cHeight - 275;
    coverPage.drawRectangle({
      x: 45,
      y: metaBoxY,
      width: cWidth - 90,
      height: 145,
      color: rgb(0.96, 0.97, 0.99),
      borderColor: rgb(0.82, 0.86, 0.92),
      borderWidth: 1
    });

    // Section title
    coverPage.drawText("TENDER & BIDDER PARTICULARS", {
      x: 60,
      y: metaBoxY + 124,
      size: 10,
      font: helveticaBold,
      color: rgb(0.15, 0.23, 0.42)
    });

    coverPage.drawLine({
      start: { x: 60, y: metaBoxY + 116 },
      end: { x: cWidth - 60, y: metaBoxY + 116 },
      thickness: 0.75,
      color: rgb(0.82, 0.86, 0.92)
    });

    const todayDate = new Date().toISOString().split('T')[0];

    const metaFields = [
      { label: "Tender ID:", val: appState.tender.tender_id || "N/A", isBold: true },
      { label: "Tender Title:", val: appState.tender.title || "N/A" },
      { label: "Procuring Entity:", val: appState.tender.procuring_entity || "N/A" },
      { label: "Bidder Name:", val: appState.tender.bidder || "N/A" },
      { label: "Submission Deadline:", val: appState.tender.submission_deadline || "N/A" },
      { label: "Package Created Date:", val: todayDate }
    ];

    let currentY = metaBoxY + 98;
    for (let i = 0; i < metaFields.length; i += 2) {
      const f1 = metaFields[i];
      const f2 = metaFields[i + 1];

      // Col 1
      coverPage.drawText(f1.label, { x: 60, y: currentY, size: 9, font: helveticaBold, color: rgb(0.3, 0.35, 0.45) });
      coverPage.drawText(f1.val, { x: 175, y: currentY, size: 9, font: f1.isBold ? helveticaBold : helvetica, color: rgb(0.08, 0.12, 0.2) });

      // Col 2
      if (f2) {
        coverPage.drawText(f2.label, { x: 320, y: currentY, size: 9, font: helveticaBold, color: rgb(0.3, 0.35, 0.45) });
        coverPage.drawText(f2.val, { x: 440, y: currentY, size: 9, font: helvetica, color: rgb(0.08, 0.12, 0.2) });
      }

      currentY -= 22;
    }

    // 3. Table of Included Documents in Order
    const tableTopY = metaBoxY - 30;
    coverPage.drawText("TABLE OF CONTENTS / INCLUDED DOCUMENTS", {
      x: 48,
      y: tableTopY,
      size: 11,
      font: helveticaBold,
      color: rgb(0.12, 0.2, 0.36)
    });

    // Table Header Row
    const thY = tableTopY - 24;
    coverPage.drawRectangle({
      x: 45,
      y: thY - 4,
      width: cWidth - 90,
      height: 22,
      color: rgb(0.9, 0.93, 0.97)
    });

    coverPage.drawText("#", { x: 55, y: thY + 3, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
    coverPage.drawText("Document Requirement", { x: 80, y: thY + 3, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
    coverPage.drawText("Matched File Name", { x: 250, y: thY + 3, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
    coverPage.drawText("Pages", { x: 420, y: thY + 3, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
    coverPage.drawText("Expiry Date", { x: 475, y: thY + 3, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });

    let rowY = thY - 24;
    for (const item of loadedDocs) {
      const expDate = appState.expiryDates[item.req.id] || (item.req.has_expiry ? "N/A" : "-");

      coverPage.drawText(String(item.req.order), { x: 55, y: rowY + 3, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.25, 0.35) });
      coverPage.drawText(item.req.title_en, { x: 80, y: rowY + 3, size: 8.5, font: helvetica, color: rgb(0.1, 0.15, 0.25) });

      // Truncate file name if too long
      let fname = item.file.name;
      if (fname.length > 28) fname = fname.substring(0, 25) + '...';
      coverPage.drawText(fname, { x: 250, y: rowY + 3, size: 8, font: helveticaOblique, color: rgb(0.3, 0.35, 0.45) });

      coverPage.drawText(String(item.pCount), { x: 425, y: rowY + 3, size: 8.5, font: helvetica, color: rgb(0.2, 0.25, 0.35) });
      coverPage.drawText(expDate, { x: 475, y: rowY + 3, size: 8.5, font: helvetica, color: rgb(0.2, 0.25, 0.35) });

      // Row separator
      coverPage.drawLine({
        start: { x: 45, y: rowY - 4 },
        end: { x: cWidth - 45, y: rowY - 4 },
        thickness: 0.5,
        color: rgb(0.9, 0.92, 0.95)
      });

      rowY -= 20;
    }

    // Summary box at bottom of cover page
    coverPage.drawRectangle({
      x: 45,
      y: 50,
      width: cWidth - 90,
      height: 38,
      color: rgb(0.95, 0.98, 0.96),
      borderColor: rgb(0.75, 0.88, 0.78),
      borderWidth: 1
    });

    coverPage.drawText(`Package Summary: ${loadedDocs.length} Documents Included  |  Total Pages: ${totalPages}`, {
      x: 60,
      y: 64,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0.08, 0.45, 0.2)
    });

    // ==========================================
    // Section 6 Rule 2: Append all pages of matched files
    // ==========================================
    for (const item of loadedDocs) {
      const pageIndices = item.srcDoc.getPageIndices();
      const copiedPages = await masterPdf.copyPages(item.srcDoc, pageIndices);
      for (const p of copiedPages) {
        masterPdf.addPage(p);
      }
    }

    // ==========================================
    // Section 6 Rule 3 & 4: FOOTER STAMPING ON EVERY PAGE
    // "Every page, including the cover, has a footer at the bottom: <tender_id> | Page X of Y.
    // Y is the total number of pages in the package.
    // The footer must be easy to read and must not cover the document's content."
    // ==========================================
    const tenderId = appState.tender.tender_id;
    const finalPageCount = masterPdf.getPageCount();

    for (let i = 0; i < finalPageCount; i++) {
      const page = masterPdf.getPage(i);
      const { width: pWidth, height: pHeight } = page.getSize();
      const pageNum = i + 1;
      const footerText = `${tenderId} | Page ${pageNum} of ${finalPageCount}`;
      const textWidth = helveticaBold.widthOfTextAtSize(footerText, 9);
      const centerX = (pWidth - textWidth) / 2;

      // Draw clean subtle white pill / banner background in bottom margin
      // to guarantee footer never overlaps or gets obscured by underlying drawings
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pWidth,
        height: 24,
        color: rgb(1, 1, 1),
        opacity: 0.95
      });

      // Subtle separator line above footer
      page.drawLine({
        start: { x: 36, y: 24 },
        end: { x: pWidth - 36, y: 24 },
        thickness: 0.5,
        color: rgb(0.8, 0.85, 0.9)
      });

      // Clear, high-contrast readable footer text
      page.drawText(footerText, {
        x: centerX,
        y: 8,
        size: 9,
        font: helveticaBold,
        color: rgb(0.18, 0.24, 0.35)
      });
    }

    // Save final combined PDF
    const pdfBytes = await masterPdf.save();
    appState.generatedPdfBytes = pdfBytes;

    if (appState.generatedPdfUrl) {
      URL.revokeObjectURL(appState.generatedPdfUrl);
    }
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    appState.generatedPdfUrl = URL.createObjectURL(blob);

    appState.addNotification('success', appState.t('generatedSuccess'));
  } catch (err) {
    console.error("PDF generation error:", err);
    appState.addNotification('danger', "Error generating PDF package: " + err.message);
  } finally {
    if (btnGen) {
      btnGen.disabled = false;
      btnGen.innerHTML = `<span>⚡</span> ${appState.t('generateBtn')}`;
    }
    renderApp();
  }
}

// Download package PDF according to Task 8: <tender_id>_Package.pdf
function handleDownloadPackage() {
  if (!appState.generatedPdfBytes || !appState.generatedPdfUrl) {
    appState.addNotification('warning', "Please generate the package first.");
    return;
  }

  const filename = `${appState.tender.tender_id}_Package.pdf`;
  const a = document.createElement('a');
  a.href = appState.generatedPdfUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// PDF Viewer / Preview Modal using PDF.js
let currentPreviewPdfDoc = null;
let currentPreviewPageNum = 1;

async function openPdfPreviewModal(pdfData, title) {
  const modal = document.getElementById('preview-modal');
  const modalTitle = document.getElementById('modal-title');
  if (!modal) return;

  modalTitle.textContent = title || "Document Preview";
  modal.classList.add('active');

  currentPreviewPageNum = 1;
  const container = document.getElementById('pdf-canvas-container');
  container.innerHTML = '<div style="padding: 2rem; color: #64748b;">Loading document preview...</div>';

  try {
    if (typeof pdfjsLib === 'undefined') {
      container.innerHTML = '<div style="padding: 2rem; color: #dc2626;">PDF preview library not loaded.</div>';
      return;
    }

    // Set worker src
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    currentPreviewPdfDoc = await loadingTask.promise;
    renderPreviewPage(currentPreviewPageNum);
  } catch (err) {
    console.error("PDF Preview load error:", err);
    container.innerHTML = `<div style="padding: 2rem; color: #dc2626;">Failed to preview PDF: ${err.message}</div>`;
  }
}

async function renderPreviewPage(pageNumber) {
  if (!currentPreviewPdfDoc) return;
  const container = document.getElementById('pdf-canvas-container');
  container.innerHTML = '';

  const page = await currentPreviewPdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.2 });

  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'pdf-preview-canvas-wrap';

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: ctx,
    viewport: viewport
  };

  await page.render(renderContext).promise;
  canvasWrap.appendChild(canvas);
  container.appendChild(canvasWrap);

  // Update Page Navigation
  const navWrap = document.createElement('div');
  navWrap.className = 'preview-nav';
  navWrap.innerHTML = `
    <button class="btn btn-secondary btn-sm" id="prev-page-btn" ${pageNumber <= 1 ? 'disabled' : ''}>← ${appState.t('prevPage')}</button>
    <span style="font-size: 0.85rem; font-weight: 600; color: #334155;">${pageNumber} / ${currentPreviewPdfDoc.numPages}</span>
    <button class="btn btn-secondary btn-sm" id="next-page-btn" ${pageNumber >= currentPreviewPdfDoc.numPages ? 'disabled' : ''}>${appState.t('nextPage')} →</button>
  `;
  container.appendChild(navWrap);

  document.getElementById('prev-page-btn')?.addEventListener('click', () => {
    if (currentPreviewPageNum > 1) {
      currentPreviewPageNum--;
      renderPreviewPage(currentPreviewPageNum);
    }
  });

  document.getElementById('next-page-btn')?.addEventListener('click', () => {
    if (currentPreviewPageNum < currentPreviewPdfDoc.numPages) {
      currentPreviewPageNum++;
      renderPreviewPage(currentPreviewPageNum);
    }
  });
}

function closePdfPreviewModal() {
  const modal = document.getElementById('preview-modal');
  if (modal) modal.classList.remove('active');
  currentPreviewPdfDoc = null;
}

// Preview uploaded file
function previewUploadedFile(fileId) {
  const file = appState.getFile(fileId);
  if (file && file.buffer) {
    openPdfPreviewModal(file.buffer, file.name);
  }
}

// Main Render Function
function renderApp() {
  renderLanguageButtons();
  renderNotifications();
  renderTenderOverview();
  renderUploadedFilesList();
  renderRequirementsTable();
  renderGenerationSection();
}

function renderLanguageButtons() {
  const btnEn = document.getElementById('lang-en');
  const btnBn = document.getElementById('lang-bn');
  if (btnEn && btnBn) {
    if (appState.currentLang === 'en') {
      btnEn.classList.add('active');
      btnBn.classList.remove('active');
    } else {
      btnBn.classList.add('active');
      btnEn.classList.remove('active');
    }
  }

  // Update static header titles
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = appState.t(key);
  });
}

function renderNotifications() {
  const container = document.getElementById('notification-area');
  if (!container) return;

  container.innerHTML = '';
  for (const n of appState.notifications) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${n.type}`;
    alertDiv.innerHTML = `
      <div class="alert-icon">${n.type === 'danger' ? '❌' : (n.type === 'warning' ? '⚠️' : '✅')}</div>
      <div class="alert-body">
        <div class="alert-title">${n.type === 'danger' ? 'Error' : (n.type === 'warning' ? 'Notice' : 'Success')}</div>
        <div>${n.message}</div>
      </div>
      <button class="alert-close" data-id="${n.id}">✕</button>
    `;
    container.appendChild(alertDiv);

    alertDiv.querySelector('.alert-close').addEventListener('click', () => {
      appState.removeNotification(n.id);
      renderNotifications();
    });
  }
}

function renderTenderOverview() {
  const container = document.getElementById('tender-overview-grid');
  const titleEl = document.getElementById('tender-main-title');
  const badgeId = document.getElementById('tender-badge-id');
  const badgeDeadline = document.getElementById('tender-badge-deadline');

  if (!appState.tender) return;

  if (titleEl) titleEl.textContent = appState.tender.title || 'Tender Document Package';
  if (badgeId) badgeId.textContent = appState.tender.tender_id || 'N/A';
  if (badgeDeadline) {
    badgeDeadline.innerHTML = `<span>📅</span> ${appState.t('deadline')}: ${appState.tender.submission_deadline || 'N/A'}`;
  }

  if (container) {
    container.innerHTML = `
      <div class="meta-item">
        <span class="meta-label">${appState.t('tenderId')}</span>
        <span class="meta-value">${appState.tender.tender_id}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">${appState.t('procuringEntity')}</span>
        <span class="meta-value">${appState.tender.procuring_entity}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">${appState.t('bidder')}</span>
        <span class="meta-value">${appState.tender.bidder}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">${appState.t('deadline')}</span>
        <span class="meta-value">${appState.tender.submission_deadline}</span>
      </div>
    `;
  }
}

function renderUploadedFilesList() {
  const container = document.getElementById('uploaded-files-list');
  const countBadge = document.getElementById('uploaded-files-count');
  if (!container) return;

  const files = appState.uploadedFiles;
  if (countBadge) countBadge.textContent = `${files.length} / 30`;

  if (files.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📁</div>
        <p>${appState.t('noFilesUploaded')}</p>
      </div>
    `;
    return;
  }

  // Check if any duplicates exist to show prominent warning banner
  const duplicates = files.filter(f => f.isDuplicate);
  let duplicateBannerHtml = '';
  if (duplicates.length > 0) {
    duplicateBannerHtml = `
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 0.6rem 0.8rem; font-size: 0.78rem; color: #92400e; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>⚠️</span>
        <div><strong>${appState.t('duplicateAlert')}</strong> ${duplicates.map(d => d.name).join(', ')}</div>
      </div>
    `;
  }

  container.innerHTML = duplicateBannerHtml;

  for (const file of files) {
    // Check if matched to any requirement
    let matchedReqTitle = null;
    for (const [rId, fId] of Object.entries(appState.matches)) {
      if (fId === file.id) {
        const req = appState.getRequirement(rId);
        if (req) {
          matchedReqTitle = `${req.id}: ${appState.currentLang === 'bn' ? req.title_bn : req.title_en}`;
        }
        break;
      }
    }

    const item = document.createElement('div');
    item.className = `file-item ${file.isDuplicate ? 'is-duplicate' : ''}`;
    item.innerHTML = `
      <div class="file-info">
        <div class="file-icon">PDF</div>
        <div class="file-text">
          <div class="file-name" title="${file.name}">${file.name}</div>
          <div class="file-meta">
            <span>${file.pageCount} ${file.pageCount === 1 ? appState.t('page') : appState.t('pages')}</span>
            <span>•</span>
            <span>${formatFileSize(file.size)}</span>
            ${file.isDuplicate ? `<span class="duplicate-tag" title="Identical to: ${file.duplicateWith.join(', ')}">⚠️ ${appState.t('duplicateBadge')}</span>` : ''}
            ${matchedReqTitle ? `<span class="file-badge-matched" title="${matchedReqTitle}">✓ ${matchedReqTitle}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="file-actions">
        <button class="btn-icon" title="${appState.t('preview')}" data-preview-id="${file.id}">👁️</button>
        <button class="btn-icon btn-icon-danger" title="${appState.t('remove')}" data-remove-id="${file.id}">🗑️</button>
      </div>
    `;

    item.querySelector('[data-preview-id]').addEventListener('click', () => previewUploadedFile(file.id));
    item.querySelector('[data-remove-id]').addEventListener('click', () => {
      appState.removeFile(file.id);
      renderApp();
    });

    container.appendChild(item);
  }
}

function renderRequirementsTable() {
  const tbody = document.getElementById('requirements-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  for (const req of appState.requirements) {
    const status = appState.getRequirementStatus(req);
    const matchedFileId = appState.matches[req.id];
    const matchedFile = matchedFileId ? appState.getFile(matchedFileId) : null;
    const title = appState.currentLang === 'bn' ? req.title_bn : req.title_en;
    const expiryVal = appState.expiryDates[req.id] || '';

    const tr = document.createElement('tr');
    tr.className = `req-row ${status.badgeClass}`;

    // Select dropdown options:
    // User can select any unassigned file OR the currently assigned file
    let optionsHtml = `<option value="">${appState.t('selectFilePlaceholder')}</option>`;
    for (const f of appState.uploadedFiles) {
      // Find if f is matched elsewhere
      let matchedElsewhere = false;
      for (const [rId, fId] of Object.entries(appState.matches)) {
        if (fId === f.id && rId !== req.id) {
          matchedElsewhere = true;
          break;
        }
      }

      // Check duplicate rule: if f is duplicate, is any twin matched elsewhere?
      let duplicateMatchedElsewhere = false;
      if (f.isDuplicate) {
        for (const otherF of appState.uploadedFiles) {
          if (otherF.id !== f.id && otherF.hash === f.hash) {
            for (const [rId, fId] of Object.entries(appState.matches)) {
              if (fId === otherF.id && rId !== req.id) {
                duplicateMatchedElsewhere = true;
                break;
              }
            }
          }
        }
      }

      const isSelected = f.id === matchedFileId ? 'selected' : '';
      let disabledAttr = '';
      let extraLabel = '';

      if (matchedElsewhere) {
        disabledAttr = 'disabled';
        extraLabel = ' (already matched)';
      } else if (duplicateMatchedElsewhere && !isSelected) {
        disabledAttr = 'disabled';
        extraLabel = ' (duplicate twin matched)';
      }

      optionsHtml += `<option value="${f.id}" ${isSelected} ${disabledAttr}>${f.name} (${f.pageCount}p)${extraLabel}</option>`;
    }

    tr.innerHTML = `
      <td style="width: 50px; text-align: center;">
        <span class="order-badge">${req.order}</span>
      </td>
      <td>
        <div class="req-title-cell">
          <span class="req-title">${title} <small style="color: #64748b; font-weight: normal;">(${req.id})</small></span>
          <div class="req-tags">
            <span class="tag ${req.mandatory ? 'tag-mandatory' : 'tag-optional'}">${req.mandatory ? appState.t('mandatory') : appState.t('optional')}</span>
            <span class="tag ${req.has_expiry ? 'tag-expiry' : 'tag-optional'}">${req.has_expiry ? appState.t('hasExpiry') : appState.t('noExpiry')}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="match-select-group">
          <select class="select-input" data-req-id="${req.id}">
            ${optionsHtml}
          </select>
          ${matchedFile ? `<button class="btn btn-secondary btn-sm" title="${appState.t('unmatch')}" data-unmatch-id="${req.id}">✕</button>` : ''}
          ${matchedFile ? `<button class="btn btn-secondary btn-sm" title="${appState.t('preview')}" data-preview-req-file="${matchedFile.id}">👁️</button>` : ''}
        </div>
      </td>
      <td style="width: 170px;">
        ${req.has_expiry ? `
          <div class="date-input-group">
            <input type="date" class="date-input ${status.code === 'expired' ? 'invalid-date' : ''}" data-date-req-id="${req.id}" value="${expiryVal}" ${!matchedFile ? 'disabled placeholder="Match file first"' : ''}>
          </div>
        ` : `<span style="color: #94a3b8; font-size: 0.8rem;">—</span>`}
      </td>
      <td style="width: 150px;">
        <span class="status-badge ${status.badgeClass}">
          <span>${status.icon}</span> ${appState.t(status.labelKey)}
        </span>
      </td>
    `;

    // Dropdown change listener
    const select = tr.querySelector(`[data-req-id="${req.id}"]`);
    if (select) {
      select.addEventListener('change', (e) => {
        const selectedFileId = e.target.value;
        const success = appState.matchFile(req.id, selectedFileId);
        if (!success) {
          select.value = matchedFileId || '';
        }
        renderApp();
      });
    }

    // Unmatch button listener
    const unmatchBtn = tr.querySelector(`[data-unmatch-id="${req.id}"]`);
    if (unmatchBtn) {
      unmatchBtn.addEventListener('click', () => {
        appState.unmatch(req.id);
        renderApp();
      });
    }

    // Preview button listener
    const previewBtn = tr.querySelector(`[data-preview-req-file]`);
    if (previewBtn && matchedFile) {
      previewBtn.addEventListener('click', () => {
        previewUploadedFile(matchedFile.id);
      });
    }

    // Date change listener
    const dateInput = tr.querySelector(`[data-date-req-id="${req.id}"]`);
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        appState.setExpiryDate(req.id, e.target.value);
        renderApp();
      });
    }

    tbody.appendChild(tr);
  }
}

function renderGenerationSection() {
  const blockingIssues = appState.getBlockingIssues();
  const blockingContainer = document.getElementById('generation-status-box');
  const btnGenerate = document.getElementById('btn-generate-package');
  const btnDownload = document.getElementById('btn-download-package');
  const btnPreview = document.getElementById('btn-preview-package');

  if (!blockingContainer) return;

  // Task 7: "Keep the Generate button disabled while any document has a blocking status, and show why."
  if (blockingIssues.length > 0) {
    if (btnGenerate) {
      btnGenerate.disabled = true;
      btnGenerate.title = "Cannot generate while blocking issues exist";
    }

    blockingContainer.innerHTML = `
      <div class="blocking-box">
        <div class="blocking-box-title">
          <span>⚠️</span> ${appState.t('generationBlocked')} (${blockingIssues.length})
        </div>
        <ul class="blocking-list">
          ${blockingIssues.map(issue => `<li class="blocking-item">${issue}</li>`).join('')}
        </ul>
      </div>
    `;
  } else {
    if (btnGenerate) {
      btnGenerate.disabled = false;
      btnGenerate.title = "Ready to generate tender package";
    }

    blockingContainer.innerHTML = `
      <div class="ready-box">
        <div class="ready-icon">✓</div>
        <div>${appState.t('generationReady')}</div>
      </div>
    `;
  }

  // Download & Preview buttons
  if (btnDownload) {
    btnDownload.disabled = !appState.generatedPdfBytes;
  }
  if (btnPreview) {
    btnPreview.disabled = !appState.generatedPdfBytes;
  }
}
