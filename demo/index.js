import { EzSmoothScroll } from "../src";

const colors = [
    "#A1C181",
    "#619B8A",
    "#9ED0E6",
    "#B796AC",
    "#02A9EA"
]

const sections = document.querySelectorAll("section");
sections.forEach((section,index) => {
    section.style.height = `${window.innerHeight}px`;
    section.style.backgroundColor = colors[index];
})

const scrollToRender = document.querySelector("#scrollToRender");
const scrollTarget = document.querySelector("#scrollTarget");
const speed = document.querySelector("#speed");
const speedTarget = document.querySelector("#speedTarget");
const ease = document.querySelector("#ease");

document.querySelector("#scrollDown").addEventListener("click", () => {
    const target = document.querySelectorAll("section")[0].getBoundingClientRect().height;
    ezSmoothScroll.scrollTo(target);
});

document.querySelector("#btnEase").addEventListener('click', () => {
    ezSmoothScroll.destroy();
    let newEase = Number.parseFloat(ease.value);
    if(isNaN(newEase)) newEase = 0.075
    if(newEase >= 1) newEase = 0.99;
    if(newEase <= 0) newEase = 0.01;
    ease.value = newEase
    ezSmoothScroll = new EzSmoothScroll({
        container: c,
        scrollContent: s,
        ease: newEase,
        disableRaf:true
    });
})


const c = document.querySelector(".scroll-container");
const s = document.querySelector(".scroll-content");

let ezSmoothScroll = new EzSmoothScroll({
    container: c,
    scrollContent: s,
    ease: 0.075,
    disableRaf:true
});

ease.value = ezSmoothScroll.ease;

const render = () => {
    ezSmoothScroll.update();
    scrollToRender.innerHTML = Math.round(ezSmoothScroll.scrollToRender);
    scrollTarget.innerHTML = Math.round(ezSmoothScroll.scrollTarget);
    speed.innerHTML = Math.round(ezSmoothScroll.speed * 100) / 100;
    speedTarget.innerHTML = Math.round(ezSmoothScroll.speedTarget * 100) / 100;
    requestAnimationFrame(render);
}

requestAnimationFrame(render);