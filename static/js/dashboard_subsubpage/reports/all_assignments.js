function loadAllAssignmentsForReport() {
    const allAssignmentsReports = document.getElementById("all_assignments_reports");
    const errorMessage = document.getElementById('error-message-reports');

    fetch('/dashboard/get_all_assignments_for_report')
        .then((response) => response.json())
        .then((data) => {
            allAssignmentsReports.innerHTML = "";
            const table = document.createElement('table');
            table.classList.add('report-table');

            // Заголовки таблицы
            let thead = document.createElement('thead');
            let headerRow = document.createElement('tr');
            ['ID', 'User ID', 'Inventory ID', 'Количество', 'Дата назначения'].forEach(text => {
                let th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Тело таблицы
            let tbody = document.createElement('tbody');
            data.forEach(assignment => {
                let row = document.createElement('tr');
                ['id', 'user_id', 'inventory_id', 'quantity_assigned', 'assignment_date'].forEach(key => {
                    let td = document.createElement('td');
                    td.textContent = assignment[key];
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            allAssignmentsReports.appendChild(table);


        })
        .catch((error) => {
            console.error("Ошибка при загрузке отчета: ", error);
            showErrorMessage(
                'Произошла ошибка при загрузке данных',
                errorMessage
            );
        });
}