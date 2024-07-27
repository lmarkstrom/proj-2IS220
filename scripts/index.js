const searchBtn = document.getElementById('searchbutton');
const linkIcon = document.getElementById('copyLink');

function searchRecipes(){
    const search = document.getElementById('searchbar').value;
    if(search === "") return;
    sessionStorage.setItem("search", search);
    console.log(search);
    window.location.href = 'recipesSearch.html';
}



if(searchBtn) {
    searchBtn.addEventListener('click', searchRecipes);
}
if(linkIcon) {
    linkIcon.addEventListener('click', function(event){
        event.preventDefault();
        const url = sessionStorage.getItem("url");
        navigator.clipboard.writeText(url)
        .then(() => {
            alert('Text copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
}
