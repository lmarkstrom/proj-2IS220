import { getRecipes } from './getRecipteData.js';

// Klass som hanterar en sökning, en instance av klassen är en sökning
class search{
    // constructor som hämtar sökning och datan
    constructor() {
        const search = sessionStorage.getItem("search"); // hämtar vad användaren sökt på

        this.getData(search);
    }
    // Metod som hämtar alla recept och sedan lägger till alla på sidan
    getData(search) {
        getRecipes(search)
            .then(data => {
                this.addRecipesToPage(data); 
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }
    // Metod som lägger till alla recept på sidan
    addRecipesToPage(data) { 
        const recipes = data.hits;
        const tableBody = document.getElementById('recipe-table');

        recipes.forEach(recipeData => { // för alal recept så skapas en rad
            const recipe = recipeData.recipe;
            const row = document.createElement('tr');

            row.addEventListener('click', () => { // skapa en eventlistener för varje rad
                const recipeUri = recipe.uri;
                const recipeId = recipeUri.split('#recipe_')[1];
                this.handleRecipeClick(recipeId);  
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

    // Metod som hanterar klick på recepten i listan
    handleRecipeClick(id) {
        sessionStorage.setItem("recipe-id", id);
        window.location = "recipe.html";  
    }
}

new search(); // skapar en ny instans av search