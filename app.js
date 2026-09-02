// Typing effect for the hero prompt, and replays on click, and when scroll-back to top
(function () {
    var text = "whoami";
    var el = document.getElementById("typedText");
    var promptLine = document.getElementById("promptLine");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var typing = false;

    function playTyping() {
        if (reduceMotion) {
            el.textContent = text;
            return;
        }
        if (typing) return;
        typing = true;
        el.textContent = "";
        var i = 0;
        function typeNext() {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                i++;
                setTimeout(typeNext, 90);
            } else {
                typing = false;
            }
        }
        typeNext();
    }

    // initial type-in
    playTyping();

    // replay on click or keyboard activation
    promptLine.addEventListener("click", playTyping);
    promptLine.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            playTyping();
        }
    });

    // replay on scroll back to top
    var atTop = window.scrollY === 0;
    var cooldown = false;
    window.addEventListener("scroll", function () {
        var isAtTop = window.scrollY === 0;
        if (isAtTop && !atTop && !cooldown) {
            playTyping();
            cooldown = true;
            setTimeout(function () { cooldown = false; }, 2000);
        }
        atTop = isAtTop;
    });
})();

// Dark mode toggle
(function () {
    var root = document.documentElement;
    var btn = document.getElementById("themeToggle");
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var initial = stored || (prefersDark ? "dark" : "light");

    applyTheme(initial);

    btn.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem("theme", next);
    });

    function applyTheme(mode) {
        if (mode === "dark") {
            root.setAttribute("data-theme", "dark");
            btn.textContent = "dark mode: on";
        } else {
            root.removeAttribute("data-theme");
            btn.textContent = "dark mode: off";
        }
    }
})();
