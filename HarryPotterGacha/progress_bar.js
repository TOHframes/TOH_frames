function getCardsFromStorage() {
	const cards = [];

	for (let i = 0; i < localStorage.length; i++) {
		try {
			const data = JSON.parse(localStorage.getItem(localStorage.key(i)));

			if (data && typeof data === "object") {
				cards.push(data);
			}
		} catch (e) {}
	}

	return cards;
}

function getUniqueCards(cards) {
	const seen = new Set();

	return cards.filter(card => {
		if (seen.has(card.name)) return false;
		seen.add(card.name);
		return true;
	});
}

function initProgress() {
	const cards = getCardsFromStorage();
	const unique = getUniqueCards(cards);

	const current = unique.length;
	const max = 25869;

	document.getElementById("progressBar").value = current;
	document.getElementById("progressBar").max = max;
	document.getElementById("progressText").textContent = `${current} / ${max}`;
}

// tylko raz po załadowaniu strony
window.addEventListener("DOMContentLoaded", initProgress);