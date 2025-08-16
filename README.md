## FOOD COURT

This web application is designed to simplify your meal preparations.
It helps you discover new recipes, organize your ingredients, and follow step-by-step cooking instructions.

Live link: [https://food-basketz.netlify.app/meals](https://food-basketz.netlify.app/meals)

## Coding Approach

For this take-home assessment, I built a food recipe application using **React** with the following approach:

### 1. Project Setup
- Installed and configured core dependencies:
  - **TailwindCSS** for styling and utility-first design.
  - **Axios** for handling HTTP requests.
  - **React Router DOM** for client-side routing.
- Set up a reusable `axiosClient` using `axios.create()` for consistent API requests.

### 2. API Utilities
- Created a dedicated utilities file to manage API calls.
- Encapsulated all endpoint logic based on the specifications from the interview instructions page.

### 3. Home Page (Recipes Listing)
- Implemented the **recipes grid** with meal cards.
- Added **category filtering** to display meals by category.
- Integrated **local search filtering** to quickly search through already fetched meals.
- Included **sorting functionality**.

### 4. Meal Details Page
- Built a dedicated view to display detailed information about a selected meal when a recipe card is clicked.

### 5. Error Handling & Feedback
- Installed and configured **React Toastify** to provide user-friendly error notifications, especially for failed fetch requests.

### 6. Deployment
- Deployed the project to **Netlify** for easy access and review.

### 7. Refactoring & Cleanup
- Cleaned up redundant code and refactored React pages for readability, scalability, and maintainability.


## ✨ Features

- **Recipe Discovery**: Browse a wide variety of recipes based on ingredients and meal type.
- **Step-by-Step Guides**: Follow detailed instructions for each recipe.
- **Responsive Design**: A clean, intuitive interface that works seamlessly on desktop and mobile devices.

## 💻 Tech Stack

- **Library**: React.js
- **Styling**: Tailwindcss
- **State Management**: Context API
- **API**: [mealdb](https://www.themealdb.com/)
- **Version Control**: Git & Github

## 🚀 Getting Started

Ensure you have the following installed on your machine:

- Node.js (v18 or higher)
- A code editor

### Installation

1. Clone the repository
2. Install frontend dependencies
3. Run the application

The application will now be running at http://localhost:5173.

