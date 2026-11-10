import express from 'express';

const app = express();

app.use(express.json());
app.use(express.static('public'));

let items = [
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

let nextId = 4;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name, race, charclass, level } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: "Поле name є обов'язковим" });
  }

  if (!level || level < 1 || level > 20) {
    return res.status(400).json({ error: 'Рівень персонажа має бути від 1 до 20' });
  }

  const newItem = {
    id: nextId,
    name: name,
    race: race,
    class: charclass,
    level: level
  };

  nextId = nextId + 1;
  items.push(newItem);

  res.status(201).json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Запис не знайдено' });
  }

  items.splice(index, 1);
  res.json({ ok: true });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});
