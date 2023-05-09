document.querySelectorAll(".season").forEach((season) => {
    season.addEventListener("click", (event) => {
        const selectedSeason = event.target.getAttribute("data-season");
        showCards(selectedSeason);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    setDefaultSeason();
});

document.querySelectorAll(".season").forEach((season) => {
    season.addEventListener("click", (event) => {
        const selectedSeason = event.target.getAttribute("data-season");
        showCards(selectedSeason);
    });
});

function setDefaultSeason() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    let defaultSeason = "";

    if (currentMonth >= 2 && currentMonth <= 4) {
        defaultSeason = "Spring";
    } else if (currentMonth >= 5 && currentMonth <= 7) {
        defaultSeason = "Summer";
    } else if (currentMonth >= 8 && currentMonth <= 10) {
        defaultSeason = "Autumn";
    } else {
        defaultSeason = "Winter";
    }

    showCards(defaultSeason);
}

function showCards(season) {
    const cardsContainer = document.getElementById("cards-container");
    const allCards = document.querySelectorAll(".card");
    const seasonCards = document.querySelectorAll(`.card[data-season="${season}"]`);

    // Hide all cards
    allCards.forEach((card) => {
        card.style.display = "none";
    });

    // Show only the first 6 cards of the selected season
    for (let i = 0; i < 6 && i < seasonCards.length; i++) {
        seasonCards[i].style.display = "flex";
    }
}


    document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('clicked');
    });
});

document.querySelectorAll('.sidebar button').forEach(function(button) {
    button.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        window.location.href = link;
    });
});




