const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesContainer = document.getElementById("messages");

// Fetch and display messages from the backend
async function fetchMessages() {
    try {
        const response = await fetch("/messages");
        const data = await response.json();

        messagesContainer.innerHTML = ""; // Clear the container

        data.forEach((message) => {
            const messageElement = document.createElement("div");
            messageElement.className = message.sender === "You" ? "message right" : "message left";

            const text = document.createElement("div");
            text.className = "text";
            text.textContent = `[${message.timestamp}] ${message.sender}: ${message.text}`;

            messageElement.appendChild(text);
            messagesContainer.appendChild(messageElement);
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Send a new message to the backend
async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    try {
        // Get the current logged-in user
        const userResponse = await fetch("/current-user");
        const userData = await userResponse.json();

        if (!userData.username) {
            alert("You are not logged in!");
            return;
        }

        const message = {
            id: Date.now(),
            sender: userData.username,
            text: messageText,
            timestamp: new Date().toLocaleTimeString(),
        };

        // Send the message to the backend
        const response = await fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });

        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            messageInput.value = ""; // Clear input field
            fetchMessages(); // Refresh messages
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Add event listener to send button
sendButton.addEventListener("click", sendMessage);

// Fetch messages when the page loads
window.onload = fetchMessages;