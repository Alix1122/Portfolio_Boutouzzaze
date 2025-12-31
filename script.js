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

/* ------------------------------------------- */

const filters = document.querySelectorAll(".filter");
const imageItems = document.querySelectorAll(".box");

// Ajouter des styles CSS pour l'animation
const style = document.createElement("style");
style.textContent = `
    .portfolio .box {
        transition: all 0.4s ease;
        opacity: 1;
        transform: scale(1);
    }
    .portfolio .box.hidden {
        opacity: 0;
        transform: scale(0.8);
        pointer-events: none;
        position: absolute;
        height: 0;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        // 1. Gestion de la classe active
        filters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");

        // 2. Récupérer la valeur du filtre
        const filterValue = filter.getAttribute("data-filter");

        // 3. Filtrer les images
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

// Initialiser
filters[0].click();

//* ----------------------------------------- *//

// Mini-script pour feedback visuel seulement
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitBtn = document.querySelector('button[type="submit"]');

    // Feedback au focus
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.background = "rgba(74, 108, 247, 0.05)";
        });

        input.addEventListener("blur", function () {
            this.style.background = "";
        });
    });

    // Animation du bouton au clic
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

document.getElementById('sheetmonkeyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    // Afficher un indicateur de chargement
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    
    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    try {
        // Envoyer les données à SheetMonkey
        const response = await fetch('https://api.sheetmonkey.io/form/874kfJJjYMLBy2WMgQGjRu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Afficher un message rapide
            alert('Message envoyé avec succès!');
            
            // Rediriger vers l'accueil
            window.location.href = "/"; // ou "index.html"
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        alert('Erreur: ' + error.message);
        button.innerHTML = originalText;
        button.disabled = false;
    }
});