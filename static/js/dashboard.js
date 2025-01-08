function initDashboard() {
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get('menu');
    const subpage = urlParams.get('subpage');

    let userPagesSettings = null;

    fetch('/data/user_pages_settings.json')
        .then(response => response.json())
        .then(settings => {
            userPagesSettings = settings;
            initMenu(menu, subpage, userPagesSettings);
            loadContent(menu, subpage, true);
        })
        .catch(error => {
            console.error("Ошибка при загрузке настроек страниц:", error);
            loadContent(null, null, true);
        });

    function initMenu(menuParam, subpageParam, settings) {
        const menuItems = document.querySelectorAll('.dashboard-menu-item');

        menuItems.forEach(menuItem => {
            const button = menuItem.querySelector('.dashboard-button');
            const dropdown = menuItem.querySelector('.dropdown-content');
            const menu = button.getAttribute('data-menu');


            if (dropdown) {
                button.addEventListener('click', function () {
                    document.querySelectorAll('.dropdown-content').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.style.display = 'none';
                        }
                    });

                    toggleSubmenu(dropdown);

                    const buttons = document.querySelectorAll(".dashboard-button");
                    buttons.forEach((btn) => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            }
        });

        function toggleSubmenu(dropdown) {
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            } else {
                dropdown.style.display = "block";
            }
        }
    }
}

function loadContent(menu, subpage = null, firstLoad = false) {
    const contentDiv = document.querySelector('.content');
    if (!firstLoad && menu == null) {
        return
    }
    let url = '/dashboard';
    if (menu) {
        url += `?menu=${menu}`;
        if (subpage) {
            url += `&subpage=${subpage}`;
        }
    }

    fetch(url)
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html.split('<div class="content">')[1].split('</div>')[0];

            if (menu) {
                if (menu === 'main') {
                    // ... (логика для главной страницы)
                } else if (menu === "inventory_management") {
                    if (subpage === "all_inventory") {
                        loadAllInventory();
                    } else if (subpage === "inventory_add_edit") {
                        initInventoryAddEdit();
                    }
                } else if (menu === "inventory_assignment") {
                    if (subpage === "all_assignments") {
                        loadAllAssignments();
                    } else if (subpage === "inventory_assignment_create") {
                        initInventoryAssignmentCreate();
                    }
                } else if (menu === "purchases_management") {
                    if (subpage === "all_purchase_plans") {
                        loadAllPurchases();
                    } else if (subpage === "purchases_add_edit") {
                        initPurchasesAddEdit();
                    }
                } else if (menu === "reports") {
                    if (subpage === "all_inventory") {
                        loadAllInventoryForReport();
                    } else if (subpage === "all_assignments") {
                        loadAllAssignmentsForReport();
                    } else if (subpage === "all_purchases") {
                        loadAllPurchasesForReport();
                    }
                } else if (menu === "requests") {
                    if (subpage === "all_requests") {
                        loadAllRequests();
                    } else if (subpage === "request_create") {
                        initRequestCreate();
                    }
                }
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке контента:", error);
            contentDiv.innerHTML = "<p>Ошибка при загрузке контента.</p>";
        });
}