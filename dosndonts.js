const dosndonts = [
    "Watch a horror movie",
    "Eat junk food",
    "Empty your shopping cart",
    "Be alone",
    "Skip a class",
    "Write a poem",
    "Tell a joke",
    "Wear some red",
    "Drink no beer",
    "Do a prank",
    "Gossip",
    "Sing a song in public",
    "Go to the North",
    "Space out for a while",
    "Change a wall paper",
    "Sleep all day",
    "Draw eyeliner",
    "Have some avocados",
    "Listen to jazz",
];

const shuffledItems = dosndonts.sort(() => 0.5 - Math.random());

// Divide the array into dos and donts with random selections
const dosItems = shuffledItems.slice(0, 5);
const dontsItems = shuffledItems.slice(5, 10);

// Populate the dos and donts lists
const dosList = document.getElementById("dos");
const dontsList = document.getElementById("donts");

dosItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = item;
    dosList.appendChild(listItem);
});

dontsItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = item;
    dontsList.appendChild(listItem);
});