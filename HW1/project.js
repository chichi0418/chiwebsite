// 初始化函數
function initializeFunctions() {
    displayMousePosition();
    displayCurrentTime();
    createScrollToTopButton();
    randomBackgroundColor();
    toggleDarkMode();
}

// 顯示滑鼠座標的函數
function displayMousePosition() {
    const mousePositionDisplay = document.getElementById("mousePositionDisplay");

    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        mousePositionDisplay.textContent = `Mouse Position: (${mouseX}, ${mouseY})`;
    });
}

// 顯示當前時間的函數
function displayCurrentTime() {
    const timeDisplay = document.createElement("div");
    timeDisplay.id = "timeDisplay";
    timeDisplay.className = "time-box";
    document.body.appendChild(timeDisplay);

    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// 平滑滾動到頁面頂端的按鈕
function createScrollToTopButton() {
    const scrollButton = document.createElement("button");
    scrollButton.id = "scrollToTopButton";
    scrollButton.textContent = "↑ Top";
    scrollButton.className = "scroll-top-button";
    document.body.appendChild(scrollButton);

    window.addEventListener("scroll", () => {
        scrollButton.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// 隨機背景色切換功能
function randomBackgroundColor() {
    const colors = ["#FFDDC1", "#D4E2D4", "#A9A2F4", "#F2A9D4", "#FFD9E8", "#D9FFFF"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}


// 日夜模式切換按鈕
function toggleDarkMode() {
    const darkModeButton = document.createElement("button");
    darkModeButton.id = "darkModeButton";
    darkModeButton.textContent = "切換日夜模式";
    darkModeButton.className = "dark-mode-button";
    document.body.appendChild(darkModeButton);

    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const aboutSections = document.querySelectorAll(".about-container");

    aboutSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // 如果滾動位置達到 section 位置，觸發動畫
        if (scrollPosition > sectionTop - window.innerHeight / 1.5 && scrollPosition < sectionTop + sectionHeight) {
            section.classList.add("fade-in");
        } else {
            section.classList.remove("fade-in");
        }
    });
});
