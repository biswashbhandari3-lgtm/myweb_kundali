/**
 * parva_data.js - नेपालका वार्षिक चाडपर्व, राष्ट्रिय सार्वजनिक विदा तथा दिवसहरू
 * Nepal Annual Festivals, Public Holidays & Observances
 */

const NEPAL_ANNUAL_PARVAS = [
    // ==========================================
    // १. बैशाख (Baishakh)
    // ==========================================
    {
        id: "b-1",
        month: 1,
        monthName: "बैशाख",
        dayType: "fixed_bs",
        day: 1,
        dateDisplay: "बैशाख १ गते",
        name: "नयाँ वर्ष (मेष संक्रान्ति)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "विक्रम संवत्को नयाँ वर्ष प्रारम्भ, मेष संक्रान्ति, बिस्केट जात्रा (भक्तपुर) तथा सिरुवा पर्व।"
    },
    {
        id: "b-2",
        month: 1,
        monthName: "बैशाख",
        dayType: "fixed_bs",
        day: 11,
        dateDisplay: "बैशाख ११ गते",
        name: "राष्ट्रिय लोकतन्त्र दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "विसं २०६३ सालमा ऐतिहासिक जनआन्दोलन-२ मार्फत विघटित प्रतिनिधि सभा पुनस्र्थापना भएको ऐतिहासिक दिन।"
    },
    {
        id: "b-3",
        month: 1,
        monthName: "बैशाख",
        dayType: "tithi",
        tithiMatch: "औंसी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "बैशाख कृष्ण औंसी",
        name: "मातातीर्थ औंसी (आमाको मुख हेर्ने दिन)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "आमाप्रति कृतज्ञता र श्रद्धा अर्पण गर्ने पवित्र मातृ दिवस। काठमाडौँको मातातीर्थ कुण्डमा विशेष मेला।"
    },
    {
        id: "b-4",
        month: 1,
        monthName: "बैशाख",
        dayType: "ad",
        adMonth: 5,
        adDay: 1,
        dateDisplay: "मे १ (बैशाख १८/१९)",
        name: "अन्तर्राष्ट्रिय श्रमिक दिवस (मजदुर दिवस)",
        category: "diwas",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "विश्वभरका श्रमिक तथा मजदुर वर्गको हक-अधिकार र सम्मानको स्मरणमा मनाइने अन्तर्राष्ट्रिय दिवस।"
    },
    {
        id: "b-5",
        month: 1,
        monthName: "बैशाख",
        dayType: "tithi",
        tithiMatch: "तृतीया",
        pakshaMatch: "शुक्ल",
        dateDisplay: "बैशाख शुक्ल तृतीया",
        name: "अक्षय तृतीया (परशुराम जयन्ती)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "दान, जप र पुण्य कार्य गर्दा अक्षय (कहिले नाश नहुने) फल प्राप्त हुने दिन। जौको सातु र सर्वत दान गर्ने परम्परा।"
    },
    {
        id: "b-6",
        month: 1,
        monthName: "बैशाख",
        dayType: "fixed_bs",
        day: 26,
        dateDisplay: "बैशाख २६ गते",
        name: "राष्ट्रिय कानून दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "विसं २००९ सालमा नेपाल प्रधान न्यायालय ऐन लागू भएको दिनको स्मरणमा मनाइने कानून दिवस।"
    },
    {
        id: "b-7",
        month: 1,
        monthName: "बैशाख",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "बैशाख शुक्ल पूर्णिमा",
        name: "बुद्ध जयन्ती / चण्डी पूर्णिमा (उभौली पर्व)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "भगवान गौतम बुद्धको जन्म, ज्ञान प्राप्ति र महापरिनिर्वाण दिवस। किराँत समुदायको महान उभौली पर्व तथा चण्डी पूर्णिमा।"
    },

    // ==========================================
    // २. ज्येष्ठ (Jestha)
    // ==========================================
    {
        id: "j-1",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "fixed_bs",
        day: 15,
        dateDisplay: "जेठ १५ गते",
        name: "गणतन्त्र दिवस",
        category: "diwas",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "विसं २०६५ जेठ १५ गते नेपाललाई औपचारिक रूपमा संघीय लोकतान्त्रिक गणतन्त्र घोषणा गरिएको ऐतिहासिक दिन।"
    },
    {
        id: "j-2",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "tithi",
        tithiMatch: "षष्ठी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "जेठ शुक्ल षष्ठी",
        name: "सिठी नखः (कुमार षष्ठी)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "काठमाडौँ उपत्यकामा इनार, कुवा, ढुङ्गेधारा तथा जलस्रोतको सरसफाइ गर्ने र बारा-चटामरी खाने परम्परागत पर्व।"
    },
    {
        id: "j-3",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "fixed_bs",
        day: 21,
        dateDisplay: "जेठ २१ गते",
        name: "जातीय भेदभाव तथा छुवाछूत उन्मूलन दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "विसं २०६३ जेठ २१ मा नेपाललाई छुवाछूतमुक्त राष्ट्र घोषणा गरिएको सम्झनामा मनाइने दिवस।"
    },
    {
        id: "j-4",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "ad",
        adMonth: 6,
        adDay: 5,
        dateDisplay: "जुन ५ (जेठ २२/२३)",
        name: "विश्व वातावरण दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "प्रकृति संरक्षण, पर्यावरण सन्तुलन र जलवायु परिवर्तन विरुद्ध विश्वव्यापी सचेतना दिवस।"
    },
    {
        id: "j-5",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "tithi",
        tithiMatch: "दशमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "जेठ शुक्ल दशमी",
        name: "गङ्गा दशहरा",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "स्वर्गबाट धर्तीमा गङ्गा नदीको अवतरण भएको पुण्यतिथि। पवित्र नदी तथा कुण्डहरूमा स्नान र दान गर्ने परम्परा।"
    },
    {
        id: "j-6",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "tithi",
        tithiMatch: "एकादशी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "जेठ शुक्ल एकादशी",
        name: "निर्जला एकादशी (भीम एकादशी)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "जल समेत ग्रहण नगरी कठोर ब्रत बसिने एकादशी। यस व्रतले वर्षभरिका सम्पूर्ण एकादशीको फल प्रदान गर्दछ।"
    },
    {
        id: "j-7",
        month: 2,
        monthName: "ज्येष्ठ",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "जेठ शुक्ल पूर्णिमा",
        name: "ज्येष्ठ पूर्णिमा (पनौती ज्यापुन्ही मेला)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "काभ्रेको ऐतिहासिक पनौती त्रिवेणी धाममा लाग्ने प्रसिद्ध ज्यापुन्ही मेला तथा वटसावित्री व्रत।"
    },

    // ==========================================
    // ३. आषाढ (Ashadh)
    // ==========================================
    {
        id: "a-1",
        month: 3,
        monthName: "आषाढ",
        dayType: "ad",
        adMonth: 6,
        adDay: 21,
        dateDisplay: "जुन २१ (असार ७)",
        name: "अन्तर्राष्ट्रिय योग दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "प्राचीन वैदिक योगविद्या र शारीरिक-मानसिक स्वास्थ्यको प्रवर्द्धन गर्ने अन्तर्राष्ट्रिय दिवस।"
    },
    {
        id: "a-2",
        month: 3,
        monthName: "आषाढ",
        dayType: "fixed_bs",
        day: 15,
        dateDisplay: "असार १५ गते",
        name: "राष्ट्रिय धान दिवस (दही चिउरा खाने दिन)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "रोपाईं महोत्सव, कृषक सम्मान तथा नेपाली परम्परा अनुसार मीठो दही र चिउरा खाने सांस्कृतिक दिन।"
    },
    {
        id: "a-3",
        month: 3,
        monthName: "आषाढ",
        dayType: "tithi",
        tithiMatch: "एकादशी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आषाढ शुक्ल एकादशी",
        name: "हरिशयनी एकादशी (तुलसी रोप्ने दिन)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "भगवान श्रीविष्णु क्षीरसागरमा शेषनागको शय्यामा शयन गर्नुहुने र घरघरमा तुलसीको बिरुवा रोप्ने दिन। चतुर्मास व्रत प्रारम्भ।"
    },
    {
        id: "a-4",
        month: 3,
        monthName: "आषाढ",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आषाढ शुक्ल पूर्णिमा",
        name: "गुरु पूर्णिमा (महर्षि व्यास जयन्ती)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "अज्ञान रुपी अन्धकार हटाएर ज्ञानको प्रकाश दिने गुरुप्रति श्रद्धा, भक्ति र कृतज्ञता अर्पण गर्ने पवित्र दिन।"
    },
    {
        id: "a-5",
        month: 3,
        monthName: "आषाढ",
        dayType: "fixed_bs",
        day: 29,
        dateDisplay: "असार २९ गते",
        name: "भानु जयन्ती",
        category: "jayanti",
        isHoliday: false,
        holidayType: "",
        description: "नेपाली भाषाका आदिकवि भानुभक्त आचार्यको जन्मजयन्ती तथा भाषा-साहित्य उत्सव।"
    },

    // ==========================================
    // ४. श्रावण (Shrawan)
    // ==========================================
    {
        id: "s-1",
        month: 4,
        monthName: "श्रावण",
        dayType: "fixed_bs",
        day: 1,
        dateDisplay: "साउन १ गते",
        name: "साउने संक्रान्ति (कर्कट संक्रान्ति)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "सूर्य कर्कट राशिमा प्रवेश, दक्षिणायन प्रारम्भ, लुतो फाल्ने तथा हरियो चुरा र मेहन्दी लगाउने दिन।"
    },
    {
        id: "s-2",
        month: 4,
        monthName: "श्रावण",
        dayType: "fixed_bs",
        day: 15,
        dateDisplay: "साउन १५ गते",
        name: "खीर खाने दिन",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "साउनको झरीमा पोषिलो, स्वादिष्ट र पवित्र दूधको खीर बनाएर परिवारजनसँग खाने नेपाली परम्परा।"
    },
    {
        id: "s-3",
        month: 4,
        monthName: "श्रावण",
        dayType: "tithi",
        tithiMatch: "पञ्चमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "श्रावण शुक्ल पञ्चमी",
        name: "नाग पञ्चमी",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "घरको मूलढोकामा नागको तस्वीर टाँसी गाईको दूध, दुबो र अक्षताले नागदेवताको पूजा गर्ने वैदिक पर्व।"
    },
    {
        id: "s-4",
        month: 4,
        monthName: "श्रावण",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "श्रावण शुक्ल पूर्णिमा",
        name: "जनैपूर्णिमा / रक्षाबन्धन (क्वाँटी पुन्ही)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "यज्ञोपवीत (जनै) फेर्ने, हातमा रक्षाबन्धन डोरो बाँध्ने, नौ गेडागुडी मिसाएको पौष्टिक क्वाँटी खाने दिन। पाटनमा कुम्भेश्वर मेला।"
    },
    {
        id: "s-5",
        month: 4,
        monthName: "श्रावण",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "कृष्ण",
        dateDisplay: "भाद्र कृष्ण प्रतिपदा",
        name: "गाईजात्रा (सापारु)",
        category: "festival",
        isHoliday: true,
        holidayType: "काठमाडौँ उपत्यकामा विदा",
        description: "वर्षभरि दिवङ्गत आफन्तजनको मोक्षको कामना गर्दै गाई वा मानिसलाई गाईको भेषमा नगर परिक्रमा गराउने नेवारी ऐतिहासिक पर्व।"
    },
    {
        id: "s-6",
        month: 4,
        monthName: "श्रावण",
        dayType: "tithi",
        tithiMatch: "अष्टमी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "भाद्र कृष्ण अष्टमी",
        name: "श्रीकृष्ण जन्माष्टमी",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "द्वापरयुगमा भगवान् श्रीकृष्णको धर्तीमा प्राकट्य भएको पवित्र जन्मोत्सव। पाटनको कृष्ण मन्दिर लगायत देशभर विशेष पूजाआजा।"
    },

    // ==========================================
    // ५. भाद्र (Bhadra)
    // ==========================================
    {
        id: "bh-1",
        month: 5,
        monthName: "भाद्र",
        dayType: "tithi",
        tithiMatch: "औंसी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "भाद्र कृष्ण औंसी",
        name: "कुशे औंसी (बुवाको मुख हेर्ने दिन / मोती जयन्ती)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "घरघरमा पवित्र कुश भित्र्याउने र बाबुप्रति आदर सत्कार अर्पण गर्ने पितृ दिवस। युगकवि मोतीराम भट्ट जयन्ती।"
    },
    {
        id: "bh-2",
        month: 5,
        monthName: "भाद्र",
        dayType: "tithi",
        tithiMatch: "तृतीया",
        pakshaMatch: "शुक्ल",
        dateDisplay: "भाद्र शुक्ल तृतीया",
        name: "हरितालिका तीज",
        category: "festival",
        isHoliday: true,
        holidayType: "महिला कर्मचारीलाई राष्ट्रिय विदा",
        description: "देवी पार्वतीले भगवान् शिवलाई पतिको रूपमा प्राप्त गर्न गरेको तपस्याको सम्झनामा महिलाहरूले अखण्ड सौभाग्यका लागि बस्ने निराहार व्रत।"
    },
    {
        id: "bh-3",
        month: 5,
        monthName: "भाद्र",
        dayType: "tithi",
        tithiMatch: "चतुर्थी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "भाद्र शुक्ल चतुर्थी",
        name: "गणेश चतुर्थी",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "विघ्नहर्ता भगवान् गणेशको जन्मोत्सव तथा विशेष पूजाअर्चना।"
    },
    {
        id: "bh-4",
        month: 5,
        monthName: "भाद्र",
        dayType: "tithi",
        tithiMatch: "पञ्चमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "भाद्र शुक्ल पञ्चमी",
        name: "ऋषि पञ्चमी",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "कश्यप, अत्रि, भारद्वाज, विश्वामित्र, गौतम, जमदग्नि र वशिष्ठ सप्तर्षिहरूको पूजा गरी नारीहरूले रजस्वला दोष निवारण गर्ने दिन।"
    },
    {
        id: "bh-5",
        month: 5,
        monthName: "भाद्र",
        dayType: "fixed_bs",
        day: 29,
        dateDisplay: "भदौ २९ गते",
        name: "राष्ट्रिय बाल दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "बालअधिकार, शिक्षा र बालविकास प्रवर्द्धन गर्ने राष्ट्रिय दिवस।"
    },
    {
        id: "bh-6",
        month: 5,
        monthName: "भाद्र",
        dayType: "tithi",
        tithiMatch: "चतुर्दशी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "भाद्र शुक्ल चतुर्दशी",
        name: "अनन्त चतुर्दशी / इन्द्रजात्रा (येँयाः)",
        category: "festival",
        isHoliday: true,
        holidayType: "काठमाडौँ उपत्यकामा विदा",
        description: "इन्द्रध्वजोत्थान, जीवित देवी श्री कुमारी, गणेश र भैरवको रथयात्रा तथा अनन्त भगवानको डोरो बाँध्ने प्रसिद्ध पर्व।"
    },

    // ==========================================
    // ६. आश्विन (Ashwin)
    // ==========================================
    {
        id: "as-1",
        month: 6,
        monthName: "आश्विन",
        dayType: "fixed_bs",
        day: 1,
        dateDisplay: "असोज १ गते",
        name: "विश्वकर्मा पूजा (वास्तु दिवस)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "शिल्पकला, यन्त्र, औजार तथा वास्तुकलाका देवता भगवान् विश्वकर्माको विशेष आराधना र पूजा।"
    },
    {
        id: "as-2",
        month: 6,
        monthName: "आश्विन",
        dayType: "fixed_bs",
        day: 3,
        dateDisplay: "असोज ३ गते",
        name: "राष्ट्रिय संविधान दिवस",
        category: "diwas",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "विसं २०७२ असोज ३ गते संविधान सभा मार्फत संघीय लोकतान्त्रिक गणतन्त्र नेपालको संविधान जारी भएको ऐतिहासिक राष्ट्रिय दिवस।"
    },
    {
        id: "as-3",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल प्रतिपदा",
        name: "घटस्थापना (बडादशैं नवरात्र प्रारम्भ)",
        category: "festival",
        isHoliday: true,
        holidayType: "सार्वजनिक विदा",
        description: "घरघरमा कलश स्थापना गरी जमरा राख्ने र नवदुर्गा भवानीको नौ दिने नवरात्र उपासना प्रारम्भ हुने दिन।"
    },
    {
        id: "as-4",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "सप्तमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल सप्तमी",
        name: "फूलपाती",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "दशैंघरमा विधिपूर्वक नौ प्रकारका पवित्र पालुवा (फूलपाती) भित्र्याउने दिन। दशैं बिदा प्रारम्भ।"
    },
    {
        id: "as-5",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "अष्टमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल अष्टमी",
        name: "महाअष्टमी (कालरात्रि)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "महाकाली, महालक्ष्मी र महासरस्वतीको विशेष पूजा तथा राति कालरात्रि पूजा।"
    },
    {
        id: "as-6",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "नवमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल नवमी",
        name: "महानवमी (आयुध पूजा)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "सिद्धिदात्री देवीको पूजा, कलकारखाना, हातहतियार र सवारीसाधनको पूजाआजा। तलेजु भवानीको मन्दिर वर्षमा एक पटक खुल्ने दिन।"
    },
    {
        id: "as-7",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "दशमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल दशमी",
        name: "विजयादशमी (बडादशैं मुख्य टीका)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "असत्यमाथि सत्यको विजय। मान्यजनहरूबाट रातो टीका, पहेँलो जमरा र शुभाशीर्वाद ग्रहण गर्ने महान् नेपाली चाड।"
    },
    {
        id: "as-7b",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "एकादशी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल एकादशी",
        name: "पापाङ्कुशा एकादशी (बडादशैं टीका प्रसाद ग्रहण)",
        category: "festival",
        isHoliday: true,
        holidayType: "दशैं सार्वजनिक विदा",
        description: "पापाङ्कुशा एकादशी व्रत तथा बडादशैंको टीका र जमरा मान्यजनहरूबाट ग्रहण गर्ने क्रम जारी रहने पावन दिन।"
    },
    {
        id: "as-8",
        month: 6,
        monthName: "आश्विन",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "आश्विन शुक्ल पूर्णिमा",
        name: "कोजाग्रत पूर्णिमा (दशैं समापन)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "रातभर जाग्राम बसी धनधान्यकी देवी महालक्ष्मीको आराधना गर्ने दिन। यसै दिन बडादशैं पर्वको औपचारिक समापन हुन्छ।"
    },

    // ==========================================
    // ७. कार्तिक (Kartik)
    // ==========================================
    {
        id: "k-1",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "त्रयोदशी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "कार्तिक कृष्ण त्रयोदशी",
        name: "कागतिहार / धनतेरस (धन्वन्तरी जयन्ती)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "यमराजको दूत कागको पूजा तथा आयुर्वेद प्रवर्तक भगवान् धन्वन्तरीको जयन्ती। नयाँ धातु/भाँडाकुँडा किन्ने शुभ दिन। यमपञ्चक प्रारम्भ।"
    },
    {
        id: "k-2",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "चतुर्दशी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "कार्तिक कृष्ण चतुर्दशी",
        name: "कुकुरतिहार (नरक चतुर्दशी)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "इमान्दार र वफादार प्राणी कुकुरको पूजा तथा यमदीप दान।"
    },
    {
        id: "k-3",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "औंसी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "कार्तिक कृष्ण औंसी",
        name: "लक्ष्मीपूजा (दिपावली / सुखरात्रि)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "घरआँगन झिलिमिली दीप प्रज्वलन गरी धनधान्यकी देवी श्री महालक्ष्मीको विशेष पूजा आराधना। भैलो खेल्ने परम्परा।"
    },
    {
        id: "k-4",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "कार्तिक शुक्ल प्रतिपदा",
        name: "गोवर्धन पूजा / म्हपूजा (नेपाल संवत् नयाँ वर्ष)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "गोवर्धन पर्वत र गाई-गोरुको पूजा, नेवार समुदायमा आत्मपूजा (म्हपूजा) तथा नेपाल संवत् नयाँ वर्ष प्रारम्भ। देउसी खेल्ने दिन।"
    },
    {
        id: "k-5",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "द्वितीया",
        pakshaMatch: "शुक्ल",
        dateDisplay: "कार्तिक शुक्ल द्वितीया",
        name: "भाइटीका (यमद्वितीया)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "दिदीबहिनीले दाजुभाइलाई सप्तरङ्गी टीका, मखमली माला र मिष्ठान्न खुवाई दीर्घायुको कामना गर्ने तिहारको मुख्य दिन।"
    },
    {
        id: "k-6",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "षष्ठी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "कार्तिक शुक्ल षष्ठी",
        name: "छठ पर्व (सूर्य षष्ठी व्रत)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "पवित्रता, निष्ठा र आरोग्यका लागि अस्ताउँदो र उदाउँदो सूर्यदेव तथा षष्ठी देवी (छठी मैया) लाई अघ्र्य दिने महान् तराई तथा राष्ट्रिय पर्व।"
    },
    {
        id: "k-7",
        month: 7,
        monthName: "कार्तिक",
        dayType: "tithi",
        tithiMatch: "एकादशी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "कार्तिक शुक्ल एकादशी",
        name: "हरिबोधिनी एकादशी (तुलसी विवाह / ठूलो एकादशी)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "क्षीरसागरबाट भगवान् विष्णु जाग्नुहुने दिन। तुलसीको दामोदरसँग विवाह सम्पन्न गर्ने र सख्खरखण्ड, पिँडालु खाने दिन। चतुर्मास व्रत समापन।"
    },

    // ==========================================
    // ८. मार्गशीर्ष (Mangsir)
    // ==========================================
    {
        id: "m-1",
        month: 8,
        monthName: "मार्गशीर्ष",
        dayType: "tithi",
        tithiMatch: "चतुर्दशी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "मार्गशीर्ष कृष्ण चतुर्दशी",
        name: "बालाचतुर्दशी (शतबीज छर्ने दिन)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "दिवङ्गत पितृहरूको उद्धारका लागि पशुपतिनाथ क्षेत्रको श्लेष्मान्तक वनमा धान, जौ, तिल आदि सप्तधान्य शतबीज छर्ने पवित्र पर्व।"
    },
    {
        id: "m-2",
        month: 8,
        monthName: "मार्गशीर्ष",
        dayType: "tithi",
        tithiMatch: "पञ्चमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "मार्गशीर्ष शुक्ल पञ्चमी",
        name: "विवाह पञ्चमी (सीताराम विवाह महोत्सव)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "त्रेतायुगमा जनकपुरधाममा भगवान् श्रीराम र माता जानकी (सीता) को शुभ विवाह भएको पुण्यस्मृति उत्सव।"
    },
    {
        id: "m-3",
        month: 8,
        monthName: "मार्गशीर्ष",
        dayType: "ad",
        adMonth: 12,
        adDay: 10,
        dateDisplay: "डिसेम्बर १० (मंसिर २४/२५)",
        name: "अन्तर्राष्ट्रिय मानव अधिकार दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "मानव अधिकारको विश्वव्यापी घोषणापत्र जारी भएको सम्झनामा मनाइने दिवस।"
    },
    {
        id: "m-4",
        month: 8,
        monthName: "मार्गशीर्ष",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "मार्गशीर्ष शुक्ल पूर्णिमा",
        name: "उधौली पर्व / धान्य पूर्णिमा (योमरी पुन्ही)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "नयाँ अन्न भित्र्याएको खुशियालीमा किराँत समुदायको उधौली (साकेला), नेवार समुदायको योमरी पुन्ही तथा धान्य पूर्णिमा।"
    },

    // ==========================================
    // ९. पौष (Poush)
    // ==========================================
    {
        id: "p-1",
        month: 9,
        monthName: "पौष",
        dayType: "ad",
        adMonth: 12,
        adDay: 25,
        dateDisplay: "डिसेम्बर २५ (पुस १०)",
        name: "क्रिसमस डे (Christmas Day)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "ईसाई धर्मका प्रवर्तक प्रभु येशु ख्रीष्टको जन्मोत्सव।"
    },
    {
        id: "p-2",
        month: 9,
        monthName: "पौष",
        dayType: "fixed_bs",
        day: 15,
        dateDisplay: "पुस १५ गते",
        name: "तमु ल्होसार",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "गुरुङ समुदायको नयाँ वर्ष तथा पारम्परिक ल्होसार उत्सव।"
    },
    {
        id: "p-3",
        month: 9,
        monthName: "पौष",
        dayType: "fixed_bs",
        day: 27,
        dateDisplay: "पुस २७ गते",
        name: "राष्ट्रिय एकता दिवस (पृथ्वी जयन्ती)",
        category: "jayanti",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "आधुनिक नेपालका राष्ट्रनिर्माता श्री ५ बडामहाराजाधिराज पृथ्वीनारायण शाहको जन्मजयन्ती तथा राष्ट्रिय एकता दिवस।"
    },
    {
        id: "p-4",
        month: 9,
        monthName: "पौष",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "पौष शुक्ल पूर्णिमा",
        name: "पौष पूर्णिमा (माघस्नान / श्रीस्वस्थानी व्रत प्रारम्भ)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "एक महिना लामो पवित्र श्रीस्वस्थानी परमेश्वरीको व्रत तथा माघस्नान प्रारम्भ। शालीनदीमा विशेष मेला।"
    },

    // ==========================================
    // १०. माघ (Magh)
    // ==========================================
    {
        id: "mg-1",
        month: 10,
        monthName: "माघ",
        dayType: "fixed_bs",
        day: 1,
        dateDisplay: "माघ १ गते",
        name: "माघे संक्रान्ति (मकर संक्रान्ति / माघी)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "सूर्य मकर राशिमा प्रवेश, उत्तरायण प्रारम्भ। तरुल, घ्यू-चाकु, तिलको लड्डु खाने दिन। थारु समुदायको माघी नयाँ वर्ष।"
    },
    {
        id: "mg-2",
        month: 10,
        monthName: "माघ",
        dayType: "fixed_bs",
        day: 16,
        dateDisplay: "माघ १६ गते",
        name: "राष्ट्रिय शहीद दिवस",
        category: "diwas",
        isHoliday: false,
        holidayType: "",
        description: "देश र जनताको स्वतन्त्रताका लागि प्राण आहुति दिने अमर शहीदहरूको पावन स्मृति दिवस।"
    },
    {
        id: "mg-3",
        month: 10,
        monthName: "माघ",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "माघ शुक्ल प्रतिपदा",
        name: "सोनाम ल्होसार",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "तामाङ, ह्योल्मो लगायत समुदायको नयाँ वर्ष तथा मञ्जुश्री संवत्सर उत्सव।"
    },
    {
        id: "mg-4",
        month: 10,
        monthName: "माघ",
        dayType: "tithi",
        tithiMatch: "पञ्चमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "माघ शुक्ल पञ्चमी",
        name: "श्रीपञ्चमी (सरस्वती पूजा / वसन्त पञ्चमी)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "विद्या, वाणी, कला र सङ्गीतकी देवी महासरस्वतीको आराधना। साना बालबालिकालाई अक्षरारम्भ गराउने शुभ दिन। वसन्त ऋतुको आगमन।"
    },
    {
        id: "mg-5",
        month: 10,
        monthName: "माघ",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "माघ शुक्ल पूर्णिमा",
        name: "माघ पूर्णिमा (श्रीस्वस्थानी व्रत समापन)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "एक महिना लामो श्रीस्वस्थानी ब्रतकथा तथा माघस्नानको विधिवत हवन र समापन।"
    },

    // ==========================================
    // ११. फाल्गुन (Falgun)
    // ==========================================
    {
        id: "f-1",
        month: 11,
        monthName: "फाल्गुन",
        dayType: "fixed_bs",
        day: 7,
        dateDisplay: "फागुन ७ गते",
        name: "राष्ट्रिय प्रजातन्त्र दिवस",
        category: "diwas",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "विसं २००७ सालमा १०४ वर्षे जहानियाँ राणा शासन अन्त्य भई प्रजातन्त्र स्थापना भएको ऐतिहासिक दिन।"
    },
    {
        id: "f-2",
        month: 11,
        monthName: "फाल्गुन",
        dayType: "tithi",
        tithiMatch: "चतुर्दशी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "फागुन कृष्ण चतुर्दशी",
        name: "महाशिवरात्रि (सेना दिवस)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "देवाधिदेव महादेव शिवको ज्योतिर्लिङ्ग प्राकट्यको परम पावन रात्रि। पशुपतिनाथमा लाखौँ भक्तजनको मेला तथा नेपाली सेना दिवस।"
    },
    {
        id: "f-3",
        month: 11,
        monthName: "फाल्गुन",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "फागुन शुक्ल प्रतिपदा",
        name: "ग्याल्बो ल्होसार",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "शेर्पा तथा भोटे समुदायको नयाँ वर्ष तथा पारम्परिक ल्होसार महोत्सव।"
    },
    {
        id: "f-4",
        month: 11,
        monthName: "फाल्गुन",
        dayType: "ad",
        adMonth: 3,
        adDay: 8,
        dateDisplay: "मार्च ८ (फागुन २४)",
        name: "अन्तर्राष्ट्रिय महिला दिवस (नारी दिवस)",
        category: "diwas",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "महिला सशक्तीकरण, समानता र महिला अधिकार प्रवर्द्धन गर्ने अन्तर्राष्ट्रिय दिवस।"
    },
    {
        id: "f-5",
        month: 11,
        monthName: "फाल्गुन",
        dayType: "tithi",
        tithiMatch: "पूर्णिमा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "फागुन शुक्ल पूर्णिमा",
        name: "फागु पूर्णिमा (होली - पहाडी भेग)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा (पहाड)",
        description: "असत्य र दम्भकी प्रतीक होलिका दहनको खुशियालीमा रङ्ग, अबिर र उमङ्गका साथ मनाइने रङ्गोत्सव होली।"
    },
    {
        id: "f-6",
        month: 11,
        monthName: "फाल्गुन",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "कृष्ण",
        dateDisplay: "चैत्र कृष्ण प्रतिपदा",
        name: "फागु पूर्णिमा (होली - तराई भेग)",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा (तराई)",
        description: "तराई तथा मिथिलाञ्चलमा विशेष हर्षोल्लासका साथ मनाइने रङ्गहरूको पर्व होली।"
    },

    // ==========================================
    // १२. चैत्र (Chaitra)
    // ==========================================
    {
        id: "ch-1",
        month: 12,
        monthName: "चैत्र",
        dayType: "tithi",
        tithiMatch: "औंसी",
        pakshaMatch: "कृष्ण",
        dateDisplay: "चैत्र कृष्ण औंसी",
        name: "घोडेजात्रा",
        category: "festival",
        isHoliday: true,
        holidayType: "काठमाडौँ उपत्यकामा विदा",
        description: "टुँडिखेलमा गुरुमापा राक्षसको आत्मालाई घोडाको टापले कुल्चाएर दबाउने परम्परा अनुसार मनाइने अश्वकला प्रदर्शन।"
    },
    {
        id: "ch-2",
        month: 12,
        monthName: "चैत्र",
        dayType: "tithi",
        tithiMatch: "प्रतिपदा",
        pakshaMatch: "शुक्ल",
        dateDisplay: "चैत्र शुक्ल प्रतिपदा",
        name: "वासन्ती नवरात्र प्रारम्भ",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "चैते नवरात्र प्रारम्भ, देवी दुर्गा भगवतीको आराधना।"
    },
    {
        id: "ch-3",
        month: 12,
        monthName: "चैत्र",
        dayType: "tithi",
        tithiMatch: "अष्टमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "चैत्र शुक्ल अष्टमी",
        name: "चैते दशैं",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "वर्षको दोस्रो दशैं। शक्तिपीठहरूमा विशेष पूजा तथा बलि अर्पण।"
    },
    {
        id: "ch-4",
        month: 12,
        monthName: "चैत्र",
        dayType: "tithi",
        tithiMatch: "नवमी",
        pakshaMatch: "शुक्ल",
        dateDisplay: "चैत्र शुक्ल नवमी",
        name: "रामनवमी",
        category: "festival",
        isHoliday: true,
        holidayType: "राष्ट्रिय सार्वजनिक विदा",
        description: "मर्यादा पुरुषोत्तम भगवान् श्रीरामचन्द्रको पवित्र जन्मोत्सव। जनकपुरको राममन्दिर लगायत देशभर विशेष पूजाआजा।"
    },
    {
        id: "ch-5",
        month: 12,
        monthName: "चैत्र",
        dayType: "fixed_bs",
        day: 30,
        dateDisplay: "चैत्र मसान्त",
        name: "वर्षको अन्तिम दिन (चैत्र मसान्त)",
        category: "festival",
        isHoliday: false,
        holidayType: "",
        description: "विक्रम संवत्को वर्ष समापन तथा नयाँ वर्षको पूर्वसन्ध्या।"
    }
];

/**
 * दिइएको महिना अनुसारका पर्वहरू फर्काउँछ (१ = बैशाख, १२ = चैत्र)
 */
function getParvasByMonth(monthNum) {
    if (!monthNum || monthNum < 1 || monthNum > 12) return NEPAL_ANNUAL_PARVAS;
    return NEPAL_ANNUAL_PARVAS.filter(p => p.month === monthNum);
}

/**
 * दिइएको वर्ग (category) अनुसारका पर्वहरू फर्काउँछ
 */
function getParvasByCategory(category) {
    if (!category || category === "all") return NEPAL_ANNUAL_PARVAS;
    if (category === "holiday") return NEPAL_ANNUAL_PARVAS.filter(p => p.isHoliday);
    return NEPAL_ANNUAL_PARVAS.filter(p => p.category === category);
}

/**
 * दिइएको वि.सं. मिति र तिथिको आधारमा आजको पर्व/विदा पत्ता लगाउँछ
 * @param {number} bsYear - वि.सं. वर्ष
 * @param {number} bsMonth - सौर महिना (१-१२)
 * @param {number} bsDay - गते
 * @param {string} tithiName - तिथिको नाम (e.g. सप्तमी)
 * @param {string} paksha - पक्ष (शुक्ल/कृष्ण)
 * @param {Date} adDate - अंग्रेजी मिति
 * @param {number} [chandraMonth] - चान्द्रमास (१-१२, जस्तै ६ = आश्विन, ७ = कार्तिक)
 */
function getParvaForDate(bsYear, bsMonth, bsDay, tithiName, paksha, adDate, chandraMonth) {
    // १. Fixed BS day match (सौर गते अनुसार)
    const fixedMatch = NEPAL_ANNUAL_PARVAS.find(p => p.month === bsMonth && p.dayType === "fixed_bs" && p.day === bsDay);
    if (fixedMatch) return fixedMatch;

    // २. Tithi & Paksha match (चान्द्रमास अनुसार)
    if (tithiName && paksha) {
        const normStr = s => (s || "").replace(/ँ/g, "ं").replace(/[\(\)]/g, "").replace(/\s+/g, "").toLowerCase();
        const cleanTithi = normStr(tithiName);
        const cleanPaksha = paksha.includes("शुक्ल") ? "शुक्ल" : "कृष्ण";
        const lMonth = chandraMonth || bsMonth;

        // चान्द्रमास (तिथिको महिना) मा खोज्ने (e.g. आश्विन शुक्ल सप्तमी -> फूलपाती, कार्तिक कृष्ण औँसी -> लक्ष्मीपूजा)
        const tithiMatch = NEPAL_ANNUAL_PARVAS.find(p => {
            if (p.dayType !== "tithi") return false;
            return p.month === lMonth && cleanTithi.includes(normStr(p.tithiMatch)) && p.pakshaMatch === cleanPaksha;
        });

        if (tithiMatch) return tithiMatch;
    }

    // ३. AD date match
    if (adDate instanceof Date) {
        const adM = adDate.getMonth() + 1;
        const adD = adDate.getDate();
        const adMatch = NEPAL_ANNUAL_PARVAS.find(p => p.dayType === "ad" && p.adMonth === adM && p.adDay === adD);
        if (adMatch) return adMatch;
    }

    return null;
}

// Global scope export for browser environment
if (typeof window !== "undefined") {
    window.NEPAL_ANNUAL_PARVAS = NEPAL_ANNUAL_PARVAS;
    window.getParvasByMonth = getParvasByMonth;
    window.getParvasByCategory = getParvasByCategory;
    window.getParvaForDate = getParvaForDate;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        NEPAL_ANNUAL_PARVAS,
        getParvasByMonth,
        getParvasByCategory,
        getParvaForDate
    };
}
