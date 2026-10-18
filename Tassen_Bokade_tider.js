class Bokningslista {
    constructor() {
        // Läs in från localStorage vid start eller skapa tom array
        this.bokningar = JSON.parse(localStorage.getItem("tassenBokningar")) || [];
    }

    laggTill(hund, typ, datum) {
        const nyBokning = {
            id: Date.now(),
            hund: hund,
            typ: typ,
            datum: datum
        };
        this.bokningar.push(nyBokning);
        this.spara();
    }

    taBort(id) {
        this.bokningar = this.bokningar.filter(b => b.id !== id);
        this.spara();
    }

    spara() {
        localStorage.setItem("tassenBokningar", JSON.stringify(this.bokningar));
    }
}

// Skapa instans av klassen med 'new'
const minBokningshanterare = new Bokningslista();

// === RENDERINGSFUNKTION ===
function renderaBokningar() {
    const listaEl = document.querySelector("#boknings-lista");
    if (!listaEl) return;

    listaEl.innerHTML = "";

    if (minBokningshanterare.bokningar.length === 0) {
        listaEl.innerHTML = "<li><em>Inga sparade bokningar ännu.</em></li>";
        return;
    }

    minBokningshanterare.bokningar.forEach(b => {
        const li = document.createElement("li");
        li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #ddd;";
        li.innerHTML = `
            <span><strong>${b.hund}</strong> (${b.typ}) - ${b.datum}</span>
            <button class="ta-bort-btn" data-id="${b.id}" style="background:#dc3545; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">Avboka</button>
        `;
        listaEl.appendChild(li);
    });
}

// === DEL 1: ÖPPET JUST NU & KLOCKA ===
function uppdateraKlocka() {
    const statusEl = document.querySelector("#oppet-status");
    if (!statusEl) return;

    const nu = new Date();
    const timmar = String(nu.getHours()).padStart(2, '0');
    const minuter = String(nu.getMinutes()).padStart(2, '0');
    const sekunder = String(nu.getSeconds()).padStart(2, '0');
    const dag = nu.getDay(); // 0 = söndag, 1 = måndag...

    let statusText = "Stängt just nu";
    if (dag >= 1 && dag <= 5 && nu.getHours() >= 7 && nu.getHours() < 18) {
        statusText = "Öppet just nu";
    } else if (dag === 6 && nu.getHours() >= 9 && nu.getHours() < 14) {
        statusText = "Öppet just nu";
    }

    statusEl.textContent = `Klockan är ${timmar}:${minuter}:${sekunder} – ${statusText}`;
}

// === DOM CONTENT LOADED ===
document.addEventListener("DOMContentLoaded", () => {
    // Starta klockan
    uppdateraKlocka();
    setInterval(uppdateraKlocka, 1000);

    // Rendera sparade bokningar vid start
    renderaBokningar();

    const hundGalleriet = document.querySelector("#hund-galleriet");
    const hundNamnInput = document.querySelector("#hund-namn");
    const bokningsForm = document.querySelector("#boknings-form");
    const listaEl = document.querySelector("#boknings-lista");

    // 1. Klicka på hund i galleriet
    if (hundGalleriet) {
        hundGalleriet.addEventListener("click", (e) => {
            if (e.target.classList.contains("boka-hund-btn")) {
                const kort = e.target.closest(".hund-kort");
                if (kort && hundNamnInput) {
                    hundNamnInput.value = kort.dataset.hund;
                    document.querySelector("#boka").scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    }

    // 2. Skicka formulär & spara i localStorage via klassen
    if (bokningsForm) {
        bokningsForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const hund = hundNamnInput.value.trim();
            const typ = document.querySelector("#boknings-typ").value;
            const datum = document.querySelector("#boknings-datum").value;

            if (hund && typ && datum) {
                minBokningshanterare.laggTill(hund, typ, datum);
                renderaBokningar();
                bokningsForm.reset();
            }
        });
    }

    // 3. Ta bort bokning (Event Delegation)
    if (listaEl) {
        listaEl.addEventListener("click", (e) => {
            if (e.target.classList.contains("ta-bort-btn")) {
                const id = Number(e.target.dataset.id);
                minBokningshanterare.taBort(id);
                renderaBokningar();
            }
        });
    }
});