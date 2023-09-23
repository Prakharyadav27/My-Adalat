// Replace with your OpenAI API key
const apiKey = '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';

document.getElementById('openMessageBox').addEventListener('click', () => {
    document.getElementById('messageBox').style.display = 'block';
});

document.getElementById('sendMessage').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    appendMessage('User', userInput);

    // Delay before making the API request to stay within rate limits
    await delay(2000); // Adjust the delay as needed

    try {
        const response = await fetchOpenAIResponse(userInput);
        const aiMessage = response.choices[0].text;
        appendMessage('AI', aiMessage);
    } catch (error) {
        console.error(error);
    }
});

function appendMessage(sender, message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatContainer.appendChild(messageElement);
}

async function fetchOpenAIResponse(userInput) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 50, // Adjust as needed
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI API');
    }

    const data = await response.json();
    return data;
}

// Function to introduce a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
