const buttons = document.querySelector(".sidebar");
buttons.addEventListener("click", event => {
	const button = event.target.id;
	paintDots(button);
});

const selectedColor = () => {
	const particularColorMode = document.querySelector("#particularColor");
	return particularColorMode.value;
};

const predefinedColor = () => "#4F6D7A";

const randomColor = () => {
	const hue = Math.floor(Math.random() * 360);
	return `hsl(${hue}, 100%, 50%)`;
};

const backgroundColor = () => "#EAEAEA";

const clearAll = () => {
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		const color = "#EAEAEA";
		dot.style.backgroundColor = color;
	});
};

const modes = {
	particularColor: selectedColor,
	color: predefinedColor,
	random: randomColor,
	eraser: backgroundColor,
	clear: clearAll,
};

const paintDots = (button) => {
	if (button === "clear") modes[button]();
	if (button === "clear" || !modes[button]) return;
	unhighlightAllButtons();
	hightlightButton(button);
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		dot.addEventListener("mouseover", () => {
			const color = modes[button];
			dot.style.backgroundColor = color();
		});
	});
};

function unhighlightAllButtons() {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => button.classList.remove("selected"));
}

function hightlightButton(id) {
	const button = document.querySelector(`#${id}`);
	if (id === "particularColor") return;
	button.classList.add("selected");
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
