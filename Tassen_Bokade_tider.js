const hundGalleriet = document.querySelector("#hund-galleriet");
const valdHundInfo = document.querySelector("#vald-hund-info");
const form = document.getElementById("form");
const namnInput = document.getElementById("namn");
const typSelect = document.getElementById("boknings-typ");
const datumInput = document.getElementById("boknings-datum");
const fel = document.getElementById("fel");
const bekraftelse = document.getElementById("bekraftelse");
const upptagnaLista = document.getElementById("upptagna-tider-lista");

let valdHund = "";
const NYCKEL = "tassenBokningar";

let bokningar = laddaBokningar();

function laddaBokningar() {
    try {
        const data = JSON.parse(localStorage.getItem(NYCKEL));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function sparaBokningar() {
    localStorage.setItem(NYCKEL, JSON.stringify(bokningar));
}

if (hundGalleriet) {
    hundGalleriet.addEventListener("click", (e) => {
        if (e.target.classList.contains("boka-hund-btn")) {
            const kort = e.target.closest(".hund-kort");
            if (kort) {
                valdHund = kort.dataset.hund;
                valdHundInfo.textContent = `Vald hund: ${valdHund}`;
                visaUpptagnaDatum();
            }
        }
    });
}

function visaUpptagnaDatum() {
    if (!upptagnaLista) return;
    upptagnaLista.innerHTML = "";

    const hundBokningar = bokningar.filter(b => b.hund === valdHund);

    if (hundBokningar.length === 0) {
        upptagnaLista.innerHTML = "<li><em>Inga bokningar än för denna hund.</em></li>";
        return;
    }

    hundBokningar.forEach(b => {
        const originalIndex = bokningar.indexOf(b);

        const li = document.createElement("li");
        li.style.cssText = "background: #f4f4f4; padding: 8px; margin-top: 5px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;";
        
        li.innerHTML = `
            <span>📅 ${b.datum} (${b.typ}) – Bokad av ${b.namn}</span>
            <button class="ta-bort-btn" data-index="${originalIndex}" style="background-color: #d9534f; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: bold;">Avboka</button>
        `;

        upptagnaLista.appendChild(li);
    });
}

if (upptagnaLista) {
    upptagnaLista.addEventListener("click", (e) => {
        if (e.target.classList.contains("ta-bort-btn")) {
            const indexAttTaBort = parseInt(e.target.dataset.index);
            
            bokningar.splice(indexAttTaBort, 1);
            
            sparaBokningar();
            visaUpptagnaDatum(); 
            
            if (bekraftelse) {
                bekraftelse.textContent = "Bokningen har avbokats och tagits bort!";
                bekraftelse.style.color = "orange";
            }
        }
    });
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const namn = namnInput.value.trim();
        const typ = typSelect.value;
        const datum = datumInput.value;

        if (!valdHund) {
            fel.textContent = "Du måste välja en hund i galleriet först!";
            if (bekraftelse) bekraftelse.textContent = "";
            return;
        }

        const redanBokad = bokningar.some(b => b.hund === valdHund && b.datum === datum);
        if (redanBokad) {
            fel.textContent = `${valdHund} är redan bokad den ${datum}. Välj ett annat datum.`;
            if (bekraftelse) bekraftelse.textContent = "";
            return;
        }

        const nyBokning = {
            id: Date.now().toString(),
            hund: valdHund,
            namn: namn,
            typ: typ,
            datum: datum
        };

        bokningar.push(nyBokning);
        sparaBokningar();

        bekraftelse.textContent = `Tack ${namn}! Du har bokat ${valdHund} (${typ}) den ${datum}.`;
        bekraftelse.style.color = "green";
        fel.textContent = "";
        
        form.reset();
        valdHund = "";
        valdHundInfo.textContent = "Vald hund: Ingen vald ännu";
        visaUpptagnaDatum();
    });
}