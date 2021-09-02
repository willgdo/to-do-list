const getItem = document.getElementById("item");
const sendItem = document.querySelector(".btn-send");
const items = document.querySelector(".items");

getItem.focus();

const buildRow = () => {
	const li = document.createElement("li");
	const itemValue = document.createTextNode(getItem.value);
	li.appendChild(itemValue);
	items.appendChild(li);
	li.classList.add("margin-item");
	createButtonDelete(li);
	saveItems();
};

const buildRowLocalStorage = (item) => {
	const li = document.createElement("li");
	const itemValue = document.createTextNode(item);
	li.appendChild(itemValue);
	items.appendChild(li);
	li.classList.add("margin-item");
	createButtonDelete(li);
	saveItems();
};

const insertItem = () => {
	if (!getItem.value) return;

	buildRow();
};

const clearInput = () => {
	getItem.value = "";
	getItem.focus();
};

const createButtonDelete = (li) => {
	li.innerText += "";
	const trash = document.createElement("img");
	trash.setAttribute(
		"src",
		"https://image.flaticon.com/icons/png/512/18/18297.png"
	);
	trash.setAttribute("alt", "Delete");
	trash.setAttribute("width", "20px");
	trash.setAttribute("height", "20px");
	trash.classList.add("trash");
	li.appendChild(trash);
};

const saveItems = () => {
	const liItems = items.querySelectorAll("li");
	const listItems = [];

	for (let item of liItems) {
		let itemText = item.innerText;
		listItems.push(itemText);
	}
	
	const itemsJSON = JSON.stringify(listItems);
	localStorage.setItem('items', itemsJSON);
};

const getItemsFromLocalStorage = () => {
	const items = localStorage.getItem('items');
    if (!items) return;

    const listItems = JSON.parse(items);

    for (let item of listItems) {
        buildRowLocalStorage(item);
    }
};
getItemsFromLocalStorage();

sendItem.addEventListener("click", () => {
	insertItem();
	clearInput();
	confetti();
});

getItem.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		insertItem();
		clearInput();
		confetti();	
	}
});

document.addEventListener("click", (e) => {
	const el = e.target;

	if (el.classList.contains("trash")) {
		el.parentElement.remove();
        saveItems();
	}
});
