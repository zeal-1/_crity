const pages = [
    {
        id: 1,
        description: "Car breaks down",
        choices: [
            { text: "Fix it yourself", nextId: 2 },
            { text: "Go look for help down the road", nextId: 3 },
        ],
    },
    {
        id: 2,
        description: "You tried to fix it yourself and failed. You died.",
        choices: [],
    },
    {
        id: 3,
        description: "You decided to go look for help down the road.",
        choices: [
            { text: "Take left", nextId: 4 },
            { text: "Take right", nextId: 5 },
        ],
    },
    {
        id: 4,
        description: "You took a left and ran into an armed robbery. You died.",
        choices: [],
    },
    {
        id: 5,
        description: "You took a right and found a phone.",
        choices: [
            { text: "Call a friend", nextId: 6 },
            { text: "Call a professional", nextId: 7 },
        ],
    },
    {
        id: 6,
        description: "You called a friend, but unfortunately, they got knocked down by a bus. Phone battery dies, and you DIE!!!",
        choices: [],
    },
    {
        id: 7,
        description: "You called a professional, they came and fixed your car. You got home safely and met your family.",
        choices: [],
    },
];

function playGame() {
    let currentId = 1;
    updatePage(currentId);
}

function updatePage(currentId) {
    const currentPage = pages.find((page) => page.id === currentId);
    if (!currentPage) {
        document.getElementById("description").innerText = "Page not found, game ended unexpectedly.";
        return;
    }

    document.getElementById("description").innerText = currentPage.description;

    if (!currentPage.choices || currentPage.choices.length === 0) {
        // Game over or won
        const statusMessage = currentId === 7 ? "You won!" : "Game over. You lost.";
        document.getElementById("description").innerText += `\n${statusMessage}`;
        return;
    }

    let choicesText = "Make your choice:\n";
    currentPage.choices.forEach((choice, index) => {
        choicesText += `${index + 1}. ${choice.text}\n`;
    });

    let userChoice = parseInt(prompt(choicesText), 10);

    // Validate user input
    while (isNaN(userChoice) || userChoice < 1 || userChoice > currentPage.choices.length) {
        userChoice = parseInt(prompt(`Invalid choice. Please enter a number between 1 and ${currentPage.choices.length}:\n${choicesText}`), 10);
    }

    // Update page with the selected choice
    const selectedChoice = currentPage.choices[userChoice - 1];
    updatePage(selectedChoice.nextId);
}

document.getElementById("startButton").onclick = playGame;
