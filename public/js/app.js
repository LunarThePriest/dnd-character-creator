const form = document.querySelector("#form");
form.addEventListener("submit", submitForm);


let characters = []


function renderTable() {
  const table = document.querySelector("#my-characters");
  table.innerHTML = "";

  const thead = document.createElement("thead");
  const titleRow = document.createElement("tr");
  ["Character Name", "Race", "Class", "Level"].forEach(function (text) {
    const th = document.createElement("th");
    th.textContent = text;
    titleRow.append(th);
  });
  thead.append(titleRow);

  const tbody = document.createElement("tbody");

  characters.forEach(function (char) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = char.name;

    const raceCell = document.createElement("td");
    raceCell.textContent = char.race;

    const classCell = document.createElement("td");
    classCell.textContent = char.class;

    const levelCell = document.createElement("td");
    levelCell.textContent = char.level;

    row.append(nameCell, raceCell, classCell, levelCell);
    tbody.append(row);
  });

  table.append(thead, tbody);
}


async function submitForm(event) {
  event.preventDefault();

  const character = {
    id: characters.length,
    name: document.querySelector("#char-name").value,
    race: document.querySelector("#char-race").value,
    charclass: document.querySelector("#char-class").value,
    level: document.querySelector("#char-level").value
  }
  

  const message = document.querySelector("#message");
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character)
    });

    if (!response.ok) {
      const error = await response.json();
      message.textContent = error.error;
      return;
    }

    const created = await response.json();
    characters.push(created);
    renderTable();
    form.reset();
    message.textContent = 'Запис додано';
  } catch (error) {
    message.textContent = 'Сервер недоступний';
  }
}

async function loadItems() {
  try {
    const response = await fetch('/api/items');
    characters = await response.json();
    renderTable();
  } catch (error) {
    message.textContent = 'Сервер недоступний';
  }
}

loadItems();
