let searchQuery = "";

let currentFilter = null;
	let currentSort = null;
	let sortDirection = 1; // 1 = asc, -1 = desc


function getRarityColor(rarity) {
	switch (rarity) {
		case "O": return "#ffd700";
		case "E": return "#ff6b6b";
		case "A": return "#b026ff";
		case "P": return "#66d9ff";
		case "D": return "#9e9e9e";
		case "T": return "#c49a6c";
		default: return "#e0e0e0";
	}
}



	function getCardsFromStorage() {
		const cards = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);

			try {
				const data = JSON.parse(localStorage.getItem(key));

				if (data && typeof data === "object") {
					cards.push(data);
				}
			} catch (e) {}
		}

		return cards;
	}

	function renderTable() {
		let cards = getCardsFromStorage();

		// FILTER
		if (currentFilter) {
			cards = cards.filter(c => c.rarity === currentFilter);
		}

		// SEARCH (*fraza*)
		if (searchQuery) {
			cards = cards.filter(c => 
				(c.name || "").toLowerCase().includes(searchQuery)
			);
		}

		// SORT
		if (currentSort) {
			cards.sort((a, b) => {
				let valA = a[currentSort];
				let valB = b[currentSort];

				if (currentSort === "atk" || currentSort === "def" || currentSort === "how_many"  || currentSort === "id") {
					return ((valA || 0) - (valB || 0)) * sortDirection;
				}

				return (valA || "").localeCompare(valB || "") * sortDirection;
			});
		}

		const tbody = document.getElementById("tableBody");
		tbody.innerHTML = "";

		cards.forEach(card => {
			const row = document.createElement("tr");

			const color = getRarityColor(card.rarity);

			row.style.color = color;

			row.innerHTML = `
				<td class="collection_name_modal" data-id="${card.id || 0}">${card.name || ""}</td>
				<td>${card.rarity || ""}</td>
				<td>${card.atk }</td>
				<td>${card.def}</td>
				<td>${card.how_many || 0}</td>
				<td>${card.id || 0}</td>
			`;

			tbody.appendChild(row);
		});
		
		
		document.querySelectorAll('.collection_name_modal').forEach(card => {
                card.style.cursor = 'pointer';
				let fake_card = document.querySelector('.collection_fake_card')
				let id = card.dataset.id;
                card.addEventListener('click', function () {
                    openCardModal(fake_card, id);
                });
            });
	}

	function toggleFilter(rarity) {
		if (currentFilter === rarity) {
			currentFilter = null;
		} else {
			currentFilter = rarity;
		}

		// update UI
		
		document.querySelectorAll("button[data-rarity]").forEach(btn => {
			btn.classList.toggle("active", btn.dataset.rarity === currentFilter);
		});

		renderTable();
	}

	function setSort(field) {
		if (currentSort === field) {
			sortDirection *= -1; // zmiana kierunku
		} else {
			currentSort = field;
			sortDirection = 1;
		}

		renderTable();
	}


document.getElementById("searchInput").addEventListener("input", function (e) {
	searchQuery = e.target.value.toLowerCase();
	renderTable();
});

	// init
	renderTable();