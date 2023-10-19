import './style.scss';

const card = document.querySelector('.card')! as HTMLDivElement;
const highlightFront = card.querySelector('.highlight-line.front')! as HTMLDivElement;
const highlightBack = card.querySelector('.highlight-line.back')! as HTMLDivElement;

const cardWidth = card.clientWidth;
const maxRotateX = 60;
const maxRotateY = 60;

let offsetRotation = 0;
let curOffsetRotation = 0;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

card.addEventListener('click', () => {
    offsetRotation = (offsetRotation + 180) % 360;
});

window.document.addEventListener('mousemove', (event) => {
    updatePosition(event);
});

function updatePosition(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function animate() {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    const fromCenterX = mouseX - halfWidth;
    const fromCenterY = mouseY - halfHeight;

    const xMultiplier = fromCenterX / halfWidth;
    const yMultiplier = fromCenterY / halfHeight;

    curOffsetRotation += (offsetRotation - curOffsetRotation) / 20;

    const rotateX = yMultiplier * maxRotateX;
    const rotateY = curOffsetRotation + xMultiplier * maxRotateY;
    const highlighterOffset = - Math.sin(rotateY / 180 * Math.PI) * cardWidth;

    highlightFront.style.transform = `
        translateX(${highlighterOffset}px)
    `;

    highlightBack.style.transform = `
        translateX(${-highlighterOffset}px)
    `;

    highlightFront.style.opacity = `${1 - yMultiplier}`;
    highlightBack.style.opacity = `${1 - yMultiplier}`;

    card.style.transform = `
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
    `;

    requestAnimationFrame(() => {
        animate();
    })
}

animate();
