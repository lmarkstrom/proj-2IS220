import { getRecipeDetails } from './getRecipteData.js';

const id = sessionStorage.getItem("recipe-id"); // hämtar receptet som vi valt

// Function som visar all info om receptet
function displayRecipeDetails(recipe) {
    const recipecontainer = document.getElementById('recipecontainer'); // häntar diven som vi lägger allt i

    const title = document.createElement('h2'); // skapar en rubrik
    title.textContent = recipe.label;
    recipecontainer.appendChild(title);

    const image = document.createElement('img'); // skapar en bild
    image.src = recipe.image;
    image.alt = recipe.label; // lägger bildens label som alternativ text
    recipecontainer.appendChild(image);

    const ingredients = document.createElement('ul'); // skapar en osorterad lista
    recipe.ingredientLines.forEach(ingredient => { // lägger till alla ingredienser som element i listan
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredients.appendChild(listItem);
    });
    recipecontainer.appendChild(ingredients);

    const instructions = document.createElement('a'); // skapar en länk till instruktionerna
    instructions.textContent = 'Instructions';
    instructions.href = recipe.url;
    sessionStorage.setItem("url", recipe.url); // sparar länken i en lokal variabel på sessionen
    recipecontainer.appendChild(instructions);
}

// Skapar en eventlistener för formuläret att göra en recension
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const reviewData = {};
    formData.forEach((value, key) => {  // lägger till allt i formuläret i en lista
        reviewData[key] = value;
    });

    console.log('Review submitted:', reviewData); // presentera datan från recensionen

    this.reset(); // töm formuläret
    window.location = "reviewed.html";
});

// kollar om det finns ett id
if (id) {
    getRecipeDetails(id).then(recipe => {
        if (recipe) {
            displayRecipeDetails(recipe);
        }
    });
} else {
    console.error('No recipe ID found in session storage.');
}

