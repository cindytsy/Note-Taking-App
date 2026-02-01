const token = localStorage.getItem('token');

async function addNote() {
  await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value
    })
  });
  loadNotes();
}
