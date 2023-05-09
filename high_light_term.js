function highlightCurrentDateCard() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Remove time component from the date

    const cards = document.querySelectorAll('.card');
    let minDifference = Number.MAX_VALUE;
    let closestNameElement;

    cards.forEach(function(card) {
        const dateElement = card.querySelector('.date');
        const cardDate = new Date(dateElement.textContent);

        const difference = Math.abs(currentDate - cardDate);

        if (difference < minDifference) {
            minDifference = difference;
            closestNameElement = card.querySelector('.card_name p');
        }
    });

    closestNameElement.classList.add('highlight-name');
}

highlightCurrentDateCard();
