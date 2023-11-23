# QA Task

Thank you for considering the QA Engineer role at Planable. Please follow the steps below for the take-home task:

1. Fork the repo privately to your GitHub account.
2. Invite the author of this repo as a collaborator to your forked repo.
3. Set up the application locally.
4. Test the application for bugs, including UI/UX inconsistencies and functional issues.
5. Document your findings using any platform of your choice ( Notion, Google Docs, Markdown, etc.).
6. Commit your bug report to your repository.
   This can be the document itself or a link to the document in the README.

7. Set up the [Cypress](https://www.cypress.io/) testing framework.
8. Automate testing for these use-cases:
   - Adding items to the list
   - Editing items
   - Deleting items
9. Write tests that fail due to the bugs you identified in step 2. If you found more than three bugs, prioritize the top three.
10. Commit these tests to your repository.

11. Finally, open a pull request to the original repository with your changes.

Best of luck, and we look forward to hearing from you!

---

## Grocery List App

A simple and visually appealing Grocery List web app built using [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/)

The app allows users to add grocery items to a list, manage quantities, and update or delete items as needed.

### Prerequisites

- Node.js (v14.x or later)
- npm (v7.x or later)

### Installation

1. Clone the repo locally:
2. Navigate to the project directory and install the npm deps:

```bash
npm install
```

3. Running the App Locally
   To run the app in development mode, use the following command:

```bash
npm run dev
```

This will start the development server, and you can view the app by navigating to http://localhost:5173 in your web browser.

## Application Overview

The Grocery List Manager is an intuitive and user-friendly application that simplifies the process of organizing and managing grocery lists. Each grocery item ( **Item** ) on the list has the following attributes:

- **Name**:
  - Must contain at least one character
  - The first letter should be capitalized
- **Quantity**:
  - Should be a positive integer
- **Unit**:
  - One of the following: "units", "cups", or "pounds"

Each **Item** also includes a `completed` property, which can be either true or false. Items are classified into two categories:

1. **New Items** (`completed` is false):
   - Display an Edit button to the right
   - Do not have specific styles applied
2. **Completed Items** (`completed` is true):
   - Show an X button to the right
   - Apply a strikethrough style to the item's name, unit, and quantity

### User Interactions

Users should be able to do the following actions:

- Click on an item to toggle its `completed` state
- Use the Edit button to open an edit modal for the selected item
- Utilize the Delete button to remove an item from the list
- Press the Enter key to add or save items
- Hit the Esc key to close the modal
