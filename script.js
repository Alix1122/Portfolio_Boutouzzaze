const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".content-section");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
        e.preventDefault(); // ✅ Ajouté pour éviter le saut d'ancre

        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        sections.forEach((content) => content.classList.remove("active"));
        sections[index].classList.add("active");
    });
});

/* ------------------------------------------- */

const filters = document.querySelectorAll(".filter");
const imageItems = document.querySelectorAll(".portfolio .box"); // ✅ Plus spécifique

// Ajouter des styles CSS pour l'animation
const style = document.createElement("style");
style.textContent = `
    .portfolio .boxs {
        position: relative;
    }
    .portfolio .box {
        transition: all 0.4s ease;
        opacity: 1;
        transform: scale(1);
        display: block;
    }
    .portfolio .box.hidden {
        opacity: 0;
        transform: scale(0.8);
        display: none; /* ✅ Alternative plus fiable */
    }
`;
document.head.appendChild(style);

filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
        e.preventDefault(); // ✅ Empêche le rechargement de la page

        filters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");

        const filterValue = filter.getAttribute("data-filter");

        imageItems.forEach((item) => {
            const itemCategory = item.getAttribute("data-category");

            if (filterValue === "all" || itemCategory === filterValue) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

// ✅ Vérifier que filters existe avant d'appeler click
if (filters.length > 0) {
    filters[0].click();
}

//* ----------------------------------------- *//

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#sheetmonkeyForm"); // ✅ Plus spécifique
    if (!form) return; // ✅ Sécurité si le formulaire n'existe pas

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.background = "rgba(74, 108, 247, 0.05)";
        });

        input.addEventListener("blur", function () {
            this.style.background = "";
        });
    });

    submitBtn.addEventListener("click", function (e) {
        if (!form.checkValidity()) {
            this.style.animation = "shake 0.3s ease";
            setTimeout(() => {
                this.style.animation = "";
            }, 300);
        }
    });
});

//* ---------------------------- *//

const form = document.getElementById("sheetmonkeyForm");
if (form) {
    // ✅ Sécurité
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(
                "https://api.sheetmonkey.io/form/874kfJJjYMLBy2WMgQGjRu",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (response.ok) {
                alert("Message envoyé avec succès!");
                this.reset(); // ✅ Réinitialiser le formulaire
                window.location.href = "/";
            } else {
                throw new Error("Erreur lors de l'envoi");
            }
        } catch (error) {
            alert("Erreur: " + error.message);
            button.innerHTML = originalText;
            button.disabled = false;
        }
    });
}
