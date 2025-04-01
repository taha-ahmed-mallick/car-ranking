let cars = [];
let input = document.getElementById("car-name");
let submitBtn = document.getElementById("enter");
let list = document.getElementsByTagName("ul")[0];
let icon = document.getElementById("icon");

window.onload = () => {
	window.matchMedia("(prefers-color-scheme: dark)").matches
		? (icon.href = "./icon-dark.png")
		: (icon.href = "./icon.png");
	if (JSON.parse(localStorage.getItem("cars")) != null) {
		cars = JSON.parse(localStorage.getItem("cars"));
		displayList();
	}
};

input.addEventListener("keydown", (eve) => {
	if ((eve.key == "Enter" || eve.keyCode == 13) && input.value != "") {
		cars.push(input.value);
		input.value = "";
		displayList();
	}
});

submitBtn.addEventListener("click", () => {
	if (input.value != "") {
		cars.push(input.value);
		input.value = "";
		displayList();
	}
});

function displayList() {
	if (localStorage.getItem("cars") == null) {
		localStorage.setItem("cars", JSON.stringify(cars));
	} else {
		localStorage.setItem("cars", JSON.stringify(cars));
	}
	list.innerHTML = "";
	for (let i = 0; i < cars.length; i++) {
		list.innerHTML += `
	<li draggable="true" id="${i}">
		<div>
			<div>
				<span>${cars[i]}</span>
				<span class="material-symbols-outlined" onclick="del(${i})"> delete </span>
			</div>
		</div>
	</li>`;
	}
	dragFunc();
}

function del(index) {
	cars.splice(index, 1);
	displayList();
}

function dragFunc() {
	let li = document.querySelectorAll("li");
	console.log(li);
	li.forEach((li) => {
		li.addEventListener("dragstart", () => {
			li.classList.add("dragging");
		});

		li.addEventListener("dragend", () => {
			li.classList.remove("dragging");
			console.log("end", li.id, afterElement);
			let dragged = cars.splice(li.id, 1)[0];
			console.log(cars);
			if (afterElement) {
				if (afterElement > li.id) {
					cars.splice(afterElement - 1, 0, dragged);
				} else {
					cars.splice(afterElement, 0, dragged);
				}
			} else {
				cars.push(dragged);
			}
			console.log(cars);
			afterElement = null;
			displayList();
		});
	});
}

let afterElement = null;

list.addEventListener("dragover", (eve) => {
	eve.preventDefault();
	const draggable = document.querySelector(".dragging");
	const static = document.querySelectorAll("li:not(.dragging)");
	let closest = {
		element: null,
		offset: Number.NEGATIVE_INFINITY,
	};
	for (let i = 0; i < static.length; i++) {
		let boundingBox = static[i].getBoundingClientRect();
		let offset = eve.clientY - boundingBox.height / 2 - boundingBox.top;
		if (offset < 0 && offset > closest.offset) {
			closest.element = static[i];
			closest.offset = offset;
		}
	}
	if (closest.element) {
		list.insertBefore(draggable, closest.element);
		afterElement = closest.element.id;
	} else {
		list.appendChild(draggable);
		afterElement = null;
	}
});
