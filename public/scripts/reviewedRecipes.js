import { getRecipeDetails } from './getRecipeId.js';

fetch('http://localhost:3000/top-recipes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => {
    console.log('Fetched reviews for recipe:');
    console.log('Reviews:', data);
    fetchRecipeDetails(data);
})
.catch(error => {
    console.error('Error fetching reviews:', error);
    alert('Failed to load reviews. Please try again.');
});

function fetchRecipeDetails(recipes) {
    const recipeDetailsPromises = recipes.map(recipe => {
        return getRecipeDetails(recipe.recipe) 
            .then(recipeDetails => {
                return {
                    name: recipeDetails.label,
                    averageScore: recipe.average_score,
                    image: recipeDetails.image,
                    id: recipe.recipe
                };
            })
            .catch(error => {
                console.error(`Error fetching details for recipe ${recipe.recipe}:`, error);
                return null; 
            });
    });

    Promise.all(recipeDetailsPromises)
        .then(recipeDetails => {
            const filteredRecipeDetails = recipeDetails.filter(details => details !== null);
            console.log('Fetched recipe details from Edamam:', filteredRecipeDetails);
            displayRecipes(filteredRecipeDetails);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            alert('Failed to load recipe details. Please try again.');
        });
}

function displayRecipes(recipeDetails) {
    const recipesContainer = document.getElementById('recipeList');
    recipesContainer.innerHTML = '';

    recipeDetails.forEach(details => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const recipeLink = document.createElement('a');
        recipeLink.href = 'recipe.html';
        recipeLink.addEventListener('click', () => {
            sessionStorage.setItem("recipe-id", details.id);
        });

        const nameElement = document.createElement('h2');
        nameElement.textContent = details.name;

        const scoreElement = document.createElement('p');
        scoreElement.textContent = `${details.averageScore.toFixed(2)}`;

        const imageElement = document.createElement('img');
        imageElement.src = details.image;
        imageElement.alt = details.name;

        recipeLink.appendChild(nameElement);
        recipeLink.appendChild(scoreElement);
        recipeLink.appendChild(imageElement);

        recipeElement.appendChild(recipeLink);

        recipesContainer.appendChild(recipeElement);
    });
}