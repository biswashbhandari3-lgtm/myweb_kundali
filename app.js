/**
 * app.js - मुख्य युजर इन्टरफेस तथा नियन्त्रक (Main UI Controller)
 * Kundali Darsan Web
 */

// Global State
const SAVED_KUNDALIS_KEY = "kundali_darsan_saved_charts";
let currentKundaliData = null;
let currentPanchangData = null;
let isCurrentKundaliSaved = false;
let currentSiddhanta = (function() {
    try {
        return localStorage.getItem("kundali_siddhanta") || "surya";
    } catch (e) {
        return "surya";
    }
})(); // "surya" (सूर्य-सिद्धान्त - SkyVision Standard) वा "drik" (दृक्-सिद्धान्त)

document.addEventListener("DOMContentLoaded", () => {
    initDistricts();
    initDateControls();
    initPanchangControls();
    initTabs();
    initEventListeners();
    syncSiddhantaUI();

    // Default calculation on page load for today
    setInitialDefaultValues();
    updatePanchangCard();
    initClock();
    // generateKundali(); // कुण्डली निर्माण बटनमा क्लिक गरेपछि मात्र कुण्डली देखाउने
    updateSavedCountBadge();
});

/**
 * विश्वका देशहरू तथा शहरहरूको सूची ड्रपडाउनमा भर्छ
 */
function initDistricts() {
    const countrySelect = document.getElementById("birthCountry");
    const districtSelect = document.getElementById("birthPlace");

    if (countrySelect && typeof WORLD_COUNTRIES !== "undefined") {
        countrySelect.innerHTML = "";
        WORLD_COUNTRIES.forEach((c) => {
            const opt = document.createElement("option");
            opt.value = c.code;
            opt.textContent = c.nameNp;
            countrySelect.appendChild(opt);
        });
        countrySelect.value = "NP";

        countrySelect.addEventListener("change", () => {
            populateCitiesForCountry(countrySelect.value);
        });
    }

    populateCitiesForCountry(countrySelect ? countrySelect.value : "NP");

    if (districtSelect) {
        districtSelect.addEventListener("change", updateCoordinatesFromCity);
    }

    // Also populate districts for Kundali Milan (Boy & Girl)
    const boyPlace = document.getElementById("boyPlace");
    const girlPlace = document.getElementById("girlPlace");
    if (boyPlace && girlPlace) {
        boyPlace.innerHTML = "";
        girlPlace.innerHTML = "";
        NEPAL_DISTRICTS.forEach((d, idx) => {
            const bOpt = document.createElement("option");
            bOpt.value = idx;
            bOpt.textContent = `${d.nameNp} (${d.nameEn})`;
            boyPlace.appendChild(bOpt);

            const gOpt = document.createElement("option");
            gOpt.value = idx;
            gOpt.textContent = `${d.nameNp} (${d.nameEn})`;
            girlPlace.appendChild(gOpt);
        });
    }
}

function populateCitiesForCountry(countryCode, defaultIdx = 0) {
    const districtSelect = document.getElementById("birthPlace");
    if (!districtSelect) return;

    const country = (typeof getCountryByCode === "function") 
        ? getCountryByCode(countryCode) 
        : ((typeof WORLD_COUNTRIES !== "undefined" && WORLD_COUNTRIES.find(c => c.code === countryCode)) || (typeof WORLD_COUNTRIES !== "undefined" ? WORLD_COUNTRIES[0] : { cities: NEPAL_DISTRICTS }));

    districtSelect.innerHTML = "";
    if (country && country.cities) {
        country.cities.forEach((d, idx) => {
            const opt = document.createElement("option");
            opt.value = idx;
            const degInfo = (d.latDeg && d.lonDeg) ? ` - ${d.latDeg}, ${d.lonDeg}` : "";
            opt.textContent = `${d.nameNp} (${d.nameEn})${degInfo}`;
            districtSelect.appendChild(opt);
        });

        const safeIdx = Math.min(Math.max(0, defaultIdx), country.cities.length - 1);
        districtSelect.selectedIndex = safeIdx;
    }

    updateCoordinatesFromCity();
}

function updateCoordinatesFromCity() {
    const countrySelect = document.getElementById("birthCountry");
    const districtSelect = document.getElementById("birthPlace");
    if (!districtSelect) return;

    const countryCode = countrySelect ? countrySelect.value : "NP";
    const idx = parseInt(districtSelect.value, 10) || 0;
    const d = (typeof getCityData === "function") 
        ? getCityData(countryCode, idx) 
        : (NEPAL_DISTRICTS[idx] || NEPAL_DISTRICTS[0]);

    const latInput = document.getElementById("customLat");
    const lonInput = document.getElementById("customLon");
    const tzInput = document.getElementById("birthTzOffset");

    if (latInput && lonInput && d) {
        latInput.value = d.lat.toFixed(4);
        lonInput.value = d.lon.toFixed(4);
    }
    if (tzInput && d) {
        const country = (typeof getCountryByCode === "function") ? getCountryByCode(countryCode) : null;
        tzInput.value = (d.tz !== undefined) ? d.tz : (country?.defaultTz || 5.75);
    }
}

/**
 * BS र AD मितिका नियन्त्रकहरू इनिसियलाइज गर्छ
 */
function initDateControls() {
    const bsYear = document.getElementById("bsYear");
    const bsMonth = document.getElementById("bsMonth");
    const bsDay = document.getElementById("bsDay");
    const adDateInput = document.getElementById("adDate");

    if (!bsYear || !bsMonth || !bsDay) return;

    // Populate BS Year: 1970 to 2200
    bsYear.innerHTML = "";
    for (let y = 2200; y >= 1970; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = `${y} वि.सं.`;
        bsYear.appendChild(opt);
    }

    // Populate BS Month: 1 to 12
    bsMonth.innerHTML = "";
    BS_MONTH_NAMES_NP.forEach((mName, idx) => {
        const opt = document.createElement("option");
        opt.value = idx + 1;
        opt.textContent = `${idx + 1}. ${mName}`;
        bsMonth.appendChild(opt);
    });

    // Populate BS Day: 1 to 32
    updateBsDays();

    // Event listener when BS changes -> update AD
    bsYear.addEventListener("change", () => { updateBsDays(); syncBsToAd(); });
    bsMonth.addEventListener("change", () => { updateBsDays(); syncBsToAd(); });
    bsDay.addEventListener("change", syncBsToAd);

    // Event listener when AD changes -> update BS
    if (adDateInput) {
        adDateInput.addEventListener("change", syncAdToBs);
    }
}

function updateBsDays() {
    const bsYear = parseInt(document.getElementById("bsYear").value, 10);
    const bsMonth = parseInt(document.getElementById("bsMonth").value, 10);
    const bsDay = document.getElementById("bsDay");
    const currentVal = parseInt(bsDay.value, 10) || 1;

    const maxDays = (BS_CALENDAR_DATA[bsYear] && BS_CALENDAR_DATA[bsYear][bsMonth - 1]) || 32;

    bsDay.innerHTML = "";
    for (let d = 1; d <= maxDays; d++) {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = `${d} गते`;
        bsDay.appendChild(opt);
    }

    bsDay.value = Math.min(currentVal, maxDays);
}

function syncBsToAd() {
    const bsYear = parseInt(document.getElementById("bsYear").value, 10);
    const bsMonth = parseInt(document.getElementById("bsMonth").value, 10);
    const bsDay = parseInt(document.getElementById("bsDay").value, 10);
    const adDateInput = document.getElementById("adDate");

    const ad = bsToAd(bsYear, bsMonth, bsDay);
    const y = ad.getUTCFullYear();
    const m = (ad.getUTCMonth() + 1).toString().padStart(2, '0');
    const d = ad.getUTCDate().toString().padStart(2, '0');
    if (adDateInput) {
        adDateInput.value = `${y}-${m}-${d}`;
    }
}

function syncAdToBs() {
    const adDateInput = document.getElementById("adDate");
    if (!adDateInput || !adDateInput.value) return;

    const parts = adDateInput.value.split("-").map(Number);
    if (parts.length === 3) {
        const bs = adToBs(parts[0], parts[1], parts[2]);
        const bsYear = document.getElementById("bsYear");
        const bsMonth = document.getElementById("bsMonth");
        const bsDay = document.getElementById("bsDay");

        if (bsYear && bsMonth && bsDay) {
            bsYear.value = bs.year;
            bsMonth.value = bs.month;
            updateBsDays();
            bsDay.value = bs.day;
        }
    }
}

/**
 * जन्मकुण्डली निर्माणको इनपुटहरू वर्तमान समय (Right Now) मा सेट गर्छ
 */
function setKundaliToCurrentTime() {
    const now = new Date();
    const bs = adToBs(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const bsYear = document.getElementById("bsYear");
    const bsMonth = document.getElementById("bsMonth");
    const bsDay = document.getElementById("bsDay");
    const adDateInput = document.getElementById("adDate");
    const birthTime = document.getElementById("birthTime");

    if (bsYear) bsYear.value = bs.year;
    if (bsMonth) bsMonth.value = bs.month;
    updateBsDays();
    if (bsDay) bsDay.value = bs.day;
    syncBsToAd();

    if (birthTime) {
        const pad = (n) => n.toString().padStart(2, '0');
        birthTime.value = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
}

function setInitialDefaultValues() {
    setKundaliToCurrentTime();
}

/**
 * ट्याब परिवर्तन नियन्त्रण
 */
function initTabs() {
    const tabButtons = document.querySelectorAll(".nav-tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-tab");

            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            const targetTab = document.getElementById(targetId);
            if (targetTab) targetTab.classList.add("active");

            // If Dasha tab is clicked, scroll directly to Dasha card on Kundali page
            if (targetId === "tab-dasha") {
                switchToTab("tab-kundali");
                const dashaEl = document.getElementById("kundaliDashaCard");
                if (dashaEl) {
                    setTimeout(() => {
                        dashaEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 80);
                }
                return;
            }

            // If Phaladesh tab is clicked, refresh predictions view
            if (targetId === "tab-phaladesh") {
                if (typeof renderPhaladeshTabUI === "function") {
                    renderPhaladeshTabUI();
                }
            }

            // If Parva tab is clicked, refresh annual festivals view
            if (targetId === "tab-parva") {
                if (typeof renderParvaTabUI === "function") {
                    renderParvaTabUI();
                }
            }
        });
    });
}

function switchToTab(tabId) {
    if (tabId === "tab-patrika") {
        switchToTab("tab-kundali");
        if (typeof togglePatrikaView === "function") {
            togglePatrikaView(true);
        }
        const patrikaEl = document.getElementById("kundaliPatrikaCard");
        if (patrikaEl) {
            setTimeout(() => {
                patrikaEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
        }
        return;
    }

    if (tabId === "tab-dasha") {
        switchToTab("tab-kundali");
        const dashaEl = document.getElementById("kundaliDashaCard");
        if (dashaEl) {
            setTimeout(() => {
                dashaEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
        }
        return;
    }

    const tabButtons = document.querySelectorAll(".nav-tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
    });
    tabContents.forEach(c => {
        c.classList.toggle("active", c.id === tabId);
    });

    if (tabId === "tab-phaladesh" && typeof renderPhaladeshTabUI === "function") {
        renderPhaladeshTabUI();
    }
    if (tabId === "tab-parva" && typeof renderParvaTabUI === "function") {
        renderParvaTabUI();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}
window.switchToTab = switchToTab;

/**
 * सिद्धान्त छनोट तथा जानकारी फ्लोटिङ नोटिफिकेसन
 */
function showSiddhantaNotice(message, type = "info") {
    let existingToast = document.querySelector(".siddhanta-toast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");
    const typeClass = type === "success" ? "success" : (type === "warning" ? "warning" : "");
    toast.className = `siddhanta-toast ${typeClass}`.trim();
    const icon = type === "warning" ? "⚠️" : (type === "success" ? "✅" : "✨");
    toast.innerHTML = `<span style="font-size: 1.1rem;">${icon}</span><span>${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(16px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => {
            if (typeof toast.remove === 'function') {
                toast.remove();
            } else if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function syncSiddhantaUI() {
    const isSurya = (currentSiddhanta === "surya");
    
    // 1. Kundali Tab Buttons
    const btnDrik = document.getElementById("btnSiddhantaDrik");
    const btnSurya = document.getElementById("btnSiddhantaSurya");
    if (btnDrik && btnSurya) {
        if (isSurya) {
            btnSurya.classList.add("active");
            btnDrik.classList.remove("active");
        } else {
            btnDrik.classList.add("active");
            btnSurya.classList.remove("active");
        }
        const dDot = btnDrik.querySelector(".siddhanta-dot");
        const sDot = btnSurya.querySelector(".siddhanta-dot");
        if (dDot) dDot.style.display = isSurya ? "none" : "inline-block";
        if (sDot) sDot.style.display = isSurya ? "inline-block" : "none";
    }

    // 2. Global Navbar Buttons
    const btnGlobalSurya = document.getElementById("btnGlobalSurya");
    const btnGlobalDrik = document.getElementById("btnGlobalDrik");
    if (btnGlobalSurya && btnGlobalDrik) {
        if (isSurya) {
            btnGlobalSurya.classList.add("active");
            btnGlobalSurya.style.background = "#ea580c";
            btnGlobalSurya.style.color = "white";
            btnGlobalDrik.classList.remove("active");
            btnGlobalDrik.style.background = "transparent";
            btnGlobalDrik.style.color = "#78350f";
        } else {
            btnGlobalDrik.classList.add("active");
            btnGlobalDrik.style.background = "#0284c7";
            btnGlobalDrik.style.color = "white";
            btnGlobalSurya.classList.remove("active");
            btnGlobalSurya.style.background = "transparent";
            btnGlobalSurya.style.color = "#78350f";
        }
    }

    // 3. Status Badges
    const statusText = document.getElementById("globalSiddhantaStatusText");
    if (statusText) {
        statusText.textContent = isSurya ? "सूर्य सिद्धान्त (वेदश्चक्षु १.० इन्जिन)" : "दृक् सिद्धान्त (वेदश्चक्षु १.० इन्जिन)";
        statusText.style.color = isSurya ? "#b45309" : "#0369a1";
    }
    const engineBadge = document.getElementById("globalEngineStatusBadge");
    if (engineBadge) {
        engineBadge.textContent = isSurya ? "मानक आधार" : "दृक् गणित";
        engineBadge.style.background = isSurya ? "#ea580c" : "#0284c7";
    }
    const panchangBadge = document.getElementById("panchangSiddhantaBadge");
    if (panchangBadge) {
        panchangBadge.textContent = isSurya ? "☀️ सूर्य सिद्धान्त (वेदश्चक्षु १.०)" : "👁️ दृक् सिद्धान्त (वेदश्चक्षु १.०)";
        panchangBadge.className = isSurya
            ? "text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
            : "text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300 shadow-2xs";
    }
}

function setSiddhanta(sid, notify = true) {
    if (currentSiddhanta === sid && notify === false) return;
    currentSiddhanta = sid;
    try {
        localStorage.setItem("kundali_siddhanta", sid);
    } catch (e) {}

    syncSiddhantaUI();

    // Re-render Daily Panchang Card
    if (typeof updatePanchangCard === "function") {
        updatePanchangCard();
    }

    // Re-render Calendar Grid if available
    if (typeof renderCalendarGrid === "function") {
        renderCalendarGrid();
    }

    // Re-render Kundali if already generated
    if (currentKundaliData) {
        generateKundali(true);
    }

    if (notify) {
        if (sid === "surya") {
            showSiddhantaNotice("☀️ सूर्य-सिद्धान्त (वेदश्चक्षु १.० इन्जिन) लागु भयो। सम्पूर्ण पञ्चाङ्ग तथा कुण्डली यसै मानक आधारमा अद्यावधिक गरियो।", "success");
        } else {
            showSiddhantaNotice("👁️ दृक्-सिद्धान्त (वेदश्चक्षु १.० इन्जिन - प्रत्यक्ष वेध सम्मत) लागु भयो।", "info");
        }
    }
}

function initEventListeners() {
    // १. सिद्धान्त छनोट स्विच नियन्त्रण (Drik vs Surya Siddhanta Switch)
    const btnDrik = document.getElementById("btnSiddhantaDrik");
    const btnSurya = document.getElementById("btnSiddhantaSurya");
    if (btnDrik) btnDrik.addEventListener("click", () => setSiddhanta("drik", true));
    if (btnSurya) btnSurya.addEventListener("click", () => setSiddhanta("surya", true));

    const btnGlobalSurya = document.getElementById("btnGlobalSurya");
    const btnGlobalDrik = document.getElementById("btnGlobalDrik");
    if (btnGlobalSurya) btnGlobalSurya.addEventListener("click", () => setSiddhanta("surya", true));
    if (btnGlobalDrik) btnGlobalDrik.addEventListener("click", () => setSiddhanta("drik", true));

    const generateBtn = document.getElementById("generateKundaliBtn");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateKundali);
    }

    const kundaliRefreshBtn = document.getElementById("kundaliRefreshBtn");
    if (kundaliRefreshBtn) {
        kundaliRefreshBtn.addEventListener("click", () => {
            kundaliRefreshBtn.classList.add("rotating");
            setKundaliToCurrentTime();
            generateKundali();
            setTimeout(() => {
                kundaliRefreshBtn.classList.remove("rotating");
            }, 600);
        });
    }

    const matchBtn = document.getElementById("calculateMatchBtn");
    if (matchBtn) {
        matchBtn.addEventListener("click", calculateMatchMaking);
    }

    const togglePatrikaBtn = document.getElementById("togglePatrikaBtn");
    if (togglePatrikaBtn) {
        togglePatrikaBtn.addEventListener("click", () => {
            if (typeof togglePatrikaView === "function") {
                togglePatrikaView();
            }
        });
    }

    const printBtn = document.getElementById("printPatrikaBtn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            if (!currentKundaliData) {
                showSiddhantaNotice("कृपया पहिले कुण्डली निर्माण गर्नुहोस्।", "warning");
                return;
            }
            renderPatrikaView();
            window.print();
        });
    }

    // Panchang Card Buttons
    const pRefreshBtn = document.getElementById("pRefreshBtn");
    if (pRefreshBtn) {
        pRefreshBtn.addEventListener("click", () => {
            pRefreshBtn.classList.add("rotating");
            setCurrentPanchangDate();
            updatePanchangCard();
            setTimeout(() => {
                pRefreshBtn.classList.remove("rotating");
            }, 600);
        });
    }

    const pDownloadBtn = document.getElementById("pDownloadBtn");
    if (pDownloadBtn) {
        pDownloadBtn.addEventListener("click", downloadPanchangImage);
    }

    const pParvaListBtn = document.getElementById("pParvaListBtn");
    if (pParvaListBtn) {
        pParvaListBtn.addEventListener("click", () => {
            switchToTab("tab-parva");
        });
    }

    // Saved Kundalis Modal
    const openSavedModalBtn = document.getElementById("openSavedModalBtn");
    if (openSavedModalBtn) {
        openSavedModalBtn.addEventListener("click", openSavedModal);
    }

    // Form Save Kundali Button (हरियो मार्किङ् गरिएको स्थानको बटन)
    const saveCurrentKundaliFormBtn = document.getElementById("saveCurrentKundaliFormBtn");
    if (saveCurrentKundaliFormBtn) {
        saveCurrentKundaliFormBtn.addEventListener("click", async () => {
            // Always generate latest calculation from current form inputs before saving
            await generateKundali(true);
            saveCurrentKundali();
        });
    }

    const closeSavedModalBtn = document.getElementById("closeSavedModalBtn");
    if (closeSavedModalBtn) {
        closeSavedModalBtn.addEventListener("click", closeSavedModal);
    }

    const savedKundaliModal = document.getElementById("savedKundaliModal");
    if (savedKundaliModal) {
        savedKundaliModal.addEventListener("click", (e) => {
            if (e.target === savedKundaliModal) closeSavedModal();
        });
    }
}

/**
 * मुख्य कुण्डली निर्माण प्रकार्य (Generate Kundali)
 */
async function generateKundali(skipResetSaveStatus = false) {
    if (!skipResetSaveStatus) {
        isCurrentKundaliSaved = false;
    }
    const personName = document.getElementById("personName")?.value.trim() || "श्री जातक";
    const gender = document.getElementById("gender")?.value || "पुरुष";
    const fatherName = document.getElementById("fatherName")?.value.trim() || "-";
    const motherName = document.getElementById("motherName")?.value.trim() || "-";
    const gotra = document.getElementById("gotra")?.value.trim() || "काश्यप";

    const bsYear = parseInt(document.getElementById("bsYear")?.value, 10);
    const bsMonth = parseInt(document.getElementById("bsMonth")?.value, 10);
    const bsDay = parseInt(document.getElementById("bsDay")?.value, 10);
    const bsMonthName = BS_MONTH_NAMES_NP[bsMonth - 1] || "";

    const birthTimeStr = document.getElementById("birthTime")?.value || "12:00:00";
    const timeParts = birthTimeStr.split(":").map(Number);
    const birthHour = timeParts[0] || 0;
    const birthMin = timeParts[1] || 0;
    const birthSec = timeParts[2] || 0;
    const birthDecHour = birthHour + birthMin / 60.0 + birthSec / 3600.0;

    const outputSec = document.getElementById("kundaliOutputSection");
    if (outputSec) {
        outputSec.style.display = "block";
    }

    const lat = parseFloat(document.getElementById("customLat")?.value) || 27.7172;
    const lon = parseFloat(document.getElementById("customLon")?.value) || 85.3240;
    const tzOffset = parseFloat(document.getElementById("birthTzOffset")?.value) || 5.75;

    const countrySelect = document.getElementById("birthCountry");
    const countryCode = countrySelect ? countrySelect.value : "NP";
    const countryName = countrySelect ? countrySelect.options[countrySelect.selectedIndex]?.text?.split("(")[0]?.trim() : "नेपाल";

    const districtSelect = document.getElementById("birthPlace");
    const placeName = districtSelect?.options?.[districtSelect.selectedIndex]?.text?.split("-")[0]?.split("(")[0]?.trim() || "काठमाडौँ";

    // 1. Gregorian Date & Julian Day
    const adDateUtc = bsToAd(bsYear, bsMonth, bsDay);
    const birthYear = adDateUtc.getUTCFullYear();
    const birthMonth = adDateUtc.getUTCMonth();
    const birthDay = adDateUtc.getUTCDate();

    // Local birth time converted to UTC using dynamic timezone offset
    const localBirthDate = new Date(birthYear, birthMonth, birthDay, birthHour, birthMin, birthSec);
    const birthTimeSeconds = birthHour * 3600 + birthMin * 60 + birthSec;
    const utcMs = Date.UTC(birthYear, birthMonth, birthDay) + (birthTimeSeconds - tzOffset * 3600) * 1000;
    const utcDate = new Date(utcMs);

    const jd = getJulianDay(utcDate);

    // 2. Astronomical Lagna & Planet Positions based on selected Siddhanta (वेदश्चक्षु १.० इन्जिन - पूर्ण स्थानीय इन-ब्राउजर)
    let ayanamsha;
    let lagnaDeg;
    let planets;
    let siddhantaName;
    let ayanamshaLabel;

    if (currentSiddhanta === "surya") {
        ayanamsha = typeof getSuryaSiddhantaAyanamsha === "function" ? getSuryaSiddhantaAyanamsha(jd) : 23.8407;
        lagnaDeg = typeof calculateSuryaSiddhantaLagna === "function" ? calculateSuryaSiddhantaLagna(jd, lat, lon, ayanamsha) : calculateLagna(jd, lat, lon, ayanamsha);
        planets = typeof calculateSuryaSiddhantaPlanets === "function" ? calculateSuryaSiddhantaPlanets(jd, ayanamsha) : calculatePlanetPositions(jd, ayanamsha);
        siddhantaName = "सूर्य-सिद्धान्त (वेदश्चक्षु १.०)";
        ayanamshaLabel = ayanamsha.toFixed(4) + "° (सूर्य-सिद्धान्त अयनांश)";
        showSiddhantaNotice("सूर्य-सिद्धान्त (वेदश्चक्षु १.० इन्जिन) अनुसार कुण्डली सफलतापूर्वक निर्माण गरियो।", "success");
    } else {
        ayanamsha = getLahiriAyanamsha(jd);
        lagnaDeg = calculateLagna(jd, lat, lon, ayanamsha);
        planets = calculatePlanetPositions(jd, ayanamsha);
        siddhantaName = "दृक्-सिद्धान्त (वेदश्चक्षु १.०)";
        ayanamshaLabel = ayanamsha.toFixed(4) + "° (लाहिडी चित्रापक्षीय अयनांश)";
        showSiddhantaNotice("दृक्-सिद्धान्त (वेदश्चक्षु १.० इन्जिन) अनुसार कुण्डली सफलतापूर्वक निर्माण गरियो।", "info");
    }

    // 3. Sunrise, Sunset, Dinamana, Ishtakala
    const sunTimes = calculateSunRiseSet(utcDate, lat, lon, tzOffset);
    const dinamana = calculateDinamana(sunTimes.sunrise, sunTimes.sunset);
    const ishtakala = calculateIshtakala(birthDecHour, sunTimes.sunrise);
    const ishtakalaColonStr = `${ishtakala.ghati.toString().padStart(2, '0')}:${ishtakala.pala.toString().padStart(2, '0')}:${ishtakala.vipala.toString().padStart(2, '0')}`;

    // 4. Astrological Parameters
    const lagnaRashi = getRashiDetails(lagnaDeg);
    const moonRashi = getRashiDetails(planets.Chandra.deg);
    const sunRashi = getRashiDetails(planets.Surya.deg);
    const moonNak = getNakshatraDetails(planets.Chandra.deg);
    const tithi = calculateTithi(planets.Surya.deg, planets.Chandra.deg);
    const yoga = calculateYoga(planets.Surya.deg, planets.Chandra.deg);
    const karana = calculateKarana(planets.Surya.deg, planets.Chandra.deg);

    // 5. Divisional (Varga) charts calculations (षोडशवर्ग)
    const navamshaLagna = calculateNavamshaRashi(lagnaDeg);
    const navamshaPlanets = {};
    const horaLagna = calculateHoraRashi(lagnaDeg);
    const horaPlanets = {};
    const drekkanaLagna = calculateDrekkanaRashi(lagnaDeg);
    const drekkanaPlanets = {};
    const chaturthamshaLagna = calculateChaturthamshaRashi(lagnaDeg);
    const chaturthamshaPlanets = {};
    const saptamamshaLagna = calculateSaptamamshaRashi(lagnaDeg);
    const saptamamshaPlanets = {};
    const dashamshaLagna = calculateDashamshaRashi(lagnaDeg);
    const dashamshaPlanets = {};
    const dwadashamshaLagna = calculateDwadashamshaRashi(lagnaDeg);
    const dwadashamshaPlanets = {};
    const shodashamshaLagna = calculateShodashamshaRashi(lagnaDeg);
    const shodashamshaPlanets = {};
    const vimshamshaLagna = calculateVimshamshaRashi(lagnaDeg);
    const vimshamshaPlanets = {};
    const chaturvimshamshaLagna = calculateChaturvimshamshaRashi(lagnaDeg);
    const chaturvimshamshaPlanets = {};
    const saptavimshamshaLagna = calculateSaptavimshamshaRashi(lagnaDeg);
    const saptavimshamshaPlanets = {};
    const trimshamshaLagna = calculateTrimshamshaRashi(lagnaDeg);
    const trimshamshaPlanets = {};
    const chatvarimshamshaLagna = calculateChatvarimshamshaRashi(lagnaDeg);
    const chatvarimshamshaPlanets = {};
    const akshavedamshaLagna = calculateAkshavedamshaRashi(lagnaDeg);
    const akshavedamshaPlanets = {};
    const shashtyamshaLagna = calculateShashtyamshaRashi(lagnaDeg);
    const shashtyamshaPlanets = {};

    Object.keys(planets).forEach(k => {
        const pDeg = planets[k].deg;
        navamshaPlanets[k] = calculateNavamshaRashi(pDeg);
        horaPlanets[k] = calculateHoraRashi(pDeg);
        drekkanaPlanets[k] = calculateDrekkanaRashi(pDeg);
        chaturthamshaPlanets[k] = calculateChaturthamshaRashi(pDeg);
        saptamamshaPlanets[k] = calculateSaptamamshaRashi(pDeg);
        dashamshaPlanets[k] = calculateDashamshaRashi(pDeg);
        dwadashamshaPlanets[k] = calculateDwadashamshaRashi(pDeg);
        shodashamshaPlanets[k] = calculateShodashamshaRashi(pDeg);
        vimshamshaPlanets[k] = calculateVimshamshaRashi(pDeg);
        chaturvimshamshaPlanets[k] = calculateChaturvimshamshaRashi(pDeg);
        saptavimshamshaPlanets[k] = calculateSaptavimshamshaRashi(pDeg);
        trimshamshaPlanets[k] = calculateTrimshamshaRashi(pDeg);
        chatvarimshamshaPlanets[k] = calculateChatvarimshamshaRashi(pDeg);
        akshavedamshaPlanets[k] = calculateAkshavedamshaRashi(pDeg);
        shashtyamshaPlanets[k] = calculateShashtyamshaRashi(pDeg);
    });

    // 6. Dasha, Manglik & Panchadha Maitri calculations
    const dasha = calculateVimshottariDasha(planets.Chandra.deg, localBirthDate);
    const yoginiDasha = typeof calculateYoginiDasha === "function" ? calculateYoginiDasha(planets.Chandra.deg, localBirthDate) : null;
    const tribhagiDasha = typeof calculateTribhagiDasha === "function" ? calculateTribhagiDasha(planets.Chandra.deg, localBirthDate) : null;
    const marsRashi = getRashiDetails(planets.Mangal.deg);
    const manglik = checkManglikDosha(lagnaRashi.rashiId, marsRashi.rashiId);
    const panchadhaMaitri = typeof calculatePanchadhaMaitri === "function" ? calculatePanchadhaMaitri(planets) : null;

    // चान्द्रमास (Chandramasa) र सौरमास (Sauramasa) शास्त्रीय पद्धति
    const diffDeg = normalizeDeg(planets.Chandra.deg - planets.Surya.deg);
    const tithiIdx = Math.floor(diffDeg / 12.0);
    const isShukla = (tithiIdx < 15);
    let chandraMasaIdx;
    if (isShukla) {
        const daysSinceAmavasya = diffDeg / 12.19;
        const sunAtAmavasya = normalizeDeg(planets.Surya.deg - daysSinceAmavasya * 0.9856);
        chandraMasaIdx = Math.floor(sunAtAmavasya / 30.0);
    } else {
        const daysToAmavasya = (360.0 - diffDeg) / 12.19;
        const sunAtNextAmavasya = normalizeDeg(planets.Surya.deg + daysToAmavasya * 0.9856);
        chandraMasaIdx = Math.floor(sunAtNextAmavasya / 30.0);
    }
    const VEDIC_MASA_LIST = [
        "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन",
        "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"
    ];
    const chandraMasaName = VEDIC_MASA_LIST[chandraMasaIdx] || bsMonthName;
    const sauraMasaName = VEDIC_MASA_LIST[bsMonth - 1] || bsMonthName;

    // Save global state
    currentKundaliData = {
        name: personName,
        gender: gender,
        fatherName: fatherName,
        motherName: motherName,
        gotra: gotra,
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDay: bsDay,
        bsMonthName: bsMonthName,
        sauraMasa: sauraMasaName,
        chandraMasa: chandraMasaName,
        chandraMonthNum: chandraMasaIdx + 1,
        adYear: birthYear,
        adMonth: birthMonth + 1,
        adDay: birthDay,
        adDateObj: localBirthDate,
        lagnaDeg: lagnaDeg,
        bsDateStr: `${bsYear} साल ${bsMonthName} ${bsDay} गते`,
        adDateStr: `${birthYear}-${(birthMonth + 1).toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`,
        birthTimeStr: birthTimeStr,
        placeName: placeName,
        countryCode: countryCode,
        countryName: countryName,
        tzOffset: tzOffset,
        lat: lat,
        lon: lon,
        siddhanta: siddhantaName,
        ayanamsha: ayanamshaLabel,
        sunriseStr: sunTimes.sunriseStr,
        sunsetStr: sunTimes.sunsetStr,
        dinamanaStr: dinamana.formatted,
        ishtakalaStr: ishtakala.formatted,
        ishtakalaColonStr: ishtakalaColonStr,
        lagnaRashi: lagnaRashi,
        moonRashi: moonRashi,
        sunRashi: sunRashi,
        moonNak: moonNak,
        tithi: tithi,
        yoga: yoga,
        karana: karana,
        planets: planets,
        navamshaLagna: navamshaLagna,
        navamshaPlanets: navamshaPlanets,
        horaLagna: horaLagna,
        horaPlanets: horaPlanets,
        drekkanaLagna: drekkanaLagna,
        drekkanaPlanets: drekkanaPlanets,
        chaturthamshaLagna: chaturthamshaLagna,
        chaturthamshaPlanets: chaturthamshaPlanets,
        saptamamshaLagna: saptamamshaLagna,
        saptamamshaPlanets: saptamamshaPlanets,
        dashamshaLagna: dashamshaLagna,
        dashamshaPlanets: dashamshaPlanets,
        dwadashamshaLagna: dwadashamshaLagna,
        dwadashamshaPlanets: dwadashamshaPlanets,
        shodashamshaLagna: shodashamshaLagna,
        shodashamshaPlanets: shodashamshaPlanets,
        vimshamshaLagna: vimshamshaLagna,
        vimshamshaPlanets: vimshamshaPlanets,
        chaturvimshamshaLagna: chaturvimshamshaLagna,
        chaturvimshamshaPlanets: chaturvimshamshaPlanets,
        saptavimshamshaLagna: saptavimshamshaLagna,
        saptavimshamshaPlanets: saptavimshamshaPlanets,
        trimshamshaLagna: trimshamshaLagna,
        trimshamshaPlanets: trimshamshaPlanets,
        chatvarimshamshaLagna: chatvarimshamshaLagna,
        chatvarimshamshaPlanets: chatvarimshamshaPlanets,
        akshavedamshaLagna: akshavedamshaLagna,
        akshavedamshaPlanets: akshavedamshaPlanets,
        shashtyamshaLagna: shashtyamshaLagna,
        shashtyamshaPlanets: shashtyamshaPlanets,
        dasha: dasha,
        yoginiDasha: yoginiDasha,
        tribhagiDasha: tribhagiDasha,
        manglik: manglik,
        panchadhaMaitri: panchadhaMaitri,
        varna: typeof getVarna === "function" ? getVarna(moonRashi.rashiId) : "ब्राह्मण"
    };
    if (typeof window !== "undefined") {
        window.currentKundaliData = currentKundaliData;
    }

    // Render components on UI
    renderPersonalAndPanchangUI(currentKundaliData);
    renderChartsUI(currentKundaliData);
    renderPlanetTableUI(currentKundaliData);
    renderPanchadhaMaitriUI(currentKundaliData);
    renderDashaUI(currentKundaliData);
    renderPatrikaView();
    if (typeof togglePatrikaView === "function" && !isPatrikaExpanded) {
        togglePatrikaView(false);
    }
    if (typeof renderPhaladeshTabUI === "function") {
        renderPhaladeshTabUI();
    }
    renderPhaladeshCallout();
    return currentKundaliData;
}
if (typeof window !== "undefined") {
    window.generateKundali = generateKundali;
}

/**
 * कुण्डली निर्माणपछि अन्त्यमा फलादेश ब्यानर देखाउँछ
 */
function renderPhaladeshCallout() {
    const el = document.getElementById("kundaliPhaladeshCallout");
    if (!el) return;
    el.innerHTML = `
        <div class="phaladesh-callout-banner no-print">
            <div class="callout-titles">
                <h3>🔮 जातकको सम्पूर्ण कुण्डली फलादेश</h3>
                <p>पाराशर होराशास्त्र, मानसागरी तथा चमत्कार चिन्तामणि ग्रन्थका आधारमा १२ भाव, ९ ग्रह, महादशा, माङ्गलिक विचार तथा शुभ तत्त्वहरूको विस्तृत फलित विवेचना तयार छ ।</p>
            </div>
            <button type="button" class="btn-primary" onclick="switchToTab('tab-phaladesh')" style="font-size: 1rem; padding: 11px 24px; white-space: nowrap; cursor: pointer;">
                🔮 सम्पूर्ण फलादेश हेर्नुहोस् →
            </button>
        </div>
    `;
}

/**
 * जातक तथा पञ्चाङ्ग विवरण तालिका UI मा देखाउँछ
 */
function renderPersonalAndPanchangUI(data) {
    const summaryEl = document.getElementById("kundaliSummary");
    if (!summaryEl) return;

    const varnaStr = data.varna || (typeof getVarna === "function" ? getVarna(data.moonRashi.rashiId) : "ब्राह्मण");
    const ganaStr = data.moonNak?.gana || "-";
    const nadiStr = data.moonNak?.nadi || "-";
    const yoniStr = data.moonNak?.yoni || "-";

    const tzStr = data.tzOffset !== undefined ? ` (समय: UTC${data.tzOffset >= 0 ? '+' : ''}${data.tzOffset})` : "";
    const fullPlaceStr = `${data.placeName}${data.countryName ? ', ' + data.countryName : ''}`;

    summaryEl.innerHTML = `
        <div class="info-card">
            <h3 class="card-header-title">🌸 जातक विवरण</h3>
            <div class="info-grid">
                <div><span class="lbl">जातकको नाम:</span> <strong>${data.name}</strong> (${data.gender})</div>
                <div><span class="lbl">बाबु/आमा:</span> ${data.fatherName} / ${data.motherName}</div>
                <div><span class="lbl">जन्म मिति:</span> <strong>${data.bsDateStr}</strong> (${data.adDateStr})</div>
                <div><span class="lbl">जन्म समय:</span> ${data.birthTimeStr} (प्रामाणिक समय)</div>
                <div><span class="lbl">जन्म स्थान:</span> ${fullPlaceStr} (अक्षांश: ${data.lat.toFixed(2)}°, देशान्तर: ${data.lon.toFixed(2)}°${tzStr})</div>
                <div><span class="lbl">इष्टकाल:</span> <strong>${data.ishtakalaStr}</strong></div>
                <div><span class="lbl">सिद्धान्त:</span> <strong style="color: #991b1b; background: rgba(153, 27, 27, 0.08); padding: 1px 6px; border-radius: 4px;">${data.siddhanta || "दृक्-सिद्धान्त"}</strong></div>
            </div>
        </div>

        <div class="info-card">
            <h3 class="card-header-title">☀️ पञ्चाङ्ग</h3>
            <div class="info-grid">
                <div><span class="lbl">पद्धति / अयनांश:</span> <strong>${data.ayanamsha}</strong></div>
                <div><span class="lbl">सूर्योदय / सूर्यास्त:</span> ${data.sunriseStr} / ${data.sunsetStr}</div>
                <div><span class="lbl">दिनमान:</span> ${data.dinamanaStr}</div>
                <div><span class="lbl">तिथि:</span> <strong>${data.chandraMasa ? data.chandraMasa + ' ' : ''}${data.tithi.formatted}</strong></div>
                <div><span class="lbl">चान्द्रमास / सौरमास:</span> <strong>${data.chandraMasa || data.bsMonthName}</strong> (चान्द्र) / ${data.sauraMasa || data.bsMonthName} (सौर)</div>
                <div><span class="lbl">नक्षत्र:</span> <strong>${data.moonNak.nakshatraNameNp}</strong> (पाद ${data.moonNak.pada})</div>
                <div><span class="lbl">नामाक्षर:</span> <span class="badge-gold">${data.moonNak.namaakshar}</span></div>
                <div><span class="lbl">चन्द्र राशि:</span> <strong>${data.moonRashi.rashiNameNp}</strong> (स्वामी: ${data.moonRashi.lord})</div>
                <div><span class="lbl">सूर्य राशि:</span> ${data.sunRashi.rashiNameNp}</div>
                <div><span class="lbl">लग्न:</span> <strong>${data.lagnaRashi.rashiNameNp}</strong> (${data.lagnaRashi.degInRashi.toFixed(2)}°)</div>
                <div><span class="lbl">योग:</span> ${data.yoga}</div>
                <div><span class="lbl">करण:</span> ${data.karana}</div>
                <div><span class="lbl">वर्ण:</span> <strong>${varnaStr}</strong></div>
                <div><span class="lbl">गण:</span> <strong>${ganaStr}</strong></div>
                <div><span class="lbl">नाडी:</span> <strong>${nadiStr}</strong></div>
                <div><span class="lbl">योनी:</span> <strong>${yoniStr}</strong></div>
                <div><span class="lbl">माङ्गलिक विचार:</span> <span class="${data.manglik.isManglik ? 'badge-danger' : 'badge-success'}">${data.manglik.isManglik ? 'माङ्गलिक कुण्डली' : 'अमाङ्गलिक (शुभ)'}</span></div>
            </div>
        </div>
    `;
}

let isShodashavargaExpanded = false;

/**
 * लग्न, नवमांश र चन्द्र कुण्डली चक्रहरू SVG मा रेन्डर गर्छ
 */
function renderChartsUI(data) {
    const chartsContainer = document.getElementById("kundaliCharts");
    if (!chartsContainer) return;

    // Prepare list of planets with rashi IDs
    const planetListD1 = [
        { name: "Surya", rashiId: getRashiDetails(data.planets.Surya.deg).rashiId, isRetrograde: data.planets.Surya.isRetrograde },
        { name: "Chandra", rashiId: getRashiDetails(data.planets.Chandra.deg).rashiId, isRetrograde: data.planets.Chandra.isRetrograde },
        { name: "Mangal", rashiId: getRashiDetails(data.planets.Mangal.deg).rashiId, isRetrograde: data.planets.Mangal.isRetrograde },
        { name: "Budha", rashiId: getRashiDetails(data.planets.Budha.deg).rashiId, isRetrograde: data.planets.Budha.isRetrograde },
        { name: "Guru", rashiId: getRashiDetails(data.planets.Guru.deg).rashiId, isRetrograde: data.planets.Guru.isRetrograde },
        { name: "Shukra", rashiId: getRashiDetails(data.planets.Shukra.deg).rashiId, isRetrograde: data.planets.Shukra.isRetrograde },
        { name: "Shani", rashiId: getRashiDetails(data.planets.Shani.deg).rashiId, isRetrograde: data.planets.Shani.isRetrograde },
        { name: "Rahu", rashiId: getRashiDetails(data.planets.Rahu.deg).rashiId, isRetrograde: true },
        { name: "Ketu", rashiId: getRashiDetails(data.planets.Ketu.deg).rashiId, isRetrograde: true }
    ];

    // Helper to extract planet list for any varga
    function extractVargaList(vargaMap) {
        const keys = ["Surya", "Chandra", "Mangal", "Budha", "Guru", "Shukra", "Shani", "Rahu", "Ketu"];
        return keys.map(k => ({
            name: k,
            rashiId: vargaMap && vargaMap[k] ? vargaMap[k].id : 1,
            isRetrograde: (k === "Rahu" || k === "Ketu") ? true : (data.planets[k]?.isRetrograde || false)
        }));
    }

    // Other Divisional Planet Lists
    const planetListD9 = extractVargaList(data.navamshaPlanets);
    const planetListHora = extractVargaList(data.horaPlanets);
    const planetListDrekkana = extractVargaList(data.drekkanaPlanets);
    const planetListChaturthamsha = extractVargaList(data.chaturthamshaPlanets);
    const planetListSaptamamsha = extractVargaList(data.saptamamshaPlanets);
    const planetListDashamsha = extractVargaList(data.dashamshaPlanets);
    const planetListDwadashamsha = extractVargaList(data.dwadashamshaPlanets);
    const planetListShodashamsha = extractVargaList(data.shodashamshaPlanets);
    const planetListVimshamsha = extractVargaList(data.vimshamshaPlanets);
    const planetListChaturvimshamsha = extractVargaList(data.chaturvimshamshaPlanets);
    const planetListSaptavimshamsha = extractVargaList(data.saptavimshamshaPlanets);
    const planetListTrimshamsha = extractVargaList(data.trimshamshaPlanets);
    const planetListChatvarimshamsha = extractVargaList(data.chatvarimshamshaPlanets);
    const planetListAkshavedamsha = extractVargaList(data.akshavedamshaPlanets);
    const planetListShashtyamsha = extractVargaList(data.shashtyamshaPlanets);

    // Render SVGs (Size: 360)
    // १. मुख्य ७ कुण्डलीहरू
    const d1Svg = renderNorthIndianChart(data.lagnaRashi.rashiId, planetListD1, "लग्न कुण्डली", 360);
    const chandraSvg = renderNorthIndianChart(data.moonRashi.rashiId, planetListD1, "चन्द्र कुण्डली", 360);
    const horaSvg = typeof renderHoraTwoChamberChart === "function"
        ? renderHoraTwoChamberChart(data, "होरा कुण्डली", 360)
        : renderNorthIndianChart(data.horaLagna ? data.horaLagna.id : 5, planetListHora, "होरा कुण्डली", 360);
    const drekkanaSvg = renderNorthIndianChart(data.drekkanaLagna ? data.drekkanaLagna.id : 1, planetListDrekkana, "द्रेष्काण कुण्डली", 360);
    const d9Svg = renderNorthIndianChart(data.navamshaLagna ? data.navamshaLagna.id : 1, planetListD9, "नवमांश कुण्डली", 360);
    const dwadashamshaSvg = renderNorthIndianChart(data.dwadashamshaLagna ? data.dwadashamshaLagna.id : 1, planetListDwadashamsha, "द्वादशांश कुण्डली", 360);
    const trimshamshaSvg = renderNorthIndianChart(data.trimshamshaLagna ? data.trimshamshaLagna.id : 1, planetListTrimshamsha, "त्रिंशांश कुण्डली", 360);

    // २. बाँकी १० वटा षोडशवर्ग चक्रहरू
    const chaturthamshaSvg = renderNorthIndianChart(data.chaturthamshaLagna ? data.chaturthamshaLagna.id : 1, planetListChaturthamsha, "चतुर्थांश कुण्डली", 360);
    const saptamamshaSvg = renderNorthIndianChart(data.saptamamshaLagna ? data.saptamamshaLagna.id : 1, planetListSaptamamsha, "सप्तमांश कुण्डली", 360);
    const dashamshaSvg = renderNorthIndianChart(data.dashamshaLagna ? data.dashamshaLagna.id : 1, planetListDashamsha, "दशमांश कुण्डली", 360);
    const shodashamshaSvg = renderNorthIndianChart(data.shodashamshaLagna ? data.shodashamshaLagna.id : 1, planetListShodashamsha, "षोडशांश कुण्डली", 360);
    const vimshamshaSvg = renderNorthIndianChart(data.vimshamshaLagna ? data.vimshamshaLagna.id : 1, planetListVimshamsha, "विंशांश कुण्डली", 360);
    const chaturvimshamshaSvg = renderNorthIndianChart(data.chaturvimshamshaLagna ? data.chaturvimshamshaLagna.id : 1, planetListChaturvimshamsha, "चतुर्विंशांश कुण्डली", 360);
    const saptavimshamshaSvg = renderNorthIndianChart(data.saptavimshamshaLagna ? data.saptavimshamshaLagna.id : 1, planetListSaptavimshamsha, "सप्तविंशांश कुण्डली", 360);
    const chatvarimshamshaSvg = renderNorthIndianChart(data.chatvarimshamshaLagna ? data.chatvarimshamshaLagna.id : 1, planetListChatvarimshamsha, "चत्वारिंशांश कुण्डली", 360);
    const akshavedamshaSvg = renderNorthIndianChart(data.akshavedamshaLagna ? data.akshavedamshaLagna.id : 1, planetListAkshavedamsha, "अक्षवेदांश कुण्डली", 360);
    const shashtyamshaSvg = renderNorthIndianChart(data.shashtyamshaLagna ? data.shashtyamshaLagna.id : 1, planetListShashtyamsha, "षष्ट्यंश कुण्डली", 360);

    chartsContainer.innerHTML = `
        <div class="charts-side-by-side-wrapper">
            <!-- १. सुरुमा देखिने ७ मुख्य कुण्डलीहरू -->
            <div class="charts-side-by-side-grid">
                <!-- १. लग्न कुण्डली -->
                <div class="chart-item-col" id="chart-d1">
                    ${d1Svg}
                    <div class="chart-description-badge">शरीर, स्वास्थ्य, स्वरूप तथा समग्र जीवन</div>
                </div>

                <!-- २. चन्द्र कुण्डली -->
                <div class="chart-item-col" id="chart-chandra">
                    ${chandraSvg}
                    <div class="chart-description-badge">मन, भावना, मनोवृत्ति तथा मानसिक सुख</div>
                </div>

                <!-- ३. होरा कुण्डली -->
                <div class="chart-item-col" id="chart-d2">
                    ${horaSvg}
                    <div class="chart-description-badge">सम्पत्ति, धन, संचय तथा आर्थिक स्थिति</div>
                </div>

                <!-- ४. द्रेष्काण कुण्डली -->
                <div class="chart-item-col" id="chart-d3">
                    ${drekkanaSvg}
                    <div class="chart-description-badge">भ्रातृ, पराक्रम, सहोदर बन्धु तथा साहस</div>
                </div>

                <!-- ५. नवमांश कुण्डली -->
                <div class="chart-item-col" id="chart-d9">
                    ${d9Svg}
                    <div class="chart-description-badge">भाग्य, दाम्पत्य, धर्म तथा आन्तरिक शक्ति</div>
                </div>

                <!-- ६. द्वादशांश कुण्डली -->
                <div class="chart-item-col" id="chart-d12">
                    ${dwadashamshaSvg}
                    <div class="chart-description-badge">माता-पिता, पैतृक सम्पत्ति तथा कुल परम्परा</div>
                </div>

                <!-- ७. त्रिंशांश कुण्डली -->
                <div class="chart-item-col" id="chart-d30">
                    ${trimshamshaSvg}
                    <div class="chart-description-badge">अनिष्ट, अरिष्ट, संकट, विघ्न-बाधा तथा कष्ट विचार</div>
                </div>
            </div>

            <!-- २. षोडशवर्गी हेर्नुहोस् बटन -->
            <div class="shodashavarga-toggle-box no-print">
                <button type="button" id="btnToggleShodashavarga" class="shodashavarga-toggle-btn ${isShodashavargaExpanded ? 'active' : ''}">
                    <span class="btn-icon">${isShodashavargaExpanded ? '▲' : '✨'}</span>
                    <span class="btn-text">${isShodashavargaExpanded ? 'षोडशवर्गी बन्द गर्नुहोस्' : 'षोडशवर्गी हेर्नुहोस्'}</span>
                    <span class="btn-arrow">${isShodashavargaExpanded ? '▲' : '▼'}</span>
                </button>
            </div>

            <!-- ३. बाँकी १० वटा षोडशवर्ग चक्रहरू (टगल सेक्सन) -->
            <div id="shodashavargaExtraSection" class="shodashavarga-extra-section ${isShodashavargaExpanded ? 'expanded' : ''}" style="${isShodashavargaExpanded ? '' : 'display: none;'}">
                <div class="shodashavarga-section-heading">
                    <span class="heading-ornament">❖</span>
                    <h4>अन्य षोडशवर्ग चक्रहरू (Additional Divisional Charts)</h4>
                    <span class="heading-ornament">❖</span>
                </div>
                <div class="charts-side-by-side-grid">
                    <!-- ८. चतुर्थांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d4">
                        ${chaturthamshaSvg}
                        <div class="chart-description-badge">गृह, सुख, भूमि, वाहन तथा स्थावर सम्पत्ति</div>
                    </div>

                    <!-- ९. सप्तमांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d7">
                        ${saptamamshaSvg}
                        <div class="chart-description-badge">सन्तान, सन्तति, नाति-नातिना तथा वंशवृद्धि</div>
                    </div>

                    <!-- १०. दशमांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d10">
                        ${dashamshaSvg}
                        <div class="chart-description-badge">कर्म, पेशा, आजीविका, मान-सम्मान तथा प्रतिष्ठा</div>
                    </div>

                    <!-- ११. षोडशांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d16">
                        ${shodashamshaSvg}
                        <div class="chart-description-badge">वाहन, सवारी सुख, भौतिक सुख-सुविधा तथा यात्रा</div>
                    </div>

                    <!-- १२. विंशांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d20">
                        ${vimshamshaSvg}
                        <div class="chart-description-badge">उपासना, भक्ति, साधना तथा आध्यात्मिक उन्नति</div>
                    </div>

                    <!-- १३. चतुर्विंशांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d24">
                        ${chaturvimshamshaSvg}
                        <div class="chart-description-badge">विद्या, ज्ञान, बुद्धि, उच्च शिक्षा तथा पाण्डित्य</div>
                    </div>

                    <!-- १४. सप्तविंशांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d27">
                        ${saptavimshamshaSvg}
                        <div class="chart-description-badge">बल, पराक्रम, शारीरिक तथा मानसिक सामर्थ्य</div>
                    </div>

                    <!-- १५. चत्वारिंशांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d40">
                        ${chatvarimshamshaSvg}
                        <div class="chart-description-badge">परम्परागत संस्कार, कुल प्रभाव तथा शुभाशुभ फल</div>
                    </div>

                    <!-- १६. अक्षवेदांश कुण्डली -->
                    <div class="chart-item-col" id="chart-d45">
                        ${akshavedamshaSvg}
                        <div class="chart-description-badge">चरित्र, आचार, स्वभाव तथा सर्वविध शुभाशुभ विचार</div>
                    </div>

                    <!-- १७. षष्ट्यंश कुण्डली -->
                    <div class="chart-item-col" id="chart-d60">
                        ${shashtyamshaSvg}
                        <div class="chart-description-badge">सूक्ष्म फलादेश, प्रारब्ध कर्म, पूर्वजन्म तथा समग्र शुभाशुभ</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Event listener for Shodashavarga toggle button
    const toggleBtn = document.getElementById("btnToggleShodashavarga");
    const extraSec = document.getElementById("shodashavargaExtraSection");
    if (toggleBtn && extraSec) {
        toggleBtn.onclick = function() {
            isShodashavargaExpanded = !isShodashavargaExpanded;
            if (isShodashavargaExpanded) {
                extraSec.style.display = "block";
                extraSec.classList.add("expanded");
                toggleBtn.classList.add("active");
                toggleBtn.innerHTML = `
                    <span class="btn-icon">▲</span>
                    <span class="btn-text">षोडशवर्गी बन्द गर्नुहोस्</span>
                    <span class="btn-arrow">▲</span>
                `;
            } else {
                extraSec.style.display = "none";
                extraSec.classList.remove("expanded");
                toggleBtn.classList.remove("active");
                toggleBtn.innerHTML = `
                    <span class="btn-icon">✨</span>
                    <span class="btn-text">षोडशवर्गी हेर्नुहोस्</span>
                    <span class="btn-arrow">▼</span>
                `;
            }
        };
    }
}

/**
/**
 * एकपाने जन्मपत्रिका र मुख्य पृष्ठका लागि ग्रहस्पष्ट पङ्क्तिहरू (HTML) तयार गर्छ
 */
function buildGrahaSpashtaRows(data) {
    if (!data || !data.planets) return "";
    const grahaOrder = [
        { key: "Lagna", name: "लग्न", deg: data.lagnaDeg, isLagna: true, isRetrograde: false },
        { key: "Surya", name: "सूर्य", deg: data.planets.Surya.deg, isRetrograde: data.planets.Surya.isRetrograde },
        { key: "Chandra", name: "चन्द्र", deg: data.planets.Chandra.deg, isRetrograde: data.planets.Chandra.isRetrograde },
        { key: "Mangal", name: "मङ्गल", deg: data.planets.Mangal.deg, isRetrograde: data.planets.Mangal.isRetrograde },
        { key: "Budha", name: "बुध", deg: data.planets.Budha.deg, isRetrograde: data.planets.Budha.isRetrograde },
        { key: "Guru", name: "गुरु", deg: data.planets.Guru.deg, isRetrograde: data.planets.Guru.isRetrograde },
        { key: "Shukra", name: "शुक्र", deg: data.planets.Shukra.deg, isRetrograde: data.planets.Shukra.isRetrograde },
        { key: "Shani", name: "शनि", deg: data.planets.Shani.deg, isRetrograde: data.planets.Shani.isRetrograde },
        { key: "Rahu", name: "राहु", deg: data.planets.Rahu.deg, isRetrograde: true },
        { key: "Ketu", name: "केतु", deg: data.planets.Ketu.deg, isRetrograde: true }
    ];

    let spashtaRowsHtml = "";
    grahaOrder.forEach(g => {
        const r = getRashiDetails(g.deg);
        const totalSec = Math.round(r.degInRashi * 3600);
        const d = Math.floor(totalSec / 3600);
        const remSec = totalSec % 3600;
        const m = Math.floor(remSec / 60);
        const s = remSec % 60;
        const nak = getNakshatraDetails(g.deg);
        const motion = g.isLagna ? "उदय" : (g.isRetrograde ? "वक्री" : "मार्गी");
        const house = ((r.rashiId - data.lagnaRashi.rashiId + 12) % 12) + 1;

        spashtaRowsHtml += `
            <tr class="${g.isLagna ? 'table-row-lagna' : ''}">
                <td class="cell-graha-name">${g.name}</td>
                <td>${toNepaliDigits(r.rashiId)}</td>
                <td>${toNepaliDigits(d)}°</td>
                <td>${toNepaliDigits(m)}'</td>
                <td>${toNepaliDigits(s)}"</td>
                <td>${nak.nakshatraNameNp}</td>
                <td>${toNepaliDigits(nak.pada)}</td>
                <td class="${g.isRetrograde ? 'text-vakri' : ''}">${motion}</td>
                <td>${toNepaliDigits(house)}</td>
            </tr>
        `;
    });
    return spashtaRowsHtml;
}

/**
 * ग्रह स्पष्ट (Planetary Positions) तालिका UI मा देखाउँछ
 */
function renderPlanetTableUI(data) {
    const tableBody = document.getElementById("planetTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = buildGrahaSpashtaRows(data);

    const titleEl = document.getElementById("grahaSpashtaTitle");
    if (titleEl) {
        const isSurya = data.siddhanta && data.siddhanta.includes("सूर्य");
        titleEl.innerHTML = `🪐 ग्रहस्पष्ट तालिका <span class="badge-siddhanta-pill ${isSurya ? 'surya' : 'drik'}">${isSurya ? '☀️ सूर्य-सिद्धान्त' : '🔭 दृक्-सिद्धान्त'}</span>`;
    }
}

/**
 * पञ्चधा ग्रहमैत्री चक्रम् UI मा रेन्डर गर्छ (मास्टर तालिका ढाँचा)
 */
function renderPanchadhaMaitriUI(data) {
    const container = document.getElementById("panchadhaMaitriContainer");
    if (!container) return;
    if (!data || !data.panchadhaMaitri) {
        container.innerHTML = `<p class="text-muted" style="text-align: center; padding: 15px;">पञ्चधा ग्रहमैत्री चक्र उपलब्ध छैन।</p>`;
        return;
    }

    const pm = data.panchadhaMaitri;
    const planets = pm.planets || ["सूर्य", "चन्द्र", "मङ्गल", "बुध", "गुरु", "शुक्र", "शनि", "राहु", "केतु"];
    const summary = pm.summary;

    const relationshipRows = [
        { key: "atimitra", label: "अतिमित्र" },
        { key: "mitra", label: "मित्र" },
        { key: "sama", label: "सम" },
        { key: "shatru", label: "शत्रु" },
        { key: "atishatru", label: "अतिशत्रु" }
    ];

    const planetShortMap = {
        "सूर्य": "सू",
        "चन्द्र": "चं",
        "मङ्गल": "मं",
        "बुध": "बु",
        "गुरु": "गु",
        "शुक्र": "शु",
        "शनि": "श",
        "राहु": "रा",
        "केतु": "के"
    };

    let headerThs = `<th class="pm-corner-th">सम्बन्ध</th>`;
    planets.forEach(p => {
        headerThs += `<th class="pm-planet-th">${p}</th>`;
    });

    let bodyRows = "";
    relationshipRows.forEach(rel => {
        let rowCells = `<td class="pm-rel-label"><strong>${rel.label}</strong></td>`;
        planets.forEach(p => {
            const list = (summary && summary[p] && summary[p][rel.key]) ? summary[p][rel.key] : [];
            const content = list.length > 0
                ? `<div class="pm-cell-items">${list.map(item => {
                    const shortName = planetShortMap[item.trim()] || item;
                    return `<span class="pm-planet-item" title="${item}">${shortName}</span>`;
                }).join("")}</div>`
                : "";
            rowCells += `<td class="pm-planet-cell">${content}</td>`;
        });
        bodyRows += `<tr>${rowCells}</tr>`;
    });

    container.innerHTML = `
        <div class="panchadha-table-wrapper">
            <div class="pm-table-scroll">
                <table class="panchadha-master-table">
                    <thead>
                        <tr>${headerThs}</tr>
                    </thead>
                    <tbody>
                        ${bodyRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/**
 * /**
 * विंशोत्तरी, योगिनी र त्रिभागी दशा UI मा परम्परागत कुण्डली दर्शन शैलीमा रेन्डर गर्छ
 * - ३x३ कार्ड ग्रिड (Mahadasha & Antardasha blocks)
 * - दायाँपट्टि प्रत्यन्तर्दशा साइड प्यानल (Side-by-side Pratyantardasha panel on click)
 */

const DASHA_DISPLAY_NAMES = {
    Surya: "सूर्य",
    Chandra: "चन्द्र",
    Mangal: "मंगल",
    Budha: "बुध",
    Guru: "बृहस्पति",
    Shukra: "शुक्र",
    Shani: "शनि",
    Rahu: "राहु",
    Ketu: "केतु",
    "सूर्य": "सूर्य",
    "चन्द्र": "चन्द्र",
    "मङ्गल": "मंगल",
    "मंगल": "मंगल",
    "बुध": "बुध",
    "गुरु": "बृहस्पति",
    "बृहस्पति": "बृहस्पति",
    "शुक्र": "शुक्र",
    "शनि": "शनि",
    "राहु": "राहु",
    "केतु": "केतु"
};

function getDashaLordName(raw) {
    if (!raw) return "-";
    return DASHA_DISPLAY_NAMES[raw] || raw;
}

function formatDashaBsDate(date, isBeforeBirth = false) {
    if (isBeforeBirth || !date) return "-";
    try {
        const d = (date instanceof Date) ? date : new Date(date);
        if (isNaN(d.getTime())) return "-";

        let bsYear, bsMonth, bsDay;
        if (typeof adToBs === "function") {
            const bs = adToBs(d.getFullYear(), d.getMonth() + 1, d.getDate());
            bsYear = bs.year;
            bsMonth = bs.month;
            bsDay = bs.day;
        } else {
            bsYear = d.getFullYear() + 57;
            bsMonth = ((d.getMonth() + 8) % 12) + 1;
            bsDay = d.getDate();
        }

        const yStr = toNepaliDigits(bsYear);
        const mStr = toNepaliDigits(String(bsMonth).padStart(2, '0'));
        const dStr = toNepaliDigits(String(bsDay).padStart(2, '0'));
        return `${yStr}/${mStr}/${dStr}`;
    } catch (e) {
        return "-";
    }
}

let currentKundaliDataForDasha = null;
let activeDashaSystem = "vimshottari";
let selectedDashaState = {
    vimshottari: { mIdx: 0, aIdx: 0 },
    yogini: { mIdx: 0, aIdx: 0, cycle: 1 },
    tribhagi: { mIdx: 0, aIdx: 0, cycle: 1 }
};

function findActiveDashaSelection(timeline) {
    if (!timeline || timeline.length === 0) return { mIdx: 0, aIdx: 0 };
    for (let m = 0; m < timeline.length; m++) {
        const mItem = timeline[m];
        if (mItem.isCurrent) {
            for (let a = 0; a < (mItem.antardashas || []).length; a++) {
                if (mItem.antardashas[a].isCurrent) {
                    return { mIdx: m, aIdx: a };
                }
            }
            return { mIdx: m, aIdx: 0 };
        }
    }
    for (let m = 0; m < timeline.length; m++) {
        const mItem = timeline[m];
        for (let a = 0; a < (mItem.antardashas || []).length; a++) {
            if (!mItem.antardashas[a].isBeforeBirth) {
                return { mIdx: m, aIdx: a };
            }
        }
    }
    return { mIdx: 0, aIdx: 0 };
}

function renderMahadashaBlock(mItem, mIdx, sys, selectedMIdx, selectedAIdx) {
    const lordName = getDashaLordName(mItem.lord || mItem.name);
    const mEndDateBs = formatDashaBsDate(mItem.endDate);

    let rowsHtml = "";
    (mItem.antardashas || []).forEach((aItem, aIdx) => {
        const aLordName = getDashaLordName(aItem.lord || aItem.name);
        const aEndDateBs = formatDashaBsDate(aItem.endDate, aItem.isBeforeBirth);
        const isSelected = (mIdx === selectedMIdx && aIdx === selectedAIdx);
        const isCurrent = aItem.isCurrent;

        let rowClasses = ["dasha-ant-row"];
        if (isSelected) rowClasses.push("selected");
        if (isCurrent) rowClasses.push("current-active");

        rowsHtml += `
            <div class="${rowClasses.join(" ")}" 
                 data-sys="${sys}" data-midx="${mIdx}" data-aidx="${aIdx}"
                 title="${lordName} - ${aLordName} को प्रत्यन्तर्दशा हेर्न यहाँ क्लिक गर्नुहोस्">
                <span class="dasha-ant-name">${aLordName}</span>
                <span class="dasha-ant-date ${aItem.isBeforeBirth ? 'dash-date' : ''}">${aEndDateBs}</span>
            </div>
        `;
    });

    return `
        <div class="dasha-block">
            <div class="dasha-block-header">
                <span class="dasha-block-lord">${lordName}</span>
                <span class="dasha-block-date">${mEndDateBs}</span>
            </div>
            <div class="dasha-block-body">
                ${rowsHtml}
            </div>
        </div>
    `;
}

function renderPratyantarSideContent(sys, mIdx, aIdx, customTimeline) {
    let timeline = customTimeline || [];
    if (!timeline.length && currentKundaliDataForDasha) {
        if (sys === "vimshottari") {
            timeline = (currentKundaliDataForDasha.dasha && currentKundaliDataForDasha.dasha.timeline) || [];
        } else if (sys === "yogini") {
            timeline = (currentKundaliDataForDasha.yoginiDasha && currentKundaliDataForDasha.yoginiDasha.timeline) || [];
        } else if (sys === "tribhagi") {
            timeline = (currentKundaliDataForDasha.tribhagiDasha && currentKundaliDataForDasha.tribhagiDasha.timeline) || [];
        }
    }

    const mItem = timeline[mIdx];
    if (!mItem || !mItem.antardashas || !mItem.antardashas[aIdx]) {
        return `
            <div class="dasha-side-card">
                <div class="dasha-side-header-info">
                    <h4>प्रत्यन्तर्दशा</h4>
                    <p>कुनै अन्तर्दशा छनोट गरिएको छैन।</p>
                </div>
            </div>
        `;
    }

    const aItem = mItem.antardashas[aIdx];
    const mahaName = getDashaLordName(mItem.lord || mItem.name);
    const antName = getDashaLordName(aItem.lord || aItem.name);
    const antEndDateBs = formatDashaBsDate(aItem.endDate, aItem.isBeforeBirth);

    const prats = aItem.pratyantardashas || [];

    let pratRowsHtml = "";
    if (prats.length === 0) {
        pratRowsHtml = `<div style="text-align: center; color: #888; padding: 12px 0;">प्रत्यन्तर्दशा विवरण उपलब्ध छैन</div>`;
    } else {
        prats.forEach((pItem) => {
            const pLordName = getDashaLordName(pItem.lord || pItem.name);
            const pEndDateBs = formatDashaBsDate(pItem.endDate, pItem.isBeforeBirth);
            const isPratCurrent = pItem.isCurrent;

            pratRowsHtml += `
                <div class="dasha-ant-row ${isPratCurrent ? 'current-active' : ''}" style="cursor: default;">
                    <span class="dasha-ant-name">
                        ${pLordName}
                        ${isPratCurrent ? '<span style="color: #059669; font-size: 0.76rem; font-weight: 800; margin-left: 4px;">(सक्रिय)</span>' : ''}
                    </span>
                    <span class="dasha-ant-date ${pItem.isBeforeBirth ? 'dash-date' : ''}">${pEndDateBs}</span>
                </div>
            `;
        });
    }

    return `
        <div class="dasha-side-card">
            <div class="dasha-side-header-info">
                <h4>⚡ प्रत्यन्तर्दशा विवरण</h4>
                <p>छनोट गरिएको अन्तर्दशा: <strong>${mahaName} - ${antName}</strong></p>
            </div>
            
            <div class="dasha-block" style="border-bottom: 2px solid #8A7320; margin-bottom: 8px;">
                <div class="dasha-block-header">
                    <span class="dasha-block-lord">${antName} प्रत्यन्तर</span>
                    <span class="dasha-block-date">${antEndDateBs}</span>
                </div>
                <div class="dasha-block-body">
                    ${pratRowsHtml}
                </div>
            </div>

            <p class="dasha-side-hint">
                💡 तालिकाको कुनै पनि अन्तर्दशामा क्लिक गरी त्यसको प्रत्यन्तर्दशा तुरुन्त यहाँ हेर्न सक्नुहुन्छ।
            </p>
        </div>
    `;
}

function renderVimshottariPanel(dasha) {
    if (!dasha || !dasha.timeline) {
        return `<p class="text-muted" style="text-align: center; padding: 20px;">विंशोत्तरी दशा विवरण उपलब्ध छैन।</p>`;
    }

    const timeline = dasha.timeline;
    const initialLordName = getDashaLordName(dasha.initialLord);
    const balanceStr = dasha.balance;

    const sel = selectedDashaState.vimshottari;

    let cardsHtml = "";
    timeline.forEach((mItem, mIdx) => {
        cardsHtml += renderMahadashaBlock(mItem, mIdx, "vimshottari", sel.mIdx, sel.aIdx);
    });

    const sideHtml = renderPratyantarSideContent("vimshottari", sel.mIdx, sel.aIdx, timeline);

    const phalHtml = (typeof renderVimshottariPhaladeshSection === "function") 
        ? renderVimshottariPhaladeshSection(dasha) 
        : "";

    return `
        <div class="dasha-sheet-wrapper">
            <div class="dasha-sheet-header">
                <h3 class="dasha-sheet-title">विंशोत्तरी दशान्तर दशा</h3>
                <p class="dasha-sheet-subtitle">जन्म समय शेष भोग्य दशा : ${initialLordName} ${balanceStr}</p>
            </div>

            <div class="dasha-two-col-layout">
                <div class="dasha-grid-container">
                    <div class="dasha-3col-grid">
                        ${cardsHtml}
                    </div>
                </div>
                <div class="dasha-side-panel-wrapper" id="dashaSidePanel-vimshottari">
                    ${sideHtml}
                </div>
            </div>

            ${phalHtml}
        </div>
    `;
}

function renderYoginiPanel(yoginiDasha) {
    if (!yoginiDasha || !yoginiDasha.timeline) {
        return `<p class="text-muted" style="text-align: center; padding: 20px;">योगिनी दशा विवरण उपलब्ध छैन।</p>`;
    }

    const timeline = yoginiDasha.timeline;
    const initialLordName = getDashaLordName(yoginiDasha.initialYogini);
    const balanceStr = yoginiDasha.balance;

    const currentCycle = selectedDashaState.yogini.cycle || 1;
    const cycleStartIdx = (currentCycle - 1) * 8;
    const cycleTimeline = timeline.slice(cycleStartIdx, cycleStartIdx + 8);

    const sel = selectedDashaState.yogini;

    let cardsHtml = "";
    cycleTimeline.forEach((mItem, relIdx) => {
        const actualMIdx = cycleStartIdx + relIdx;
        cardsHtml += renderMahadashaBlock(mItem, actualMIdx, "yogini", sel.mIdx, sel.aIdx);
    });

    const sideHtml = renderPratyantarSideContent("yogini", sel.mIdx, sel.aIdx, timeline);

    const phalHtml = (typeof renderYoginiPhaladeshSection === "function") 
        ? renderYoginiPhaladeshSection(yoginiDasha) 
        : "";

    return `
        <div class="dasha-sheet-wrapper">
            <div class="dasha-sheet-header">
                <h3 class="dasha-sheet-title">योगिनी दशान्तर दशा</h3>
                <p class="dasha-sheet-subtitle">जन्म समय शेष भोग्य दशा : ${initialLordName} ${balanceStr}</p>
                <div class="dasha-cycle-selector no-print">
                    <button type="button" class="dasha-cycle-btn ${currentCycle === 1 ? 'active' : ''}" data-sys="yogini" data-cycle="1">चक्र १ (१-३६ वर्ष)</button>
                    <button type="button" class="dasha-cycle-btn ${currentCycle === 2 ? 'active' : ''}" data-sys="yogini" data-cycle="2">चक्र २ (३७-७२ वर्ष)</button>
                    <button type="button" class="dasha-cycle-btn ${currentCycle === 3 ? 'active' : ''}" data-sys="yogini" data-cycle="3">चक्र ३ (७३-१०८ वर्ष)</button>
                </div>
            </div>

            <div class="dasha-two-col-layout">
                <div class="dasha-grid-container">
                    <div class="dasha-3col-grid">
                        ${cardsHtml}
                    </div>
                </div>
                <div class="dasha-side-panel-wrapper" id="dashaSidePanel-yogini">
                    ${sideHtml}
                </div>
            </div>

            ${phalHtml}
        </div>
    `;
}

function renderTribhagiPanel(tribhagiDasha) {
    if (!tribhagiDasha || !tribhagiDasha.timeline) {
        return `<p class="text-muted" style="text-align: center; padding: 20px;">त्रिभागी दशा विवरण उपलब्ध छैन।</p>`;
    }

    const timeline = tribhagiDasha.timeline;
    const initialLordName = getDashaLordName(tribhagiDasha.initialLord);
    const balanceStr = tribhagiDasha.balance;

    const currentCycle = selectedDashaState.tribhagi.cycle || 1;
    const cycleStartIdx = (currentCycle - 1) * 9;
    const cycleTimeline = timeline.slice(cycleStartIdx, cycleStartIdx + 9);

    const sel = selectedDashaState.tribhagi;

    let cardsHtml = "";
    cycleTimeline.forEach((mItem, relIdx) => {
        const actualMIdx = cycleStartIdx + relIdx;
        cardsHtml += renderMahadashaBlock(mItem, actualMIdx, "tribhagi", sel.mIdx, sel.aIdx);
    });

    const sideHtml = renderPratyantarSideContent("tribhagi", sel.mIdx, sel.aIdx, timeline);

    const phalHtml = (typeof renderTribhagiPhaladeshSection === "function") 
        ? renderTribhagiPhaladeshSection(tribhagiDasha) 
        : "";

    return `
        <div class="dasha-sheet-wrapper">
            <div class="dasha-sheet-header">
                <h3 class="dasha-sheet-title">त्रिभागी दशान्तर दशा</h3>
                <p class="dasha-sheet-subtitle">जन्म समय शेष भोग्य दशा : ${initialLordName} ${balanceStr}</p>
                <div class="dasha-cycle-selector no-print">
                    <button type="button" class="dasha-cycle-btn ${currentCycle === 1 ? 'active' : ''}" data-sys="tribhagi" data-cycle="1">चक्र १ (१-४० वर्ष)</button>
                    <button type="button" class="dasha-cycle-btn ${currentCycle === 2 ? 'active' : ''}" data-sys="tribhagi" data-cycle="2">चक्र २ (४१-८० वर्ष)</button>
                    <button type="button" class="dasha-cycle-btn ${currentCycle === 3 ? 'active' : ''}" data-sys="tribhagi" data-cycle="3">चक्र ३ (८१-१२० वर्ष)</button>
                </div>
            </div>

            <div class="dasha-two-col-layout">
                <div class="dasha-grid-container">
                    <div class="dasha-3col-grid">
                        ${cardsHtml}
                    </div>
                </div>
                <div class="dasha-side-panel-wrapper" id="dashaSidePanel-tribhagi">
                    ${sideHtml}
                </div>
            </div>

            ${phalHtml}
        </div>
    `;
}

function renderDashaUI(data) {
    const dashaContainer = document.getElementById("dashaContainer");
    if (!dashaContainer) return;
    if (!data || (!data.dasha && !data.yoginiDasha && !data.tribhagiDasha)) {
        dashaContainer.innerHTML = `<p class="text-muted" style="text-align: center; padding: 20px;">दशा विवरण उपलब्ध छैन।</p>`;
        return;
    }

    currentKundaliDataForDasha = data;

    // Find and set initial active selections
    if (data.dasha && data.dasha.timeline) {
        selectedDashaState.vimshottari = findActiveDashaSelection(data.dasha.timeline);
    }
    if (data.yoginiDasha && data.yoginiDasha.timeline) {
        const ySel = findActiveDashaSelection(data.yoginiDasha.timeline);
        selectedDashaState.yogini = { ...ySel, cycle: Math.floor(ySel.mIdx / 8) + 1 };
    }
    if (data.tribhagiDasha && data.tribhagiDasha.timeline) {
        const tSel = findActiveDashaSelection(data.tribhagiDasha.timeline);
        selectedDashaState.tribhagi = { ...tSel, cycle: Math.floor(tSel.mIdx / 9) + 1 };
    }

    const vimHtml = renderVimshottariPanel(data.dasha);
    const yoginiHtml = renderYoginiPanel(data.yoginiDasha);
    const tribhagiHtml = renderTribhagiPanel(data.tribhagiDasha);

    dashaContainer.innerHTML = `
        <!-- System Navigation Selector -->
        <div class="dasha-system-nav no-print">
            <button type="button" class="dasha-sys-btn ${activeDashaSystem === 'vimshottari' ? 'active' : ''}" data-sys="vimshottari">
                ⏳ विंशोत्तरी दशा (१२० वर्ष)
            </button>
            <button type="button" class="dasha-sys-btn ${activeDashaSystem === 'yogini' ? 'active' : ''}" data-sys="yogini">
                🌸 योगिनी दशा (३६ वर्ष)
            </button>
            <button type="button" class="dasha-sys-btn ${activeDashaSystem === 'tribhagi' ? 'active' : ''}" data-sys="tribhagi">
                ⚡ त्रिभागी दशा (४० वर्ष)
            </button>
        </div>

        <!-- Panel 1: विंशोत्तरी दशा -->
        <div id="panel-dasha-vimshottari" class="dasha-system-panel ${activeDashaSystem === 'vimshottari' ? 'active' : ''}">
            ${vimHtml}
        </div>

        <!-- Panel 2: योगिनी दशा -->
        <div id="panel-dasha-yogini" class="dasha-system-panel ${activeDashaSystem === 'yogini' ? 'active' : ''}">
            ${yoginiHtml}
        </div>

        <!-- Panel 3: त्रिभागी दशा -->
        <div id="panel-dasha-tribhagi" class="dasha-system-panel ${activeDashaSystem === 'tribhagi' ? 'active' : ''}">
            ${tribhagiHtml}
        </div>
    `;

    initAllDashaEventListeners(dashaContainer, data);
}

function initAllDashaEventListeners(container, data) {
    if (!container) return;

    container.onclick = function(e) {
        // ०. System Switcher Navigation
        const sysBtn = e.target.closest(".dasha-sys-btn");
        if (sysBtn) {
            e.stopPropagation();
            const chosenSys = sysBtn.dataset.sys;
            if (chosenSys) {
                activeDashaSystem = chosenSys;
                container.querySelectorAll(".dasha-sys-btn").forEach(b => {
                    b.classList.toggle("active", b.dataset.sys === chosenSys);
                });
                container.querySelectorAll(".dasha-system-panel").forEach(p => {
                    p.classList.toggle("active", p.id === `panel-dasha-${chosenSys}`);
                });
            }
            return;
        }

        // १. Cycle Selector (for Yogini or Tribhagi)
        const cycleBtn = e.target.closest(".dasha-cycle-btn");
        if (cycleBtn) {
            e.stopPropagation();
            const sys = cycleBtn.dataset.sys;
            const cycle = parseInt(cycleBtn.dataset.cycle, 10);
            if (sys && cycle && selectedDashaState[sys]) {
                selectedDashaState[sys].cycle = cycle;
                if (sys === "yogini") {
                    const p = document.getElementById("panel-dasha-yogini");
                    if (p) p.innerHTML = renderYoginiPanel(data.yoginiDasha);
                } else if (sys === "tribhagi") {
                    const p = document.getElementById("panel-dasha-tribhagi");
                    if (p) p.innerHTML = renderTribhagiPanel(data.tribhagiDasha);
                }
            }
            return;
        }

        // २. Click on Antardasha Row -> updates selected row and side panel
        const antRow = e.target.closest(".dasha-ant-row");
        if (antRow && antRow.dataset.midx !== undefined && antRow.dataset.aidx !== undefined) {
            e.stopPropagation();
            const sys = antRow.dataset.sys;
            const mIdx = parseInt(antRow.dataset.midx, 10);
            const aIdx = parseInt(antRow.dataset.aidx, 10);

            if (sys && selectedDashaState[sys]) {
                selectedDashaState[sys].mIdx = mIdx;
                selectedDashaState[sys].aIdx = aIdx;

                const panel = document.getElementById(`panel-dasha-${sys}`);
                if (panel) {
                    panel.querySelectorAll(".dasha-ant-row").forEach(r => r.classList.remove("selected"));
                    antRow.classList.add("selected");

                    const sidePanel = document.getElementById(`dashaSidePanel-${sys}`);
                    if (sidePanel) {
                        sidePanel.innerHTML = renderPratyantarSideContent(sys, mIdx, aIdx);
                    }
                }
            }
            return;
        }
    };
}


let isPatrikaExpanded = false;

/**
 * एकपाने जन्मपत्रिका खोल्ने वा बन्द गर्ने (Toggle Single-Page Patrika View)
 * प्रयोगकर्ताले "एकपाने पत्रिका हेर्नुहोस्" बटनमा क्लिक गर्दा मात्र यो खुल्छ
 */
function togglePatrikaView(forceState) {
    const container = document.getElementById("patrikaCollapsibleContainer");
    const toggleBtn = document.getElementById("togglePatrikaBtn");
    const headerEl = document.querySelector(".patrika-card-header");
    if (!container) return;

    if (forceState !== undefined) {
        isPatrikaExpanded = forceState;
    } else {
        isPatrikaExpanded = !isPatrikaExpanded;
    }

    if (isPatrikaExpanded) {
        // यदि अझै पत्रिका रेन्डर भएको छैन भने रेन्डर गर्ने
        const sheet = document.getElementById("patrikaSheet");
        if (currentKundaliData && (!sheet || !sheet.innerHTML || sheet.innerHTML.trim() === "")) {
            renderPatrikaView();
        }
        container.style.display = "block";
        if (toggleBtn) {
            toggleBtn.classList.add("active");
            toggleBtn.innerHTML = `
                <span class="patrika-toggle-icon">▲</span>
                <span class="patrika-toggle-text">एकपाने पत्रिका बन्द गर्नुहोस्</span>
                <span class="patrika-toggle-arrow">▲</span>
            `;
            toggleBtn.title = "एकपाने जन्मपत्रिका बन्द गर्न यहाँ क्लिक गर्नुहोस्";
        }
        if (headerEl) {
            headerEl.classList.add("expanded");
        }
        setTimeout(() => {
            container.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 80);
    } else {
        container.style.display = "none";
        if (toggleBtn) {
            toggleBtn.classList.remove("active");
            toggleBtn.innerHTML = `
                <span class="patrika-toggle-icon">👁️</span>
                <span class="patrika-toggle-text">एकपाने पत्रिका हेर्नुहोस्</span>
                <span class="patrika-toggle-arrow">▼</span>
            `;
            toggleBtn.title = "एकपाने जन्मपत्रिका हेर्न यहाँ क्लिक गर्नुहोस्";
        }
        if (headerEl) {
            headerEl.classList.remove("expanded");
        }
    }
}
if (typeof window !== "undefined") {
    window.togglePatrikaView = togglePatrikaView;
}

/**
 * एकपाने परम्परागत नेपाली जन्मपत्रिका (चीना - Single Page Traditional Patrika)
 */
function renderPatrikaView() {
    const patrikaEl = document.getElementById("patrikaSheet");
    if (!patrikaEl) return;

    if (!currentKundaliData) {
        patrikaEl.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #78350f; font-family: 'Mukta', sans-serif;">
                <div style="font-size: 3.5rem; margin-bottom: 14px;">📜</div>
                <h3 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 8px; color: #881337;">जन्म विवरण प्राप्त भएको छैन</h3>
                <p style="font-size: 1rem; color: #78350f; max-width: 500px; margin: 0 auto 20px auto; line-height: 1.6;">
                    कृपया पहिले <strong>"जन्मकुण्डली निर्माण"</strong> ट्याबमा गई जन्म विवरण (नाम, मिति, समय, स्थान) भरेर <strong>"कुण्डली निर्माण गर्नुहोस्"</strong> बटनमा क्लिक गर्नुहोस् । त्यसपछि यहाँ एकपाने परम्परागत नेपाली जन्मपत्रिका स्वतः निर्माण हुनेछ ।
                </p>
                <button onclick="switchToTab('tab-kundali')" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.95rem; padding: 9px 20px;">
                    <span>☸️</span> जन्मकुण्डली निर्माण ट्याबमा जानुहोस्
                </button>
            </div>
        `;
        return;
    }

    const data = currentKundaliData;

    // 1. Shaka, Sambat, Years & Astrological Dates
    const shakaYearNp = toNepaliDigits(data.bsYear - 135);
    const bsYearNp = toNepaliDigits(data.bsYear);
    const adYearNp = toNepaliDigits(data.adYear);
    const samvatsara = SAMVATSARAS[((data.bsYear - 2030) % 60 + 60) % 60] || "रौद्र";
    const ayana = getAyana(data.planets.Surya.deg);
    const chandraMasa = data.chandraMasa || SANSKRIT_MASA_NAMES[data.bsMonth - 1] || data.bsMonthName;
    const sauraMasa = data.sauraMasa || SANSKRIT_MASA_NAMES[data.bsMonth - 1] || data.bsMonthName;
    const ayanaStr = ayana.includes("दक्षिण") ? "दक्षिण अयने" : "उत्तर अयने";
    const rituStr = (data.ritu || getRitu(data.bsMonth)).replace("द्", "द");
    const paksha = data.tithi.paksha === "शुक्ल पक्ष" ? "शुक्ल" : "कृष्ण";
    const vaarName = SANSKRIT_VAARA_NAMES[data.adDateObj.getDay()] || "शनि";
    const tithiName = data.tithi.name;

    // Tithi Ghati:Pala
    const diff = normalizeDeg(data.planets.Chandra.deg - data.planets.Surya.deg);
    const remTithiDeg = 12.0 - (diff % 12.0);
    const tithiGhatiPalaNp = toNepaliDigits(formatGhatiPala((remTithiDeg / 12.2) * 60.0));
    const nextTithiName = getNextTithiName(data.tithi.number);

    // Nakshatra Ghati:Pala, Bhukta, Bhabhoga
    const bhabhogaObj = calculateBhabhogaAndBhukta(data.planets.Chandra.deg);
    const nakshatraName = data.moonNak.nakshatraNameNp;
    const nakGhatiPalaNp = bhabhogaObj.remStrNp;
    const bhuktaGhatiPalaNp = bhabhogaObj.bhuktaStrNp;
    const bhabhogaGhatiPalaNp = bhabhogaObj.bhabhogaStrNp;

    const yogaName = data.yoga;
    const karanaName = data.karana;
    const bsDayNp = toNepaliDigits(data.bsDay);
    const adMonthNp = AD_MONTH_NAMES_NP[data.adMonth - 1] || "अक्टोबर";
    const adDayNp = toNepaliDigits(data.adDay);
    const birthTimeStrNp = toNepaliDigits(data.birthTimeStr);
    const ishtakalaNp = toNepaliDigits(data.ishtakalaColonStr || data.ishtakalaStr);
    const lagnaRashiNp = data.lagnaRashi.rashiNameNp;
    const navamshaRashiNp = data.navamshaLagna.nameNp;
    const chandraRashiNp = data.moonRashi.rashiNameNp;
    const placeName = data.placeName;
    const latNp = toNepaliDigits(Math.floor(data.lat)) + ":" + toNepaliDigits(Math.round((data.lat % 1) * 60));
    const lonNp = toNepaliDigits(Math.floor(data.lon)) + ":" + toNepaliDigits(Math.round((data.lon % 1) * 60));
    const lmtNp = toNepaliDigits(calculateLMT(data.birthTimeStr, data.lon));

    // Dynamic Country & Timezone
    const countryNameStr = data.countryName ? `${data.countryName} देशे` : "नेपाल देशे";
    const tzOffset = data.tzOffset !== undefined ? data.tzOffset : 5.75;
    const tzSign = tzOffset >= 0 ? "+" : "-";
    const tzTotalMin = Math.round(Math.abs(tzOffset) * 60);
    const tzHour = Math.floor(tzTotalMin / 60);
    const tzMin = tzTotalMin % 60;
    const tzStrNp = toNepaliDigits(`${tzSign} ${tzHour}:${tzMin.toString().padStart(2, '0')}`);

    const gotra = data.gotra || "काश्यप";
    const fatherName = data.fatherName && data.fatherName !== "-" ? data.fatherName : "...";
    const motherName = data.motherName && data.motherName !== "-" ? data.motherName : "...";
    const childTerm = data.gender === "महिला" ? "पुत्री" : "पुत्र";
    const childName = data.name || "श्री जातक";
    const padaName = getPadaName(data.moonNak.pada);
    const namaakshar = data.moonNak.namaakshar;
    const yoni = data.moonNak.yoni;
    const nadi = data.moonNak.nadi;
    const gana = data.moonNak.gana === "मनुष्य" ? "नर" : data.moonNak.gana;
    const varga = getVarga(data.moonNak.namaakshar);
    const asana = getAsana(data.moonNak.nakshatraId);
    const varna = getVarna(data.moonRashi.rashiId);

    const ghata = GHATA_CHAKRA[chandraRashiNp] || GHATA_CHAKRA["मिथुन"];
    const ghataTithi = toNepaliDigits(ghata.tithi);
    const ghataVaar = ghata.vaar;
    const ghataNak = ghata.nak;
    const ghataLagna = ghata.lagna;
    const ghataRashi = ghata.rashi;

    // 2. Graha Spashta Table Rows (Lagna + 9 Planets)
    const spashtaRowsHtml = buildGrahaSpashtaRows(data);

    // 3. North Indian Charts (D1 and D9)
    const planetListD1 = [
        { name: "Surya", rashiId: getRashiDetails(data.planets.Surya.deg).rashiId, isRetrograde: data.planets.Surya.isRetrograde },
        { name: "Chandra", rashiId: getRashiDetails(data.planets.Chandra.deg).rashiId, isRetrograde: data.planets.Chandra.isRetrograde },
        { name: "Mangal", rashiId: getRashiDetails(data.planets.Mangal.deg).rashiId, isRetrograde: data.planets.Mangal.isRetrograde },
        { name: "Budha", rashiId: getRashiDetails(data.planets.Budha.deg).rashiId, isRetrograde: data.planets.Budha.isRetrograde },
        { name: "Guru", rashiId: getRashiDetails(data.planets.Guru.deg).rashiId, isRetrograde: data.planets.Guru.isRetrograde },
        { name: "Shukra", rashiId: getRashiDetails(data.planets.Shukra.deg).rashiId, isRetrograde: data.planets.Shukra.isRetrograde },
        { name: "Shani", rashiId: getRashiDetails(data.planets.Shani.deg).rashiId, isRetrograde: data.planets.Shani.isRetrograde },
        { name: "Rahu", rashiId: getRashiDetails(data.planets.Rahu.deg).rashiId, isRetrograde: true },
        { name: "Ketu", rashiId: getRashiDetails(data.planets.Ketu.deg).rashiId, isRetrograde: true }
    ];

    const planetListD9 = [
        { name: "Surya", rashiId: data.navamshaPlanets.Surya.id, isRetrograde: data.planets.Surya.isRetrograde },
        { name: "Chandra", rashiId: data.navamshaPlanets.Chandra.id, isRetrograde: data.planets.Chandra.isRetrograde },
        { name: "Mangal", rashiId: data.navamshaPlanets.Mangal.id, isRetrograde: data.planets.Mangal.isRetrograde },
        { name: "Budha", rashiId: data.navamshaPlanets.Budha.id, isRetrograde: data.planets.Budha.isRetrograde },
        { name: "Guru", rashiId: data.navamshaPlanets.Guru.id, isRetrograde: data.planets.Guru.isRetrograde },
        { name: "Shukra", rashiId: data.navamshaPlanets.Shukra.id, isRetrograde: data.planets.Shukra.isRetrograde },
        { name: "Shani", rashiId: data.navamshaPlanets.Shani.id, isRetrograde: data.planets.Shani.isRetrograde },
        { name: "Rahu", rashiId: data.navamshaPlanets.Rahu.id, isRetrograde: true },
        { name: "Ketu", rashiId: data.navamshaPlanets.Ketu.id, isRetrograde: true }
    ];

    const d1Svg = renderNorthIndianChart(data.lagnaRashi.rashiId, planetListD1, "लग्न कुण्डली", 180);
    const d9Svg = renderNorthIndianChart(data.navamshaLagna.id, planetListD9, "नवमांश कुण्डली", 180);

    // 4. Full HTML Assembly
    patrikaEl.innerHTML = `
        <div class="patrika-border">
            <!-- Center Watermark Logo -->
            <div class="patrika-watermark" aria-hidden="true"></div>

            <!-- Foreground Content Area -->
            <div class="patrika-content">
                <!-- 1. मङ्गलाचरण तथा मङ्गल श्लोक -->
                <div class="patrika-top-area">
                    <div class="patrika-shloka-box">
                        <div class="shloka-namah">॥ श्री मङ्गलमूर्तये नमः ॥</div>
                        <div class="shloka-main">
                            आदित्याद्या ग्रहास्सर्वे सनक्षत्राः सराशयः ।<br>
                            कुर्वन्तु मङ्गलं तस्य यस्यैषा जन्मपत्रिका ॥
                        </div>
                    </div>
                    <div class="patrika-divider-ornament">
                        <span class="ornament-sym">❖</span>
                        <span class="ornament-line"></span>
                        <span class="ornament-center">卐</span>
                        <span class="ornament-line"></span>
                        <span class="ornament-sym">❖</span>
                    </div>
                </div>

                <!-- 2. परम्परागत संस्कृत जन्मपत्रिका गद्य संकल्प (फोटो शैली) -->
                <div class="patrika-sanskrit-prose">
                    <p>
                        श्रीशालिवाहनीय शक: <span class="val-red">${shakaYearNp}</span> श्रीवीरविक्रमादित्य संवत् <span class="val-red">${bsYearNp}</span> ईस्वीय सन् <span class="val-red">${adYearNp}</span> अत्रास्मिन् वर्षे <span class="val-bold">${samvatsara}</span> नाम संवत्सरे श्रीसूर्ये <span class="val-uline">${ayanaStr}</span> <span class="val-bold">${rituStr}</span> ऋतौ चान्द्रमानेन <span class="val-bold">${chandraMasa}</span> मासे <span class="val-bold">${paksha}</span> पक्षे <span class="val-bold">${vaarName}</span> वासरे <span class="val-bold">${tithiName}</span> तिथौ घट्यादिः <span class="val-red">${tithiGhatiPalaNp}</span> पर <span class="val-red">${nextTithiName}</span> तिथौ <span class="val-bold">${nakshatraName}</span> नक्षत्रे घट्यादिः <span class="val-red">${nakGhatiPalaNp}</span> भुक्त घट्यादिः <span class="val-red">${bhuktaGhatiPalaNp}</span> भभोग घट्यादिः <span class="val-red">${bhabhogaGhatiPalaNp}</span> <span class="val-bold">${yogaName}</span> योगे <span class="val-bold">${karanaName}</span> करणे सौरमानेन <span class="val-bold">${sauraMasa}</span> मासे गते <span class="val-red">${bsDayNp}</span> (ईस्वीय <span class="val-bold">${adMonthNp}</span> तारिख <span class="val-red">${adDayNp}</span> ) प्रामाणिक <span class="val-red">${birthTimeStrNp}</span> समये सूर्योदयादिष्ट घट्यादिः <span class="val-red">${ishtakalaNp}</span> जन्मसमये <span class="val-bold">${lagnaRashiNp}</span> लग्नोदय <span class="val-bold">${navamshaRashiNp}</span> नवमांशके <span class="val-bold">${chandraRashiNp}</span> राशिगते चान्द्रमसि <span class="val-bold">${countryNameStr}</span> <span class="val-red">${placeName}</span> स्थाने (अक्षांश <span class="val-red">${latNp}</span> उ., देशान्तर <span class="val-red">${lonNp}</span> पू., मानक <span class="val-red">${tzStrNp}</span>, स्थानीय <span class="val-red">${lmtNp}</span>) निवसतः <span class="val-red">${gotra}</span> गोत्रोत्पन्न श्रीमतः <span class="val-red">${fatherName}</span> भार्या श्रीमती <span class="val-red">${motherName}</span> देव्यां गर्भस्थ <span class="val-bold">${childTerm}</span> <span class="val-red">${childName}</span> रत्नमजीजनत् ।
                    </p>
                    <p>
                        अस्य होराशास्त्र प्रमाणेन <span class="val-bold">${nakshatraName}</span> नक्षत्रस्य <span class="val-bold">${padaName}</span> चरणत्वेन <span class="val-bold">${namaakshar}</span> काराक्षरस्य <span class="val-bold">${yoni}</span> योनि <span class="val-bold">${nadi}</span> नाडी <span class="val-bold">${gana}</span> गण <span class="val-bold">${varga}</span> वर्ग <span class="val-bold">${asana}</span> आसन <span class="val-bold">${varna}</span> वर्णात्मक श्री <span class="val-red">${childName}</span> इति चिरञ्जीव शुभनाम प्रतिष्ठितं सचदेवद्विजाशीर्वादैदीर्घमायूभूयात्। घात तिथ्यादयः— तिथि: <span class="val-red">${ghataTithi}</span>, वार: <span class="val-bold">${ghataVaar}</span>, नक्षत्र: <span class="val-bold">${ghataNak}</span>, लग्न: <span class="val-bold">${ghataLagna}</span>, राशि: <span class="val-bold">${ghataRashi}</span> ।
                    </p>
                </div>

                <!-- 3. कुण्डलीहरू भन्दा पहिला: जन्मकालीन ग्रहस्पष्ट सारिणी -->
                <div class="patrika-spashta-wrapper">
                    <div class="patrika-section-header">
                        <span class="ornament-sym">❖</span>
                        <span>॥ अथ जन्मकालीन ग्रहस्पष्ट सारिणी ॥</span>
                        <span class="ornament-sym">❖</span>
                    </div>
                    <table class="patrika-spashta-table">
                        <thead>
                            <tr>
                                <th>ग्रह</th>
                                <th>राशि</th>
                                <th>अंश</th>
                                <th>कला</th>
                                <th>विकला</th>
                                <th>नक्षत्र</th>
                                <th>चरण</th>
                                <th>गति</th>
                                <th>भाव</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${spashtaRowsHtml}
                        </tbody>
                    </table>
                </div>

                <!-- 4. कुण्डली चक्रहरू (लग्न कुण्डली र नवमांश कुण्डली) -->
                <div class="patrika-charts-area">
                    <div class="patrika-single-chart">
                        ${d1Svg}
                    </div>
                    <div class="patrika-single-chart">
                        ${d9Svg}
                    </div>
                </div>

                <!-- 5. कुण्डलीको तलपट्टि: जन्मकालिक भोग्यदशा विवरण (विंशोत्तरी, त्रिभागी, योगिनी) -->
                <div class="patrika-bhogya-dasha-box">
                    <div class="patrika-bhogya-title">
                        <span class="ornament-sym">❖</span>
                        <span>॥ जन्मकालिक भोग्यदशा विवरण ॥</span>
                        <span class="ornament-sym">❖</span>
                    </div>
                    <div class="patrika-bhogya-grid">
                        <div class="bhogya-item">
                            <span class="bhogya-label">१. विंशोत्तरी महादशा:</span>
                            <span class="bhogya-val"><strong>${data.dasha ? data.dasha.initialLord : '-'}</strong> दशा</span>
                            <span class="bhogya-bal">भोग्य: <strong>${data.dasha ? data.dasha.balance : '-'}</strong></span>
                        </div>
                        <div class="bhogya-item">
                            <span class="bhogya-label">२. त्रिभागी महादशा:</span>
                            <span class="bhogya-val"><strong>${data.tribhagiDasha ? data.tribhagiDasha.initialLord : '-'}</strong> दशा</span>
                            <span class="bhogya-bal">भोग्य: <strong>${data.tribhagiDasha ? data.tribhagiDasha.balance : '-'}</strong></span>
                        </div>
                        <div class="bhogya-item">
                            <span class="bhogya-label">३. योगिनी दशा:</span>
                            <span class="bhogya-val"><strong>${data.yoginiDasha ? data.yoginiDasha.initialYogini + ' (' + data.yoginiDasha.initialLord + ')' : '-'}</strong></span>
                            <span class="bhogya-bal">भोग्य: <strong>${data.yoginiDasha ? data.yoginiDasha.balance : '-'}</strong></span>
                        </div>
                    </div>
                </div>

                <!-- 6. अन्त्यमा शुभाशीर्वाद तथा ज्योतिष पण्डितको नाम लेख्ने स्थान -->
                <div class="patrika-footer-area">
                    <div class="patrika-blessing-text">
                        ॥ श्रीरस्तु ॥ शुभं भवतु । सर्वदा कल्याणं भूयात् ॥
                    </div>
                    <div class="patrika-pandit-signature">
                        <span class="pandit-title">ज्योतिष / पण्डितको नाम:</span>
                        <span class="pandit-line">........................................................................</span>
                        <span class="pandit-hastakshar">(हस्ताक्षर)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * कुण्डली मिलान (Match Making / 36 Guna Milan)
 */
function calculateMatchMaking() {
    const boyBsYear = parseInt(document.getElementById("boyBsYear")?.value, 10) || 2055;
    const boyBsMonth = parseInt(document.getElementById("boyBsMonth")?.value, 10) || 5;
    const boyBsDay = parseInt(document.getElementById("boyBsDay")?.value, 10) || 15;
    const boyTimeStr = document.getElementById("boyTime")?.value || "10:00:00";

    const girlBsYear = parseInt(document.getElementById("girlBsYear")?.value, 10) || 2057;
    const girlBsMonth = parseInt(document.getElementById("girlBsMonth")?.value, 10) || 8;
    const girlBsDay = parseInt(document.getElementById("girlBsDay")?.value, 10) || 20;
    const girlTimeStr = document.getElementById("girlTime")?.value || "14:30:00";

    // Boy's Moon Position
    const bAd = bsToAd(boyBsYear, boyBsMonth, boyBsDay);
    const bParts = boyTimeStr.split(":").map(Number);
    const bLocalMs = bAd.getTime() + (bParts[0] * 3600 + (bParts[1] || 0) * 60) * 1000;
    const bUtc = new Date(bLocalMs - NEPAL_TZ_OFFSET * 3600 * 1000);
    const bJd = getJulianDay(bUtc);
    const bAyan = getLahiriAyanamsha(bJd);
    const bPlanets = calculatePlanetPositions(bJd, bAyan);

    // Girl's Moon Position
    const gAd = bsToAd(girlBsYear, girlBsMonth, girlBsDay);
    const gParts = girlTimeStr.split(":").map(Number);
    const gLocalMs = gAd.getTime() + (gParts[0] * 3600 + (gParts[1] || 0) * 60) * 1000;
    const gUtc = new Date(gLocalMs - NEPAL_TZ_OFFSET * 3600 * 1000);
    const gJd = getJulianDay(gUtc);
    const gAyan = getLahiriAyanamsha(gJd);
    const gPlanets = calculatePlanetPositions(gJd, gAyan);

    const matchResult = calculateAshtakootMilan(bPlanets.Chandra.deg, gPlanets.Chandra.deg);

    const resultEl = document.getElementById("milanResult");
    if (!resultEl) return;

    let rows = "";
    matchResult.details.forEach(d => {
        rows += `
            <tr>
                <td><strong>${d.name}</strong></td>
                <td>${d.max}</td>
                <td><strong>${d.obtained}</strong></td>
                <td>${d.desc}</td>
            </tr>
        `;
    });

    resultEl.innerHTML = `
        <div class="milan-score-banner">
            <div class="score-display">
                <span class="score-num">${matchResult.totalScore}</span>
                <span class="score-max">/ ${matchResult.maxScore}</span>
            </div>
            <div class="verdict-display">
                <h3>नतिजा: ${matchResult.verdict}</h3>
                <p>वर (केटा): ${matchResult.boyDetails.rashi} राशि, ${matchResult.boyDetails.nak} नक्षत्र | कन्या (केटी): ${matchResult.girlDetails.rashi} राशि, ${matchResult.girlDetails.nak} नक्षत्र</p>
            </div>
        </div>

        <table class="styled-table">
            <thead>
                <tr>
                    <th>अष्टकूट विचार</th>
                    <th>अधिकतम गुण</th>
                    <th>प्राप्त गुण</th>
                    <th>विवरण</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

/**
 * ====================================================
 * दैनिक पञ्चाङ्ग (फोटो कार्ड) नियन्त्रक
 * ====================================================
 */

/**
 * पञ्चाङ्गको मिति आजको वर्तमान मिति (Right Now BS Date) मा सेट गर्छ
 */
function setCurrentPanchangDate() {
    const now = new Date();
    const bs = adToBs(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const pBsYear = document.getElementById("pBsYear");
    const pBsMonth = document.getElementById("pBsMonth");
    const pBsDay = document.getElementById("pBsDay");

    if (pBsYear && pBsMonth && pBsDay) {
        pBsYear.value = bs.year;
        pBsMonth.value = bs.month;
        updatePanchangDays();
        pBsDay.value = bs.day;
    }

    const calMonthSelect = document.getElementById("calMonthSelect");
    const calYearSelect = document.getElementById("calYearSelect");
    const calDaySelect = document.getElementById("calDaySelect");
    if (calYearSelect) calYearSelect.value = bs.year;
    if (calMonthSelect) calMonthSelect.value = bs.month;
    if (calDaySelect) calDaySelect.value = bs.day;
}

function initPanchangControls() {
    const pBsYear = document.getElementById("pBsYear");
    const pBsMonth = document.getElementById("pBsMonth");
    const pBsDay = document.getElementById("pBsDay");
    const calMonthSelect = document.getElementById("calMonthSelect");
    const calYearSelect = document.getElementById("calYearSelect");
    const calDaySelect = document.getElementById("calDaySelect");

    if (!pBsYear || !pBsMonth || !pBsDay) return;

    pBsYear.innerHTML = "";
    for (let y = 2200; y >= 1970; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = `${y} वि.सं.`;
        pBsYear.appendChild(opt);
    }

    pBsMonth.innerHTML = "";
    BS_MONTH_NAMES_NP.forEach((mName, idx) => {
        const opt = document.createElement("option");
        opt.value = idx + 1;
        opt.textContent = `${idx + 1}. ${mName}`;
        pBsMonth.appendChild(opt);
    });

    if (calYearSelect) {
        calYearSelect.innerHTML = "";
        for (let y = 2200; y >= 1970; y--) {
            const opt = document.createElement("option");
            opt.value = y;
            opt.textContent = `${toNepaliDigits(y)} वि.सं.`;
            calYearSelect.appendChild(opt);
        }
        calYearSelect.addEventListener("change", () => {
            pBsYear.value = calYearSelect.value;
            updatePanchangDays();
            updatePanchangCard();
        });
    }

    if (calMonthSelect) {
        calMonthSelect.innerHTML = "";
        BS_MONTH_NAMES_NP.forEach((mName, idx) => {
            const opt = document.createElement("option");
            opt.value = idx + 1;
            opt.textContent = `${mName}`;
            calMonthSelect.appendChild(opt);
        });
        calMonthSelect.addEventListener("change", () => {
            pBsMonth.value = calMonthSelect.value;
            updatePanchangDays();
            updatePanchangCard();
        });
    }

    if (calDaySelect) {
        calDaySelect.addEventListener("change", () => {
            pBsDay.value = calDaySelect.value;
            updatePanchangCard();
        });
    }

    // सुरुमा आजको वर्तमान नेपाली मिति सेट गर्ने
    setCurrentPanchangDate();

    pBsYear.addEventListener("change", () => {
        if (calYearSelect) calYearSelect.value = pBsYear.value;
        updatePanchangDays();
        updatePanchangCard();
    });
    pBsMonth.addEventListener("change", () => {
        if (calMonthSelect) calMonthSelect.value = pBsMonth.value;
        updatePanchangDays();
        updatePanchangCard();
    });
    pBsDay.addEventListener("change", () => {
        if (calDaySelect) calDaySelect.value = pBsDay.value;
        updatePanchangCard();
    });

    // क्यालेन्डर अघिल्लो/पछिल्लो महिना नेभिगेसन बटनहरू
    const prevBtn = document.getElementById("calPrevMonthBtn");
    const nextBtn = document.getElementById("calNextMonthBtn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            let y = parseInt(pBsYear.value, 10);
            let m = parseInt(pBsMonth.value, 10);
            if (m > 1) {
                m--;
            } else if (y > 1970) {
                m = 12;
                y--;
            }
            pBsYear.value = y;
            pBsMonth.value = m;
            if (calYearSelect) calYearSelect.value = y;
            if (calMonthSelect) calMonthSelect.value = m;
            updatePanchangDays();
            updatePanchangCard();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            let y = parseInt(pBsYear.value, 10);
            let m = parseInt(pBsMonth.value, 10);
            if (m < 12) {
                m++;
            } else if (y < 2200) {
                m = 1;
                y++;
            }
            pBsYear.value = y;
            pBsMonth.value = m;
            if (calYearSelect) calYearSelect.value = y;
            if (calMonthSelect) calMonthSelect.value = m;
            updatePanchangDays();
            updatePanchangCard();
        });
    }

    const todayBtn = document.getElementById("calTodayBtn");
    if (todayBtn) {
        todayBtn.addEventListener("click", () => {
            setCurrentPanchangDate();
            updatePanchangCard();
        });
    }
}

function updatePanchangDays() {
    const pBsYear = parseInt(document.getElementById("pBsYear")?.value, 10) || 2083;
    const pBsMonth = parseInt(document.getElementById("pBsMonth")?.value, 10) || 6;
    const pBsDay = document.getElementById("pBsDay");
    const calDaySelect = document.getElementById("calDaySelect");
    if (!pBsDay) return;

    const currentVal = parseInt(pBsDay.value || (calDaySelect ? calDaySelect.value : 1), 10) || 1;
    const maxDays = (BS_CALENDAR_DATA[pBsYear] && BS_CALENDAR_DATA[pBsYear][pBsMonth - 1]) || 32;

    pBsDay.innerHTML = "";
    for (let d = 1; d <= maxDays; d++) {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = `${d} गते`;
        pBsDay.appendChild(opt);
    }
    pBsDay.value = Math.min(currentVal, maxDays);

    if (calDaySelect) {
        calDaySelect.innerHTML = "";
        for (let d = 1; d <= maxDays; d++) {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = `${toNepaliDigits(d)} गते`;
            calDaySelect.appendChild(opt);
        }
        calDaySelect.value = Math.min(currentVal, maxDays);
    }
}

function updatePanchangCard() {
    const pBsYear = parseInt(document.getElementById("pBsYear")?.value, 10) || 2083;
    const pBsMonth = parseInt(document.getElementById("pBsMonth")?.value, 10) || 6;
    const pBsDay = parseInt(document.getElementById("pBsDay")?.value, 10) || 29;

    // नेपालको मानक पञ्चाङ्ग गणना (काठमाडौँ मानक: २७°४३' N, ८५°१९' E)
    const lat = 27.7172;
    const lon = 85.3240;

    const panchang = calculateDailyPanchanga(pBsYear, pBsMonth, pBsDay, lat, lon, currentSiddhanta);
    currentPanchangData = panchang;

    const pBadge = document.getElementById("panchangSiddhantaBadge");
    if (pBadge) {
        pBadge.textContent = currentSiddhanta === "surya" ? "☀️ सूर्य सिद्धान्त (वेदश्चक्षु १.०)" : "👁️ दृक् सिद्धान्त (वेदश्चक्षु १.०)";
        pBadge.className = currentSiddhanta === "surya"
            ? "text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
            : "text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300 shadow-2xs";
    }

    const setTxt = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    };

    setTxt("cardBsDate", panchang.bsDateStrNp);
    setTxt("cardAdDate", panchang.adDateStr);
    setTxt("cardShakaPill", `शालिवाहन शाके ${panchang.shakaYearNp}`);
    setTxt("cardNepalSambatPill", `नेपाल संवत् ${panchang.nepalSambatNp}`);

    setTxt("cardSamvatsara", panchang.samvatsara);
    setTxt("cardAyana", panchang.ayana);
    setTxt("cardRitu", panchang.ritu);
    setTxt("cardMasa", panchang.masa);
    setTxt("cardPaksha", panchang.paksha);

    setTxt("cardSunrise", panchang.sunriseNp);
    setTxt("cardSunset", panchang.sunsetNp);

    setTxt("cardTithi", panchang.tithiName);
    setTxt("cardTithiTime", panchang.tithiGhatiPalaNp);

    setTxt("cardVaar", panchang.vaarName);
    setTxt("cardNakshatra", panchang.nakshatraName);
    setTxt("cardNakshatraTime", panchang.nakshatraGhatiPalaNp);

    setTxt("cardYoga", panchang.yogaName);
    setTxt("cardYogaTime", panchang.yogaGhatiPalaNp);

    setTxt("cardKarana", panchang.karanaName);
    setTxt("cardKaranaTime", panchang.karanaGhatiPalaNp);

    setTxt("cardChandraPill", `चन्द्र राशि ${panchang.chandraRashi}`);
    setTxt("cardSuryaPill", `सूर्य राशि ${panchang.suryaRashi}`);
    setTxt("cardGuruPill", `गुरु राशि ${panchang.guruRashi}`);
    setTxt("clockSunriseVal", panchang.sunriseNp);

    // पञ्चाङ्ग शास्त्रीय संकल्प शिरोभाग अपडेट गर्ने
    const sankalpaEl = document.getElementById("panchangSankalpaText");
    if (sankalpaEl) {
        sankalpaEl.innerHTML = renderPanchangSankalpaHtml(panchang);
    }

    // आजको चाडपर्व वा सार्वजनिक विदा पत्ता लगाई कार्डमा देखाउने
    const parvaAlertEl = document.getElementById("cardTodayParvaAlert");
    if (parvaAlertEl) {
        if (typeof getParvaForDate === "function") {
            const todayParva = getParvaForDate(panchang.bsYear, panchang.bsMonth, panchang.bsDay, panchang.tithiName, panchang.paksha, panchang.adDate, panchang.chandraMonthNum);
            if (todayParva) {
                const holidayBadge = todayParva.isHoliday 
                    ? `<span class="parva-holiday-tag">🔴 सार्वजनिक विदा</span>` 
                    : `<span class="parva-festival-tag">🚩 पर्व</span>`;
                parvaAlertEl.innerHTML = `
                    <div class="today-parva-badge-inner">
                        ${holidayBadge}
                        <strong class="today-parva-name">${todayParva.name}</strong>
                        <span class="today-parva-sub">(${todayParva.dateDisplay})</span>
                    </div>
                `;
                parvaAlertEl.style.display = "block";
                parvaAlertEl.onclick = () => switchToTab("tab-parva");
                parvaAlertEl.style.cursor = "pointer";
                parvaAlertEl.title = "वार्षिक चाडपर्व तथा विदा तालिका हेर्न क्लिक गर्नुहोस्";
            } else {
                parvaAlertEl.style.display = "none";
                parvaAlertEl.innerHTML = "";
            }
        }
    }

    // माथिल्लो नेपाली क्यालेन्डर (Sidebar + Monthly Grid) अद्यावधिक गर्ने
    renderMonthlyCalendarUI(pBsYear, pBsMonth, pBsDay, panchang);
}

/**
 * क्यालेन्डर ग्रिड तथा दैनिक साइडबार विवरण अपडेट गर्छ
 */
function renderMonthlyCalendarUI(year, month, day, panchang) {
    if (!panchang) return;

    const mName = BS_MONTH_NAMES_NP[month - 1] || "असोज";
    const setEl = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    };

    setEl("sidebarMainDate", `${toNepaliDigits(day)} ${mName}`);
    setEl("sidebarDayYear", `${panchang.vaarName}, ${toNepaliDigits(year)}`);
    setEl("sidebarAdDate", panchang.adDateStr);

    const isShukla = (panchang.paksha === "शुक्ल");
    const shakaNp = panchang.shakaYearNp || toNepaliDigits(year - 135);
    setEl("sidebarShaka", shakaNp);

    // नेपाल संवत् (अमान्त चान्द्रमान अनुसार कौलाथ्व, कौलागा, आदि)
    const nsPaksha = panchang.nepalSambatPaksha || "कौलाथ्व";
    const nepalSambatNp = panchang.nepalSambatNp || toNepaliDigits(year - 937);
    setEl("sidebarNepalSambatVal", `${nepalSambatNp} (${nsPaksha})`);

    // शास्त्रीय चान्द्रमास अनुसारको शुद्ध पक्ष नाम (e.g. आश्विनशुक्ल पक्षः)
    // तिथिको महिना र गतेको महिना फरक हुने भएकाले चान्द्रमास (chandraMasa) प्रयोग गरिन्छ
    const chandraMasaName = panchang.chandraMasa || panchang.masa || "आश्विन";
    const pakshaBadgeEl = document.getElementById("sidebarPakshaBadge");
    if (pakshaBadgeEl) {
        pakshaBadgeEl.innerHTML = `${chandraMasaName}${panchang.paksha} पक्षः`;
    }

    setEl("sidebarTithi", `${panchang.tithiName} तिथि`);

    // Festival / Event name in #D97706
    const eventEl = document.getElementById("sidebarFestival");
    if (eventEl) {
        let eventName = "शुभ दिन";
        if (typeof getParvaForDate === "function") {
            const parva = getParvaForDate(year, month, day, panchang.tithiName, panchang.paksha, panchang.adDate, panchang.chandraMonthNum);
            if (parva) {
                eventName = parva.name;
            }
        }
        eventEl.textContent = eventName;
    }

    // शास्त्रीय अयन, ऋतु तथा संवत्सर
    const ayanaRaw = panchang.ayana || "दक्षिणायन";
    const ayanaSanskrit = ayanaRaw.includes("दक्षिण") ? "दक्षिणायनं" : "उत्तरायणं";

    const rituRaw = panchang.ritu || "शरद्";
    let rituSanskrit = "शरदृतुः";
    if (rituRaw.includes("शरद्")) rituSanskrit = "शरदृतुः";
    else if (rituRaw.includes("हेमन्त")) rituSanskrit = "हेमन्तर्तुः";
    else if (rituRaw.includes("शिशिर")) rituSanskrit = "शिशिरर्तुः";
    else if (rituRaw.includes("वसन्त")) rituSanskrit = "वसन्तर्तुः";
    else if (rituRaw.includes("ग्रीष्म")) rituSanskrit = "ग्रीष्मर्तुः";
    else if (rituRaw.includes("वर्षा")) rituSanskrit = "वर्षर्तुः";

    const samvatRaw = panchang.samvatsara || "रौद्र";
    const samvatSanskrit = `${samvatRaw}नामसंवत्सरः ।`;

    setEl("sidebarAyanaRitu", `${ayanaSanskrit} ${rituSanskrit}`);
    setEl("sidebarSamvatsara", samvatSanskrit);

    if (panchang.sunriseNp) setEl("sidebarSunrise", `${panchang.sunriseNp} AM`);
    if (panchang.sunsetNp) setEl("sidebarSunset", `${panchang.sunsetNp} PM`);

    // क्यालेन्डर मुनिपट्टि सिधा लाइनमा ६ वटा विवरणहरू: नक्षत्र, योग, करण, चन्द्र राशि (परिवर्तन समय सहित), सूर्य राशि, गुरु राशि
    setEl("calBottomNakshatra", panchang.nakshatraName);
    setEl("calBottomNakshatraTime", panchang.nakshatraGhatiPalaNp || "");

    setEl("calBottomYoga", panchang.yogaName);
    setEl("calBottomYogaTime", panchang.yogaGhatiPalaNp || "");

    setEl("calBottomKarana", panchang.karanaName);
    setEl("calBottomKaranaTime", panchang.karanaGhatiPalaNp || "");

    setEl("calBottomChandraRashi", panchang.chandraRashi);
    setEl("calBottomChandraRashiTime", panchang.chandraRashiChangeTimeNp || "अहोरात्र");
    const chandraCard = document.getElementById("calBottomChandraCard");
    if (chandraCard) {
        chandraCard.title = panchang.chandraRashiChangeFull || `चन्द्र राशि: ${panchang.chandraRashi}`;
    }

    setEl("calBottomSuryaRashi", panchang.suryaRashi);
    setEl("calBottomGuruRashi", panchang.guruRashi);

    // Month & Year Controls Synchronization
    setEl("calMonthHeaderTitle", `${mName} ${toNepaliDigits(year)}`);
    const calMonthSelect = document.getElementById("calMonthSelect");
    const calYearSelect = document.getElementById("calYearSelect");
    const calDaySelect = document.getElementById("calDaySelect");
    if (calDaySelect && calDaySelect.value !== String(day)) {
        calDaySelect.value = day;
    }
    if (calMonthSelect && calMonthSelect.value !== String(month)) {
        calMonthSelect.value = month;
    }
    if (calYearSelect && calYearSelect.value !== String(year)) {
        calYearSelect.value = year;
    }

    // ७ स्तम्भीय क्यालेन्डर ग्रिड निर्माण
    const gridEl = document.getElementById("calendarGridDays");
    if (!gridEl) return;

    const daysInMonth = (BS_CALENDAR_DATA[year] && BS_CALENDAR_DATA[year][month - 1]) || 30;
    const daysInPrevMonth = (month > 1) 
        ? ((BS_CALENDAR_DATA[year] && BS_CALENDAR_DATA[year][month - 2]) || 31)
        : ((BS_CALENDAR_DATA[year - 1] && BS_CALENDAR_DATA[year - 1][11]) || 30);

    let startDayIndex = 0;
    if (typeof bsToAd === "function") {
        const firstAd = bsToAd(year, month, 1);
        startDayIndex = firstAd.getUTCDay();
    }

    let html = "";

    // अघिल्लो महिनाका दिनहरू (Faded / Light Gray)
    for (let i = startDayIndex - 1; i >= 0; i--) {
        const prevDay = daysInPrevMonth - i;
        html += `
            <div class="cal-cell is-empty">
                <span>${toNepaliDigits(prevDay)}</span>
            </div>
        `;
    }

    // चालु महिनाका दिनहरू
    for (let d = 1; d <= daysInMonth; d++) {
        const dayOfWeek = (startDayIndex + (d - 1)) % 7;
        const isSaturday = (dayOfWeek === 6);
        const isSunday = (dayOfWeek === 0);
        
        let isHoliday = isSaturday || isSunday;
        let parvaName = "";
        if (typeof getParvaForDate === "function") {
            let dayP = null;
            if (typeof calculateDailyPanchanga === "function") {
                try {
                    dayP = calculateDailyPanchanga(year, month, d, 27.7172, 85.3240, currentSiddhanta);
                } catch (e) {}
            }
            const parva = dayP
                ? getParvaForDate(year, month, d, dayP.tithiName, dayP.paksha, dayP.adDate, dayP.chandraMonthNum)
                : getParvaForDate(year, month, d, null, null, null);
            if (parva) {
                if (parva.isHoliday) isHoliday = true;
                parvaName = parva.name;
            }
        }

        const isActive = (d === day);
        let cellClasses = "cal-cell ";
        if (isActive) {
            cellClasses += "is-active ";
        } else if (isHoliday) {
            cellClasses += "is-holiday ";
        }

        const tooltipText = parvaName ? `${toNepaliDigits(d)} ${mName} - ${parvaName}` : `${toNepaliDigits(d)} ${mName}`;

        html += `
            <div class="${cellClasses}" onclick="selectCalendarDate(${d})" title="${tooltipText}">
                <span>${toNepaliDigits(d)}</span>
            </div>
        `;
    }

    // पछिल्लो महिनाका दिनहरू (सधैं ६ पङ्क्ति अर्थात् ४२ कोठा पूरा गर्न - साइज स्थिर राख्न)
    const totalCells = startDayIndex + daysInMonth;
    const remaining = 42 - totalCells;
    for (let nextD = 1; nextD <= remaining; nextD++) {
        html += `
            <div class="cal-cell is-empty">
                <span>${toNepaliDigits(nextD)}</span>
            </div>
        `;
    }

    gridEl.innerHTML = html;
}

function selectCalendarDate(day) {
    const pBsDay = document.getElementById("pBsDay");
    const calDaySelect = document.getElementById("calDaySelect");
    if (pBsDay) {
        pBsDay.value = day;
    }
    if (calDaySelect) {
        calDaySelect.value = day;
    }
    updatePanchangCard();
}
window.selectCalendarDate = selectCalendarDate;

/**
 * पञ्चाङ्ग शास्त्रीय सङ्कल्प शिरोभाग वाक्य निर्माण गर्छ
 * नमुना: श्रीशाके १९४८ वि.सं. २०८३ आश्विनशुक्ल (दुर्गा) पक्षः ने.सं. ११४६ (कौलाथ्व), ई.सं. 2026, दक्षिणायनं शरदृतुः, रौद्रनामसंवत्सरः ।
 */
function renderPanchangSankalpaHtml(panchang) {
    if (!panchang) return "";

    const shakaNp = panchang.shakaYearNp || toNepaliDigits(panchang.bsYear - 135);
    const bsYearNp = toNepaliDigits(panchang.bsYear);
    const mIdx = panchang.bsMonth;
    const paksha = panchang.paksha;
    const isShukla = (paksha === "शुक्ल");

    const VEDIC_MASAS = [
        "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन",
        "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"
    ];
    // शास्त्रीय चान्द्रमास (तिथिको वास्तविक महिना - चान्द्रमान)
    const chandraMasaName = panchang.chandraMasa || panchang.masa || VEDIC_MASAS[mIdx - 1] || "आश्विन";
    const cMonthIdx = panchang.chandraMonthNum || mIdx;

    const PAKSHA_SPECIAL_NAMES = {
        6: { shukla: "दुर्गा", krishna: "पितृ" },
        7: { shukla: "देवप्रबोधिनी", krishna: "कौमुदी" },
        8: { shukla: "मोक्षदा", krishna: "उत्पन्ना" },
        9: { shukla: "पुत्रदा", krishna: "सफला" },
        10: { shukla: "श्रीपञ्चमी", krishna: "षट्तिला" },
        11: { shukla: "आमलकी", krishna: "महाशिवरात्रि" },
        12: { shukla: "वासन्ती", krishna: "पापमोचिनी" },
        1: { shukla: "अक्षयतृतीया", krishna: "वरूथिनी" },
        2: { shukla: "गङ्गादशहरा", krishna: "अपरा" },
        3: { shukla: "हरिशयनी", krishna: "योगिनी" },
        4: { shukla: "पवित्रा", krishna: "कामिका" },
        5: { shukla: "हरितालिका", krishna: "श्रीकृष्णजन्माष्टमी" }
    };
    const specialObj = PAKSHA_SPECIAL_NAMES[cMonthIdx];
    const specialPaksha = specialObj ? (isShukla ? specialObj.shukla : specialObj.krishna) : "";
    const specialPart = specialPaksha ? ` <span class="sankalpa-subname">(${specialPaksha})</span>` : "";

    const nsMonthPaksha = panchang.nepalSambatPaksha || "कौलाथ्व";
    const nepalSambatNp = panchang.nepalSambatNp || toNepaliDigits(panchang.bsYear - 937);
    const adYear = panchang.adDateStr ? panchang.adDateStr.split(" ")[0] : "2026";

    const ayanaRaw = panchang.ayana || "दक्षिणायन";
    const ayanaSanskrit = ayanaRaw.includes("दक्षिण") ? "दक्षिणायनं" : "उत्तरायणं";

    const rituRaw = panchang.ritu || "शरद्";
    let rituSanskrit = "शरदृतुः";
    if (rituRaw.includes("शरद्")) rituSanskrit = "शरदृतुः";
    else if (rituRaw.includes("हेमन्त")) rituSanskrit = "हेमन्तर्तुः";
    else if (rituRaw.includes("शिशिर")) rituSanskrit = "शिशिरर्तुः";
    else if (rituRaw.includes("वसन्त")) rituSanskrit = "वसन्तर्तुः";
    else if (rituRaw.includes("ग्रीष्म")) rituSanskrit = "ग्रीष्मर्तुः";
    else if (rituRaw.includes("वर्षा")) rituSanskrit = "वर्षर्तुः";

    const samvatRaw = panchang.samvatsara || "रौद्र";
    const samvatSanskrit = `${samvatRaw}नामसंवत्सरः ।`;

    return `<span class="sankalpa-era-title">श्रीशाके</span> <span class="sankalpa-accent">${shakaNp}</span> <span class="sankalpa-sep">•</span> <span class="sankalpa-era-title">वि.सं.</span> <span class="sankalpa-accent">${bsYearNp}</span> <span class="sankalpa-highlight">${chandraMasaName}${paksha}${specialPart} पक्षः</span> <span class="sankalpa-era-title">ने.सं.</span> <span class="sankalpa-accent">${nepalSambatNp}</span> (<span class="sankalpa-accent">${nsMonthPaksha}</span>) <span class="sankalpa-sep">•</span> <span class="sankalpa-era-title">ई.सं.</span> <span class="sankalpa-accent">${adYear}</span>, <span class="sankalpa-tag">${ayanaSanskrit} ${rituSanskrit}</span>, <span class="sankalpa-samvat">${samvatSanskrit}</span>`;
}

/**
 * ====================================================
 * प्रत्यक्ष आकर्षक घडी नियन्त्रक (Live Analog & Digital Clock)
 * ====================================================
 */
function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const secondDeg = (second / 60) * 360;
    const minuteDeg = (minute / 60) * 360 + (second / 60) * 6;
    const hourDeg = (hour / 12) * 360 + (minute / 60) * 30;

    const secondEl = document.getElementById("second");
    const minuteEl = document.getElementById("minute");
    const hourEl = document.getElementById("hour");

    if (secondEl) secondEl.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    if (minuteEl) minuteEl.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    if (hourEl) hourEl.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

    // १. प्रत्यक्ष डिजिटल समय (देवनागरी)
    const digitalTimeEl = document.getElementById("clockDigitalTime");
    if (digitalTimeEl) {
        const h12 = hour % 12 || 12;
        const ampm = hour >= 12 ? "अपरान्ह (PM)" : "पूर्वाह्न (AM)";
        const hStr = toNepaliDigits(String(h12).padStart(2, "0"));
        const mStr = toNepaliDigits(String(minute).padStart(2, "0"));
        const sStr = toNepaliDigits(String(second).padStart(2, "0"));
        digitalTimeEl.innerHTML = `<span class="time-main">${hStr}:${mStr}:${sStr}</span> <span class="time-ampm">${ampm}</span>`;

        // क्यालेन्डर साइडबार प्रत्यक्ष समय
        const sidebarLiveTimeEl = document.getElementById("sidebarLiveTime");
        if (sidebarLiveTimeEl) {
            const shortAmpm = hour >= 12 ? "PM" : "AM";
            sidebarLiveTimeEl.textContent = `${hStr}:${mStr} ${shortAmpm}`;
        }
    }

    // २. प्रत्यक्ष नेपाली मिति तथा बार
    const digitalDateEl = document.getElementById("clockDigitalDate");
    if (digitalDateEl) {
        const adDays = ["आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
        const dayName = adDays[now.getDay()];
        if (typeof adToBs === "function") {
            const bs = adToBs(now.getFullYear(), now.getMonth() + 1, now.getDate());
            const mNames = ["बैशाख", "जेठ", "असार", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुन", "चैत्र"];
            const mName = mNames[bs.month - 1] || "";
            digitalDateEl.textContent = `वि.सं. ${toNepaliDigits(bs.year)} ${mName} ${toNepaliDigits(bs.day)} गते, ${dayName}`;
        } else {
            digitalDateEl.textContent = dayName;
        }
    }

    // ३. वैदिक इष्टकाल (सूर्योदय देखि बितेको घडी-पला-विपला)
    const ishtaEl = document.getElementById("clockIshtaKala");
    const sunriseValEl = document.getElementById("clockSunriseVal");
    if (currentPanchangData && currentPanchangData.sunriseNp) {
        if (sunriseValEl) sunriseValEl.textContent = currentPanchangData.sunriseNp;
        if (ishtaEl) {
            const nepToEng = (s) => s.replace(/[०-९]/g, d => "०१२३४५६७८९".indexOf(d));
            const srClean = nepToEng(currentPanchangData.sunriseNp);
            const parts = srClean.split(":").map(Number);
            const srH = isNaN(parts[0]) ? 6 : parts[0];
            const srM = isNaN(parts[1]) ? 4 : parts[1];
            const srTotalMins = srH * 60 + srM;
            const nowTotalMins = hour * 60 + minute + second / 60;
            let diffMins = nowTotalMins - srTotalMins;
            if (diffMins < 0) diffMins += 1440;
            const ghati = Math.floor(diffMins / 24);
            const remPala = (diffMins % 24) * 2.5;
            const pala = Math.floor(remPala);
            const vipala = Math.floor((remPala - pala) * 60);
            ishtaEl.textContent = `${toNepaliDigits(ghati)} घडी ${toNepaliDigits(pala)} पला ${toNepaliDigits(vipala)} विपला`;
        }
    }
}

/**
 * पञ्चाङ्ग फोटो कार्डलाई Canvas बाट HD तस्वीर (PNG) को रूपमा डाउनलोड गर्छ
 */
function downloadPanchangImage() {
    const p = currentPanchangData;
    if (!p) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");

    // 1. Background
    ctx.fillStyle = "#FFFDF9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Outer Red Border
    ctx.strokeStyle = "#9D1C1D";
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // 3. Inner Decorative Border
    ctx.lineWidth = 3;
    ctx.strokeRect(46, 46, canvas.width - 92, canvas.height - 92);

    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#B83232";
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);
    ctx.setLineDash([]);

    ctx.fillStyle = "#9D1C1D";
    ctx.textAlign = "center";

    // 4. Header Title: दैनिक पञ्चाङ्ग
    ctx.font = "bold 68px 'Mukta', 'Noto Sans Devanagari', sans-serif";
    ctx.fillText("दैनिक पञ्चाङ्ग", canvas.width / 2, 145);

    // Decorative side lines
    ctx.strokeStyle = "#9D1C1D";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 320, 126);
    ctx.lineTo(canvas.width / 2 - 190, 126);
    ctx.moveTo(canvas.width / 2 + 190, 126);
    ctx.lineTo(canvas.width / 2 + 320, 126);
    ctx.stroke();

    // 5. Date Banner: २०८३ आश्विन २९ गते 2026 OCT 15
    ctx.font = "bold 44px 'Mukta', 'Noto Sans Devanagari', sans-serif";
    ctx.fillText(`${p.bsDateStrNp}    ${p.adDateStr}`, canvas.width / 2, 225);

    // Helper to draw rounded pills
    function drawPill(text, x, y, w, h) {
        ctx.strokeStyle = "#9D1C1D";
        ctx.lineWidth = 3.5;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x - w / 2, y - h / 2, w, h, 25);
        } else {
            ctx.rect(x - w / 2, y - h / 2, w, h);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#9D1C1D";
        ctx.font = "bold 33px 'Mukta', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text, x, y + 10);
    }

    // Era Pills
    drawPill(`शालिवाहन शाके ${p.shakaYearNp}`, canvas.width / 2 - 200, 305, 360, 56);
    drawPill(`नेपाल संवत् ${p.nepalSambatNp}`, canvas.width / 2 + 200, 305, 320, 56);

    // 6. Left Column Items
    ctx.textAlign = "left";
    const leftX = 110;
    let curY = 430;

    const leftItems = [
        { label: "संवत्सर", val: p.samvatsara, bold: true },
        { label: "अयन", val: p.ayana },
        { label: "ऋतु", val: p.ritu },
        { label: "मास", val: p.masa },
        { label: "पक्ष", val: p.paksha }
    ];

    leftItems.forEach(item => {
        ctx.font = "bold 40px 'Mukta', sans-serif";
        ctx.fillText("* " + item.label, leftX, curY);
        ctx.fillText("|", leftX + 175, curY);
        if (item.bold) ctx.font = "800 42px 'Mukta', sans-serif";
        else ctx.font = "700 40px 'Mukta', sans-serif";
        ctx.fillText(item.val, leftX + 210, curY);
        curY += 70;
    });

    // Divider line
    ctx.strokeStyle = "#9D1C1D";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(leftX, curY - 15);
    ctx.lineTo(leftX + 380, curY - 15);
    ctx.stroke();
    curY += 35;

    const sunItems = [
        { label: "सूर्योदय", val: p.sunriseNp },
        { label: "सूर्यास्त", val: p.sunsetNp }
    ];
    sunItems.forEach(item => {
        ctx.font = "bold 40px 'Mukta', sans-serif";
        ctx.fillText("* " + item.label, leftX, curY);
        ctx.fillText("|", leftX + 175, curY);
        ctx.font = "800 40px 'Mukta', sans-serif";
        ctx.fillText(item.val, leftX + 210, curY);
        curY += 70;
    });

    // 7. Right Column: Table with 卐
    const tableX = 530;
    const tableY = 380;
    const tableW = 460;
    const tableH = 490;
    const rowH = tableH / 5;

    ctx.strokeStyle = "#9D1C1D";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(tableX, tableY, tableW, tableH, 18);
    } else {
        ctx.rect(tableX, tableY, tableW, tableH);
    }
    ctx.fill();
    ctx.stroke();

    // Table rows horizontal borders
    for (let r = 1; r < 5; r++) {
        ctx.beginPath();
        ctx.moveTo(tableX, tableY + r * rowH);
        ctx.lineTo(tableX + tableW, tableY + r * rowH);
        ctx.stroke();
    }
    // Column dividers
    const col1 = tableX + 62;
    const col2 = tableX + 175;
    const col3 = tableX + 335;
    [col1, col2, col3].forEach(cx => {
        ctx.beginPath();
        ctx.moveTo(cx, tableY);
        ctx.lineTo(cx, tableY + tableH);
        ctx.stroke();
    });

    const tableRows = [
        { field: "तिथि", name: p.tithiName, time: p.tithiGhatiPalaNp },
        { field: "बार", name: p.vaarName, time: "......" },
        { field: "नक्षत्र", name: p.nakshatraName, time: p.nakshatraGhatiPalaNp },
        { field: "योग", name: p.yogaName, time: p.yogaGhatiPalaNp },
        { field: "करण", name: p.karanaName, time: p.karanaGhatiPalaNp }
    ];

    ctx.fillStyle = "#9D1C1D";
    tableRows.forEach((r, idx) => {
        const ry = tableY + idx * rowH + rowH * 0.68;
        // 卐
        ctx.textAlign = "center";
        ctx.font = "38px 'Mukta', sans-serif";
        ctx.fillText("卐", tableX + 31, ry);

        // Field
        ctx.font = "bold 34px 'Mukta', sans-serif";
        ctx.fillText(r.field, col1 + 56, ry);

        // Name
        ctx.font = "800 37px 'Mukta', sans-serif";
        ctx.fillText(r.name, col2 + 80, ry);

        // Time
        ctx.font = "bold 34px 'Mukta', sans-serif";
        ctx.fillText(r.time, col3 + 62, ry);
    });

    // 8. Bottom Pills
    const pillY = 970;
    drawPill(`चन्द्र राशि ${p.chandraRashi}`, 240, pillY, 280, 62);
    drawPill(`सूर्य राशि ${p.suryaRashi}`, 540, pillY, 260, 62);
    drawPill(`गुरु राशि ${p.guruRashi}`, 840, pillY, 260, 62);

    // Trigger download
    const link = document.createElement("a");
    link.download = `दैनिक_पञ्चाङ्ग_${p.bsDateStrNp.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// ====================================================
// सुरक्षित कुण्डली व्यवस्थापन (Saved Kundali Storage & Management)
// ====================================================

function getSavedKundalis() {
    try {
        const data = localStorage.getItem(SAVED_KUNDALIS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to load saved kundalis from localStorage:", e);
        return [];
    }
}

function saveCurrentKundali() {
    if (!currentKundaliData) {
        generateKundali(true);
    }
    if (!currentKundaliData) {
        showSiddhantaNotice("कृपया पहिले जन्म विवरण प्रविष्ट गर्नुहोस्।", "warning");
        return;
    }

    const savedList = getSavedKundalis();
    const bsYear = parseInt(document.getElementById("bsYear")?.value, 10) || currentKundaliData.bsYear;
    const bsMonth = parseInt(document.getElementById("bsMonth")?.value, 10) || currentKundaliData.bsMonth;
    const bsDay = parseInt(document.getElementById("bsDay")?.value, 10) || currentKundaliData.bsDay;
    const birthCountry = document.getElementById("birthCountry")?.value || currentKundaliData.countryCode || "NP";
    const birthPlace = document.getElementById("birthPlace");
    const birthPlaceIdx = birthPlace ? parseInt(birthPlace.value, 10) : 0;
    const tzOffset = parseFloat(document.getElementById("birthTzOffset")?.value) || currentKundaliData.tzOffset || 5.75;

    const personName = document.getElementById("personName")?.value.trim() || currentKundaliData.name || "श्री जातक";
    const fatherName = document.getElementById("fatherName")?.value.trim() || currentKundaliData.fatherName || "-";
    const motherName = document.getElementById("motherName")?.value.trim() || currentKundaliData.motherName || "-";
    const gotra = document.getElementById("gotra")?.value.trim() || currentKundaliData.gotra || "काश्यप";
    const gender = document.getElementById("gender")?.value || currentKundaliData.gender || "पुरुष";

    // Format current saved date in BS/Nepali
    const now = new Date();
    const savedBs = (typeof adToBs === "function") ? adToBs(now.getFullYear(), now.getMonth() + 1, now.getDate()) : null;
    const savedAtStr = savedBs ? `${savedBs.year}-${savedBs.month.toString().padStart(2, '0')}-${savedBs.day.toString().padStart(2, '0')}` : now.toISOString().slice(0, 10);

    const record = {
        id: "knd_" + Date.now(),
        name: personName,
        gender: gender,
        fatherName: fatherName,
        motherName: motherName,
        gotra: gotra,
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDay: bsDay,
        bsDateStr: currentKundaliData.bsDateStr,
        adDateStr: currentKundaliData.adDateStr,
        birthTimeStr: currentKundaliData.birthTimeStr,
        countryCode: birthCountry,
        countryName: currentKundaliData.countryName || "",
        birthPlaceIdx: isNaN(birthPlaceIdx) ? 0 : birthPlaceIdx,
        placeName: currentKundaliData.placeName,
        lat: currentKundaliData.lat,
        lon: currentKundaliData.lon,
        tzOffset: tzOffset,
        siddhanta: currentSiddhanta || "surya",
        rashi: currentKundaliData.moonRashi?.rashiNameNp || "",
        nakshatra: currentKundaliData.moonNak?.nakshatraNameNp || "",
        savedAt: savedAtStr
    };

    // Update if same person & birth date/time already exists
    const existingIndex = savedList.findIndex(item => 
        item.name === record.name && 
        item.bsYear === record.bsYear && 
        item.bsMonth === record.bsMonth && 
        item.bsDay === record.bsDay &&
        item.birthTimeStr === record.birthTimeStr
    );
    if (existingIndex >= 0) {
        record.id = savedList[existingIndex].id;
        savedList[existingIndex] = record;
    } else {
        savedList.unshift(record);
    }

    try {
        localStorage.setItem(SAVED_KUNDALIS_KEY, JSON.stringify(savedList));
        isCurrentKundaliSaved = true;
        updateSavedCountBadge();
        if (typeof renderPersonalAndPanchangUI === "function") {
            renderPersonalAndPanchangUI(currentKundaliData);
        }

        // Button feedback animation
        const btn = document.getElementById("saveCurrentKundaliFormBtn");
        if (btn) {
            const origHtml = btn.innerHTML;
            btn.innerHTML = `<span>✅</span><span>कुण्डली सुरक्षित गरियो!</span>`;
            btn.style.background = "linear-gradient(135deg, #16a34a 0%, #15803d 100%)";
            setTimeout(() => {
                btn.innerHTML = origHtml;
                btn.style.background = "linear-gradient(135deg, #15803d 0%, #166534 100%)";
            }, 2200);
        }

        showSiddhantaNotice(`जातक "${record.name}" को कुण्डली सफलतापूर्वक सुरक्षित (Saved) गरियो।`, "success");
    } catch (e) {
        alert("कुण्डली सेभ गर्न सकिएन: " + e.message);
    }
}

function updateSavedCountBadge() {
    const badge = document.getElementById("savedCountBadge");
    if (badge) {
        const count = getSavedKundalis().length;
        badge.textContent = toNepaliDigits(count);
    }
}

function openSavedModal() {
    const modal = document.getElementById("savedKundaliModal");
    if (modal) {
        renderSavedKundaliList();
        modal.style.display = "flex";
    }
}

function closeSavedModal() {
    const modal = document.getElementById("savedKundaliModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function renderSavedKundaliList() {
    const container = document.getElementById("savedKundaliListContainer");
    if (!container) return;
    const list = getSavedKundalis();
    if (list.length === 0) {
        container.innerHTML = `
            <div class="no-saved-msg" style="text-align: center; padding: 30px 15px;">
                <p style="font-size: 1.25rem; margin-bottom: 8px; color: #881337;">📂 कुनै पनि कुण्डली सुरक्षित गरिएको छैन।</p>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
                    जन्म विवरण भरेपछि <strong>"💾 कुण्डली सुरक्षित गर्नुहोस्"</strong> बटन थिचेर सुरक्षित गर्न सक्नुहुन्छ।
                </p>
            </div>
        `;
        return;
    }
    let html = `<div style="margin-bottom: 15px; color: #78350f; font-weight: 700; font-size: 0.95rem;">
        कुल सुरक्षित कुण्डलीहरू: <strong>${toNepaliDigits(list.length)}</strong> वटा
    </div>`;
    list.forEach(k => {
        const sidLabel = k.siddhanta === "surya" ? "सूर्य सिद्धान्त" : "दृक् सिद्धान्त";
        const savedDateStr = k.savedAt ? toNepaliDigits(k.savedAt) : "";
        html += `
            <div class="saved-item-card">
                <div class="saved-item-info">
                    <h4>${k.name} <small style="font-size: 0.85rem; color: #64748b;">(${k.gender || 'पुरुष'})</small></h4>
                    <p>📅 <strong>${k.bsDateStr || ''}</strong> (${toNepaliDigits(k.birthTimeStr || '')})</p>
                    <p>📍 ${k.placeName || ''}${k.countryName ? ', ' + k.countryName : ''} | राशि: <strong>${k.rashi || '-'}</strong>, नक्षत्र: <strong>${k.nakshatra || '-'}</strong></p>
                    <div style="font-size: 0.78rem; color: #9a3412; margin-top: 3px; font-weight: 600;">
                        [पद्धति: ${sidLabel}${savedDateStr ? ' | मिति: ' + savedDateStr : ''}]
                    </div>
                </div>
                <div class="saved-item-actions">
                    <button class="btn-open" onclick="loadSavedKundali('${k.id}')" title="यो कुण्डली खोल्नुहोस्">
                        👁️ खोल्नुहोस्
                    </button>
                    <button class="btn-delete" onclick="deleteSavedKundali('${k.id}')" title="हटाउनुहोस्">
                        🗑️ मेटाउनुहोस्
                    </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadSavedKundali(id) {
    const list = getSavedKundalis();
    const k = list.find(item => item.id === id);
    if (!k) return;

    const nameEl = document.getElementById("personName");
    const genderEl = document.getElementById("gender");
    const fatherEl = document.getElementById("fatherName");
    const motherEl = document.getElementById("motherName");
    const gotraEl = document.getElementById("gotra");
    if (nameEl) nameEl.value = k.name || "";
    if (genderEl) genderEl.value = k.gender || "पुरुष";
    if (fatherEl) fatherEl.value = k.fatherName && k.fatherName !== "-" ? k.fatherName : "";
    if (motherEl) motherEl.value = k.motherName && k.motherName !== "-" ? k.motherName : "";
    if (gotraEl) gotraEl.value = k.gotra || "काश्यप";

    const bsYear = document.getElementById("bsYear");
    const bsMonth = document.getElementById("bsMonth");
    const bsDay = document.getElementById("bsDay");
    if (bsYear && bsMonth && bsDay && k.bsYear) {
        bsYear.value = k.bsYear;
        bsMonth.value = k.bsMonth;
        updateBsDays();
        bsDay.value = k.bsDay;
        syncBsToAd();
    }

    const birthTime = document.getElementById("birthTime");
    if (birthTime && k.birthTimeStr) {
        birthTime.value = k.birthTimeStr;
    }

    // Restore country and city
    const birthCountry = document.getElementById("birthCountry");
    const countryCode = k.countryCode || "NP";
    if (birthCountry) {
        birthCountry.value = countryCode;
    }
    let cityIdx = k.birthPlaceIdx;
    if (typeof WORLD_COUNTRIES !== "undefined") {
        const cObj = WORLD_COUNTRIES.find(c => c.code === countryCode);
        if (cObj && cObj.cities) {
            if (cityIdx === undefined || cityIdx < 0 || cityIdx >= cObj.cities.length) {
                const found = cObj.cities.findIndex(ct => ct.nameNp === k.placeName || ct.nameEn === k.placeName);
                cityIdx = found >= 0 ? found : 0;
            }
        }
    }
    populateCitiesForCountry(countryCode, cityIdx !== undefined ? cityIdx : 0);

    const customLat = document.getElementById("customLat");
    const customLon = document.getElementById("customLon");
    const tzOffsetEl = document.getElementById("birthTzOffset");
    if (customLat && k.lat !== undefined) customLat.value = k.lat;
    if (customLon && k.lon !== undefined) customLon.value = k.lon;
    if (tzOffsetEl && k.tzOffset !== undefined) tzOffsetEl.value = k.tzOffset;

    // Restore Siddhanta if recorded
    if (k.siddhanta && typeof setSiddhanta === "function") {
        setSiddhanta(k.siddhanta, false);
    }

    isCurrentKundaliSaved = true;

    // Unhide output section
    const outputSec = document.getElementById("kundaliOutputSection");
    if (outputSec) outputSec.style.display = "block";

    generateKundali(true);
    closeSavedModal();
    showSiddhantaNotice(`सुरक्षित कुण्डली "${k.name}" सफलतापूर्वक लोड गरियो।`, "success");

    // Switch to kundali tab if on another tab
    const kundaliTabBtn = document.querySelector('[data-tab="tab-kundali"]');
    if (kundaliTabBtn) {
        kundaliTabBtn.click();
    }
}

function deleteSavedKundali(id) {
    if (!confirm("के तपाईं यो सुरक्षित गरिएको कुण्डली हटाउन चाहनुहुन्छ?")) {
        return;
    }
    let list = getSavedKundalis();
    list = list.filter(k => k.id !== id);
    localStorage.setItem(SAVED_KUNDALIS_KEY, JSON.stringify(list));
    updateSavedCountBadge();
    renderSavedKundaliList();
}

// Global exposure for inline onclick handlers
window.loadSavedKundali = loadSavedKundali;
window.deleteSavedKundali = deleteSavedKundali;
window.openSavedModal = openSavedModal;
window.closeSavedModal = closeSavedModal;
window.saveCurrentKundali = saveCurrentKundali;

// ====================================================
// वार्षिक चाडपर्व, राष्ट्रिय सार्वजनिक विदा तथा दिवसहरू (Parva Tab Controller)
// ====================================================

let parvaTabInitialized = false;
let currentParvaMonth = 0; // 0 = All months, 1..12
let currentParvaCategory = "all"; // "all", "holiday", "festival", "diwas", "jayanti"
let currentParvaSearch = "";

function renderParvaTabUI() {
    if (!parvaTabInitialized) {
        initParvaControls();
        parvaTabInitialized = true;
    }
    updateParvaStats();
    filterAndRenderParvaList();
}

function initParvaControls() {
    // Search input
    const searchInput = document.getElementById("parvaSearchInput");
    const clearBtn = document.getElementById("parvaSearchClearBtn");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentParvaSearch = (e.target.value || "").trim().toLowerCase();
            if (clearBtn) {
                clearBtn.style.display = currentParvaSearch.length > 0 ? "block" : "none";
            }
            filterAndRenderParvaList();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            currentParvaSearch = "";
            clearBtn.style.display = "none";
            filterAndRenderParvaList();
        });
    }

    // Category filter buttons
    const catBtns = document.querySelectorAll(".parva-cat-btn");
    catBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            catBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentParvaCategory = btn.getAttribute("data-cat") || "all";
            filterAndRenderParvaList();
        });
    });

    // Month filter buttons
    const monthBtns = document.querySelectorAll(".parva-month-btn");
    monthBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            monthBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentParvaMonth = parseInt(btn.getAttribute("data-month"), 10) || 0;
            filterAndRenderParvaList();
        });
    });
}

function updateParvaStats() {
    if (typeof NEPAL_ANNUAL_PARVAS === "undefined" || !Array.isArray(NEPAL_ANNUAL_PARVAS)) return;

    const totalEl = document.getElementById("statTotalParvas");
    const holidayEl = document.getElementById("statTotalHolidays");
    const festivalEl = document.getElementById("statTotalFestivals");

    const totalCount = NEPAL_ANNUAL_PARVAS.length;
    const holidayCount = NEPAL_ANNUAL_PARVAS.filter(p => p.isHoliday).length;
    const festivalCount = NEPAL_ANNUAL_PARVAS.filter(p => p.category === "festival").length;

    if (totalEl) totalEl.textContent = toNepaliDigits(totalCount);
    if (holidayEl) holidayEl.textContent = toNepaliDigits(holidayCount);
    if (festivalEl) festivalEl.textContent = toNepaliDigits(festivalCount);
}

function filterAndRenderParvaList() {
    const container = document.getElementById("parvaListContainer");
    if (!container) return;

    if (typeof NEPAL_ANNUAL_PARVAS === "undefined" || !Array.isArray(NEPAL_ANNUAL_PARVAS)) {
        container.innerHTML = `<div class="parva-empty-state"><p>चाडपर्व सम्बन्धी डाटा लोड हुन सकेन।</p></div>`;
        return;
    }

    // Filter by category
    let filtered = NEPAL_ANNUAL_PARVAS;
    if (currentParvaCategory === "holiday") {
        filtered = filtered.filter(p => p.isHoliday);
    } else if (currentParvaCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentParvaCategory);
    }

    // Filter by month
    if (currentParvaMonth > 0) {
        filtered = filtered.filter(p => p.month === currentParvaMonth);
    }

    // Filter by search keyword
    if (currentParvaSearch) {
        const kw = currentParvaSearch;
        filtered = filtered.filter(p => {
            return (p.name && p.name.toLowerCase().includes(kw)) ||
                   (p.description && p.description.toLowerCase().includes(kw)) ||
                   (p.dateDisplay && p.dateDisplay.toLowerCase().includes(kw)) ||
                   (p.monthName && p.monthName.toLowerCase().includes(kw)) ||
                   (p.holidayType && p.holidayType.toLowerCase().includes(kw));
        });
    }

    // Empty state
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="parva-empty-state">
                <span class="empty-icon">🔍</span>
                <h3>कुनै पर्व वा विदा फेला परेन</h3>
                <p>कृपया खोजी शब्द वा फिल्टर परिवर्तन गर्नुहोस्।</p>
            </div>
        `;
        return;
    }

    // Grouping: If "all months" selected (currentParvaMonth === 0) AND no search keyword is present
    if (currentParvaMonth === 0 && !currentParvaSearch) {
        const monthNames = [
            "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
            "कात्तिक", "मंसीर", "पुस", "माघ", "फागुन", "चैत्र"
        ];
        const monthIcons = ["🌸", "☀️", "🌧️", "🌿", "🌾", "🪔", "✨", "🌾", "❄️", "🪁", "💐", "🌺"];

        let html = "";
        for (let m = 1; m <= 12; m++) {
            const mParvas = filtered.filter(p => p.month === m);
            if (mParvas.length === 0) continue;

            const icon = monthIcons[m - 1] || "🚩";
            const mName = monthNames[m - 1];

            html += `
                <div class="parva-month-section" id="parvaSecMonth${m}">
                    <div class="parva-month-header">
                        <h3 class="parva-month-title">
                            <span class="month-icon">${icon}</span>
                            <span>${mName} महिनाका पर्व तथा विदाहरू</span>
                        </h3>
                        <span class="parva-count-badge">${toNepaliDigits(mParvas.length)} वटा</span>
                    </div>
                    <div class="parva-grid">
                        ${mParvas.map(p => renderParvaCardHtml(p)).join("")}
                    </div>
                </div>
            `;
        }
        container.innerHTML = html;
    } else {
        // Flat grid for specific month or search result
        const countTxt = `${toNepaliDigits(filtered.length)} वटा पर्व/विदा फेला पर्यो`;
        const sectionTitle = currentParvaSearch 
            ? `खोजी परिणाम: "${currentParvaSearch}"` 
            : `${BS_MONTH_NAMES_NP[currentParvaMonth - 1] || ""} महिनाका पर्व तथा विदाहरू`;

        container.innerHTML = `
            <div class="parva-month-section">
                <div class="parva-month-header">
                    <h3 class="parva-month-title">
                        <span class="month-icon">📋</span>
                        <span>${sectionTitle}</span>
                    </h3>
                    <span class="parva-count-badge">${countTxt}</span>
                </div>
                <div class="parva-grid">
                    ${filtered.map(p => renderParvaCardHtml(p)).join("")}
                </div>
            </div>
        `;
    }
}

function renderParvaCardHtml(p) {
    const holidayBadge = p.isHoliday 
        ? `<span class="parva-holiday-badge">🔴 ${p.holidayType || 'सार्वजनिक विदा'}</span>` 
        : "";

    let catClass = "cat-festival";
    let catLabel = "🪔 चाडपर्व";
    if (p.category === "diwas") {
        catClass = "cat-diwas";
        catLabel = "🇳🇵 राष्ट्रिय दिवस";
    } else if (p.category === "jayanti") {
        catClass = "cat-jayanti";
        catLabel = "🙏 जयन्ती / उत्सव";
    }

    const isHolidayClass = p.isHoliday ? "is-holiday" : "";

    return `
        <div class="parva-card ${isHolidayClass}" id="parva-${p.id}">
            <div class="parva-card-top">
                <span class="parva-date-badge">📅 ${p.dateDisplay}</span>
                ${holidayBadge}
            </div>
            <h4 class="parva-card-name">${p.name}</h4>
            <span class="parva-card-cat-tag ${catClass}">${catLabel}</span>
            <p class="parva-card-desc">${p.description}</p>
        </div>
    `;
}

// Global exposure
window.renderParvaTabUI = renderParvaTabUI;


