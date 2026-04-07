        function openCardModal(card, id) {
			
			let data = JSON.parse(localStorage.getItem(id));

			
			

			card.querySelector('.rarity').textContent = data.rarity;
			card.querySelector('.name').textContent = data.name;
			card.querySelector('.description').textContent = data.description;
			card.querySelectorAll('.stat .value')[0].textContent = data.atk;
			card.querySelectorAll('.stat .value')[1].textContent = data.def;
			card.dataset.wiki = data.wiki;
			card.querySelector('.artwork img').style.display = "inline";
			card.querySelector('.artwork span').style.display = "inline";
			card.querySelector('.artwork span').textContent = "";
			
			
			if (data.image !="")
			{
				card.querySelector('.artwork img').src = data.image;
				card.querySelector('.artwork span').style.display = "none";
			}
			else
			{
				card.querySelector('.artwork img').style.display = "none";
				card.querySelector('.artwork span').textContent = data.name;
			}
			
			
			if (data.rarity == "O")
			{
				card.style.setProperty('--frame-color', '#ffd700');
				card.style.setProperty('--rarity-text-color', '#ffd700');
			}
			else if (data.rarity == "E")
			{
				card.style.setProperty('--frame-color', '#ff3b3b');
				card.style.setProperty('--rarity-text-color', '#ff6b6b');
			}
			else if (data.rarity == "A")
			{
				card.style.setProperty('--frame-color', '#b026ff');
				card.style.setProperty('--rarity-text-color', '#b026ff');
			}
			else if (data.rarity == "P")
			{
				card.style.setProperty('--frame-color', '#00aaff');
				card.style.setProperty('--rarity-text-color', '#66d9ff');
			}
			else if (data.rarity == "D")
			{
				card.style.setProperty('--frame-color', '#d2a679');
				card.style.setProperty('--rarity-text-color', '#9e9e9e');
			}
			else if (data.rarity == "T")
			{
				card.style.setProperty('--frame-color', '#8b5a2b');
				card.style.setProperty('--rarity-text-color', '#c49a6c');
			}

			
		
			
			
			
			
			card.style.display = "block";
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
				document.querySelector('.collection_fake_card').style.display = "none";
            }
        });


        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.collection_name_modal').forEach(card => {
                card.style.cursor = 'pointer';
				let fake_card = document.querySelector('.collection_fake_card')
				let id = card.dataset.id;
                card.addEventListener('click', function () {
                    openCardModal(fake_card, id);
                });
            });
        });
