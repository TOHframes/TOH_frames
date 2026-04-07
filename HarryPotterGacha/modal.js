        function openCardModal(card) {
            modalContent.innerHTML = '';

            const enlarged = card.cloneNode(true);
            enlarged.style.transform = 'scale(1.65)';
            enlarged.style.boxShadow = '0 0 80px rgba(255, 221, 0, 0.6)';

            modalContent.appendChild(enlarged);


            enlarged.addEventListener('click', function (e) {
                e.stopImmediatePropagation();
                const wikiUrl = card.dataset.wiki;
				window.open(wikiUrl, '_blank');
            });

            modalOverlay.style.display = 'flex';
        }


        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });


        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.card').forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function () {
                    openCardModal(this);
                });
            });
        });
