/**
 * chart_renderer.js - उत्तर भारतीय (North Indian / वैदिक) कुण्डली चक्र SVG रेन्डरर
 * Kundali Darsan Web
 */

// ग्रहहरूको संक्षिप्त नेपाली नाम
const PLANET_SHORT_NAMES = {
    Surya: "सू",
    Chandra: "चं",
    Mangal: "मं",
    Budha: "बु",
    Guru: "गु",
    Shukra: "शु",
    Shani: "श",
    Rahu: "रा",
    Ketu: "के"
};

// कुण्डली चक्रका अक्षरहरूको परम्परागत सुन्दर सेरिफ फन्ट
const CHART_SERIF_FONT = "'Noto Serif Devanagari', 'Martel', 'Tiro Devanagari Sanskrit', serif";

/**
 * ग्रहको नाम र वक्री संकेत फर्म्याट गर्छ
 */
function formatPlanetLabel(p, fontSize = 14) {
    if (p.includes("(व)")) {
        const base = p.replace("(व)", "");
        const retroSize = Math.max(9, Math.round(fontSize * 0.78));
        return `${base}<tspan fill="#A51D24" font-size="${retroSize}" font-weight="700">(व)</tspan>`;
    }
    return p;
}

/**
 * भावभित्र ग्रहहरूको अक्षरहरू रेखा सीमा भित्र रहनेगरी पूर्ण सुरक्षाका साथ व्यवस्थित गर्छ
 * कुनै पनि ग्रह वा वक्री संकेतले चक्रको रेखालाई नछोओस् भन्ने सुनिश्चित गर्छ
 */
function renderHousePlanetsSVG(pList, pos) {
    if (!pList || pList.length === 0) return "";
    const posX = pos.pX;
    const posY = pos.pY;
    const type = pos.type; // 'diamond-v' | 'diamond-h' | 'triangle-v' | 'triangle-h'
    const N = pList.length;

    // १ ग्रह: भावको केन्द्रबिन्दुमा
    if (N === 1) {
        return `<text x="${posX}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="14.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 14.5)}</text>`;
    }

    // २ ग्रहहरू: भावको ज्यामितीय स्वरूपअनुसार व्यवस्थापन
    if (N === 2) {
        if (type === 'triangle-v') {
            // ठाडो त्रिकोण (भाव ३, ५, ९, ११) - ठाडो २ लाइनमा मिलाउने ताकि कुनै पनि रेखालाई नछोओस्
            return `
                <text x="${posX}" y="${posY - 11}" font-family="${CHART_SERIF_FONT}" font-size="13.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 13.5)}</text>
                <text x="${posX}" y="${posY + 12}" font-family="${CHART_SERIF_FONT}" font-size="13.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 13.5)}</text>
            `;
        } else if (type === 'triangle-h') {
            // तेर्सो त्रिकोण (भाव २, ६, ८, १२) - तेर्सो २ स्थानमा मिलाउने
            return `
                <text x="${posX - 16}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="13.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 13.5)}</text>
                <text x="${posX + 16}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="13.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 13.5)}</text>
            `;
        } else if (type === 'diamond-v') {
            // केन्द्र भाव १ र ७ (Diamond Top/Bottom)
            return `
                <text x="${posX - 17}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="14" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 14)}</text>
                <text x="${posX + 17}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="14" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 14)}</text>
            `;
        } else {
            // केन्द्र भाव ४ र १० (Diamond Left/Right)
            return `
                <text x="${posX - 16}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="14" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 14)}</text>
                <text x="${posX + 16}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="14" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 14)}</text>
            `;
        }
    }

    // ३ ग्रहहरू
    if (N === 3) {
        if (type === 'triangle-v') {
            // ठाडो त्रिकोण (३, ५, ९, ११) मा ३ ग्रह ठाडो लाइनमा पूर्ण सुरक्षित
            return `
                <text x="${posX}" y="${posY - 17}" font-family="${CHART_SERIF_FONT}" font-size="12" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 12)}</text>
                <text x="${posX}" y="${posY}" font-family="${CHART_SERIF_FONT}" font-size="12" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 12)}</text>
                <text x="${posX}" y="${posY + 17}" font-family="${CHART_SERIF_FONT}" font-size="12" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[2], 12)}</text>
            `;
        } else {
            // अन्य भावहरूमा २ माथि र १ तल
            return `
                <text x="${posX - 15}" y="${posY - 9}" font-family="${CHART_SERIF_FONT}" font-size="12.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 12.5)}</text>
                <text x="${posX + 15}" y="${posY - 9}" font-family="${CHART_SERIF_FONT}" font-size="12.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 12.5)}</text>
                <text x="${posX}" y="${posY + 11}" font-family="${CHART_SERIF_FONT}" font-size="12.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[2], 12.5)}</text>
            `;
        }
    }

    // ४ ग्रहहरू
    if (N === 4) {
        if (type === 'triangle-v') {
            return `
                <text x="${posX}" y="${posY - 21}" font-family="${CHART_SERIF_FONT}" font-size="11" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 11)}</text>
                <text x="${posX}" y="${posY - 7}" font-family="${CHART_SERIF_FONT}" font-size="11" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 11)}</text>
                <text x="${posX}" y="${posY + 7}" font-family="${CHART_SERIF_FONT}" font-size="11" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[2], 11)}</text>
                <text x="${posX}" y="${posY + 21}" font-family="${CHART_SERIF_FONT}" font-size="11" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[3], 11)}</text>
            `;
        } else {
            // २x२ ग्रिड
            return `
                <text x="${posX - 15}" y="${posY - 9}" font-family="${CHART_SERIF_FONT}" font-size="11.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[0], 11.5)}</text>
                <text x="${posX + 15}" y="${posY - 9}" font-family="${CHART_SERIF_FONT}" font-size="11.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[1], 11.5)}</text>
                <text x="${posX - 15}" y="${posY + 11}" font-family="${CHART_SERIF_FONT}" font-size="11.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[2], 11.5)}</text>
                <text x="${posX + 15}" y="${posY + 11}" font-family="${CHART_SERIF_FONT}" font-size="11.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(pList[3], 11.5)}</text>
            `;
        }
    }

    // ५ वा बढी ग्रहहरू हुँदा २ पंक्तिमा व्यवस्थित गर्ने
    const row1 = pList.slice(0, Math.ceil(N / 2));
    const row2 = pList.slice(Math.ceil(N / 2));
    let out = "";
    const gap = 22;
    const startX1 = posX - ((row1.length - 1) * gap) / 2;
    row1.forEach((p, i) => {
        out += `<text x="${startX1 + i * gap}" y="${posY - 9}" font-family="${CHART_SERIF_FONT}" font-size="11" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(p, 11)}</text>`;
    });
    const startX2 = posX - ((row2.length - 1) * gap) / 2;
    row2.forEach((p, i) => {
        out += `<text x="${startX2 + i * gap}" y="${posY + 11}" font-family="${CHART_SERIF_FONT}" font-size="11" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${formatPlanetLabel(p, 11)}</text>`;
    });
    return out;
}

/**
 * उत्तर भारतीय कुण्डली चक्र (शास्त्रीय समचतुर्भुज ढाँचा) को SVG स्ट्रिङ तयार गर्छ
 * @param {number} lagnaRashiId - लग्न राशिको नम्बर (१ देखि १२)
 * @param {Array<{name: string, rashiId: number, isRetrograde: boolean}>} planetsList - ग्रहहरूको सूची
 * @param {string} title - चक्रको शीर्षक (जस्तै "लग्न कुण्डली", "नवमांश कुण्डली")
 * @param {number} size - अधिकतम चौडाइ (default: 360)
 * @returns {string} SVG HTML String
 */
function renderNorthIndianChart(lagnaRashiId, planetsList, title = "लग्न कुण्डली", size = 360) {
    const W = 360;
    const H = 360;

    // १२ वटा भावहरूमा कुन-कुन राशि पर्छन् (House 1 to 12)
    const houseRashis = {};
    for (let h = 1; h <= 12; h++) {
        houseRashis[h] = ((lagnaRashiId - 1 + (h - 1)) % 12) + 1;
    }

    // प्रत्येक भावमा कुन-कुन ग्रह छन्
    const housePlanets = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };
    planetsList.forEach(p => {
        for (let h = 1; h <= 12; h++) {
            if (houseRashis[h] === p.rashiId) {
                const label = PLANET_SHORT_NAMES[p.name] || p.name;
                const retro = p.isRetrograde ? "(व)" : "";
                housePlanets[h].push(`${label}${retro}`);
                break;
            }
        }
    });

    // प्रत्येक भावको लागि राशि नम्बर राख्ने स्थान (Coordinates) र ग्रहहरूको केन्द्रबिन्दु
    // शास्त्रीय कर्ण तथा समचतुर्भुज रेखाहरूसँग पूर्ण सुरक्षित अन्तर (Generous Clearance) कायम गरिएको छ
    const housePos = {
        1:  { numX: 180, numY: 34,  pX: 180, pY: 104, type: 'diamond-v' },  // प्रथम भाव (तनु / लग्न - माथिल्लो केन्द्र भाव)
        2:  { numX: 95,  numY: 25,  pX: 95,  pY: 60,  type: 'triangle-h' }, // दोस्रो भाव (धन - माथि-बायाँ त्रिकोण)
        3:  { numX: 25,  numY: 95,  pX: 60,  pY: 95,  type: 'triangle-v' }, // तेस्रो भाव (सहज - बायाँ-माथि त्रिकोण)
        4:  { numX: 34,  numY: 180, pX: 104, pY: 180, type: 'diamond-h' },  // चौथो भाव (सुख - बायाँ केन्द्र भाव)
        5:  { numX: 25,  numY: 265, pX: 60,  pY: 265, type: 'triangle-v' }, // पाँचौं भाव (सुत - बायाँ-तल त्रिकोण)
        6:  { numX: 95,  numY: 335, pX: 95,  pY: 300, type: 'triangle-h' }, // छैटौं भाव (रिपु - तल-बायाँ त्रिकोण)
        7:  { numX: 180, numY: 326, pX: 180, pY: 256, type: 'diamond-v' },  // सातौं भाव (जाया - तल्लो केन्द्र भाव)
        8:  { numX: 265, numY: 335, pX: 265, pY: 300, type: 'triangle-h' }, // आठौं भाव (आयु - तल-दायाँ त्रिकोण)
        9:  { numX: 335, numY: 265, pX: 300, pY: 265, type: 'triangle-v' }, // नवौं भाव (भाग्य - दायाँ-तल त्रिकोण)
        10: { numX: 326, numY: 180, pX: 256, pY: 180, type: 'diamond-h' },  // दशौं भाव (कर्म - दायाँ केन्द्र भाव)
        11: { numX: 335, numY: 95,  pX: 300, pY: 95,  type: 'triangle-v' }, // एघारौं भाव (आय - दायाँ-माथि त्रिकोण)
        12: { numX: 265, numY: 25,  pX: 265, pY: 60,  type: 'triangle-h' }  // बाह्रौं भाव (व्यय - माथि-दायाँ त्रिकोण)
    };

    let textElements = "";

    for (let h = 1; h <= 12; h++) {
        const pos = housePos[h];
        const rashiNum = houseRashis[h];
        const pList = housePlanets[h];

        // Rashi number text (रातो, प्रस्ट र परम्परागत सेरिफ - Bold Sacred Red)
        textElements += `
            <text x="${pos.numX}" y="${pos.numY}" font-family="${CHART_SERIF_FONT}" font-size="13.5" font-weight="700" fill="#9E1B1B" text-anchor="middle" dominant-baseline="middle">${rashiNum}</text>
        `;

        // Planets in this house
        textElements += renderHousePlanetsSVG(pList, pos);
    }

    return `
    <div class="chart-wrapper">
        <h4 class="chart-title">${title}</h4>
        <svg viewBox="0 0 ${W} ${H}" class="kundali-svg" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: ${size}px; height: auto;">
            <!-- कुण्डलीको एकरूप क्रिम ब्याकग्राउन्ड (Clean Traditional Cream Background) -->
            <rect width="360" height="360" rx="4" fill="#FAF6EE" stroke="none" />

            <!-- Outer Frame - परम्परागत सिन्दूरे रातो तथा स्वर्णिम चौघेरा (Traditional Sacred Red & Gold Border) -->
            <rect x="4" y="4" width="352" height="352" rx="3" ry="3" fill="none" stroke="#8B1113" stroke-width="1.8" />
            <rect x="6.5" y="6.5" width="347" height="347" fill="none" stroke="#D4AF37" stroke-width="1.2" stroke-dasharray="3,1.5" opacity="0.9" />
            <rect x="10" y="10" width="340" height="340" fill="none" stroke="#8B1113" stroke-width="2.2" />

            <!-- कुण्डलीका मूल रेखाहरू (Main Classical North Indian Geometry in Sacred Red) -->
            <!-- १. मुख्य कर्ण रेखाहरू (Full Diagonals) -->
            <line x1="10" y1="10" x2="350" y2="350" stroke="#8B1113" stroke-width="2.2" stroke-linecap="round" />
            <line x1="10" y1="350" x2="350" y2="10" stroke="#8B1113" stroke-width="2.2" stroke-linecap="round" />

            <!-- २. भित्री समचतुर्भुज (Central Inner Diamond / Makar Rekha) -->
            <polygon points="180,10 10,180 180,350 350,180" fill="none" stroke="#8B1113" stroke-width="2.2" stroke-linejoin="round" />

            <!-- राशि अङ्क तथा ग्रहहरू (Rashi Numbers & Planets) -->
            ${textElements}
        </svg>
    </div>
    `;
}

/**
 * होरा कुण्डली (D2) का लागि शास्त्रीय दुई कोठे (२-Chamber) चक्र SVG रेन्डर गर्छ
 * प्रयोगकर्ताको निर्दिष्ट ढाँचा अनुसार:
 * - बाहिरी समकोण वर्गाकार घेरा (Outer Sharp Square Box)
 * - भित्री कुना घुमाउरो आयत (Inner Rounded Rectangle Box)
 * - मध्य तेर्सो विभाजक रेखा (Horizontal Central Dividing Line)
 * - माथिल्लो कोठा: सूर्य होरा (सिंह - ५)
 * - तल्लो कोठा: चन्द्र होरा (कर्कट - ४)
 * 
 * @param {Object} data - कुण्डली डेटा (horaLagna, horaPlanets, planets)
 * @param {string} title - शीर्षक (Default: "होरा कुण्डली")
 * @param {number} size - अधिकतम चौडाइ (Default: 360)
 * @returns {string} SVG HTML string
 */
function renderHoraTwoChamberChart(data, title = "होरा कुण्डली", size = 360) {
    const W = 360;
    const H = 360;

    const sunPlanets = [];
    const moonPlanets = [];

    const isLagnaInSun = (data.horaLagna && data.horaLagna.id === 5);

    // लग्न थप्ने
    if (isLagnaInSun) {
        sunPlanets.push({ name: "लग्न", isLagna: true });
    } else {
        moonPlanets.push({ name: "लग्न", isLagna: true });
    }

    // ९ ग्रहहरू विभाजन
    const keys = ["Surya", "Chandra", "Mangal", "Budha", "Guru", "Shukra", "Shani", "Rahu", "Ketu"];
    keys.forEach(k => {
        const horaRashi = data.horaPlanets && data.horaPlanets[k] ? data.horaPlanets[k].id : 5;
        const isRetro = (k === "Rahu" || k === "Ketu") ? true : (data.planets && data.planets[k]?.isRetrograde || false);
        const shortName = PLANET_SHORT_NAMES[k] || k;

        const pObj = {
            name: shortName,
            isRetrograde: isRetro,
            isLagna: false
        };

        if (horaRashi === 5) {
            sunPlanets.push(pObj);
        } else {
            moonPlanets.push(pObj);
        }
    });

    // कोठाभित्र ग्रहहरू तेर्सो पंक्तिमा मिलाएर रेन्डर गर्ने सहायक फङ्सन
    function renderChamberPlanets(pList, centerY) {
        if (!pList || pList.length === 0) {
            return `<text x="180" y="${centerY}" font-family="${CHART_SERIF_FONT}" font-size="13.5" font-weight="600" fill="#888" text-anchor="middle" dominant-baseline="middle">रिक्त (कुनै ग्रह छैन)</text>`;
        }

        let out = '';
        const N = pList.length;

        if (N <= 5) {
            // १ देखि ५ ग्रहहरू एउटै तेर्सो पंक्तिमा मिलाउने
            const gap = N <= 3 ? 54 : (N === 4 ? 48 : 44);
            const startX = 180 - ((N - 1) * gap) / 2;

            pList.forEach((p, idx) => {
                const x = startX + idx * gap;
                const y = centerY;
                out += renderSinglePlanetBadge(p, x, y);
            });
        } else {
            // ६ वा बढी ग्रहहरू हुँदा २ पंक्तिमा व्यवस्थित गर्ने
            const n1 = Math.ceil(N / 2);
            const n2 = N - n1;
            const gap = 44;

            // पंक्ति १
            const startX1 = 180 - ((n1 - 1) * gap) / 2;
            for (let i = 0; i < n1; i++) {
                const x = startX1 + i * gap;
                const y = centerY - 21;
                out += renderSinglePlanetBadge(pList[i], x, y);
            }

            // पंक्ति २
            const startX2 = 180 - ((n2 - 1) * gap) / 2;
            for (let j = 0; j < n2; j++) {
                const x = startX2 + j * gap;
                const y = centerY + 23;
                out += renderSinglePlanetBadge(pList[n1 + j], x, y);
            }
        }

        return out;
    }

    function renderSinglePlanetBadge(p, x, y) {
        let label = p.name;
        if (p.isRetrograde) {
            label = `${p.name}<tspan fill="#A51D24" font-size="11" font-weight="700">(व)</tspan>`;
        }

        if (p.isLagna) {
            return `
                <g transform="translate(${x}, ${y})">
                    <rect x="-24" y="-13" width="48" height="26" rx="4" fill="#8B1113" />
                    <text x="0" y="1" font-family="${CHART_SERIF_FONT}" font-size="14.5" font-weight="700" fill="#FAF6EE" text-anchor="middle" dominant-baseline="middle">लग्न</text>
                </g>
            `;
        } else {
            return `
                <g transform="translate(${x}, ${y})">
                    <rect x="-20" y="-12.5" width="40" height="25" rx="4" fill="#FCF8EE" stroke="#D8C8A8" stroke-width="0.9" />
                    <text x="0" y="1" font-family="${CHART_SERIF_FONT}" font-size="14.5" font-weight="700" fill="#1C140D" text-anchor="middle" dominant-baseline="middle">${label}</text>
                </g>
            `;
        }
    }

    const sunPlanetsSVG = renderChamberPlanets(sunPlanets, 118);
    const moonPlanetsSVG = renderChamberPlanets(moonPlanets, 272);

    return `
    <div class="chart-wrapper">
        <h4 class="chart-title">${title}</h4>
        <svg viewBox="0 0 ${W} ${H}" class="kundali-svg" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: ${size}px; height: auto;">
            <!-- कुण्डलीको एकरूप क्रिम ब्याकग्राउन्ड (Clean Cream Background) -->
            <rect width="360" height="360" rx="4" fill="#FAF6EE" stroke="none" />

            <!-- १. बाहिरी समकोण वर्गाकार घेरा (Outer Sharp Square Box) -->
            <rect x="10" y="10" width="340" height="340" fill="none" stroke="#8B1113" stroke-width="2.2" />

            <!-- २. भित्री कुना घुमाउरो आयत (Inner Rounded Rectangle Box) -->
            <rect x="22" y="22" width="316" height="316" rx="34" ry="34" fill="none" stroke="#8B1113" stroke-width="2.2" />

            <!-- ३. मध्य तेर्सो विभाजक रेखा (Horizontal Central Divider Line) -->
            <line x1="22" y1="180" x2="338" y2="180" stroke="#8B1113" stroke-width="2.2" stroke-linecap="round" />

            <!-- १. माथिल्लो कोठा: सूर्य होरा (सिंह - ५) -->
            <g id="hora-kotha-surya">
                <!-- राशि अङ्क (सिंह - ५) -->
                <text x="56" y="52" font-family="${CHART_SERIF_FONT}" font-size="16" font-weight="700" fill="#9E1B1B" text-anchor="middle" dominant-baseline="middle">५</text>

                <!-- कोठा शीर्षक -->
                <text x="180" y="52" font-family="${CHART_SERIF_FONT}" font-size="15" font-weight="700" fill="#8B1113" text-anchor="middle" dominant-baseline="middle">सूर्य होरा (सिंह)</text>

                <!-- लग्न भएको अवस्थामा ब्याड्ज -->
                ${isLagnaInSun ? `
                <g transform="translate(290, 52)">
                    <rect x="-26" y="-12.5" width="52" height="25" rx="4" fill="#8B1113" />
                    <text x="0" y="1" font-family="${CHART_SERIF_FONT}" font-size="13" font-weight="700" fill="#FAF6EE" text-anchor="middle" dominant-baseline="middle">लग्न भाव</text>
                </g>
                ` : ''}

                <!-- सूर्य होराका ग्रहहरू -->
                ${sunPlanetsSVG}
            </g>

            <!-- २. तल्लो कोठा: चन्द्र होरा (कर्कट - ४) -->
            <g id="hora-kotha-chandra">
                <!-- राशि अङ्क (कर्कट - ४) -->
                <text x="56" y="208" font-family="${CHART_SERIF_FONT}" font-size="16" font-weight="700" fill="#9E1B1B" text-anchor="middle" dominant-baseline="middle">४</text>

                <!-- कोठा शीर्षक -->
                <text x="180" y="208" font-family="${CHART_SERIF_FONT}" font-size="15" font-weight="700" fill="#8B1113" text-anchor="middle" dominant-baseline="middle">चन्द्र होरा (कर्कट)</text>

                <!-- लग्न भएको अवस्थामा ब्याड्ज -->
                ${!isLagnaInSun ? `
                <g transform="translate(290, 208)">
                    <rect x="-26" y="-12.5" width="52" height="25" rx="4" fill="#8B1113" />
                    <text x="0" y="1" font-family="${CHART_SERIF_FONT}" font-size="13" font-weight="700" fill="#FAF6EE" text-anchor="middle" dominant-baseline="middle">लग्न भाव</text>
                </g>
                ` : ''}

                <!-- चन्द्र होराका ग्रहहरू -->
                ${moonPlanetsSVG}
            </g>
        </svg>
    </div>
    `;
}

if (typeof window !== "undefined") {
    window.renderNorthIndianChart = renderNorthIndianChart;
    window.renderHoraTwoChamberChart = renderHoraTwoChamberChart;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        renderNorthIndianChart,
        renderHoraTwoChamberChart,
        PLANET_SHORT_NAMES,
        CHART_SERIF_FONT
    };
}
