// --- 1. FEJLÉC ÉS FEL GOMB GÖRGETÉS LOGIKA ---
window.addEventListener("scroll", function() {
    let fejlec = document.getElementById("fejlec");
    let felGomb = document.getElementById("felGomb");

    // Ha lejjebb görgetünk, mint 50 pixel, a fejléc sötét lesz
    if (window.scrollY > 50) {
        fejlec.classList.add("scrolled");
    } else {
        fejlec.classList.remove("scrolled");
    }

    // Fel gomb megjelenítése
    if (window.scrollY > 300) {
        felGomb.style.display = "block";
    } else {
        felGomb.style.display = "none";
    }
});

function felUgras() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 2. GÖRGŐS ANIMÁCIÓK (INTERSECTION OBSERVER) ---
// Ez figyeli, hogy egy elem beért-e a képernyőre
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Ha az elem láthatóvá válik, megkapja a 'visible' osztályt a CSS-ből
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); // Akkor indul, ha 10%-a látszik az elemnek

// Kiválasztjuk az összes animálandó elemet, és rájuk tesszük a megfigyelőt
let animalandoElemek = document.querySelectorAll('.animate-on-scroll');
for (let i = 0; i < animalandoElemek.length; i++) {
    observer.observe(animalandoElemek[i]);
}


// --- 3. GUMIMÉRET ELLENŐRZÉS (SZIGORÚ KARAKTERSZÁM ÉS TÍPUS VIZSGÁLAT) ---
function gumiEllenorzes() {
    let szelesseg = document.getElementById("gumiSzelesseg").value;
    let magassag = document.getElementById("gumiMagassag").value;
    let atmero = document.getElementById("gumiAtmero").value;
    let uzenet = document.getElementById("gumiUzenet");

    let szelessegRegex = /^\d{3}$/; 
    let magassagRegex = /^\d{2}$/;
    let atmeroRegex = /^\d{2}$/;

    if (szelesseg === "" || magassag === "" || atmero === "") {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "Minden mezőt ki kell tölteni!";
        return;
    }

    if (!szelessegRegex.test(szelesseg)) {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "A szélességnek pontosan 3 számjegynek kell lennie (pl. 205)!";
        return;
    }
    if (!magassagRegex.test(magassag)) {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "A magasságnak pontosan 2 számjegynek kell lennie (pl. 55)!";
        return;
    }
    if (!atmeroRegex.test(atmero)) {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "Az átmérőnek pontosan 2 számjegynek kell lennie (pl. 16)!";
        return;
    }

    uzenet.style.color = "#4caf50";
    uzenet.innerHTML = "Keresett méret: " + szelesseg + "/" + magassag + " R" + atmero + " - Munkatársunk hamarosan felveszi Önnel a kapcsolatot.";
}


// --- 4. FÉKRENDELÉS (AUTÓ MÁRKA ELSŐ KARAKTER VALIDÁCIÓ) ---
function fekRendeles() {
    let nev = document.getElementById("nev").value;
    let auto = document.getElementById("auto").value;
    let marka = document.getElementById("fekMarka").value;
    let uzenet = document.getElementById("rendelesUzenet");
    
    let betuEllenorzo = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;
    let autoKezdesEllenorzo = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ].*$/;

    if (nev === "" || auto === "") {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "Kérlek add meg a neved és az autó típusát!";
        return;
    }

    if (!betuEllenorzo.test(nev)) {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "Hiba! A név mezőbe nem írhatsz számokat vagy speciális karaktereket!";
        return;
    }

    if (!autoKezdesEllenorzo.test(auto)) {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "Hiba! Az autó márkája és típusa kötelezően betűvel kell, hogy kezdődjön (nem lehet szám vagy speciális karakter) !";
        return;
    }

    let kivalasztottAlkatreszek = [];
    if (document.getElementById("f_tarcsa").checked) kivalasztottAlkatreszek.push("Féktárcsa");
    if (document.getElementById("f_betet").checked) kivalasztottAlkatreszek.push("Fékbetét");
    if (document.getElementById("f_nyereg").checked) kivalasztottAlkatreszek.push("Féknyereg");
    if (document.getElementById("f_folyadek").checked) kivalasztottAlkatreszek.push("Fékfolyadék");

    if (kivalasztottAlkatreszek.length === 0) {
        uzenet.style.color = "#ff4c4c";
        uzenet.innerHTML = "Kérlek jelölj be legalább egy alkatrészt a rendeléshez!";
    } else {
        uzenet.style.color = "#4caf50";
        uzenet.innerHTML = "Sikeres rendelés, kedves " + nev + "! <br>Autó: " + auto + " <br>Márka: " + marka + " <br>Rendelt alkatrészek: " + kivalasztottAlkatreszek.join(", ");
        document.getElementById("rendelesForm").reset(); 
    }
}


// --- 5. ÁRKALKULÁTOR ---
function arKalkulalas() {
    let checkboxok = document.getElementsByClassName("szolgaltatas_ar");
    let vegosszeg = 0;

    for (let i = 0; i < checkboxok.length; i++) {
        if (checkboxok[i].checked) {
            vegosszeg += parseInt(checkboxok[i].value); 
        }
    }

    let eredmenyMezo = document.getElementById("kalkulaltAr");

    if (vegosszeg > 0) {
        eredmenyMezo.innerHTML = "A kiválasztott szolgáltatások végösszege: " + vegosszeg.toLocaleString() + " Ft";
        eredmenyMezo.style.color = "#e63946";
    } else {
        eredmenyMezo.innerHTML = "Kérlek jelölj be legalább egy szolgáltatást!";
        eredmenyMezo.style.color = "#fff";
    }
}
