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
    fetch(`/dashboard/load_page?menu=${menu}&subpage=${subpage}`)
        .then((response) => response.text())
        .then((html) => {
            document.querySelector(".content").innerHTML = html;
        });
}