const API_URL = 'https://example.com/api/people';

function loadData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById('data');
      div.innerHTML = '';
      let sum = 0, max = 0;

      data.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}`;
        div.appendChild(p);
        sum += parseInt(item.height);
        if (item.height > max) max = item.height;
      });

      const avg = (sum / data.length).toFixed(2);
      document.getElementById('stats').innerText = `Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`;
    });
}

function validateInput(name, height) {
  if (!name || !height) return "Nem lehet üres!";
  if (name.length > 30 || height.length > 30) return "Max 30 karakter!";
  return null;
}

function createData() {
  const name = document.getElementById('create-name').value;
  const height = document.getElementById('create-height').value;
  const error = validateInput(name, height);
  const msg = document.getElementById('create-msg');

  if (error) return msg.innerText = error;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, height })
  })
    .then(res => res.ok ? "Sikeres hozzáadás!" : "Hiba történt.")
    .then(text => msg.innerText = text);
}

function getDataForId() {
  const id = document.getElementById('update-id').value;
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('update-name').value = data.name;
      document.getElementById('update-height').value = data.height;
    });
}

function updateData() {
  const id = document.getElementById('update-id').value;
  const name = document.getElementById('update-name').value;
  const height = document.getElementById('update-height').value;
  const error = validateInput(name, height);
  const msg = document.getElementById('update-msg');

  if (error) return msg.innerText = error;

  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, height })
  })
    .then(res => res.ok ? "Sikeres frissítés!" : "Hiba történt.")
    .then(text => msg.innerText = text);
}

function deleteData() {
  const id = document.getElementById('delete-id').value;
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(res => res.ok ? "Sikeres törlés!" : "Hiba történt.")
    .then(text => document.getElementById('delete-msg').innerText = text);
}

