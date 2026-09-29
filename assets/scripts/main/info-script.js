

fetch("/assets/data/info.json")
    .then(r => r.json())
    .then(json => {
        console.log(json);
        buildTech(json.technologies);
        buildTopics(json.topics);
        buildBuzzTerms(json.buzzterms);
        buildTools(json.tools);
        requestAnimationFrame(() => {
            updateTickers();
        });
    }).catch(error => {
        console.error("Failed to load data:", error);
    });

function buildTech(data) {
    techElement.innerHTML = "";
    data.forEach(element => {

        const children = element.childrens.map(child => `
        <li class="sub-entry">
            ${child.title}
        </li>
    `).join("");

        const template = `
<div class="col-12 col-md-6 col-xl-4">
    <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">

            <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                <h4 class="h5 fw-semibold mb-0">
                    ${element.title}
                </h4>
            </div>
            <div class="news-ticker navbar-blur">

                <div class="news-track">
                    <ul class="news-group">
                        ${children}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

        techElement.insertAdjacentHTML("beforeend", template);
    });
}
function buildTopics(data) {
    topicsElement.innerHTML = "";

    const children = data.map(element => `
        <li class="sub-entry">
            ${element.title}
        </li>
    `).join("");

    const template = `
        <div class="row news-ticker navbar-blur">
            <div class="news-track">
                <ul class="news-group">
                    ${children}
                </ul>
            </div>
        </div>
    `;

    topicsElement.insertAdjacentHTML("beforeend", template);
}
function buildBuzzTerms(data) {
    buzztermsElement.innerHTML = "";

    const children = data.map(element => `
        <li class="sub-entry">
            ${element.title}
        </li>
    `).join("");

    const template = `
        <div class="row news-ticker navbar-blur">
            <div class="news-track">
                <ul class="news-group">
                    ${children}
                </ul>
            </div>
        </div>
    `;

    buzztermsElement.insertAdjacentHTML("beforeend", template);
}
function buildTools(data) {
    toolsElement.innerHTML = "";

    data.forEach(element => {

        const children = element.childrens.map(child => `
        <li class="sub-entry">
            ${child.title}
        </li>
    `).join("");

        const template = `
<div class="col-12 col-md-6 col-xl-4">
    <div class="card h-100 border-0 shadow-sm">
        <div class="card-body p-4">

            <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                <h4 class="h5 fw-semibold mb-0">
                    ${element.title}
                </h4>
            </div>
            <div class="news-ticker navbar-blur">

                <div class="news-track">
                    <ul class="news-group">
                        ${children}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

        toolsElement.insertAdjacentHTML("beforeend", template);
    });
}
const techElement = document.getElementById("technologies");
const topicsElement = document.getElementById("topics");
const buzztermsElement = document.getElementById("buzzterms");
const toolsElement = document.getElementById("tools");
const otherTopicsElement = document.getElementById("other_tpoics");
const otherToolsElement = document.getElementById("other_tools");




const speed = 80; //
function updateTickers() {

    document.querySelectorAll(".news-ticker").forEach(ticker => {
        const track = ticker.querySelector(".news-track");

        const originalGroup = track.querySelector(".news-group");

        track.querySelectorAll(".news-group:not(:first-child)")
            .forEach(group => group.remove());


        const groupWidth = originalGroup.getBoundingClientRect().width;
        const tickerWidth = ticker.getBoundingClientRect().width;

        const copiesNeeded =
            Math.ceil(tickerWidth / groupWidth) + 2;
        if (groupWidth < 300) {
            return;
        }

        for (let i = 1; i < copiesNeeded; i++) {

            const clone = originalGroup.cloneNode(true);

            clone.setAttribute("aria-hidden", "true");

            track.appendChild(clone);
        }
        track.style.setProperty(
            "--scroll-distance",
            groupWidth + "px"
        );
        const duration = groupWidth / speed;
        track.style.animationDuration = duration + "s";
    });
}

const techWrapper = techElement.closest(".technologies-slider");

const createArrow = (direction) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `
        technologies-arrow
        technologies-arrow-${direction}
        btn btn-light
        rounded-circle
        shadow-sm
        d-flex align-items-center justify-content-center
    `;

    button.innerHTML = direction === "left" ? "&lsaquo;" : "&rsaquo;";

    button.addEventListener("click", () => {
        techElement.scrollBy({
            left: direction === "left"
                ? -techElement.clientWidth
                : techElement.clientWidth,
            behavior: "smooth"
        });
    });

    techWrapper.appendChild(button);

    return button;
};

const leftArrow = createArrow("left");
const rightArrow = createArrow("right");

const updateArrows = () => {
    const maxScroll =
        techElement.scrollWidth - techElement.clientWidth;

    leftArrow.classList.toggle(
        "d-none",
        techElement.scrollLeft <= 1
    );

    rightArrow.classList.toggle(
        "d-none",
        maxScroll <= 1 ||
        techElement.scrollLeft >= maxScroll - 1
    );
};

techElement.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

const observer = new MutationObserver(() => {
    updateArrows();
});

observer.observe(techElement, {
    childList: true,
    subtree: true
});

updateArrows();
// updateTickers();

window.addEventListener("resize", updateTickers);