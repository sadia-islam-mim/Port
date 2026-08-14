document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       0. Entry CRT Flash Effect & Custom Crosshair Cursor Tracking
       ========================================================================== */
    document.body.classList.add("page-entry-flash");
    setTimeout(() => document.body.classList.remove("page-entry-flash"), 400);

    const cursor = document.getElementById("cursor");
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const hoverableElements = document.querySelectorAll(
            "a, button, .project-row, .hero-avatar-box, .skill-meter, .stack-box, .highlight-item, .hero-title"
        );
        hoverableElements.forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
        });
    }

    /* ==========================================================================
       1. Matrix Code Rain Background Canvas Effect
       ========================================================================== */
    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    canvas.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:0; opacity:0.12;";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = "01SADIA_MIM_CSE_UAP_SQL_JAVA_CPP_PYTHON_";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#00ff66";
        ctx.font = `${fontSize}px 'Space Mono'`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 40);
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    /* ==========================================================================
       2. Interactive 3D Card Tilt Effect
       ========================================================================== */
    const tiltCards = document.querySelectorAll(".highlight-item, .stack-box");
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transition = "none";
            card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transition = "transform 0.4s ease";
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });

    /* ==========================================================================
       3. Cyberpunk Text Scramble / Decrypt Effect
       ========================================================================== */
    class TextScrambler {
        constructor(el) {
            this.el = el;
            this.chars = "!<>-_\\/[]{}—=+*^?#________";
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || "";
                const to = newText[i] || "";
                const start = Math.floor(Math.random() * 20);
                const end = start + Math.floor(Math.random() * 20);
                this.queue.push({ from, to, start, end, char: "" });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = "";
            let complete = 0;
            for (let i = 0; i < this.queue.length; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span style="color:var(--accent-cyan);">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    const titleEl = document.querySelector(".hero-title");
    if (titleEl) {
        const scrambler = new TextScrambler(titleEl);
        titleEl.addEventListener("mouseenter", () => scrambler.setText("SADIA ISLAM MIM"));
    }

    /* ==========================================================================
       4. Cyber Magnetic Hover Buttons Effect
       ========================================================================== */
    const magneticBtns = document.querySelectorAll(".sharp-btn");
    magneticBtns.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            btn.style.transition = "none";
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            btn.style.transform = "translate(0px, 0px)";
        });
    });

    /* ==========================================================================
       5. Mouse Trail Particle System
       ========================================================================== */
    let lastX = 0, lastY = 0;
    document.addEventListener("mousemove", (e) => {
        if (Math.hypot(e.clientX - lastX, e.clientY - lastY) > 20) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 600);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    /* ==========================================================================
       6. Theme Switcher (Light / Dark Mode)
       ========================================================================== */
    const themeBtn = document.getElementById("theme-toggle");
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "light";
    htmlEl.setAttribute("data-theme", savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = htmlEl.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            htmlEl.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    /* ==========================================================================
       7. Live Digital Dhaka Clock Generator
       ========================================================================== */
    const clockEl = document.getElementById("live-clock");

    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const options = {
            timeZone: "Asia/Dhaka",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        const dhakaTime = new Intl.DateTimeFormat("en-US", options).format(now);
        clockEl.textContent = `DHAKA [${dhakaTime}]`;
    }

    setInterval(updateClock, 1000);
    updateClock();

    /* ==========================================================================
       8. Scroll-Triggered Reveal & Skill Bar Counter Animations
       ========================================================================== */
    const revealSections = document.querySelectorAll(".reveal");
    let hasAnimatedSkills = false;

    function animateSkillPercentages() {
        const skillValues = document.querySelectorAll(".skill-val");
        skillValues.forEach((val) => {
            const target = +val.getAttribute("data-target");
            let count = 0;
            const duration = 1400;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    val.textContent = `${target}%`;
                    clearInterval(timer);
                } else {
                    val.textContent = `${Math.ceil(count)}%`;
                }
            }, stepTime);
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                if (entry.target.id === "skills" && !hasAnimatedSkills) {
                    hasAnimatedSkills = true;
                    animateSkillPercentages();
                }
            }
        });
    }, { threshold: 0.15 });

    revealSections.forEach((section) => revealObserver.observe(section));

    /* ==========================================================================
       9. Animated Number Counter for Stats Section
       ========================================================================== */
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;
    const statsSection = document.querySelector(".stats-matrix");

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach((counter) => {
                    const target = +counter.getAttribute("data-target");
                    let count = 0;
                    const increment = target / 20;

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count).toString().padStart(2, "0");
                            setTimeout(updateCount, 50);
                        } else {
                            counter.innerText = target.toString().padStart(2, "0");
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       10. Copy Email Action
       ========================================================================== */
    const copyBtn = document.getElementById("copy-email-btn");
    const myEmail = "sadiaislammim70@gmail.com";

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(myEmail).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "[COPIED!]";
                copyBtn.style.background = "var(--accent-green)";
                copyBtn.style.color = "#000";

                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.background = "";
                    copyBtn.style.color = "";
                }, 2000);
            });
        });
    }
});