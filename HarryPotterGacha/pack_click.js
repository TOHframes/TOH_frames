TOTAL_NUMBER_OF_CARDS = 25869;


let num;
let whole_card ;
let url;
let title;
let description;
let atk;
let def;
let rarity;
let image_url;
let cardData;


cards_you_got.style.display = "none";	

packWrapper.addEventListener('click', function () {
	// Zapobiegamy wielokrotnemu klikaniu podczas animacji
	if (packWrapper.classList.contains('opening')) return;
	packWrapper.classList.add('opening');

	// 1. Natychmiast resetujemy skalę hovera
	packWrapper.style.transform = 'scale(1)';

	// 2. Ukrywamy pełną paczkę
	fullImg.style.transition = 'opacity 0.3s ease';
	fullImg.style.opacity = '0';
	packWrapper.classList.add("no-shadow");

	// 3. Tworzymy kontener na połówki
	const split = document.createElement('div');
	split.className = 'split-pack';

	// Górna połówka (zamień nazwę pliku na swoją!)
	const topHalf = document.createElement('img');
	topHalf.src = 'pack-top.png';   
	topHalf.className = 'top-half';
	topHalf.alt = 'Górna część paczki';

	// Dolna połówka (zamień nazwę pliku na swoją!)
	const bottomHalf = document.createElement('img');
	bottomHalf.src = 'pack-bottom.png'; 
	bottomHalf.className = 'bottom-half';
	bottomHalf.alt = 'Dolna część paczki';

	split.appendChild(topHalf);
	split.appendChild(bottomHalf);
	packWrapper.appendChild(split);

	// 4. Uruchamiamy animację rozerwania
	setTimeout(() => {
		topHalf.style.transform = 'translateY(-140px) rotate(12deg)';
		bottomHalf.style.transform = 'translateY(140px)';
	}, 80);

	// 5. Po zakończeniu animacji – obie połówki znikają
	setTimeout(() => {
		split.classList.add('fade-out');
		randomizeCard();
		packWrapper.style.display = "none";
		cards_you_got.style.display = "flex";
		// Usuwamy połówki po zaniknięciu
		setTimeout(() => {
			if (split.parentNode) split.parentNode.removeChild(split);

			// Opcjonalnie: zostawiamy paczkę ukrytą (gacha jednorazowa)
			// fullImg.style.opacity = '1'; // odkomentuj jeśli chcesz przywrócić paczkę

			packWrapper.classList.remove('opening');
		}, 700);
	}, 1300); // 1200ms animacja + 100ms zapasu
});
	
	
	
	
	
	
	
function randomizeCard() {

	all_cards_you_got.forEach(card => {

		num = Math.floor(Math.random() * TOTAL_NUMBER_OF_CARDS) + 1;
		//O E A P D T
		whole_card = harryPotterData[num];
		card.querySelector('.rarity').textContent = whole_card.rarity;
		card.querySelector('.name').textContent = whole_card.title;
		card.querySelector('.description').textContent = whole_card.description;
		card.querySelectorAll('.stat .value')[0].textContent = whole_card.atk;
		card.querySelectorAll('.stat .value')[1].textContent = whole_card.def;
		card.dataset.wiki = whole_card.url;
		card.querySelector('.artwork img').style.display = "inline";
		card.querySelector('.artwork span').style.display = "inline";
		card.querySelector('.artwork span').textContent = "";
		
		if (whole_card.image_url !="")
		{
			card.querySelector('.artwork img').src = whole_card.image_url;
			card.querySelector('.artwork span').style.display = "none";
		}
		else
		{
			card.querySelector('.artwork img').style.display = "none";
			card.querySelector('.artwork span').textContent = whole_card.title;
		}
		
		if (whole_card.rarity == "O")
		{
			card.style.setProperty('--frame-color', '#ffd700');
			card.style.setProperty('--rarity-text-color', '#ffd700');
		}
		else if (whole_card.rarity == "E")
		{
			card.style.setProperty('--frame-color', '#ff3b3b');
			card.style.setProperty('--rarity-text-color', '#ff6b6b');
		}
		else if (whole_card.rarity == "A")
		{
			card.style.setProperty('--frame-color', '#b026ff');
			card.style.setProperty('--rarity-text-color', '#b026ff');
		}
		else if (whole_card.rarity == "P")
		{
			card.style.setProperty('--frame-color', '#00aaff');
			card.style.setProperty('--rarity-text-color', '#66d9ff');
		}
		else if (whole_card.rarity == "D")
		{
			card.style.setProperty('--frame-color', '#d2a679');
			card.style.setProperty('--rarity-text-color', '#9e9e9e');
		}
		else if (whole_card.rarity == "T")
		{
			card.style.setProperty('--frame-color', '#8b5a2b');
			card.style.setProperty('--rarity-text-color', '#c49a6c');
		}

		
		
		
		
		
		
		let data = localStorage.getItem(num);

		if (data !== null) {
			let parsed = JSON.parse(data);
			parsed.how_many = parsed.how_many + 1;
			localStorage.setItem(num, JSON.stringify(parsed));

		}
		else
		{
			cardData = {
				id: num,
				name: whole_card.title,
				rarity: whole_card.rarity,
				image: whole_card.image_url,
				description: whole_card.description,
				atk: whole_card.atk,
				def: whole_card.def,
				wiki: whole_card.url,
				how_many: 1
			};
			localStorage.setItem(num, JSON.stringify(cardData));
		}



	});
}	
	
	
	
	