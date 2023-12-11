const links = document.getElementsByTagName("link");
const cssFiles = ["estilos.css", "estilos-futuro.css", "estilos-retro.css"];
const buttonRemember = document.getElementById("buttonRemember");
const selectTheme = document.getElementById("selectTheme");
const radioInputs = document.querySelectorAll('input[name="theme"]');
let activeLink = 0;
let activeRemember = false;

selectTheme.addEventListener("change", handleThemeChange);
radioInputs.forEach((button) =>
    button.addEventListener("change", handleThemeChange)
);
window.addEventListener("load", handleLoad);

function applySelected() {
    const linkHref = activeLink === 3 ? "" : cssFiles[activeLink];
    links[0].href = linkHref;

    if (activeRemember) {
        localStorage.setItem("theme", activeLink);
    }

    updateOptions();
}

function handleThemeChange(event) {
    activeLink = parseInt(event.target.value);
    applySelected();
}

function handleLoad() {
    if (localStorage.getItem("theme")) {
        saveTheme();
    } else {
        applyDefaultTheme();
    }
}

function saveTheme() {
    activeLink = parseInt(localStorage.getItem("theme"));
    links[0].href = activeLink === 3 ? "" : cssFiles[activeLink];
    applySelected();
    activeRemember = true;
    changeStyleButton();
    updateOptions();
}

function applyDefaultTheme() {
    links[0].href = cssFiles[0];
}

function updateOptions() {
    radioInputs.forEach((input, index) => {
        input.checked = index === activeLink;
    });
    selectTheme.value = activeLink.toString();
}

function changeStyleButton() {
    if (activeRemember) {
        buttonRemember.style.transform = "translateY(2px)";
        buttonRemember.style.boxShadow = "0 2px 4px #bf4c4ce3";
    } else {
        buttonRemember.style = "";
    }
}

function changeTheme() {
    activeLink++;
    if (activeLink >= cssFiles.length) {
        activeLink = 0;
    }
    links[0].href = cssFiles[activeLink];
    updateOptions();
    if (activeRemember) {
        localStorage.setItem("theme", activeLink);
    }
}

function changeThemeAleatory() {
    activeLink = generateRandomNumber();
    updateOptions();
    if (activeRemember) {
        localStorage.setItem("theme", activeLink);
    }
    links[0].href = activeLink === 3 ? "" : cssFiles[activeLink];
}

function generateRandomNumber() {
    return Math.floor(Math.random() * cssFiles.length);
}

function rememberTheme() {
    activeRemember = !activeRemember;
    changeStyleButton();
    localStorage.setItem("theme", activeRemember ? activeLink : "");
}
