document.getElementById('sendButton').addEventListener('click', sendMessage);

async function fetchMessages() {
    const response = await fetch('http://localhost:8080/messages');
    const data = await response.json();

    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';

    data.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.className = message.sender === 'You' ? 'message right' : 'message left';

        const avatar = document.createElement('img');
        avatar.src = message.avatar;
        avatar.className = 'avatar';

        const text = document.createElement('div');
        text.className = 'text';
        text.textContent = `[${message.timestamp}] ${message.sender}: ${message.text}`;

        messageElement.appendChild(avatar);
        messageElement.appendChild(text);
        messagesContainer.appendChild(messageElement);
    });
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText === '') return;

    const message = {
        id: Date.now(),
        sender: 'You',
        avatar: 'https://path-to-your-avatar.png',
        timestamp: new Date().toLocaleTimeString(),
        text: messageText
    };

    await fetch('http://localhost:8080/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });

    fetchMessages();
    input.value = '';
}

window.onload = fetchMessages;