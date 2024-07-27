import { getRecipes } from './getRecipteData.js';

const search = sessionStorage.getItem("search"); // hämtar vad användaren sökt på

getData(search);

// Funktion som hämtar alla recept och sedan lägger till alla på sidan
function getData(search) {
    getRecipes(search)
        .then(data => {
            addRecipesToPage(data); 
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Funktion som lägger till alla recept på sidan
function addRecipesToPage(data) { 
    const recipes = data.hits;
    const tableBody = document.getElementById('recipe-table-body');

    recipes.forEach(recipeData => { // för alal recept så skapas en rad
        const recipe = recipeData.recipe;
        const row = document.createElement('tr');

        row.addEventListener('click', () => { // skapa en eventlistener för varje rad
            const recipeUri = recipe.uri;
            const recipeId = recipeUri.split('#recipe_')[1];
            handleRecipeClick(recipeId);  
        });

        const nameCell = document.createElement('td');
        nameCell.textContent = recipe.label;
        row.appendChild(nameCell);

        const pictureCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.label;
        pictureCell.appendChild(img);
        row.appendChild(pictureCell);

        tableBody.appendChild(row);
    });
}

// Funktion som hanterar klick på recepten i listan
function handleRecipeClick(id) {
    sessionStorage.setItem("recipe-id", id);
    window.location = "recipe.html";  
}