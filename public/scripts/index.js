const searchBtn = document.getElementById('searchbutton');

function searchRecipes(){
    const search = document.getElementById('searchbar').value;
    if(search === "") return;
    sessionStorage.setItem("search", search);
    console.log(search);
    window.location.href = 'recipesSearch.html';
}

searchBtn.addEventListener('click', searchRecipes);