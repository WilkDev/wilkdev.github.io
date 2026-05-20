// == INIT ==
const COLORS = [
    "#4dabf7",
    "#20c997",
    "#ffd43b",
    "#ff922b",
    "#f06595",
    "#845ef7",
    "#51cf66",
];

const CHART = {
    cx: 100,
    cy: 140,
    r: 80,
    ir: 45
};
const canvasLang = document.getElementById("donutChartLang");
const canvasCategories = document.getElementById("donutCategoryChart");
const canvasOther = document.getElementById("simpleOtherChart");

let langData = { labels: [], values: [], total: 0, summary: {}, ...CHART };
let categoriesData = { labels: [], values: [], total: 0, summary: {}, ...CHART };
let osData = { labels: [], values: [], total: 0, summary: {}, ...CHART };
let editorsData = { labels: [], values: [], total: 0, summary: {}, ...CHART };

let hoveredLangIndex = -1;
let hoveredCategoryIndex = -1;



// #region == LANG ==



function groupLang(name) {
    const n = name.toLowerCase();

    if (n.includes("python")) return "Python";
    if (n.includes("c#")) return "C#";
    if (n.includes("java")) return "Java";
    if (n.includes("rust")) return "Rust";
    if (n.includes("c++")) return "C++";
    if (n.includes("javascript") || n.includes("typescript") || n.includes("css"))
        return "HTML CSS JS TS";

    return "Other";
}

function buildLangSummary(languages) {
    const summary = {
        "Python": 0,
        "C#": 0,
        "Java": 0,
        "Rust": 0,
        "C++": 0,
        "HTML CSS JS TS": 0,
        "Other": 0
    };

    languages.forEach(l => {
        const key = groupLang(l.name);
        summary[key] += l.total_seconds;
    });

    return summary;
}

function buildLangData(summary) {
    const labels = Object.keys(summary);
    const values = labels.map(k => summary[k] / 3600);
    const total = values.reduce((a, b) => a + b, 0) || 1;

    langData = { labels, values, total, summary, ...CHART };
    return langData;
}

function drawChartLangs(data) {
    const ctx = canvasLang.getContext("2d");
    const title = canvasLang.dataset.title || "Languages";

    const labels = data.labels;
    const values = data.values;
    const total = data.total;

    ctx.clearRect(0, 0, canvasLang.width, canvasLang.height);

    ctx.fillStyle = getThemeTextColor();
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const rect = canvasLang.getBoundingClientRect();
    ctx.fillText(title, rect.width / 2, 10);

    let start = -Math.PI / 2;

    labels.forEach((label, i) => {
        const slice = (values[i] / total) * Math.PI * 2;
        const end = start + slice;

        const radius = hoveredLangIndex === i ? data.r + 10 : data.r;

        ctx.beginPath();
        ctx.arc(data.cx, data.cy, radius, start, end);
        ctx.arc(data.cx, data.cy, data.ir, end, start, true);
        ctx.closePath();

        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();

        start = end;
    });

    ctx.fillStyle = getThemeSubTextColor();
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total.toFixed(1) + "h", data.cx, data.cy);

    let legendY = 60;
    const legendX = 220;

    labels.forEach((label, i) => {
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fillRect(legendX, legendY - 8, 14, 14);

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.fillStyle = hoveredLangIndex === i ? COLORS[i] : getThemeSubTextColor();
        ctx.font = "bold 13px Arial";

        ctx.fillText(`${label} (${values[i].toFixed(1)}h)`, legendX + 24, legendY);

        legendY += 32;
    });
}
// #endregion
// #region == CATEGORIES ==



function groupCategories(name) {
    const n = name.toLowerCase();

    if (n.includes("coding")) return "Coding";
    if (n.includes("writing docs")) return "Writing Docs";
    if (n.includes("writing tests")) return "Writing Tests";
    if (n.includes("debugging")) return "Debugging";
    if (n.includes("building")) return "Building";
    if (n.includes("ai coding")) return "AI Coding";

    return "Other";
}

function buildCategoriesSummary(categories) {
    const summary = {
        "Coding": 0,
        "Writing Docs": 0,
        "Writing Tests": 0,
        "Debugging": 0,
        "Building": 0,
        "AI Coding": 0,
        "Other": 0
    };

    categories.forEach(c => {
        const key = groupCategories(c.name);
        summary[key] += c.total_seconds;
    });

    return summary;
}

function buildCategoriesData(summary) {
    const labels = Object.keys(summary);
    const values = labels.map(k => summary[k] / 3600);
    const total = values.reduce((a, b) => a + b, 0) || 1;

    categoriesData = { labels, values, total, summary, ...CHART };
    return categoriesData;
}

function drawChartCategories(data) {
    const ctx = canvasCategories.getContext("2d");
    const title = canvasCategories.dataset.title || "Categories";

    const labels = data.labels;
    const values = data.values;
    const total = data.total;

    ctx.clearRect(0, 0, canvasCategories.width, canvasCategories.height);

    ctx.fillStyle = getThemeTextColor();
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const rect = canvasCategories.getBoundingClientRect();
    ctx.fillText(title, rect.width / 2, 10);

    let start = -Math.PI / 2;

    labels.forEach((label, i) => {
        const slice = (values[i] / total) * Math.PI * 2;
        const end = start + slice;

        const radius = hoveredCategoryIndex === i ? data.r + 10 : data.r;

        ctx.beginPath();
        ctx.arc(data.cx, data.cy, radius, start, end);
        ctx.arc(data.cx, data.cy, data.ir, end, start, true);
        ctx.closePath();

        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();

        start = end;
    });

    ctx.fillStyle = getThemeSubTextColor();
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total.toFixed(1) + "h", data.cx, data.cy);

    let legendY = 60;
    const legendX = 220;

    labels.forEach((label, i) => {
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fillRect(legendX, legendY - 8, 14, 14);

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.fillStyle = hoveredCategoryIndex === i ? COLORS[i] : getThemeSubTextColor();
        ctx.font = "bold 13px Arial";

        ctx.fillText(`${label} (${values[i].toFixed(1)}h)`, legendX + 24, legendY);

        legendY += 32;
    });
}
// #endregion
// #region == OTHER ==

function groupOS(name) {
    const n = name.toLowerCase();
    if (n.includes("windows")) return "Windows";
    if (n.includes("linux")) return "Linux";
    return "Other";
}

function groupEditors(name) {
    const n = name.toLowerCase();

    if (n.includes("pycharm")) return "PyCharm";
    if (n.includes("vs code")) return "VS Code";
    if (n.includes("visual studio")) return "Visual Studio";
    if (n.includes("intellij idea")) return "IntelliJ IDEA";
    if (n.includes("android studio")) return "Android Studio";

    return "Other";
}

function buildOsSummary(os) {
    const summary = { Windows: 0, Linux: 0, Other: 0 };

    os.forEach(o => {
        summary[groupOS(o.name)] += o.total_seconds;
    });

    return summary;
}

function buildEditorsSummary(editors) {
    const summary = {
        "VS Code": 0,
        "Visual Studio": 0,
        "PyCharm": 0,
        "IntelliJ IDEA": 0,
        "Android Studio": 0,
        "Other": 0
    };

    editors.forEach(e => {
        summary[groupEditors(e.name)] += e.total_seconds;
    });

    return summary;
}

function drawOther(canvas, osSummary, editorSummary) {
    const titles = JSON.parse(canvas.dataset.titles);

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sectionHeight = height / 2;

    drawStackedBar(ctx, osSummary, titles.os || "OS", width, 0);
    drawStackedBar(ctx, editorSummary, titles.editors || "Editors", width, sectionHeight);
}

function drawStackedBar(ctx, summary, title, width, offsetY) {

    const labels = Object.keys(summary);
    const values = labels.map(k => summary[k] / 3600);

    const total = values.reduce((a, b) => a + b, 0) || 1;

    const barX = 40;
    const barY = offsetY + 60;
    const barWidth = width - 80;
    const barHeight = 22;

    // TITLE
    ctx.fillStyle = getThemeTextColor();
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(title, width / 2, offsetY + 10);

    // STACKED BAR
    let x = barX;

    labels.forEach((label, i) => {

        const w = (values[i] / total) * barWidth;

        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fillRect(x, barY, w, barHeight);

        x += w;
    });

    // LEGEND
    let legendY = barY + 40;

    labels.forEach((label, i) => {

        const x = 40 + i * 160;

        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fillRect(x, legendY, 10, 10);

        ctx.fillStyle = getThemeSubTextColor();
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.fillText(label, x + 15, legendY + 5);
    });
}
// #endregion
// #region == RESIZE ==

function resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
}
// #endregion
// #region == HOVER ==

function setupDonutHover(canvas, dataRef, redraw, setHover) {
    canvas.addEventListener("mousemove", (e) => {
        if (!dataRef.labels.length) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        const x = (e.clientX - rect.left) * dpr - dataRef.cx * dpr;
        const y = (e.clientY - rect.top) * dpr - dataRef.cy * dpr;

        const distance = Math.sqrt(x * x + y * y);

        if (distance > (dataRef.r + 12) * dpr || distance < dataRef.ir * dpr) {
            setHover(-1);
            redraw(dataRef);
            return;
        }

        let angle = Math.atan2(y, x);
        angle = (angle + Math.PI * 2) % (Math.PI * 2);

        let start = -Math.PI / 2;
        const total = dataRef.total || 1;

        for (let i = 0; i < dataRef.labels.length; i++) {
            const slice = (dataRef.values[i] / total) * Math.PI * 2;
            const end = start + slice;

            if (angle >= start && angle <= end) {
                setHover(i);
                redraw(dataRef);
                return;
            }

            start = end;
        }

        setHover(-1);
        redraw(dataRef);
    });

    canvas.addEventListener("mouseleave", () => {
        setHover(-1);
        redraw(dataRef);
    });
}
// #endregion
// #region == REDRAW ==

function redrawAll() {
    drawChartLangs(langData);
    drawChartCategories(categoriesData);
    drawOther(canvasOther, osData, editorsData);
}
// #endregion


fetch("/assets/data/wakatime.json")
    .then(r => r.json())
    .then(json => {
        const langSummary = buildLangSummary(json.data.languages);
        const catSummary = buildCategoriesSummary(json.data.categories);

        osData = buildOsSummary(json.data.operating_systems);
        editorsData = buildEditorsSummary(json.data.editors);

        resizeCanvas(canvasLang);
        resizeCanvas(canvasCategories);
        resizeCanvas(canvasOther);

        buildLangData(langSummary);
        buildCategoriesData(catSummary);

        redrawAll();

        setupDonutHover(canvasLang, langData, drawChartLangs, i => hoveredLangIndex = i);
        setupDonutHover(canvasCategories, categoriesData, drawChartCategories, i => hoveredCategoryIndex = i);
    });

// #region == EVENTS ==

window.addEventListener("resize", () => {
    resizeCanvas(canvasLang);
    resizeCanvas(canvasCategories);
    resizeCanvas(canvasOther);
    redrawAll();
});

const observer = new MutationObserver(() => {
    redrawAll();
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"]
});
// #endregion
// #region == THEMES ==
function getThemeTextColor() {
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    return isDark ? "#fff" : "#111";
}

function getThemeSubTextColor() {
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    return isDark ? "#ccc" : "#444";
}
// #endregion