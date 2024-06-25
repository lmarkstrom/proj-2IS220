import { getRecipes } from './getRecipesSearch.js';

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

        // Add event listener to the row
        row.addEventListener('click', () => {
            const recipeUri = recipe.uri;
            const recipeId = recipeUri.split('#recipe_')[1];
            handleRecipeClick(recipeId);  
        });

        // Recipe Name
        const nameCell = document.createElement('td');
        nameCell.textContent = recipe.label;
        row.appendChild(nameCell);

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

function handleRecipeClick(id) {
    console.log(id);
    sessionStorage.setItem("recipe-id", id);
    window.location = "recipe.html";  // Navigate to the recipe URL
}