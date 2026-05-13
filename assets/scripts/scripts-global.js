const SUPPORTED_LANGS = ["en", "pl"];
const DEFAULT_LAG = "en"
const SUPPORTED_THEMES = ["light", "dark"];
const DEFAULT_THEME = "light"

// #region Language
function normalizeLang(lang) {
    if (!lang) return null;
    lang = lang.toLowerCase().slice(0, 2);
    return SUPPORTED_LANGS.includes(lang) ? lang : null;
}

export function setLanguage(lang) {
    const normalized = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LAG;
    localStorage.setItem("lang", normalized);

    return normalized
}

export function getLanguage() {
    let lang;

    // URL path
    lang = normalizeLang(location.pathname.split("/")[1]);
    if (lang) return lang;

    // localStorage
    lang = normalizeLang(localStorage.getItem("lang"));
    if (lang) return lang;

    // browser
    lang = normalizeLang(navigator.language);
    if (lang) return setLanguage(lang);

    // fallback
    return setLanguage(DEFAULT_LAG);
}

document.querySelectorAll(".lang-switch").forEach(link => {
    link.addEventListener("click", () => {
        setLanguage(link.dataset.lang);
    });
});
// #endregion
// #region Theme
function normalizeTheme(theme) {
    if (!theme) return null;
    return SUPPORTED_THEMES.includes(theme) ? theme : null;
}
export function setTheme(theme) {
    const normalized = SUPPORTED_THEMES.includes(theme) ? theme : DEFAULT_THEME;
    localStorage.setItem("theme", normalized);
    document.documentElement.setAttribute("data-bs-theme", theme);
    return normalized
}
export function getTheme() {
    let theme;
    console.log("THEME",theme)
    // saved theme
    theme = normalizeTheme(localStorage.getItem("theme"));
    if (theme) return theme;

    // browser / OS preference
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    if (theme) return setTheme(theme);

    return setTheme(DEFAULT_THEME);
}

document.querySelectorAll(".theme-switch").forEach(btn => {
    btn.addEventListener("click", () => {
        const current = localStorage.getItem("theme") || getTheme();
        const next = current === "dark" ? "light" : "dark";

        console.log(next)

        setTheme(next);
    });
});
document.documentElement.setAttribute("data-bs-theme", getTheme());
// #endregion

getTheme();

// TODO MAKE IT NICE IN CONSOLE
console.log("Global script")
console.log(getLanguage())


const navbar = document.querySelector(".navbar-blur");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});