/*
    Tested in: Firefox and Chrome.
    Screen resolutions (16:9): 1080p, 1440p.
    Platform: Windows 10 PC.
*/

document.addEventListener("DOMContentLoaded", function() {

/*
    Global variables
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

const notification = document.getElementById("achievement-notif");

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
const rupeeSound = new Audio("assets/sounds/get_rupee.mp3");
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

const tinglePriceText = document.getElementById("price-tingle");
const sackPriceText = document.getElementById("price-sack");
const capePriceText = document.getElementById("price-cape");
const ocarinaPriceText = document.getElementById("price-ocarina");
const triforcePriceText = document.getElementById("price-triforce");
const ganondorfaPriceText = document.getElementById("price-ganondorfa");

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
    Welcome message and name functionality
*/
    alert("It's recommended to play in fullscreen mode. You can press F11 or the fullscreen option (next to \"Achievements\") to enter fullscreen mode. You can press scape to exit fullscreen mode.");

    /*
        Function to set the username

        It checks if the name is null, empty, or longer than 12 characters.
        If so, it prompts the user to enter a valid name.
        The name is then displayed in uppercase followed by "'S CHEST".
    */
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
    Sounds functions and events
*/
    let backgroundMusic;

    /*
        Function to play background music when the user enters fullscreen mode
        or clicks the fullscreen button.
    */
    function playBackgroundMusic() {

        // Checks if the background music is already playing
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


    /*
        Function to play the upgrade sound. This sound is also played by other events.
    */
    function playUpgradeSound() {
        upgradeSound.currentTime = 0;
        upgradeSound.volume = 0.3;
        upgradeSound.play();
    }


    /*
        Function to play the bot sound. This sound is played when the user buys a bot.
    */
    function playBotsSound() {
        botSound.currentTime = 0;
        botSound.volume = 0.3;
        botSound.play();
    }


    /*
        Function to play the Dale sound.
        
        This sound is played when the user buys ganondorfa bot.
        If the sound is already playing, it doesn't play.
        It pauses the background music and plays the Dale sound.
        After 99 seconds, it resumes the background music.
    */
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
    Fullscreen functionality
*/
    const element = document.documentElement;
    
    /*
        Function to enter fullscreen mode.

        It checks different ways to enter the full screen mode.
    */
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
    Rupees image changing functionality
*/

    /*
        Function to change the rupee image based on the value passed.

        The value passed depends on the amount of rupees the user has.
        The function is called in the formatNumber function after some checks.
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
    Options menu functionality
*/
    /*
        Event listeners that shows the options overlay when the user clicks on the options button.
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
    Options functionality

    The options are:
        - Change name
        - Reset rupees
        - Reset all
        - Turbo mode
        - Github
*/
    /*
        Event listener that asks the user for a new name, calls the setUsername function and plays the upgrade sound.
    */
    changeNameButton.addEventListener("click", () => {
        let newName = prompt("Enter your new name:");
        setUsername(newName);
        playUpgradeSound();
        alert("Name successfully changed!");
    });

    /*
        Event listener that asks the user if they want to reset their rupees.

        If the user confirms, it resets the current value to 0, updates the
        counter and changes the rupee image to green calling the changeRupeeImage function.
    */
    resetRupeesButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset your rupees?")) {
            currentValue = 0;
            updateCounter();
            changeRupeeImage("green");
            alert("Rupees reset!");
        }
    });

    /*
        Event listener that asks the user if they want to reset everything.

        If the user confirms, it resets all the variables to their initial values,
        updates the visual bots, updates the bots availability and updates the counter.
    */
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

    /*
        Event listener that allows the user to activate turbo mode.

        It asks the user for a multiplier and updates the turbo mode variable.
        This variable multiplies all the rupees increments.
    */
    turboButton.addEventListener("click", () => {

        const value = prompt("Choose your turbo multiplier:");
        const turboValue = parseInt(value, 10);

        // Check if the value is a number
        if (!isNaN(turboValue)) {

            // If the Cheating achievement is not activated, activates it.
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

    /*
        Event listener that activates the Github achievement when the user
        clicks the Github button if it's not already activated.
    */
    githubButton.addEventListener("click", () => {
        if (!flagThank) {
            updateAchievement("thank");
        }
    });



/*
    Achievements functionality

    The achievements are:
        - First click
        - Tingle
        - Deity
        - Banker
        - Tryhard
        - Hero
        - Dale
        - Cheating
        - Thank you for playing!
*/
    /*
        Events listeners that show the achievements overlay when the user clicks on the achievements option.
    */
    document.querySelector('.option-achievements').addEventListener('click', () => {
        document.getElementById('achievements-overlay').style.display = 'flex';
    });

    document.getElementById('achievements-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'achievements-overlay') {
            document.getElementById('achievements-overlay').style.display = 'none';
        }
    });


    /*
        Function to show notifications when the user unlocks an achievement.

        It receives the text of the achievement as a parameter and updates the
        text content of the notification element.
        It shows the notification for 3 seconds and then hides it.
    */
    function showAchievementNotification(text) {

        notification.textContent = text;

        notification.classList.remove("hidden");
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
            notification.classList.add("hidden");
        }, 3000);
    }


    /*
        Function to refresh the achievements overlay.

        It checks if the user has achieved the achievement and updates the background
        color of the achievement depeding on the parameter passed.
        It also calls the showAchievementNotification function with the text of the achievement.
    */
    function updateAchievement(ach) {
        switch (ach) {
            case "first":
                flagFirstClick = true;
                achFirstClick.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: FIRST CLICK!");
                playUpgradeSound();
                break;
            case "tingle":
                flagTingle = true;
                achTingle.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: TINGLES!");
                playUpgradeSound();
                break;
            case "deity":
                flagDeity = true;
                achDeity.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: DEITY!");
                playUpgradeSound();
                break;
            case "banker":
                flagBanker = true;
                achBanker.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: BANKER!");
                playUpgradeSound();
                break;
            case "tryhard":
                flagTryhard = true;
                achTryhard.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: TRYHARD!");
                playUpgradeSound();
                break;
            case "hero":
                flagHero = true;
                achHero.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: HERO!");
                playUpgradeSound();
                break;
            case "dale":
                flagDale = true;
                achDale.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: DALE ZELDA DALE!");
                playUpgradeSound();
                break;
            case "cheating":
                flagCheating = true;
                achCheating.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: CHEATING!");
                playUpgradeSound();
                break;
            case "thank":
                flagThank = true;
                achThank.style.backgroundColor = "rgba(26, 136, 22, 0.6)";
                showAchievementNotification("ACHIEVEMENT UNLOCKED: THANK YOU FOR PLAYING!");
                playUpgradeSound();
                break;
        }
    };



/*
    Bots availability functionality
*/
    /*
        Function to update the colors of the bots if the user has enough rupees
        to buy them.
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
    Rupees increments functionality
*/
    /*
        Function to format the number of rupees if this number is too big.

        It also changes the rupee image depending on the number of rupees.
        The function is called in the updateCounter function.
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

    /*
        Function to update the counter of rupees.

        It checks if the user has achieved the banker and tryhard achievements.
        It calls the updateBotsAvailability function to update the colors of the bots.
        It also calls the refreshAchievements function to update the achievements overlay.

    */
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

    /*
        Function to obtain rupees when the user clicks on the rupee.

        It checks if the user has achieved the first click achievement.
        It increments the current value of rupees by 1 and multiplies it by the
        power and turbo mode.
        It also increments the click counter and calls the updateCounter function.
    */
    function clickRupee() {
        if (!flagFirstClick) {
            updateAchievement("first");
        }

        currentValue += 1 * power * turboMode;

        clickCounter++;
        updateCounter();
    }

    rupee.addEventListener("click", clickRupee);


    /*
        Functions to obtain certain amount of rupees every 100ms
        
        The amount of rupees obtained depends on the number of bots the user has,
        the current value that the bot provides and the wisdom power and turbo mode.
        They call the updateCounter function to update the counter.
    */
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
    Upgrade shop functionality

    The upgrades are:
        - Power
        - Wisdom
        - Courage
*/
    /*
        Variables to check if the user has activated the listeners
    */
    let powerListenerAdded = false;
    let wisdomListenerAdded = false;
    let courageListenerAdded = false;

    /*
        Function to check the hero achievement.

        It checks if the user has bought all the upgrades and if the hero achievement
        is not already activated in order to activate it.
        It calls the updateAchievement function to activate the hero achievement.
    */
    function checkHeroAchievement() {
        if (powerBought && wisdomBought && courageBought && !flagHero) {
            updateAchievement("hero");
        }
    }

    /*
        Function to check if the user can bought the upgrades.

        It checks if the user has enough rupees and if the upgrade is not already bought.
        The conditions depends of the upgrade.
        It also activates achievements if the user has not already activated them.
        It plays the upgrade sound and shows an alert with the information of the upgrade.
        It removes the listeners if the user has already bought the upgrade.
    */
    function checkUpgrades() {
        
        // Checks if the user has enought Tingle bots to buy the Power upgrade
        // and if the user has not already bought it.
        if (!powerBought && numberTingle >= 10 && !powerListenerAdded) {

            // If the user has not already activated the Tingle achievement,
            // it activates it.
            if (!flagTingle) {
                updateAchievement("tingle");
            }

            powerPower.style.filter = 'none';

            /*
                Function to buy the Power upgrade.

                It checks if the user has not already activated the Deity achievement.
                It also plays the upgrade sound and shows an alert with the information
                of the upgrade.
                It removes the listener when the user buys the upgrade.
            */
            function buyPower() {

                // If the user has not already activated the Deity achievement,
                // it activates it.
                if (!flagDeity) {
                    updateAchievement("deity");
                }

                powerBought = true;
                playUpgradeSound();
                power = 2;
                alert("You have bought the Power upgrade! Now every click on the rupee gets 2 rupees!");
                powerPower.removeEventListener("click", buyPower);
                powerListenerAdded = false;

                // Check if the user has bought all the upgrades to activate the
                // Hero achievement
                checkHeroAchievement();
            }

            powerPower.addEventListener("click", buyPower);
            powerListenerAdded = true;
        }

        // Checks if the user has enought rupees to buy the Wisdom upgrade
        // and if the user has not already bought it.
        if (!wisdomBought && currentValue >= 25000 && !wisdomListenerAdded) {
            wisdomPower.style.filter = 'none';

            /*
                Function to buy the Wisdom upgrade.

                It checks if the user has not already activated the Deity achievement.
                It also plays the upgrade sound and shows an alert with the information
                of the upgrade.
                It removes the listener when the user buys the upgrade.
            */
            function buyWisdom() {

                // If the user has not already activated the Deity achievement,
                // it activates it.
                if (!flagDeity) {
                    updateAchievement("deity");
                }

                wisdomBought = true;
                playUpgradeSound();
                wisdom = 2;
                alert("You have bought the Wisdom upgrade! Now all the items effects are doubled!");
                wisdomPower.removeEventListener("click", buyWisdom);
                wisdomListenerAdded = false;

                // Check if the user has bought all the upgrades to activate the
                // Hero achievement
                checkHeroAchievement();
            }

            wisdomPower.addEventListener("click", buyWisdom);
            wisdomListenerAdded = true;
        }

        // Checks if the user has enought rupees to buy the Courage upgrade
        // and if the user has not already bought it.
        if (!courageBought && clickCounter >= 100 && !courageListenerAdded) {
            couragePower.style.filter = 'none';

            /*
                Function to buy the Courage upgrade.

                It checks if the user has not already activated the Deity achievement.
                It also plays the upgrade sound and shows an alert with the information
                of the upgrade.
                It removes the listener when the user buys the upgrade.
            */
            function buyCourage() {

                // If the user has not already activated the Deity achievement,
                // it activates it.
                if (!flagDeity) {
                    updateAchievement("deity");
                }

                courageBought = true;
                playUpgradeSound();
                courage = 2;
                alert("You have bought the Courage upgrade! Now all the items are cheaper!");
                couragePower.removeEventListener("click", buyCourage);
                courageListenerAdded = false;

                // Update the prices of the bots
                updateBotPricesVisual();

                // Check if the user has bought all the upgrades to activate the
                // Hero achievement
                checkHeroAchievement();
            }

            couragePower.addEventListener("click", buyCourage);
            courageListenerAdded = true;
        }
    }

    setInterval(checkUpgrades, 500);





/*
    Active bots functionality

    The bots are:
        - Tingle
        - Sack
        - Cape
        - Ocarina
        - Triforce
        - Ganondorfa
*/
    /*
        Function to update the visual amount of bots.

        It updates the text content of the bot depending on the bot name passed.
        The function is called in the bots shop functions.
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
    Courage power functionality
*/
    /*
        Function to format the price of the bots.

        It formats the price to add dots every 3 digits.
    */
    function formatPriceWithDots(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    /*
        Function to update the prices of the bots.

        It updates the text content of the bot prices if the user has the courage power.
    */
    function updateBotPricesVisual() {
        tinglePriceText.textContent = formatPriceWithDots("x " + (Math.floor(tinglePrice / courage)));
        sackPriceText.textContent = formatPriceWithDots("x " + (Math.floor(sackPrice / courage)));
        capePriceText.textContent = formatPriceWithDots("x " + (Math.floor(capePrice / courage)));
        ocarinaPriceText.textContent = formatPriceWithDots("x " + (Math.floor(ocarinaPrice / courage)));
        triforcePriceText.textContent = formatPriceWithDots("x " + (Math.floor(triforcePrice / courage)));
        ganondorfaPriceText.textContent = formatPriceWithDots("x " + (Math.floor(ganondorfaPrice / courage)));
    }



/*
    Bots shop functionality
*/
    /*
        Event listeners that check if the user has enough rupees to buy the bots.

        If so, it plays the bot sound, increments the number of bots, decrements
        the current value of rupees and updates the visual amount of bots.
    */
    botTingle.addEventListener("click", function() {

        if (currentValue >= tinglePrice / courage) {
            playBotsSound()
            numberTingle++;
            currentValue -= tinglePrice;
            updateVisualBots("tingle");
            updateCounter();
            updateBotPricesVisual();
        }
    });

    botSack.addEventListener("click", function() {

        if (currentValue >= sackPrice / courage) {
            playBotsSound()
            numberSack++;
            currentValue -= sackPrice;
            updateVisualBots("sack");
            updateCounter();
            updateBotPricesVisual();
        }
    });

    botCape.addEventListener("click", function() {

        if (currentValue >= capePrice / courage) {
            playBotsSound()
            numberCape++;
            currentValue -= capePrice;
            updateVisualBots("cape");
            updateCounter();
            updateBotPricesVisual();
        }
    });

    botOcarina.addEventListener("click", function() {

        if (currentValue >= ocarinaPrice / courage) {
            playBotsSound()
            numberOcarina++;
            currentValue -= ocarinaPrice;
            updateVisualBots("ocarina");
            updateCounter();
            updateBotPricesVisual();
        }
    });

    botTriforce.addEventListener("click", function() {

        if (currentValue >= triforcePrice / courage) {
            playBotsSound()
            numberTriforce++;
            currentValue -= triforcePrice;
            updateVisualBots("triforce");
            updateCounter();
            updateBotPricesVisual();
        }
    });

    botGanondorfa.addEventListener("click", function() {

        if (currentValue >= ganondorfaPrice / courage) {

            // If the user has not already activated the Dale achievement,
            // it activates it.
            if (!flagDale) {
                updateAchievement("dale");
            }

            playDaleSound()
            numberGanondorfa++;
            currentValue -= ganondorfaPrice;
            updateVisualBots("ganondorfa");
            updateCounter();
            updateBotPricesVisual();
        }
    });
});