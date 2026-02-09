Note-Taking App

A simple full-stack Note-Taking App built with Node.js, Express, and MongoDB.
Users can create, read, update, and delete notes through a RESTful API or a simple frontend interface.

## Table of Contents

1. Features

2. Prerequisites

3. Installation & Running the App

4. Project Structure

5. API Documentation

6. Contributing

7. License


## Features

Add new notes

Edit and delete notes

View all notes

Store data in MongoDB

Simple, clean frontend interface


## Prerequisites

Before running the app, make sure you have:

Node.js
 v16+

npm

MongoDB
 (local or Atlas cloud instance)


## Installation & Running the App

1. Clone the repository:

git clone: https://github.com/cindytsy/Note-Taking-App

cd note-taking-app


2. Install dependencies

Make sure Node.js is installed, then run:

npm install


This will install all required dependencies listed in package.json.


3. Create environment variables:

Create a .env file in the project root:

MONGO_URI=mongodb+srv://cindytsy0630_db_user:Tt89211677@notetakingapp.sqqc2k0.mongodb.net/?appName=NoteTakingApp

PORT=5000


MONGO_URI: MongoDB connection string (local MongoDB or MongoDB Atlas)

PORT: Port number for the server (default is 5000)


4. Start the server:

npm start


For development with automatic reload:

npm run dev


5. Access the app:

Once the server is running, open your browser and visit:

http://localhost:5000


If the setup is successful, the API or frontend page should load correctly.


## Project Structure
note-taking-app/
├── config/
│   └── db.js            # MongoDB connection setup
├── models/
│   ├── note.js          # Note schema
│   └── user.js          # User schema
├── Controllers/
│   ├── authController.js
│   └── noteController.js
├── Middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js    # API routes for notes
├── public/
│   ├── index.html       # Frontend interface 
│   ├── login.html
│   ├── script.js
│   └── style.css
├── app.js        
├── express.js           # Main server file
├── .env                 
├── package.json
├── package-lock.json
└── README.md


## API Documentation

All endpoints are prefixed with /api/notes.

Content-Type: application/json

1. Get all notes
GET /api/notes


Response:

[
  {
    "_id": "641c0f7f5e8f4b1234567890",
    "title": "Sample Note",
    "content": "This is a note",
    "createdAt": "2026-02-07T01:23:45.678Z"
  },
  ...
]

2. Get a single note
GET /api/notes/:id


Response:

{
  "_id": "641c0f7f5e8f4b1234567890",
  "title": "Sample Note",
  "content": "This is a note",
  "createdAt": "2026-02-07T01:23:45.678Z"
}

3. Create a new note
POST /api/notes


Request Body:

{
  "title": "My Note",
  "content": "Note content here"
}


Response:

{
  "_id": "641c0f7f5e8f4b1234567890",
  "title": "My Note",
  "content": "Note content here",
  "createdAt": "2026-02-07T01:23:45.678Z"
}

4. Update a note
PUT /api/notes/:id


Request Body (partial or full update):

{
  "title": "Updated Title",
  "content": "Updated content"
}


Response:

{
  "_id": "641c0f7f5e8f4b1234567890",
  "title": "Updated Title",
  "content": "Updated content",
  "createdAt": "2026-02-07T01:23:45.678Z"
}

5. Delete a note
DELETE /api/notes/:id


Response:

{
  "message": "Note deleted successfully"
}


## Contributing

Fork the repository

Create a new branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add new feature"

Push to the branch: git push origin feature/YourFeature

Open a Pull Request


## License

This project is licensed under the MIT License.