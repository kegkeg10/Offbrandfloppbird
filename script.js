import { updateBird, setupBird, getBirdRect } from "./bird.js";
import { updatePipes, setupPipes, getPassedPipesCount, getPipeRects } from "./pipe.js";

/* 1)thing belows calls handle start  2) title.classList.add('hide') hides title when key pressed */
document.addEventListener("keypress", handleStart, { once: true });
document.addEventListener("click", handleStart, { once: true })
const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");


let lastTime;

function updateLoop(time) {
if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
}
    const delta = time - lastTime;
    updateBird(delta);
    updatePipes(delta)
    if (checkLose()) return handleLose();
    if(getPassedPipesCount() > score){
        increaseScore();
    }
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}
function checkLose() {
    const birdRect = getBirdRect();
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top 
    )
}




function handleStart() {
    title.classList.add("hide");
    setupBird();
    setupPipes()
    lastTime = null;
    window.requestAnimationFrame(updateLoop);
}

function handleLose() {
    setTimeout(() => {
        title.classList.remove("hide");
        subtitle.classList.remove("hide");
        subtitle.textContent = `${getPassedPipesCount()} Pipes`;
        document.addEventListener("keypress", handleStart, { once: true });
    }, 200);
}



var score = 0;

function increaseScore() {
  score += 1;
  displayScore();
}

function displayScore() {
  document.getElementById("score").innerHTML = "Score: " + score;
}