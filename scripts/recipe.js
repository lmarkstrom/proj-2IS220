import { getRecipeDetails } from './getRecipteData.js';

const id = sessionStorage.getItem("recipe-id");
console.log("Recipe ID: " + id);

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
    sessionStorage.setItem("url", recipe.url);
    recipecontainer.appendChild(instructions);
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get form data
    const formData = new FormData(this);
    const reviewData = {};
    formData.forEach((value, key) => {
        reviewData[key] = value;
    });

    console.log('Review submitted:', reviewData);

    this.reset();
    window.location = "reviewed.html";
});

if (id) {
    getRecipeDetails(id).then(recipe => {
        if (recipe) {
            displayRecipeDetails(recipe);
        }
    });
} else {
    console.error('No recipe ID found in session storage.');
}

