
// Show the popup when the page loads
window.onload = function() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex'; // Show the popup
}

// Add event listener for the Accept button
document.getElementById('accept-btn').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Hide the popup
});

// Add event listener for the Decline button
document.getElementById('decline-btn').addEventListener('click', function() {
    alert("We respect your choice.");
    window.close(); // Close the window if the user declines
});


