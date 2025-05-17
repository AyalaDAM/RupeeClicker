/*
En mostrar todas las opciones:
    - Cambio de nombre
    - Reset de rupias
    - Reset de todo
    - Modo turbo (a elegir el multiplicador)

Añadir que los bots estén en gris si no se pueden comprar en
lugar de que salte la alerta.

El objetivo es conseguir la botella de zora grande y cuando se
consigue empieza a sonar dale zelda dale además de obtener un
logro final.

Bugs:
    - En Chrome no se puede obtener la botella de zora grande
*/

document.addEventListener("DOMContentLoaded", function() {

/*
    Variables globales
*/
var clickCounter = 0;

const rupee = document.getElementById("rupee");
const counter = document.getElementById("counter");
currentValue = parseInt(counter.textContent, 10) || 0;

const botSound = new Audio("assets/sounds/buy_bot.mp3");
const daleSound = new Audio("assets/sounds/DALE_ZELDA_DALE.mp3");

const botTingle = document.getElementById("bot-tingle");
const botSack = document.getElementById("bot-sack");
const botCape = document.getElementById("bot-cape");
const botOcarina = document.getElementById("bot-ocarina");
const botTriforce = document.getElementById("bot-triforce");
const botGanondorfa = document.getElementById("dale");

const quantityTingle = document.getElementById("quantity-tingle");
const quantitySack = document.getElementById("quantity-sack");
const quantityCape = document.getElementById("quantity-cape");
const quantityOcarina = document.getElementById("quantity-ocarina");
const quantityTriforce = document.getElementById("quantity-triforce");
const quantityGanondorfa = document.getElementById("quantity-ganondorfa");

const tingle = 1;
const sack = 10;
const cape = 100;
const ocarina = 500;
const triforce = 1000;
const ganondorfa = 100000;

var tinglePrice = 100;
var sackPrice = 1500;
var capePrice = 5000;
var ocarinaPrice = 25000;
var triforcePrice = 100000;
var ganondorfaPrice = 999999;

var numberTingle = 3;
var numberSack = 0;
var numberCape = 0;
var numberOcarina = 0;
var numberTriforce = 0;
var numberGanondorfa = 0;

var wisdom = 1;
var power = 1;
var courage = 1;
var turboMode = 100;



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


    function playUpgradeSound() {
        const upgradeSound = new Audio("assets/sounds/buy_upgrade.mp3");

        upgradeSound.currentTime = 0;
        upgradeSound.volume = 0.3;
        upgradeSound.play();
    }


    function playBotsSound() {
        botSound.currentTime = 0;
        botSound.volume = 0.3;
        botSound.play();
    }


    function playDaleSound() {
        if (daleSound.paused) {
            backgroundMusic.pause();

            daleSound.currentTime = 0;
            daleSound.volume = 0.3;
            daleSound.play();
        }

        setTimeout(() => {
            backgroundMusic.play();
        }, 99000);
    }



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
        currentValue += 1 * power * turboMode;
        clickCounter++;
        updateCounter();
    }

    rupee.addEventListener("click", clickRupee);

    function tingleBot() {
        currentValue += tingle * numberTingle * wisdom * turboMode;
        updateCounter();
    }
    setInterval(tingleBot, 100);

    function sackBot() {
        currentValue += sack * numberSack * wisdom * turboMode;
        updateCounter();
    }
    setInterval(sackBot, 100);

    function capeBot() {
        currentValue += cape * numberCape * wisdom * turboMode;
        updateCounter();
    }
    setInterval(capeBot, 100);

    function ocarinaBot() {
        currentValue += ocarina * numberOcarina * wisdom * turboMode;
        updateCounter();
    }
    setInterval(ocarinaBot, 100);

    function triforceBot() {
        currentValue += triforce * numberTriforce * wisdom * turboMode;
        updateCounter();
    }
    setInterval(triforceBot, 100);

    function ganondorfaBot() {
        currentValue += ganondorfa * numberGanondorfa * wisdom * turboMode;
        updateCounter();
    }
    setInterval(ganondorfaBot, 100);



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

            function buyPower() {
                powerBought = true;
                playUpgradeSound();
                power = 2;
                alert("You have bought the Power upgrade! Now every click on the rupee gets 2 rupees!");
                powerPower.removeEventListener("click", buyPower);
            }

            powerPower.addEventListener("click", buyPower);

            // Cambiamos powerBought para que no añada otro listener
            powerBought = true;
        }

        // Igual con las otras dos mejoras
        if (!wisdomBought && currentValue >= 25000) {
            wisdomPower.style.filter = 'none';

            function buyWisdom() {
                wisdomBought = true;
                playUpgradeSound();
                wisdom = 2;
                alert("You have bought the Wisdom upgrade! Now all the items effects are doubled!");
                wisdomPower.removeEventListener("click", buyWisdom);
            }

            wisdomPower.addEventListener("click", buyWisdom);
            wisdomBought = true;
        }

        if (!courageBought && clickCounter >= 100) {
            couragePower.style.filter = 'none';

            function buyCourage() {
                courageBought = true;
                playUpgradeSound();
                courage = 2;
                alert("You have bought the Courage upgrade! Now all the items are cheaper!");
                couragePower.removeEventListener("click", buyCourage);
            }

            couragePower.addEventListener("click", buyCourage);
            courageBought = true;
        }
    }

    setInterval(checkUpgrades, 500);




/*
    Active bots
*/
    function updateVisualBots(botName) {
        switch (botName) {
            case "tingle":
                quantityTingle.textContent = "x " + numberTingle;
                break;
            case "sack":
                quantitySack.textContent = "x " + numberSack;
                break;
            case "cape":
                quantityCape.textContent = "x " + numberCape;
                break;
            case "ocarina":
                quantityOcarina.textContent = "x " + numberOcarina;
                break;
            case "triforce":
                quantityTriforce.textContent = "x " + numberTriforce;
                break;
            case "ganondorfa":
                quantityGanondorfa.textContent = "x " + numberGanondorfa;
                break;
        }
    }



/*
    Bots shop
*/
    botTingle.addEventListener("click", function() {

        if (currentValue >= tinglePrice) {
            playBotsSound()
            numberTingle++;
            currentValue -= tinglePrice;
            updateVisualBots("tingle");
            updateCounter();
        } else {
            alert("Not enough rupees to buy Tingle's Help!");
        }
    });

    botSack.addEventListener("click", function() {

        if (currentValue >= sackPrice) {
            playBotsSound()
            numberSack++;
            currentValue -= sackPrice;
            updateVisualBots("sack");
            updateCounter();
        } else {
            alert("Not enough rupees to buy the Big Sack!");
        }
    });

    botCape.addEventListener("click", function() {

        if (currentValue >= capePrice) {
            playBotsSound()
            numberCape++;
            currentValue -= capePrice;
            updateVisualBots("cape");
            updateCounter();
        } else {
            alert("Not enough rupees to buy the Roc'sCape!");
        }
    });

    botOcarina.addEventListener("click", function() {

        if (currentValue >= ocarinaPrice) {
            playBotsSound()
            numberOcarina++;
            currentValue -= ocarinaPrice;
            updateVisualBots("ocarina");
            updateCounter();
        } else {
            alert("Not enough rupees to buy the Ocarina!");
        }
    });

    botTriforce.addEventListener("click", function() {

        if (currentValue >= triforcePrice) {
            playBotsSound()
            numberTriforce++;
            currentValue -= triforcePrice;
            updateVisualBots("triforce");
            updateCounter();
        } else {
            alert("Not enough rupees to buy the Triforce!");
        }
    });

    botGanondorfa.addEventListener("click", function() {

        if (currentValue >= ganondorfaPrice) {
            playDaleSound()
            numberGanondorfa++;
            currentValue -= ganondorfaPrice;
            updateVisualBots("ganondorfa");
            updateCounter();
        } else {
            alert("Not enough rupees to buy Bachatita!");
        }
    });



});