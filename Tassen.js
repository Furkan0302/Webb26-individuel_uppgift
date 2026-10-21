function uppdateraKlockaOchStatus() {
    const nu = new Date();

    const timmar = String(nu.getHours()).padStart(2, '0');
    const minuter = String(nu.getMinutes()).padStart(2, '0');
    const sekunder = String(nu.getSeconds()).padStart(2, '0');
    
    const klockText = `${timmar}:${minuter}:${sekunder}`;
    document.querySelector("#live-klocka").textContent = klockText;

    const alternativ = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const datumText = nu.toLocaleDateString('sv-SE', alternativ);
   
    document.querySelector("#live-datum").textContent = datumText.charAt(0).toUpperCase() + datumText.slice(1);

    const veckodag = nu.getDay(); 
    const nuvarandeTimme = nu.getHours();

    let arOppet = false;

    if (veckodag >= 1 && veckodag <= 5) {
        if (nuvarandeTimme >= 7 && nuvarandeTimme < 18) {
            arOppet = true;
        }
    } else if (veckodag === 6) {
        if (nuvarandeTimme >= 9 && nuvarandeTimme < 14) {
            arOppet = true;
        }
    }

    const statusIndicator = document.querySelector("#oppet-indicator");
    const statusText = document.querySelector("#status-text");

    if (arOppet) {
        statusText.textContent = "Öppet just nu";
        statusIndicator.className = "status-tag oppet";
    } else {
        statusText.textContent = "Stängt just nu";
        statusIndicator.className = "status-tag stangt";
    }
}

uppdateraKlockaOchStatus();
setInterval(uppdateraKlockaOchStatus, 1000);

const omdomen = [
    { text: "Tassen är fantastiskt! Älskar att vara här.", forfattare: "– Anna & Buster" },
    { text: "Proffsig personal och superfin utegård. Kan varmt rekommenderas!", forfattare: "– Marcus G." },
    { text: "Tryggt och enkelt. Det känns alltid bra att kunna vara med hundarna Pelle och Nina.", forfattare: "– Sofia & Bella" },
    { text: "Bästa hunddagiset i stan!.", forfattare: "– Johan K." },
    { text: "Fantastisk service och underbar personal. 5 av 5 stjärnor!", forfattare: "– Carina M." }
];

let senasteIndex = -1; 

function visaSlumpatOmdome() {
    let nyttIndex;
    
    do {
        nyttIndex = Math.floor(Math.random() * omdomen.length);
    } while (nyttIndex === senasteIndex && omdomen.length > 1);

    senasteIndex = nyttIndex;
    const valtoOmdome = omdomen[nyttIndex];

    const textEl = document.querySelector("#omdome-text");
    const forfattareEl = document.querySelector("#omdome-forfattare");

    if (textEl && forfattareEl) {
        textEl.textContent = `"${valtoOmdome.text}"`;
        forfattareEl.textContent = valtoOmdome.forfattare;
    }
}

const omdomeBtn = document.querySelector("#nytt-omdome-btn");
if (omdomeBtn) {
    omdomeBtn.addEventListener("click", visaSlumpatOmdome);
    visaSlumpatOmdome();
}