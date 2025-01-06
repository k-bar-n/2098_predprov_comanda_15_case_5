function loadSubContent(menu) {
    const buttons = document.querySelectorAll(".dashboard-button");
    buttons.forEach((button) => button.classList.remove("active"));
    const activeButton = document.querySelector(
        `.dashboard-button[onclick="loadSubContent('${menu}')"]`
    );
    if (activeButton) {
        activeButton.classList.add("active");
    }

    fetch("/dashboard?menu=" + menu)
        .then((response) => response.text())
        .then((html) => {
            document.querySelector(".content").innerHTML = html
                .split('<div class="content">')[1]
                .split("</div>")[0];
        });
}

function loadSubSubContent(menu, subpage) {
    const buttons = document.querySelectorAll(".dashboard-button");
    buttons.forEach((button) => button.classList.remove("active"));
    const activeButton = document.querySelector(
        `.dashboard-button[onclick="loadSubContent('${menu}')"]`
    );
    if (activeButton) {
        activeButton.classList.add("active");
    }

    console.log(`Загрузка подстраницы: menu=${menu}, subpage=${subpage}`);
    fetch(`/dashboard/load_page?menu=${menu}&subpage=${subpage}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            document.querySelector(".content").innerHTML = html;
        })
        .catch((error) => {
            console.error("Ошибка загрузки подстраницы:", error);
        });
}