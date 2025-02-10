function initDashboard() {
  window.addEventListener("popstate", (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get("menu");
    const subpage = urlParams.get("subpage");
    const subsubpage = urlParams.get("subsubpage");
    loadContent(menu, subpage, subsubpage, true);
  });
  const urlParams = new URLSearchParams(window.location.search);
  const menu = urlParams.get("menu");
  const subpage = urlParams.get("subpage");
  const subsubpage = urlParams.get("subsubpage");

  loadContent(menu, subpage, subsubpage, true);

  const role = getCookie("session_role");

  function initMenu(settings) {
    const menuItems = document.querySelectorAll(".dashboard-menu-item");

    menuItems.forEach((menuItem) => {
      const button = menuItem.querySelector(".dashboard-button");
      const dropdown = menuItem.querySelector(".dropdown-content");
      const menu = button.getAttribute("data-menu");

      button.addEventListener("click", function (event) {
        event.preventDefault();
        if (dropdown) {
          if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
          } else {
            dropdown.style.display = "block";
          }
        } else {
          loadSubpage(menu, null);
        }
      });

      if (dropdown) {
        dropdown.querySelectorAll("a").forEach((subpageButton) => {
          subpageButton.addEventListener("click", function (event) {
            const subpage = this.getAttribute("data-subpage");
            const menu = this.getAttribute("data-menu");
            event.preventDefault();
            loadSubpage(menu, subpage);
          });
        });
      }
    });
  }
  fetch("/data/user_pages_settings.json")
    .then((response) => response.json())
    .then((settings) => {
      initMenu(settings);
    })
    .catch((error) =>
      console.error("Ошибка при загрузке настроек страниц:", error)
    );
}

function loadContent(
  menu,
  subpage = null,
  subsubpage = null,
  firstLoad = false
) {
  const contentDiv = document.querySelector(".content");
  const subsubpageContent = document.getElementById("subsubpage-content");

  if (!firstLoad) {
    window.history.pushState(
      { menu, subpage, subsubpage },
      "",
      `/dashboard?menu=${menu}${subpage ? `&subpage=${subpage}` : ""}${
        subsubpage ? `&subsubpage=${subsubpage}` : ""
      }`
    );
  }

  if (menu == null) {
    return;
  }

  let contentToShow;
  if (menu === "main") {
    contentToShow = "";
  } else if (menu === "inventory_management") {
    if (subpage === "all_inventory") {
      contentToShow = loadAllInventory();
    } else if (subpage === "inventory_add_edit") {
      contentToShow = initInventoryAddEdit();
    }
    // ... (другие пункты меню)
  } else if (menu === "inventory_assignment") {
    if (subpage === "all_assignments") {
      contentToShow = loadAllAssignments();
    } else if (subpage === "inventory_assignment_create") {
      contentToShow = initInventoryAssignmentCreate();
    }
  } else if (menu === "purchases_management") {
    if (subpage === "all_purchase_plans") {
      contentToShow = loadAllPurchases();
    } else if (subpage === "purchases_add_edit") {
      contentToShow = initPurchasesAddEdit();
    }
  } else if (menu === "reports") {
    if (subpage === "all_inventory") {
      contentToShow = loadAllInventoryForReport();
    } else if (subpage === "all_assignments") {
      contentToShow = loadAllAssignmentsForReport();
    } else if (subpage === "all_purchases") {
      contentToShow = loadAllPurchasesForReport();
    }
  } else if (menu === "requests") {
    if (subpage === "all_requests") {
      contentToShow = loadAllRequests();
    } else if (subpage === "request_create") {
      contentToShow = initRequestCreate();
    }
  }

  // ... other content loading logic

  if (subsubpageContent) {
    // Если div для subsubpage существует, вставляем туда контент
    subsubpageContent.innerHTML = contentToShow;
  } else {
    // Иначе - в основной content div
    contentDiv.innerHTML = contentToShow;
  }
}
function loadSubpage(menu, subpage) {
  loadContent(menu, subpage); // Вызываем loadContent из dashboard.js
  const buttons = document.querySelectorAll(".dashboard-button");
  buttons.forEach((btn) => btn.classList.remove("active"));
  // Find the clicked button based on data-menu and data-subpage and make it active
  document
    .querySelector(
      `[data-menu="${menu}"]${subpage ? `[data-subpage="${subpage}"]` : ""}`
    )
    .classList.add("active");
}
document.addEventListener("DOMContentLoaded", initDashboard);
