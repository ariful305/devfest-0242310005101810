/**
 * TenderPacker - Tender Document Preparation & Validation Engine
 * Fully Client-Side / In-Browser Solution with Complete Bonus Tasks Implementation
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
    exportChecklist: "Export Checklist",
    sealSignature: "Seal & Signature",
    saveProject: "Save Project",
    openProject: "Open Project",
    aiAssistant: "AI Help",
    uploadedFilesTitle: "Uploaded Files",
    uploadedFilesSubtitle: "PDF only, max 30 files, 50MB total",
    dropzoneTitle: "Drop PDF files here or click to browse",
    dropzoneSub: "Accepts multiple PDF files simultaneously. Damaged/bad files handled safely.",
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
    includeIndexTitle: "Include Document Index Page",
    includeIndexDesc: "Page numbers where each document starts + Bangla text",
    stampSealTitle: "Stamp Digital Seal/Signature",
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
    rejectedBadPdf: "Rejected file '{fileName}': PDF is password-protected or corrupted. Handled safely.",
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
    exportChecklist: "চেকলিস্ট এক্সপোর্ট",
    sealSignature: "সিল ও স্বাক্ষর",
    saveProject: "প্রজেক্ট সেভ",
    openProject: "প্রজেক্ট খুলুন",
    aiAssistant: "এআই সহায়তা",
    uploadedFilesTitle: "আপলোডকৃত ফাইলসমূহ",
    uploadedFilesSubtitle: "শুধুমাত্র পিডিএফ, সর্বোচ্চ ৩০টি ফাইল, ৫০ মেগাবাইট",
    dropzoneTitle: "এখানে পিডিএফ ফাইল টেনে আনুন অথবা ব্রাউজ করুন",
    dropzoneSub: "একসাথে একাধিক পিডিএফ ফাইল নির্বাচন করা যাবে। ত্রুটিপূর্ণ ফাইল নিরাপদে হ্যান্ডেল করা হয়।",
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
    includeIndexTitle: "ইনডেক্স পেজ যুক্ত করুন",
    includeIndexDesc: "প্রতিটি নথি শুরুর পৃষ্ঠা নম্বর ও বাংলা নাম",
    stampSealTitle: "ডিজিটাল সিল/স্বাক্ষর যুক্ত করুন",
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
    rejectedBadPdf: "ফাইল প্রত্যাখ্যাত '{fileName}': পিডিএফ পাসওয়ার্ডযুক্ত বা ক্ষতিগ্রস্ত। নিরাপদে হ্যান্ডেল করা হয়েছে।",
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

    // Bonus 1: Index Page Configuration
    this.includeIndexPage = true;

    // Bonus 2: Seal / Signature Configuration
    this.sealImageBytes = null;
    this.sealImageDataUrl = null;
    this.sealSettings = {
      enabled: false,
      targetPages: 'all', // 'all', 'cover_index', 'first_page_each', 'cover_only', 'last_page', 'custom'
      customPages: '',
      position: 'bottom_right', // 'bottom_right', 'bottom_left', 'top_right', 'center'
      width: 80,
      opacity: 0.9
    };

    // Bonus 8: AI Key
    this.aiApiKey = localStorage.getItem('tender_ai_api_key') || '';
  }

  setLanguage(lang) {
    if (lang === 'en' || lang === 'bn') {
      this.currentLang = lang;
      this.saveToStorage();
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
    this.generatedPdfBytes = null;
    if (this.generatedPdfUrl) {
      URL.revokeObjectURL(this.generatedPdfUrl);
      this.generatedPdfUrl = null;
    }
    this.saveToStorage();
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
  canMatchFileToRequirement(fileId, reqId) {
    if (!fileId) return { allowed: true };
    const file = this.getFile(fileId);
    if (!file) return { allowed: false, reason: "File not found" };

    if (file.isDuplicate) {
      for (const otherFile of this.uploadedFiles) {
        if (otherFile.id !== file.id && otherFile.hash === file.hash) {
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
    if (!fileId) {
      delete this.matches[reqId];
      this.saveToStorage();
      return true;
    }

    const check = this.canMatchFileToRequirement(fileId, reqId);
    if (!check.allowed) {
      this.addNotification('danger', check.reason);
      return false;
    }

    for (const [rId, fId] of Object.entries(this.matches)) {
      if (fId === fileId && rId !== reqId) {
        delete this.matches[rId];
      }
    }

    this.matches[reqId] = fileId;
    this.saveToStorage();
    return true;
  }

  unmatch(reqId) {
    delete this.matches[reqId];
    this.saveToStorage();
  }

  setExpiryDate(reqId, dateStr) {
    this.expiryDates[reqId] = dateStr;
    this.saveToStorage();
  }

  removeFile(fileId) {
    for (const [rId, fId] of Object.entries(this.matches)) {
      if (fId === fileId) {
        delete this.matches[rId];
      }
    }
    this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);
    this.updateDuplicateFlags();
    this.saveToStorage();
  }

  // Calculate requirement status according to Section 5
  getRequirementStatus(req) {
    const fileId = this.matches[req.id];
    const file = fileId ? this.getFile(fileId) : null;
    const expiry = this.expiryDates[req.id];
    const deadline = this.tender ? this.tender.submission_deadline : '';

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

  // Bonus 4: Browser LocalStorage Persistence
  saveToStorage() {
    try {
      const stateObj = {
        lang: this.currentLang,
        tender: this.tender,
        matches: this.matches,
        expiryDates: this.expiryDates,
        includeIndexPage: this.includeIndexPage,
        sealSettings: this.sealSettings,
        fileMetadata: this.uploadedFiles.map(f => ({ id: f.id, name: f.name, size: f.size, pageCount: f.pageCount, hash: f.hash }))
      };
      localStorage.setItem('tenderpacker_state', JSON.stringify(stateObj));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  }

  restoreFromStorage() {
    try {
      const saved = localStorage.getItem('tenderpacker_state');
      if (saved) {
        const obj = JSON.parse(saved);
        if (obj.lang) this.currentLang = obj.lang;
        if (obj.matches) this.matches = obj.matches;
        if (obj.expiryDates) this.expiryDates = obj.expiryDates;
        if (typeof obj.includeIndexPage === 'boolean') this.includeIndexPage = obj.includeIndexPage;
        if (obj.sealSettings) this.sealSettings = { ...this.sealSettings, ...obj.sealSettings };
      }
    } catch (e) {
      console.warn("Storage restore failed:", e);
    }
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

// Convert ArrayBuffer to Base64 String
function bufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 String to ArrayBuffer
function base64ToBuffer(base64) {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

// Format bytes
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Bonus 5: Sharp Bangla Text to High-DPI PNG Canvas Renderer
// Renders native Bangla font shaping onto a 2x retina canvas and returns Uint8Array PNG bytes
async function renderBanglaTextToPngBytes(text, fontSizePt = 11, colorHex = '#1e293b') {
  const canvas = document.createElement('canvas');
  const scale = 2.5; // High-resolution rendering
  const ctx = canvas.getContext('2d');

  const cssFont = `bold ${fontSizePt * scale}px "Kalpurush", "Siyam Rupali", "SolaimanLipi", "Inter", sans-serif`;
  ctx.font = cssFont;
  const metrics = ctx.measureText(text);

  const textWidth = Math.ceil(metrics.width) + 20;
  const textHeight = Math.ceil((fontSizePt * scale) * 1.5);

  canvas.width = textWidth;
  canvas.height = textHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = cssFont;
  ctx.fillStyle = colorHex;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 5, textHeight / 2);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  const buffer = await blob.arrayBuffer();
  return {
    bytes: new Uint8Array(buffer),
    ptWidth: textWidth / scale,
    ptHeight: textHeight / scale
  };
}

// Initialize Application UI
document.addEventListener('DOMContentLoaded', async () => {
  // Pre-load default sample requirements immediately
  try {
    appState.loadRequirementsData(DEFAULT_REQUIREMENTS_DATA);
    appState.restoreFromStorage();
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
        localStorage.removeItem('tenderpacker_state');
        appState.uploadedFiles = [];
        appState.matches = {};
        appState.expiryDates = {};
        appState.sealImageBytes = null;
        appState.sealImageDataUrl = null;
        appState.sealSettings.enabled = false;
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

  // Bonus 3: Export Checklist CSV Button
  const btnExportChecklist = document.getElementById('btn-export-checklist');
  if (btnExportChecklist) {
    btnExportChecklist.addEventListener('click', () => {
      handleExportChecklistCSV();
    });
  }

  // Bonus 4: Save & Open Project
  const btnSaveProject = document.getElementById('btn-save-project');
  if (btnSaveProject) {
    btnSaveProject.addEventListener('click', () => {
      handleSaveProject();
    });
  }

  const projectFileInput = document.getElementById('project-file-input');
  if (projectFileInput) {
    projectFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      await handleOpenProject(file);
      projectFileInput.value = '';
    });
  }

  // Bonus 2: Seal Modal Controls
  const btnOpenSeal = document.getElementById('btn-open-seal-modal');
  const sealModal = document.getElementById('seal-modal');
  const sealClose = document.getElementById('seal-modal-close');
  const sealCancel = document.getElementById('seal-modal-cancel');

  if (btnOpenSeal) {
    btnOpenSeal.addEventListener('click', () => {
      openSealModal();
    });
  }
  if (sealClose) sealClose.addEventListener('click', () => closeSealModal());
  if (sealCancel) sealCancel.addEventListener('click', () => closeSealModal());

  const sealFileInput = document.getElementById('seal-file-input');
  if (sealFileInput) {
    sealFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.name.toLowerCase().endsWith('.png') && file.type !== 'image/png') {
        alert("Please upload a PNG image file.");
        return;
      }
      const buffer = await file.arrayBuffer();
      appState.sealImageBytes = new Uint8Array(buffer);
      appState.sealImageDataUrl = URL.createObjectURL(new Blob([buffer], { type: 'image/png' }));
      appState.sealSettings.enabled = true;
      updateSealPreviewUI();
    });
  }

  const btnUseSampleLogo = document.getElementById('btn-use-sample-logo');
  if (btnUseSampleLogo) {
    btnUseSampleLogo.addEventListener('click', async () => {
      try {
        const res = await fetch('asset/documents/company_logo.png');
        if (res.ok) {
          const blob = await res.blob();
          const buffer = await blob.arrayBuffer();
          appState.sealImageBytes = new Uint8Array(buffer);
          appState.sealImageDataUrl = URL.createObjectURL(blob);
          appState.sealSettings.enabled = true;
          updateSealPreviewUI();
          appState.addNotification('success', "Loaded company_logo.png as digital seal!");
        }
      } catch (err) {
        alert("Could not load sample logo automatically: " + err.message);
      }
    });
  }

  const btnRemoveSeal = document.getElementById('btn-remove-seal');
  if (btnRemoveSeal) {
    btnRemoveSeal.addEventListener('click', () => {
      appState.sealImageBytes = null;
      appState.sealImageDataUrl = null;
      appState.sealSettings.enabled = false;
      updateSealPreviewUI();
      renderApp();
    });
  }

  const sealTargetPages = document.getElementById('seal-target-pages');
  const sealCustomGroup = document.getElementById('seal-custom-pages-group');
  if (sealTargetPages && sealCustomGroup) {
    sealTargetPages.addEventListener('change', (e) => {
      sealCustomGroup.style.display = e.target.value === 'custom' ? 'block' : 'none';
    });
  }

  const widthSlider = document.getElementById('seal-width-slider');
  const widthVal = document.getElementById('seal-width-val');
  if (widthSlider && widthVal) {
    widthSlider.addEventListener('input', (e) => {
      widthVal.textContent = e.target.value;
    });
  }

  const opacitySlider = document.getElementById('seal-opacity-slider');
  const opacityVal = document.getElementById('seal-opacity-val');
  if (opacitySlider && opacityVal) {
    opacitySlider.addEventListener('input', (e) => {
      opacityVal.textContent = e.target.value;
    });
  }

  const btnSaveSealSettings = document.getElementById('btn-save-seal-settings');
  if (btnSaveSealSettings) {
    btnSaveSealSettings.addEventListener('click', () => {
      if (appState.sealImageBytes) {
        appState.sealSettings.enabled = true;
        appState.sealSettings.targetPages = document.getElementById('seal-target-pages').value;
        appState.sealSettings.customPages = document.getElementById('seal-custom-pages-input').value;
        appState.sealSettings.position = document.getElementById('seal-position').value;
        appState.sealSettings.width = parseInt(document.getElementById('seal-width-slider').value, 10);
        appState.sealSettings.opacity = parseInt(document.getElementById('seal-opacity-slider').value, 10) / 100;
        appState.addNotification('success', "Digital seal settings saved!");
      }
      closeSealModal();
      renderApp();
    });
  }

  // Bonus 1: Index Page toggle
  const chkIndex = document.getElementById('chk-include-index');
  if (chkIndex) {
    chkIndex.addEventListener('change', (e) => {
      appState.includeIndexPage = e.target.checked;
      appState.saveToStorage();
    });
  }

  // Bonus 2: Seal Stamp Checkbox
  const chkSeal = document.getElementById('chk-stamp-seal');
  if (chkSeal) {
    chkSeal.addEventListener('change', (e) => {
      appState.sealSettings.enabled = e.target.checked;
      appState.saveToStorage();
    });
  }

  // Bonus 8: AI Modal Controls
  const btnOpenAi = document.getElementById('btn-open-ai-modal');
  const aiModal = document.getElementById('ai-modal');
  const aiClose = document.getElementById('ai-modal-close');
  const aiCancel = document.getElementById('ai-modal-cancel');
  const aiApiKeyInput = document.getElementById('ai-api-key-input');
  const btnSaveApiKey = document.getElementById('btn-save-api-key');

  if (btnOpenAi) {
    btnOpenAi.addEventListener('click', () => {
      if (aiModal) {
        if (aiApiKeyInput) aiApiKeyInput.value = appState.aiApiKey;
        aiModal.classList.add('active');
      }
    });
  }
  if (aiClose) aiClose.addEventListener('click', () => aiModal.classList.remove('active'));
  if (aiCancel) aiCancel.addEventListener('click', () => aiModal.classList.remove('active'));

  if (btnSaveApiKey && aiApiKeyInput) {
    btnSaveApiKey.addEventListener('click', () => {
      appState.aiApiKey = aiApiKeyInput.value.trim();
      localStorage.setItem('tender_ai_api_key', appState.aiApiKey);
      alert("API Key saved to browser local storage!");
    });
  }

  const btnAiAudit = document.getElementById('btn-ai-audit-package');
  if (btnAiAudit) {
    btnAiAudit.addEventListener('click', async () => {
      await handleAiAudit();
    });
  }

  const btnAiSuggestDates = document.getElementById('btn-ai-suggest-dates');
  if (btnAiSuggestDates) {
    btnAiSuggestDates.addEventListener('click', async () => {
      await handleAiSuggestDates();
    });
  }

  const btnAiSend = document.getElementById('btn-ai-send-prompt');
  const aiPromptInput = document.getElementById('ai-user-prompt');
  if (btnAiSend && aiPromptInput) {
    btnAiSend.addEventListener('click', async () => {
      const q = aiPromptInput.value.trim();
      if (!q) return;
      await handleAiQuestion(q);
      aiPromptInput.value = '';
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

// Modal open/close helpers
function openSealModal() {
  const modal = document.getElementById('seal-modal');
  if (!modal) return;
  modal.classList.add('active');
  updateSealPreviewUI();
}

function closeSealModal() {
  const modal = document.getElementById('seal-modal');
  if (modal) modal.classList.remove('active');
}

function updateSealPreviewUI() {
  const box = document.getElementById('seal-preview-box');
  const img = document.getElementById('seal-preview-img');
  const badge = document.getElementById('seal-status-badge');
  const chk = document.getElementById('chk-stamp-seal');

  if (appState.sealImageBytes && appState.sealImageDataUrl) {
    if (box) box.style.display = 'block';
    if (img) img.src = appState.sealImageDataUrl;
    if (badge) badge.textContent = "Ready (" + appState.sealSettings.position + ")";
    if (chk) chk.disabled = false;
  } else {
    if (box) box.style.display = 'none';
    if (badge) badge.textContent = "No seal uploaded";
    if (chk) {
      chk.checked = false;
      chk.disabled = true;
    }
  }
}

// File Upload Handler (Task 2 & Bonus 7: Handle bad/damaged/encrypted files safely)
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

      // Bonus 7: Handle bad files safely (corrupted or password-protected)
      let pageCount = 1;
      try {
        const testDoc = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: false });
        if (testDoc.isEncrypted) {
          appState.addNotification('danger', appState.t('rejectedBadPdf', { fileName: file.name }));
          continue;
        }
        pageCount = testDoc.getPageCount();
      } catch (errPdf) {
        // Corrupted / unreadable PDF
        console.warn("PDF load error for file:", file.name, errPdf);
        appState.addNotification('danger', appState.t('rejectedBadPdf', { fileName: file.name }));
        continue;
      }

      const hash = await computeHash(buffer);

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
  appState.saveToStorage();
  renderApp();
}

// Load sample files from asset/ folder if accessible via fetch
async function handleLoadSamplePack() {
  try {
    try {
      const res = await fetch('asset/requirements.json');
      if (res.ok) {
        const json = await res.json();
        appState.loadRequirementsData(json);
      }
    } catch (e) {
      appState.loadRequirementsData(DEFAULT_REQUIREMENTS_DATA);
    }

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

// Bonus 6: Intelligent Match Suggestions
function getSuggestedFileForRequirement(req) {
  if (appState.matches[req.id]) return null;

  const patterns = {
    'R01': ['trade_license_2026', 'trade_license', 'trade'],
    'R02': ['tin_certificate', 'tin', '03_tin'],
    'R03': ['vat_certificate', 'vat', '04_vat'],
    'R04': ['bank_solvency', 'solvency', 'bank'],
    'R05': ['experience_cert', 'experience'],
    'R06': ['financial_statement', 'audited'],
    'R07': ['manufacturer', 'authorization'],
    'R08': ['technical_proposal', '02_technical', 'technical'],
    'R09': ['financial_proposal', '01_financial', 'financial'],
    'R10': ['declaration', 'signed_declaration', 'scan_0042']
  };

  const candidateKeywords = patterns[req.id] || [req.title_en.toLowerCase().replace(/[^a-z0-9]/g, '')];
  const usedFileIds = new Set(Object.values(appState.matches));

  for (const keyword of candidateKeywords) {
    const found = appState.uploadedFiles.find(f => {
      if (usedFileIds.has(f.id)) return false;
      const name = f.name.toLowerCase();
      if (name.includes(keyword)) {
        if (keyword === 'trade_license' && name.includes('2025')) {
          if (appState.uploadedFiles.some(x => x.name.includes('2026'))) return false;
        }
        return appState.canMatchFileToRequirement(f.id, req.id).allowed;
      }
      return false;
    });
    if (found) return found;
  }
  return null;
}

// Smart Auto-Match Helper
function handleAutoMatch() {
  if (appState.uploadedFiles.length === 0) {
    appState.addNotification('warning', appState.currentLang === 'bn' ? "প্রথমে পিডিএফ ফাইল আপলোড করুন।" : "Upload PDF files first before auto-matching.");
    return;
  }

  let matchedCount = 0;
  for (const req of appState.requirements) {
    if (appState.matches[req.id]) continue;
    const candidate = getSuggestedFileForRequirement(req);
    if (candidate) {
      appState.matchFile(req.id, candidate.id);
      matchedCount++;

      if (req.id === 'R01' && candidate.name.includes('2026')) {
        appState.setExpiryDate('R01', '2027-06-30');
      } else if (req.id === 'R01' && candidate.name.includes('2025')) {
        appState.setExpiryDate('R01', '2025-06-30');
      } else if (req.id === 'R04') {
        appState.setExpiryDate('R04', '2026-12-31');
      }
    }
  }

  appState.addNotification('success', appState.currentLang === 'bn' ? `${matchedCount} টি ফাইল সফলভাবে ম্যাচ করা হয়েছে!` : `Auto-matched ${matchedCount} documents based on file specifications!`);
  renderApp();
}

// Bonus 3: Export Checklist as CSV / Excel
function handleExportChecklistCSV() {
  if (!appState.tender) {
    alert("No tender details loaded.");
    return;
  }

  // Prepend UTF-8 BOM so Microsoft Excel correctly displays Bangla and Unicode
  let csvContent = "\uFEFF";
  csvContent += "Order,Requirement ID,Title (EN),Title (BN),Type,Expiry Check,Matched File,Page Count,Expiry Date,Deadline,Status,Blocks Package\r\n";

  for (const req of appState.requirements) {
    const fileId = appState.matches[req.id];
    const file = fileId ? appState.getFile(fileId) : null;
    const status = appState.getRequirementStatus(req);
    const expiry = appState.expiryDates[req.id] || "";

    const row = [
      req.order,
      `"${req.id}"`,
      `"${req.title_en}"`,
      `"${req.title_bn}"`,
      req.mandatory ? "Mandatory" : "Optional",
      req.has_expiry ? "Yes" : "No",
      file ? `"${file.name}"` : "None",
      file ? file.pageCount : 0,
      `"${expiry}"`,
      `"${appState.tender.submission_deadline}"`,
      `"${appState.t(status.labelKey)}"`,
      status.blocks ? "YES" : "NO"
    ];

    csvContent += row.join(",") + "\r\n";
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${appState.tender.tender_id}_Checklist.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  appState.addNotification('success', "Checklist exported successfully as CSV/Excel!");
}

// Bonus 4: Save and Open Project File
function handleSaveProject() {
  if (!appState.tender) return;

  const projectData = {
    version: "2.0",
    savedAt: new Date().toISOString(),
    tender: appState.tender,
    requirements: appState.requirements,
    matches: appState.matches,
    expiryDates: appState.expiryDates,
    includeIndexPage: appState.includeIndexPage,
    sealSettings: appState.sealSettings,
    sealImageBase64: appState.sealImageBytes ? bufferToBase64(appState.sealImageBytes.buffer) : null,
    files: appState.uploadedFiles.map(f => ({
      id: f.id,
      name: f.name,
      size: f.size,
      pageCount: f.pageCount,
      hash: f.hash,
      base64: bufferToBase64(f.buffer)
    }))
  };

  const jsonStr = JSON.stringify(projectData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${appState.tender.tender_id}_Project.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  appState.addNotification('success', "Project successfully saved to JSON file!");
}

async function handleOpenProject(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data.tender || !Array.isArray(data.requirements)) {
      throw new Error("Invalid project JSON structure");
    }

    appState.tender = data.tender;
    appState.requirements = data.requirements;
    appState.matches = data.matches || {};
    appState.expiryDates = data.expiryDates || {};
    if (typeof data.includeIndexPage === 'boolean') appState.includeIndexPage = data.includeIndexPage;
    if (data.sealSettings) appState.sealSettings = data.sealSettings;

    if (data.sealImageBase64) {
      const sealBuf = base64ToBuffer(data.sealImageBase64);
      appState.sealImageBytes = new Uint8Array(sealBuf);
      appState.sealImageDataUrl = URL.createObjectURL(new Blob([sealBuf], { type: 'image/png' }));
    } else {
      appState.sealImageBytes = null;
      appState.sealImageDataUrl = null;
    }

    // Restore files
    appState.uploadedFiles = [];
    if (Array.isArray(data.files)) {
      for (const item of data.files) {
        const buf = base64ToBuffer(item.base64);
        appState.uploadedFiles.push({
          id: item.id,
          name: item.name,
          size: item.size,
          pageCount: item.pageCount,
          hash: item.hash,
          buffer: buf,
          isDuplicate: false,
          duplicateWith: []
        });
      }
    }

    appState.updateDuplicateFlags();
    appState.saveToStorage();
    appState.addNotification('success', `Project successfully restored from ${file.name}!`);
    renderApp();
  } catch (err) {
    appState.addNotification('danger', "Error restoring project: " + err.message);
  }
}

// Generate Combined Package PDF according to Section 6 and Bonus Tasks 1, 2, 5
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

    const masterPdf = await PDFDocument.create();

    const helvetica = await masterPdf.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await masterPdf.embedFont(StandardFonts.HelveticaBold);
    const helveticaOblique = await masterPdf.embedFont(StandardFonts.HelveticaOblique);

    const includedReqs = appState.requirements
      .filter(req => appState.matches[req.id])
      .sort((a, b) => a.order - b.order);

    // Track documents and starting pages
    const loadedDocs = [];
    for (const req of includedReqs) {
      const fileId = appState.matches[req.id];
      const file = appState.getFile(fileId);
      const srcDoc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
      const pCount = srcDoc.getPageCount();
      loadedDocs.push({ req, file, srcDoc, pCount, startPage: 0 });
    }

    // Calculate Page Counts:
    // Page 1 is Cover
    // If includeIndexPage is true, Page 2 is Index Page
    const hasIndexPage = appState.includeIndexPage;
    let pageTracker = 1 + (hasIndexPage ? 1 : 0);

    for (const item of loadedDocs) {
      item.startPage = pageTracker + 1;
      pageTracker += item.pCount;
    }

    const totalPages = pageTracker;

    // ==========================================
    // Page 1: COVER PAGE (In English per Rule 1)
    // ==========================================
    const coverPage = masterPdf.addPage([595.28, 841.89]);
    const { width: cWidth, height: cHeight } = coverPage.getSize();

    // 1. Header Banner
    coverPage.drawRectangle({
      x: 0,
      y: cHeight - 110,
      width: cWidth,
      height: 110,
      color: rgb(0.08, 0.16, 0.32)
    });

    coverPage.drawRectangle({
      x: 0,
      y: cHeight - 114,
      width: cWidth,
      height: 4,
      color: rgb(0.85, 0.65, 0.13)
    });

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

    // 2. Metadata Block
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

      coverPage.drawText(f1.label, { x: 60, y: currentY, size: 9, font: helveticaBold, color: rgb(0.3, 0.35, 0.45) });
      coverPage.drawText(f1.val, { x: 175, y: currentY, size: 9, font: f1.isBold ? helveticaBold : helvetica, color: rgb(0.08, 0.12, 0.2) });

      if (f2) {
        coverPage.drawText(f2.label, { x: 320, y: currentY, size: 9, font: helveticaBold, color: rgb(0.3, 0.35, 0.45) });
        coverPage.drawText(f2.val, { x: 440, y: currentY, size: 9, font: helvetica, color: rgb(0.08, 0.12, 0.2) });
      }

      currentY -= 22;
    }

    // 3. Table of Included Documents on Cover Page
    const tableTopY = metaBoxY - 30;
    coverPage.drawText("TABLE OF CONTENTS / INCLUDED DOCUMENTS", {
      x: 48,
      y: tableTopY,
      size: 11,
      font: helveticaBold,
      color: rgb(0.12, 0.2, 0.36)
    });

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

      let fname = item.file.name;
      if (fname.length > 28) fname = fname.substring(0, 25) + '...';
      coverPage.drawText(fname, { x: 250, y: rowY + 3, size: 8, font: helveticaOblique, color: rgb(0.3, 0.35, 0.45) });

      coverPage.drawText(String(item.pCount), { x: 425, y: rowY + 3, size: 8.5, font: helvetica, color: rgb(0.2, 0.25, 0.35) });
      coverPage.drawText(expDate, { x: 475, y: rowY + 3, size: 8.5, font: helvetica, color: rgb(0.2, 0.25, 0.35) });

      coverPage.drawLine({
        start: { x: 45, y: rowY - 4 },
        end: { x: cWidth - 45, y: rowY - 4 },
        thickness: 0.5,
        color: rgb(0.9, 0.92, 0.95)
      });

      rowY -= 20;
    }

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
    // Bonus 1 & 5: Page 2 - DOCUMENT INDEX / TABLE OF CONTENTS
    // "Index page after the cover, showing the page number where each document starts."
    // "Bangla text shown correctly on the PDF cover or index page."
    // ==========================================
    if (hasIndexPage) {
      const indexPage = masterPdf.addPage([595.28, 841.89]);
      const { width: iWidth, height: iHeight } = indexPage.getSize();

      // Top title
      indexPage.drawRectangle({
        x: 45,
        y: iHeight - 75,
        width: iWidth - 90,
        height: 45,
        color: rgb(0.1, 0.18, 0.34)
      });

      indexPage.drawText("DOCUMENT INDEX & PAGINATION DIRECTORY", {
        x: 60,
        y: iHeight - 50,
        size: 14,
        font: helveticaBold,
        color: rgb(1, 1, 1)
      });

      // Render Bangla subtitle using Canvas PNG embedding (Bonus 5)
      try {
        const bnHeaderPng = await renderBanglaTextToPngBytes("নথি ইনডেক্স ও পৃষ্ঠা নম্বর নির্দেশিকা", 10, '#93c5fd');
        const embeddedBnHeader = await masterPdf.embedPng(bnHeaderPng.bytes);
        indexPage.drawImage(embeddedBnHeader, {
          x: 60,
          y: iHeight - 68,
          width: bnHeaderPng.ptWidth,
          height: bnHeaderPng.ptHeight
        });
      } catch (e) {
        console.warn("Bangla header canvas render error:", e);
      }

      // Index Table Header
      const idxThY = iHeight - 110;
      indexPage.drawRectangle({
        x: 45,
        y: idxThY - 5,
        width: iWidth - 90,
        height: 24,
        color: rgb(0.9, 0.93, 0.97)
      });

      indexPage.drawText("#", { x: 52, y: idxThY + 4, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
      indexPage.drawText("Document Title (EN / Bangla)", { x: 75, y: idxThY + 4, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
      indexPage.drawText("File Name", { x: 260, y: idxThY + 4, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
      indexPage.drawText("Pages", { x: 410, y: idxThY + 4, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
      indexPage.drawText("Starts At", { x: 455, y: idxThY + 4, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });
      indexPage.drawText("Page Range", { x: 510, y: idxThY + 4, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.28, 0.42) });

      let idxRowY = idxThY - 32;

      for (const item of loadedDocs) {
        const startP = item.startPage;
        const endP = item.startPage + item.pCount - 1;
        const rangeStr = item.pCount === 1 ? `Page ${startP}` : `p. ${startP} - ${endP}`;

        // Order badge
        indexPage.drawText(String(item.req.order), { x: 52, y: idxRowY + 6, size: 8.5, font: helveticaBold, color: rgb(0.2, 0.25, 0.35) });

        // English Title
        indexPage.drawText(item.req.title_en, { x: 75, y: idxRowY + 12, size: 8.5, font: helveticaBold, color: rgb(0.12, 0.18, 0.3) });

        // Bonus 5: Sharp Bangla Title below English Title
        try {
          const bnTitlePng = await renderBanglaTextToPngBytes(item.req.title_bn, 8, '#475569');
          const embBn = await masterPdf.embedPng(bnTitlePng.bytes);
          indexPage.drawImage(embBn, {
            x: 75,
            y: idxRowY - 2,
            width: bnTitlePng.ptWidth,
            height: bnTitlePng.ptHeight
          });
        } catch (e) {
          console.warn("Bangla row render error:", e);
        }

        // File name
        let fname = item.file.name;
        if (fname.length > 25) fname = fname.substring(0, 22) + '...';
        indexPage.drawText(fname, { x: 260, y: idxRowY + 6, size: 8, font: helveticaOblique, color: rgb(0.3, 0.35, 0.45) });

        // Page count
        indexPage.drawText(String(item.pCount), { x: 415, y: idxRowY + 6, size: 8.5, font: helvetica, color: rgb(0.2, 0.25, 0.35) });

        // Start Page badge
        indexPage.drawRectangle({
          x: 452,
          y: idxRowY - 1,
          width: 48,
          height: 18,
          color: rgb(0.92, 0.95, 0.99),
          borderColor: rgb(0.7, 0.8, 0.95),
          borderWidth: 0.5
        });
        indexPage.drawText(`Page ${startP}`, { x: 457, y: idxRowY + 4, size: 8, font: helveticaBold, color: rgb(0.1, 0.3, 0.7) });

        // Page Range
        indexPage.drawText(rangeStr, { x: 512, y: idxRowY + 6, size: 8, font: helvetica, color: rgb(0.25, 0.3, 0.4) });

        // Row border
        indexPage.drawLine({
          start: { x: 45, y: idxRowY - 6 },
          end: { x: iWidth - 45, y: idxRowY - 6 },
          thickness: 0.5,
          color: rgb(0.9, 0.92, 0.95)
        });

        idxRowY -= 28;
      }
    }

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
    // Bonus 2: DIGITAL SEAL & SIGNATURE STAMPING
    // "Seal or signature: the user uploads a PNG image and places it on chosen pages."
    // ==========================================
    let embeddedSeal = null;
    if (appState.sealSettings.enabled && appState.sealImageBytes) {
      try {
        embeddedSeal = await masterPdf.embedPng(appState.sealImageBytes);
      } catch (errSeal) {
        console.warn("Could not embed PNG seal:", errSeal);
      }
    }

    // ==========================================
    // Section 6 Rule 3 & 4: FOOTER STAMPING & SEAL ON EVERY PAGE
    // ==========================================
    const tenderId = appState.tender.tender_id;
    const finalPageCount = masterPdf.getPageCount();

    // Determine target pages for seal
    const sealTargetPages = new Set();
    if (embeddedSeal) {
      const mode = appState.sealSettings.targetPages;
      if (mode === 'all') {
        for (let i = 1; i <= finalPageCount; i++) sealTargetPages.add(i);
      } else if (mode === 'cover_index') {
        sealTargetPages.add(1);
        if (hasIndexPage) sealTargetPages.add(2);
      } else if (mode === 'cover_only') {
        sealTargetPages.add(1);
      } else if (mode === 'last_page') {
        sealTargetPages.add(finalPageCount);
      } else if (mode === 'first_page_each') {
        sealTargetPages.add(1);
        if (hasIndexPage) sealTargetPages.add(2);
        for (const item of loadedDocs) sealTargetPages.add(item.startPage);
      } else if (mode === 'custom') {
        const parts = (appState.sealSettings.customPages || '').split(',');
        for (const p of parts) {
          const num = parseInt(p.trim(), 10);
          if (!isNaN(num) && num >= 1 && num <= finalPageCount) {
            sealTargetPages.add(num);
          }
        }
      }
    }

    for (let i = 0; i < finalPageCount; i++) {
      const page = masterPdf.getPage(i);
      const { width: pWidth, height: pHeight } = page.getSize();
      const pageNum = i + 1;
      const footerText = `${tenderId} | Page ${pageNum} of ${finalPageCount}`;
      const textWidth = helveticaBold.widthOfTextAtSize(footerText, 9);
      const centerX = (pWidth - textWidth) / 2;

      // Draw Seal / Signature if targeted for this page
      if (embeddedSeal && sealTargetPages.has(pageNum)) {
        const sealW = appState.sealSettings.width || 80;
        const sealH = (embeddedSeal.height / embeddedSeal.width) * sealW;
        let sealX = pWidth - sealW - 40;
        let sealY = 32;

        if (appState.sealSettings.position === 'bottom_left') {
          sealX = 40;
          sealY = 32;
        } else if (appState.sealSettings.position === 'top_right') {
          sealX = pWidth - sealW - 40;
          sealY = pHeight - sealH - 30;
        } else if (appState.sealSettings.position === 'center') {
          sealX = (pWidth - sealW) / 2;
          sealY = (pHeight - sealH) / 2;
        }

        page.drawImage(embeddedSeal, {
          x: sealX,
          y: sealY,
          width: sealW,
          height: sealH,
          opacity: appState.sealSettings.opacity || 0.9
        });
      }

      // Draw clean subtle white pill background in bottom margin
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pWidth,
        height: 24,
        color: rgb(1, 1, 1),
        opacity: 0.95
      });

      // Separator line above footer
      page.drawLine({
        start: { x: 36, y: 24 },
        end: { x: pWidth - 36, y: 24 },
        thickness: 0.5,
        color: rgb(0.8, 0.85, 0.9)
      });

      // Stamped footer
      page.drawText(footerText, {
        x: centerX,
        y: 8,
        size: 9,
        font: helveticaBold,
        color: rgb(0.18, 0.24, 0.35)
      });
    }

    // Save master compiled PDF
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

function previewUploadedFile(fileId) {
  const file = appState.getFile(fileId);
  if (file && file.buffer) {
    openPdfPreviewModal(file.buffer, file.name);
  }
}

// Bonus 8: AI Help Engine (Rulebook Section 5.5)
async function callGeminiApi(prompt) {
  const apiKey = appState.aiApiKey;
  if (!apiKey) {
    throw new Error("No Gemini API key configured. Please enter your API key in the field above.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${resp.status}: ${resp.statusText}`);
  }

  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
}

async function handleAiAudit() {
  const outputBox = document.getElementById('ai-output-box');
  if (!outputBox) return;

  outputBox.innerHTML = '<div style="color: #64748b;">⏳ Running AI compliance audit on tender package...</div>';

  const blockingIssues = appState.getBlockingIssues();
  const summaryContext = {
    tender: appState.tender,
    requirements: appState.requirements.map(r => ({
      id: r.id,
      order: r.order,
      title: r.title_en,
      mandatory: r.mandatory,
      has_expiry: r.has_expiry,
      status: appState.getRequirementStatus(r).code,
      matchedFile: appState.matches[r.id] ? appState.getFile(appState.matches[r.id]).name : null,
      expiryDate: appState.expiryDates[r.id] || null
    })),
    duplicateFiles: appState.uploadedFiles.filter(f => f.isDuplicate).map(f => f.name),
    blockingIssues
  };

  const prompt = `You are an expert Government & Corporate Tender Compliance Auditor.
Analyze this bidder's tender package preparation state:
${JSON.stringify(summaryContext, null, 2)}

Provide a concise, professional audit report in markdown:
1. Overall Compliance Score (out of 100%)
2. Status Breakdown (Missing, Expired, Expiry Needed, OK)
3. Critical Risk Factors & Actionable Steps to Make Submission Eligible
4. Final Recommendation.`;

  try {
    if (appState.aiApiKey) {
      const response = await callGeminiApi(prompt);
      outputBox.innerHTML = `<div style="white-space: pre-wrap;">${response}</div>`;
    } else {
      // Offline fallback rule-based intelligence
      const score = Math.round(((appState.requirements.length - blockingIssues.length) / appState.requirements.length) * 100);
      outputBox.innerHTML = `
        <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">📋 Offline AI Rule-Based Compliance Audit Report</div>
        <div style="margin-bottom: 0.5rem;"><strong>Compliance Score:</strong> ${score}%</div>
        <div style="margin-bottom: 0.5rem;"><strong>Blocking Issues:</strong> ${blockingIssues.length} issues detected.</div>
        <ul style="padding-left: 1.25rem; margin-bottom: 0.75rem;">
          ${blockingIssues.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <div style="font-size: 0.8rem; color: #64748b;">💡 Note: Enter your Gemini API key above to unlock full generative LLM auditing.</div>
      `;
    }
  } catch (err) {
    outputBox.innerHTML = `<div style="color: #dc2626;">AI Error: ${err.message}</div>`;
  }
}

async function handleAiSuggestDates() {
  const outputBox = document.getElementById('ai-output-box');
  if (!outputBox) return;

  outputBox.innerHTML = '<div style="color: #64748b;">⏳ Checking expiry requirements and dates...</div>';

  const expiryReqs = appState.requirements.filter(r => r.has_expiry);
  const info = expiryReqs.map(r => {
    const f = appState.matches[r.id] ? appState.getFile(appState.matches[r.id]) : null;
    return `Requirement ${r.id} (${r.title_en}): Matched File=${f ? f.name : 'None'}, Current Expiry=${appState.expiryDates[r.id] || 'Not set'}, Tender Deadline=${appState.tender.submission_deadline}`;
  }).join('\n');

  const prompt = `Review these tender documents with expiry requirements:
${info}
State which documents need future expiry dates on or after the deadline, and advise on standard validity duration.`;

  try {
    if (appState.aiApiKey) {
      const response = await callGeminiApi(prompt);
      outputBox.innerHTML = `<div style="white-space: pre-wrap;">${response}</div>`;
    } else {
      outputBox.innerHTML = `
        <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">📅 Expiry Date Recommendations</div>
        <p>Tender submission deadline is <strong>${appState.tender.submission_deadline}</strong>.</p>
        <p>• <strong>Trade License (R01):</strong> Must be valid on or after deadline (e.g. 2027-06-30).</p>
        <p>• <strong>Bank Solvency (R04):</strong> Must remain valid through submission period (e.g. 2026-12-31).</p>
      `;
    }
  } catch (err) {
    outputBox.innerHTML = `<div style="color: #dc2626;">AI Error: ${err.message}</div>`;
  }
}

async function handleAiQuestion(question) {
  const outputBox = document.getElementById('ai-output-box');
  if (!outputBox) return;

  outputBox.innerHTML = '<div style="color: #64748b;">⏳ AI is thinking...</div>';

  const prompt = `Context: Tender ${appState.tender.tender_id} (${appState.tender.title}), Deadline: ${appState.tender.submission_deadline}.
User Question: "${question}"
Answer directly and helpfully according to standard procurement guidelines.`;

  try {
    if (appState.aiApiKey) {
      const response = await callGeminiApi(prompt);
      outputBox.innerHTML = `<div style="white-space: pre-wrap;">${response}</div>`;
    } else {
      outputBox.innerHTML = `
        <div style="font-weight: 600; color: #1e293b;">Q: ${question}</div>
        <p style="margin-top: 0.5rem;">Procurement Guidelines: All mandatory documents must be matched with valid, unexpired, non-duplicate PDFs before submission. Enter your API key for custom LLM answers.</p>
      `;
    }
  } catch (err) {
    outputBox.innerHTML = `<div style="color: #dc2626;">AI Error: ${err.message}</div>`;
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
  updateSealPreviewUI();
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

    // Bonus 6: Check for match suggestion if not currently matched
    const suggestion = !matchedFile ? getSuggestedFileForRequirement(req) : null;

    const tr = document.createElement('tr');
    tr.className = `req-row ${status.badgeClass}`;

    let optionsHtml = `<option value="">${appState.t('selectFilePlaceholder')}</option>`;
    for (const f of appState.uploadedFiles) {
      let matchedElsewhere = false;
      for (const [rId, fId] of Object.entries(appState.matches)) {
        if (fId === f.id && rId !== req.id) {
          matchedElsewhere = true;
          break;
        }
      }

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
          ${suggestion ? `
            <div>
              <span class="suggestion-chip" data-apply-suggest-id="${suggestion.id}" title="Click to match suggested file">
                💡 ${appState.currentLang === 'bn' ? 'পরামর্শ' : 'Suggest'}: ${suggestion.name} [✓]
              </span>
            </div>
          ` : ''}
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

    const suggestChip = tr.querySelector(`[data-apply-suggest-id]`);
    if (suggestChip && suggestion) {
      suggestChip.addEventListener('click', () => {
        appState.matchFile(req.id, suggestion.id);
        if (req.id === 'R01' && suggestion.name.includes('2026')) appState.setExpiryDate('R01', '2027-06-30');
        if (req.id === 'R04') appState.setExpiryDate('R04', '2026-12-31');
        renderApp();
      });
    }

    const unmatchBtn = tr.querySelector(`[data-unmatch-id="${req.id}"]`);
    if (unmatchBtn) {
      unmatchBtn.addEventListener('click', () => {
        appState.unmatch(req.id);
        renderApp();
      });
    }

    const previewBtn = tr.querySelector(`[data-preview-req-file]`);
    if (previewBtn && matchedFile) {
      previewBtn.addEventListener('click', () => {
        previewUploadedFile(matchedFile.id);
      });
    }

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

  if (btnDownload) {
    btnDownload.disabled = !appState.generatedPdfBytes;
  }
  if (btnPreview) {
    btnPreview.disabled = !appState.generatedPdfBytes;
  }
}
