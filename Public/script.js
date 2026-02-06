const API_URL = "/api/notes";

const notesList = document.getElementById("notesList");
const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

// Load notes on page load
fetchNotes();

async function fetchNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();
  renderNotes(notes);
}

function renderNotes(notes) {
  notesList.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement("li");
    li.className = "note";

    li.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.content}</p>
      <div class="note-actions">
        <button onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
        <button onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `;

    notesList.appendChild(li);
  });
}

// Add note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newNote = {
    title: titleInput.value,
    content: contentInput.value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote)
  });

  noteForm.reset();
  fetchNotes();
});

// Edit note
async function editNote(id, oldTitle, oldContent) {
  const title = prompt("Edit title:", oldTitle);
  const content = prompt("Edit content:", oldContent);

  if (!title || !content) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  fetchNotes();
}

// Delete note
async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchNotes();
}
