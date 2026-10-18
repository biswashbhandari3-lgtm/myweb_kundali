/**
 * phaladesh_engine.js - कुण्डली फलादेश गणना तथा प्रस्तुतीकरण इन्जिन
 * Kundali Darsan Web
 */

// ग्रहहरूको नम्बर कोड (Mansagari / Phalit MDB अनुसार)
const GRAHA_ID_MAP = {
    Surya: 1,
    Chandra: 2,
    Mangal: 3,
    Budha: 4,
    Guru: 5,
    Shukra: 6,
    Shani: 7,
    Rahu: 8,
    Ketu: 9
};

// ग्रहहरूको नेपाली नाम
const GRAHA_NAMES_NP = {
    Surya: "सूर्य",
    Chandra: "चन्द्र",
    Mangal: "मङ्गल",
    Budha: "बुध",
    Guru: "गुरु",
    Shukra: "शुक्र",
    Shani: "शनि",
    Rahu: "राहु",
    Ketu: "केतु"
};

// १२ भावहरूको शास्त्रीय नाम
const BHAV_TITLES_NP = {
    1: "प्रथम भाव (तनु / लग्न भाव)",
    2: "द्वितीय भाव (धन / कुटुम्ब भाव)",
    3: "तृतीय भाव (सहज / पराक्रम भाव)",
    4: "चतुर्थ भाव (सुख / मातृ भाव)",
    5: "पञ्चम भाव (सुत / विद्या भाव)",
    6: "षष्ठ भाव (रिपु / रोग भाव)",
    7: "सप्तम भाव (जाया / दाम्पत्य भाव)",
    8: "अष्टम भाव (आयु / रन्ध्र भाव)",
    9: "नवम भाव (भाग्य / धर्म भाव)",
    10: "दशम भाव (कर्म / राज्य भाव)",
    11: "एकादश भाव (आय / लाभ भाव)",
    12: "द्वादश भाव (व्यय / मोक्ष भाव)"
};

/**
 * ग्रह कुन भावमा बसेको छ (१ देखि १२) निकाल्छ
 */
function getHouseOfPlanet(planetRashiId, lagnaRashiId) {
    return ((planetRashiId - lagnaRashiId + 12) % 12) + 1;
}

/**
 * कुण्डलीको कुनै पनि भावको स्वामी (भावेश) कुन ग्रह हो निकाल्छ
 */
/**
 * कुण्डलीको कुनै पनि भावको स्वामी (भावेश) कुन ग्रह हो निकाल्छ
 */
function getLordOfHouse(houseNum, lagnaRashiId) {
    const houseRashiId = ((lagnaRashiId - 1 + (houseNum - 1)) % 12) + 1;
    const rashiObj = (typeof RASHIS !== "undefined" && RASHIS[houseRashiId - 1]) ? RASHIS[houseRashiId - 1] : { nameNp: "राशि " + houseRashiId, lord: "सूर्य" };
    return {
        rashiId: houseRashiId,
        rashiName: rashiObj.nameNp,
        lordName: rashiObj.lord
    };
}

/**
 * स्वामी ग्रह कुन भावमा बसेको छ पत्ता लगाउँछ
 */
function findLordCurrentHouse(lordName, planetsData, lagnaRashiId) {
    const lordToKey = {
        "सूर्य": "Surya", "चन्द्र": "Chandra", "मङ्गल": "Mangal",
        "बुध": "Budha", "गुरु": "Guru", "शुक्र": "Shukra", "शनि": "Shani"
    };
    const key = lordToKey[lordName];
    if (!key || !planetsData || !planetsData[key]) return 1;
    const pDeg = planetsData[key].deg;
    const pRashiId = typeof getRashiDetails === "function" ? getRashiDetails(pDeg).rashiId : (Math.floor(((pDeg % 360) + 360) % 360 / 30) + 1);
    return getHouseOfPlanet(pRashiId, lagnaRashiId);
}

/**
 * सम्पूर्ण फलादेश HTML तयार गर्छ
 */
function buildPhaladeshHTML(data) {
    if (!data) {
        return `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 3rem; margin-bottom: 12px;">🔮</div>
                <h3 style="color: var(--primary); margin-bottom: 8px;">कुण्डली फलादेश तयार भएको छैन</h3>
                <p style="color: var(--text-muted); margin-bottom: 20px;">
                    फलादेश हेर्नका लागि कृपया पहिले 'जन्मकुण्डली निर्माण' ट्याबमा जन्म विवरण प्रविष्ट गरी कुण्डली निर्माण गर्नुहोस्।
                </p>
                <button type="button" class="btn-primary" onclick="switchToTab('tab-kundali')">
                    ✨ जन्मकुण्डली निर्माणमा जानुहोस्
                </button>
            </div>
        `;
    }

    const lagnaId = (data.lagnaRashi && data.lagnaRashi.rashiId) || data.lagnaRashiId || 1;
    const moonRashiId = (data.moonRashi && data.moonRashi.rashiId) || data.chandraRashiId || 1;
    const nakId = (data.moonNak && data.moonNak.nakshatraId) || data.nakshatraId || 1;

    const lagnaNameNp = (data.lagnaRashi && data.lagnaRashi.rashiNameNp) || data.lagnaRashiName || (typeof RASHIS !== "undefined" && RASHIS[lagnaId - 1] ? RASHIS[lagnaId - 1].nameNp : "मेष");
    const moonNameNp = (data.moonRashi && data.moonRashi.rashiNameNp) || data.chandraRashiName || (typeof RASHIS !== "undefined" && RASHIS[moonRashiId - 1] ? RASHIS[moonRashiId - 1].nameNp : "मेष");
    const nakNameNp = (data.moonNak && data.moonNak.nakshatraNameNp) || data.nakshatraName || "अश्विनी";
    const nakPada = (data.moonNak && data.moonNak.pada) || 1;
    const nakNamaakshar = (data.moonNak && data.moonNak.namaakshar) || (data.namaakshar || "चु");
    const nakGana = (data.moonNak && data.moonNak.gana) || (data.gana || "देव");
    const nakNadi = (data.moonNak && data.moonNak.nadi) || (data.nadi || "मध्य");

    const initialLord = (data.dasha && data.dasha.initialLord) || "सूर्य";
    const dashaBalance = (data.dasha && data.dasha.balance) || "सामान्य";
    const isManglik = data.manglik ? data.manglik.isManglik : Boolean(data.isManglik);

    // 1. Lagna Phala
    const lagnaInfo = LAGNA_PHALADESH_DATA[lagnaId] || LAGNA_PHALADESH_DATA[1];

    // 2. Rashi Phala
    const rashiInfo = RASHI_PHALADESH_DATA[moonRashiId] || RASHI_PHALADESH_DATA[1];

    // 3. Nakshatra Phala
    const nakInfo = NAKSHATRA_PHALADESH_DATA.find(n => n.id === nakId) || NAKSHATRA_PHALADESH_DATA[0];

    // 4. Bhavasta Graha Phala (All 9 planets)
    const grahaOrderKeys = ["Surya", "Chandra", "Mangal", "Budha", "Guru", "Shukra", "Shani", "Rahu", "Ketu"];
    let bhavastaHtml = "";

    grahaOrderKeys.forEach(k => {
        if (!data.planets || !data.planets[k]) return;
        const pDeg = data.planets[k].deg;
        const pRashiId = typeof getRashiDetails === "function" ? getRashiDetails(pDeg).rashiId : (Math.floor(((pDeg % 360) + 360) % 360 / 30) + 1);
        const rashiDetails = typeof getRashiDetails === "function" ? getRashiDetails(pDeg) : { rashiNameNp: "राशि " + pRashiId };
        const houseNum = getHouseOfPlanet(pRashiId, lagnaId);
        const gId = GRAHA_ID_MAP[k];
        const key = `${houseNum}_${gId}`;
        const interp = BHAVASTA_GRAHA_INTERPRETATIONS[key] || [
            "यस भावमा ग्रहको उपस्थिति अनुकूल मानिन्छ । कर्म तथा पराक्रममा वृद्धि हुनेछ ।",
            "सकारात्मक ऊर्जा र कार्यसिद्धि",
            "संयम तथा विवेकपूर्ण निर्णय आवश्यक"
        ];
        const rawShloka = MANSAGARI_SHLOKAS[key] || "";
        const chamatkarShloka = (typeof CHAMATKAR_CHINTAMANI_SHLOKAS !== "undefined" && CHAMATKAR_CHINTAMANI_SHLOKAS[key]) || "";
        const isVakri = data.planets[k].isRetrograde;
        const degInRashiStr = data.planets[k].degInRashi ? data.planets[k].degInRashi.toFixed(2) : (pDeg % 30).toFixed(2);

        bhavastaHtml += `
            <div class="phaladesh-card bhavasta-card">
                <div class="phaladesh-card-header">
                    <div class="phaladesh-badge-icon">${k === 'Surya' ? '☀️' : k === 'Chandra' ? '🌙' : k === 'Mangal' ? '⚔️' : k === 'Budha' ? '💡' : k === 'Guru' ? '👑' : k === 'Shukra' ? '💎' : k === 'Shani' ? '⚖️' : k === 'Rahu' ? '🌪️' : '🚩'}</div>
                    <div>
                        <h4 class="phaladesh-card-title">${GRAHA_NAMES_NP[k]} : ${BHAV_TITLES_NP[houseNum]} मा</h4>
                        <span class="phaladesh-card-sub">${isVakri ? '<span class="text-vakri">वक्री</span> • ' : ''}स्थिति: ${rashiDetails.rashiNameNp} राशि (${degInRashiStr}°)</span>
                    </div>
                </div>

                <div class="phaladesh-card-body">
                    <p class="phaladesh-main-text"><strong>फल प्रभाव:</strong> ${interp[0]}</p>
                    
                    <div class="phaladesh-pros-cons-grid">
                        <div class="phaladesh-pros">
                            <span class="pro-tag">✅ शुभ प्रभाव:</span> ${interp[1]}
                        </div>
                        <div class="phaladesh-cons">
                            <span class="con-tag">⚠️ सावधानी:</span> ${interp[2]}
                        </div>
                    </div>

                    ${rawShloka ? `
                    <div class="phaladesh-shloka-box">
                        <div class="shloka-source">॥ मानसागरी ग्रन्थ प्रमाण ॥</div>
                        <div class="shloka-preeti-text">${rawShloka}</div>
                    </div>` : ''}

                    ${chamatkarShloka ? `
                    <div class="phaladesh-shloka-box" style="margin-top: 10px; border-left: 3px solid #7b1fa2; background: rgba(123, 31, 162, 0.04);">
                        <div class="shloka-source" style="color: #7b1fa2;">॥ चमत्कार चिन्तामणि ग्रन्थ प्रमाण (SkyVision) ॥</div>
                        <div class="shloka-preeti-text">${chamatkarShloka}</div>
                    </div>` : ''}
                </div>
            </div>
        `;
    });

    // 5. Bhavesha Phala (Key Lords: Lagnesh, Bhagyash, Karmesh, Saptamesh)
    const lagneshInfo = getLordOfHouse(1, lagnaId);
    const lagneshHouse = findLordCurrentHouse(lagneshInfo.lordName, data.planets, lagnaId);

    const bhagyashInfo = getLordOfHouse(9, lagnaId);
    const bhagyashHouse = findLordCurrentHouse(bhagyashInfo.lordName, data.planets, lagnaId);

    const karmeshInfo = getLordOfHouse(10, lagnaId);
    const karmeshHouse = findLordCurrentHouse(karmeshInfo.lordName, data.planets, lagnaId);

    const saptameshInfo = getLordOfHouse(7, lagnaId);
    const saptameshHouse = findLordCurrentHouse(saptameshInfo.lordName, data.planets, lagnaId);

    // 6. Lucky factors
    const luckyInfo = LUCKY_FACTORS_DATA[moonRashiId] || LUCKY_FACTORS_DATA[1];

    // Build the master UI
    return `
        <!-- फलादेश हेडर तथा प्रिन्ट बार -->
        <div class="phaladesh-header-bar no-print">
            <div>
                <h2 style="color: var(--primary); margin-bottom: 4px; font-size: 1.5rem;">🔮 जातकको सम्पूर्ण कुण्डली फलादेश</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0;">
                    पाराशर होराशास्त्र, मानसागरी तथा चमत्कार चिन्तामणि ग्रन्थका आधारमा तयार गरिएको विस्तृत जन्मकुण्डली फलादेश
                </p>
            </div>
            <button type="button" class="btn-primary" onclick="window.print()">
                🖨️ फलादेश प्रिन्ट / PDF सेभ गर्नुहोस्
            </button>
        </div>

        <!-- जातक परिचय सारांश कार्ड -->
        <div class="phaladesh-native-summary-card">
            <div class="native-summary-col"><strong>जातकको नाम:</strong> <span class="val-gold">${data.name || 'जातक'}</span> (${data.gender || 'पुरुष'})</div>
            <div class="native-summary-col"><strong>जन्म मिति:</strong> ${data.bsDateStr || ''}</div>
            <div class="native-summary-col"><strong>जन्म समय / स्थान:</strong> ${data.birthTimeStr || ''} / ${data.placeName || ''}</div>
            <div class="native-summary-col"><strong>लग्न:</strong> <span class="badge-gold">${lagnaNameNp}</span></div>
            <div class="native-summary-col"><strong>चन्द्र राशि:</strong> <span class="badge-gold">${moonNameNp}</span></div>
            <div class="native-summary-col"><strong>नक्षत्र:</strong> ${nakNameNp} (पाद ${nakPada})</div>
            <div class="native-summary-col"><strong>जन्मकालीन दशा:</strong> <span class="badge-gold">${initialLord}</span> (भोग्य: ${dashaBalance})</div>
            <div class="native-summary-col"><strong>माङ्गलिक स्थिति:</strong> <span class="${isManglik ? 'badge-danger' : 'badge-success'}">${isManglik ? 'माङ्गलिक कुण्डली' : 'अमाङ्गलिक (शुभ)'}</span></div>
        </div>

        <!-- फलादेश वर्ग नेभिगेसन पिल्स (Filter / Jump) -->
        <div class="phaladesh-filter-bar no-print">
            <button type="button" class="phal-filter-btn active" onclick="filterPhaladeshSection('all')">🌟 सम्पूर्ण फलादेश</button>
            <button type="button" class="phal-filter-btn" onclick="filterPhaladeshSection('sec-lagna')">👤 लग्न एवं व्यक्तित्व</button>
            <button type="button" class="phal-filter-btn" onclick="filterPhaladeshSection('sec-rashi')">🌙 चन्द्र राशि फल</button>
            <button type="button" class="phal-filter-btn" onclick="filterPhaladeshSection('sec-nakshatra')">⭐ जन्म नक्षत्र</button>
            <button type="button" class="phal-filter-btn" onclick="filterPhaladeshSection('sec-bhavasta')">🪐 द्वादश भावगत ग्रह फल</button>
            <button type="button" class="phal-filter-btn" onclick="filterPhaladeshSection('sec-bhavesh')">👑 मुख्य भावेश फल</button>
            <button type="button" class="phal-filter-btn" onclick="filterPhaladeshSection('sec-remedies')">🌺 शुभ तत्व एवं उपाय</button>
        </div>

        <!-- खण्ड १: लग्न एवं व्यक्तित्व फलादेश -->
        <section id="sec-lagna" class="phaladesh-section">
            <h3 class="phaladesh-sec-title">👤 १. लग्न एवं व्यक्तित्व फलादेश</h3>
            <div class="phaladesh-card">
                <div class="phaladesh-card-header">
                    <div class="phaladesh-badge-icon">🌟</div>
                    <div>
                        <h4 class="phaladesh-card-title">${lagnaInfo.name}</h4>
                        <span class="phaladesh-card-sub">लग्न स्वामी: ${lagnaInfo.lord} • तत्त्व: ${lagnaInfo.element}</span>
                    </div>
                </div>
                <div class="phaladesh-card-body">
                    <p><strong>शारीरिक बनावट तथा स्वरूप:</strong> ${lagnaInfo.personality}</p>
                    <p><strong>स्वभाव, बुद्धि तथा आचरण:</strong> ${lagnaInfo.nature}</p>
                    <p><strong>अनुकूल कार्यक्षेत्र, पेशा तथा व्यापार:</strong> ${lagnaInfo.career}</p>
                    <p><strong>सम्भावित स्वास्थ्य तथा सजगता:</strong> ${lagnaInfo.health}</p>
                    <div class="phaladesh-lucky-box">
                        <strong>अनुकूलता:</strong> ${lagnaInfo.lucky}
                    </div>
                </div>
            </div>
        </section>

        <!-- खण्ड २: चन्द्र राशि एवं मानसिक फलादेश -->
        <section id="sec-rashi" class="phaladesh-section">
            <h3 class="phaladesh-sec-title">🌙 २. चन्द्र राशि एवं मानसिक फलादेश</h3>
            <div class="phaladesh-card">
                <div class="phaladesh-card-header">
                    <div class="phaladesh-badge-icon">🌙</div>
                    <div>
                        <h4 class="phaladesh-card-title">${rashiInfo.name}</h4>
                        <span class="phaladesh-card-sub">राशि स्वामी: ${rashiInfo.lord} • नामाक्षर: ${nakNamaakshar}</span>
                    </div>
                </div>
                <div class="phaladesh-card-body">
                    <p><strong>मानसिक प्रकृति तथा मनोवृत्ति:</strong> ${rashiInfo.mind}</p>
                    <p><strong>धन, सम्पत्ति तथा आर्थिक उन्नति:</strong> ${rashiInfo.wealth}</p>
                    <p><strong>पारिवारिक तथा सामाजिक सुख:</strong> ${rashiInfo.family}</p>
                </div>
            </div>
        </section>

        <!-- खण्ड ३: जन्म नक्षत्र फलादेश -->
        <section id="sec-nakshatra" class="phaladesh-section">
            <h3 class="phaladesh-sec-title">⭐ ३. जन्म नक्षत्र फलादेश</h3>
            <div class="phaladesh-card">
                <div class="phaladesh-card-header">
                    <div class="phaladesh-badge-icon">✨</div>
                    <div>
                        <h4 class="phaladesh-card-title">${nakInfo.name} नक्षत्र (पाद ${nakPada})</h4>
                        <span class="phaladesh-card-sub">नक्षत्र स्वामी: ${nakInfo.lord} • देवता: ${nakInfo.deity} • गण: ${nakGana} • नाडी: ${nakNadi}</span>
                    </div>
                </div>
                <div class="phaladesh-card-body">
                    <p><strong>नक्षत्रको मूल स्वरूप तथा प्रभाव:</strong> ${nakInfo.traits}</p>
                    <p><strong>जीवनमा प्रभाव:</strong> यस नक्षत्रमा जन्मिएका जातकहरू ${nakGana} गण र ${nakNadi} नाडीका कारण स्वाभिमानी, कर्तव्यनिष्ठ र उच्च आदर्शयुक्त स्वभावका हुने गर्दछन्।</p>
                </div>
            </div>
        </section>

        <!-- खण्ड ४: द्वादश भावगत ग्रह फलादेश -->
        <section id="sec-bhavasta" class="phaladesh-section">
            <h3 class="phaladesh-sec-title">🪐 ४. द्वादश भावगत ग्रह फलादेश</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">
                कुण्डलीका १२ भावहरूमा स्थित ९ ग्रहहरू (सूर्य देखि केतु सम्म) को मानसागरी तथा चमत्कार चिन्तामणि शास्त्रीय फल:
            </p>
            <div class="phaladesh-bhavasta-grid">
                ${bhavastaHtml}
            </div>
        </section>

        <!-- खण्ड ५: प्रमुख भावेश फलादेश -->
        <section id="sec-bhavesh" class="phaladesh-section">
            <h3 class="phaladesh-sec-title">👑 ५. मुख्य भावेश फलादेश</h3>
            <div class="phaladesh-cards-grid">
                <!-- लग्नेश -->
                <div class="phaladesh-card">
                    <div class="phaladesh-card-header">
                        <div class="phaladesh-badge-icon">🏛️</div>
                        <div>
                            <h4 class="phaladesh-card-title">लग्नेश (${lagneshInfo.lordName}): ${BHAV_TITLES_NP[lagneshHouse]} मा</h4>
                            <span class="phaladesh-card-sub">लग्न राशि: ${lagneshInfo.rashiName}</span>
                        </div>
                    </div>
                    <div class="phaladesh-card-body">
                        <p><strong>शास्त्रीय पाराशरी फल:</strong> लग्नेश ${BHAV_TITLES_NP[lagneshHouse]} मा बस्दा जातक ${lagneshHouse === 1 ? 'अत्यन्त स्वाभिमानी, दीर्घायु, निरोगी र कुलमा श्रेष्ठ' : lagneshHouse === 2 ? 'धनवान्, विद्यावान्, कुटुम्बप्रेमी र सुखी' : lagneshHouse === 9 ? 'परम भाग्यशाली, धर्मपरायण र तीर्थाटन गर्ने' : lagneshHouse === 10 ? 'पितृभक्त, उच्च राजकीय पद तथा कर्ममा सफल' : lagneshHouse === 11 ? 'अकुत धनलाभ, अभीष्ट सिद्धि र गुणवान्' : 'उद्यमी र संघर्षबाट सफलता पाउने'} हुन्छ ।</p>
                    </div>
                </div>

                <!-- भाग्येश -->
                <div class="phaladesh-card">
                    <div class="phaladesh-card-header">
                        <div class="phaladesh-badge-icon">🍀</div>
                        <div>
                            <h4 class="phaladesh-card-title">भाग्येश (${bhagyashInfo.lordName}): ${BHAV_TITLES_NP[bhagyashHouse]} मा</h4>
                            <span class="phaladesh-card-sub">नवम भाव स्वामी</span>
                        </div>
                    </div>
                    <div class="phaladesh-card-body">
                        <p><strong>शास्त्रीय पाराशरी फल:</strong> नवमेश (भाग्येश) ${BHAV_TITLES_NP[bhagyashHouse]} मा हुनाले जातकको जीवनमा ईश्वरीय कृपा, गुरु एवं पिताको आशीर्वादले भाग्योदय हुनेछ । धार्मिक कार्यमा रुचि र समाजमा उच्च प्रतिष्ठा मिल्नेछ ।</p>
                    </div>
                </div>

                <!-- कर्मेश -->
                <div class="phaladesh-card">
                    <div class="phaladesh-card-header">
                        <div class="phaladesh-badge-icon">💼</div>
                        <div>
                            <h4 class="phaladesh-card-title">कर्मेश (${karmeshInfo.lordName}): ${BHAV_TITLES_NP[karmeshHouse]} मा</h4>
                            <span class="phaladesh-card-sub">दशम भाव स्वामी</span>
                        </div>
                    </div>
                    <div class="phaladesh-card-body">
                        <p><strong>शास्त्रीय पाराशरी फल:</strong> दशमेश ${BHAV_TITLES_NP[karmeshHouse]} मा रहँदा कार्यक्षेत्रमा स्थिरता, उच्च पदोन्नति, नेतृत्व क्षमता र दीर्घकालीन कीर्ति प्राप्त हुने शास्त्रीय सङ्केत मिल्दछ ।</p>
                    </div>
                </div>

                <!-- सप्तमेश -->
                <div class="phaladesh-card">
                    <div class="phaladesh-card-header">
                        <div class="phaladesh-badge-icon">💍</div>
                        <div>
                            <h4 class="phaladesh-card-title">सप्तमेश (${saptameshInfo.lordName}): ${BHAV_TITLES_NP[saptameshHouse]} मा</h4>
                            <span class="phaladesh-card-sub">दाम्पत्य तथा साझेदारी भाव स्वामी</span>
                        </div>
                    </div>
                    <div class="phaladesh-card-body">
                        <p><strong>शास्त्रीय पाराशरी फल:</strong> सप्तमेश ${BHAV_TITLES_NP[saptameshHouse]} मा बस्दा जीवनसाथी सुयोग्य, स्नेही र भाग्यशाली हुनेछ । साझेदारी व्यवसाय तथा सार्वजनिक सम्पर्कबाट लाभ मिल्नेछ ।</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- खण्ड ६: माङ्गलिक विचार एवं उपाय -->
        <section id="sec-remedies" class="phaladesh-section">
            <h3 class="phaladesh-sec-title">🌺 ६. माङ्गलिक विचार, शुभ तत्त्व तथा ज्योतिषीय उपाय</h3>
            
            <div class="phaladesh-cards-grid">
                <!-- माङ्गलिक विचार -->
                <div class="phaladesh-card">
                    <div class="phaladesh-card-header">
                        <div class="phaladesh-badge-icon">${isManglik ? '⚔️' : '🕊️'}</div>
                        <div>
                            <h4 class="phaladesh-card-title">माङ्गलिक दोष विचार</h4>
                            <span class="phaladesh-card-sub">स्थिति: ${isManglik ? '<span class="badge-danger">माङ्गलिक कुण्डली</span>' : '<span class="badge-success">अमाङ्गलिक (दोषरहित)</span>'}</span>
                        </div>
                    </div>
                    <div class="phaladesh-card-body">
                        <p>${MANGLIK_REMEDIES_DATA.overview}</p>
                        <p><strong>दोष परिहार:</strong> ${MANGLIK_REMEDIES_DATA.exceptions}</p>
                        ${isManglik ? `
                        <div style="margin-top: 10px;">
                            <strong>शान्ति उपायहरू:</strong>
                            <ul style="padding-left: 20px; margin-top: 6px; line-height: 1.6;">
                                ${MANGLIK_REMEDIES_DATA.remedies.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>` : '<p style="color: #2E7D32; font-weight: 600;">कुण्डलीमा माङ्गलिक दोष छैन, दाम्पत्य जीवन सामान्यतया सुखद रहनेछ ।</p>'}
                    </div>
                </div>

                <!-- शुभ तत्त्व तथा भाग्यवृद्धि -->
                <div class="phaladesh-card">
                    <div class="phaladesh-card-header">
                        <div class="phaladesh-badge-icon">💎</div>
                        <div>
                            <h4 class="phaladesh-card-title">राशि अनुकूल शुभ तत्त्वहरू</h4>
                            <span class="phaladesh-card-sub">${moonNameNp} राशिका आधारमा</span>
                        </div>
                    </div>
                    <div class="phaladesh-card-body">
                        <div class="lucky-grid">
                            <div><strong>शुभ रत्न:</strong> ${luckyInfo.ratna}</div>
                            <div><strong>अनुकूल रुद्राक्ष:</strong> ${luckyInfo.rudraksha}</div>
                            <div><strong>शुभ रङ्ग:</strong> ${luckyInfo.color}</div>
                            <div><strong>शुभ बार:</strong> ${luckyInfo.day}</div>
                            <div><strong>शुभ अङ्क:</strong> ${luckyInfo.number}</div>
                            <div><strong>शुभ दिशा:</strong> ${luckyInfo.direction}</div>
                            <div><strong>इष्टदेवता:</strong> ${luckyInfo.deity}</div>
                        </div>
                        <div class="phaladesh-mantra-highlight">
                            <strong>जप मन्त्र:</strong> ${luckyInfo.mantra}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * फलादेश सेक्सन फिल्टर गर्ने (Tab pills)
 */
function filterPhaladeshSection(secId) {
    const btns = document.querySelectorAll(".phal-filter-btn");
    btns.forEach(b => b.classList.remove("active"));
    const clickedBtn = event ? event.target : null;
    if (clickedBtn) clickedBtn.classList.add("active");

    const sections = document.querySelectorAll(".phaladesh-section");
    if (secId === "all") {
        sections.forEach(s => s.style.display = "block");
    } else {
        sections.forEach(s => {
            s.style.display = s.id === secId ? "block" : "none";
        });
        const target = document.getElementById(secId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/**
 * फलादेश ट्याबमा रेन्डर गर्ने
 */
function renderPhaladeshTabUI() {
    const container = document.getElementById("phaladeshContainer");
    if (!container) return;
    container.innerHTML = buildPhaladeshHTML(currentKundaliData);
}

// Global exports
if (typeof window !== "undefined") {
    window.renderPhaladeshTabUI = renderPhaladeshTabUI;
    window.filterPhaladeshSection = filterPhaladeshSection;
    window.buildPhaladeshHTML = buildPhaladeshHTML;
    window.getHouseOfPlanet = getHouseOfPlanet;
    window.getLordOfHouse = getLordOfHouse;
    window.findLordCurrentHouse = findLordCurrentHouse;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        renderPhaladeshTabUI,
        filterPhaladeshSection,
        buildPhaladeshHTML,
        getHouseOfPlanet,
        getLordOfHouse,
        findLordCurrentHouse
    };
}
