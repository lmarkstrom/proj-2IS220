import { getRecipes } from './getRecipes.js';

const search = sessionStorage.getItem("search");
console.log("Searched: " + search);

getData(search);

function getData(search) {
    getRecipes(search)
        .then(data => {
            addRecipesToPage(data); 
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function addRecipesToPage(data) {
    const recipes = data.hits;
    const tableBody = document.getElementById('recipe-table-body');

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const row = document.createElement('tr');

        // Recipe Name
        const nameCell = document.createElement('td');
        nameCell.textContent = recipe.label;
        row.appendChild(nameCell);

        // Number of Ingredients
        const ingredientsCell = document.createElement('td');
        ingredientsCell.textContent = recipe.ingredientLines.length;
        row.appendChild(ingredientsCell);

        // Picture
        const pictureCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.label;
        pictureCell.appendChild(img);
        row.appendChild(pictureCell);

        // Append row to table body
        tableBody.appendChild(row);
    });
}