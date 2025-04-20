
    function validateInputs(name, age, city, email) {
      let isValid = true;
      document.querySelectorAll('.error').forEach(el => el.textContent = '');

      if (!name || name.length < 2 || name.length > 20) {
        document.getElementById('error-name').textContent = 'Név 2-20 karakter között!';
        isValid = false;
      }
      if (!age || isNaN(age) || age < 1 || age > 120) {
        document.getElementById('error-age').textContent = 'Adj meg valós kort (1-120)!';
        isValid = false;
      }
      if (!city || city.length < 2) {
        document.getElementById('error-city').textContent = 'Város megadása kötelező!';
        isValid = false;
      }
      if (!email.includes('@') || email.length < 5) {
        document.getElementById('error-email').textContent = 'Adj meg valós email címet!';
        isValid = false;
      }

      return isValid;
    }

    function addRow() {
      const name = document.getElementById('name').value.trim();
      const age = document.getElementById('age').value.trim();
      const city = document.getElementById('city').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!validateInputs(name, age, city, email)) return;

      const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
      const newRow = table.insertRow();

      newRow.insertCell(0).innerText = name;
      newRow.insertCell(1).innerText = age;
      newRow.insertCell(2).innerText = city;
      newRow.insertCell(3).innerText = email;
      const actionsCell = newRow.insertCell(4);
      actionsCell.innerHTML = `<button onclick="editRow(this)">✏️</button> 
                               <button onclick="deleteRow(this)">🗑️</button>`;

      
      ['name', 'age', 'city', 'email'].forEach(id => document.getElementById(id).value = '');
    }

    function deleteRow(btn) {
      const row = btn.closest('tr');
      row.remove();
    }

    function editRow(btn) {
      const row = btn.closest('tr');
      const cells = row.querySelectorAll('td');

      const name = prompt('Új név:', cells[0].innerText);
      const age = prompt('Új kor:', cells[1].innerText);
      const city = prompt('Új város:', cells[2].innerText);
      const email = prompt('Új email:', cells[3].innerText);

      if (!validateInputs(name, age, city, email)) return;

      cells[0].innerText = name;
      cells[1].innerText = age;
      cells[2].innerText = city;
      cells[3].innerText = email;
    }

    function sortTable(colIndex) {
      const table = document.getElementById("dataTable");
      const tbody = table.tBodies[0];
      const rows = Array.from(tbody.rows);

      const isAsc = table.getAttribute("data-sort-dir") !== "asc";
      table.setAttribute("data-sort-dir", isAsc ? "asc" : "desc");

      rows.sort((a, b) => {
        const cellA = a.cells[colIndex].innerText.toLowerCase();
        const cellB = b.cells[colIndex].innerText.toLowerCase();
        return isAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      });

      rows.forEach(row => tbody.appendChild(row));
    }

    function filterTable() {
      const input = document.getElementById("searchInput").value.toLowerCase();
      const rows = document.getElementById("dataTable").getElementsByTagName("tbody")[0].rows;

      for (let row of rows) {
        const text = Array.from(row.cells).slice(0, 4).map(td => td.textContent.toLowerCase()).join(" ");
        row.style.display = text.includes(input) ? "" : "none";
      }
    }

