// Form submission handling
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(this);
    const reviewData = {};
    formData.forEach((value, key) => {
        reviewData[key] = value;
    });

    // Example of what to do with the data (you can replace this with your own logic)
    console.log('Review submitted:', reviewData);
    submitReview();

    // Optionally, clear the form after submission
    this.reset();
});


function submitReview() {
    const recipe = sessionStorage.getItem("recipe-id");
    const name = document.getElementById('name').value;
    const score = document.getElementById('rating').value;
    const text = document.getElementById('comment').value;
    console.log('Review submitted:', recipe, name, score, text);

    // Send data to backend server
    fetch('http://localhost:3000/submit-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe, name, score, text }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Review submit:', recipe);
        console.log('Review submitted:', data);
        alert('Review submitted successfully!');
        document.getElementById('reviewForm').reset(); // Optionally reset form
    })
    .catch(error => {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
    });
}