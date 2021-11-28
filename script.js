initializeWithSize(50);

function initializeWithSize(n) {
	const container = document.querySelector(".container");
	while (container.hasChildNodes()) container.removeChild(container.firstChild);
	for (let i = 0; i < n * n; i++) {
		const element = document.createElement("div");
		element.classList.add("dot");
		container.appendChild(element);
	}
	adjustGridSize(n, container);
}

function adjustGridSize(n, container) {
	const PixelsPerLine = 50 * 10;
	const pixelsPerDiv = PixelsPerLine / n;
	container.style.gridTemplateColumns = `repeat(${n}, ${pixelsPerDiv}px)`;
	container.style.gridTemplateRows = `repeat(${n}, ${pixelsPerDiv}px)`;
	const dots = Array.from(container.childNodes);
	dots.forEach((dot) => {
		dot.style.height = `${pixelsPerDiv}px`;
		dot.style.width = `${pixelsPerDiv}px`;
	});
}

const randomMode = document.querySelector("#random");
randomMode.addEventListener("click", () => {
	hightlightButton(randomMode);
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		dot.addEventListener("mouseover", () => {
			const hue = Math.floor(Math.random() * 360);
			dot.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
		});
	});
});

const colorMode = document.querySelector("#color");
colorMode.addEventListener("click", () => {
	hightlightButton(colorMode);
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		dot.addEventListener("mouseover", () => {
			const color = "#4F6D7A";
			dot.style.backgroundColor = color;
		});
	});
});

const eraserMode = document.querySelector("#eraser");
eraserMode.addEventListener("click", () => {
	hightlightButton(eraserMode);
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		dot.addEventListener("mouseover", () => {
			const color = "#EAEAEA";
			dot.style.backgroundColor = color;
		});
	});
});

const clearMode = document.querySelector("#clear");
clearMode.addEventListener("click", () => {
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		const color = "#EAEAEA";
		dot.style.backgroundColor = color;
	});
});

function hightlightButton(button) {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((item) => item.classList.remove("selected"));
	if(button !== null) button.classList.add("selected");
}

const particularColorMode = document.querySelector("#particularColor");
particularColorMode.addEventListener("click", () => {
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
		dot.addEventListener("mouseover", () => {
			const color = particularColorMode.value;
			dot.style.backgroundColor = color;
		});
	});
});

const gridSize = document.querySelector("#size");
gridSize.addEventListener("input", () => {
	const size = gridSize.value;
	updateLabel(size);
	initializeWithSize(size);
	hightlightButton(null)
});

function updateLabel(size) {
	const label = document.querySelector("label");
	label.textContent = `${size}x${size}`;
}
