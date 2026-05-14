document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const stars = document.querySelector(".landing-bg-sky");

    if (!stars) return;

    const star0 =
        "<div class='generated-star star star-0' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

    const star1 =
        "<div class='generated-star star star-1 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

    const star2 =
        "<div class='generated-star star star-2 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

    function appendHTML(element, htmlString) {
        element.insertAdjacentHTML("beforeend", htmlString);
    }

    function removeGeneratedStars() {
        stars.querySelectorAll(".generated-star").forEach(star => {
            star.remove();
        });
    }

    function generateStars() {
        removeGeneratedStars();

        // First star group
        for (let i = 0; i < 100; i++) {
            appendHTML(
                stars,
                star1
                    .replace("{{top}}", getRandomInt(0, 40))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(2, 5))
            );

            appendHTML(
                stars,
                star2
                    .replace("{{top}}", getRandomInt(20, 70))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(4, 8))
            );
        }

        // Second star group
        for (let i = 0; i < 75; i++) {
            appendHTML(
                stars,
                star0
                    .replace("{{top}}", getRandomInt(0, 50))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(1, 2.5))
            );

            appendHTML(
                stars,
                star1
                    .replace("{{top}}", getRandomInt(0, 50))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(2.5, 4))
            );

            appendHTML(
                stars,
                star2
                    .replace("{{top}}", getRandomInt(0, 50))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(4, 5))
            );
        }

        // Third star group
        for (let i = 0; i < 50; i++) {
            appendHTML(
                stars,
                star0
                    .replace("{{top}}", getRandomInt(40, 75))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(1, 3))
            );

            appendHTML(
                stars,
                star1
                    .replace("{{top}}", getRandomInt(40, 75))
                    .replace("{{left}}", getRandomInt(0, 99))
                    .replace("{{duration}}", getRandomInt(2, 4))
            );
        }
    }

    function updateStars() {
        const isDark = html.getAttribute("data-bs-theme") === "dark";

        if (isDark) {
            generateStars();
        } else {
            removeGeneratedStars();
        }
    }

    // Initial state
    updateStars();

    // Watch for theme changes
    const observer = new MutationObserver(() => {
        updateStars();
    });

    observer.observe(html, {
        attributes: true,
        attributeFilter: ["data-bs-theme"]
    });
});

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}