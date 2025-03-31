let cars = [];
let input = document.getElementById("car-name");
let submitBtn = document.getElementById("enter");
let list = document.getElementsByTagName("ul")[0];
let icon = document.getElementById("icon");

window.onload = () => {
	window.matchMedia("(prefers-color-scheme: dark)").matches
		? (icon.href = "./icon-dark.png")
		: (icon.href = "./icon.png");
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
	list.innerHTML = "";
	for (let i = 0; i < cars.length; i++) {
		list.innerHTML += `
	<li draggable="true">
		<div>
			<div>
				<span>${cars[i]}</span>
				<span class="material-symbols-outlined" onclick="del(${i})"> delete </span>
			</div>
		</div>
	</li>`;
	}
}

function del(index) {
	cars.splice(index, 1);
	displayList();
}
