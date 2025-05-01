/*<!--
112550081 許秉棋 第三次作業 11/1
112550081 PING CHI HSU The Third Homework 11/1 -->*/

document.addEventListener("DOMContentLoaded", () => {
    // 1. 自動彈出視窗功能
    const createPopup = (scrollable, message) => {
        const popup = document.createElement("div");
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 200px;
            background-color: white;
            border: 2px solid #333;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            overflow-y: ${scrollable ? "scroll" : "hidden"};
            z-index: 1001;
        `;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.onclick = () => {
            document.body.removeChild(popup);
            document.body.removeChild(darkenBackground);
        };

        popup.appendChild(closeButton);

        const content = document.createElement("p");
        content.innerHTML = message;
        popup.appendChild(content);

        const darkenBackground = document.createElement("div");
        darkenBackground.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        `;
        darkenBackground.onclick = closeButton.onclick;

        document.body.appendChild(darkenBackground);
        document.body.appendChild(popup);
    };

    setTimeout(() => createPopup(false, "這是第一個彈出視窗的內容。<br>自動顯示，不可滾動。"), 0);

    // 設定彈出視窗按鈕觸發
    document.getElementById("popupTrigger").onclick = () => {
        createPopup(true, "這是第二個彈出視窗的內容。<br>點擊按鈕顯示，可以滾動。<br><br>可以滾動。<br><br>可以滾動。<br><br>可以滾動。<br><br>可以滾動。<br><br>可以滾動。");
    };

    // 3. 廣告彈出視窗
    const showAdPopup = () => {
        const adPopup = document.createElement("div");
        adPopup.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 200px;
            height: 200px;
            background-color: #ffcc00;
            border: 1px solid #333;
            font-size: 14px;
            z-index: 1001;
            text-align: center;
        `;

        const adVideo = document.createElement("video");
        adVideo.src = "advtisevideo.mp4";
        adVideo.style.cssText = `
            width: 100%;
            height: auto;
        `;
        adVideo.autoplay = true;
        adVideo.muted = true;
        adVideo.loop = true;
        adPopup.appendChild(adVideo);

        const closeAdButton = document.createElement("button");
        closeAdButton.textContent = "✕";
        closeAdButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            color: #333;
            z-index: 1002;
        `;

        closeAdButton.onclick = () => {
            document.body.removeChild(adPopup);
            setTimeout(showAdPopup, 5000);
        };

        adPopup.appendChild(closeAdButton);
        document.body.appendChild(adPopup);
    };

    setTimeout(showAdPopup, 3000);

    // 4. 計時器顯示於 footer
    const footer = document.querySelector(".contact-info3");
    const timerDisplay = document.createElement("div");
    timerDisplay.style.cssText = `
        font-size: 16px;
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 0px;
    `;
    footer.appendChild(timerDisplay);

    let startTime = Date.now();
    setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const integerPart = String(Math.floor(elapsedTime)).padStart(4, "0");
        const decimalPart = (elapsedTime % 1).toFixed(1).slice(2);
        timerDisplay.textContent = `${integerPart}.${decimalPart}s`;
    }, 100);
});

// 新增：開啟新分頁的功能
function openInNewTab(url) {
    window.open(url, '_blank');
}

// 新增：開啟新視窗的功能
function openInNewWindow(url) {
    window.open(url, '_blank', 'width=800,height=600');
}