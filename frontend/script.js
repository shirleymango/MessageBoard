document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText === '') return;

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message right'; // Assume it's your message for now

    const avatar = document.createElement('img');
    avatar.src = 'https://path-to-your-avatar.png'; // Replace with avatar image URL
    avatar.className = 'avatar';

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = messageText;

    messageElement.appendChild(avatar);
    messageElement.appendChild(text);

    // Append message to chat
    document.getElementById('messages').appendChild(messageElement);

    // Clear input
    input.value = '';

    // Simulate receiving a message
    setTimeout(receiveMessage, 1000);
}

function receiveMessage() {
    const messageElement = document.createElement('div');
    messageElement.className = 'message left';

    const avatar = document.createElement('img');
    avatar.src = 'https://path-to-other-avatar.png'; // Replace with avatar image URL
    avatar.className = 'avatar';

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = "This is a reply message.";

    messageElement.appendChild(avatar);
    messageElement.appendChild(text);

    // Append message to chat
    document.getElementById('messages').appendChild(messageElement);
}