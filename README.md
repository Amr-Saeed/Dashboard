# Dashboard Frontend Internship Task

This project is a responsive frontend dashboard built with React, Bootstrap, Recharts, Docker, and a mock REST API. It includes a login page, dashboard page, list page, and details page.

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the React development server:

```bash
npm run dev
```

3. In a second terminal, start the mock API from the project root:

```bash
npx json-server public/mock/db.json --port 3001
```

4. Create a `.env` file in the project root if you want the frontend to call the local API directly:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

5. Open the app in the browser:

- Frontend: `http://localhost:5173`
- Mock API: `http://localhost:3001`

## Demo Account

- Email: `amr@example.com`
- Password: `123456`

## How To Build

Build the production version with:

```bash
npm run build
```

The final production files are generated in the `dist/` folder.

## How To Run With Docker

Run the frontend and mock API together with:

```bash
docker compose up --build
```

Then open:

- Frontend: `http://localhost:3000`
- Mock API: `http://localhost:3001`

## How To Deploy

### Vercel or Netlify

1. Push the project to GitHub.
2. Import the repository into Vercel or Netlify.
3. Set the build command to:

```bash
npm run build
```

4. Set the output directory to:

```bash
dist
```

5. If using an external backend, set:

```bash
VITE_API_BASE_URL=your-api-url
```

### AWS or GCP

1. Create a small VM.
2. Install Docker and Docker Compose.
3. Clone the repository.
4. Run:

```bash
docker compose up --build -d
```

5. Expose the frontend port publicly.

## Short Explanation Of Structure

```text
src/
  components/   reusable UI parts such as sidebar and layout
  context/      global auth and theme logic
  pages/        main pages like Login, Dashboard, List, and Details
  services/     API calls and data fetching logic

public/mock/
  db.json       mock REST API data used by json-server
```

## Main Technologies Used

- React
- Bootstrap
- Recharts
- Vite
- JSON Server
- Docker
- Docker Compose
