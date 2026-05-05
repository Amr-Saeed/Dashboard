# Responsive Dashboard Frontend

A React + Bootstrap dashboard application built for the internship task. The app includes a Figma-inspired login flow, dashboard overview, list page, details page, REST API integration, and Docker deployment support.

## Live Project Scope

- Login page with demo authentication flow
- Dashboard page with KPI cards, activity charts, schedule, and store summaries
- Product list page with search and detail navigation
- Product details page with summary and performance metrics
- Responsive layout for desktop, tablet, and mobile
- Mock REST API using `json-server`
- Dockerized frontend and API services

## Tech Stack

- React 19
- React Router
- Bootstrap 5
- Vite
- JSON Server
- Docker and Docker Compose

## Project Structure

```text
src/
  components/    reusable UI building blocks
  context/       auth state provider
  pages/         route-level screens
  services/      API request layer
public/mock/     mock REST API database
```

## Demo Credentials

- Email: `amira@example.com`
- Password: `123456`

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the React app:

   ```bash
   npm run dev
   ```

3. Start the mock API in a separate terminal:

   ```bash
   npx json-server --watch public/mock/db.json --port 3001
   ```

4. Open:

   - Frontend: `http://localhost:5173`
   - Mock API: `http://localhost:3001`

If needed, create a `.env` file with:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

## Docker

Run the app and mock API together:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Mock API: `http://localhost:3001`

## Build For Production

```bash
npm run build
```

The production bundle is generated in `dist/`.

## Deployment Notes

You can deploy this project in two common ways:

### Vercel / Netlify

- Deploy the frontend from this repository
- Point the frontend to a hosted API by setting `VITE_API_BASE_URL`
- Host the mock API separately if you want the exact same demo backend online

### VM / Cloud Instance

- Provision a small free-tier Linux VM on AWS or GCP
- Install Docker and Docker Compose
- Clone the repository
- Run `docker compose up --build -d`
- Expose port `3000` publicly

## Video Walkthrough Checklist

- Show the login page and demo credentials
- Walk through the dashboard, list page, and details page
- Explain the `components`, `pages`, `context`, and `services` folders
- Show the Docker setup running with `docker compose up --build`
- Open the deployed public URL and test the main flows
