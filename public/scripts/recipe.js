import { getRecipeDetails } from './getRecipeId.js';

function displayRecipeDetails(recipe) {
    const recipecontainer = document.getElementById('recipecontainer');

    const title = document.createElement('h2');
    title.textContent = recipe.label;
    recipecontainer.appendChild(title);

    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.label;
    recipecontainer.appendChild(image);

    const ingredients = document.createElement('ul');
    recipe.ingredientLines.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredients.appendChild(listItem);
    });
    recipecontainer.appendChild(ingredients);

    const instructions = document.createElement('a');
    instructions.textContent = 'Instructions';
    instructions.href = recipe.url;
    recipecontainer.appendChild(instructions);
}

const id = sessionStorage.getItem("recipe-id");
console.log("Recipe ID: " + id);

if (id) {
    getRecipeDetails(id).then(recipe => {
        if (recipe) {
            displayRecipeDetails(recipe);
        }
    });
} else {
    console.error('No recipe ID found in session storage.');
}