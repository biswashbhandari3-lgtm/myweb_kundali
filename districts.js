/**
 * districts.js - नेपालका ७७ जिल्लाहरू तथा विश्वका प्रमुख देश र शहरहरूको अक्षांश, देशान्तर र समय क्षेत्र (Timezone)
 * Kundali Darsan Web - वेदश्चक्षु १.०
 */

// नेपालका ७७ जिल्लाहरू (backward compatibility)
const NEPAL_DISTRICTS = [
    { nameNp: "काठमाडौँ", nameEn: "Kathmandu", lat: 27.7172, lon: 85.3240, tz: 5.75, latDeg: "27°43' N", lonDeg: "85°19' E" },
    { nameNp: "ललितपुर", nameEn: "Lalitpur", lat: 27.6667, lon: 85.3167, tz: 5.75, latDeg: "27°40' N", lonDeg: "85°19' E" },
    { nameNp: "भक्तपुर", nameEn: "Bhaktapur", lat: 27.6710, lon: 85.4298, tz: 5.75, latDeg: "27°40' N", lonDeg: "85°25' E" },
    { nameNp: "कास्की (पोखरा)", nameEn: "Pokhara (Kaski)", lat: 28.2096, lon: 83.9856, tz: 5.75, latDeg: "28°12' N", lonDeg: "83°59' E" },
    { nameNp: "मोरङ (विराटनगर)", nameEn: "Biratnagar (Morang)", lat: 26.4525, lon: 87.2718, tz: 5.75, latDeg: "26°27' N", lonDeg: "87°16' E" },
    { nameNp: "चितवन (भरतपुर)", nameEn: "Bharatpur (Chitwan)", lat: 27.6833, lon: 84.4333, tz: 5.75, latDeg: "27°41' N", lonDeg: "84°26' E" },
    { nameNp: "रूपन्देही (बुटवल)", nameEn: "Butwal (Rupandehi)", lat: 27.7000, lon: 83.4500, tz: 5.75, latDeg: "27°42' N", lonDeg: "83°27' E" },
    { nameNp: "पर्सा (वीरगञ्ज)", nameEn: "Birgunj (Parsa)", lat: 27.0133, lon: 84.8783, tz: 5.75, latDeg: "27°00' N", lonDeg: "84°52' E" },
    { nameNp: "सुनसरी (धरान)", nameEn: "Dharan (Sunsari)", lat: 26.8125, lon: 87.2833, tz: 5.75, latDeg: "26°48' N", lonDeg: "87°17' E" },
    { nameNp: "बाँके (नेपालगञ्ज)", nameEn: "Nepalgunj (Banke)", lat: 28.0500, lon: 81.6167, tz: 5.75, latDeg: "28°03' N", lonDeg: "81°37' E" },
    { nameNp: "धनुषा (जनकपुर)", nameEn: "Janakpur (Dhanusha)", lat: 26.7289, lon: 85.9244, tz: 5.75, latDeg: "26°43' N", lonDeg: "85°55' E" },
    { nameNp: "कैलाली (धनगढी)", nameEn: "Dhangadhi (Kailali)", lat: 28.6944, lon: 80.5900, tz: 5.75, latDeg: "28°41' N", lonDeg: "80°35' E" },
    { nameNp: "मकवानपुर (हेटौँडा)", nameEn: "Hetauda (Makwanpur)", lat: 27.4289, lon: 85.0322, tz: 5.75, latDeg: "27°25' N", lonDeg: "85°01' E" },
    { nameNp: "झापा (भद्रपुर/दमक)", nameEn: "Jhapa", lat: 26.5450, lon: 88.0847, tz: 5.75, latDeg: "26°32' N", lonDeg: "88°05' E" },
    { nameNp: "इलाम", nameEn: "Ilam", lat: 26.9089, lon: 87.9281, tz: 5.75, latDeg: "26°54' N", lonDeg: "87°55' E" },
    { nameNp: "पाँचथर", nameEn: "Panchthar", lat: 27.1667, lon: 87.7500, tz: 5.75, latDeg: "27°10' N", lonDeg: "87°45' E" },
    { nameNp: "ताप्लेजुङ", nameEn: "Taplejung", lat: 27.3500, lon: 87.6667, tz: 5.75, latDeg: "27°21' N", lonDeg: "87°40' E" },
    { nameNp: "तेह्रथुम", nameEn: "Tehrathum", lat: 27.1167, lon: 87.5167, tz: 5.75, latDeg: "27°07' N", lonDeg: "87°31' E" },
    { nameNp: "सङ्खुवासभा", nameEn: "Sankhuwasabha", lat: 27.3667, lon: 87.2167, tz: 5.75, latDeg: "27°22' N", lonDeg: "87°13' E" },
    { nameNp: "भोजपुर", nameEn: "Bhojpur", lat: 27.1700, lon: 87.0500, tz: 5.75, latDeg: "27°10' N", lonDeg: "87°03' E" },
    { nameNp: "धनकुटा", nameEn: "Dhankuta", lat: 26.9833, lon: 87.3333, tz: 5.75, latDeg: "26°59' N", lonDeg: "87°20' E" },
    { nameNp: "सप्तरी (राजविराज)", nameEn: "Saptari", lat: 26.5400, lon: 86.7500, tz: 5.75, latDeg: "26°32' N", lonDeg: "86°45' E" },
    { nameNp: "सिराहा", nameEn: "Siraha", lat: 26.6500, lon: 86.2000, tz: 5.75, latDeg: "26°39' N", lonDeg: "86°12' E" },
    { nameNp: "उदयपुर (गाईघाट)", nameEn: "Udayapur", lat: 26.9000, lon: 86.5200, tz: 5.75, latDeg: "26°54' N", lonDeg: "86°31' E" },
    { nameNp: "खोटाङ (दिक्तेल)", nameEn: "Khotang", lat: 27.2000, lon: 86.7833, tz: 5.75, latDeg: "27°12' N", lonDeg: "86°47' E" },
    { nameNp: "ओखलढुङ्गा", nameEn: "Okhaldhunga", lat: 27.3167, lon: 86.5000, tz: 5.75, latDeg: "27°19' N", lonDeg: "86°30' E" },
    { nameNp: "सोलुखुम्बु (सल्लेरी)", nameEn: "Solukhumbu", lat: 27.5000, lon: 86.5833, tz: 5.75, latDeg: "27°30' N", lonDeg: "86°35' E" },
    { nameNp: "महोत्तरी (जलेश्वर)", nameEn: "Mahottari", lat: 26.6500, lon: 85.8000, tz: 5.75, latDeg: "26°39' N", lonDeg: "85°48' E" },
    { nameNp: "सर्लाही (मलङ्गवा)", nameEn: "Sarlahi", lat: 26.8500, lon: 85.5500, tz: 5.75, latDeg: "26°51' N", lonDeg: "85°33' E" },
    { nameNp: "रौतहट (गौर)", nameEn: "Rautahat", lat: 26.7667, lon: 85.2833, tz: 5.75, latDeg: "26°46' N", lonDeg: "85°17' E" },
    { nameNp: "बारा (कलैया)", nameEn: "Bara", lat: 27.0333, lon: 85.0000, tz: 5.75, latDeg: "27°02' N", lonDeg: "85°00' E" },
    { nameNp: "सिन्धुली (माडी)", nameEn: "Sindhuli", lat: 27.2500, lon: 85.9667, tz: 5.75, latDeg: "27°15' N", lonDeg: "85°58' E" },
    { nameNp: "रामेछाप (मन्थली)", nameEn: "Ramechhap", lat: 27.3333, lon: 86.0833, tz: 5.75, latDeg: "27°20' N", lonDeg: "86°05' E" },
    { nameNp: "दोलखा (चरीकोट)", nameEn: "Dolakha", lat: 27.6667, lon: 86.0333, tz: 5.75, latDeg: "27°40' N", lonDeg: "86°02' E" },
    { nameNp: "सिन्धुपाल्चोक (चौतारा)", nameEn: "Sindhupalchok", lat: 27.7667, lon: 85.7000, tz: 5.75, latDeg: "27°46' N", lonDeg: "85°42' E" },
    { nameNp: "काभ्रेपलाञ्चोक (धुलिखेल)", nameEn: "Kavrepalanchok", lat: 27.6167, lon: 85.5500, tz: 5.75, latDeg: "27°37' N", lonDeg: "85°33' E" },
    { nameNp: "नुवाकोट (विदुर)", nameEn: "Nuwakot", lat: 27.9167, lon: 85.1667, tz: 5.75, latDeg: "27°55' N", lonDeg: "85°10' E" },
    { nameNp: "रसुवा (धुन्चे)", nameEn: "Rasuwa", lat: 28.1167, lon: 85.3000, tz: 5.75, latDeg: "28°07' N", lonDeg: "85°18' E" },
    { nameNp: "धादिङ", nameEn: "Dhading", lat: 27.8667, lon: 84.9000, tz: 5.75, latDeg: "27°52' N", lonDeg: "84°54' E" },
    { nameNp: "गोरखा", nameEn: "Gorkha", lat: 28.0000, lon: 84.6333, tz: 5.75, latDeg: "28°00' N", lonDeg: "84°38' E" },
    { nameNp: "लमजुङ (बेसीसहर)", nameEn: "Lamjung", lat: 28.2333, lon: 84.3833, tz: 5.75, latDeg: "28°14' N", lonDeg: "84°23' E" },
    { nameNp: "तनहुँ (दमौली)", nameEn: "Tanahun", lat: 27.9667, lon: 84.2500, tz: 5.75, latDeg: "27°58' N", lonDeg: "84°15' E" },
    { nameNp: "स्याङ्जा", nameEn: "Syangja", lat: 28.1000, lon: 83.8667, tz: 5.75, latDeg: "28°06' N", lonDeg: "83°52' E" },
    { nameNp: "गुल्मी (तमघास)", nameEn: "Gulmi", lat: 28.0667, lon: 83.2500, tz: 5.75, latDeg: "28°04' N", lonDeg: "83°15' E" },
    { nameNp: "पाल्पा (तानसेन)", nameEn: "Palpa", lat: 27.8667, lon: 83.5500, tz: 5.75, latDeg: "27°52' N", lonDeg: "83°33' E" },
    { nameNp: "अर्घाखाँची (सन्धिखर्क)", nameEn: "Arghakhanchi", lat: 27.9333, lon: 83.0833, tz: 5.75, latDeg: "27°56' N", lonDeg: "83°05' E" },
    { nameNp: "कपिलवस्तु (तौलिहवा)", nameEn: "Kapilvastu", lat: 27.5500, lon: 83.0500, tz: 5.75, latDeg: "27°33' N", lonDeg: "83°03' E" },
    { nameNp: "नवलपरासी (बर्दघाट सुस्ता पूर्व)", nameEn: "Nawalpur", lat: 27.6500, lon: 84.1500, tz: 5.75, latDeg: "27°39' N", lonDeg: "84°09' E" },
    { nameNp: "नवलपरासी (बर्दघाट सुस्ता पश्चिम)", nameEn: "Parasi", lat: 27.5333, lon: 83.6667, tz: 5.75, latDeg: "27°32' N", lonDeg: "83°40' E" },
    { nameNp: "पर्वत (कुश्मा)", nameEn: "Parbat", lat: 28.2167, lon: 83.6833, tz: 5.75, latDeg: "28°13' N", lonDeg: "83°41' E" },
    { nameNp: "बागलुङ", nameEn: "Baglung", lat: 28.2667, lon: 83.6000, tz: 5.75, latDeg: "28°16' N", lonDeg: "83°36' E" },
    { nameNp: "म्याग्दी (बेनी)", nameEn: "Myagdi", lat: 28.3500, lon: 83.5667, tz: 5.75, latDeg: "28°21' N", lonDeg: "83°34' E" },
    { nameNp: "मुस्ताङ (जोमसोम)", nameEn: "Mustang", lat: 28.7833, lon: 83.7333, tz: 5.75, latDeg: "28°47' N", lonDeg: "83°44' E" },
    { nameNp: "मनाङ (चामे)", nameEn: "Manang", lat: 28.5500, lon: 84.2333, tz: 5.75, latDeg: "28°33' N", lonDeg: "84°14' E" },
    { nameNp: "दाङ (घोराही/तुलसीपुर)", nameEn: "Dang", lat: 28.0500, lon: 82.5000, tz: 5.75, latDeg: "28°03' N", lonDeg: "82°30' E" },
    { nameNp: "प्युठान", nameEn: "Pyuthan", lat: 28.1000, lon: 82.8833, tz: 5.75, latDeg: "28°06' N", lonDeg: "82°53' E" },
    { nameNp: "रोल्पा (लिवाङ)", nameEn: "Rolpa", lat: 28.3000, lon: 82.6333, tz: 5.75, latDeg: "28°18' N", lonDeg: "82°38' E" },
    { nameNp: "रुकुम पूर्व", nameEn: "Rukum East", lat: 28.6000, lon: 82.7500, tz: 5.75, latDeg: "28°36' N", lonDeg: "82°45' E" },
    { nameNp: "रुकुम पश्चिम (मुसिकोट)", nameEn: "Rukum West", lat: 28.6333, lon: 82.4833, tz: 5.75, latDeg: "28°38' N", lonDeg: "82°29' E" },
    { nameNp: "सल्यान", nameEn: "Salyan", lat: 28.3667, lon: 82.1667, tz: 5.75, latDeg: "28°22' N", lonDeg: "82°10' E" },
    { nameNp: "सुर्खेत (वीरेन्द्रनगर)", nameEn: "Surkhet", lat: 28.6000, lon: 81.6333, tz: 5.75, latDeg: "28°36' N", lonDeg: "81°38' E" },
    { nameNp: "दैलेख", nameEn: "Dailekh", lat: 28.8333, lon: 81.7167, tz: 5.75, latDeg: "28°50' N", lonDeg: "81°43' E" },
    { nameNp: "जाजरकोट", nameEn: "Jajarkot", lat: 28.7000, lon: 82.2000, tz: 5.75, latDeg: "28°42' N", lonDeg: "82°12' E" },
    { nameNp: "डोल्पा (दुनै)", nameEn: "Dolpa", lat: 28.9500, lon: 82.9000, tz: 5.75, latDeg: "28°57' N", lonDeg: "82°54' E" },
    { nameNp: "जुम्ला (खलङ्गा)", nameEn: "Jumla", lat: 29.2833, lon: 82.1833, tz: 5.75, latDeg: "29°17' N", lonDeg: "82°11' E" },
    { nameNp: "कालिकोट (मान्म)", nameEn: "Kalikot", lat: 29.2333, lon: 81.6000, tz: 5.75, latDeg: "29°14' N", lonDeg: "81°36' E" },
    { nameNp: "मुगु (गमगढी)", nameEn: "Mugu", lat: 29.5833, lon: 82.1667, tz: 5.75, latDeg: "29°35' N", lonDeg: "82°10' E" },
    { nameNp: "हुम्ला (सिमिकोट)", nameEn: "Humla", lat: 29.9667, lon: 81.8333, tz: 5.75, latDeg: "29°58' N", lonDeg: "81°50' E" },
    { nameNp: "बर्दिया (गुलरिया)", nameEn: "Bardiya", lat: 28.2333, lon: 81.3333, tz: 5.75, latDeg: "28°14' N", lonDeg: "81°20' E" },
    { nameNp: "कञ्चनपुर (महेन्द्रनगर)", nameEn: "Kanchanpur", lat: 28.9667, lon: 80.1833, tz: 5.75, latDeg: "28°58' N", lonDeg: "80°11' E" },
    { nameNp: "डडेलधुरा", nameEn: "Dadeldhura", lat: 29.3000, lon: 80.5833, tz: 5.75, latDeg: "29°18' N", lonDeg: "80°35' E" },
    { nameNp: "डोटी (सिलगढी)", nameEn: "Doti", lat: 29.2667, lon: 80.9833, tz: 5.75, latDeg: "29°16' N", lonDeg: "80°59' E" },
    { nameNp: "अछाम (मङ्गलसेन)", nameEn: "Achham", lat: 29.1167, lon: 81.3000, tz: 5.75, latDeg: "29°07' N", lonDeg: "81°18' E" },
    { nameNp: "बाजुरा (मार्तडी)", nameEn: "Bajura", lat: 29.5000, lon: 81.4833, tz: 5.75, latDeg: "29°30' N", lonDeg: "81°29' E" },
    { nameNp: "बझाङ (चैनपुर)", nameEn: "Bajhang", lat: 29.5667, lon: 81.2000, tz: 5.75, latDeg: "29°34' N", lonDeg: "81°12' E" },
    { nameNp: "बैतडी (दशरथचन्द)", nameEn: "Baitadi", lat: 29.5333, lon: 80.4167, tz: 5.75, latDeg: "29°32' N", lonDeg: "80°25' E" },
    { nameNp: "दार्चुला (खलङ्गा)", nameEn: "Darchula", lat: 29.8500, lon: 80.5333, tz: 5.75, latDeg: "29°51' N", lonDeg: "80°32' E" }
];

// विश्वका प्रमुख देश तथा सहरहरूको विस्तृत विवरण (Latitude, Longitude & Timezone)
const WORLD_COUNTRIES = [
    {
        code: "NP",
        nameNp: "नेपाल (Nepal)",
        nameEn: "Nepal",
        defaultTz: 5.75,
        cities: [
            ...NEPAL_DISTRICTS,
            { nameNp: "अन्य / म्यानुअल (Custom Coordinate)", nameEn: "Custom / Manual", lat: 27.7172, lon: 85.3240, tz: 5.75, latDeg: "27°43' N", lonDeg: "85°19' E", isCustom: true }
        ]
    },
    {
        code: "IN",
        nameNp: "भारत (India)",
        nameEn: "India",
        defaultTz: 5.5,
        cities: [
            { nameNp: "नयाँ दिल्ली (New Delhi)", nameEn: "New Delhi", lat: 28.6139, lon: 77.2090, tz: 5.5, latDeg: "28°36' N", lonDeg: "77°12' E" },
            { nameNp: "मुम्बई (Mumbai)", nameEn: "Mumbai", lat: 19.0760, lon: 72.8777, tz: 5.5, latDeg: "19°04' N", lonDeg: "72°52' E" },
            { nameNp: "कोलकाता (Kolkata)", nameEn: "Kolkata", lat: 22.5726, lon: 88.3639, tz: 5.5, latDeg: "22°34' N", lonDeg: "88°21' E" },
            { nameNp: "चेन्नाई (Chennai)", nameEn: "Chennai", lat: 13.0827, lon: 80.2707, tz: 5.5, latDeg: "13°04' N", lonDeg: "80°16' E" },
            { nameNp: "बेङ्गलुरु (Bengaluru)", nameEn: "Bengaluru", lat: 12.9716, lon: 77.5946, tz: 5.5, latDeg: "12°58' N", lonDeg: "77°35' E" },
            { nameNp: "हैदराबाद (Hyderabad)", nameEn: "Hyderabad", lat: 17.3850, lon: 78.4867, tz: 5.5, latDeg: "17°23' N", lonDeg: "78°29' E" },
            { nameNp: "वाराणसी (काशी/बनारस)", nameEn: "Varanasi", lat: 25.3176, lon: 82.9739, tz: 5.5, latDeg: "25°19' N", lonDeg: "82°58' E" },
            { nameNp: "अयोध्या (Ayodhya)", nameEn: "Ayodhya", lat: 26.7922, lon: 82.1998, tz: 5.5, latDeg: "26°47' N", lonDeg: "82°11' E" },
            { nameNp: "हरिद्वार (Haridwar)", nameEn: "Haridwar", lat: 29.9457, lon: 78.1642, tz: 5.5, latDeg: "29°56' N", lonDeg: "78°09' E" },
            { nameNp: "प्रयागराज (इलाहाबाद)", nameEn: "Prayagraj", lat: 25.4358, lon: 81.8463, tz: 5.5, latDeg: "25°26' N", lonDeg: "81°50' E" },
            { nameNp: "ऋषिकेश (Rishikesh)", nameEn: "Rishikesh", lat: 30.0869, lon: 78.2676, tz: 5.5, latDeg: "30°05' N", lonDeg: "78°16' E" },
            { nameNp: "गोरखपुर (Gorakhpur)", nameEn: "Gorakhpur", lat: 26.7606, lon: 83.3732, tz: 5.5, latDeg: "26°45' N", lonDeg: "83°22' E" },
            { nameNp: "पटना (Patna)", nameEn: "Patna", lat: 25.5941, lon: 85.1376, tz: 5.5, latDeg: "25°35' N", lonDeg: "85°08' E" },
            { nameNp: "लखनउ (Lucknow)", nameEn: "Lucknow", lat: 26.8467, lon: 80.9462, tz: 5.5, latDeg: "26°50' N", lonDeg: "80°56' E" },
            { nameNp: "जयपुर (Jaipur)", nameEn: "Jaipur", lat: 26.9124, lon: 75.7873, tz: 5.5, latDeg: "26°54' N", lonDeg: "75°47' E" },
            { nameNp: "अहमदाबाद (Ahmedabad)", nameEn: "Ahmedabad", lat: 23.0225, lon: 72.5714, tz: 5.5, latDeg: "23°01' N", lonDeg: "72°34' E" },
            { nameNp: "पुणे (Pune)", nameEn: "Pune", lat: 18.5204, lon: 73.8567, tz: 5.5, latDeg: "18°31' N", lonDeg: "73°51' E" },
            { nameNp: "दार्जिलिङ (Darjeeling)", nameEn: "Darjeeling", lat: 27.0410, lon: 88.2663, tz: 5.5, latDeg: "27°02' N", lonDeg: "88°15' E" },
            { nameNp: "सिलिगुडी (Siliguri)", nameEn: "Siliguri", lat: 26.7271, lon: 88.3953, tz: 5.5, latDeg: "26°43' N", lonDeg: "88°23' E" },
            { nameNp: "देहरादून (Dehradun)", nameEn: "Dehradun", lat: 30.3165, lon: 78.0322, tz: 5.5, latDeg: "30°18' N", lonDeg: "78°01' E" },
            { nameNp: "उज्जैन (Ujjain)", nameEn: "Ujjain", lat: 23.1765, lon: 75.7885, tz: 5.5, latDeg: "23°10' N", lonDeg: "75°47' E" },
            { nameNp: "मथुरा (Mathura)", nameEn: "Mathura", lat: 27.4924, lon: 77.6737, tz: 5.5, latDeg: "27°29' N", lonDeg: "77°40' E" },
            { nameNp: "अमृतसर (Amritsar)", nameEn: "Amritsar", lat: 31.6340, lon: 74.8723, tz: 5.5, latDeg: "31°38' N", lonDeg: "74°52' E" },
            { nameNp: "गुवाहाटी (Guwahati)", nameEn: "Guwahati", lat: 26.1445, lon: 91.7362, tz: 5.5, latDeg: "26°08' N", lonDeg: "91°44' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 28.6139, lon: 77.2090, tz: 5.5, latDeg: "28°36' N", lonDeg: "77°12' E", isCustom: true }
        ]
    },
    {
        code: "US",
        nameNp: "संयुक्त राज्य अमेरिका (USA)",
        nameEn: "United States",
        defaultTz: -5.0,
        cities: [
            { nameNp: "न्युयोर्क (New York)", nameEn: "New York, NY", lat: 40.7128, lon: -74.0060, tz: -5.0, latDeg: "40°42' N", lonDeg: "74°00' W" },
            { nameNp: "वासिङ्टन डि.सी. (Washington D.C.)", nameEn: "Washington, DC", lat: 38.9072, lon: -77.0369, tz: -5.0, latDeg: "38°54' N", lonDeg: "77°02' W" },
            { nameNp: "बोस्टन (Boston)", nameEn: "Boston, MA", lat: 42.3601, lon: -71.0589, tz: -5.0, latDeg: "42°21' N", lonDeg: "71°03' W" },
            { nameNp: "मियामी (Miami)", nameEn: "Miami, FL", lat: 25.7617, lon: -80.1918, tz: -5.0, latDeg: "25°45' N", lonDeg: "80°11' W" },
            { nameNp: "एटलान्टा (Atlanta)", nameEn: "Atlanta, GA", lat: 33.7490, lon: -84.3880, tz: -5.0, latDeg: "33°44' N", lonDeg: "84°23' W" },
            { nameNp: "शिकागो (Chicago)", nameEn: "Chicago, IL", lat: 41.8781, lon: -87.6298, tz: -6.0, latDeg: "41°52' N", lonDeg: "87°37' W" },
            { nameNp: "ह्युस्टन (Houston)", nameEn: "Houston, TX", lat: 29.7604, lon: -95.3698, tz: -6.0, latDeg: "29°45' N", lonDeg: "95°22' W" },
            { nameNp: "डालस (Dallas)", nameEn: "Dallas, TX", lat: 32.7767, lon: -96.7970, tz: -6.0, latDeg: "32°46' N", lonDeg: "96°47' W" },
            { nameNp: "अस्टिन (Austin)", nameEn: "Austin, TX", lat: 30.2672, lon: -97.7431, tz: -6.0, latDeg: "30°16' N", lonDeg: "97°44' W" },
            { nameNp: "डेन्भर (Denver)", nameEn: "Denver, CO", lat: 39.7392, lon: -104.9903, tz: -7.0, latDeg: "39°44' N", lonDeg: "104°59' W" },
            { nameNp: "फिनिक्स (Phoenix)", nameEn: "Phoenix, AZ", lat: 33.4484, lon: -112.0740, tz: -7.0, latDeg: "33°26' N", lonDeg: "112°04' W" },
            { nameNp: "लस एन्जलस (Los Angeles)", nameEn: "Los Angeles, CA", lat: 34.0522, lon: -118.2437, tz: -8.0, latDeg: "34°03' N", lonDeg: "118°14' W" },
            { nameNp: "सान फ्रान्सिस्को (San Francisco)", nameEn: "San Francisco, CA", lat: 37.7749, lon: -122.4194, tz: -8.0, latDeg: "37°46' N", lonDeg: "122°25' W" },
            { nameNp: "सियाटल (Seattle)", nameEn: "Seattle, WA", lat: 47.6062, lon: -122.3321, tz: -8.0, latDeg: "47°36' N", lonDeg: "122°19' W" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 40.7128, lon: -74.0060, tz: -5.0, latDeg: "40°42' N", lonDeg: "74°00' W", isCustom: true }
        ]
    },
    {
        code: "GB",
        nameNp: "संयुक्त अधिराज्य (UK / Britain)",
        nameEn: "United Kingdom",
        defaultTz: 0.0,
        cities: [
            { nameNp: "लन्डन (London)", nameEn: "London", lat: 51.5074, lon: -0.1278, tz: 0.0, latDeg: "51°30' N", lonDeg: "0°07' W" },
            { nameNp: "बर्मिङ्घम (Birmingham)", nameEn: "Birmingham", lat: 52.4862, lon: -1.8904, tz: 0.0, latDeg: "52°29' N", lonDeg: "1°53' W" },
            { nameNp: "म्यानचेस्टर (Manchester)", nameEn: "Manchester", lat: 53.4808, lon: -2.2426, tz: 0.0, latDeg: "53°28' N", lonDeg: "2°14' W" },
            { nameNp: "एडिनबर्ग (Edinburgh)", nameEn: "Edinburgh", lat: 55.9533, lon: -3.1883, tz: 0.0, latDeg: "55°57' N", lonDeg: "3°11' W" },
            { nameNp: "ग्लासगो (Glasgow)", nameEn: "Glasgow", lat: 55.8642, lon: -4.2518, tz: 0.0, latDeg: "55°51' N", lonDeg: "4°15' W" },
            { nameNp: "लिड्स (Leeds)", nameEn: "Leeds", lat: 53.8008, lon: -1.5491, tz: 0.0, latDeg: "53°48' N", lonDeg: "1°32' W" },
            { nameNp: "लिभरपुल (Liverpool)", nameEn: "Liverpool", lat: 53.4084, lon: -2.9916, tz: 0.0, latDeg: "53°24' N", lonDeg: "2°59' W" },
            { nameNp: "अल्डरशट (Aldershot)", nameEn: "Aldershot", lat: 51.2484, lon: -0.7587, tz: 0.0, latDeg: "51°14' N", lonDeg: "0°45' W" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 51.5074, lon: -0.1278, tz: 0.0, latDeg: "51°30' N", lonDeg: "0°07' W", isCustom: true }
        ]
    },
    {
        code: "AU",
        nameNp: "अष्ट्रेलिया (Australia)",
        nameEn: "Australia",
        defaultTz: 10.0,
        cities: [
            { nameNp: "सिड्नी (Sydney)", nameEn: "Sydney, NSW", lat: -33.8688, lon: 151.2093, tz: 10.0, latDeg: "33°52' S", lonDeg: "151°12' E" },
            { nameNp: "मेलबर्न (Melbourne)", nameEn: "Melbourne, VIC", lat: -37.8136, lon: 144.9631, tz: 10.0, latDeg: "37°48' S", lonDeg: "144°57' E" },
            { nameNp: "ब्रिसबेन (Brisbane)", nameEn: "Brisbane, QLD", lat: -27.4698, lon: 153.0251, tz: 10.0, latDeg: "27°28' S", lonDeg: "153°01' E" },
            { nameNp: "पर्थ (Perth)", nameEn: "Perth, WA", lat: -31.9505, lon: 115.8605, tz: 8.0, latDeg: "31°57' S", lonDeg: "115°51' E" },
            { nameNp: "एडेलेड (Adelaide)", nameEn: "Adelaide, SA", lat: -34.9285, lon: 138.6007, tz: 9.5, latDeg: "34°55' S", lonDeg: "138°36' E" },
            { nameNp: "क्यानबेरा (Canberra)", nameEn: "Canberra, ACT", lat: -35.2809, lon: 149.1300, tz: 10.0, latDeg: "35°16' S", lonDeg: "149°07' E" },
            { nameNp: "डार्विन (Darwin)", nameEn: "Darwin, NT", lat: -12.4634, lon: 130.8456, tz: 9.5, latDeg: "12°27' S", lonDeg: "130°50' E" },
            { nameNp: "होबर्ट (Hobart)", nameEn: "Hobart, TAS", lat: -42.8821, lon: 147.3272, tz: 10.0, latDeg: "42°52' S", lonDeg: "147°19' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: -33.8688, lon: 151.2093, tz: 10.0, latDeg: "33°52' S", lonDeg: "151°12' E", isCustom: true }
        ]
    },
    {
        code: "CA",
        nameNp: "क्यानडा (Canada)",
        nameEn: "Canada",
        defaultTz: -5.0,
        cities: [
            { nameNp: "टोरन्टो (Toronto)", nameEn: "Toronto, ON", lat: 43.6532, lon: -79.3832, tz: -5.0, latDeg: "43°39' N", lonDeg: "79°22' W" },
            { nameNp: "भ्यानकुभर (Vancouver)", nameEn: "Vancouver, BC", lat: 49.2827, lon: -123.1207, tz: -8.0, latDeg: "49°16' N", lonDeg: "123°07' W" },
            { nameNp: "अटोवा (Ottawa)", nameEn: "Ottawa, ON", lat: 45.4215, lon: -75.6972, tz: -5.0, latDeg: "45°25' N", lonDeg: "75°41' W" },
            { nameNp: "मोन्ट्रियल (Montreal)", nameEn: "Montreal, QC", lat: 45.5017, lon: -73.5673, tz: -5.0, latDeg: "45°30' N", lonDeg: "73°34' W" },
            { nameNp: "क्याल्गरी (Calgary)", nameEn: "Calgary, AB", lat: 51.0447, lon: -114.0719, tz: -7.0, latDeg: "51°02' N", lonDeg: "114°04' W" },
            { nameNp: "एडमोन्टन (Edmonton)", nameEn: "Edmonton, AB", lat: 53.5461, lon: -113.4938, tz: -7.0, latDeg: "53°32' N", lonDeg: "113°29' W" },
            { nameNp: "विन्निपेग (Winnipeg)", nameEn: "Winnipeg, MB", lat: 49.8951, lon: -97.1384, tz: -6.0, latDeg: "49°53' N", lonDeg: "97°08' W" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 43.6532, lon: -79.3832, tz: -5.0, latDeg: "43°39' N", lonDeg: "79°22' W", isCustom: true }
        ]
    },
    {
        code: "AE",
        nameNp: "संयुक्त अरब इमिरेट्स (UAE)",
        nameEn: "United Arab Emirates",
        defaultTz: 4.0,
        cities: [
            { nameNp: "दुबई (Dubai)", nameEn: "Dubai", lat: 25.2048, lon: 55.2708, tz: 4.0, latDeg: "25°12' N", lonDeg: "55°16' E" },
            { nameNp: "अबु धाबी (Abu Dhabi)", nameEn: "Abu Dhabi", lat: 24.4539, lon: 54.3773, tz: 4.0, latDeg: "24°27' N", lonDeg: "54°22' E" },
            { nameNp: "शारजाह (Sharjah)", nameEn: "Sharjah", lat: 25.3463, lon: 55.4209, tz: 4.0, latDeg: "25°20' N", lonDeg: "55°25' E" },
            { nameNp: "अजमान (Ajman)", nameEn: "Ajman", lat: 25.4052, lon: 55.5136, tz: 4.0, latDeg: "25°24' N", lonDeg: "55°30' E" },
            { nameNp: "रास अल खैमाह (Ras Al Khaimah)", nameEn: "Ras Al Khaimah", lat: 25.7895, lon: 55.9432, tz: 4.0, latDeg: "25°47' N", lonDeg: "55°56' E" },
            { nameNp: "अल ऐन (Al Ain)", nameEn: "Al Ain", lat: 24.2075, lon: 55.7447, tz: 4.0, latDeg: "24°12' N", lonDeg: "55°44' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 25.2048, lon: 55.2708, tz: 4.0, latDeg: "25°12' N", lonDeg: "55°16' E", isCustom: true }
        ]
    },
    {
        code: "QA",
        nameNp: "कतार (Qatar)",
        nameEn: "Qatar",
        defaultTz: 3.0,
        cities: [
            { nameNp: "दोहा (Doha)", nameEn: "Doha", lat: 25.2854, lon: 51.5310, tz: 3.0, latDeg: "25°17' N", lonDeg: "51°31' E" },
            { nameNp: "अल रयान (Al Rayyan)", nameEn: "Al Rayyan", lat: 25.2919, lon: 51.4244, tz: 3.0, latDeg: "25°17' N", lonDeg: "51°25' E" },
            { nameNp: "अल वक्राह (Al Wakrah)", nameEn: "Al Wakrah", lat: 25.1768, lon: 51.6048, tz: 3.0, latDeg: "25°10' N", lonDeg: "51°36' E" },
            { nameNp: "अल खोर (Al Khor)", nameEn: "Al Khor", lat: 25.6839, lon: 51.4969, tz: 3.0, latDeg: "25°41' N", lonDeg: "51°29' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 25.2854, lon: 51.5310, tz: 3.0, latDeg: "25°17' N", lonDeg: "51°31' E", isCustom: true }
        ]
    },
    {
        code: "SA",
        nameNp: "साउदी अरब (Saudi Arabia)",
        nameEn: "Saudi Arabia",
        defaultTz: 3.0,
        cities: [
            { nameNp: "रियाद (Riyadh)", nameEn: "Riyadh", lat: 24.7136, lon: 46.6753, tz: 3.0, latDeg: "24°42' N", lonDeg: "46°40' E" },
            { nameNp: "जेद्दाह (Jeddah)", nameEn: "Jeddah", lat: 21.4858, lon: 39.1925, tz: 3.0, latDeg: "21°29' N", lonDeg: "39°11' E" },
            { nameNp: "मक्का (Mecca)", nameEn: "Mecca", lat: 21.3891, lon: 39.8579, tz: 3.0, latDeg: "21°23' N", lonDeg: "39°51' E" },
            { nameNp: "मदिना (Medina)", nameEn: "Medina", lat: 24.5247, lon: 39.5692, tz: 3.0, latDeg: "24°31' N", lonDeg: "39°34' E" },
            { nameNp: "दम्माम (Dammam)", nameEn: "Dammam", lat: 26.4207, lon: 50.0888, tz: 3.0, latDeg: "26°25' N", lonDeg: "50°05' E" },
            { nameNp: "अल खोबर (Khobar)", nameEn: "Khobar", lat: 26.2818, lon: 50.2084, tz: 3.0, latDeg: "26°16' N", lonDeg: "50°12' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 24.7136, lon: 46.6753, tz: 3.0, latDeg: "24°42' N", lonDeg: "46°40' E", isCustom: true }
        ]
    },
    {
        code: "KW",
        nameNp: "कुवेत (Kuwait)",
        nameEn: "Kuwait",
        defaultTz: 3.0,
        cities: [
            { nameNp: "कुवेत सिटी (Kuwait City)", nameEn: "Kuwait City", lat: 29.3759, lon: 47.9774, tz: 3.0, latDeg: "29°22' N", lonDeg: "47°58' E" },
            { nameNp: "हवाल्ली (Hawalli)", nameEn: "Hawalli", lat: 29.3328, lon: 48.0289, tz: 3.0, latDeg: "29°19' N", lonDeg: "48°01' E" },
            { nameNp: "सल्मिया (Salmiya)", nameEn: "Salmiya", lat: 29.3344, lon: 48.0772, tz: 3.0, latDeg: "29°20' N", lonDeg: "48°04' E" },
            { nameNp: "अल अहमदी (Al Ahmadi)", nameEn: "Al Ahmadi", lat: 29.0770, lon: 48.0839, tz: 3.0, latDeg: "29°04' N", lonDeg: "48°05' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 29.3759, lon: 47.9774, tz: 3.0, latDeg: "29°22' N", lonDeg: "47°58' E", isCustom: true }
        ]
    },
    {
        code: "BH",
        nameNp: "बहराइन (Bahrain)",
        nameEn: "Bahrain",
        defaultTz: 3.0,
        cities: [
            { nameNp: "मनामा (Manama)", nameEn: "Manama", lat: 26.2285, lon: 50.5860, tz: 3.0, latDeg: "26°13' N", lonDeg: "50°35' E" },
            { nameNp: "रिफा (Riffa)", nameEn: "Riffa", lat: 26.1300, lon: 50.5550, tz: 3.0, latDeg: "26°07' N", lonDeg: "50°33' E" },
            { nameNp: "मुहर्रक (Muharraq)", nameEn: "Muharraq", lat: 26.2572, lon: 50.6119, tz: 3.0, latDeg: "26°15' N", lonDeg: "50°36' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 26.2285, lon: 50.5860, tz: 3.0, latDeg: "26°13' N", lonDeg: "50°35' E", isCustom: true }
        ]
    },
    {
        code: "OM",
        nameNp: "ओमान (Oman)",
        nameEn: "Oman",
        defaultTz: 4.0,
        cities: [
            { nameNp: "मस्कट (Muscat)", nameEn: "Muscat", lat: 23.5880, lon: 58.3829, tz: 4.0, latDeg: "23°35' N", lonDeg: "58°22' E" },
            { nameNp: "सलालाह (Salalah)", nameEn: "Salalah", lat: 17.0151, lon: 54.0924, tz: 4.0, latDeg: "17°00' N", lonDeg: "54°05' E" },
            { nameNp: "सोहार (Sohar)", nameEn: "Sohar", lat: 24.3644, lon: 56.7468, tz: 4.0, latDeg: "24°21' N", lonDeg: "56°44' E" },
            { nameNp: "निजवा (Nizwa)", nameEn: "Nizwa", lat: 22.9333, lon: 57.5333, tz: 4.0, latDeg: "22°55' N", lonDeg: "57°32' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 23.5880, lon: 58.3829, tz: 4.0, latDeg: "23°35' N", lonDeg: "58°22' E", isCustom: true }
        ]
    },
    {
        code: "MY",
        nameNp: "मलेसिया (Malaysia)",
        nameEn: "Malaysia",
        defaultTz: 8.0,
        cities: [
            { nameNp: "क्वालालम्पुर (Kuala Lumpur)", nameEn: "Kuala Lumpur", lat: 3.1390, lon: 101.6869, tz: 8.0, latDeg: "3°08' N", lonDeg: "101°41' E" },
            { nameNp: "पेनाङ / जर्ज टाउन (Penang)", nameEn: "George Town", lat: 5.4141, lon: 100.3288, tz: 8.0, latDeg: "5°24' N", lonDeg: "100°19' E" },
            { nameNp: "जोहोर बाहरु (Johor Bahru)", nameEn: "Johor Bahru", lat: 1.4927, lon: 103.7414, tz: 8.0, latDeg: "1°29' N", lonDeg: "103°44' E" },
            { nameNp: "इपोह (Ipoh)", nameEn: "Ipoh", lat: 4.5975, lon: 101.0901, tz: 8.0, latDeg: "4°35' N", lonDeg: "101°05' E" },
            { nameNp: "मेलाका (Melaka)", nameEn: "Melaka", lat: 2.1896, lon: 102.2501, tz: 8.0, latDeg: "2°11' N", lonDeg: "102°15' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 3.1390, lon: 101.6869, tz: 8.0, latDeg: "3°08' N", lonDeg: "101°41' E", isCustom: true }
        ]
    },
    {
        code: "SG",
        nameNp: "सिङ्गापुर (Singapore)",
        nameEn: "Singapore",
        defaultTz: 8.0,
        cities: [
            { nameNp: "सिङ्गापुर (Singapore City)", nameEn: "Singapore", lat: 1.3521, lon: 103.8198, tz: 8.0, latDeg: "1°21' N", lonDeg: "103°49' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 1.3521, lon: 103.8198, tz: 8.0, latDeg: "1°21' N", lonDeg: "103°49' E", isCustom: true }
        ]
    },
    {
        code: "JP",
        nameNp: "जापान (Japan)",
        nameEn: "Japan",
        defaultTz: 9.0,
        cities: [
            { nameNp: "टोकियो (Tokyo)", nameEn: "Tokyo", lat: 35.6762, lon: 139.6503, tz: 9.0, latDeg: "35°40' N", lonDeg: "139°39' E" },
            { nameNp: "ओसाका (Osaka)", nameEn: "Osaka", lat: 34.6937, lon: 135.5023, tz: 9.0, latDeg: "34°41' N", lonDeg: "135°30' E" },
            { nameNp: "क्योटो (Kyoto)", nameEn: "Kyoto", lat: 35.0116, lon: 135.7681, tz: 9.0, latDeg: "35°00' N", lonDeg: "135°46' E" },
            { nameNp: "नागोया (Nagoya)", nameEn: "Nagoya", lat: 35.1815, lon: 136.9066, tz: 9.0, latDeg: "35°10' N", lonDeg: "136°54' E" },
            { nameNp: "योकोहामा (Yokohama)", nameEn: "Yokohama", lat: 35.4437, lon: 139.6380, tz: 9.0, latDeg: "35°26' N", lonDeg: "139°38' E" },
            { nameNp: "फुकुओका (Fukuoka)", nameEn: "Fukuoka", lat: 33.5902, lon: 130.4017, tz: 9.0, latDeg: "33°35' N", lonDeg: "130°24' E" },
            { nameNp: "साप्पोरो (Sapporo)", nameEn: "Sapporo", lat: 43.0618, lon: 141.3545, tz: 9.0, latDeg: "43°03' N", lonDeg: "141°21' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 35.6762, lon: 139.6503, tz: 9.0, latDeg: "35°40' N", lonDeg: "139°39' E", isCustom: true }
        ]
    },
    {
        code: "KR",
        nameNp: "दक्षिण कोरिया (South Korea)",
        nameEn: "South Korea",
        defaultTz: 9.0,
        cities: [
            { nameNp: "सियोल (Seoul)", nameEn: "Seoul", lat: 37.5665, lon: 126.9780, tz: 9.0, latDeg: "37°33' N", lonDeg: "126°58' E" },
            { nameNp: "बुसान (Busan)", nameEn: "Busan", lat: 35.1796, lon: 129.0756, tz: 9.0, latDeg: "35°10' N", lonDeg: "129°04' E" },
            { nameNp: "इन्चोन (Incheon)", nameEn: "Incheon", lat: 37.4563, lon: 126.7052, tz: 9.0, latDeg: "37°27' N", lonDeg: "126°42' E" },
            { nameNp: "देगु (Daegu)", nameEn: "Daegu", lat: 35.8714, lon: 128.6014, tz: 9.0, latDeg: "35°52' N", lonDeg: "128°36' E" },
            { nameNp: "सुवोन (Suwon)", nameEn: "Suwon", lat: 37.2636, lon: 127.0286, tz: 9.0, latDeg: "37°15' N", lonDeg: "127°01' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 37.5665, lon: 126.9780, tz: 9.0, latDeg: "37°33' N", lonDeg: "126°58' E", isCustom: true }
        ]
    },
    {
        code: "CN",
        nameNp: "चीन (China / Tibet / HK)",
        nameEn: "China",
        defaultTz: 8.0,
        cities: [
            { nameNp: "बेइजिङ (Beijing)", nameEn: "Beijing", lat: 39.9042, lon: 116.4074, tz: 8.0, latDeg: "39°54' N", lonDeg: "116°24' E" },
            { nameNp: "ल्हासा / तिब्बत (Lhasa, Tibet)", nameEn: "Lhasa", lat: 29.6525, lon: 91.1721, tz: 8.0, latDeg: "29°39' N", lonDeg: "91°10' E" },
            { nameNp: "सिगात्से (Shigatse, Tibet)", nameEn: "Shigatse", lat: 29.2674, lon: 88.8814, tz: 8.0, latDeg: "29°16' N", lonDeg: "88°52' E" },
            { nameNp: "साङ्घाई (Shanghai)", nameEn: "Shanghai", lat: 31.2304, lon: 121.4737, tz: 8.0, latDeg: "31°13' N", lonDeg: "121°28' E" },
            { nameNp: "ग्वाङझाउ (Guangzhou)", nameEn: "Guangzhou", lat: 23.1291, lon: 113.2644, tz: 8.0, latDeg: "23°07' N", lonDeg: "113°15' E" },
            { nameNp: "चेङ्दु (Chengdu)", nameEn: "Chengdu", lat: 30.5728, lon: 104.0668, tz: 8.0, latDeg: "30°34' N", lonDeg: "104°04' E" },
            { nameNp: "हङकङ (Hong Kong)", nameEn: "Hong Kong", lat: 22.3193, lon: 114.1694, tz: 8.0, latDeg: "22°19' N", lonDeg: "114°10' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 39.9042, lon: 116.4074, tz: 8.0, latDeg: "39°54' N", lonDeg: "116°24' E", isCustom: true }
        ]
    },
    {
        code: "DE",
        nameNp: "जर्मनी (Germany)",
        nameEn: "Germany",
        defaultTz: 1.0,
        cities: [
            { nameNp: "बर्लिन (Berlin)", nameEn: "Berlin", lat: 52.5200, lon: 13.4050, tz: 1.0, latDeg: "52°31' N", lonDeg: "13°24' E" },
            { nameNp: "म्युनिख (Munich)", nameEn: "Munich", lat: 48.1351, lon: 11.5820, tz: 1.0, latDeg: "48°08' N", lonDeg: "11°34' E" },
            { nameNp: "फ्रान्कफर्ट (Frankfurt)", nameEn: "Frankfurt", lat: 50.1109, lon: 8.6821, tz: 1.0, latDeg: "50°06' N", lonDeg: "8°40' E" },
            { nameNp: "ह्याम्बर्ग (Hamburg)", nameEn: "Hamburg", lat: 53.5511, lon: 9.9937, tz: 1.0, latDeg: "53°33' N", lonDeg: "9°59' E" },
            { nameNp: "कोलोन (Cologne)", nameEn: "Cologne", lat: 50.9375, lon: 6.9603, tz: 1.0, latDeg: "50°56' N", lonDeg: "6°57' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 52.5200, lon: 13.4050, tz: 1.0, latDeg: "52°31' N", lonDeg: "13°24' E", isCustom: true }
        ]
    },
    {
        code: "FR",
        nameNp: "फ्रान्स (France)",
        nameEn: "France",
        defaultTz: 1.0,
        cities: [
            { nameNp: "पेरिस (Paris)", nameEn: "Paris", lat: 48.8566, lon: 2.3522, tz: 1.0, latDeg: "48°51' N", lonDeg: "2°21' E" },
            { nameNp: "मार्सेइ (Marseille)", nameEn: "Marseille", lat: 43.2965, lon: 5.3698, tz: 1.0, latDeg: "43°17' N", lonDeg: "5°22' E" },
            { nameNp: "लियोन (Lyon)", nameEn: "Lyon", lat: 45.7640, lon: 4.8357, tz: 1.0, latDeg: "45°45' N", lonDeg: "4°50' E" },
            { nameNp: "नाइस (Nice)", nameEn: "Nice", lat: 43.7102, lon: 7.2620, tz: 1.0, latDeg: "43°42' N", lonDeg: "7°15' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 48.8566, lon: 2.3522, tz: 1.0, latDeg: "48°51' N", lonDeg: "2°21' E", isCustom: true }
        ]
    },
    {
        code: "IT",
        nameNp: "इटाली (Italy)",
        nameEn: "Italy",
        defaultTz: 1.0,
        cities: [
            { nameNp: "रोम (Rome)", nameEn: "Rome", lat: 41.9028, lon: 12.4964, tz: 1.0, latDeg: "41°54' N", lonDeg: "12°29' E" },
            { nameNp: "मिलान (Milan)", nameEn: "Milan", lat: 45.4642, lon: 9.1900, tz: 1.0, latDeg: "45°27' N", lonDeg: "9°11' E" },
            { nameNp: "फ्लोरेन्स (Florence)", nameEn: "Florence", lat: 43.7696, lon: 11.2558, tz: 1.0, latDeg: "43°46' N", lonDeg: "11°15' E" },
            { nameNp: "भेनिस (Venice)", nameEn: "Venice", lat: 45.4408, lon: 12.3155, tz: 1.0, latDeg: "45°26' N", lonDeg: "12°18' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 41.9028, lon: 12.4964, tz: 1.0, latDeg: "41°54' N", lonDeg: "12°29' E", isCustom: true }
        ]
    },
    {
        code: "ES",
        nameNp: "स्पेन (Spain)",
        nameEn: "Spain",
        defaultTz: 1.0,
        cities: [
            { nameNp: "म्याड्रिड (Madrid)", nameEn: "Madrid", lat: 40.4168, lon: -3.7038, tz: 1.0, latDeg: "40°25' N", lonDeg: "3°42' W" },
            { nameNp: "बार्सिलोना (Barcelona)", nameEn: "Barcelona", lat: 41.3851, lon: 2.1734, tz: 1.0, latDeg: "41°23' N", lonDeg: "2°10' E" },
            { nameNp: "भ्यालेन्सिया (Valencia)", nameEn: "Valencia", lat: 39.4699, lon: -0.3763, tz: 1.0, latDeg: "39°28' N", lonDeg: "0°22' W" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 40.4168, lon: -3.7038, tz: 1.0, latDeg: "40°25' N", lonDeg: "3°42' W", isCustom: true }
        ]
    },
    {
        code: "PT",
        nameNp: "पोर्चुगल (Portugal)",
        nameEn: "Portugal",
        defaultTz: 0.0,
        cities: [
            { nameNp: "लिस्बन (Lisbon)", nameEn: "Lisbon", lat: 38.7223, lon: -9.1393, tz: 0.0, latDeg: "38°43' N", lonDeg: "9°08' W" },
            { nameNp: "पोर्टो (Porto)", nameEn: "Porto", lat: 41.1579, lon: -8.6291, tz: 0.0, latDeg: "41°09' N", lonDeg: "8°37' W" },
            { nameNp: "ब्रागा (Braga)", nameEn: "Braga", lat: 41.5454, lon: -8.4265, tz: 0.0, latDeg: "41°32' N", lonDeg: "8°25' W" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 38.7223, lon: -9.1393, tz: 0.0, latDeg: "38°43' N", lonDeg: "9°08' W", isCustom: true }
        ]
    },
    {
        code: "CH",
        nameNp: "स्विट्जरल्याण्ड (Switzerland)",
        nameEn: "Switzerland",
        defaultTz: 1.0,
        cities: [
            { nameNp: "ज्यूरिक (Zurich)", nameEn: "Zurich", lat: 47.3769, lon: 8.5417, tz: 1.0, latDeg: "47°22' N", lonDeg: "8°32' E" },
            { nameNp: "जेनेभा (Geneva)", nameEn: "Geneva", lat: 46.2044, lon: 6.1432, tz: 1.0, latDeg: "46°12' N", lonDeg: "6°08' E" },
            { nameNp: "बर्न (Bern)", nameEn: "Bern", lat: 46.9480, lon: 7.4474, tz: 1.0, latDeg: "46°56' N", lonDeg: "7°26' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 47.3769, lon: 8.5417, tz: 1.0, latDeg: "47°22' N", lonDeg: "8°32' E", isCustom: true }
        ]
    },
    {
        code: "NL",
        nameNp: "नेदरल्याण्ड्स (Netherlands)",
        nameEn: "Netherlands",
        defaultTz: 1.0,
        cities: [
            { nameNp: "एम्स्टर्डम (Amsterdam)", nameEn: "Amsterdam", lat: 52.3676, lon: 4.9041, tz: 1.0, latDeg: "52°22' N", lonDeg: "4°54' E" },
            { nameNp: "रोटरड्याम (Rotterdam)", nameEn: "Rotterdam", lat: 51.9244, lon: 4.4777, tz: 1.0, latDeg: "51°55' N", lonDeg: "4°28' E" },
            { nameNp: "द हेग (The Hague)", nameEn: "The Hague", lat: 52.0705, lon: 4.3007, tz: 1.0, latDeg: "52°04' N", lonDeg: "4°18' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 52.3676, lon: 4.9041, tz: 1.0, latDeg: "52°22' N", lonDeg: "4°54' E", isCustom: true }
        ]
    },
    {
        code: "PL",
        nameNp: "पोल्याण्ड (Poland)",
        nameEn: "Poland",
        defaultTz: 1.0,
        cities: [
            { nameNp: "वार्सो (Warsaw)", nameEn: "Warsaw", lat: 52.2297, lon: 21.0122, tz: 1.0, latDeg: "52°13' N", lonDeg: "21°00' E" },
            { nameNp: "क्राकाउ (Krakow)", nameEn: "Krakow", lat: 50.0647, lon: 19.9450, tz: 1.0, latDeg: "50°03' N", lonDeg: "19°56' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 52.2297, lon: 21.0122, tz: 1.0, latDeg: "52°13' N", lonDeg: "21°00' E", isCustom: true }
        ]
    },
    {
        code: "RU",
        nameNp: "रसिया (Russia)",
        nameEn: "Russia",
        defaultTz: 3.0,
        cities: [
            { nameNp: "मस्को (Moscow)", nameEn: "Moscow", lat: 55.7558, lon: 37.6173, tz: 3.0, latDeg: "55°45' N", lonDeg: "37°37' E" },
            { nameNp: "सेन्ट पिटर्सबर्ग (Saint Petersburg)", nameEn: "St. Petersburg", lat: 59.9343, lon: 30.3351, tz: 3.0, latDeg: "59°56' N", lonDeg: "30°20' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 55.7558, lon: 37.6173, tz: 3.0, latDeg: "55°45' N", lonDeg: "37°37' E", isCustom: true }
        ]
    },
    {
        code: "NZ",
        nameNp: "न्युजिल्याण्ड (New Zealand)",
        nameEn: "New Zealand",
        defaultTz: 12.0,
        cities: [
            { nameNp: "अकल्याण्ड (Auckland)", nameEn: "Auckland", lat: -36.8485, lon: 174.7633, tz: 12.0, latDeg: "36°50' S", lonDeg: "174°45' E" },
            { nameNp: "वेलिङ्टन (Wellington)", nameEn: "Wellington", lat: -41.2865, lon: 174.7762, tz: 12.0, latDeg: "41°17' S", lonDeg: "174°46' E" },
            { nameNp: "क्राइस्टचर्च (Christchurch)", nameEn: "Christchurch", lat: -43.5321, lon: 172.6362, tz: 12.0, latDeg: "43°31' S", lonDeg: "172°38' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: -36.8485, lon: 174.7633, tz: 12.0, latDeg: "36°50' S", lonDeg: "174°45' E", isCustom: true }
        ]
    },
    {
        code: "TH",
        nameNp: "थाइल्याण्ड (Thailand)",
        nameEn: "Thailand",
        defaultTz: 7.0,
        cities: [
            { nameNp: "बैंकक (Bangkok)", nameEn: "Bangkok", lat: 13.7563, lon: 100.5018, tz: 7.0, latDeg: "13°45' N", lonDeg: "100°30' E" },
            { nameNp: "चियाङ माई (Chiang Mai)", nameEn: "Chiang Mai", lat: 18.7883, lon: 98.9853, tz: 7.0, latDeg: "18°47' N", lonDeg: "98°59' E" },
            { nameNp: "फुकेत (Phuket)", nameEn: "Phuket", lat: 7.8804, lon: 98.3923, tz: 7.0, latDeg: "7°52' N", lonDeg: "98°23' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 13.7563, lon: 100.5018, tz: 7.0, latDeg: "13°45' N", lonDeg: "100°30' E", isCustom: true }
        ]
    },
    {
        code: "LK",
        nameNp: "श्रीलङ्का (Sri Lanka)",
        nameEn: "Sri Lanka",
        defaultTz: 5.5,
        cities: [
            { nameNp: "कोलम्बो (Colombo)", nameEn: "Colombo", lat: 6.9271, lon: 79.8612, tz: 5.5, latDeg: "6°55' N", lonDeg: "79°51' E" },
            { nameNp: "क्यान्डी (Kandy)", nameEn: "Kandy", lat: 7.2906, lon: 80.6337, tz: 5.5, latDeg: "7°17' N", lonDeg: "80°38' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 6.9271, lon: 79.8612, tz: 5.5, latDeg: "6°55' N", lonDeg: "79°51' E", isCustom: true }
        ]
    },
    {
        code: "BD",
        nameNp: "बंगलादेश (Bangladesh)",
        nameEn: "Bangladesh",
        defaultTz: 6.0,
        cities: [
            { nameNp: "ढाका (Dhaka)", nameEn: "Dhaka", lat: 23.8103, lon: 90.4125, tz: 6.0, latDeg: "23°48' N", lonDeg: "90°24' E" },
            { nameNp: "चट्टोग्राम (Chittagong)", nameEn: "Chittagong", lat: 22.3569, lon: 91.7832, tz: 6.0, latDeg: "22°21' N", lonDeg: "91°47' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 23.8103, lon: 90.4125, tz: 6.0, latDeg: "23°48' N", lonDeg: "90°24' E", isCustom: true }
        ]
    },
    {
        code: "PK",
        nameNp: "पाकिस्तान (Pakistan)",
        nameEn: "Pakistan",
        defaultTz: 5.0,
        cities: [
            { nameNp: "इस्लामाबाद (Islamabad)", nameEn: "Islamabad", lat: 33.6844, lon: 73.0479, tz: 5.0, latDeg: "33°41' N", lonDeg: "73°02' E" },
            { nameNp: "लाहोर (Lahore)", nameEn: "Lahore", lat: 31.5204, lon: 74.3587, tz: 5.0, latDeg: "31°31' N", lonDeg: "74°21' E" },
            { nameNp: "कराँची (Karachi)", nameEn: "Karachi", lat: 24.8607, lon: 67.0011, tz: 5.0, latDeg: "24°51' N", lonDeg: "67°00' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 33.6844, lon: 73.0479, tz: 5.0, latDeg: "33°41' N", lonDeg: "73°02' E", isCustom: true }
        ]
    },
    {
        code: "BT",
        nameNp: "भूटान (Bhutan)",
        nameEn: "Bhutan",
        defaultTz: 6.0,
        cities: [
            { nameNp: "थिम्पु (Thimphu)", nameEn: "Thimphu", lat: 27.4728, lon: 89.6393, tz: 6.0, latDeg: "27°28' N", lonDeg: "89°38' E" },
            { nameNp: "पारो (Paro)", nameEn: "Paro", lat: 27.4287, lon: 89.4164, tz: 6.0, latDeg: "27°25' N", lonDeg: "89°24' E" },
            { nameNp: "फुन्टशोलिङ (Phuntsholing)", nameEn: "Phuntsholing", lat: 26.8516, lon: 89.3884, tz: 6.0, latDeg: "26°51' N", lonDeg: "89°23' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 27.4728, lon: 89.6393, tz: 6.0, latDeg: "27°28' N", lonDeg: "89°38' E", isCustom: true }
        ]
    },
    {
        code: "MV",
        nameNp: "माल्दिभ्स (Maldives)",
        nameEn: "Maldives",
        defaultTz: 5.0,
        cities: [
            { nameNp: "माले (Malé)", nameEn: "Malé", lat: 4.1755, lon: 73.5093, tz: 5.0, latDeg: "4°10' N", lonDeg: "73°30' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 4.1755, lon: 73.5093, tz: 5.0, latDeg: "4°10' N", lonDeg: "73°30' E", isCustom: true }
        ]
    },
    {
        code: "IL",
        nameNp: "इजरायल (Israel)",
        nameEn: "Israel",
        defaultTz: 2.0,
        cities: [
            { nameNp: "जेरुसलेम (Jerusalem)", nameEn: "Jerusalem", lat: 31.7683, lon: 35.2137, tz: 2.0, latDeg: "31°46' N", lonDeg: "35°12' E" },
            { nameNp: "तेल अवीव (Tel Aviv)", nameEn: "Tel Aviv", lat: 32.0853, lon: 34.7818, tz: 2.0, latDeg: "32°05' N", lonDeg: "34°46' E" },
            { nameNp: "हाइफा (Haifa)", nameEn: "Haifa", lat: 32.7940, lon: 34.9896, tz: 2.0, latDeg: "32°47' N", lonDeg: "34°59' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 31.7683, lon: 35.2137, tz: 2.0, latDeg: "31°46' N", lonDeg: "35°12' E", isCustom: true }
        ]
    },
    {
        code: "CY",
        nameNp: "साइप्रस (Cyprus)",
        nameEn: "Cyprus",
        defaultTz: 2.0,
        cities: [
            { nameNp: "निकोसिया (Nicosia)", nameEn: "Nicosia", lat: 35.1856, lon: 33.3823, tz: 2.0, latDeg: "35°11' N", lonDeg: "33°22' E" },
            { nameNp: "लिमासोल (Limassol)", nameEn: "Limassol", lat: 34.7071, lon: 33.0226, tz: 2.0, latDeg: "34°42' N", lonDeg: "33°01' E" },
            { nameNp: "लार्नाका (Larnaca)", nameEn: "Larnaca", lat: 34.9003, lon: 33.6232, tz: 2.0, latDeg: "34°54' N", lonDeg: "33°37' E" },
            { nameNp: "पाफोस (Paphos)", nameEn: "Paphos", lat: 34.7720, lon: 32.4297, tz: 2.0, latDeg: "34°46' N", lonDeg: "32°25' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 35.1856, lon: 33.3823, tz: 2.0, latDeg: "35°11' N", lonDeg: "33°22' E", isCustom: true }
        ]
    },
    {
        code: "ZA",
        nameNp: "दक्षिण अफ्रिका (South Africa)",
        nameEn: "South Africa",
        defaultTz: 2.0,
        cities: [
            { nameNp: "जोहानेसबर्ग (Johannesburg)", nameEn: "Johannesburg", lat: -26.2041, lon: 28.0473, tz: 2.0, latDeg: "26°12' S", lonDeg: "28°02' E" },
            { nameNp: "केप टाउन (Cape Town)", nameEn: "Cape Town", lat: -33.9249, lon: 18.4241, tz: 2.0, latDeg: "33°55' S", lonDeg: "18°25' E" },
            { nameNp: "प्रिटोरिया (Pretoria)", nameEn: "Pretoria", lat: -25.7479, lon: 28.2293, tz: 2.0, latDeg: "25°44' S", lonDeg: "28°13' E" },
            { nameNp: "डर्बन (Durban)", nameEn: "Durban", lat: -29.8587, lon: 31.0218, tz: 2.0, latDeg: "29°51' S", lonDeg: "31°01' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: -26.2041, lon: 28.0473, tz: 2.0, latDeg: "26°12' S", lonDeg: "28°02' E", isCustom: true }
        ]
    },
    {
        code: "BR",
        nameNp: "ब्राजिल (Brazil)",
        nameEn: "Brazil",
        defaultTz: -3.0,
        cities: [
            { nameNp: "साओ पाउलो (São Paulo)", nameEn: "São Paulo", lat: -23.5505, lon: -46.6333, tz: -3.0, latDeg: "23°33' S", lonDeg: "46°37' W" },
            { nameNp: "रियो दि जेनेरो (Rio de Janeiro)", nameEn: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, tz: -3.0, latDeg: "22°54' S", lonDeg: "43°10' W" },
            { nameNp: "ब्राजिलिया (Brasília)", nameEn: "Brasília", lat: -15.8267, lon: -47.9218, tz: -3.0, latDeg: "15°49' S", lonDeg: "47°55' W" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: -23.5505, lon: -46.6333, tz: -3.0, latDeg: "23°33' S", lonDeg: "46°37' W", isCustom: true }
        ]
    },
    {
        code: "PH",
        nameNp: "फिलिपिन्स (Philippines)",
        nameEn: "Philippines",
        defaultTz: 8.0,
        cities: [
            { nameNp: "मनिला (Manila)", nameEn: "Manila", lat: 14.5995, lon: 120.9842, tz: 8.0, latDeg: "14°35' N", lonDeg: "120°59' E" },
            { nameNp: "केजोन सिटी (Quezon City)", nameEn: "Quezon City", lat: 14.6760, lon: 121.0437, tz: 8.0, latDeg: "14°40' N", lonDeg: "121°02' E" },
            { nameNp: "सेबु (Cebu City)", nameEn: "Cebu", lat: 10.3157, lon: 123.8854, tz: 8.0, latDeg: "10°18' N", lonDeg: "123°53' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: 14.5995, lon: 120.9842, tz: 8.0, latDeg: "14°35' N", lonDeg: "120°59' E", isCustom: true }
        ]
    },
    {
        code: "ID",
        nameNp: "इन्डोनेसिया (Indonesia / Bali)",
        nameEn: "Indonesia",
        defaultTz: 7.0,
        cities: [
            { nameNp: "जकार्ता (Jakarta)", nameEn: "Jakarta", lat: -6.2088, lon: 106.8456, tz: 7.0, latDeg: "6°12' S", lonDeg: "106°50' E" },
            { nameNp: "बाली / देनपसार (Bali, Denpasar)", nameEn: "Bali / Denpasar", lat: -8.6705, lon: 115.2126, tz: 8.0, latDeg: "8°40' S", lonDeg: "115°12' E" },
            { nameNp: "सुरबाया (Surabaya)", nameEn: "Surabaya", lat: -7.2575, lon: 112.7521, tz: 7.0, latDeg: "7°15' S", lonDeg: "112°45' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: -6.2088, lon: 106.8456, tz: 7.0, latDeg: "6°12' S", lonDeg: "106°50' E", isCustom: true }
        ]
    },
    {
        code: "MU",
        nameNp: "मौरिसस (Mauritius)",
        nameEn: "Mauritius",
        defaultTz: 4.0,
        cities: [
            { nameNp: "पोर्ट लुइस (Port Louis)", nameEn: "Port Louis", lat: -20.1609, lon: 57.5012, tz: 4.0, latDeg: "20°09' S", lonDeg: "57°30' E" },
            { nameNp: "अन्य / म्यानुअल (Custom)", nameEn: "Custom / Manual", lat: -20.1609, lon: 57.5012, tz: 4.0, latDeg: "20°09' S", lonDeg: "57°30' E", isCustom: true }
        ]
    },
    {
        code: "OTHER",
        nameNp: "अन्य देश / म्यानुअल स्थान (Custom World Location)",
        nameEn: "Other Country / Custom",
        defaultTz: 5.75,
        cities: [
            { nameNp: "म्यानुअल स्थान (User Custom Coordinates)", nameEn: "Custom Location", lat: 27.7172, lon: 85.3240, tz: 5.75, latDeg: "27°43' N", lonDeg: "85°19' E", isCustom: true }
        ]
    }
];

// Nepal Standard Time (NST): UTC+5:45 (Meridian = 86°15' E)
const NEPAL_STANDARD_LON = 86.25; // 86° 15'
const NEPAL_TZ_OFFSET = 5.75; // +5:45 in decimal hours

// सहायक प्रकार्यहरू (Helper Functions)
function getCountryByCode(code) {
    return WORLD_COUNTRIES.find(c => c.code === code) || WORLD_COUNTRIES[0];
}

function getCityData(countryCode, cityIndex) {
    const country = getCountryByCode(countryCode);
    if (!country || !country.cities) return NEPAL_DISTRICTS[0];
    return country.cities[cityIndex] || country.cities[0];
}

// Export for Node and Browser
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        NEPAL_DISTRICTS,
        WORLD_COUNTRIES,
        NEPAL_STANDARD_LON,
        NEPAL_TZ_OFFSET,
        getCountryByCode,
        getCityData
    };
}
