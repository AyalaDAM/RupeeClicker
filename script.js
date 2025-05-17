/* 
Features:
- Pantalla de log in para introducir nombre

En Opciones:
- Botón para mostrar todas las opciones
- Mostrar logros
- Algunos atajos u opciones útiles

En mostrar todas las opciones:
- Cambio de nombre
- Reset de rupias
- Reset de todo
- Modo turbo (todo se genera el doble de rápido)

El objetivo es conseguir la botella de zora grande y cuando se
consigue empieza a sonar dale zelda dale además de obtener un
logro final.
*/

document.addEventListener("DOMContentLoaded", function() {

/*
    Variables globales
*/
var clickCounter = 0;

const rupee = document.getElementById("rupee");
const counter = document.getElementById("counter");
var currentValue = 0;

const botTingle = document.getElementById("bot-tingle");
const botSack = document.getElementById("bot-sack");
const botCape = document.getElementById("bot-cape");
const botOcarina = document.getElementById("bot-ocarina");
const botTriforce = document.getElementById("bot-triforce");
const botGanondorfa = document.getElementById("bot-ganondorfa");

const tingle = 10;
const sack = 100;
const cape = 1000;
const ocarina = 5000;
const triforce = 10000;
const ganondorfa = 1000000;

var tinglePrice = 100;
var sackPrice = 1500;
var capePrice = 5000;
var ocarinaPrice = 25000;
var triforcePrice = 100000;
var ganondorfaPrice = 999999;

var numberTingle = 5;
var numberSack = 0;
var numberCape = 0;
var numberOcarina = 0;
var numberTriforce = 0;
var numberGanondorfa = 0;

var currentValue = parseInt(counter.textContent, 10);
var wisdom = 1;
var power = 1;
var courage = 1;
var turboMode = 1;



/*
    Login prompt
*/
    alert("It's recommended to play in fullscreen mode. You can press F11 or the fullscreen option (next to \"Achievements\") to enter fullscreen mode. You can press scape to exit fullscreen mode.");

    var name = prompt("Welcome, choose your name:");

    while (name === null || name.trim() === "") {
        name = prompt("Please, choose a valid name:");
    }

    const username = document.getElementById("username");

    function setUsername(name) {
        username.textContent = name.toString().toUpperCase() + "'S CHEST";
    }

    setUsername(name);



/*
    Sounds
*/
    let backgroundMusic;

    function playBackgroundMusic() {
        if (!backgroundMusic) {
        backgroundMusic = new Audio("assets/sounds/background_music.mp3");
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.05;
        backgroundMusic.play();
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "F11") {
            playBackgroundMusic();
        }
    });

    const fullscreenButton = document.getElementById("fullscreen");

    fullscreenButton.addEventListener("click", function() {
        playBackgroundMusic();
    });


    const rupeeSound = new Audio("assets/sounds/get_rupee.mp3");

    rupee.addEventListener("click", () => {
        rupeeSound.currentTime = 0;
        rupeeSound.volume = 0.3;
        rupeeSound.play();
    });


    const clickOptions = document.querySelectorAll(".option");
    const optionSound = new Audio("assets/sounds/click_options.mp3");

    clickOptions.forEach(option => {
        option.addEventListener("click", () => {
            optionSound.currentTime = 0;
            optionSound.volume = 0.3;
            optionSound.play();
        });
    });


    const upgrades = document.querySelectorAll(".upgrade");
    const upgradeSound = new Audio("assets/sounds/buy_upgrade.mp3");

    upgrades.forEach(option => {
        option.addEventListener("click", () => {
            upgradeSound.currentTime = 0;
            upgradeSound.volume = 0.3;
            upgradeSound.play();
        });
    });


    const bots = document.querySelectorAll(".bot");
    const botSound = new Audio("assets/sounds/buy_bot.mp3");

    bots.forEach(bot => {
        bot.addEventListener("click", () => {
            botSound.currentTime = 0;
            botSound.volume = 0.3;
            botSound.play();
        });
    });


    const dale = document.getElementById("dale");
    const daleSound = new Audio("assets/sounds/DALE_ZELDA_DALE.mp3");

    dale.addEventListener("click", () => {
        daleSound.currentTime = 0;
        daleSound.volume = 0.3;
        daleSound.play();
    });



/*
    Fullscreen mode
*/
    const element = document.documentElement;
    
    function enterFullscreen() {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    fullscreenButton.addEventListener("click", function() {
        enterFullscreen();
    });



/*
    Rupees increments
*/
    function formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(4) + " TRI.";
        if (num >= 1e9)  return (num / 1e9).toFixed(4) + " BIL.";
        if (num >= 1e6)  return (num / 1e6).toFixed(4) + " MIL";
        return num.toString();
    }

    function updateCounter() {
        counter.textContent = formatNumber(currentValue);
    }

    function clickRupee() {
        currentValue += 1 * power;
        clickCounter++;
        updateCounter();
    }

    rupee.addEventListener("click", clickRupee);

    function tingleBot() {
        currentValue += tingle * numberTingle * wisdom;
        updateCounter();
    }
    setInterval(tingleBot, 1000);

    function sackBot() {
        currentValue += sack * numberSack * wisdom;
        updateCounter();
    }
    setInterval(sackBot, 1000);

    function capeBot() {
        currentValue += cape * numberCape * wisdom;
        updateCounter();
    }
    setInterval(capeBot, 1000);

    function ocarinaBot() {
        currentValue += ocarina * numberOcarina * wisdom;
        updateCounter();
    }
    setInterval(ocarinaBot, 1000);

    function triforceBot() {
        currentValue += triforce * numberTriforce * wisdom;
        updateCounter();
    }
    setInterval(triforceBot, 1000);

    function ganondorfaBot() {
        currentValue += ganondorfa * numberGanondorfa * wisdom;
        updateCounter();
    }
    setInterval(ganondorfaBot, 1000);



/*
    Upgrade shop
*/
    const wisdomPower = document.getElementById("wisdom");
    const powerPower = document.getElementById("power");
    const couragePower = document.getElementById("courage");

    let powerBought = false;
    let wisdomBought = false;
    let courageBought = false;

    function checkUpgrades() {

        if (!powerBought && numberTingle >= 10) {
            powerPower.style.filter = 'none';
            powerPower.addEventListener("click", function buyPower() {
                power = 2;
                alert("You have bought the Power upgrade! Now every click on the rupee gets 2 rupees!");
                powerBought = true;
                powerPower.removeEventListener("click", buyPower);
            });
        }

        if (!wisdomBought && currentValue >= 25000) {
            wisdomPower.style.filter = 'none';
            wisdomPower.addEventListener("click", function buyWisdom() {
                wisdom = 2;
                alert("You have bought the Wisdom upgrade! Now all the items effects are doubled!");
                wisdomBought = true;
                wisdomPower.removeEventListener("click", buyWisdom);
            });
        }

        if (!courageBought && clickCounter >= 100) {
            couragePower.style.filter = 'none';
            couragePower.addEventListener("click", function buyCourage() {
                courage = 2;
                alert("You have bought the Courage upgrade! Now all the items are cheaper!");
                courageBought = true;
                couragePower.removeEventListener("click", buyCourage);
            });
        }
    }

    setInterval(checkUpgrades, 500);



/*
    Bots shop
*/
    botTingle.addEventListener("click", function() {

        if (currentValue >= tinglePrice) {
            numberTingle++;
            currentValue -= tinglePrice;
            updateCounter();
        } else {
            alert("Not enough rupees to buy Tingle's Help!");
        }
    });

    updateCounter();



});