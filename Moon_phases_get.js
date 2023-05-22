function getMoonPhase(date) {
    const phase = SunCalc.getMoonIllumination(date).phase;
    let phaseName, phaseNamech;

    switch (true) {
        case phase === 0:
            phaseName = "New Moon";
            phaseNamech = "新月";
            break;
        case phase > 0 && phase < 0.25:
            phaseName = "Waxing Crescent";
            phaseNamech = "蛾眉月";
            break;
        case phase === 0.25:
            phaseName = "First Quarter";
            phaseNamech = "上弦月";
            break;
        case phase > 0.25 && phase < 0.5:
            phaseName = "Waxing Gibbous";
            phaseNamech = "盈凸月";
            break;
        case phase === 0.5:
            phaseName = "Full Moon";
            phaseNamech = "滿月";
            break;
        case phase > 0.5 && phase < 0.75:
            phaseName = "Waning Gibbous";
            phaseNamech = "虧凸月";
            break;
        case phase === 0.75:
            phaseName = "Last Quarter";
            phaseNamech = "下弦月";
            break;
        case phase > 0.75 && phase < 1:
            phaseName = "Waning Crescent";
            phaseNamech = "殘月";
            break;
        default:
            phaseName = "";
            phaseNamech = "";
            break;
    }

    return { phaseName, phaseNamech };
}

function highlightCurrentMoonPhase() {
    const currentDate = new Date();
    const { phaseName, phaseNamech } = getMoonPhase(currentDate);

    const moonPhaseNames = [
        "New Moon",
        "Waxing Crescent",
        "First Quarter",
        "Waxing Gibbous",
        "Full Moon",
        "Waning Gibbous",
        "Last Quarter",
        "Waning Crescent",
    ];

    const moonPhaseIds = [
        "new_moon",
        "waxing_crescent",
        "first_quarter",
        "waxing_gibbous",
        "full_moon",
        "waning_gibbous",
        "last_quarter",
        "waning_crescent",
    ];

    const currentMoonPhaseIndex = moonPhaseNames.indexOf(phaseName);
    const currentMoonPhaseId = moonPhaseIds[currentMoonPhaseIndex];

    const currentMoonCard = document.getElementById(currentMoonPhaseId);
    currentMoonCard.classList.add("current");
}
function highlightCurrentMoonPhase() {
    const currentDate = new Date();
    const { phaseName, phaseNamech } = getMoonPhase(currentDate);

    const moonPhaseNames = [
        "New Moon",
        "Waxing Crescent",
        "First Quarter",
        "Waxing Gibbous",
        "Full Moon",
        "Waning Gibbous",
        "Last Quarter",
        "Waning Crescent",
    ];

    const moonPhaseIds = [
        "new_moon",
        "waxing_crescent",
        "first_quarter",
        "waxing_gibbous",
        "full_moon",
        "waning_gibbous",
        "last_quarter",
        "waning_crescent",
    ];

    const currentMoonPhaseIndex = moonPhaseNames.indexOf(phaseName);
    const currentMoonPhaseId = moonPhaseIds[currentMoonPhaseIndex];

    const currentMoonCard = document.getElementById(currentMoonPhaseId);
    currentMoonCard.classList.add("current");
}

highlightCurrentMoonPhase();

function highlightText() {
    const currentMoonCard = document.querySelector(".current");
    if (currentMoonCard) {
        const nameDivE = currentMoonCard.querySelector(".name_e");
        const nameDivC = currentMoonCard.querySelector(".name_c");
        nameDivE.style.color = "#9e2c36"; // replace with your preferred highlight color
        nameDivC.style.color = "#9e2c36"; // replace with your preferred highlight color
    }
}

highlightCurrentMoonPhase();
highlightText();



