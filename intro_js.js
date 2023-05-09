

document.querySelectorAll('.sidebar button').forEach(function(button) {
    button.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        window.location.href = link;
    });
});
