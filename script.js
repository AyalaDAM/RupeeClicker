/*
Tested in: Firefox and Chrome.
Screen resolutions (16:9): 1080p, 1440p.
Platform: Windows 10 PC.
*/

/*
    Añadir funcionalidad para poder Courage (bots a mitad de precio)
*/

document.addEventListener("DOMContentLoaded", function() {

/*
    Variables globales
*/
const username = document.getElementById("username");

var clickCounter = 0;

const rupee = document.getElementById("rupee");
const counter = document.getElementById("counter");
currentValue = parseInt(counter.textContent, 10) || 0;

const changeNameButton = document.getElementById("change-name");
const resetRupeesButton = document.getElementById("reset-rupees");
const resetAllButton = document.getElementById("reset-all");
const turboButton = document.getElementById("turbo-mode");
const githubButton = document.getElementById("github");

const achFirstClick = document.getElementById("achievement-first-click");
const achTingle = document.getElementById("achievement-tingle");
const achDeity = document.getElementById("achievement-deity");
const achBanker = document.getElementById("achievement-banker");
const achTryhard = document.getElementById("achievement-tryhard");
const achHero = document.getElementById("achievement-hero");
const achDale = document.getElementById("achievement-dale");
const achCheating = document.getElementById("achievement-cheating");
const achThank = document.getElementById("achievement-thank");

var flagFirstClick = false;
var flagTingle = false;
var flagDeity = false;
var flagBanker = false;
var flagTryhard = false;
var flagHero = false;
var flagDale = false;
var flagCheating = false;
var flagThank = false;

const fullscreenButton = document.getElementById("fullscreen");
const clickOptions = document.querySelectorAll(".option");
const optionSound = new Audio("assets/sounds/click_options.mp3");
const upgradeSound = new Audio("assets/sounds/buy_upgrade.mp3");
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

var tingle = 1;
var sack = 10;
var cape = 100;
var ocarina = 500;
var triforce = 1000;
var ganondorfa = 100000;

var tinglePrice = 100;
var sackPrice = 1500;
var capePrice = 5000;
var ocarinaPrice = 25000;
var triforcePrice = 100000;
var ganondorfaPrice = 999999;

var numberTingle = 0;
var numberSack = 0;
var numberCape = 0;
var numberOcarina = 0;
var numberTriforce = 0;
var numberGanondorfa = 0;


const wisdomPower = document.getElementById("wisdom");
const powerPower = document.getElementById("power");
const couragePower = document.getElementById("courage");

var wisdom = 1;
var power = 1;
var courage = 1;
var turboMode = 1;

let powerBought = false;
let wisdomBought = false;
let courageBought = false;



/*
    Login prompt
*/
    alert("It's recommended to play in fullscreen mode. You can press F11 or the fullscreen option (next to \"Achievements\") to enter fullscreen mode. You can press scape to exit fullscreen mode.");

    function setUsername(name) {
        while (name === null || name.trim() === "" || name.length > 12) {
            if (name === null || name.trim() === "") {
                name = prompt("Please, choose a valid name:");
            } else if (name.length > 12) {
                name = prompt("Names can't be longer than 12 characters:");
            }
        }
        username.textContent = name.toString().toUpperCase() + "'S CHEST";
    }

    var name = prompt("Welcome, choose your name:");

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

    fullscreenButton.addEventListener("click", function() {
        playBackgroundMusic();
    });


    const rupeeSound = new Audio("assets/sounds/get_rupee.mp3");

    rupee.addEventListener("click", () => {
        rupeeSound.currentTime = 0;
        rupeeSound.volume = 0.3;
        rupeeSound.play();
    });


    clickOptions.forEach(option => {
        option.addEventListener("click", () => {
            optionSound.currentTime = 0;
            optionSound.volume = 0.3;
            optionSound.play();
        });
    });


    function playUpgradeSound() {
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
        if (!daleSound.paused || daleSound.currentTime > 0) {
            return;
        }

        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        daleSound.currentTime = 0;
        daleSound.volume = 0.3;
        daleSound.play();

        setTimeout(() => {
            if (backgroundMusic) {
                backgroundMusic.play();
            }
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
    Rupees image change
*/
    function changeRupeeImage(value) {
        switch (value) {
            case "green":
                rupee.style.backgroundImage = "url('assets/rupee.png')";
                break;
            case "blue":
                rupee.style.backgroundImage = "url('assets/rupee2.png')";
                break;
            case "red":
                rupee.style.backgroundImage = "url('assets/rupee3.png')";
                break;
            case "purple":
                rupee.style.backgroundImage = "url('assets/rupee4.png')";
                break;
            case "gold":
                rupee.style.backgroundImage = "url('assets/rupee5.png')";
                break;
        }
    }



/*
    Options menu
*/
    document.querySelector('.option-full').addEventListener('click', () => {
        document.getElementById('options-overlay').style.display = 'flex';
    });

    document.getElementById('options-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'options-overlay') {
            document.getElementById('options-overlay').style.display = 'none';
        }
    });



/*
    Options
*/
    changeNameButton.addEventListener("click", () => {
        let newName = prompt("Enter your new name:");

        while (newName === null || newName.trim() === "") {
            newName = prompt("Please enter a valid name:");
        }

        setUsername(newName);
        playUpgradeSound();
        alert("Name successfully changed!");
    });

    resetRupeesButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset your rupees?")) {
            currentValue = 0;
            updateCounter();
            changeRupeeImage("green");
            alert("Rupees reset!");
        }
    });

    resetAllButton.addEventListener("click", () => {
        if (confirm("⚠️ Are you sure you want to reset EVERYTHING?")) {
            clickCounter = 0;
            currentValue = 0;

            numberTingle = 0;
            numberSack = 0;
            numberCape = 0;
            numberOcarina = 0;
            numberTriforce = 0;
            numberGanondorfa = 0;

            tingle = 1;
            sack = 10;
            cape = 100;
            ocarina = 500;
            triforce = 1000;
            ganondorfa = 100000;

            power = 1;
            wisdom = 1;
            courage = 1;
            turboMode = 1;

            powerBought = false;
            wisdomBought = false;
            courageBought = false;

            powerPower.style.filter = 'grayscale(100%)';
            wisdomPower.style.filter = 'grayscale(100%)';
            couragePower.style.filter = 'grayscale(100%)';

            tinglePrice = 100;
            sackPrice = 1500;
            capePrice = 5000;
            ocarinaPrice = 25000;
            triforcePrice = 100000;
            ganondorfaPrice = 999999;

            updateVisualBots("tingle");
            updateVisualBots("sack");
            updateVisualBots("cape");
            updateVisualBots("ocarina");
            updateVisualBots("triforce");
            updateVisualBots("ganondorfa");

            updateBotsAvailability();

            updateCounter();
            changeRupeeImage("green");
        }
    });

    turboButton.addEventListener("click", () => {
        const value = prompt("Choose your turbo multiplier:");
        const turboValue = parseInt(value, 10);

        if (!isNaN(turboValue)) {
            if (!flagCheating) {
                updateAchievement("cheating");
            }

            turboMode = turboValue;
            playUpgradeSound();
            alert("Turbo mode activated x " + turboMode + "!");
        } else {
            alert("Invalid turbo value.");
        }
    });

    githubButton.addEventListener("click", () => {
        if (!flagThank) {
            updateAchievement("thank");
        }
    });



/*
    Achievements
*/
    document.querySelector('.option-achievements').addEventListener('click', () => {
        document.getElementById('achievements-overlay').style.display = 'flex';
    });

    document.getElementById('achievements-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'achievements-overlay') {
            document.getElementById('achievements-overlay').style.display = 'none';
        }
    });

    function updateAchievement(ach) {
        switch (ach) {
            case "first":
                flagFirstClick = true;
                achFirstClick.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "tingle":
                flagTingle = true;
                achTingle.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "deity":
                flagDeity = true;
                achDeity.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "banker":
                flagBanker = true;
                achBanker.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "tryhard":
                flagTryhard = true;
                achTryhard.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "hero":
                flagHero = true;
                achHero.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "dale":
                flagDale = true;
                achDale.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "cheating":
                flagCheating = true;
                achCheating.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
            case "thank":
                flagThank = true;
                achThank.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                playUpgradeSound();
                break;
        }
    };



/*
    Bots availability
*/
    function updateBotsAvailability() {
        botTingle.style.filter = currentValue >= tinglePrice ? "none" : "grayscale(100%)";
        botSack.style.filter = currentValue >= sackPrice ? "none" : "grayscale(100%)";
        botCape.style.filter = currentValue >= capePrice ? "none" : "grayscale(100%)";
        botOcarina.style.filter = currentValue >= ocarinaPrice ? "none" : "grayscale(100%)";
        botTriforce.style.filter = currentValue >= triforcePrice ? "none" : "grayscale(100%)";
        botGanondorfa.style.filter = currentValue >= ganondorfaPrice ? "none" : "grayscale(100%)";
    }



/*
    Rupees increments
*/
    function formatNumber(num) {
        if (num >= 1e12) {
            changeRupeeImage("gold");
            return (num / 1e12).toFixed(4) + " TRI.";
        }
        if (num >= 1e9) {
            changeRupeeImage("purple");
            return (num / 1e9).toFixed(4) + " BIL.";
        }
        if (num >= 1e6) {
            changeRupeeImage("red");
            return (num / 1e6).toFixed(4) + " MIL.";
        }
        if (num >= 1e3) {
            changeRupeeImage("blue");
        }
        return num.toString();
    }

    function updateCounter() {
        if (currentValue >= 1000000 && !flagBanker) {
            updateAchievement("banker");
        }

        if (currentValue >= 1000000000000 && !flagTryhard) {
            updateAchievement("tryhard");
        }

        counter.textContent = formatNumber(currentValue);
        updateBotsAvailability();
        refreshAchievements()
    }

    function clickRupee() {
        if (!flagFirstClick) {
            updateAchievement("first");
        }

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
    let powerListenerAdded = false;
    let wisdomListenerAdded = false;
    let courageListenerAdded = false;

    function checkHeroAchievement() {
        if (powerBought && wisdomBought && courageBought && !flagHero) {
            updateAchievement("hero");
        }
    }

    function checkUpgrades() {
        
        if (!powerBought && numberTingle >= 10 && !powerListenerAdded) {
            if (!flagTingle) {
                updateAchievement("tingle");
            }

            powerPower.style.filter = 'none';

            function buyPower() {
                if (!flagDeity) {
                    updateAchievement("deity");
                }

                powerBought = true;
                playUpgradeSound();
                power = 2;
                alert("You have bought the Power upgrade! Now every click on the rupee gets 2 rupees!");
                powerPower.removeEventListener("click", buyPower);
                powerListenerAdded = false;

                checkHeroAchievement();
            }

            powerPower.addEventListener("click", buyPower);
            powerListenerAdded = true;
        }

        if (!wisdomBought && currentValue >= 25000 && !wisdomListenerAdded) {
            wisdomPower.style.filter = 'none';

            function buyWisdom() {
                if (!flagDeity) {
                    updateAchievement("deity");
                }

                wisdomBought = true;
                playUpgradeSound();
                wisdom = 2;
                alert("You have bought the Wisdom upgrade! Now all the items effects are doubled!");
                wisdomPower.removeEventListener("click", buyWisdom);
                wisdomListenerAdded = false;

                checkHeroAchievement();
            }

            wisdomPower.addEventListener("click", buyWisdom);
            wisdomListenerAdded = true;
        }

        if (!courageBought && clickCounter >= 100 && !courageListenerAdded) {
            couragePower.style.filter = 'none';

            function buyCourage() {
                if (!flagDeity) {
                    updateAchievement("deity");
                }

                courageBought = true;
                playUpgradeSound();
                courage = 2;
                alert("You have bought the Courage upgrade! Now all the items are cheaper!");
                couragePower.removeEventListener("click", buyCourage);
                courageListenerAdded = false;

                checkHeroAchievement();
            }

            couragePower.addEventListener("click", buyCourage);
            courageListenerAdded = true;
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
        }
    });

    botSack.addEventListener("click", function() {

        if (currentValue >= sackPrice) {
            playBotsSound()
            numberSack++;
            currentValue -= sackPrice;
            updateVisualBots("sack");
            updateCounter();
        }
    });

    botCape.addEventListener("click", function() {

        if (currentValue >= capePrice) {
            playBotsSound()
            numberCape++;
            currentValue -= capePrice;
            updateVisualBots("cape");
            updateCounter();
        }
    });

    botOcarina.addEventListener("click", function() {

        if (currentValue >= ocarinaPrice) {
            playBotsSound()
            numberOcarina++;
            currentValue -= ocarinaPrice;
            updateVisualBots("ocarina");
            updateCounter();
        }
    });

    botTriforce.addEventListener("click", function() {

        if (currentValue >= triforcePrice) {
            playBotsSound()
            numberTriforce++;
            currentValue -= triforcePrice;
            updateVisualBots("triforce");
            updateCounter();
        }
    });

    botGanondorfa.addEventListener("click", function() {

        if (currentValue >= ganondorfaPrice) {
            if (!flagDale) {
                updateAchievement("dale");
            }
            playDaleSound()
            numberGanondorfa++;
            currentValue -= ganondorfaPrice;
            updateVisualBots("ganondorfa");
            updateCounter();
        }
    });



});