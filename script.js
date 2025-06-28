const towers = {
    1: document.getElementById('tower1'),
    2: document.getElementById('tower2'),
    3: document.getElementById('tower3')
};

// Speed control
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
let moveDelay = parseInt(speedRange.value);

speedRange.addEventListener('input', () => {
    moveDelay = parseInt(speedRange.value);
    speedValue.textContent = `${moveDelay}ms`;
});

// Sound
const moveSound = document.getElementById('moveSound');

// Create discs
const discs = [
    createDisc('disc1', 1),
    createDisc('disc2', 2),
    createDisc('disc3', 3),
    createDisc('disc4', 4) // Optional fourth disc
];

// Add to tower 1 initially
function resetTowers() {
    towers[1].innerHTML = '';
    towers[2].innerHTML = '';
    towers[3].innerHTML = '';
    discs.forEach(disc => {
        towers[1].appendChild(disc);
    });
}

// Create disc function
function createDisc(className, size) {
    const disc = document.createElement('div');
    disc.classList.add('disc', className);
    disc.dataset.size = size;
    return disc;
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Move disc with sound
async function moveDisc(source, target) {
    const sourceTower = towers[source];
    const targetTower = towers[target];

    const disc = sourceTower.lastElementChild;
    if (!disc) return;

    await sleep(moveDelay);
    targetTower.appendChild(disc);
    moveSound.currentTime = 0;
    moveSound.play();
}

// Tower of Hanoi recursive
async function hanoi(n, source, auxiliary, target) {
    if (n === 0) return;

    await hanoi(n - 1, source, target, auxiliary);
    await moveDisc(source, target);
    await hanoi(n - 1, auxiliary, source, target);
}

// Start function
function startHanoi() {
    resetTowers();
    hanoi(discs.length, 1, 2, 3);
}
