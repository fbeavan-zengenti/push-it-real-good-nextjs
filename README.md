# Zengenti Event Tool Lockdown

## Technologies

- [Next.js](https://nextjs.org/): React framework for building server-rendered applications.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling.
- [Express.js](https://expressjs.com/): Web application framework for Node.js, used here for subscription logic.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:fbeavan-zengenti/push-it-real-good-nextjs.git
   cd push-it-real-good-nextjs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## API Routes

- **POST /api/subscribe:**
  Endpoint for subscribing to notifications. Sends a POST request with JSON payload:

  ```json
  { "email": "example@example.com" }
  ```

  [TODO] allow user to unsubsribe to notifications
