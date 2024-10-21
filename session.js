document.addEventListener("DOMContentLoaded", function() {
    // Get the input element
    const inputField = document.getElementById('subscription-key');
    
    // Check if there's a saved value in localStorage and set it
    const savedValue = localStorage.getItem('lastCodeInput');
    if (savedValue) {
      inputField.value = savedValue; // Set the input field to the saved value
    }
  
    // Save the input value when the user clicks the login button
    document.getElementById('login-button').addEventListener('click', function() {
      const inputValue = inputField.value;
      localStorage.setItem('lastCodeInput', inputValue); // Save the value in localStorage
    });
  });
  