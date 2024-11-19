
// Ensure the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    console.log("Main.js loaded successfully!");
  
    // Chat Feature Logic
    const chatForm = document.getElementById("chatForm");
    const chatMessages = document.getElementById("messages");
  
    if (chatForm && chatMessages) {
      chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const messageInput = chatForm.querySelector("input[name='message']");
        const message = messageInput.value.trim();
  
        if (message) {
          // Display the user's message in the chat window
          const userMessage = document.createElement("li");
          userMessage.textContent = `You: ${message}`;
          chatMessages.appendChild(userMessage);
  
          // Send the message to the server
          try {
            const response = await fetch("/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message }),
            });
  
            const data = await response.json();
  
            // Display the response from the server
            const botMessage = document.createElement("li");
            botMessage.textContent = `OptiBuddy: ${data.response || "Sorry, something went wrong."}`;
            chatMessages.appendChild(botMessage);
          } catch (error) {
            console.error("Error communicating with server:", error);
          }
  
          // Clear the input field
          messageInput.value = "";
        }
      });
    }
  
    // Appearance Toggle Logic
    const appearanceForm = document.querySelector("form[action='/appearance/toggle']");
    if (appearanceForm) {
      appearanceForm.addEventListener("submit", (event) => {
        const mode = event.submitter.value; // Gets the value of the clicked button
        console.log(`Switching to ${mode} mode.`);
      });
    }
  
    // Language Selection Logic
    const languageForm = document.querySelector("form[action='/language']");
    if (languageForm) {
      languageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const selectedLanguage = languageForm.querySelector("input[name='language']:checked").value;
        console.log(`Language selected: ${selectedLanguage}`);
  
        // Send the selected language to the server
        fetch("/language", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: selectedLanguage }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Language preference updated:", data);
          })
          .catch((error) => console.error("Error updating language preference:", error));
      });
    }
  
    // Delete Account Confirmation Logic
    const deleteForm = document.querySelector("form[action='/delete']");
    if (deleteForm) {
      deleteForm.addEventListener("submit", (event) => {
        const confirmation = event.submitter.value; // 'yes' or 'no'
        if (confirmation === "yes" && !confirm("Are you sure you want to delete your account?")) {
          event.preventDefault(); // Prevent form submission if user cancels
        }
      });
    }
  });
  