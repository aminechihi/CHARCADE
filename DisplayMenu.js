document.getElementById('subscription-btn').addEventListener('click', function() {
    // Hide username and password fields
    document.getElementById('username-group').style.display = 'none';
    document.getElementById('password-group').style.display = 'none';

    // Show subscription key input field and ensure it's at the top
    const subscriptionGroup = document.getElementById('subscription-group');
    subscriptionGroup.style.display = 'block';

    // Reorder elements to position the subscription key first
    const formColumn = document.querySelector('.form-column');
    formColumn.prepend(subscriptionGroup);

    // Show purchase button (always visible) and back button
    document.getElementById('purchase-btn').style.display = 'block';
    document.getElementById('back-btn').style.display = 'block';

    // Hide the subscription button
    document.getElementById('subscription-btn').style.display = 'none';
});

document.getElementById('back-btn').addEventListener('click', function() {
    // Show username and password fields
    document.getElementById('username-group').style.display = 'block';
    document.getElementById('password-group').style.display = 'block';

    // Hide subscription key input field
    document.getElementById('subscription-group').style.display = 'none';

    // Show the subscription button again
    document.getElementById('subscription-btn').style.display = 'block';

    // Hide the back button
    document.getElementById('back-btn').style.display = 'none';
});
