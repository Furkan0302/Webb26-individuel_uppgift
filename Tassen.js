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