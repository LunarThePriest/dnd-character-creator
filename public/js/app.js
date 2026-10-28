const form = document.querySelector("#form");
form.addEventListener("submit", submitForm);

const initData = [
  ["Agnes", "Human", "Rogue", 5],
  ["Ivor", "Human", "Druid", 2],
  ["Sara", "Human", "Monk", 2]
];

const characters = []


class Character {
  constructor(id, charName, charRace, charClass, charLevel) {
    this.id = id;
    this.name = charName.trim();
    this.race = charRace;
    this.class = charClass;
    this.level = Number(charLevel);
  }

  isValidLevel() {
    return this.level >= 1 && this.level <= 20;
  }
}

function initCharacters() {
  const characters = initData.map(
    (charData, index) => new Character(index, ...charData)
  );
  console.log(characters);
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
  renderTable();
}

initCharacters();
renderTable();
