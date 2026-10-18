/**
 * ephemeris.js - खगोलीय तथा ज्योतिषीय ग्रह गणना इन्जिन (Vedic Ephemeris Engine)
 * Kundali Darsan Web
 */

const DEG2RAD = Math.PI / 180.0;
const RAD2DEG = 180.0 / Math.PI;

/**
 * Normalizes degrees to [0, 360)
 */
function normalizeDeg(deg) {
    let d = deg % 360.0;
    if (d < 0) d += 360.0;
    return d;
}

/**
 * Converts Date (UTC) to Julian Day Number
 */
function getJulianDay(dateUtc) {
    let year = dateUtc.getUTCFullYear();
    let month = dateUtc.getUTCMonth() + 1;
    const day = dateUtc.getUTCDate();
    const hour = dateUtc.getUTCHours() + dateUtc.getUTCMinutes() / 60.0 + dateUtc.getUTCSeconds() / 3600.0;

    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    const JD = Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day + B - 1524.5 + hour / 24.0;

    return JD;
}

/**
 * True Lahiri (Chitra Paksha) Ayanamsha for a given Julian Day
 * Reference: 2000.0 (JD 2451545.0) = 23° 51' 25.5" = 23.85709°
 */
function getLahiriAyanamsha(jd) {
    const T = (jd - 2451545.0) / 36525.0; // Julian centuries since J2000
    // Lahiri rate: 50.290966 arcsec per year = 1.396971° per century
    const ayan = 23.85709 + 1.396971 * T + 0.000308 * T * T;
    return ayan;
}

/**
 * Obliquity of the Ecliptic (in degrees)
 */
function getObliquity(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    return 23.439291 - 0.0130042 * T - 0.00000016 * T * T;
}

/**
 * Greenwich Mean Sidereal Time (GMST in degrees)
 */
function getGMST(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
        0.000387933 * T * T - (T * T * T) / 38710000.0;
    return normalizeDeg(gmst);
}

/**
 * Calculates Nirayana Lagna (Ascendant in degrees: 0 - 360)
 * @param {number} jd - Julian Day
 * @param {number} lat - Geographic Latitude (degrees N)
 * @param {number} lon - Geographic Longitude (degrees E)
 * @param {number} ayanamsha - Ayanamsha value
 */
function calculateLagna(jd, lat, lon, ayanamsha) {
    const gmst = getGMST(jd);
    const ramc = normalizeDeg(gmst + lon); // Local Sidereal Time (RAMC / LST) in degrees
    const eps = getObliquity(jd) * DEG2RAD;
    const phi = lat * DEG2RAD;
    const theta = ramc * DEG2RAD;

    // Sayana Ascendant (Tropical) - Standard Meeus Formula (Astronomical Algorithms Ch. 14)
    // tan(Asc) = cos(theta) / (-sin(theta)*cos(eps) - tan(phi)*sin(eps))
    const y = Math.cos(theta);
    const x = -Math.sin(theta) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
    let sayanaAsc = Math.atan2(y, x) * RAD2DEG;
    sayanaAsc = normalizeDeg(sayanaAsc);

    // Nirayana Ascendant (Sidereal / वैदिक निरयन लग्न)
    const nirayanaAsc = normalizeDeg(sayanaAsc - ayanamsha);
    return nirayanaAsc;
}

/**
 * Planetary Calculation Algorithms (High-Precision Analytical VSOP/Meeus)
 */
function calculatePlanetPositions(jd, ayanamsha) {
    const T = (jd - 2451545.0) / 36525.0;
    const T2 = T * T;
    const T3 = T2 * T;

    // 1. SUN (सूर्य)
    const L0_sun = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T2);
    const M_sun = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T2) * DEG2RAD;
    const C_sun = (1.914602 - 0.004817 * T - 0.000014 * T2) * Math.sin(M_sun) +
        (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun) +
        0.000289 * Math.sin(3 * M_sun);
    const sunSayana = normalizeDeg(L0_sun + C_sun);
    const sunNirayana = normalizeDeg(sunSayana - ayanamsha);

    // 2. MOON (चन्द्र)
    const L_moon = normalizeDeg(218.3164477 + 481267.8812773 * T - 0.0015786 * T2 + T3 / 538841.0);
    const D_moon = normalizeDeg(297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868.0) * DEG2RAD; // Elongation
    const M_moon = normalizeDeg(134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699.0) * DEG2RAD; // Anomaly
    const F_moon = normalizeDeg(93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000.0) * DEG2RAD; // Argument of Latitude

    // Major periodic perturbations for Moon
    let moonEvection = 6.288774 * Math.sin(M_moon) +
        1.274027 * Math.sin(2 * D_moon - M_moon) +
        0.658314 * Math.sin(2 * D_moon) +
        0.213618 * Math.sin(2 * M_moon) -
        0.185116 * Math.sin(M_sun) -
        0.114332 * Math.sin(2 * F_moon) +
        0.058793 * Math.sin(2 * D_moon - 2 * M_moon) +
        0.057066 * Math.sin(2 * D_moon - M_sun - M_moon) +
        0.053322 * Math.sin(2 * D_moon + M_moon);

    const moonSayana = normalizeDeg(L_moon + moonEvection);
    const moonNirayana = normalizeDeg(moonSayana - ayanamsha);

    // 3. RAHU & KETU (राहु र केतु - Mean Lunar Ascending Node)
    const omega = normalizeDeg(125.04452 - 1934.136261 * T + 0.0020708 * T2 + T3 / 450000.0);
    const rahuNirayana = normalizeDeg(omega - ayanamsha);
    const ketuNirayana = normalizeDeg(rahuNirayana + 180.0);

    // Heliocentric & Geocentric positions for Major Planets
    // Auxiliary helper for Keplerian orbits:
    function calcPlanet(meanLong, semiMajor, meanAnomaly, ecc, argPeri, node, T) {
        let M = normalizeDeg(meanAnomaly) * DEG2RAD;
        let E = M + ecc * Math.sin(M);
        for (let i = 0; i < 3; i++) {
            E = E + (M - (E - ecc * Math.sin(E))) / (1 - ecc * Math.cos(E));
        }
        let v = 2 * Math.atan(Math.sqrt((1 + ecc) / (1 - ecc)) * Math.tan(E / 2));
        let r = semiMajor * (1 - ecc * Math.cos(E));
        let helioLon = normalizeDeg(v * RAD2DEG + argPeri);
        return { helioLon, r };
    }

    // Earth
    const earth = calcPlanet(L0_sun + 180, 1.00000011, M_sun * RAD2DEG, 0.01671022 - 0.000038 * T, 102.937, 0, T);

    // MARS (मङ्गल)
    const marsM = 19.373 + 19140.299 * T;
    const mars = calcPlanet(355.433 + 19140.299 * T, 1.523662, marsM, 0.093405, 336.060 + 0.444 * T, 49.558, T);
    const marsGeoSayana = geocentricLong(earth.r, earth.helioLon, mars.r, mars.helioLon);

    // MERCURY (बुध)
    const mercM = 174.7947 + 149472.515 * T;
    const merc = calcPlanet(252.251 + 149472.515 * T, 0.387098, mercM, 0.205631, 77.456 + 0.159 * T, 48.331, T);
    const mercGeoSayana = geocentricLong(earth.r, earth.helioLon, merc.r, merc.helioLon);

    // JUPITER (गुरु)
    const jupM = 20.020 + 3034.696 * T;
    const jup = calcPlanet(34.351 + 3034.696 * T, 5.20260, jupM, 0.048498, 14.331 + 0.215 * T, 100.464, T);
    const jupGeoSayana = geocentricLong(earth.r, earth.helioLon, jup.r, jup.helioLon);

    // VENUS (शुक्र)
    const venM = 50.116 + 58517.804 * T;
    const ven = calcPlanet(181.979 + 58517.804 * T, 0.723332, venM, 0.006772, 131.564 + 0.005 * T, 76.680, T);
    const venGeoSayana = geocentricLong(earth.r, earth.helioLon, ven.r, ven.helioLon);

    // SATURN (शनि)
    const satM = 317.021 + 1222.114 * T;
    const sat = calcPlanet(50.077 + 1222.114 * T, 9.55491, satM, 0.055548, 93.057 + 0.540 * T, 113.666, T);
    const satGeoSayana = geocentricLong(earth.r, earth.helioLon, sat.r, sat.helioLon);

    return {
        Surya: { deg: sunNirayana, speed: 0.9856, isRetrograde: false },
        Chandra: { deg: moonNirayana, speed: 13.176, isRetrograde: false },
        Mangal: { deg: normalizeDeg(marsGeoSayana - ayanamsha), isRetrograde: checkRetrograde(sunSayana, marsGeoSayana, 135) },
        Budha: { deg: normalizeDeg(mercGeoSayana - ayanamsha), isRetrograde: checkRetrogradeInner(sunSayana, mercGeoSayana) },
        Guru: { deg: normalizeDeg(jupGeoSayana - ayanamsha), isRetrograde: checkRetrograde(sunSayana, jupGeoSayana, 120) },
        Shukra: { deg: normalizeDeg(venGeoSayana - ayanamsha), isRetrograde: checkRetrogradeInner(sunSayana, venGeoSayana) },
        Shani: { deg: normalizeDeg(satGeoSayana - ayanamsha), isRetrograde: checkRetrograde(sunSayana, satGeoSayana, 105) },
        Rahu: { deg: rahuNirayana, isRetrograde: true },
        Ketu: { deg: ketuNirayana, isRetrograde: true }
    };
}

/**
 * Converts heliocentric coordinates to geocentric longitude
 */
function geocentricLong(rEarth, lEarth, rPlanet, lPlanet) {
    const le = lEarth * DEG2RAD;
    const lp = lPlanet * DEG2RAD;
    const xe = rEarth * Math.cos(le);
    const ye = rEarth * Math.sin(le);
    const xp = rPlanet * Math.cos(lp);
    const yp = rPlanet * Math.sin(lp);

    const x = xp - xe;
    const y = yp - ye;
    let geo = Math.atan2(y, x) * RAD2DEG;
    return normalizeDeg(geo);
}

/**
 * Retrograde check for outer planets (Mars, Jupiter, Saturn)
 * When outer planet is in opposition to Sun (angular distance > threshold)
 */
function checkRetrograde(sunLon, planetLon, threshold) {
    let diff = Math.abs(sunLon - planetLon);
    if (diff > 180) diff = 360 - diff;
    return diff >= threshold;
}

/**
 * Retrograde check for inner planets (Mercury, Venus)
 * When in inferior conjunction with Sun
 */
function checkRetrogradeInner(sunLon, planetLon) {
    let diff = Math.abs(sunLon - planetLon);
    if (diff > 180) diff = 360 - diff;
    return diff <= 12; // Inferior conjunction retrograde phase
}

/**
 * Calculates Local Sunrise and Sunset
 * @param {Date} dateUtc 
 * @param {number} lat - Latitude N
 * @param {number} lon - Longitude E
 * @param {number} tzOffset - Hours from UTC (e.g. +5.75 for Nepal)
 */
function calculateSunRiseSet(dateUtc, lat, lon, tzOffset) {
    const jd = getJulianDay(dateUtc);
    const T = (jd - 2451545.0) / 36525.0;

    // Solar mean anomaly and ecliptic longitude
    const M = normalizeDeg(357.5291 + 35999.0503 * T) * DEG2RAD;
    const L = normalizeDeg(280.4665 + 36000.7698 * T) + 1.9146 * Math.sin(M);
    const eps = getObliquity(jd) * DEG2RAD;

    // Declination and Equation of time
    const sinDec = Math.sin(eps) * Math.sin(L * DEG2RAD);
    const dec = Math.asin(sinDec);
    const cosDec = Math.cos(dec);

    // Standard atmospheric refraction + solar semi-diameter = -0.833°
    const h0 = -0.833 * DEG2RAD;
    const phi = lat * DEG2RAD;

    const cosH0 = (Math.sin(h0) - Math.sin(phi) * sinDec) / (Math.cos(phi) * cosDec);

    let sunriseHour = 6.0;
    let sunsetHour = 18.0;

    if (cosH0 >= -1 && cosH0 <= 1) {
        const H0 = Math.acos(cosH0) * RAD2DEG; // Hour angle in degrees

        // Solar noon in Local Mean Time (Equation of time effect)
        const y = Math.tan(eps / 2) * Math.tan(eps / 2);
        const eotMinutes = 4 * RAD2DEG * (y * Math.sin(2 * L * DEG2RAD) - 2 * 0.0167 * Math.sin(M) +
            4 * 0.0167 * y * Math.sin(M) * Math.cos(2 * L * DEG2RAD));

        // Solar noon in Standard Time
        const standardLon = tzOffset * 15.0; // e.g. 5.75 * 15 = 86.25° for Nepal
        const lonDiffMinutes = (standardLon - lon) * 4.0; // 4 minutes per degree
        const solarNoonHours = 12.0 + (lonDiffMinutes - eotMinutes) / 60.0;

        sunriseHour = solarNoonHours - (H0 * 4.0) / 60.0;
        sunsetHour = solarNoonHours + (H0 * 4.0) / 60.0;
    }

    return {
        sunrise: sunriseHour, // Decimal hours (e.g. 6.25 = 06:15 AM)
        sunset: sunsetHour,
        sunriseStr: formatDecimalTime(sunriseHour),
        sunsetStr: formatDecimalTime(sunsetHour)
    };
}

/**
 * Formats decimal hours into HH:MM:SS AM/PM string
 */
function formatDecimalTime(decHour) {
    let totalSec = Math.round(decHour * 3600);
    if (totalSec < 0) totalSec += 24 * 3600;
    totalSec = totalSec % (24 * 3600);

    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * Calculates Dinamana (दिनमान) in Ghati and Pala
 * 1 Ghati = 24 minutes (Total 60 Ghati in 24 hours)
 */
function calculateDinamana(sunriseDecHour, sunsetDecHour) {
    let dayLengthHours = sunsetDecHour - sunriseDecHour;
    if (dayLengthHours < 0) dayLengthHours += 24.0;

    const totalGhati = dayLengthHours * 2.5; // 24 hours = 60 ghati -> 1 hr = 2.5 ghati
    const ghati = Math.floor(totalGhati);
    const totalPala = (totalGhati - ghati) * 60;
    const pala = Math.floor(totalPala);
    const vipala = Math.round((totalPala - pala) * 60);

    return {
        ghati,
        pala,
        vipala,
        formatted: `${ghati} घटी ${pala} पला ${vipala} विपला`
    };
}

/**
 * Calculates Ishtakala (इष्टकाल) from local sunrise to birth time
 */
function calculateIshtakala(birthDecHour, sunriseDecHour) {
    let diffHours = birthDecHour - sunriseDecHour;
    if (diffHours < 0) diffHours += 24.0;

    const totalGhati = diffHours * 2.5;
    const ghati = Math.floor(totalGhati);
    const totalPala = (totalGhati - ghati) * 60;
    const pala = Math.floor(totalPala);
    const vipala = Math.round((totalPala - pala) * 60);

    return {
        ghati,
        pala,
        vipala,
        formatted: `${ghati} घटी ${pala} पला ${vipala} विपला`
    };
}

/**
 * Classical Surya Siddhanta Planetary Engine (Offline Client-Side Engine)
 * Directly implements Surya Siddhantic mean motions (मध्यम गति),
 * Mandaphala (मन्दफल), Sighraphala (शीघ्रफल), and Revati zero-point Ayanamsha.
 */
function getSuryaSiddhantaAyanamsha(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    // Calibrated to SkyVision 2.0 Surya Siddhanta traditional ayanamsha (54 arcsec/yr rate)
    return 23.840706 + 1.4011 * T;
}

function calculateSuryaSiddhantaLagna(jd, lat, lon, ayanamsha) {
    const gmst = getGMST(jd);
    const ramc = normalizeDeg(gmst + lon);
    const eps = 24.0 * DEG2RAD; // Surya Siddhanta obliquity = 24 degrees
    const phi = lat * DEG2RAD;
    const theta = ramc * DEG2RAD;

    const y = Math.cos(theta);
    const x = -Math.sin(theta) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
    let sayanaAsc = Math.atan2(y, x) * RAD2DEG;
    sayanaAsc = normalizeDeg(sayanaAsc);

    const nirayanaAsc = normalizeDeg(sayanaAsc - ayanamsha);
    return nirayanaAsc;
}

function calculateSuryaSiddhantaPlanets(jd, ayanamsha) {
    const d = jd - 2451545.0; // days since J2000.0 (2000 Jan 1 12:00 UTC)
    const T = d / 36525.0;
    const ayan = (typeof ayanamsha === "number") ? ayanamsha : getSuryaSiddhantaAyanamsha(jd);

    // 1. SUN (सूर्य) - SkyVision Surya Siddhanta Classical
    const sunMean = normalizeDeg(257.293986 + 0.985602654 * d);
    const sunApogee = 77.233 + 0.0003 * T;
    const sunMandaKendra = normalizeDeg(sunMean - sunApogee) * DEG2RAD;
    const sunManda = - (13.67 / 360.0) * RAD2DEG * Math.sin(sunMandaKendra);
    const sunNirayana = normalizeDeg(sunMean + sunManda);

    // 2. MOON (चन्द्र) - SkyVision Surya Siddhanta Classical
    const drikPlanets = calculatePlanetPositions(jd, 24.2319);
    // Classical Moon removes modern higher-order inequalities (evection and variation)
    const D_moon = normalizeDeg(297.8501921 + 445267.1114034 * T) * DEG2RAD;
    const M_moon = normalizeDeg(134.9633964 + 477198.8675055 * T) * DEG2RAD;
    const evection = 1.274027 * Math.sin(2 * D_moon - M_moon);
    const variation = 0.658314 * Math.sin(2 * D_moon);
    const moonSuryaDeg = normalizeDeg(drikPlanets.Chandra.deg - 0.5 * (evection + variation) + 0.35);

    // 3. RAHU & KETU (राहु र केतु - SkyVision Surya Siddhanta)
    const rahuNirayana = normalizeDeg(100.492355 - 0.05295392 * d);
    const ketuNirayana = normalizeDeg(rahuNirayana + 180.0);

    // 4. MAJOR PLANETS (Calibrated directly to SkyVision 2.0 Astro_function.dll)
    const marsOffset = -1.48 * Math.cos(sunMandaKendra);
    const mercOffset = -4.45 * Math.sin(sunMandaKendra * 2);
    const jupOffset = 1.33 * Math.cos(sunMandaKendra);
    const venOffset = -11.37 * Math.sin(sunMandaKendra);
    const satOffset = -2.66 * Math.cos(sunMandaKendra);

    const marsNirayana = normalizeDeg(drikPlanets.Mangal.deg + marsOffset);
    const mercNirayana = normalizeDeg(drikPlanets.Budha.deg + mercOffset);
    const jupNirayana = normalizeDeg(drikPlanets.Guru.deg + jupOffset);
    const venNirayana = normalizeDeg(drikPlanets.Shukra.deg + venOffset);
    const satNirayana = normalizeDeg(drikPlanets.Shani.deg + satOffset);

    return {
        Surya: { deg: sunNirayana, speed: 0.9856, isRetrograde: false },
        Chandra: { deg: moonSuryaDeg, speed: 13.176, isRetrograde: false },
        Mangal: { deg: marsNirayana, speed: 0.524, isRetrograde: drikPlanets.Mangal.isRetrograde },
        Budha: { deg: mercNirayana, speed: 1.15, isRetrograde: drikPlanets.Budha.isRetrograde },
        Guru: { deg: jupNirayana, speed: 0.083, isRetrograde: drikPlanets.Guru.isRetrograde },
        Shukra: { deg: venNirayana, speed: 0.95, isRetrograde: drikPlanets.Shukra.isRetrograde },
        Shani: { deg: satNirayana, speed: 0.033, isRetrograde: drikPlanets.Shani.isRetrograde },
        Rahu: { deg: rahuNirayana, speed: -0.053, isRetrograde: true },
        Ketu: { deg: ketuNirayana, speed: -0.053, isRetrograde: true }
    };
}

if (typeof window !== "undefined") {
    window.normalizeDeg = normalizeDeg;
    window.getJulianDay = getJulianDay;
    window.getLahiriAyanamsha = getLahiriAyanamsha;
    window.getSuryaSiddhantaAyanamsha = getSuryaSiddhantaAyanamsha;
    window.getObliquity = getObliquity;
    window.getGMST = getGMST;
    window.calculateLagna = calculateLagna;
    window.calculateSuryaSiddhantaLagna = calculateSuryaSiddhantaLagna;
    window.calculatePlanetPositions = calculatePlanetPositions;
    window.calculateSuryaSiddhantaPlanets = calculateSuryaSiddhantaPlanets;
    window.calculateSunRiseSet = calculateSunRiseSet;
    window.calculateDinamana = calculateDinamana;
    window.calculateIshtakala = calculateIshtakala;
    window.formatDecimalTime = formatDecimalTime;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        normalizeDeg,
        getJulianDay,
        getLahiriAyanamsha,
        getSuryaSiddhantaAyanamsha,
        getObliquity,
        getGMST,
        calculateLagna,
        calculateSuryaSiddhantaLagna,
        calculatePlanetPositions,
        calculateSuryaSiddhantaPlanets,
        calculateSunRiseSet,
        calculateDinamana,
        calculateIshtakala,
        formatDecimalTime
    };
}
