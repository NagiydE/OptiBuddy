## OptiBuddy
OptiBuddy is an application designed to assist eyeglass wearers and opticians with a variety of tools and resources. The app includes features like a style guide for glasses, a chat assistant, tools for finding eye doctors, and the ability to save useful links.

## Features
Home Page
Greets the user with their name and displays their profile picture.
Provides quick access to key features:
Style Guide: Learn about common glasses styles and materials.
Chat with OptiBuddy: Interact with the AI assistant for guidance.
Find an Eye Doctor: Locate licensed eye doctors near you.
Saved Links: Save and manage useful resources.
Chat with OptiBuddy
Connect with OptiBuddy for troubleshooting and general guidance.
Style Guide
Browse common glasses styles (e.g., Cat-eye, Rectangle) and materials (e.g., Plastic, Metal, Titanium).
Find an Eye Doctor
A tool to search for eye doctors based on location.
Saved Links
Save links for future reference.
Add and delete links from your personalized collection.
## Technologies Used
Backend
Node.js: Backend runtime.
Express.js: Web framework for handling routes.
MongoDB: Database for storing user information and saved links.
Mongoose: ODM for MongoDB, managing the user model.
Passport.js: Authentication middleware for user login and signup.
Frontend
EJS: Template engine for rendering dynamic pages.
CSS: Custom styles for buttons, layouts, and responsiveness.

## Installation
Clone the repository:
git clone https://github.com/NagiydE/optibuddy.git
cd optibuddy
Install dependencies:
1. npm install
2. Set up your MongoDB database:
3. Ensure MongoDB is running locally or use a cloud service like MongoDB Atlas.
4. Update config/database.js with your MongoDB connection string.
5. Start the application: node server.js
6. Access the app in your browser at:
http://localhost:2021/