import { getRecipeDetails } from './getRecipteData.js';

// Klass som hanterar ett valt recept, varje instance är ett recept
class Recipe {
    // constructor som laddar in id och hämtar receptet
    constructor() {
        this.id = sessionStorage.getItem("recipe-id"); // hämtar receptet som vi valt

        // kollar om det finns ett id
        if (this.id) {
            getRecipeDetails(this.id).then(recipe => {
                if (recipe) {
                    this.displayRecipeDetails(recipe);
                }
            });
        } else {
            console.error('No recipe ID found in session storage.');
        }
    }

    // Metod som visar all info om receptet
    displayRecipeDetails(recipe) {
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
}

new Recipe(); // skapar en ny instans av Recipe
