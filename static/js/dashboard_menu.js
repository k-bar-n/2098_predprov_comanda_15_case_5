function loadContent(menu) {
    const buttons = document.querySelectorAll('.dashboard-button');
    buttons.forEach(button => button.classList.remove('active'));
    const activeButton = document.querySelector(`.dashboard-button[onclick="loadContent('${menu}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    window.location.href = `/dashboard?menu=${menu}`;
}