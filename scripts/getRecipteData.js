const app_id = '214e3e4c'; // api användar ID 
const app_key = '98bc9840d51741e2878170b56863111a'; // api nyckel

// Funktion som hämtar recept från API:n genom att använda en söksträng
export function getRecipes(search) {
    var query = search;
    var query = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;

    return fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // returnerar genom json
        })
        .then(data => {
            return data;  // returnerar datan
        })
        .catch(error => { 
            console.error('There was a problem with the fetch operation:', error);
            throw error; 
        });
}

// Function som hämtar detaljer för ett specifikt recept från API:n
export async function getRecipeDetails(recipeId) {
    const query = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${app_id}&app_key=${app_key}`;

    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // inväntar svaret genom json
        return data.recipe; // returnerar datan
    } catch (error) { 
        console.error('Error fetching recipe details:', error);
    }
}