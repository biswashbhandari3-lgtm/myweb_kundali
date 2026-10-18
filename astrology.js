/**
 * astrology.js - वैदिक ज्योतिष सिद्धान्त, पञ्चाङ्ग, दशा र गुण मिलान
 * Kundali Darsan Web
 */

// १२ राशिहरू
const RASHIS = [
    { id: 1, nameNp: "मेष", nameEn: "Aries", lord: "मङ्गल", element: "अग्नि" },
    { id: 2, nameNp: "वृष", nameEn: "Taurus", lord: "शुक्र", element: "पृथ्वी" },
    { id: 3, nameNp: "मिथुन", nameEn: "Gemini", lord: "बुध", element: "वायु" },
    { id: 4, nameNp: "कर्कट", nameEn: "Cancer", lord: "चन्द्र", element: "जल" },
    { id: 5, nameNp: "सिंह", nameEn: "Leo", lord: "सूर्य", element: "अग्नि" },
    { id: 6, nameNp: "कन्या", nameEn: "Virgo", lord: "बुध", element: "पृथ्वी" },
    { id: 7, nameNp: "तुला", nameEn: "Libra", lord: "शुक्र", element: "वायु" },
    { id: 8, nameNp: "वृश्चिक", nameEn: "Scorpio", lord: "मङ्गल", element: "जल" },
    { id: 9, nameNp: "धनु", nameEn: "Sagittarius", lord: "गुरु", element: "अग्नि" },
    { id: 10, nameNp: "मकर", nameEn: "Capricorn", lord: "शनि", element: "पृथ्वी" },
    { id: 11, nameNp: "कुम्भ", nameEn: "Aquarius", lord: "शनि", element: "वायु" },
    { id: 12, nameNp: "मीन", nameEn: "Pisces", lord: "गुरु", element: "जल" }
];

// २७ नक्षत्रहरू र १०८ नामाक्षरहरू
const NAKSHATRAS = [
    { id: 1, nameNp: "अश्विनी", nameEn: "Ashwini", lord: "केतु", padas: ["चू", "चे", "चो", "ला"], yoni: "अश्व", gana: "देव", nadi: "आद्य" },
    { id: 2, nameNp: "भरणी", nameEn: "Bharani", lord: "शुक्र", padas: ["ली", "लू", "ले", "लो"], yoni: "गज", gana: "मनुष्य", nadi: "मध्य" },
    { id: 3, nameNp: "कृत्तिका", nameEn: "Krittika", lord: "सूर्य", padas: ["अ", "ई", "उ", "ए"], yoni: "मेष", gana: "राक्षस", nadi: "अन्त्य" },
    { id: 4, nameNp: "रोहिणी", nameEn: "Rohini", lord: "चन्द्र", padas: ["ओ", "वा", "वी", "वू"], yoni: "सर्प", gana: "मनुष्य", nadi: "अन्त्य" },
    { id: 5, nameNp: "मृगशिरा", nameEn: "Mrigashira", lord: "मङ्गल", padas: ["वे", "वो", "का", "की"], yoni: "सर्प", gana: "देव", nadi: "मध्य" },
    { id: 6, nameNp: "आर्द्रा", nameEn: "Ardra", lord: "राहु", padas: ["कु", "घ", "ङ", "छ"], yoni: "श्वान", gana: "मनुष्य", nadi: "आद्य" },
    { id: 7, nameNp: "पुनर्वसु", nameEn: "Punarvasu", lord: "गुरु", padas: ["के", "को", "हा", "ही"], yoni: "मार्जार", gana: "देव", nadi: "आद्य" },
    { id: 8, nameNp: "पुष्य", nameEn: "Pushya", lord: "शनि", padas: ["हू", "हे", "हो", "डा"], yoni: "मेष", gana: "देव", nadi: "मध्य" },
    { id: 9, nameNp: "अश्लेषा", nameEn: "Ashlesha", lord: "बुध", padas: ["डी", "डू", "डे", "डो"], yoni: "मार्जार", gana: "राक्षस", nadi: "अन्त्य" },
    { id: 10, nameNp: "मघा", nameEn: "Magha", lord: "केतु", padas: ["मा", "मी", "मू", "मे"], yoni: "मूषक", gana: "राक्षस", nadi: "अन्त्य" },
    { id: 11, nameNp: "पूर्व फाल्गुनी", nameEn: "Purva Phalguni", lord: "शुक्र", padas: ["मो", "टा", "टी", "टू"], yoni: "मूषक", gana: "मनुष्य", nadi: "मध्य" },
    { id: 12, nameNp: "उत्तर फाल्गुनी", nameEn: "Uttara Phalguni", lord: "सूर्य", padas: ["टे", "टो", "पा", "पी"], yoni: "गौ", gana: "मनुष्य", nadi: "आद्य" },
    { id: 13, nameNp: "हस्त", nameEn: "Hasta", lord: "चन्द्र", padas: ["पू", "ष", "ण", "ठ"], yoni: "महिष", gana: "देव", nadi: "आद्य" },
    { id: 14, nameNp: "चित्रा", nameEn: "Chitra", lord: "मङ्गल", padas: ["पे", "पो", "रा", "री"], yoni: "व्याघ्र", gana: "राक्षस", nadi: "मध्य" },
    { id: 15, nameNp: "स्वाती", nameEn: "Swati", lord: "राहु", padas: ["रू", "रे", "रो", "ता"], yoni: "महिष", gana: "देव", nadi: "अन्त्य" },
    { id: 16, nameNp: "विशाखा", nameEn: "Vishakha", lord: "गुरु", padas: ["ती", "तू", "ते", "तो"], yoni: "व्याघ्र", gana: "राक्षस", nadi: "अन्त्य" },
    { id: 17, nameNp: "अनुराधा", nameEn: "Anuradha", lord: "शनि", padas: ["ना", "नी", "नू", "ने"], yoni: "मृग", gana: "देव", nadi: "मध्य" },
    { id: 18, nameNp: "ज्येष्ठा", nameEn: "Jyeshtha", lord: "बुध", padas: ["नो", "या", "यी", "यू"], yoni: "मृग", gana: "राक्षस", nadi: "आद्य" },
    { id: 19, nameNp: "मूल", nameEn: "Mula", lord: "केतु", padas: ["ये", "यो", "भा", "भी"], yoni: "श्वान", gana: "राक्षस", nadi: "आद्य" },
    { id: 20, nameNp: "पूर्वाषाढा", nameEn: "Purva Ashadha", lord: "शुक्र", padas: ["भू", "धा", "फा", "ढा"], yoni: "वानर", gana: "मनुष्य", nadi: "मध्य" },
    { id: 21, nameNp: "उत्तराषाढा", nameEn: "Uttara Ashadha", lord: "सूर्य", padas: ["भे", "भो", "जा", "जी"], yoni: "नकुल", gana: "मनुष्य", nadi: "अन्त्य" },
    { id: 22, nameNp: "श्रवण", nameEn: "Shravana", lord: "चन्द्र", padas: ["खी", "खू", "खे", "खो"], yoni: "वानर", gana: "देव", nadi: "अन्त्य" },
    { id: 23, nameNp: "धनिष्ठा", nameEn: "Dhanishta", lord: "मङ्गल", padas: ["गा", "गी", "गू", "गे"], yoni: "सिंह", gana: "राक्षस", nadi: "मध्य" },
    { id: 24, nameNp: "शतभिषा", nameEn: "Shatabhisha", lord: "राहु", padas: ["गो", "सा", "सी", "सू"], yoni: "अश्व", gana: "राक्षस", nadi: "आद्य" },
    { id: 25, nameNp: "पूर्वाभाद्रपदा", nameEn: "Purva Bhadrapada", lord: "गुरु", padas: ["से", "सो", "दा", "दी"], yoni: "सिंह", gana: "मनुष्य", nadi: "आद्य" },
    { id: 26, nameNp: "उत्तराभाद्रपदा", nameEn: "Uttara Bhadrapada", lord: "शनि", padas: ["दू", "थ", "झ", "ञ"], yoni: "गौ", gana: "मनुष्य", nadi: "मध्य" },
    { id: 27, nameNp: "रेवती", nameEn: "Revati", lord: "बुध", padas: ["दे", "दो", "चा", "ची"], yoni: "गज", gana: "देव", nadi: "अन्त्य" }
];

// २७ योगहरू
const YOGAS = [
    "विष्कुम्भ", "प्रीति", "आयुष्मान्", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्मा", "धृति",
    "शूल", "गण्ड", "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि",
    "व्यतीपात", "वरीयान्", "परिघ", "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल",
    "ब्रह्म", "ऐन्द्र", "वैधृति"
];

// ११ करणहरू
const KARANAS = [
    "बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि (भद्रा)",
    "शकुनि", "चतुष्पद", "नाग", "किंस्तुघ्न"
];

// विंशोत्तरी महादशा ग्रह चक्र (१२० वर्ष)
const VIMSHOTTARI_LORDS = [
    { lord: "केतु", years: 7 },
    { lord: "शुक्र", years: 20 },
    { lord: "सूर्य", years: 6 },
    { lord: "चन्द्र", years: 10 },
    { lord: "मङ्गल", years: 7 },
    { lord: "राहु", years: 18 },
    { lord: "गुरु", years: 16 },
    { lord: "शनि", years: 19 },
    { lord: "बुध", years: 17 }
];

// ग्रह मैत्री तालिका (नैसर्गिक मैत्री: 1 = मित्र, 0 = सम, -1 = शत्रु - बृहत्पाराशर होराशास्त्र अनुसार)
const GRAHA_FRIENDSHIP = {
    "सूर्य": { "सूर्य": 0, "चन्द्र": 1, "मङ्गल": 1, "बुध": 0, "गुरु": 1, "शुक्र": -1, "शनि": -1, "राहु": -1, "केतु": -1 },
    "चन्द्र": { "सूर्य": 1, "चन्द्र": 0, "मङ्गल": 0, "बुध": 1, "गुरु": 0, "शुक्र": 0, "शनि": 0, "राहु": -1, "केतु": -1 },
    "मङ्गल": { "सूर्य": 1, "चन्द्र": 1, "मङ्गल": 0, "बुध": -1, "गुरु": 1, "शुक्र": 0, "शनि": 0, "राहु": -1, "केतु": 1 },
    "बुध": { "सूर्य": 1, "चन्द्र": -1, "मङ्गल": 0, "बुध": 0, "गुरु": 0, "शुक्र": 1, "शनि": 0, "राहु": 1, "केतु": 0 },
    "गुरु": { "सूर्य": 1, "चन्द्र": 1, "मङ्गल": 1, "बुध": -1, "गुरु": 0, "शुक्र": -1, "शनि": 0, "राहु": 1, "केतु": 0 },
    "शुक्र": { "सूर्य": -1, "चन्द्र": -1, "मङ्गल": 0, "बुध": 1, "गुरु": 0, "शुक्र": 0, "शनि": 1, "राहु": 1, "केतु": 1 },
    "शनि": { "सूर्य": -1, "चन्द्र": -1, "मङ्गल": -1, "बुध": 1, "गुरु": 0, "शुक्र": 1, "शनि": 0, "राहु": 1, "केतु": 0 },
    "राहु": { "सूर्य": -1, "चन्द्र": -1, "मङ्गल": -1, "बुध": 0, "गुरु": 1, "शुक्र": 1, "शनि": 1, "राहु": 0, "केतु": -1 },
    "केतु": { "सूर्य": -1, "चन्द्र": -1, "मङ्गल": 1, "बुध": 0, "गुरु": 0, "शुक्र": 1, "शनि": 0, "राहु": -1, "केतु": 0 }
};

const PANCHADHA_PLANET_NAMES = ["सूर्य", "चन्द्र", "मङ्गल", "बुध", "गुरु", "शुक्र", "शनि", "राहु", "केतु"];
const PANCHADHA_KEY_MAP = {
    "सूर्य": "Surya",
    "चन्द्र": "Chandra",
    "मङ्गल": "Mangal",
    "बुध": "Budha",
    "गुरु": "Guru",
    "शुक्र": "Shukra",
    "शनि": "Shani",
    "राहु": "Rahu",
    "केतु": "Ketu"
};

/**
 * पञ्चधा ग्रहमैत्री चक्र गणना गर्छ (Brihat Parashara Hora Shastra)
 * नैसर्गिक मैत्री + तात्कालिक मैत्री = पञ्चधा मैत्री
 * +2: अतिमित्र (Great Friend)
 * +1: मित्र (Friend)
 *  0: सम (Neutral)
 * -1: शत्रु (Enemy)
 * -2: अतिशत्रु (Great Enemy)
 */
function calculatePanchadhaMaitri(planets) {
    const matrix = {};
    const summary = {};
    const planetRashis = {};

    PANCHADHA_PLANET_NAMES.forEach(pName => {
        const key = PANCHADHA_KEY_MAP[pName];
        if (planets && planets[key] && typeof planets[key].deg === "number") {
            planetRashis[pName] = Math.floor(normalizeDeg(planets[key].deg) / 30.0) + 1;
        } else {
            planetRashis[pName] = 1;
        }
        matrix[pName] = {};
        summary[pName] = {
            atimitra: [],
            adhimitra: [],
            mitra: [],
            sama: [],
            shatru: [],
            atishatru: [],
            adhishatru: []
        };
    });

    PANCHADHA_PLANET_NAMES.forEach(p1 => {
        const r1 = planetRashis[p1];
        PANCHADHA_PLANET_NAMES.forEach(p2 => {
            if (p1 === p2) {
                matrix[p1][p2] = {
                    naisargika: 0,
                    naisargikaLabel: "स्व",
                    tatkalika: 0,
                    tatkalikaLabel: "स्व",
                    panchadhaScore: 0,
                    panchadhaLabel: "स्व",
                    badgeClass: "badge-self",
                    houseDiff: 1
                };
                return;
            }

            // १. नैसर्गिक मैत्री (+1, 0, -1)
            const nScore = (GRAHA_FRIENDSHIP[p1] && typeof GRAHA_FRIENDSHIP[p1][p2] === "number")
                ? GRAHA_FRIENDSHIP[p1][p2]
                : 0;
            const nLabel = nScore === 1 ? "मित्र" : (nScore === -1 ? "शत्रु" : "सम");

            // २. तात्कालिक मैत्री (+1, -1)
            // ग्रह रहेको स्थानबाट २, ३, ४, १०, ११, १२ भावमा हुने ग्रह तात्कालिक मित्र; बाँकी १, ५, ६, ७, ८, ९ मा शत्रु
            const r2 = planetRashis[p2];
            const houseDiff = ((r2 - r1 + 12) % 12) + 1;
            const isTatkalikaFriend = [2, 3, 4, 10, 11, 12].includes(houseDiff);
            const tScore = isTatkalikaFriend ? 1 : -1;
            const tLabel = isTatkalikaFriend ? "मित्र" : "शत्रु";

            // ३. पञ्चधा मैत्री (N + T)
            const pScore = nScore + tScore;
            let pLabel = "सम";
            let badgeClass = "badge-sama";

            if (pScore === 2) {
                pLabel = "अतिमित्र";
                badgeClass = "badge-adhimitra";
                summary[p1].atimitra.push(p2);
                summary[p1].adhimitra.push(p2);
            } else if (pScore === 1) {
                pLabel = "मित्र";
                badgeClass = "badge-mitra";
                summary[p1].mitra.push(p2);
            } else if (pScore === 0) {
                pLabel = "सम";
                badgeClass = "badge-sama";
                summary[p1].sama.push(p2);
            } else if (pScore === -1) {
                pLabel = "शत्रु";
                badgeClass = "badge-shatru";
                summary[p1].shatru.push(p2);
            } else if (pScore === -2) {
                pLabel = "अतिशत्रु";
                badgeClass = "badge-adhishatru";
                summary[p1].atishatru.push(p2);
                summary[p1].adhishatru.push(p2);
            }

            matrix[p1][p2] = {
                naisargika: nScore,
                naisargikaLabel: nLabel,
                tatkalika: tScore,
                tatkalikaLabel: tLabel,
                panchadhaScore: pScore,
                panchadhaLabel: pLabel,
                badgeClass: badgeClass,
                houseDiff: houseDiff
            };
        });
    });

    return {
        planets: PANCHADHA_PLANET_NAMES,
        planetRashis: planetRashis,
        matrix: matrix,
        summary: summary
    };
}


/**
 * अंश (Degree) बाट राशि, अंश, कला, विकला निकाल्छ
 */
function getRashiDetails(deg) {
    const norm = normalizeDeg(deg);
    const rashiIndex = Math.floor(norm / 30.0);
    const rashi = RASHIS[rashiIndex];
    const remDeg = norm - rashiIndex * 30.0;
    const d = Math.floor(remDeg);
    const remMin = (remDeg - d) * 60.0;
    const m = Math.floor(remMin);
    const s = Math.round((remMin - m) * 60.0);

    return {
        rashiId: rashiIndex + 1,
        rashiNameNp: rashi.nameNp,
        rashiNameEn: rashi.nameEn,
        lord: rashi.lord,
        element: rashi.element,
        degInRashi: remDeg,
        formatted: `${rashi.nameNp} ${d}° ${m}' ${s}"`
    };
}

/**
 * अंश बाट नक्षत्र, पाद, र नामाक्षर निकाल्छ
 */
function getNakshatraDetails(deg) {
    const norm = normalizeDeg(deg);
    const nakLength = 360.0 / 27.0; // 13° 20' = 13.333333°
    const padaLength = nakLength / 4.0; // 3° 20' = 3.333333°

    const nakIndex = Math.floor(norm / nakLength);
    const nak = NAKSHATRAS[nakIndex % 27];
    const remDeg = norm - nakIndex * nakLength;
    const pada = Math.min(4, Math.floor(remDeg / padaLength) + 1);
    const namaakshar = nak.padas[pada - 1] || nak.padas[0];

    const elapsedFrac = remDeg / nakLength; // कति भाग बित्यो (0.0 to 1.0)

    return {
        nakshatraId: nak.id,
        nakshatraNameNp: nak.nameNp,
        nakshatraNameEn: nak.nameEn,
        lord: nak.lord,
        pada: pada,
        namaakshar: namaakshar,
        yoni: nak.yoni,
        gana: nak.gana,
        nadi: nak.nadi,
        elapsedFraction: elapsedFrac
    };
}

/**
 * तिथि गणना गर्छ (१ देखि ३० सम्म)
 */
function calculateTithi(sunDeg, moonDeg) {
    let diff = normalizeDeg(moonDeg - sunDeg);
    const tithiIndex = Math.floor(diff / 12.0); // १२ अंश प्रति तिथि
    const tithiNum = tithiIndex + 1;

    let pakshaNp = tithiNum <= 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
    let tithiNameNp = "";

    const tithiNames = [
        "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी",
        "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
        "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा"
    ];

    if (tithiNum <= 15) {
        tithiNameNp = tithiNames[tithiNum - 1];
    } else if (tithiNum < 30) {
        tithiNameNp = tithiNames[tithiNum - 16];
    } else {
        tithiNameNp = "औँसी (अमावस्या)";
    }

    return {
        number: tithiNum,
        paksha: pakshaNp,
        name: tithiNameNp,
        formatted: `${pakshaNp} ${tithiNameNp}`
    };
}

/**
 * योग गणना गर्छ (१ देखि २७)
 */
function calculateYoga(sunDeg, moonDeg) {
    const sum = normalizeDeg(sunDeg + moonDeg);
    const yogaLength = 360.0 / 27.0; // 13.333333°
    const yogaIndex = Math.floor(sum / yogaLength);
    return YOGAS[yogaIndex % 27];
}

/**
 * करण गणना गर्छ (१ देखि ६० अर्ध-तिथि)
 */
function calculateKarana(sunDeg, moonDeg) {
    let diff = normalizeDeg(moonDeg - sunDeg);
    const halfTithi = Math.floor(diff / 6.0); // ६ अंश प्रति करण

    if (halfTithi === 0) return "किंस्तुघ्न";
    if (halfTithi >= 57) {
        if (halfTithi === 57) return "शकुनि";
        if (halfTithi === 58) return "चतुष्पद";
        if (halfTithi === 59) return "नाग";
    }

    // Rotating 7 movable karanas (बव देखि भद्रा)
    const movableIndex = (halfTithi - 1) % 7;
    return KARANAS[movableIndex];
}

/**
 * नवमांश (D9) स्थिति निकाल्छ
 */
function calculateNavamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiIndex = Math.floor(norm / 30.0); // 0 to 11
    const degInRashi = norm - rashiIndex * 30.0;
    const navamshaPart = Math.floor(degInRashi / (30.0 / 9.0)); // 0 to 8

    // Fiery signs (1, 5, 9): starts at Aries (1)
    // Earthy signs (2, 6, 10): starts at Capricorn (10)
    // Airy signs (3, 7, 11): starts at Libra (7)
    // Watery signs (4, 8, 12): starts at Cancer (4)
    let startRashi = 1;
    const elementCycle = rashiIndex % 4;
    if (elementCycle === 0) startRashi = 1;      // Fiery -> Aries
    else if (elementCycle === 1) startRashi = 10; // Earthy -> Capricorn
    else if (elementCycle === 2) startRashi = 7;  // Airy -> Libra
    else if (elementCycle === 3) startRashi = 4;  // Watery -> Cancer

    const finalRashiId = ((startRashi - 1 + navamshaPart) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * होरा (D2 / Hora) स्थिति निकाल्छ (सम्पत्ति तथा धन विचार)
 * विषम राशिमा: ०-१५° सूर्य (सिंह), १५-३०° चन्द्र (कर्कट)
 * सम राशिमा: ०-१५° चन्द्र (कर्कट), १५-३०° सूर्य (सिंह)
 */
function calculateHoraRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const isOdd = (rashiId % 2 !== 0);
    const finalRashiId = isOdd
        ? (degInRashi < 15.0 ? 5 : 4)
        : (degInRashi < 15.0 ? 4 : 5);
    return RASHIS[finalRashiId - 1];
}

/**
 * द्रेष्काण (D3 / Drekkana) स्थिति निकाल्छ (पराक्रम, भ्रातृ सुख विचार)
 * ०-१०° आफ्नै राशि, १०-२०° पञ्चम राशि, २०-३०° नवम राशि
 */
function calculateDrekkanaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(2, Math.floor(degInRashi / 10.0));
    const finalRashiId = ((rashiId - 1 + part * 4) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * द्वादशांश (D12 / Dwadashamsha) स्थिति निकाल्छ (माता-पिता, वंश परम्परा विचार)
 * प्रत्येक २.५° मा आफ्नै राशिबाट सुरु भई क्रमैसँग गनिन्छ
 */
function calculateDwadashamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(11, Math.floor(degInRashi / 2.5));
    const finalRashiId = ((rashiId - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * त्रिंशांश (D30 / Trimshamsha) स्थिति निकाल्छ (अनिष्ट, अरिष्ट, संकट, भाग्य विचार)
 * विषम राशि: ०-५° मङ्गल (मेष), ५-१०° शनि (कुम्भ), १०-१८° गुरु (धनु), १८-२५° बुध (मिथुन), २५-३०° शुक्र (तुला)
 * सम राशि: ०-५° शुक्र (वृष), ५-१२° बुध (कन्या), १२-२०° गुरु (मीन), २०-२५° शनि (मकर), २५-३०° मङ्गल (वृश्चिक)
 */
function calculateTrimshamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const isOdd = (rashiId % 2 !== 0);
    let finalRashiId;

    if (isOdd) {
        if (degInRashi < 5.0) finalRashiId = 1;       // मेष
        else if (degInRashi < 10.0) finalRashiId = 11; // कुम्भ
        else if (degInRashi < 18.0) finalRashiId = 9;  // धनु
        else if (degInRashi < 25.0) finalRashiId = 3;  // मिथुन
        else finalRashiId = 7;                        // तुला
    } else {
        if (degInRashi < 5.0) finalRashiId = 2;       // वृष
        else if (degInRashi < 12.0) finalRashiId = 6;  // कन्या
        else if (degInRashi < 20.0) finalRashiId = 12; // मीन
        else if (degInRashi < 25.0) finalRashiId = 10; // मकर
        else finalRashiId = 8;                         // वृश्चिक
    }
    return RASHIS[finalRashiId - 1];
}

/**
 * दशमांश (D10 / Dashamsha) स्थिति निकाल्छ (कर्म, आजीविका, मान-प्रतिष्ठा विचार)
 * विषम राशि: आफ्नै राशिबाट, सम राशि: नवम राशिबाट
 */
function calculateDashamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(9, Math.floor(degInRashi / 3.0));
    const isOdd = (rashiId % 2 !== 0);
    const startShift = isOdd ? 0 : 8;
    const finalRashiId = ((rashiId - 1 + startShift + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * चतुर्थांश (D4 / Chaturthamsha) स्थिति निकाल्छ (गृह, भूमि, वाहन तथा अचल सम्पत्ति विचार)
 * प्रत्येक राशिमा ७°३०' (७.५°) का ४ भाग:
 * १. आफ्नै राशि, २. चतुर्थ राशि, ३. सप्तम राशि, ४. दशम राशि (केन्द्र स्थानहरू)
 */
function calculateChaturthamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(3, Math.floor(degInRashi / 7.5));
    const finalRashiId = ((rashiId - 1 + part * 3) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * सप्तमांश (D7 / Saptamamsha) स्थिति निकाल्छ (सन्तान, सन्तति, नाति-नातिना तथा वंशवृद्धि विचार)
 * प्रत्येक राशिमा ४°१७'८.५७" (३०/७°) का ७ भाग:
 * विषम राशि: आफ्नै राशिबाट, सम राशि: सप्तम राशिबाट क्रमैसँग
 */
function calculateSaptamamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(6, Math.floor(degInRashi / (30.0 / 7.0)));
    const isOdd = (rashiId % 2 !== 0);
    const startRashi = isOdd ? rashiId : (((rashiId - 1 + 6) % 12) + 1);
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * षोडशांश (D16 / Shodashamsha / कलावंश) स्थिति निकाल्छ (सवारी साधन, वाहन सुख, भौतिक सुख-सुविधा तथा यात्रा)
 * प्रत्येक राशिमा १°५२'३०" (१.८७५°) का १६ भाग:
 * चर राशि (१,४,७,१०): मेष (१) बाट
 * स्थिर राशि (२,५,८,११): सिंह (५) बाट
 * द्विस्वभाव राशि (३,६,९,१२): धनु (९) बाट
 */
function calculateShodashamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(15, Math.floor(degInRashi / 1.875));
    const modality = (rashiId - 1) % 3; // 0: चर, 1: स्थिर, 2: द्विस्वभाव
    const startRashi = (modality === 0) ? 1 : ((modality === 1) ? 5 : 9);
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * विंशांश (D20 / Vimshamsha) स्थिति निकाल्छ (उपासना, भक्ति, साधना, आध्यात्मिक उन्नति तथा इष्टदेव कृपा)
 * प्रत्येक राशिमा १°३०' (१.५°) का २० भाग:
 * चर राशि (१,४,७,१०): मेष (१) बाट
 * स्थिर राशि (२,५,८,११): धनु (९) बाट
 * द्विस्वभाव राशि (३,६,९,१२): सिंह (५) बाट
 */
function calculateVimshamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(19, Math.floor(degInRashi / 1.5));
    const modality = (rashiId - 1) % 3; // 0: चर, 1: स्थिर, 2: द्विस्वभाव
    const startRashi = (modality === 0) ? 1 : ((modality === 1) ? 9 : 5);
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * चतुर्विंशांश (D24 / Chaturvimshamsha / सिद्धमांश) स्थिति निकाल्छ (विद्या, ज्ञान, बुद्धि, उच्च शिक्षा तथा पाण्डित्य)
 * प्रत्येक राशिमा १°१५' (१.२५°) का २४ भाग:
 * विषम राशि: सिंह (५) बाट
 * सम राशि: कर्कट (४) बाट
 */
function calculateChaturvimshamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(23, Math.floor(degInRashi / 1.25));
    const isOdd = (rashiId % 2 !== 0);
    const startRashi = isOdd ? 5 : 4;
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * सप्तविंशांश (D27 / Saptavimshamsha / भंशा / नक्षत्रमांश) स्थिति निकाल्छ (बल, पराक्रम, शारीरिक तथा मानसिक सामर्थ्य)
 * प्रत्येक राशिमा १°६'४०" (३०/२७°) का २७ भाग:
 * अग्नि तत्व (१,५,९): मेष (१) बाट
 * पृथ्वी तत्व (२,६,१०): कर्कट (४) बाट
 * वायु तत्व (३,७,११): तुला (७) बाट
 * जल तत्व (४,८,१२): मकर (१०) बाट
 */
function calculateSaptavimshamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(26, Math.floor(degInRashi / (30.0 / 27.0)));
    const elemCycle = (rashiId - 1) % 4; // 0: Fire, 1: Earth, 2: Air, 3: Water
    const starts = [1, 4, 7, 10];
    const startRashi = starts[elemCycle];
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * चत्वारिंशांश (D40 / Chatvarimshamsha / खवेदांश) स्थिति निकाल्छ (परम्परागत संस्कार, कुल प्रभाव, शुभाशुभ फल)
 * प्रत्येक राशिमा ०°४५' (०.७५°) का ४० भाग:
 * विषम राशि: मेष (१) बाट
 * सम राशि: तुला (७) बाट
 */
function calculateChatvarimshamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(39, Math.floor(degInRashi / 0.75));
    const isOdd = (rashiId % 2 !== 0);
    const startRashi = isOdd ? 1 : 7;
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * अक्षवेदांश (D45 / Akshavedamsha) स्थिति निकाल्छ (चरित्र, आचार, स्वभाव तथा सर्वविध शुभाशुभ विचार)
 * प्रत्येक राशिमा ०°४०' (३०/४५°) का ४५ भाग:
 * चर राशि (१,४,७,१०): मेष (१) बाट
 * स्थिर राशि (२,५,८,११): सिंह (५) बाट
 * द्विस्वभाव राशि (३,६,९,१२): धनु (९) बाट
 */
function calculateAkshavedamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(44, Math.floor(degInRashi / (30.0 / 45.0)));
    const modality = (rashiId - 1) % 3; // 0: चर, 1: स्थिर, 2: द्विस्वभाव
    const startRashi = (modality === 0) ? 1 : ((modality === 1) ? 5 : 9);
    const finalRashiId = ((startRashi - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}

/**
 * षष्ट्यंश (D60 / Shashtyamsha) स्थिति निकाल्छ (सूक्ष्म फलादेश, प्रारब्ध कर्म, पूर्वजन्म तथा समग्र शुभाशुभ)
 * प्रत्येक राशिमा ०°३०' (०.५°) का ६० भाग:
 * सबै राशिमा आफ्नै राशिबाट क्रमैसँग गणना
 */
function calculateShashtyamshaRashi(deg) {
    const norm = normalizeDeg(deg);
    const rashiId = Math.floor(norm / 30.0) + 1;
    const degInRashi = norm % 30.0;
    const part = Math.min(59, Math.floor(degInRashi / 0.5));
    const finalRashiId = ((rashiId - 1 + part) % 12) + 1;
    return RASHIS[finalRashiId - 1];
}


/**
 * विंशोत्तरी महादशा, अन्तर्दशा र प्रत्यन्तर्दशा गणना गर्छ (१२० वर्षे पूर्ण चक्र)
 */
function formatAntardashaDuration(yM, yA) {
    const totalMonthsFraction = (yM * yA) / 10.0;
    const totalMonths = Math.floor(totalMonthsFraction);
    const remDays = Math.round((totalMonthsFraction - totalMonths) * 30.0);
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    let parts = [];
    if (y > 0) parts.push(`${y} वर्ष`);
    if (m > 0) parts.push(`${m} महिना`);
    if (remDays > 0) parts.push(`${remDays} दिन`);
    if (parts.length === 0) parts.push(`० दिन`);
    return parts.join(' ');
}

function formatPratyantardashaDuration(yM, yA, yP) {
    const totalDaysFraction = (yM * yA * yP) / 40.0;
    const totalDays = Math.floor(totalDaysFraction);
    const remHours = Math.round((totalDaysFraction - totalDays) * 24.0);
    const m = Math.floor(totalDays / 30);
    const d = totalDays % 30;
    let parts = [];
    if (m > 0) parts.push(`${m} महिना`);
    if (d > 0) parts.push(`${d} दिन`);
    if (remHours > 0) parts.push(`${remHours} घण्टा`);
    if (parts.length === 0) parts.push(`० दिन`);
    return parts.join(' ');
}

function calculateVimshottariDasha(moonDeg, birthDate) {
    const nakInfo = getNakshatraDetails(moonDeg);
    const lordName = nakInfo.lord;

    // Find starting lord index
    let lordIdx = VIMSHOTTARI_LORDS.findIndex(l => l.lord === lordName);
    if (lordIdx === -1) lordIdx = 0;

    const initialLord = VIMSHOTTARI_LORDS[lordIdx];
    const totalYears = initialLord.years;

    // भोग्य दशा (Remaining years at birth)
    const elapsedFrac = nakInfo.elapsedFraction;
    const balanceFrac = 1.0 - elapsedFrac;
    const balanceYears = totalYears * balanceFrac;

    const bYears = Math.floor(balanceYears);
    const bMonths = Math.floor((balanceYears - bYears) * 12);
    const bDays = Math.round(((balanceYears - bYears) * 12 - bMonths) * 30);

    const timeline = [];
    const now = new Date();

    let mahadashaStartMs = birthDate.getTime();

    for (let m = 0; m < 9; m++) {
        const curLordIdx = (lordIdx + m) % 9;
        const curLordObj = VIMSHOTTARI_LORDS[curLordIdx];
        const isFirst = (m === 0);
        const yM = curLordObj.years;

        // सैद्धान्तिक सुरु मिति (Theoretical start for birth dasha)
        let theoreticalMahadashaStartMs = mahadashaStartMs;
        if (isFirst) {
            theoreticalMahadashaStartMs = birthDate.getTime() - (totalYears - balanceYears) * 365.25 * 86400 * 1000;
        }

        const mahadashaEndMs = theoreticalMahadashaStartMs + yM * 365.25 * 86400 * 1000;
        const mStartDate = new Date(isFirst ? birthDate.getTime() : mahadashaStartMs);
        const mEndDate = new Date(mahadashaEndMs);

        // ९ अन्तर्दशाहरू (Antardashas)
        const antardashas = [];
        let aStartMs = theoreticalMahadashaStartMs;

        for (let a = 0; a < 9; a++) {
            const antLordIdx = (curLordIdx + a) % 9;
            const antLordObj = VIMSHOTTARI_LORDS[antLordIdx];
            const yA = antLordObj.years;
            const antDurationYears = (yM * yA) / 120.0;
            const antDurationMs = antDurationYears * 365.25 * 86400 * 1000;
            const aEndMs = aStartMs + antDurationMs;

            const aStartDate = new Date(aStartMs);
            const aEndDate = new Date(aEndMs);

            // ९ प्रत्यन्तर्दशाहरू (Pratyantardashas)
            const pratyantardashas = [];
            let pStartMs = aStartMs;

            for (let p = 0; p < 9; p++) {
                const pratLordIdx = (antLordIdx + p) % 9;
                const pratLordObj = VIMSHOTTARI_LORDS[pratLordIdx];
                const yP = pratLordObj.years;
                const pratDurationYears = (yM * yA * yP) / 14400.0;
                const pratDurationMs = pratDurationYears * 365.25 * 86400 * 1000;
                const pEndMs = pStartMs + pratDurationMs;

                const pStartDate = new Date(pStartMs);
                const pEndDate = new Date(pEndMs);

                const isPratCurrent = (now >= pStartDate && now < pEndDate);
                const isPratBeforeBirth = isFirst && (pEndDate <= birthDate);
                const isPratAtBirth = isFirst && (pStartDate <= birthDate && pEndDate > birthDate);

                let pStatus = "आगामी";
                let pBadgeClass = "badge-dasha-future";
                if (isPratCurrent) {
                    pStatus = "सक्रिय";
                    pBadgeClass = "badge-dasha-active";
                } else if (isPratBeforeBirth) {
                    pStatus = "जन्मपूर्व";
                    pBadgeClass = "badge-dasha-past";
                } else if (pEndDate <= now) {
                    pStatus = "व्यतीत";
                    pBadgeClass = "badge-dasha-past";
                }

                pratyantardashas.push({
                    lord: pratLordObj.lord,
                    yP: yP,
                    durationFormatted: formatPratyantardashaDuration(yM, yA, yP),
                    startDate: pStartDate,
                    endDate: pEndDate,
                    startFormatted: formatDate(pStartDate),
                    endFormatted: formatDate(pEndDate),
                    isCurrent: isPratCurrent,
                    isBeforeBirth: isPratBeforeBirth,
                    isAtBirth: isPratAtBirth,
                    status: pStatus,
                    badgeClass: pBadgeClass
                });

                pStartMs = pEndMs;
            }

            const isAntCurrent = (now >= aStartDate && now < aEndDate);
            const isAntBeforeBirth = isFirst && (aEndDate <= birthDate);
            const isAntAtBirth = isFirst && (aStartDate <= birthDate && aEndDate > birthDate);

            let aStatus = "आगामी";
            let aBadgeClass = "badge-dasha-future";
            if (isAntCurrent) {
                aStatus = "सक्रिय";
                aBadgeClass = "badge-dasha-active";
            } else if (isAntBeforeBirth) {
                aStatus = "जन्मपूर्व";
                aBadgeClass = "badge-dasha-past";
            } else if (aEndDate <= now) {
                aStatus = "व्यतीत";
                aBadgeClass = "badge-dasha-past";
            }

            antardashas.push({
                lord: antLordObj.lord,
                yA: yA,
                durationFormatted: formatAntardashaDuration(yM, yA),
                startDate: aStartDate,
                endDate: aEndDate,
                startFormatted: formatDate(aStartDate),
                endFormatted: formatDate(aEndDate),
                isCurrent: isAntCurrent,
                isBeforeBirth: isAntBeforeBirth,
                isAtBirth: isAntAtBirth,
                status: aStatus,
                badgeClass: aBadgeClass,
                pratyantardashas: pratyantardashas
            });

            aStartMs = aEndMs;
        }

        const isMahaCurrent = (now >= mStartDate && now < mEndDate);
        let mStatus = "आगामी";
        let mBadgeClass = "badge-dasha-future";
        if (isMahaCurrent) {
            mStatus = "सक्रिय";
            mBadgeClass = "badge-dasha-active";
        } else if (isFirst && now < mEndDate) {
            mStatus = "जन्मकालीन (सक्रिय)";
            mBadgeClass = "badge-dasha-active";
        } else if (mEndDate <= now) {
            mStatus = "व्यतीत";
            mBadgeClass = "badge-dasha-past";
        }

        timeline.push({
            lord: curLordObj.lord,
            years: yM,
            durationYears: isFirst ? balanceYears.toFixed(2) : yM.toString(),
            effectiveDurationYears: isFirst ? balanceYears.toFixed(2) : yM.toString(),
            isFirst: isFirst,
            startDate: mStartDate,
            endDate: mEndDate,
            startFormatted: formatDate(mStartDate),
            endFormatted: formatDate(mEndDate),
            isCurrent: isMahaCurrent,
            status: mStatus,
            badgeClass: mBadgeClass,
            antardashas: antardashas
        });

        mahadashaStartMs = mahadashaEndMs;
    }

    // हाल सक्रिय दशा त्रयी (Mahadasha, Antardasha, Pratyantardasha)
    let currentMahadasha = null;
    let currentAntardasha = null;
    let currentPratyantardasha = null;

    for (const m of timeline) {
        if (now >= m.startDate && now < m.endDate) {
            currentMahadasha = m;
            for (const a of m.antardashas) {
                if (now >= a.startDate && now < a.endDate) {
                    currentAntardasha = a;
                    for (const p of a.pratyantardashas) {
                        if (now >= p.startDate && now < p.endDate) {
                            currentPratyantardasha = p;
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    return {
        initialLord: initialLord.lord,
        balance: `${toNepaliDigits(bYears)} वर्ष ${toNepaliDigits(bMonths)} महिना ${toNepaliDigits(bDays)} दिन`,
        timeline: timeline,
        current: {
            mahadasha: currentMahadasha ? currentMahadasha.lord : null,
            antardasha: currentAntardasha ? currentAntardasha.lord : null,
            pratyantardasha: currentPratyantardasha ? currentPratyantardasha.lord : null,
            mahaObj: currentMahadasha,
            antObj: currentAntardasha,
            pratObj: currentPratyantardasha,
            activeString: (currentMahadasha && currentAntardasha && currentPratyantardasha)
                ? `${currentMahadasha.lord} महादशा ➔ ${currentAntardasha.lord} अन्तर्दशा ➔ ${currentPratyantardasha.lord} प्रत्यन्तर्दशा`
                : (currentMahadasha ? `${currentMahadasha.lord} महादशा` : null)
        }
    };
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ====================================================
// योगिनी दशा (Yogini Dasha - ३६ वर्षे चक्र)
// ====================================================
const YOGINI_LIST = [
    { id: 1, name: "मङ्गला", lord: "चन्द्र", years: 1 },
    { id: 2, name: "पिङ्गला", lord: "सूर्य", years: 2 },
    { id: 3, name: "धन्या", lord: "गुरु", years: 3 },
    { id: 4, name: "भ्रामरी", lord: "मङ्गल", years: 4 },
    { id: 5, name: "भद्रिका", lord: "बुध", years: 5 },
    { id: 6, name: "उल्का", lord: "शनि", years: 6 },
    { id: 7, name: "सिद्धा", lord: "शुक्र", years: 7 },
    { id: 8, name: "सङ्कटा", lord: "राहु", years: 8 }
];

/**
 * योगिनी दशा र अन्तर्दशा गणना गर्छ (३६ वर्षे चक्र, ३ चक्र गरी १०८ वर्ष)
 */
function calculateYoginiDasha(moonDeg, birthDate) {
    const nakLength = 360.0 / 27.0; // 13.333333°
    const nakIndex = Math.floor(moonDeg / nakLength);
    const nakNum = nakIndex + 1; // 1 to 27
    const remDeg = moonDeg - nakIndex * nakLength;
    const elapsedFrac = remDeg / nakLength;
    const balanceFrac = 1.0 - elapsedFrac;

    // आरम्भिक योगिनी: (नक्षत्र सं. + ३ - १) % ८ (मङ्गला देखि सङ्कटा)
    const yIdx = (nakNum + 3 - 1) % 8;
    const initialYogini = YOGINI_LIST[yIdx];
    const initialYears = initialYogini.years;

    const balanceYears = initialYears * balanceFrac;
    const bYears = Math.floor(balanceYears);
    const bMonths = Math.floor((balanceYears - bYears) * 12);
    const bDays = Math.round(((balanceYears - bYears) * 12 - bMonths) * 30);

    const now = new Date();
    const timeline = [];

    // ३ चक्र (३६ * ३ = १०८ वर्ष)
    let cycleStartMs = birthDate.getTime() - (initialYears - balanceYears) * 365.25 * 86400 * 1000;
    let mahadashaStartMs = birthDate.getTime();

    let currentMaha = null;
    let currentAnt = null;

    let periodCount = 0;
    for (let cycle = 0; cycle < 3; cycle++) {
        for (let i = 0; i < 8; i++) {
            const curIdx = (yIdx + i) % 8;
            const curYogini = YOGINI_LIST[curIdx];
            const isFirst = (cycle === 0 && i === 0);
            const yM = curYogini.years;

            let mStartMs = isFirst ? birthDate.getTime() : mahadashaStartMs;
            let mTheoreticalStartMs = isFirst ? cycleStartMs : mahadashaStartMs;
            let mEndMs = mTheoreticalStartMs + yM * 365.25 * 86400 * 1000;

            const mStartDate = new Date(mStartMs);
            const mEndDate = new Date(mEndMs);

            // अन्तर्दशाहरू (८ उप-अवधि)
            const antardashas = [];
            let aStartMs = mTheoreticalStartMs;

            for (let j = 0; j < 8; j++) {
                const antIdx = (curIdx + j) % 8;
                const antYogini = YOGINI_LIST[antIdx];
                const yA = antYogini.years;

                // महिना = (yM * yA) / 3
                const totalMonths = (yM * yA) / 3.0;
                const aDurationYears = totalMonths / 12.0;
                const aDurationMs = aDurationYears * 365.25 * 86400 * 1000;
                const aEndMs = aStartMs + aDurationMs;

                const aStartDate = new Date(aStartMs);
                const aEndDate = new Date(aEndMs);

                const wholeMonths = Math.floor(totalMonths);
                const days = Math.round((totalMonths - wholeMonths) * 30);
                const yrs = Math.floor(wholeMonths / 12);
                const mos = wholeMonths % 12;
                let durParts = [];
                if (yrs > 0) durParts.push(`${yrs} वर्ष`);
                if (mos > 0) durParts.push(`${mos} महिना`);
                if (days > 0) durParts.push(`${days} दिन`);
                if (durParts.length === 0) durParts.push(`० दिन`);
                const formattedDuration = durParts.join(" ");

                const isAntCurrent = (now >= aStartDate && now < aEndDate);
                const isAntBeforeBirth = isFirst && (aEndMs <= birthDate.getTime());

                let aStatus = "आगामी";
                let aBadgeClass = "badge-dasha-future";
                if (isAntCurrent) {
                    aStatus = "सक्रिय";
                    aBadgeClass = "badge-dasha-active";
                    currentAnt = {
                        name: antYogini.name,
                        lord: antYogini.lord,
                        durationFormatted: formattedDuration,
                        startFormatted: formatDate(aStartDate),
                        endFormatted: formatDate(aEndDate)
                    };
                } else if (isAntBeforeBirth) {
                    aStatus = "जन्मपूर्व";
                    aBadgeClass = "badge-dasha-past";
                } else if (aEndMs <= now.getTime()) {
                    aStatus = "व्यतीत";
                    aBadgeClass = "badge-dasha-past";
                }

                // ८ प्रत्यन्तर्दशाहरू (Yogini sub-periods)
                const pratyantardashas = [];
                let pStartMs = aStartMs;
                for (let k = 0; k < 8; k++) {
                    const pratIdx = (antIdx + k) % 8;
                    const pratYogini = YOGINI_LIST[pratIdx];
                    const yP = pratYogini.years;
                    const pDurationMonths = (totalMonths * yP) / 36.0;
                    const pDurationMs = (pDurationMonths / 12.0) * 365.25 * 86400 * 1000;
                    const pEndMs = pStartMs + pDurationMs;
                    const pStartDate = new Date(pStartMs);
                    const pEndDate = new Date(pEndMs);

                    pratyantardashas.push({
                        name: pratYogini.name,
                        lord: pratYogini.lord,
                        startDate: pStartDate,
                        endDate: pEndDate,
                        isCurrent: (now >= pStartDate && now < pEndDate),
                        isBeforeBirth: isFirst && (pEndDate <= birthDate)
                    });
                    pStartMs = pEndMs;
                }

                antardashas.push({
                    name: antYogini.name,
                    lord: antYogini.lord,
                    durationFormatted: formattedDuration,
                    startDate: aStartDate,
                    endDate: aEndDate,
                    startFormatted: formatDate(aStartDate),
                    endFormatted: formatDate(aEndDate),
                    isCurrent: isAntCurrent,
                    isBeforeBirth: isAntBeforeBirth,
                    status: aStatus,
                    badgeClass: aBadgeClass,
                    pratyantardashas: pratyantardashas
                });

                aStartMs = aEndMs;
            }

            const isMahaCurrent = (now >= mStartDate && now < mEndDate);
            let mStatus = "आगामी";
            let mBadgeClass = "badge-dasha-future";
            if (isMahaCurrent) {
                mStatus = "सक्रिय";
                mBadgeClass = "badge-dasha-active";
                currentMaha = {
                    name: curYogini.name,
                    lord: curYogini.lord,
                    startFormatted: formatDate(mStartDate),
                    endFormatted: formatDate(mEndDate)
                };
            } else if (isFirst && now < mEndDate) {
                mStatus = "जन्मकालीन (सक्रिय)";
                mBadgeClass = "badge-dasha-active";
            } else if (mEndMs <= now.getTime()) {
                mStatus = "व्यतीत";
                mBadgeClass = "badge-dasha-past";
            }

            timeline.push({
                index: periodCount + 1,
                name: curYogini.name,
                lord: curYogini.lord,
                cycle: cycle + 1,
                years: isFirst ? balanceYears.toFixed(2) : yM.toString(),
                fullYears: yM,
                isFirst: isFirst,
                startDate: mStartDate,
                endDate: mEndDate,
                startFormatted: formatDate(mStartDate),
                endFormatted: formatDate(mEndDate),
                isCurrent: isMahaCurrent,
                status: mStatus,
                badgeClass: mBadgeClass,
                antardashas: antardashas
            });

            mahadashaStartMs = mEndMs;
            periodCount++;
        }
    }

    return {
        initialYogini: initialYogini.name,
        initialLord: initialYogini.lord,
        balance: `${toNepaliDigits(bYears)} वर्ष ${toNepaliDigits(bMonths)} महिना ${toNepaliDigits(bDays)} दिन`,
        timeline: timeline,
        current: {
            mahadasha: currentMaha ? currentMaha.name : null,
            mahaLord: currentMaha ? currentMaha.lord : null,
            antardasha: currentAnt ? currentAnt.name : null,
            antLord: currentAnt ? currentAnt.lord : null,
            mahaObj: currentMaha,
            antObj: currentAnt,
            activeString: (currentMaha && currentAnt)
                ? `${currentMaha.name} (${currentMaha.lord}) ➔ ${currentAnt.name} (${currentAnt.lord})`
                : null
        }
    };
}

// ====================================================
// त्रिभागी दशा (Tribhagi Dasha - ४० वर्षे चक्र)
// ====================================================
const TRIBHAGI_LORDS = [
    { lord: "केतु", vimYears: 7, years: 7 / 3.0, labelYears: "२ वर्ष ४ महिना" },
    { lord: "शुक्र", vimYears: 20, years: 20 / 3.0, labelYears: "६ वर्ष ८ महिना" },
    { lord: "सूर्य", vimYears: 6, years: 6 / 3.0, labelYears: "२ वर्ष" },
    { lord: "चन्द्र", vimYears: 10, years: 10 / 3.0, labelYears: "३ वर्ष ४ महिना" },
    { lord: "मङ्गल", vimYears: 7, years: 7 / 3.0, labelYears: "२ वर्ष ४ महिना" },
    { lord: "राहु", vimYears: 18, years: 18 / 3.0, labelYears: "६ वर्ष" },
    { lord: "गुरु", vimYears: 16, years: 16 / 3.0, labelYears: "५ वर्ष ४ महिना" },
    { lord: "शनि", vimYears: 19, years: 19 / 3.0, labelYears: "६ वर्ष ४ महिना" },
    { lord: "बुध", vimYears: 17, years: 17 / 3.0, labelYears: "५ वर्ष ८ महिना" }
];

/**
 * त्रिभागी दशा र अन्तर्दशा गणना गर्छ (४० वर्षे चक्र, ३ चक्र गरी १२० वर्ष)
 */
function calculateTribhagiDasha(moonDeg, birthDate) {
    const nakLength = 360.0 / 27.0; // 13.333333°
    const nakIndex = Math.floor(moonDeg / nakLength);
    const remDeg = moonDeg - nakIndex * nakLength;
    const elapsedFrac = remDeg / nakLength;
    const balanceFrac = 1.0 - elapsedFrac;

    const startLordIdx = nakIndex % 9;
    const initialLordObj = TRIBHAGI_LORDS[startLordIdx];
    const initialLord = initialLordObj.lord;
    const totalYears = initialLordObj.years;

    const balanceYears = totalYears * balanceFrac;
    const bYears = Math.floor(balanceYears);
    const bMonths = Math.floor((balanceYears - bYears) * 12);
    const bDays = Math.round(((balanceYears - bYears) * 12 - bMonths) * 30);

    const now = new Date();
    const timeline = [];

    let cycleStartMs = birthDate.getTime() - (totalYears - balanceYears) * 365.25 * 86400 * 1000;
    let mahadashaStartMs = birthDate.getTime();

    let currentMaha = null;
    let currentAnt = null;

    let periodCount = 0;
    // ३ चक्र (३ * ४० = १२० वर्ष)
    for (let cycle = 0; cycle < 3; cycle++) {
        for (let i = 0; i < 9; i++) {
            const curIdx = (startLordIdx + i) % 9;
            const curLordObj = TRIBHAGI_LORDS[curIdx];
            const isFirst = (cycle === 0 && i === 0);
            const tM = curLordObj.years;
            const yM = curLordObj.vimYears;

            let mStartMs = isFirst ? birthDate.getTime() : mahadashaStartMs;
            let mTheoreticalStartMs = isFirst ? cycleStartMs : mahadashaStartMs;
            let mEndMs = mTheoreticalStartMs + tM * 365.25 * 86400 * 1000;

            const mStartDate = new Date(mStartMs);
            const mEndDate = new Date(mEndMs);

            // अन्तर्दशाहरू (९ उप-अवधि, दिन = yM * yA)
            const antardashas = [];
            let aStartMs = mTheoreticalStartMs;

            for (let j = 0; j < 9; j++) {
                const antIdx = (curIdx + j) % 9;
                const antLordObj = TRIBHAGI_LORDS[antIdx];
                const yA = antLordObj.vimYears;
                const daysTotal = yM * yA; // दिन = yM * yA
                const aDurationYears = daysTotal / 360.0;
                const aDurationMs = aDurationYears * 365.25 * 86400 * 1000;
                const aEndMs = aStartMs + aDurationMs;

                const aStartDate = new Date(aStartMs);
                const aEndDate = new Date(aEndMs);

                const mos = Math.floor(daysTotal / 30);
                const remDays = daysTotal % 30;
                const yrs = Math.floor(mos / 12);
                const remMos = mos % 12;
                let durParts = [];
                if (yrs > 0) durParts.push(`${yrs} वर्ष`);
                if (remMos > 0) durParts.push(`${remMos} महिना`);
                if (remDays > 0) durParts.push(`${remDays} दिन`);
                if (durParts.length === 0) durParts.push(`० दिन`);
                const formattedDuration = durParts.join(" ");

                const isAntCurrent = (now >= aStartDate && now < aEndDate);
                const isAntBeforeBirth = isFirst && (aEndMs <= birthDate.getTime());

                let aStatus = "आगामी";
                let aBadgeClass = "badge-dasha-future";
                if (isAntCurrent) {
                    aStatus = "सक्रिय";
                    aBadgeClass = "badge-dasha-active";
                    currentAnt = {
                        lord: antLordObj.lord,
                        durationFormatted: formattedDuration,
                        startFormatted: formatDate(aStartDate),
                        endFormatted: formatDate(aEndDate)
                    };
                } else if (isAntBeforeBirth) {
                    aStatus = "जन्मपूर्व";
                    aBadgeClass = "badge-dasha-past";
                } else if (aEndMs <= now.getTime()) {
                    aStatus = "व्यतीत";
                    aBadgeClass = "badge-dasha-past";
                }

                // ९ प्रत्यन्तर्दशाहरू (Tribhagi sub-periods)
                const pratyantardashas = [];
                let pStartMs = aStartMs;
                for (let k = 0; k < 9; k++) {
                    const pratIdx = (antIdx + k) % 9;
                    const pratLordObj = TRIBHAGI_LORDS[pratIdx];
                    const yP = pratLordObj.vimYears;
                    const pratDays = (daysTotal * yP) / 120.0;
                    const pDurationMs = (pratDays / 360.0) * 365.25 * 86400 * 1000;
                    const pEndMs = pStartMs + pDurationMs;
                    const pStartDate = new Date(pStartMs);
                    const pEndDate = new Date(pEndMs);

                    pratyantardashas.push({
                        lord: pratLordObj.lord,
                        yP: yP,
                        startDate: pStartDate,
                        endDate: pEndDate,
                        isCurrent: (now >= pStartDate && now < pEndDate),
                        isBeforeBirth: isFirst && (pEndDate <= birthDate)
                    });
                    pStartMs = pEndMs;
                }

                antardashas.push({
                    lord: antLordObj.lord,
                    durationFormatted: formattedDuration,
                    startDate: aStartDate,
                    endDate: aEndDate,
                    startFormatted: formatDate(aStartDate),
                    endFormatted: formatDate(aEndDate),
                    isCurrent: isAntCurrent,
                    isBeforeBirth: isAntBeforeBirth,
                    status: aStatus,
                    badgeClass: aBadgeClass,
                    pratyantardashas: pratyantardashas
                });

                aStartMs = aEndMs;
            }

            const isMahaCurrent = (now >= mStartDate && now < mEndDate);
            let mStatus = "आगामी";
            let mBadgeClass = "badge-dasha-future";
            if (isMahaCurrent) {
                mStatus = "सक्रिय";
                mBadgeClass = "badge-dasha-active";
                currentMaha = {
                    lord: curLordObj.lord,
                    startFormatted: formatDate(mStartDate),
                    endFormatted: formatDate(mEndDate)
                };
            } else if (isFirst && now < mEndDate) {
                mStatus = "जन्मकालीन (सक्रिय)";
                mBadgeClass = "badge-dasha-active";
            } else if (mEndMs <= now.getTime()) {
                mStatus = "व्यतीत";
                mBadgeClass = "badge-dasha-past";
            }

            timeline.push({
                index: periodCount + 1,
                lord: curLordObj.lord,
                cycle: cycle + 1,
                years: isFirst ? balanceYears.toFixed(2) : curLordObj.labelYears,
                fullYears: tM,
                isFirst: isFirst,
                startDate: mStartDate,
                endDate: mEndDate,
                startFormatted: formatDate(mStartDate),
                endFormatted: formatDate(mEndDate),
                isCurrent: isMahaCurrent,
                status: mStatus,
                badgeClass: mBadgeClass,
                antardashas: antardashas
            });

            mahadashaStartMs = mEndMs;
            periodCount++;
        }
    }

    return {
        initialLord: initialLord,
        balance: `${toNepaliDigits(bYears)} वर्ष ${toNepaliDigits(bMonths)} महिना ${toNepaliDigits(bDays)} दिन`,
        timeline: timeline,
        current: {
            mahadasha: currentMaha ? currentMaha.lord : null,
            antardasha: currentAnt ? currentAnt.lord : null,
            mahaObj: currentMaha,
            antObj: currentAnt,
            activeString: (currentMaha && currentAnt)
                ? `${currentMaha.lord} महादशा ➔ ${currentAnt.lord} अन्तर्दशा`
                : null
        }
    };
}

/**
 * माङ्गलिक दोष विचार (Kuja Dosha)
 * मंगल १, ४, ७, ८, १२ भावमा हुँदा माङ्गलिक हुन्छ।
 */
function checkManglikDosha(lagnaRashiId, marsRashiId) {
    let house = ((marsRashiId - lagnaRashiId + 12) % 12) + 1;
    const manglikHouses = [1, 4, 7, 8, 12];
    const isManglik = manglikHouses.includes(house);

    return {
        isManglik: isManglik,
        house: house,
        description: isManglik ?
            `मङ्गल लग्नबाट ${house} औं भावमा रहेकाले कुण्डली माङ्गलिक छ।` :
            `मङ्गल लग्नबाट ${house} औं भावमा रहेकाले माङ्गलिक दोष छैन।`
    };
}

/**
 * ३६ गुण कुण्डली मिलान (Ashtakoot Milan for Marriage Compatibility)
 */
function calculateAshtakootMilan(boyMoonDeg, girlMoonDeg) {
    const boyRashi = getRashiDetails(boyMoonDeg);
    const girlRashi = getRashiDetails(girlMoonDeg);
    const boyNak = getNakshatraDetails(boyMoonDeg);
    const girlNak = getNakshatraDetails(girlMoonDeg);

    let score = 0;
    const details = [];

    // 1. वर्ण (Varna - 1 pt)
    const varnaOrder = { "कर्कट": 4, "वृश्चिक": 4, "मीन": 4, "मेष": 3, "सिंह": 3, "धनु": 3, "वृष": 2, "कन्या": 2, "मकर": 2, "मिथुन": 1, "तुला": 1, "कुम्भ": 1 };
    const boyVarna = varnaOrder[boyRashi.rashiNameNp] || 1;
    const girlVarna = varnaOrder[girlRashi.rashiNameNp] || 1;
    let varnaPts = (boyVarna >= girlVarna) ? 1 : 0;
    score += varnaPts;
    details.push({ name: "वर्ण", max: 1, obtained: varnaPts, desc: varnaPts === 1 ? "शुभ" : "विचारणीय" });

    // 2. वश्य (2 pts)
    let vashyaPts = (boyRashi.rashiId === girlRashi.rashiId) ? 2 : 1;
    score += vashyaPts;
    details.push({ name: "वश्य", max: 2, obtained: vashyaPts, desc: vashyaPts === 2 ? "पूर्ण सामञ्जस्य" : "मध्यम" });

    // 3. तारा (3 pts)
    const diffNak = (girlNak.nakshatraId - boyNak.nakshatraId + 27) % 27;
    const taraRem = (diffNak % 9) + 1;
    let taraPts = [1, 2, 4, 6, 8, 9].includes(taraRem) ? 3 : 1.5;
    score += taraPts;
    details.push({ name: "तारा", max: 3, obtained: taraPts, desc: taraPts === 3 ? "उत्तम" : "सामान्य" });

    // 4. योनि (4 pts)
    let yoniPts = (boyNak.yoni === girlNak.yoni) ? 4 : 2;
    score += yoniPts;
    details.push({ name: "योनि", max: 4, obtained: yoniPts, desc: `वर: ${boyNak.yoni}, कन्या: ${girlNak.yoni}` });

    // 5. ग्रहमैत्री (5 pts)
    const bLord = boyRashi.lord;
    const gLord = girlRashi.lord;
    let maitriPts = 3;
    if (bLord === gLord) maitriPts = 5;
    else if (GRAHA_FRIENDSHIP[bLord] && GRAHA_FRIENDSHIP[bLord][gLord] === 1) maitriPts = 5;
    else if (GRAHA_FRIENDSHIP[bLord] && GRAHA_FRIENDSHIP[bLord][gLord] === 0) maitriPts = 3;
    else maitriPts = 1;
    score += maitriPts;
    details.push({ name: "ग्रहमैत्री", max: 5, obtained: maitriPts, desc: `राशि स्वामी: ${bLord} र ${gLord}` });

    // 6. गण (6 pts)
    let ganaPts = 0;
    if (boyNak.gana === girlNak.gana) ganaPts = 6;
    else if ((boyNak.gana === "देव" && girlNak.gana === "मनुष्य") || (boyNak.gana === "मनुष्य" && girlNak.gana === "देव")) ganaPts = 5;
    else if (boyNak.gana === "राक्षस" || girlNak.gana === "राक्षस") ganaPts = 0;
    else ganaPts = 1;
    score += ganaPts;
    details.push({ name: "गण", max: 6, obtained: ganaPts, desc: ganaPts === 0 ? "गण दोष" : "शुभ" });

    // 7. भकूट (7 pts)
    const rashiDiff = Math.abs(boyRashi.rashiId - girlRashi.rashiId);
    let bhakootPts = 7;
    // षडाष्टक (6-8) वा नवम-पञ्चम (9-5) वा द्वि-द्वादश (2-12)
    if ([1, 5, 7, 11].includes(rashiDiff)) bhakootPts = 0;
    score += bhakootPts;
    details.push({ name: "भकूट", max: 7, obtained: bhakootPts, desc: bhakootPts === 7 ? "शुभ" : "भकूट दोष" });

    // 8. नाडी (8 pts)
    let nadiPts = (boyNak.nadi !== girlNak.nadi) ? 8 : 0;
    score += nadiPts;
    details.push({ name: "नाडी", max: 8, obtained: nadiPts, desc: nadiPts === 8 ? `भिन्न नाडी (${boyNak.nadi} / ${girlNak.nadi})` : "नाडी दोष (समान नाडी)" });

    let verdict = "";
    if (score >= 28) verdict = "अति उत्तम";
    else if (score >= 21) verdict = "उत्तम";
    else if (score >= 18) verdict = "मध्यम";
    else verdict = "विचारणीय/अशुभ (दोष शान्ति आवश्यक)";

    return {
        totalScore: score,
        maxScore: 36,
        verdict: verdict,
        details: details,
        boyDetails: { rashi: boyRashi.rashiNameNp, nak: boyNak.nakshatraNameNp, gana: boyNak.gana, nadi: boyNak.nadi },
        girlDetails: { rashi: girlRashi.rashiNameNp, nak: girlNak.nakshatraNameNp, gana: girlNak.gana, nadi: girlNak.nadi }
    };
}

// ==========================================
// दैनिक पञ्चाङ्ग गणना सहायक (Daily Panchang Helpers)
// ==========================================

const SAMVATSARAS = [
    "प्रभव", "विभव", "शुक्ल", "प्रमोद", "प्रजापति", "अङ्गिरा", "श्रीमुख", "भाव", "युवा", "धाता",
    "ईश्वर", "बहुधान्य", "प्रमाथी", "विक्रम", "वृषप्रजा", "चित्रभानु", "सुभानु", "तारण", "पार्थिव", "व्यय",
    "सर्वजित्", "सर्वधारी", "विरोधी", "विकृति", "खर", "नन्दन", "विजय", "जय", "मन्मथ", "दुर्मुख",
    "हेमलम्बी", "विलम्बी", "विकारी", "शर्वरी", "प्लव", "शुभकृत्", "शोभन", "क्रोधी", "विश्वावसु", "पराभव",
    "प्लवङ्ग", "कीलक", "सौम्य", "साधारण", "विरोधकृत्", "परिधावी", "प्रमादी", "आनन्द", "राक्षस", "अनल",
    "पिङ्गल", "कालयुक्त", "सिद्धार्थी", "रौद्र", "दुर्मति", "दुन्दुभी", "रुधिरोद्गारी", "रक्ताक्ष", "क्रोधन", "क्षय"
];

const VEDIC_WEEKDAYS = [
    { id: 0, nameNp: "रविवार (भानुवासर)", shortNp: "रविवार" },
    { id: 1, nameNp: "सोमवार (इन्दुवासर)", shortNp: "सोमवार" },
    { id: 2, nameNp: "मङ्गलवार (भौमवासर)", shortNp: "मङ्गलवार" },
    { id: 3, nameNp: "बुधवार (सौम्यवासर)", shortNp: "बुधवार" },
    { id: 4, nameNp: "बृहस्पतिवार (गुरुवासर)", shortNp: "बृहस्पतिवार" },
    { id: 5, nameNp: "शुक्रवार (भृगुवासर)", shortNp: "शुक्रवार" },
    { id: 6, nameNp: "शनिवार (स्थिरवासर)", shortNp: "शनिवार" }
];

/**
 * अङ्कहरूलाई नेपाली देवनागरी अङ्कमा रूपान्तरण गर्छ
 */
function toNepaliDigits(val) {
    if (val === null || val === undefined) return "";
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return val.toString().replace(/\d/g, d => nepaliDigits[parseInt(d, 10)]);
}

/**
 * सूर्यको अयन निर्धारण गर्छ (उत्तरायण / दक्षिणायन)
 */
function getAyana(sunDeg) {
    const norm = normalizeDeg(sunDeg);
    // 270° (Makar) देखि 90° (Karkat) सम्म = उत्तरायण
    if (norm >= 270 || norm < 90) {
        return "उत्तरायण";
    } else {
        return "दक्षिणायन";
    }
}

/**
 * वैदिक ६ ऋतुहरू (वसन्त, ग्रीष्म, वर्षा, शरद्, हेमन्त, शिशिर)
 * १. वसन्त: चैत्र - वैशाख (१२, १)
 * २. ग्रीष्म: ज्येष्ठ - आषाढ (२, ३)
 * ३. वर्षा: श्रावण - भाद्रपद (४, ५)
 * ४. शरद्: आश्विन - कार्तिक (६, ७)
 * ५. हेमन्त: मार्गशीर्ष - पौष (८, ९)
 * ६. शिशिर: माघ - फाल्गुन (१०, ११)
 */
function getRitu(bsMonth) {
    if (bsMonth === 12 || bsMonth === 1) return "वसन्त";
    if (bsMonth === 2 || bsMonth === 3) return "ग्रीष्म";
    if (bsMonth === 4 || bsMonth === 5) return "वर्षा";
    if (bsMonth === 6 || bsMonth === 7) return "शरद्";
    if (bsMonth === 8 || bsMonth === 9) return "हेमन्त";
    if (bsMonth === 10 || bsMonth === 11) return "शिशिर";
    return "शरद्";
}

/**
 * सम्पूर्ण दैनिक पञ्चाङ्ग गणना गर्छ
 */
function calculateDailyPanchanga(bsYear, bsMonth, bsDay, lat = 27.7172, lon = 85.3240, siddhanta = "surya") {
    const adDate = bsToAd(bsYear, bsMonth, bsDay);
    // Sunrise calculation at local place
    const tz = (typeof NEPAL_TZ_OFFSET !== 'undefined') ? NEPAL_TZ_OFFSET : 5.75;
    const sunRiseSet = calculateSunRiseSet(adDate, lat, lon, tz);

    // Astronomical position at sunrise
    const sunriseUtc = new Date(adDate.getTime() + (sunRiseSet.sunrise - tz) * 3600 * 1000);
    const jd = getJulianDay(sunriseUtc);
    
    const isSurya = (siddhanta || "").toLowerCase().includes("surya");
    const ayanamsha = isSurya ? getSuryaSiddhantaAyanamsha(jd) : getLahiriAyanamsha(jd);
    const planets = isSurya ? calculateSuryaSiddhantaPlanets(jd, ayanamsha) : calculatePlanetPositions(jd, ayanamsha);

    const sunDeg = planets.Surya.deg;
    const moonDeg = planets.Chandra.deg;
    const guruDeg = planets.Guru.deg;

    // 1. संवत्सर (नेपाली पञ्चाङ्ग परम्परा अनुसार २०८३ = रौद्र)
    const samvatIdx = ((bsYear - 2030) % 60 + 60) % 60;
    const samvatsara = SAMVATSARAS[samvatIdx] || "रौद्र";

    // 2. अयन, ऋतु
    const ayana = getAyana(sunDeg);
    const ritu = getRitu(bsMonth);

    // 3. सौरमास र शास्त्रीय चान्द्रमास (Lunar Month) गणना
    const VEDIC_MASA_NAMES = [
        "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन",
        "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"
    ];
    const sauraMasa = VEDIC_MASA_NAMES[bsMonth - 1] || "कार्तिक";

    const tithiInfo = calculateTithi(sunDeg, moonDeg);
    const diff = normalizeDeg(moonDeg - sunDeg);
    const tithiIdx = Math.floor(diff / 12.0);
    const isShukla = (tithiIdx < 15);
    const paksha = isShukla ? "शुक्ल" : "कृष्ण";

    // शास्त्रीय चान्द्रमास (पूर्णिमान्त धर्मशास्त्रीय पद्धति):
    // शुक्ल पक्षमा अघिल्लो औँसी जुन राशिमा भएको थियो सोही मासको शुक्ल पक्ष रहन्छ (पूर्णिमासम्म परिवर्तन हुँदैन)।
    // कृष्ण पक्षमा आगामी औँसीको राशि अनुसारको पूर्णिमान्त मास रहन्छ।
    let chandraMasaIdx;
    if (isShukla) {
        const daysSinceAmavasya = diff / 12.19;
        const sunAtAmavasya = normalizeDeg(sunDeg - daysSinceAmavasya * 0.9856);
        chandraMasaIdx = Math.floor(sunAtAmavasya / 30.0);
    } else {
        const daysToAmavasya = (360.0 - diff) / 12.19;
        const sunAtNextAmavasya = normalizeDeg(sunDeg + daysToAmavasya * 0.9856);
        chandraMasaIdx = Math.floor(sunAtNextAmavasya / 30.0);
    }
    const chandraMasa = VEDIC_MASA_NAMES[chandraMasaIdx] || sauraMasa;
    const chandraMonthNum = chandraMasaIdx + 1; // 1 to 12

    // नेपाल संवत् (अमान्त मान):
    const NS_MONTH_NAMES = [
        "बछला", "तछला", "दिल्ला", "गुँला", "ञंला", "कौला",
        "कछला", "थिंला", "पोँहेला", "सिल्ला", "चिल्ला", "चौला"
    ];
    const daysSincePrecedingAmavasya = diff / 12.19;
    const sunAtPrecedingAmavasya = normalizeDeg(sunDeg - daysSincePrecedingAmavasya * 0.9856);
    const amantaMasaIdx = Math.floor(sunAtPrecedingAmavasya / 30.0);
    const nsMasaBase = NS_MONTH_NAMES[amantaMasaIdx] || "कौला";
    const nsSuffix = isShukla ? "थ्व" : "गा";
    const nepalSambatPaksha = `${nsMasaBase}${nsSuffix}`;
    const nepalSambatYear = (amantaMasaIdx >= 6) ? (bsYear - 936) : (bsYear - 937);

    // शालिवाहन शाके
    const shakaYear = bsYear - 135;

    // 4. बार (Weekday)
    const weekdayIdx = adDate.getDay();
    const vaar = VEDIC_WEEKDAYS[weekdayIdx];

    // 5. नक्षत्र, योग, करण
    const nakInfo = getNakshatraDetails(moonDeg);
    const yogaName = calculateYoga(sunDeg, moonDeg);
    const karanaName = calculateKarana(sunDeg, moonDeg);

    // 6. घटी:पला (Remaining duration from sunrise)
    const remTithiDeg = 12.0 - (diff % 12.0);
    const tithiGhatiVal = (remTithiDeg / 12.2) * 60.0;
    const tithiGhatiPala = formatGhatiPala(tithiGhatiVal);

    const remNakDeg = (360.0 / 27.0) - (moonDeg % (360.0 / 27.0));
    const nakGhatiVal = (remNakDeg / 13.176) * 60.0;
    const nakGhatiPala = nakGhatiVal >= 58 ? "अहोरात्र" : formatGhatiPala(nakGhatiVal);

    const sumDeg = normalizeDeg(sunDeg + moonDeg);
    const remYogaDeg = (360.0 / 27.0) - (sumDeg % (360.0 / 27.0));
    const yogaGhatiVal = (remYogaDeg / 14.16) * 60.0;
    const yogaGhatiPala = formatGhatiPala(yogaGhatiVal);

    const remKaranaDeg = 6.0 - (diff % 6.0);
    const karanaGhatiVal = (remKaranaDeg / 12.2) * 60.0;
    const karanaGhatiPala = formatGhatiPala(karanaGhatiVal);

    // 7. ग्रह राशिहरू
    const chandraRashiObj = getRashiDetails(moonDeg);
    const chandraRashi = chandraRashiObj.rashiNameNp;
    const suryaRashi = getRashiDetails(sunDeg).rashiNameNp;
    const guruRashi = getRashiDetails(guruDeg).rashiNameNp;

    // चन्द्र राशि परिवर्तन समय (Moon Rashi Transit Timing)
    const moonSpeed = (planets.Chandra && typeof planets.Chandra.speed === "number" && planets.Chandra.speed > 0)
        ? planets.Chandra.speed
        : 13.176358;
    const degInCurrentRashi = moonDeg % 30.0;
    const degToNextRashi = 30.0 - degInCurrentRashi;
    const hoursToNextRashi = (degToNextRashi / moonSpeed) * 24.0;
    const ghatiToNextRashi = (degToNextRashi / moonSpeed) * 60.0;
    const nextRashiIdx = (Math.floor(moonDeg / 30.0) + 1) % 12;
    const nextRashiName = (typeof RASHIS !== "undefined" && RASHIS[nextRashiIdx]) ? RASHIS[nextRashiIdx].nameNp : "";

    let chandraRashiChangeTimeNp = "अहोरात्र";
    let chandraRashiChangeFull = `${chandraRashi} राशि अहोरात्र (दिनभर)`;
    let chandraRashiGhatiPalaNp = "अहोरात्र";

    if (hoursToNextRashi < 24.0 && ghatiToNextRashi < 59.5) {
        const transitDecHour = (sunRiseSet.sunrise + hoursToNextRashi) % 24.0;
        const tH = Math.floor(transitDecHour);
        const tM = Math.floor((transitDecHour - tH) * 60.0);
        const timeStr = `${tH.toString().padStart(2, "0")}:${tM.toString().padStart(2, "0")}`;
        const timeNp = toNepaliDigits(timeStr);
        chandraRashiChangeTimeNp = `${timeNp} सम्म`;
        chandraRashiChangeFull = `${chandraRashi} राशि ${timeNp} बजेसम्म, त्यसपछि ${nextRashiName}`;
        chandraRashiGhatiPalaNp = toNepaliDigits(formatGhatiPala(ghatiToNextRashi));
    }

    const adMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const adMonthStr = adMonthNames[adDate.getUTCMonth()];
    const adYearStr = adDate.getUTCFullYear();
    const adDayStr = adDate.getUTCDate();

    return {
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDay: bsDay,
        bsDateStrNp: `${toNepaliDigits(bsYear)} ${sauraMasa} ${toNepaliDigits(bsDay)} गते`,
        adDate: adDate,
        adDateStr: `${adYearStr} ${adMonthStr} ${adDayStr}`,
        shakaYearNp: toNepaliDigits(shakaYear),
        nepalSambatNp: toNepaliDigits(nepalSambatYear),
        nepalSambatMasa: nsMasaBase,
        nepalSambatPaksha: nepalSambatPaksha,
        samvatsara: samvatsara,
        ayana: ayana,
        ritu: ritu,
        sauraMasa: sauraMasa,
        chandraMasa: chandraMasa,
        chandraMasaIdx: chandraMasaIdx,
        chandraMonthNum: chandraMonthNum,
        masa: chandraMasa,
        paksha: paksha,
        sunriseNp: toNepaliDigits(sunRiseSet.sunriseStr.slice(0, 5)),
        sunsetNp: toNepaliDigits(sunRiseSet.sunsetStr.slice(0, 5)),
        tithiName: tithiInfo.name,
        tithiGhatiPalaNp: toNepaliDigits(tithiGhatiPala),
        vaarName: vaar.shortNp,
        vaarFull: vaar.nameNp,
        nakshatraName: nakInfo.nakshatraNameNp,
        nakshatraGhatiPalaNp: nakGhatiPala === "अहोरात्र" ? "अहोरात्र" : toNepaliDigits(nakGhatiPala),
        yogaName: yogaName,
        yogaGhatiPalaNp: toNepaliDigits(yogaGhatiPala),
        karanaName: karanaName,
        karanaGhatiPalaNp: toNepaliDigits(karanaGhatiPala),
        chandraRashi: chandraRashi,
        chandraRashiChangeTimeNp: chandraRashiChangeTimeNp,
        chandraRashiChangeFull: chandraRashiChangeFull,
        chandraRashiGhatiPalaNp: chandraRashiGhatiPalaNp,
        nextChandraRashi: nextRashiName,
        suryaRashi: suryaRashi,
        guruRashi: guruRashi,
        siddhanta: isSurya ? "surya" : "drik",
        siddhantaName: isSurya ? "सूर्य-सिद्धान्त (वेदश्चक्षु १.०)" : "दृक्-सिद्धान्त (वेदश्चक्षु १.०)",
        ayanamsha: ayanamsha,
        planets: planets
    };
}

function formatGhatiPala(val) {
    let g = Math.floor(val);
    let p = Math.floor((val - g) * 60.0);
    if (g >= 60) g = g % 60;
    return `${g.toString().padStart(2, '0')}:${p.toString().padStart(2, '0')}`;
}

// ==========================================
// परम्परागत जन्मपत्रिका (चीना) सहायकहरू (Janmapatrika Helpers)
// ==========================================

const GHATA_CHAKRA = {
    "मेष": { tithi: "१ । ६ । ११", vaar: "आइत", nak: "मघा", lagna: "मेष", rashi: "वृश्चिक" },
    "वृष": { tithi: "५ । १० । १५", vaar: "शनि", nak: "हस्त", lagna: "वृष", rashi: "कन्या" },
    "मिथुन": { tithi: "२ । ७ । १२", vaar: "सोम", nak: "स्वाति", lagna: "कर्क", rashi: "कुम्भ" },
    "कर्कट": { tithi: "२ । ७ । १२", vaar: "बुध", nak: "अनुराधा", lagna: "कन्या", rashi: "सिंह" },
    "सिंह": { tithi: "३ । ८ । १३", vaar: "शनि", nak: "मूल", lagna: "तुला", rashi: "मकर" },
    "कन्या": { tithi: "५ । १० । १५", vaar: "शनि", nak: "श्रवण", lagna: "वृश्चिक", rashi: "मिथुन" },
    "तुला": { tithi: "४ । ९ । १४", vaar: "बृहस्पति", nak: "शतभिषा", lagna: "धनु", rashi: "धनु" },
    "वृश्चिक": { tithi: "५ । १० । १५", vaar: "शुक्र", nak: "रेवती", lagna: "मकर", rashi: "वृष" },
    "धनु": { tithi: "१ । ६ । ११", vaar: "शुक्र", nak: "भरणी", lagna: "कुम्भ", rashi: "तुला" },
    "मकर": { tithi: "४ । ९ । १४", vaar: "मङ्गल", nak: "रोहिणी", lagna: "मीन", rashi: "मेष" },
    "कुम्भ": { tithi: "३ । ८ । १३", vaar: "बृहस्पति", nak: "आर्द्रा", lagna: "धनु", rashi: "धनु" },
    "मीन": { tithi: "१ । ६ । ११", vaar: "शुक्र", nak: "अश्लेषा", lagna: "कुम्भ", rashi: "मीन" }
};

const SANSKRIT_MASA_NAMES = [
    "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन",
    "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"
];

const AD_MONTH_NAMES_NP = [
    "जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन",
    "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"
];

const SANSKRIT_VAARA_NAMES = [
    "रवि", "सोम", "भौम", "बुध", "बृहस्पति", "शुक्र", "शनि"
];

const NAKSHATRA_ASANA = [
    "सर्प", "सर्प", "श्वान", "श्वान", "सर्प", "सर्प", "श्वान", "श्वान", "मार्जार",
    "मूषक", "मूषक", "गौ", "महिष", "व्याघ्र", "महिष", "व्याघ्र", "मृग", "मृग",
    "श्वान", "वानर", "नकुल", "वानर", "सिंह", "अश्व", "सिंह", "गौ", "गज"
];

function getVarga(letter) {
    if (!letter) return "मार्जार";
    const firstChar = letter.charAt(0);
    const vowels = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ए", "ऐ", "ओ", "औ", "अं", "अः"];
    if (vowels.includes(firstChar)) return "गरुड";
    if (["क", "ख", "ग", "घ", "ङ"].includes(firstChar)) return "मार्जार";
    if (["च", "छ", "ज", "झ", "ञ"].includes(firstChar)) return "सिंह";
    if (["ट", "ठ", "ड", "ढ", "ण"].includes(firstChar)) return "श्वान";
    if (["त", "थ", "द", "ध", "न"].includes(firstChar)) return "सर्प";
    if (["प", "फ", "ब", "भ", "म"].includes(firstChar)) return "मूषक";
    if (["य", "र", "ल", "व"].includes(firstChar)) return "मृग";
    return "मेष";
}

function getAsana(nakId) {
    return NAKSHATRA_ASANA[(nakId - 1) % 27] || "सर्प";
}

function getVarna(rashiId) {
    if ([4, 8, 12].includes(rashiId)) return "ब्राह्मण";
    if ([1, 5, 9].includes(rashiId)) return "क्षत्रिय";
    if ([2, 6, 10].includes(rashiId)) return "वैश्य";
    return "शूद्र";
}

function getPadaName(pada) {
    const names = ["प्रथम", "द्वितीय", "तृतीय", "चतुर्थ"];
    return names[(pada - 1) % 4] || "प्रथम";
}

function getNextTithiName(tithiNum) {
    const tithiNames = [
        "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी",
        "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
        "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा",
        "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी",
        "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
        "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"
    ];
    return tithiNames[tithiNum % 30];
}

function calculateLMT(timeStr, lonDeg, standardLon = 86.25) {
    const parts = (timeStr || "12:00:00").split(":").map(Number);
    const h = parts[0] || 0;
    const m = parts[1] || 0;
    const s = parts[2] || 0;
    const totalSec = h * 3600 + m * 60 + s;
    const diffDeg = lonDeg - standardLon;
    const offsetSec = Math.round(diffDeg * 240);
    let lmtSec = (totalSec + offsetSec + 86400) % 86400;
    const lh = Math.floor(lmtSec / 3600);
    const lm = Math.floor((lmtSec % 3600) / 60);
    const ls = lmtSec % 60;
    return `${lh.toString().padStart(2, '0')}:${lm.toString().padStart(2, '0')}:${ls.toString().padStart(2, '0')}`;
}

function calculateBhabhogaAndBhukta(moonDeg) {
    const nakInfo = getNakshatraDetails(moonDeg);
    const bhabhogaVal = 55.783; // मानक भभोग मान (~५५ घटि ४७ पला)
    const bhuktaVal = bhabhogaVal * nakInfo.elapsedFraction;
    const remVal = bhabhogaVal - bhuktaVal;
    return {
        bhabhogaStrNp: toNepaliDigits(formatGhatiPala(bhabhogaVal)),
        bhuktaStrNp: toNepaliDigits(formatGhatiPala(bhuktaVal)),
        remStrNp: toNepaliDigits(formatGhatiPala(remVal))
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        calculateDailyPanchanga,
        getRitu,
        calculateVimshottariDasha,
        calculateTribhagiDasha,
        calculateYoginiDasha,
        toNepaliDigits,
        VIMSHOTTARI_LORDS,
        YOGINI_LIST,
        TRIBHAGI_LORDS
    };
}

