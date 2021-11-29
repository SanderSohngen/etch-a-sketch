const buttons = document.querySelector(".sidebar");
buttons.addEventListener("click", event => {
	const buttonID = event.target.id;
	paintDots(buttonID);
});

function paintDots(buttonID) {
	if (buttonID === "clear") modes[buttonID]();
	if (buttonID === "clear" || !modes[buttonID]) return;
	unhighlightAllButtons();
	hightlightButton(buttonID);
	paintAllDots(buttonID);
};

function unhighlightAllButtons() {
	const buttons = document.querySelectorAll("button");
	buttons.forEach(button => button.classList.remove("selected"));
}

function hightlightButton(buttonID) {
	if (buttonID === "particularColor") return;
	const button = document.querySelector(`#${buttonID}`);
	button.classList.add("selected");
}

function paintAllDots(buttonID) {
	const dots = document.querySelectorAll(".dot");
	dots.forEach(dot => {
		dot.addEventListener("mouseover", () => {
			const color = modes[buttonID];
			dot.style.backgroundColor = color();
		});
	});
}

const modes = {
	particularColor: getSelectedColor,
	color: getPredefinedColor,
	random: getRandomColor,
	eraser: getBackgroundColor,
	clear: clearAll,
};

function getSelectedColor() {
	const particularColorMode = document.querySelector("#particularColor");
	return particularColorMode.value;
}

function getPredefinedColor() { return "#4F6D7A"; }

function getRandomColor() {
	const hue = Math.floor(Math.random() * 360);
	return `hsl(${hue}, 100%, 50%)`;
}

function getBackgroundColor() { return "#EAEAEA"; }

function clearAll() {
	const dots = document.querySelectorAll(".dot");
	dots.forEach(dot => {
		const color = "#EAEAEA";
		dot.style.backgroundColor = color;
	});
}

const gridSize = document.querySelector("#size");
gridSize.addEventListener("input", () => {
	const size = gridSize.value;
	updateLabel(size);
	initializeWithSize(size);
	unhighlightAllButtons();
});

function updateLabel(size) {
	const label = document.querySelector("label");
	label.textContent = `${size}x${size}`;
}

function initializeWithSize(n) {
	const container = document.querySelector(".container");
	removePreviousDots(container);
	appendNewDots(container, n);
	adjustGridSize(container, n);
}

function removePreviousDots(container) {
	while (container.hasChildNodes())
		container.removeChild(container.firstChild);
}

function appendNewDots(container, n) {
	for (let i = 0; i < n * n; i++) {
		const element = document.createElement("div");
		element.classList.add("dot");
		container.appendChild(element);
	}
}

function adjustGridSize(container, n) {
	const pixelsPerDiv = calculateDivSize(n);
	formatLineSizes(container, pixelsPerDiv, n);
	formatDots(container, pixelsPerDiv);
}

function calculateDivSize(n) {
	const PixelsPerLine = 50 * 10;
	return PixelsPerLine / n;
}

function formatLineSizes(container, pixelsPerDiv, n) {
	container.style.gridTemplateColumns = `repeat(${n}, ${pixelsPerDiv}px)`;
	container.style.gridTemplateRows = `repeat(${n}, ${pixelsPerDiv}px)`;
}

function formatDots(container, pixelsPerDiv) {
	const dots = container.childNodes;
	dots.forEach((dot) => {
		dot.style.height = `${pixelsPerDiv}px`;
		dot.style.width = `${pixelsPerDiv}px`;
	});
}

initializeWithSize(32);
