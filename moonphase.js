/*
const SunCalc = require('suncalc');
const date = new Date();
const moonIllumination = SunCalc.getMoonIllumination(date);
const phase = moonIllumination.phase;

const MoonPhases = [
    '🌑 New Moon 新月',
    '🌒 Waxing Crescent 蛾眉月',
    '🌓 First Quarter 上弦月',
    '🌔 Waxing Gibbous 盈凸月',
    '🌕 Full Moon 满月',
    '🌖 Waning Gibbous 亏凸月',
    '🌗 Last Quarter 下弦月',
    '🌘 Waning Crescent 残月',
];

let phaseName;

switch (true) {
    case (phase === 0):
        phaseName = MoonPhases[0];
        break;
    case (phase > 0 && phase < 0.25):
        phaseName = MoonPhases[1];
        break;
    case (phase === 0.25):
        phaseName = MoonPhases[2];
        break;
    case (phase > 0.25 && phase < 0.5):
        phaseName = MoonPhases[3];
        break;
    case (phase === 0.5):
        phaseName = MoonPhases[4];
        break;
    case (phase > 0.5 && phase < 0.75):
        phaseName = MoonPhases[5];
        break;
    case (phase === 0.75):
        phaseName = MoonPhases[6];
        break;
    case (phase > 0.75 && phase < 1):
        phaseName = MoonPhases[7];
        break;
}

console.log(phaseName);*/
function getMoonPhase(date) {
    const phase = SunCalc.getMoonIllumination(date).phase;
    let phaseName, phaseNamech, phaseIcon;

    switch (true) {
        case phase === 0:
            phaseName = "New Moon";
            phaseNamech = "新月";
            phaseIcon = "/WISproject/img/moon_phase/moon1.png";
            break;
        case phase > 0 && phase < 0.25:
            phaseName = "Waxing Crescent";
            phaseNamech = "蛾眉月";
            phaseIcon = "/WISproject/img/moon_phase/moon2.png";
            break;
        case phase === 0.25:
            phaseName = "First Quarter";
            phaseNamech = "上弦月";
            phaseIcon = "/WISproject/img/moon_phase/moon3.png";
            break;
        case phase > 0.25 && phase < 0.5:
            phaseName = "Waxing Gibbous";
            phaseNamech = "盈凸月";
            phaseIcon = "/WISproject/img/moon_phase/moon4.png";
            break;
        case phase === 0.5:
            phaseName = "Full Moon";
            phaseNamech = "滿月";
            phaseIcon = "/WISproject/img/moon_phase/moon5.png";
            break;
        case phase > 0.5 && phase < 0.75:
            phaseName = "Waning Gibbous";
            phaseNamech = "虧凸月";
            phaseIcon = "/WISproject/img/moon_phase/moon6.png";
            break;
        case phase === 0.75:
            phaseName = "Last Quarter";
            phaseNamech = "下弦月";
            phaseIcon = "/WISproject/img/moon_phase/moon7.png";
            break;
        case phase > 0.75 && phase < 1:
            phaseName = "Waning Crescent";
            phaseNamech = "殘月";
            phaseIcon = "/WISproject/img/moon_phase/moon8.png";
            break;
        default:
            phaseName = "";
            phaseIcon = "";
            break;
    }

    const moonphasereturn = `
        <img class="moonphaseimg" src="${phaseIcon}" alt="img of ${phaseName}"/>
        <p class="phasename">${phaseName} <span class="phasech">${phaseNamech}</span> </p>
    `;

    return moonphasereturn;
}

/*const moonPhaseDiv = document.getElementById("moon-phase");
/!*const today = new Date();*!/
const moonPhase = getMoonPhase(today);

moonPhaseDiv.innerHTML = `${moonPhase.phaseIcon} ${moonPhase.phaseName}`;*/


const moonPhaseDiv = document.getElementById("moon-phase");
/*const testday = new Date(2023, 5, 15);*/
const moonPhase = getMoonPhase(today);

moonPhaseDiv.innerHTML = moonPhase
