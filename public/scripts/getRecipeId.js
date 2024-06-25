const app_id = '214e3e4c'; 
const app_key = '98bc9840d51741e2878170b56863111a'; 

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