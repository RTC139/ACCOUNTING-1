document.getElementById('advisor-submit').addEventListener('click', async () => {
    const inputBox = document.getElementById('advisor-input');
    const responseBox = document.getElementById('advisor-response');
    const question = inputBox.value;

    // Clear the input box
    inputBox.value = '';

    // Show a loading message
    responseBox.textContent = 'Thinking...';

    try {
        // Send the question to the backend
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        if (data.answer) {
            responseBox.textContent = data.answer;
        } else {
            responseBox.textContent = 'Sorry, something went wrong.';
        }
    } catch (error) {
        responseBox.textContent = 'Error: Unable to connect to the server.';
    }
});