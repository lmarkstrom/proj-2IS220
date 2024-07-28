const searchBtn = document.getElementById('searchbutton'); // hämtar sökknappen i de fall vi är på index sidan
const linkIcon = document.getElementById('copyLink'); // hämtar länk ikonen i de fall vi är på reviewed sidan
const reviewForm = document.getElementById('reviewForm'); // hämtar formuläret för recensioner

// Funktion som startar en sökning av ett recept
function searchRecipes(){
    const search = document.getElementById('searchbar').value;
    if(search === "") return; // om sökningen är tom
    sessionStorage.setItem("search", search); // skapar en lokal variabel på sessionen 
    window.location.href = 'recipesSearch.html'; // byter sida
}

// kollar att searchBtn finns
if(searchBtn) {
    searchBtn.addEventListener('click', searchRecipes); // skapar en eventlistener som kallar på funktionen ovan
}
// kollar att searchBtn finns
if(linkIcon) {
    linkIcon.addEventListener('click', function(event){ // skapar en eventlistener 
        event.preventDefault();
        const url = sessionStorage.getItem("url");
        navigator.clipboard.writeText(url) // lägger till länken till användarens clipboard
        .then(() => {
            alert('Link added to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy link: ', err);
        });
    });
}
// kollar om reviewForm finns
if(reviewForm) {
    // Skapar en eventlistener för formuläret att göra en recension
    reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const reviewData = {};
    formData.forEach((value, key) => {  // lägger till allt i formuläret i en lista
        reviewData[key] = value;
    });

    console.log('Review submitted:', reviewData); // presentera datan från recensionen

    this.reset(); // töm formuläret
    window.location = "reviewed.html";
    });
}

