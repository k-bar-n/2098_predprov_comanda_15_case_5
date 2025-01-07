function loadAllPurchasesForReport() {
    const allPurchasePlansReports = document.getElementById("all_purchase_plans_reports");
    const errorMessage = document.getElementById('error-message-reports');

    fetch('/dashboard/get_all_purchases_for_report')
        .then((response) => response.json())
        .then((data) => {
            allPurchasePlansReports.innerHTML = "";
            const table = document.createElement('table');
            table.classList.add('report-table');

            // Заголовки таблицы
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            ['ID', 'Inventory ID', 'Количество', 'Цена', 'Поставщик'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Тело таблицы
            const tbody = document.createElement('tbody');
            data.forEach(purchase => {
                const row = document.createElement('tr');
                ['id', 'inventory_id', 'quantity', 'price', 'supplier'].forEach(key => {
                    const td = document.createElement('td');
                    td.textContent = purchase[key];
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);


            allPurchasePlansReports.appendChild(table);
        })
        .catch((error) => {
            console.error("Ошибка при загрузке отчета: ", error);
            showErrorMessage(
                'Произошла ошибка при загрузке данных',
                errorMessage
            );
        });
}