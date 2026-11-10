const form = document.querySelector("#form");
form.addEventListener("submit", submitForm);


const characters = [
  {
    id: 1,
    name: "Agnes",
    race: "Human",
    class: "Rogue",
    level: 5
  },
  {
    id: 2,
    name: "Ivor",
    race: "Human",
    class: "Druid",
    level: 2
  },
  {
    id: 3,
    name: "Sara",
    race: "Human",
    class: "Monk",
    level: 2
  }
]


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


function submitForm(event) {
  event.preventDefault();

  const character = {
    id: characters.length,
    name: document.querySelector("#char-name").value,
    race: document.querySelector("#char-race").value,
    class: document.querySelector("#char-class").value,
    level: document.querySelector("#char-level").value
  }
  
  if (character.level < 1 || character.level > 20) {
    document.querySelector("#message").textContent =
      "Choose only from 1 to 20.";
    return;
  }

  characters.push(character);
  form.reset();
  renderTable();
}


renderTable();
