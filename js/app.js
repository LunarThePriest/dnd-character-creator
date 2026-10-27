const form = document.querySelector("#form");
form.addEventListener("submit", submitForm);

let characters = [
  {
    name: "Agnes",
    race: "Human",
    class: "Rogue",
    level: 5,
  },
  {
    name: "Ivor",
    race: "Human",
    class: "Druid",
    level: 2,
  },
  {
    name: "Sara",
    race: "Human",
    class: "Monk",
    level: 2,
  },
];

class Character {
  constructor(charName, charRace, charClass, charLevel) {
    this.name = charName.trim();
    this.race = charRace;
    this.class = charClass;
    this.level = Number(charLevel);
  }

  isValidLevel() {
    return this.level >= 1 && this.level <= 20;
  }
}

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

function updateTable(char) {
  const tbody = document.querySelector("#my-characters tbody");

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
}

function submitForm(event) {
  event.preventDefault();

  const character = new Character(
    document.querySelector("#char-name").value,
    document.querySelector("#char-race").value,
    document.querySelector("#char-class").value,
    document.querySelector("#char-level").value,
  );

  if (!character.isValidLevel()) {
    document.querySelector("#message").textContent =
      "Choose only from 1 to 20.";
    return;
  }

  characters.push(character);
  form.reset();
  updateTable(character);
}

renderTable();
