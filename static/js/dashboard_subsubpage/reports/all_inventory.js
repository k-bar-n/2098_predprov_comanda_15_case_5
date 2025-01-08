function loadAllInventoryForReport() {
    const allInventoryReports = document.getElementById("all_inventory_reports");
    const errorMessage = document.getElementById('error-message-reports');
    if (!allInventoryReports) {
        console.error("Элемент с id 'all_inventory_reports' не найден.");
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/dashboard/get_all_inventory_for_report', false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            allInventoryReports.innerHTML = "";
            const data = JSON.parse(xhr.responseText);
            const table = document.createElement('table');
            table.classList.add('report-table');
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            ['ID', 'Название', 'Количество', 'Состояние'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            data.forEach(inventory => {
                const row = document.createElement('tr');
                ['id', 'name', 'quantity', 'state'].forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = inventory[key];
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            allInventoryReports.appendChild(table);
        } else {
            showErrorMessage('Произошла ошибка при загрузке данных', errorMessage);
        }
    };
    xhr.onerror = function () {
        showErrorMessage('Произошла ошибка при загрузке данных', errorMessage);
    };
    xhr.send();
}