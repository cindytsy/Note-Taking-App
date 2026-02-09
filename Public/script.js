let token = localStorage.getItem('token') || '';

// Register function
async function register() {
  const username = document.getElementById('regUsername')?.value;
  const password = document.getElementById('regPassword')?.value;

  if (!username || !password) return alert('Please fill in all fields');

  const res = await fetch('/api/notes/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({ username, password })
});

  const data = await res.json();

  if (data.userId) {
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
  } else {
    alert(JSON.stringify(data));
  }
}

// ------------------------
// Login function
// ------------------------
async function login() {
  const username = document.getElementById('loginUsername')?.value;
  const password = document.getElementById('loginPassword')?.value;

  if (!username || !password) return alert('Please fill in all fields');

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.token) {
    token = data.token;
    localStorage.setItem('token', token);
    window.location.href = 'index.html';
  } else {
    alert(JSON.stringify(data));
  }
}

// ------------------------
// Logout function
// ------------------------
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// ------------------------
// Get notes
// ------------------------
async function getNotes() {
  if (!token) return window.location.href = 'login.html';

  const res = await fetch('/api/notes', {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const notes = await res.json();
  const notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = '';

  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <strong>${note.title}</strong>
      <button onclick="deleteNote('${note._id}')">Delete</button><br>
      <em>${new Date(note.date).toLocaleString()}</em>
      <p>${note.content}</p>
    `;
    notesDiv.appendChild(div);
  });
}

// ------------------------
// Create note
// ------------------------
async function createNote() {
  const title = document.getElementById('noteTitle').value;
  const content = document.getElementById('noteContent').value;

  if (!title || !content) return alert('Fill in title and content');

  await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ title, content })
  });

  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';
  getNotes();
}

// ------------------------
// Delete note
// ------------------------
async function deleteNote(id) {
  await fetch('/api/notes/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  getNotes();
}

// ------------------------
// Auto-load notes if on index.html
// ------------------------
if (window.location.pathname.includes('index.html')) {
  if (!token) {
    window.location.href = 'login.html';
  } else {
    getNotes();
  }
}
