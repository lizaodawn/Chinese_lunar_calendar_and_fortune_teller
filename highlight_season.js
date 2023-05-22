function highlightSeasonButton() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript.

    let seasonId;

    if (currentMonth >= 2 && currentMonth <= 4) {
        seasonId = 'bspring';
    } else if (currentMonth >= 5 && currentMonth <= 7) {
        seasonId = 'bsummer';
    } else if (currentMonth >= 8 && currentMonth <= 10) {
        seasonId = 'bautumn';
    } else {
        seasonId = 'bwinter';
    }

    const seasonButton = document.getElementById(seasonId);
    seasonButton.classList.add('highlight-season');
}

highlightSeasonButton();
