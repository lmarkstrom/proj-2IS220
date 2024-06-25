import { getRecipeDetails } from './getRecipeId.js';


const recipe = sessionStorage.getItem("recipe-id");

// Fetch data from backend server
fetch('http://localhost:3000/get-reviews', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipe }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => {
    console.log('Fetched reviews for recipe:', recipe);
    console.log('Reviews:', data);
    displayReviews(data);
})
.catch(error => {
    console.error('Error fetching reviews:', error);
    alert('Failed to load reviews. Please try again.');
});



function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer'); 
    reviewsContainer.innerHTML = ''; 

    // Limit to 5 
    const reviewsToShow = reviews.slice(0, 5);

    reviewsToShow.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('container');

        if (review.text === null || review.text === undefined) {
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <h4>${review.score}/5</h4>
            `;
        } else {
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <p>${review.text}</p>
                <h4>${review.score}/5</h4>
            `;
        }

        reviewsContainer.appendChild(reviewElement);
    });
}


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

