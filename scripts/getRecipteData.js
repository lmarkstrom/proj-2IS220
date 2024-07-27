const app_id = '214e3e4c'; 
const app_key = '98bc9840d51741e2878170b56863111a'; 

export function getRecipes(search) {
    var query = search;
    var endpoint = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;

    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data; 
        })
        .catch(error => { 
            console.error('There was a problem with the fetch operation:', error);
            throw error; 
        });
}

export async function getRecipeDetails(recipeId) {
    const apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${app_id}&app_key=${app_key}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.recipe;
    } catch (error) { 
        console.error('Error fetching recipe details:', error);
    }
}