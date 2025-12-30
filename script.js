const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".content-section");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });
        tab.classList.add("active");

        sections.forEach((content) => {
            content.classList.remove("active");
        });
        sections[index].classList.add("active");
    });
});
