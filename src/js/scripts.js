document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.style.overflowX = "hidden";
});


window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");

    setTimeout(() => {
        preloader.style.transition = "opacity 0.8s ease-out";
        preloader.style.opacity = "0"; 

        setTimeout(() => {
            preloader.style.display = "none";
            content.style.display = "block"; 
            content.style.opacity = "0";
            setTimeout(() => {
                content.style.transition = "opacity 1s ease-in";
                content.style.opacity = "1";
            }, 100);
            
        }, 800); // Tempo para remover o preloader após o fade-out
    }, 1500); // Tempo que o preloader fica visível antes de começar a desaparecer
});

document.addEventListener("DOMContentLoaded", function () {
    const texts = [
        'analista e desenvolvedor de sistemas', 
        'professor de história e filosofia', 
        'aficionado por tecnologia'
    ];
    let index = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typing");

    function typeText() {
        typingElement.style.visibility = "visible";
        if (charIndex < texts[index].length) {
            typingElement.innerHTML = texts[index].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 1500);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typingElement.innerHTML = texts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            typingElement.style.visibility = "hidden";
            index = (index + 1) % texts.length;
            setTimeout(typeText, 500);
        }
    }
typeText();

function handleScroll() {
    const elementsToShow = document.querySelectorAll(".fade-in");

    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    elementsToShow.forEach((el) => {
        if (el.getBoundingClientRect().top < windowHeight - revealPoint) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", handleScroll);
handleScroll();
});

function createStars() {
    const starsContainer = document.getElementById("stars");
    const numStars = 200;
    
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("star");
        let size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        starsContainer.appendChild(star);
    }
}
createStars();

function createComets() {
    const cometsContainer = document.getElementById("comets");

    function spawnComet() {
        let comet = document.createElement("div");
        comet.classList.add("comet");

        let maxWidth = window.innerWidth <= 768 ? 50 : 100; // 50vw para mobile, 100vw para desktop
        let startX = Math.random() * maxWidth;
        

        let startY = Math.random() * 100;

        comet.style.left = `${startX}vw`;
        comet.style.top = `${startY}vh`;
        comet.style.animation = `cometFall ${Math.random() * 2 + 2}s linear forwards`;

        cometsContainer.appendChild(comet);

        setTimeout(() => {
            comet.remove();
        }, 3000);
    }

    setInterval(spawnComet, 5000); // Cria um novo cometa a cada 5 segundos
}

createComets();

function createUfo() {
    const ufoContainer = document.getElementById("ufos");

    function spawnUfo() {
        let ufo = document.createElement("div");
        ufo.classList.add("ufo");

        let startY = Math.random() * 60 + 20; 

        ufo.style.top = `${startY}vh`;
        ufo.style.left = "-5vw";
        ufoContainer.appendChild(ufo);

        function shootLaser() {
            let shot = document.createElement("div");
            shot.classList.add("shot");

            let ufoRect = ufo.getBoundingClientRect();
            let shotX = Math.min(window.innerWidth - 5, Math.max(5, ufoRect.left + ufoRect.width / 2));
shot.style.left = `${shotX}px`;
            shot.style.top = `${ufoRect.bottom}px`;

            document.body.appendChild(shot);

            setTimeout(() => {
                shot.remove();
            }, 2500);
        }

        let shotInterval = setInterval(shootLaser, 2000);

        setTimeout(() => {
            ufo.remove();
            clearInterval(shotInterval);
        }, 10000);
    }

    setInterval(spawnUfo, 16000); // Novo OVNI a cada 8 segundos
}
createUfo();

document.addEventListener("DOMContentLoaded", function () {
    function createStars(containerId) {
        const starsContainer = document.getElementById(containerId);
        if (!starsContainer) return;

        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            let star = document.createElement("div");
            star.classList.add("star");
            let size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.animationDuration = `${Math.random() * 3 + 1}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            starsContainer.appendChild(star);
        }
    }

    function createComets(containerId) {
        const cometsContainer = document.getElementById(containerId);
        if (!cometsContainer) return;

        function spawnComet() {
            let comet = document.createElement("div");
            comet.classList.add("comet");

            let startX = Math.random() * 100;
            let startY = Math.random() * 100;

            comet.style.left = `${startX}vw`;
            comet.style.top = `${startY}vh`;
            comet.style.animation = `cometFall ${Math.random() * 2 + 2}s linear forwards`;

            cometsContainer.appendChild(comet);

            setTimeout(() => {
                comet.remove();
            }, 3000);
        }

        setInterval(spawnComet, 5000);
    }

    createStars("stars-final");
    createComets("comets-final");
});

const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let score1 = 0, score2 = 0;
let gameWidth, gameHeight, paddleWidth, paddleHeight, ballRadius;

function resizeGameArea() {
    const container = document.querySelector(".content-container");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    updateSizes();
}

function updateSizes() {
    gameWidth = canvas.width;
    gameHeight = canvas.height;

    paddleWidth = gameWidth * 0.008;
    paddleHeight = gameHeight * 0.25;
    ballRadius = gameWidth * 0.007;

    paddleLeft.width = paddleWidth;
    paddleLeft.height = paddleHeight;
    paddleLeft.x = gameWidth * 0.02;
    paddleLeft.y = (gameHeight - paddleHeight) / 2;

    paddleRight.width = paddleWidth;
    paddleRight.height = paddleHeight;
    paddleRight.x = gameWidth - gameWidth * 0.02 - paddleWidth;
    paddleRight.y = (gameHeight - paddleHeight) / 2;

    ball.radius = ballRadius;
    resetBall();
}

function resetBall(winner) {
    if (winner === "left") {
        score1++;
    } else if (winner === "right") {
        score2++;
    }
    document.getElementById("score1").innerText = score1;
    document.getElementById("score2").innerText = score2;

    ball.x = gameWidth / 2;
    ball.y = gameHeight / 2;
    ball.speedX = (Math.random() > 0.5 ? 1 : -1) * (gameWidth * 0.005);
    ball.speedY = (Math.random() > 0.5 ? 1 : -1) * (gameHeight * 0.005);
}

let ball = { x: 0, y: 0, speedX: 4, speedY: 4, radius: 10 };

let paddleLeft = { x: 0, y: 0, width: 10, height: 60, speed: 0.15, errorMargin: 10 };
let paddleRight = { x: 0, y: 0, width: 10, height: 60, speed: 0.08, delay: 10, targetY: 0, errorMargin: 25 };

function drawDashedLine() {
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(gameWidth / 2, 0);
    ctx.lineTo(gameWidth / 2, gameHeight);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawElements() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    drawDashedLine();
    ctx.fillStyle = "white";
    ctx.fillRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
    ctx.fillRect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x < 0) {
        resetBall("right");
        return;
    }
    if (ball.x > gameWidth) {
        resetBall("left");
        return;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > gameHeight) {
        ball.speedY *= -1;
    }

    function checkPaddleCollision(paddle) {
        let missChance = Math.random() * paddle.errorMargin;
        return (
            ball.y > paddle.y - missChance &&
            ball.y < paddle.y + paddle.height + missChance
        );
    }

    if (ball.x - ball.radius < paddleLeft.x + paddleLeft.width) {
        if (checkPaddleCollision(paddleLeft)) {
            ball.speedX *= -1;
        } else {
            resetBall("right");
        }
    }

    if (ball.x + ball.radius > paddleRight.x) {
        if (checkPaddleCollision(paddleRight)) {
            ball.speedX *= -1;
        } else {
            resetBall("left");
        }
    }

    paddleLeft.y += (ball.y - paddleLeft.y - paddleLeft.height / 2) * paddleLeft.speed;
    paddleRight.y += (ball.y - paddleRight.y - paddleRight.height / 2) * paddleRight.speed;
}

function gameLoop() {
    update();
    drawElements();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", resizeGameArea);
resizeGameArea();
gameLoop();