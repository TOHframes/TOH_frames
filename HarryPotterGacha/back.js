    backButton.addEventListener('click', function () {
        cards_you_got.style.display = "none";

        packWrapper.style.display = "block";

        fullImg.style.opacity = '1';
        fullImg.style.transition = '';

        packWrapper.style.transform = '';
        packWrapper.style.removeProperty('transform');

        packWrapper.classList.remove('opening');
		packWrapper.classList.remove("no-shadow");
    });
