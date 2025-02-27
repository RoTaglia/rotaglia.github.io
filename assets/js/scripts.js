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
    const texts = ["analista e desenvolvedor de sistemas", "professor de história e filosofia", "aficionado por tecnologia"];
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
        ufo.style.left = "-60px";
        ufoContainer.appendChild(ufo);

        function shootLaser() {
            let shot = document.createElement("div");
            shot.classList.add("shot");

            let ufoRect = ufo.getBoundingClientRect();
            shot.style.left = `${ufoRect.left + ufoRect.width / 2}px`;
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
