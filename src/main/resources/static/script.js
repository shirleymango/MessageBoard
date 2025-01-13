const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesContainer = document.getElementById("messages");

// Function to display messages on the UI
function displayMessages(messages) {
    messagesContainer.innerHTML = ""; // Clear the container
    messages.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.className = "message right";

        const text = document.createElement("div");
        text.className = "text";
        text.textContent = `[${message.timestamp}] ${message.sender}: ${message.text}`;

        messageElement.appendChild(text);
        messagesContainer.appendChild(messageElement);
    });
}

// Function to fetch and display messages
async function fetchMessages() {
    try {
        const response = await fetch("/messages"); // Fetch messages from the backend
        const data = await response.json(); // Parse JSON
        displayMessages(data); // Update the UI
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Function to send a new message
async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const message = {
        id: Date.now(), // Unique ID
        sender: "You", // Sender name
        text: messageText,
        timestamp: new Date().toLocaleTimeString(), // Current time
    };

    try {
        // Send the message to the backend
        await fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });

        // Clear the input and refresh messages
        messageInput.value = "";
        fetchMessages();
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Attach event listener to the send button
sendButton.addEventListener("click", sendMessage);

// Fetch messages on page load
window.onload = fetchMessages;