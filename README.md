# Quiz App

This is a simple quiz application built with Next.js and Material-UI. Users enter their Egyptian phone number, answer 10 questions one by one, and submit their answers. The admin can later retrieve the first phone number that answered all questions correctly.

## Features
- Egyptian phone number validation
- 10-question quiz, one question at a time
- User answers are stored for winner selection
- Admin endpoint to get the first winner (to be implemented)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
- `pages/index.js`: Main entry, phone number input, and quiz logic
- `pages/api/`: (To be updated) API routes for storing answers and admin access
- `src/theme.js`: Material-UI theme

## To Do
- Implement backend storage for answers
- Add admin endpoint to get the first winner
- Make questions editable via a file or admin interface
