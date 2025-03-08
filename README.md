# DashDash - AI Doctor Dashboard

This project integrates a Next.js frontend dashboard with a Gradio-based AI Doctor application.

## Project Structure

- `frontend/` - Next.js frontend application with Clerk authentication
- `Ai_Doctor/` - Python-based AI Doctor application using Gradio, Groq, and ElevenLabs

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- Pipenv (for Python dependency management)

### Environment Variables

1. For the frontend (Next.js):
   - Create a `.env.local` file in the `frontend/` directory with your Clerk API keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

2. For the AI Doctor (Python):
   - Set the following environment variables:
   ```
   GROQ_API_KEY=your_groq_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

### Running the Application

#### Step 1: Start the Gradio Server

1. Navigate to the `Ai_Doctor` directory:
   ```
   cd Ai_Doctor
   ```

2. Install dependencies:
   ```
   pipenv install
   ```

3. Activate the virtual environment:
   ```
   pipenv shell
   ```

4. Run the Gradio server:
   ```
   python run_gradio_server.py
   ```

The Gradio server will start at `http://localhost:7860`.

#### Step 2: Start the Next.js Frontend

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

The Next.js frontend will start at `http://localhost:3000`.

#### Step 3: Access the Dashboard

1. Open your browser and go to `http://localhost:3000`
2. Sign in using Clerk authentication
3. Navigate to the dashboard to access the AI Doctor interface

## Features

- Secure authentication with Clerk
- AI Doctor with speech recognition and image analysis
- Text-to-speech response from the AI Doctor
- Modern dashboard interface

## Troubleshooting

- If the Gradio iframe doesn't load, ensure the Gradio server is running at `http://localhost:7860`
- Check browser console for any CORS-related errors
- Verify that all required API keys are set correctly in the environment variables 