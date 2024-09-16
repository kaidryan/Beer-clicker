// Variables
let beers = 0;
let beersPerClick = 1;
let beersPerSecond = 0;
let upgrades = {
    BiggerKeg: { level: 0, baseCost: 5, cost: 5, clickBonus: 1 },
    Brewery: { level: 0, baseCost: 50, cost: 50, beersPerSecondBonus: 1 },
    Factory: { level: 0, baseCost: 140, cost: 140, beersPerSecondBonus: 5 },
    MegaBrewery: { level: 0, baseCost: 390, cost: 390, beersPerSecondBonus: 20 },
    QuantumBrewery: { level: 0, baseCost: 1060, cost: 1060, beersPerSecondBonus: 100 },
    Hyperbrewery: { level: 0, baseCost: 2900, cost: 2900, clickBonus: 10, beersPerSecondBonus: 10 },
    Brewdis: { level: 0, baseCost: 7900, cost: 7900, beersPerSecondBonus: 500, effect: 'Time Warp' },
    BrewTrain: { level: 0, baseCost: 21000, cost: 21000, beersPerSecondBonus: 2000 },
    NanoBrewery: { level: 0, baseCost: 148000, cost: 148000, beersPerSecondBonus: 10000 },
    AIBrewer: { level: 0, baseCost: 401000, cost: 401000, beersPerSecondBonus: 50000 },
    InfiniteKeg: { level: 0, baseCost: 1040000, cost: 1040000, beersPerSecondBonus: 200000 },
    GalacticBrewery: { level: 0, baseCost: 2730000, cost: 2730000, beersPerSecondBonus: 1000000 },
    BeerCondenser: { level: 0, baseCost: 10000000, cost: 10000000, beersPerSecondBonus: 5000000 },
    BeerPlanet: { level: 0, baseCost: 50000000, cost: 50000000, beersPerSecondBonus: 10000000 },
    BeerMine: { level: 0, baseCost: 250000000, cost: 250000000, beersPerSecondBonus: 50000000 },
    BeerGovernment: { level: 0, baseCost: 1000000000, cost: 1000000000, beersPerSecondBonus: 100000000 },
    BeerEngine: { level: 0, baseCost: 5000000000, cost: 5000000000, beersPerSecondBonus: 500000000 },
    BeerGalaxy: { level: 0, baseCost: 15000000000, cost: 15000000000, beersPerSecondBonus: 1000000000 },
    BeerUniverse: { level: 0, baseCost: 50000000000, cost: 50000000000, beersPerSecondBonus: 5000000000 },
    TimeDistorter: { level: 0, baseCost: 200000000000, cost: 200000000000, beersPerSecondBonus: 20000000000 },
    HyperBrew: { level: 0, baseCost: 800000000000, cost: 800000000000, beersPerSecondBonus: 50000000000 },
    UltimateKeg: { level: 0, baseCost: 5000000000000, cost: 5000000000000, beersPerSecondBonus: 200000000000 }
};
// Update display function
function updateDisplay() {
    document.getElementById('beerCount').innerText = `Beers: ${formatNumber(beers)}`;
    document.getElementById('beersPerClickDisplay').innerText = `Beers per Click: ${formatNumber(beersPerClick)}`;
    document.getElementById('beersPerSecondDisplay').innerText = `Beers per Second: ${formatNumber(beersPerSecond)}`;

    const upgradesContainer = document.getElementById('upgrades');
    upgradesContainer.innerHTML = '';

    for (const [name, upgrade] of Object.entries(upgrades)) {
        const button = document.createElement('button');
        button.className = 'upgradeButton';
        button.innerText = `${name} (Level: ${upgrade.level}, Cost: ${formatNumber(upgrade.cost)}, Bonus: ${formatNumber(getUpgradeBonus(name))})`;

        let bonusType = upgrade.clickBonus ? "Click" : "Per Second";
        button.innerText += ` (${bonusType})`;

        button.onclick = () => buyUpgrade(name);

        if (upgrade.level > 0 && upgrade.cost > beers) {
            button.classList.add('disabled');
        } else if (upgrade.cost <= beers || upgrade.level > 0) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }

        upgradesContainer.appendChild(button);
    }
}

function getUpgradeBonus(name) {
    const upgrade = upgrades[name];
    if (upgrade.beersPerSecondBonus) {
        return upgrade.beersPerSecondBonus * Math.pow(2, Math.floor(upgrade.level / 5));
    } else if (upgrade.clickBonus) {
        return upgrade.clickBonus * Math.pow(2, Math.floor(upgrade.level / 5));
    }
    return 0;
}

function buyUpgrade(name) {
    const upgrade = upgrades[name];
    if (beers >= upgrade.cost) {
        beers -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = Math.ceil(upgrade.baseCost * Math.pow(1.3, upgrade.level));
        applyUpgrades();
        updateDisplay();
    }
}

function applyUpgrades() {
    beersPerClick = 1;
    beersPerSecond = 0;

    for (const [name, upgrade] of Object.entries(upgrades)) {
        if (upgrade.level > 0) {
            if (upgrade.clickBonus) {
                beersPerClick += upgrade.clickBonus * Math.pow(2, Math.floor(upgrade.level / 5));
            }
            if (upgrade.beersPerSecondBonus) {
                beersPerSecond += upgrade.beersPerSecondBonus * Math.pow(2, Math.floor(upgrade.level / 5));
            }
        }
    }
}

// Function to manually brew beer
function brewBeer() {
    beers += beersPerClick;
    updateDisplay();
}




// Format large numbers for display
function formatNumber(num) {
    if (num >= 1e36) return (num / 1e36).toFixed(3) + 'Undec';
    if (num >= 1e33) return (num / 1e33).toFixed(3) + 'Dec';
    if (num >= 1e30) return (num / 1e30).toFixed(3) + 'Non';
    if (num >= 1e27) return (num / 1e27).toFixed(3) + 'Oct';
    if (num >= 1e24) return (num / 1e24).toFixed(3) + 'Sept';
    if (num >= 1e21) return (num / 1e21).toFixed(3) + 'S';
    if (num >= 1e18) return (num / 1e18).toFixed(3) + 'Qu';
    if (num >= 1e15) return (num / 1e15).toFixed(3) + 'Q';
    if (num >= 1e12) return (num / 1e12).toFixed(3) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(3) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(3) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(3) + 'k';
    return num.toFixed(3);
}

// Function to save game data to a file
function saveGame() {
    const data = {
        beers,
        beersPerClick,
        beersPerSecond,
        upgrades
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beerClickerSave.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to load game data from a file
function loadGame(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const data = JSON.parse(reader.result);
        beers = data.beers || 0;
        beersPerClick = data.beersPerClick || 1;
        beersPerSecond = data.beersPerSecond || 0;
        upgrades = data.upgrades || {};
        applyUpgrades();
        updateDisplay();
    };
    reader.readAsText(file);
}

// Variables for random event
let eventInterval;
let gamblingButtonVisible = false; // Track if the gambling button has been shown

// Function to start the random event timer
function startRandomEvent() {
    // Start the random event checking every minute
    eventInterval = setInterval(triggerRandomEvent, 60000); // Every minute
}

// Function to trigger a random event
function triggerRandomEvent() {
    const gambleButton = document.getElementById('gambleButton');
    
    // Only show the gamble button if the event occurs
    if (Math.random() < 0.50) { // 50% chance for the event to occur
        gambleButton.style.display = 'block'; // Show the gamble button
        gamblingButtonVisible = true; // Mark the gambling button as visible
    } else {
        gambleButton.style.display = 'none'; // Ensure the gamble button is hidden if no event
        gamblingButtonVisible = false; // Mark the gambling button as not visible
    }
}

// Function to handle gambling when button is clicked
function gamble() {
    const gamblingText = document.getElementById('gamblingText');
    const gambleButton = document.getElementById('gambleButton');
    
    const isPositive = Math.random() < 0.60; // 60% chance to gain beers
    if (isPositive) {
        const reward = beers * 0.10; // 10% of the beer count
        beers += reward;
        gamblingText.innerText = `Gained ${formatNumber(reward)} beers from gambling!`;
    } else {
        const loss = beers * 0.06; // 6% of the beer count
        beers -= loss;
        gamblingText.innerText = `Lost ${formatNumber(loss)} beers from gambling!`;
    }
    updateDisplay();
    
    gamblingText.style.display = 'block'; // Show the result of the gamble
    gambleButton.style.display = 'none'; // Hide the gamble button after clicking
    
    // Hide the gambling result after a brief time
    setTimeout(() => {
        gamblingText.style.display = 'none'; // Clear the result text
    }, 15000); // 15 seconds
}

// Hide the gamble button initially
document.getElementById('gambleButton').style.display = 'none';

// Call this function when setting up the game
startRandomEvent();

// Set up the game loop
setInterval(() => {
    beers += beersPerSecond;
    updateDisplay();
}, 1000);

// Add event listeners for buttons
document.getElementById('beerButton').addEventListener('click', brewBeer);
document.getElementById('saveButton').addEventListener('click', saveGame);
document.getElementById('loadButton').addEventListener('change', loadGame);
document.getElementById('gambleButton').addEventListener('click', gamble);

setInterval(triggerRandomEvent, 60000); // Trigger random event every minute
