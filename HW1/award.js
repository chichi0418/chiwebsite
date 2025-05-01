document.addEventListener("DOMContentLoaded", () => {
    // 滾動偵測
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
});
