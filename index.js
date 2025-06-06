const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = {};
let userIdCounter = 1;

function getUserById(id) {
  return Object.values(users).find(u => u.id === id);
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (users[username]) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  users[username] = {
    id: userIdCounter++,
    username,
    password,
    likes: new Set(),
    matches: new Set(),
    dislikes: new Set(),
  };
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  res.json({ success: true, id: user.id });
});

app.get('/user/:id/next', (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  const otherUsers = Object.values(users).filter(u => u.id !== user.id && !user.likes.has(u.id) && !user.dislikes.has(u.id));
  if (otherUsers.length === 0) return res.json({ user: null });
  const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
  res.json({ user: { id: randomUser.id, username: randomUser.username } });
});

app.post('/user/:id/swipe', (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { targetId, like } = req.body;
  const targetUser = getUserById(targetId);
  if (!targetUser) return res.status(400).json({ error: 'Target user not found' });
  if (like) {
    user.likes.add(targetId);
    if (targetUser.likes.has(user.id)) {
      user.matches.add(targetId);
      targetUser.matches.add(user.id);
    }
  } else {
    user.dislikes.add(targetId);
  }
  res.json({ success: true });
});

app.get('/user/:id/matches', (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  const matches = Array.from(user.matches).map(id => getUserById(id)).filter(Boolean).map(u => ({ id: u.id, username: u.username }));
  res.json({ matches });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
