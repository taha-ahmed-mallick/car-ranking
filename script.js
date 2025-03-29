let cars = [];
let input = document.getElementById("car-name");
let submitBtn = document.getElementById("enter");
let list = document.getElementsByTagName("ul")[0];

input.addEventListener("keydown", (eve) => {
	if ((eve.key == "Enter" || eve.keyCode == 13) && input.value != "") {
		appendList();
	}
});

submitBtn.addEventListener("click", () => {
	if (input.value != "") {
		appendList();
	}
});

function appendList() {
	cars.push(input.value);
	input.value = "";
	const listItem = `
	<li draggable="true">
		<div>
			<div>
				<span>${cars[cars.length - 1]}</span>
				<span class="material-symbols-outlined"> delete </span>
			</div>
		</div>
	</li>`;
	list.innerHTML += listItem;
}
