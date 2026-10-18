/**
 * dasha_phaladesh.js - विंशोत्तरी, योगिनी र त्रिभागी दशा फलादेश मोड्युल
 * Kundali Darsan Web
 */

// ====================================================
// १. योगिनी दशा शास्त्रीय फलादेश डाटा (८ योगिनीहरू)
// ====================================================
const YOGINI_PHALADESH_DATA = {
    "मङ्गला": {
        name: "मङ्गला",
        lord: "चन्द्र",
        years: 1,
        shloka: "मङ्गलायां भवेन्मङ्गलं सर्वसौख्यं धनागमम् । विप्रपूजा रतिर्धर्मे चित्तशुद्धिर्मनोरमा ॥",
        nature: "परम शुभ एवं मङ्गलकारी",
        general: "मङ्गला दशा जीवनमा सुख, शान्ति र मङ्गलमय वातावरण ल्याउने दशा हो । यस अवधिमा मानसिक शान्ति मिल्छ र धर्मकर्ममा रुचि बढ्छ ।",
        favorable: "घरमा मांगलिक कार्य (विवाह, उत्सव, व्रतबन्ध), द्रव्य लाभ, उत्तम वस्त्र तथा आभूषणको प्राप्ति, मित्र तथा बन्धुबान्धवबाट सहयोग र मनमा प्रसन्नता मिल्छ ।",
        unfavorable: "यदि चन्द्रमा निर्बली वा पापयुक्त भएमा सामान्य रुघाखोकी, कफ विकार, चञ्चलता वा माताको स्वास्थ्यमा सामान्य उतार-चढाव हुन सक्छ ।",
        remedy: "सोमबार भगवान शिवको पूजा-आराधना गर्ने, शिवलिंगमा दूध र जल अर्पण गर्ने, ॐ सों सोमाय नमः मन्त्र जप्ने र सेतो वस्तु दान गर्ने ।"
    },
    "पिङ्गला": {
        name: "पिङ्गला",
        lord: "सूर्य",
        years: 2,
        shloka: "पिङ्गलायां मनोव्याधिः पित्तप्रकोप एव च । बन्धुनाशो मनस्तापो राजभीतिर्धनाक्षयः ॥",
        nature: "उष्ण, पराक्रमी एवं मिश्रित फलदायी",
        general: "पिङ्गला दशामा आत्माभिमान, ऊर्जा, प्रशासनिक तथा सरकारी कार्यमा सफलता मिल्छ । तर स्वभावमा रिस र शरीरमा पित्त बढ्न सक्छ ।",
        favorable: "राज्यपक्ष वा उच्च अधिकारीबाट सहयोग, मान-सम्मान, कीर्ति विस्तार, नेतृत्व क्षमताको विकास, पिताको आशीर्वाद र प्रतिस्पर्धीमाथि विजय ।",
        unfavorable: "आँखाको समस्या, टाउको दुखाइ, पित्तविकार, आफन्तसँग अहङ्कारवश मतभेद वा अनावश्यक विवादबाट जोगिनुपर्छ ।",
        remedy: "प्रत्येक बिहान सूर्यलाई तामाको लोटाबाट अर्घ्य दिने, आदित्य हृदय स्तोत्र पाठ गर्ने, ॐ घृणि सूर्याय नमः मन्त्र जप्ने र पिताको सेवा गर्ने ।"
    },
    "धन्या": {
        name: "धन्या",
        lord: "गुरु",
        years: 3,
        shloka: "धन्यायां धनधान्यादि समृद्धिर्विजयो रणे । गुरुभक्तिः सुतोत्पत्तिर्विद्यालाभो महोदयः ॥",
        nature: "सौभाग्यवर्धक एवं धनधान्य प्रदायक",
        general: "धन्या दशा नाम जस्तै धन, धान्य, विद्या र ऐश्वर्य बढाउने परम शुभ दशा हो । बुद्धि-विवेकले सबै कार्य सफल हुन्छन् ।",
        favorable: "व्यापार तथा नोकरीमा आर्थिक उन्नति, सन्तान लाभ वा सन्तानको प्रगति, समाजमा उच्च प्रतिष्ठा, धार्मिक यात्रा, गुरुजनको आशिष र ज्ञानवृद्धि ।",
        unfavorable: "कलेजो वा मोटोपनसम्बन्धी समस्या, खानपानमा लापरबाही वा धर्मकर्ममा अलमल हुन सक्छ ।",
        remedy: "भगवान विष्णुको आराधना गर्ने, बिहीबार विष्णु सहस्रनाम पाठ गर्ने, ॐ बृं बृहस्पतये नमः मन्त्र जप्ने र पहेंलो वस्तु दान गर्ने ।"
    },
    "भ्रामरी": {
        name: "भ्रामरी",
        lord: "मङ्गल",
        years: 4,
        shloka: "भ्रामर्यां भ्रमते देशे स्थानाद् भ्रंशो मनोगतिः । कलहो बन्धुभिः सार्धं वित्तहानिर्महद् भयम् ॥",
        nature: "गतिशील, भ्रमणकारी एवं उग्र",
        general: "भ्रामरी दशामा भ्रमण, स्थान परिवर्तन र दौडधूप बढी हुन्छ । पराक्रम उच्च रहे पनि मन कहिलेकाहीँ अस्थिर हुन सक्छ ।",
        favorable: "साहस, पराक्रम, इन्जिनियरिङ वा प्राविधिक कार्यमा सफलता, घरजग्गाको कारोबारबाट लाभ र शत्रु दमन ।",
        unfavorable: "यात्रामा कष्ट, चोटपटक, रक्तविकार, अत्यधिक रिस वा उत्तेजना र कुटुम्बसँग वादविवादबाट बच्नुपर्छ ।",
        remedy: "हनुमान चालिसाको नियमित पाठ गर्ने, मंगलबार हनुमानजीलाई सिन्दूर र रातो फूल अर्पण गर्ने, ॐ अं अङ्गारकाय नमः मन्त्र जप्ने ।"
    },
    "भद्रिका": {
        name: "भद्रिका",
        lord: "बुध",
        years: 5,
        shloka: "भद्रिकायां भवेद् भद्रं नृपमानं सुहृत्सुखम् । सर्वकार्येषु सिद्धिः स्याद् वाक्पटुत्वं धनागमम् ॥",
        nature: "कल्याणकारी, सौम्य एवं बुद्धिप्रदायक",
        general: "भद्रिका दशा अत्यन्त भद्र, सभ्य र कल्याणकारी दशा हो । बुद्धि, वाणी र व्यापारमा यस समयमा चमत्कारिक प्रगति हुन्छ ।",
        favorable: "व्यापार-व्यवसायमा नयाँ सम्झौता, अध्ययन-अध्यापनमा सफलता, लेखन तथा वाक्पटुताबाट लाभ, आफन्तसँग सुमधुर सम्बन्ध र सुखद वातावरण ।",
        unfavorable: "स्नायु दुर्बलता, छालाको समस्या, बोलीमा भ्रम वा द्विचर मनस्थितिबाट सावधान रहनुपर्छ ।",
        remedy: "भगवान गणेशको आराधना गर्ने, बुधबार दुबो र लड्डु अर्पण गर्ने, ॐ बुं बुधाय नमः मन्त्र जप्ने र गाईलाई हरियो घाँस खुवाउने ।"
    },
    "उल्का": {
        name: "उल्का",
        lord: "शनि",
        years: 6,
        shloka: "उल्कायां नृपतेर्भीतिर्हृद्रोगो बान्धवक्षयः । कलहो रिपुवृद्धिः स्याद् दन्तनेत्ररुजा तथा ॥",
        nature: "धैर्यपरीक्षक, गम्भीर एवं वैराग्यप्रद",
        general: "उल्का दशा कर्मफल र धैर्यको परीक्षा लिने समय हो । काममा ढिलाइ वा मानसिक तनाव आए पनि कडा परिश्रमले दीर्घकालीन सफलता मिल्छ ।",
        favorable: "प्राविधिक कार्य, फलाम, तेल वा पुराना कामबाट लाभ, आध्यात्मिक साधना, वैराग्य, न्याय र धैर्यवान् बन्ने अवसर ।",
        unfavorable: "वातरोग, जोर्नी दुखाइ, अल्छीपन, झुटो आरोप, काममा विलम्ब वा पारिवारिक चिन्ताबाट जोगिनुपर्छ ।",
        remedy: "शनिबार पीपलको रुखमा जल र तिलको तेलको दीप बाल्ने, दीन-दुःखीलाई भोजन गराउने, ॐ शं शनैश्चराय नमः मन्त्र जप्ने ।"
    },
    "सिद्धा": {
        name: "सिद्धा",
        lord: "शुक्र",
        years: 7,
        shloka: "सिद्धायां सिद्ध्यते सर्वं वाञ्छितं सुखसम्पदः । गजाश्ववाहनं सौख्यं वस्त्रभूषणमङ्गलम् ॥",
        nature: "सर्वसिद्धिदायक, विलासी एवं ऐश्वर्यप्रद",
        general: "सिद्धा दशा सबै मनोकामना सिद्ध गर्ने सर्वोत्कृष्ट दशा हो । जीवनमा भौतिक सुख, प्रेम, विवाह र ऐश्वर्यको आनन्द प्राप्त हुन्छ ।",
        favorable: "नयाँ सवारी साधन वा घर खरिद, वैवाहिक सुख, कला-साहित्य वा मनोरञ्जनबाट ख्याति, व्यापारमा विशाल लाभ र उत्तम भोजन ।",
        unfavorable: "विलासितामा अत्यधिक धनको अपव्यय, इन्द्रिय सुखमा अति लिप्त हुनु वा स्वास्थ्यमा लापरबाहीबाट जोगिनुपर्छ ।",
        remedy: "भगवती महालक्ष्मीको पूजा गर्ने, श्रीसूक्त पाठ गर्ने, शुक्रबार सेतो मिष्ठान्न वा खीर दान गर्ने, ॐ शुं शुक्राय नमः मन्त्र जप्ने ।"
    },
    "सङ्कटा": {
        name: "सङ्कटा",
        lord: "राहु",
        years: 8,
        shloka: "सङ्कटायां महाकष्टं बन्धुनाशो धनाक्षयः । स्थानाद् भ्रंशो महद् दुःखं व्याधयश्च पदे पदे ॥",
        nature: "आकस्मिक, रहस्यमय एवं उथलपुथलकारी",
        general: "सङ्कटा दशा जीवनमा अचानक संकट र उथलपुथल ल्याउन सक्ने दशा मानिन्छ । तर वैदेशिक कार्य, राजनीति र अनुसन्धानमा यसले अप्रत्याशित सफलता पनि दिन्छ ।",
        favorable: "विदेश यात्रा वा वैदेशिक रोजगारीमा सफलता, राजनीति वा कूटनीतिमा प्रभाव, अचानक ठूलो धनलाभ र रहस्यमय ज्ञान ।",
        unfavorable: "अज्ञात भय, शंका-उपशंका, कानूनी वा सरकारी झमेला, स्वास्थ्यमा अचानक समस्या वा विश्वासघातबाट बच्नुपर्छ ।",
        remedy: "संकटनाशन गणेश स्तोत्र वा दुर्गा सप्तशती पाठ गर्ने, भैरव मन्दिर दर्शन गर्ने, ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः मन्त्र जप्ने ।"
    }
};

// ====================================================
// २. त्रिभागी दशा शास्त्रीय फलादेश डाटा (९ ग्रहहरू - ४० वर्षे चक्र)
// ====================================================
const TRIBHAGI_PHALADESH_DATA = {
    "केतु": {
        lord: "केतु",
        yearsLabel: "२ वर्ष ४ महिना",
        general: "त्रिभागी पद्धतिमा केतुको २ वर्ष ४ महिनाको दशामा आध्यात्मिक जागृति, गूढ विद्या र अचानक जीवनशैलीमा परिवर्तन आउँछ । तीव्र गतिको ऊर्जा प्रवाह हुन्छ ।",
        favorable: "तीर्थाटन, धर्मकर्म, अनुसन्धानमा सफलता, अचानक धनलाभ र ईश्वरीय मद्दत प्राप्त हुन्छ ।",
        unfavorable: "मानसिक भ्रम, छाला वा एलर्जीसम्बन्धी समस्या र कुटुम्बसँग मनमुटावबाट सतर्क रहनुपर्छ ।",
        remedy: "भगवान गणेशको संकटनाशन स्तोत्र पाठ गर्ने, कालो कुकुरलाई रोटी खुवाउने, ॐ कें केतवे नमः मन्त्र जप्ने ।"
    },
    "शुक्र": {
        lord: "शुक्र",
        yearsLabel: "६ वर्ष ८ महिना",
        general: "त्रिभागीमा शुक्रको ६ वर्ष ८ महिनाको दशा भौतिक ऐश्वर्य, प्रेम, विवाह र सांसारिक सुखका दृष्टिले अत्यन्त महत्त्वपूर्ण मानिन्छ ।",
        favorable: "आर्थिक उन्नति, नयाँ वाहन वा आभूषण प्राप्ति, दाम्पत्य जीवनमा मधुरता, कला र व्यापारबाट लाभ ।",
        unfavorable: "अनावश्यक विलासितामा धनको अपव्यय, मूत्र वा मधुमेहसम्बन्धी समस्याबाट सावधान रहनुपर्छ ।",
        remedy: "शुक्रबार भगवती लक्ष्मीको पूजा गर्ने, श्रीसूक्त पाठ गर्ने, ॐ शुं शुक्राय नमः मन्त्र जप्ने र सेतो वस्तु दान गर्ने ।"
    },
    "सूर्य": {
        lord: "सूर्य",
        yearsLabel: "२ वर्ष",
        general: "त्रिभागी चक्रमा सूर्यको २ वर्षको महादशा संक्षिप्त तर अत्यन्त प्रभावशाली हुन्छ । यसले आत्मबल र राज्यपक्षबाट प्रतिष्ठा दिलाउँछ ।",
        favorable: "सरकारी काम बन्ने, उच्च पद, समाजमा नेतृत्व, पिताको सहयोग र प्रतिस्पर्धीमाथि विजय ।",
        unfavorable: "अहङ्कार, क्रोध, आँखाको समस्या वा उच्च रक्तचापबाट जोगिनुपर्छ ।",
        remedy: "बिहान सूर्य नमस्कार गर्ने, तामाको लोटाबाट जल अर्पण गर्ने, ॐ घृणि सूर्याय नमः मन्त्र जप्ने ।"
    },
    "चन्द्र": {
        lord: "चन्द्र",
        yearsLabel: "३ वर्ष ४ महिना",
        general: "त्रिभागीमा चन्द्रको ३ वर्ष ४ महिनाको दशामा मनको शान्ति, जनसम्पर्क, सौन्दर्य र जलसम्बन्धी कार्यबाट लाभ मिल्छ ।",
        favorable: "पारिवारिक सुख, माताको स्नेह, मन प्रसन्न, रचनात्मक कार्य र व्यापारमा नयाँ ग्राहक वृद्धि ।",
        unfavorable: "अत्यधिक भावुकता, चञ्चलता वा चिसो/कफ विकारबाट जोगिनुपर्छ ।",
        remedy: "सोमबार शिवजीको पूजा गर्ने, ॐ नमः शिवाय वा ॐ सों सोमाय नमः मन्त्र जप्ने, माताको सेवा गर्ने ।"
    },
    "मङ्गल": {
        lord: "मङ्गल",
        yearsLabel: "२ वर्ष ४ महिना",
        general: "त्रिभागी मङ्गलको २ वर्ष ४ महिनाको दशामा अदम्य साहस, ऊर्जा र पराक्रम देखिन्छ । गति र निर्णय क्षमता तीव्र हुन्छ ।",
        favorable: "भूमि, भवन वा जग्गाजमिनको कारोबारबाट लाभ, सेना/प्रहरी/इन्जिनियरिङमा उन्नति र शत्रु दमन ।",
        unfavorable: "चोटपटक, रक्तविकार, अत्यधिक क्रोध र भाइहरूसँगको विवादबाट बच्नुपर्छ ।",
        remedy: "हनुमान चालिसा पाठ गर्ने, मंगलबार हनुमानजीको दर्शन गर्ने, ॐ अं अङ्गारकाय नमः मन्त्र जप्ने ।"
    },
    "राहु": {
        lord: "राहु",
        yearsLabel: "६ वर्ष",
        general: "त्रिभागी राहुको ६ वर्षे दशामा तीव्र महत्वाकांक्षा, वैदेशिक सम्पर्क, अचानक परिवर्तन र राजनीतिक प्रभाव बढ्छ ।",
        favorable: "विदेशबाट ठूलो लाभ, प्रविधि, राजनीति वा अनुसन्धानमा सफलता र आकस्मिक धनप्राप्ति ।",
        unfavorable: "भ्रम, गलत संगत, आर्थिक जोखिम, नशारोग वा प्रतिष्ठामा चुनौतीबाट बच्नुपर्छ ।",
        remedy: "दुर्गा सप्तशती पाठ गर्ने, भैरव दर्शन गर्ने, ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः मन्त्र जप्ने ।"
    },
    "गुरु": {
        lord: "गुरु",
        yearsLabel: "५ वर्ष ४ महिना",
        general: "त्रिभागी गुरुको ५ वर्ष ४ महिनाको दशा ज्ञान, धर्म, सन्तान र धन समृद्धिका लागि स्वर्णिम समय मानिन्छ ।",
        favorable: "उच्च विद्या, धार्मिक कीर्ति, सन्तान सुख, व्यापारमा स्थायित्व र गुरुजनको आशिष ।",
        unfavorable: "कलेजो वा मोटोपनसम्बन्धी समस्या, अत्यधिक उदारताबाट बच्नुपर्छ ।",
        remedy: "विष्णु सहस्रनाम पाठ गर्ने, बिहीबार पहेंलो वस्तु दान गर्ने, ॐ बृं बृहस्पतये नमः मन्त्र जप्ने ।"
    },
    "शनि": {
        lord: "शनि",
        yearsLabel: "६ वर्ष ४ महिना",
        general: "त्रिभागी शनिदेवको ६ वर्ष ४ महिनाको दशामा कडा परिश्रम, धैर्य र अनुशासनले जीवनको स्थायी जग बसाल्छ ।",
        favorable: "फलाम, तेल, कृषि वा प्राविधिक कार्यबाट लाभ, जनताको विश्वास र दीर्घकालीन उन्नति ।",
        unfavorable: "काममा ढिलासुस्ती, जोर्नी दुखाइ, अल्छीपन वा पारिवारिक दूरीबाट जोगिनुपर्छ ।",
        remedy: "शनिबार पीपलमा जल र दीप बाल्ने, असहायको सेवा गर्ने, ॐ शं शनैश्चराय नमः मन्त्र जप्ने ।"
    },
    "बुध": {
        lord: "बुध",
        yearsLabel: "५ वर्ष ८ महिना",
        general: "त्रिभागी बुधको ५ वर्ष ८ महिनाको दशामा तीक्ष्ण बुद्धि, वाक्पटुता, व्यापारिक सफलता र विद्यालाभ हुन्छ ।",
        favorable: "अध्ययनमा उत्कृष्टता, नयाँ व्यापारिक अवसर, लेखन, पत्रकारिता वा सञ्चारबाट ख्याति ।",
        unfavorable: "स्नायु तनाव, बोलीमा भ्रम वा द्विचर मनस्थितिबाट बच्नुपर्छ ।",
        remedy: "भगवान गणेशको पूजा गर्ने, बुधबार दुबो चढाउने, ॐ बुं बुधाय नमः मन्त्र जप्ने ।"
    }
};

// ====================================================
// ३. संयुक्त अन्तर्दशा फल विश्लेषक (Antardasha Combination Interpreter)
// ====================================================

function getVimshottariAntarInterpretation(mahaLord, antarLord) {
    if (!mahaLord || !antarLord) return "";
    if (mahaLord === antarLord) {
        return `<strong>${mahaLord} महादशामा आफ्नै ${antarLord} अन्तर्दशा (स्वभुक्ति):</strong> यस अवधिमा ${mahaLord} ग्रहको मूल स्वभाव र कारकतत्व पूर्ण रूपमा सक्रिय रहन्छ । कार्यमा तीव्रता आउँछ र जीवनमा स्पष्ट दिशानिर्देश प्राप्त हुन्छ ।`;
    }

    const friendlyPairs = [
        ["सूर्य", "चन्द्र"], ["सूर्य", "गुरु"], ["सूर्य", "मङ्गल"],
        ["चन्द्र", "बुध"], ["चन्द्र", "गुरु"], ["मङ्गल", "गुरु"],
        ["बुध", "शुक्र"], ["बुध", "शनि"], ["गुरु", "चन्द्र"],
        ["शुक्र", "शनि"], ["शुक्र", "बुध"], ["शनि", "बुध"]
    ];

    const enemyPairs = [
        ["सूर्य", "शनि"], ["सूर्य", "राहु"], ["सूर्य", "केतु"],
        ["चन्द्र", "राहु"], ["चन्द्र", "केतु"], ["मङ्गल", "शनि"],
        ["मङ्गल", "राहु"], ["गुरु", "शुक्र"], ["शनि", "सूर्य"],
        ["राहु", "सूर्य"], ["केतु", "सूर्य"]
    ];

    const isFriend = friendlyPairs.some(([a, b]) => (a === mahaLord && b === antarLord) || (b === mahaLord && a === antarLord));
    const isEnemy = enemyPairs.some(([a, b]) => (a === mahaLord && b === antarLord) || (b === mahaLord && a === antarLord));

    if (isFriend) {
        return `<strong>${mahaLord} महादशामा ${antarLord} अन्तर्दशा (मित्र भुक्ति):</strong> दुवै ग्रहहरू अनुकूल प्रकृतिका भएकाले यो समय अत्यन्त फलदायी, आर्थिक दृष्टिले लाभप्रद र सामाजिक प्रतिष्ठा बढाउने हुन्छ । नयाँ अवसरहरूको ढोका खुल्छ ।`;
    } else if (isEnemy) {
        return `<strong>${mahaLord} महादशामा ${antarLord} अन्तर्दशा (सङ्घर्ष भुक्ति):</strong> दुई परस्पर विपरित प्रकृतिका ग्रहहरूको समय भएकाले काममा केही अवरोध, मानसिक तनाव वा उतार-चढाव आउन सक्छ । धैर्य र सम्बन्धित ग्रहको शान्ति उपाय गर्दा लाभ मिल्छ ।`;
    } else {
        return `<strong>${mahaLord} महादशामा ${antarLord} अन्तर्दशा (सम भुक्ति):</strong> यो समय सामान्य र सन्तुलित रहन्छ । परिश्रम अनुसारको फल प्राप्त हुन्छ र समझदारीपूर्वक अगाडि बढ्दा प्रगति हुन्छ ।`;
    }
}

function getYoginiAntarInterpretation(mahaYogini, antarYogini) {
    if (!mahaYogini || !antarYogini) return "";
    if (mahaYogini === antarYogini) {
        return `<strong>${mahaYogini} महादशामा ${antarYogini} अन्तर्दशा (स्वभुक्ति):</strong> ${mahaYogini} योगिनीको पूर्ण प्रभाव सक्रिय रहने समय हो । यस अवधिमा शुभ कार्यको थालनी र आत्मिक शान्ति प्राप्त हुन्छ ।`;
    }

    const auspicious = ["मङ्गला", "धन्या", "भद्रिका", "सिद्धा"];
    const isBothAuspicious = auspicious.includes(mahaYogini) && auspicious.includes(antarYogini);
    const hasSankataOrUlka = (mahaYogini === "सङ्कटा" || antarYogini === "सङ्कटा" || mahaYogini === "उल्का" || antarYogini === "उल्का");

    if (isBothAuspicious) {
        return `<strong>${mahaYogini} महादशामा ${antarYogini} अन्तर्दशा:</strong> दुवै कल्याणकारी योगिनीहरूको संगम भएकाले घरमा हर्षोल्लास, कार्यसिद्धि, धनधान्य लाभ र सुखद समाचार प्राप्त हुने योग छ ।`;
    } else if (hasSankataOrUlka) {
        return `<strong>${mahaYogini} महादशामा ${antarYogini} अन्तर्दशा:</strong> यो समय संयम र धैर्य राख्नुपर्ने समय हो । अनावश्यक यात्रा, स्वास्थ्य वा विवादबाट सतर्क रही नियमित कुलदेवता तथा भगवतीको आराधना गर्दा संकट टर्छ ।`;
    } else {
        return `<strong>${mahaYogini} महादशामा ${antarYogini} अन्तर्दशा:</strong> पराक्रम, भ्रमण र परिश्रमबाट सफलता दिलाउने मध्यम फलदायी समय रहनेछ ।`;
    }
}

function getTribhagiAntarInterpretation(mahaLord, antarLord) {
    return getVimshottariAntarInterpretation(mahaLord, antarLord).replace("विंशोत्तरी", "त्रिभागी");
}

// ====================================================
// ४. विंशोत्तरी फलादेश सेक्सन रेन्डरर
// ====================================================
function renderVimshottariPhaladeshSection(dasha) {
    if (!dasha) return "";

    const current = dasha.current || {};
    const curMaha = current.mahadasha || dasha.initialLord || "चन्द्र";
    const curAnt = current.antardasha || curMaha;

    const mahaList = ["सूर्य", "चन्द्र", "मङ्गल", "राहु", "गुरु", "शनि", "बुध", "केतु", "शुक्र"];
    const curIdx = mahaList.indexOf(curMaha);
    const dashaId = curIdx >= 0 ? curIdx + 1 : 2;

    const dData = (typeof MAHADASHA_PHALADESH_DATA !== "undefined" && MAHADASHA_PHALADESH_DATA[dashaId]) 
        ? MAHADASHA_PHALADESH_DATA[dashaId] 
        : {
            lord: `${curMaha} महादशा`,
            general: `${curMaha}को महादशामा जीवनमा कर्म अनुसारको फल प्राप्त हुन्छ ।`,
            favorable: "शुभ प्रभाव र सफलता मिल्छ ।",
            unfavorable: "संयम र धैर्य आवश्यक पर्छ ।",
            remedy: "नियमित कुलदेवता तथा इष्टदेवको पूजा गर्ने ।"
        };

    const antarText = getVimshottariAntarInterpretation(curMaha, curAnt);

    // अन्य सबै ग्रहहरूको कार्डहरू
    const allCardsHtml = mahaList.map((pName, pIdx) => {
        const pId = pIdx + 1;
        const pData = (typeof MAHADASHA_PHALADESH_DATA !== "undefined" && MAHADASHA_PHALADESH_DATA[pId])
            ? MAHADASHA_PHALADESH_DATA[pId]
            : null;
        if (!pData) return "";

        const isCurrentP = (pName === curMaha);
        return `
            <div class="dasha-grid-card ${isCurrentP ? 'card-current-active' : ''}">
                <div class="dasha-grid-card-head">
                    <span class="card-planet-title">🪐 ${pData.lord}</span>
                    <span class="card-years-badge">${pData.years} वर्ष</span>
                    ${isCurrentP ? '<span class="badge-pulse-active-sm">सक्रिय</span>' : ''}
                </div>
                <div class="dasha-grid-card-body">
                    <p class="phal-text"><strong>सामान्य फल:</strong> ${pData.general}</p>
                    <p class="phal-text text-green"><strong>शुभ फल:</strong> ${pData.favorable}</p>
                    <p class="phal-text text-orange"><strong>सावधानी:</strong> ${pData.unfavorable}</p>
                    <div class="phal-remedy-box"><strong>उपाय:</strong> ${pData.remedy}</div>
                </div>
            </div>
        `;
    }).join("");

    return `
        <div class="dasha-phaladesh-container">
            <div class="dasha-phaladesh-header">
                <div class="dasha-phal-badge">🔮 दशा फलादेश विचार</div>
                <h3 class="dasha-phal-title">📜 विंशोत्तरी महादशा तथा अन्तर्दशा फल</h3>
                <p class="dasha-phal-subtitle">१२० वर्षे शास्त्रीय विंशोत्तरी चक्र अनुसार जीवनमा पर्ने प्रभाव, शुभ-अशुभ फल तथा सरल वैदिक शान्ति उपायहरू</p>
            </div>

            <!-- १. वर्तमान सक्रिय विंशोत्तरी दशा फल (हाइलाइट कार्ड) -->
            <div class="dasha-active-phal-card">
                <div class="active-phal-top">
                    <div class="active-phal-badge">🌟 वर्तमान सक्रिय दशा फलादेश</div>
                    <h4 class="active-phal-heading">${curMaha} महादशा ➔ ${curAnt} अन्तर्दशा</h4>
                </div>
                
                <div class="active-phal-content">
                    <div class="phal-block">
                        <h5>📖 महादशाको सामान्य प्रभाव:</h5>
                        <p>${dData.general}</p>
                    </div>

                    <div class="phal-block-row">
                        <div class="phal-sub-col col-favorable">
                            <h6>🌿 शुभ फल एवं अनुकूलता:</h6>
                            <p>${dData.favorable}</p>
                        </div>
                        <div class="phal-sub-col col-unfavorable">
                            <h6>⚠️ सावधानी तथा सतर्कता:</h6>
                            <p>${dData.unfavorable}</p>
                        </div>
                    </div>

                    ${antarText ? `
                        <div class="phal-block phal-block-antar">
                            <h5>⚡ सक्रिय अन्तर्दशाको संयुक्त फल:</h5>
                            <p>${antarText}</p>
                        </div>
                    ` : ''}

                    <div class="phal-block phal-block-remedy">
                        <h5>📿 सरल वैदिक शान्ति उपाय तथा मन्त्र:</h5>
                        <p>${dData.remedy}</p>
                    </div>
                </div>
            </div>

            <!-- २. सबै ९ ग्रहहरूको महादशा फलादेश सङ्ग्रह -->
            <div class="dasha-all-section">
                <h4 class="dasha-all-section-title">📊 सबै ९ ग्रहहरूको विंशोत्तरी महादशा फल सारसंक्षेप</h4>
                <div class="dasha-all-grid">
                    ${allCardsHtml}
                </div>
            </div>
        </div>
    `;
}

// ====================================================
// ५. योगिनी फलादेश सेक्सन रेन्डरर
// ====================================================
function renderYoginiPhaladeshSection(yoginiDasha) {
    if (!yoginiDasha) return "";

    const current = yoginiDasha.current || {};
    const curMaha = current.mahadasha || yoginiDasha.initialYogini || "मङ्गला";
    const curAnt = current.antardasha || curMaha;

    const curData = YOGINI_PHALADESH_DATA[curMaha] || YOGINI_PHALADESH_DATA["मङ्गला"];
    const antarText = getYoginiAntarInterpretation(curMaha, curAnt);

    const yoginiNames = ["मङ्गला", "पिङ्गला", "धन्या", "भ्रामरी", "भद्रिका", "उल्का", "सिद्धा", "सङ्कटा"];
    const allCardsHtml = yoginiNames.map((yName, yIdx) => {
        const item = YOGINI_PHALADESH_DATA[yName];
        if (!item) return "";

        const isCurrentY = (yName === curMaha);
        return `
            <div class="dasha-grid-card yogini-card ${isCurrentY ? 'card-current-active-yogini' : ''}">
                <div class="dasha-grid-card-head head-yogini">
                    <span class="card-planet-title">🌸 ${item.name} (${item.lord})</span>
                    <span class="card-years-badge badge-rose">${item.years} वर्ष</span>
                    ${isCurrentY ? '<span class="badge-pulse-active-sm">सक्रिय</span>' : ''}
                </div>
                <div class="dasha-grid-card-body">
                    <div class="yogini-shloka-quote">"${item.shloka}"</div>
                    <p class="phal-text"><strong>सामान्य फल:</strong> ${item.general}</p>
                    <p class="phal-text text-green"><strong>शुभ फल:</strong> ${item.favorable}</p>
                    <p class="phal-text text-orange"><strong>सावधानी:</strong> ${item.unfavorable}</p>
                    <div class="phal-remedy-box remedy-rose"><strong>उपाय:</strong> ${item.remedy}</div>
                </div>
            </div>
        `;
    }).join("");

    return `
        <div class="dasha-phaladesh-container container-yogini">
            <div class="dasha-phaladesh-header">
                <div class="dasha-phal-badge badge-rose">🌸 योगिनी दशा फलादेश</div>
                <h3 class="dasha-phal-title title-rose">📜 योगिनी महादशा तथा अन्तर्दशा फल</h3>
                <p class="dasha-phal-subtitle">३६ वर्षे शास्त्रीय योगिनी चक्र अनुसार ८ योगिनीहरूको फल, शुभ-अशुभ लक्षण एवं शान्ति विधान</p>
            </div>

            <!-- १. वर्तमान सक्रिय योगिनी दशा फल (हाइलाइट कार्ड) -->
            <div class="dasha-active-phal-card card-active-rose">
                <div class="active-phal-top">
                    <div class="active-phal-badge badge-rose">🌟 वर्तमान सक्रिय योगिनी फलादेश</div>
                    <h4 class="active-phal-heading text-rose">${curMaha} (${curData.lord}) ➔ ${curAnt}</h4>
                </div>
                
                <div class="active-phal-content">
                    <div class="yogini-highlight-shloka">
                        ॥ ${curData.shloka} ॥
                    </div>

                    <div class="phal-block">
                        <h5>📖 ${curMaha} योगिनीको मूल प्रभाव (${curData.nature}):</h5>
                        <p>${curData.general}</p>
                    </div>

                    <div class="phal-block-row">
                        <div class="phal-sub-col col-favorable">
                            <h6>🌿 शुभ फल एवं समृद्धि:</h6>
                            <p>${curData.favorable}</p>
                        </div>
                        <div class="phal-sub-col col-unfavorable">
                            <h6>⚠️ सावधानी तथा सतर्कता:</h6>
                            <p>${curData.unfavorable}</p>
                        </div>
                    </div>

                    ${antarText ? `
                        <div class="phal-block phal-block-antar">
                            <h5>⚡ सक्रिय अन्तर्दशाको संयुक्त फल:</h5>
                            <p>${antarText}</p>
                        </div>
                    ` : ''}

                    <div class="phal-block phal-block-remedy remedy-rose-block">
                        <h5>📿 सरल वैदिक शान्ति उपाय तथा मन्त्र:</h5>
                        <p>${curData.remedy}</p>
                    </div>
                </div>
            </div>

            <!-- २. ८ वटै योगिनीहरूको फलादेश सङ्ग्रह -->
            <div class="dasha-all-section">
                <h4 class="dasha-all-section-title">🌸 ८ वटै योगिनीहरूको शास्त्रीय फलादेश तथा उपाय विवरण</h4>
                <div class="dasha-all-grid">
                    ${allCardsHtml}
                </div>
            </div>
        </div>
    `;
}

// ====================================================
// ६. त्रिभागी फलादेश सेक्सन रेन्डरर
// ====================================================
function renderTribhagiPhaladeshSection(tribhagiDasha) {
    if (!tribhagiDasha) return "";

    const current = tribhagiDasha.current || {};
    const curMaha = current.mahadasha || tribhagiDasha.initialLord || "गुरु";
    const curAnt = current.antardasha || curMaha;

    const curData = TRIBHAGI_PHALADESH_DATA[curMaha] || TRIBHAGI_PHALADESH_DATA["गुरु"];
    const antarText = getTribhagiAntarInterpretation(curMaha, curAnt);

    const lordsList = ["केतु", "शुक्र", "सूर्य", "चन्द्र", "मङ्गल", "राहु", "गुरु", "शनि", "बुध"];
    const allCardsHtml = lordsList.map((pName, pIdx) => {
        const item = TRIBHAGI_PHALADESH_DATA[pName];
        if (!item) return "";

        const isCurrentT = (pName === curMaha);
        return `
            <div class="dasha-grid-card tribhagi-card ${isCurrentT ? 'card-current-active-tribhagi' : ''}">
                <div class="dasha-grid-card-head head-tribhagi">
                    <span class="card-planet-title">⚡ ${item.lord} महादशा</span>
                    <span class="card-years-badge badge-purple">${item.yearsLabel}</span>
                    ${isCurrentT ? '<span class="badge-pulse-active-sm">सक्रिय</span>' : ''}
                </div>
                <div class="dasha-grid-card-body">
                    <p class="phal-text"><strong>सामान्य फल:</strong> ${item.general}</p>
                    <p class="phal-text text-green"><strong>शुभ फल:</strong> ${item.favorable}</p>
                    <p class="phal-text text-orange"><strong>सावधानी:</strong> ${item.unfavorable}</p>
                    <div class="phal-remedy-box remedy-purple"><strong>उपाय:</strong> ${item.remedy}</div>
                </div>
            </div>
        `;
    }).join("");

    return `
        <div class="dasha-phaladesh-container container-tribhagi">
            <div class="dasha-phaladesh-header">
                <div class="dasha-phal-badge badge-purple">⚡ त्रिभागी दशा फलादेश</div>
                <h3 class="dasha-phal-title title-purple">📜 त्रिभागी महादशा तथा अन्तर्दशा फल</h3>
                <p class="dasha-phal-subtitle">४० वर्षे संकुचित चक्र (विंशोत्तरीको १/३ भाग) अनुसार ९ ग्रहहरूको तीव्र फल एवं वैदिक उपायहरू</p>
            </div>

            <!-- १. वर्तमान सक्रिय त्रिभागी दशा फल (हाइलाइट कार्ड) -->
            <div class="dasha-active-phal-card card-active-purple">
                <div class="active-phal-top">
                    <div class="active-phal-badge badge-purple">🌟 वर्तमान सक्रिय त्रिभागी फलादेश</div>
                    <h4 class="active-phal-heading text-purple">${curMaha} महादशा ➔ ${curAnt} अन्तर्दशा (${curData.yearsLabel})</h4>
                </div>
                
                <div class="active-phal-content">
                    <div class="phal-block">
                        <h5>📖 त्रिभागी पद्धतिमा ${curMaha}को प्रभाव:</h5>
                        <p>${curData.general}</p>
                    </div>

                    <div class="phal-block-row">
                        <div class="phal-sub-col col-favorable">
                            <h6>🌿 शुभ फल एवं अनुकूलता:</h6>
                            <p>${curData.favorable}</p>
                        </div>
                        <div class="phal-sub-col col-unfavorable">
                            <h6>⚠️ सावधानी तथा सतर्कता:</h6>
                            <p>${curData.unfavorable}</p>
                        </div>
                    </div>

                    ${antarText ? `
                        <div class="phal-block phal-block-antar">
                            <h5>⚡ सक्रिय अन्तर्दशाको संयुक्त फल:</h5>
                            <p>${antarText}</p>
                        </div>
                    ` : ''}

                    <div class="phal-block phal-block-remedy remedy-purple-block">
                        <h5>📿 सरल वैदिक शान्ति उपाय तथा मन्त्र:</h5>
                        <p>${curData.remedy}</p>
                    </div>
                </div>
            </div>

            <!-- २. सबै ९ ग्रहहरूको त्रिभागी फलादेश सङ्ग्रह -->
            <div class="dasha-all-section">
                <h4 class="dasha-all-section-title">⚡ ९ वटै ग्रहहरूको त्रिभागी दशा फल विवरण (४० वर्षे चक्र)</h4>
                <div class="dasha-all-grid">
                    ${allCardsHtml}
                </div>
            </div>
        </div>
    `;
}

// Global exposures
if (typeof window !== "undefined") {
    window.YOGINI_PHALADESH_DATA = YOGINI_PHALADESH_DATA;
    window.TRIBHAGI_PHALADESH_DATA = TRIBHAGI_PHALADESH_DATA;
    window.renderVimshottariPhaladeshSection = renderVimshottariPhaladeshSection;
    window.renderYoginiPhaladeshSection = renderYoginiPhaladeshSection;
    window.renderTribhagiPhaladeshSection = renderTribhagiPhaladeshSection;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        YOGINI_PHALADESH_DATA,
        TRIBHAGI_PHALADESH_DATA,
        renderVimshottariPhaladeshSection,
        renderYoginiPhaladeshSection,
        renderTribhagiPhaladeshSection
    };
}
