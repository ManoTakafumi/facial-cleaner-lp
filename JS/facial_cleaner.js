
const bubbles = document.querySelectorAll(".bubble");
let latestScrollY = 0;
let ticking = false;

const centerX = window.innerWidth / 2;
const safeZone = 250;//中央テキストを避ける幅

bubbles.forEach(bubble => {
   //サイズ
   const size = Math.random() * 80 + 60;
   bubble.style.width = size + "px";
   bubble.style.height = size + "px";

   //X座標（中央回避）

   let randomX;
   do {
    randomX = Math.random() * (window.innerWidth - size);
   } while (
    randomX > centerX - safeZone &&
    randomX < centerX + safeZone
   );

   bubble.dataset.baseX = randomX;
   bubble.dataset.baseY = Math.random() * (window.innerHeight * 0.8) + window.innerHeight * 0.1;

   //動きの差
   bubble.dataset.depth = Math.random() * 0.05 + 0.02;
   bubble.dataset.speedX = (Math.random() - 0.5) * 0.03;

   //透明度ランダム
   bubble.style.opacity = Math.random() * 0.4 + 0.2;

   bubble.style.left = bubble.dataset.baseX + "px";
   bubble.style.top = bubble.dataset.baseY + "px";

});

window.addEventListener("scroll", () => {
    latestScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            bubbles.forEach(bubble => {
                const depth = bubble.dataset.depth;
                const speedX = parseFloat(bubble.dataset.speedX);

                // bubble.style.transform =
                //     `translate(${latestScrollY * speedX}px, 
                //         ${latestScrollY * 0.05 * depth}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

let time = 0;

function animate() {
    time += 0.01; //ゆっくり進める

    bubbles.forEach(bubble => {
        const depth = parseFloat(bubble.dataset.depth);
        const speedX = parseFloat(bubble.dataset.speedX);
        const baseX = parseFloat(bubble.dataset.baseX);

        //ふわっと揺らぎ
        const floatX = Math.sin(time + baseX) * 4;
        const floatY = Math.cos(time + baseX) * 6;

        bubble.style.transform = `
            translate(
                ${latestScrollY * speedX + floatX}px,
                ${latestScrollY * 0.05 * depth + floatY}px
            )
            `;
    });

    requestAnimationFrame(animate);
}

animate();

const fadeSections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, {
    threshold: 0.2
});

fadeSections.forEach(section => {
    observer.observe(section);
})