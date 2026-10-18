# Webb26-individuel_uppgift

# Hundpensionatet Tassen

En webbplats byggd för kundsidan **Hundpensionatet Tassen**. Sidan är utformad för att ge besökare snabb information om verksamheten, kontaktuppgifter samt erbjuda en enkel bokningsförfrågan för pensionatets hundar.

---

## Hur man kör projektet

1. Ladda ner eller klona alla filer till din dator.
2. Säkerställ att följande filstruktur finns i samma mapp:
   - `index.html` (Om oss / Huvudsida)
   - `boka.html` (Bokningssida med hundgalleri)
   - `kontakt.html` (Kontaktsida)
   - `Kontakta.css` (Gemensam stil och design)
   - `boka.js` (JavaScript för bokningsfunktionen)
   - Alla bildfiler för hundarna
3. Öppna `index.html` direkt i valfri webbläsare (t.ex. Chrome, Edge eller Firefox), eller kör projektet via **Live Server** i VS Code.

---

## Reflektion

### Vad som var svårast
Det svåraste i projektet var att få JavaScript-koden att interagera smidigt med DOM:en när användaren klickar i hundgalleriet. Att hämta information från rätt kort via `data-`attribut (`dataset.hund`) och automatiskt föra över hundens namn till formulärfältet utan att koden kraschade krävde struktur och noggrannhet.

### Vad jag har lärt mig
Jag har fördjupat min förståelse för hur eventhantering (Event Delegation) fungerar i JavaScript, hur man förhindrar att sidan laddas om vid formulärskick via `preventDefault()`, samt hur man bygger en konsekvent layout med responsiv CSS (Grid och Flexbox) så att sidan fungerar väl på både mobil och dator.

---

## En bugg jag fastnade på

När jag byggde bokningsfunktionen kraschade JavaScript-koden helt och bokningsknapparna slutade att reagera. Genom att öppna webbläsarens utvecklarverktyg (DevTools → Console) såg jag felmeddelanden relaterade till odefinierade variabler och felexekvering. Felet berodde på att det fanns flera krockande händelselyssnare och felaktiga selektorer i JS-filen. Jag löste det genom att rensa upp koden, samla logiken i en ren `DOMContentLoaded`-lyssnare och kontrollera att alla element existerar innan de anropas.

---

## Val av layout och funktioner (Motivering)

- **Flexbox & Grid:** Flexbox användes i headern och footern för att enkelt centrera och sprida ut logotyp och navigationslänkar. Grid användes för hundgalleriet för att automatiskt skapa ett snyggt rutnät som anpassar antalet kolumner efter skärmens bredd.
- **Event Delegation:** I `boka.js` lyssnar vi på hela galleri-container (`#hund-galleriet`) istället för att lägga en enskild lyssnare på varje knapp. Detta gör koden mer effektiv och lättläst.