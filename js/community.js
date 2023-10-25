

// Event listener for search functionality
document.getElementById("communitySearch").addEventListener("keyup", function() {
    // Keyup: when the key is released, execute function
    // Get the search input value
    let query = this.value.toLowerCase();

    // Get all community cards
    let communityCards = document.querySelectorAll(".community-card");

    // Loop through each card and check if the community name matches the search query
    communityCards.forEach(card => {
        let communityName = card.querySelector(".community-name").innerText.toLowerCase();
        if (communityName.includes(query)) {
            card.style.display = "block"; // Show the card if it matches
        } else {
            card.style.display = "none"; // Hide the card if it doesn"t match
        }
    });
});


// Function to display a specific community grid based on the clicked button
function showGrid(gridId, btnElement) {

    // Hide all grids
    const allGrids = document.querySelectorAll(".community-grid");
    allGrids.forEach(grid => {
        grid.style.visibility = "hidden";
        grid.style.opacity = "0";
        grid.style.position = "absolute";
    });

    //Hide create buttn
    const button = document.getElementById("create-community-container");
    button.style.visibility = "hidden"
    button.style.opacity = "0";

    // Show the selected grid
    const selectedGrid = document.getElementById(gridId);
    selectedGrid.style.visibility = "visible";
    selectedGrid.style.opacity = "1";
    selectedGrid.style.position = "static";

    // Set the clicked button as active
    setActiveButton(btnElement);
}
    
// Function to display the create community button when the corresponding nav button is clicked
function showCreateCommunity(btnElement) {
    // Hide all grids
    const allGrids = document.querySelectorAll(".community-grid");
    allGrids.forEach(grid => {
        grid.style.visibility = "hidden";
        grid.style.opacity = "0";
        grid.style.position = "absolute";
    });

    // Show the create community button in the middle of the screen
    const button = document.getElementById("create-community-container");
    button.style.display = "block";
    button.style.visibility = "visible";
    button.style.opacity = "1";

    // Set the clicked button as active
    setActiveButton(btnElement);
}

// Utility function to set a button as active in the community nav
function setActiveButton(btnElement) {
    // Remove the active class from all buttons in community-nav
    document.querySelectorAll(".community-nav button").forEach(btn => {
        btn.classList.remove("active");
    });

    // Add the active class to the clicked button
    btnElement.classList.add("active");
}