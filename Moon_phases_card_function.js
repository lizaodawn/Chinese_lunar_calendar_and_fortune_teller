document.querySelectorAll('.moon_card').forEach((moon_card) => {
    moon_card.addEventListener('click', () => {
        moon_card.classList.toggle('clicked');
    });
});

document.querySelectorAll('.sidebar-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        window.location.href = link;
    });
});

