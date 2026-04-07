// ====================== PRZYCISK BACK ======================
    backButton.addEventListener('click', function () {
        // 1. Ukrywamy ekran z kartami
        cards_you_got.style.display = "none";

        // 2. Pokazujemy paczkę
        packWrapper.style.display = "block";

        // 3. Resetujemy pełną paczkę
        fullImg.style.opacity = '1';
        fullImg.style.transition = '';

        // 4. NAJWAŻNIEJSZE – czyścimy inline style, który blokował hover
        packWrapper.style.transform = '';
        packWrapper.style.removeProperty('transform');   // dodatkowe zabezpieczenie

        // 5. Usuwamy klasę blokującą
        packWrapper.classList.remove('opening');
		packWrapper.classList.remove("no-shadow");
    });