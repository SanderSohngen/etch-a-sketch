const container = document.querySelector(".container");
for (let i = 0; i < 64 * 64; i++) {
	const element = document.createElement("div");
	element.classList.add("dot");
	container.appendChild(element);
}

const randomMode = document.querySelector("#random");
randomMode.addEventListener("click", () => {
    hightlightButton(randomMode);
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot) => {
        clearAll(dot);
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
        clearAll(dot);
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

let clearAll = (dot) => {
    const color = "#EAEAEA";
    dot.style.backgroundColor = color;
}

const clearMode = document.querySelector("#clear");
clearMode.addEventListener("click", () => {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => clearAll(dot));
})

function hightlightButton(button) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(item => 
        item.classList.remove("selected")
    );
    button.classList.add("selected");
}