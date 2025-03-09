# DashDash - AI Doctor Dashboard

This project integrates a Next.js frontend dashboard with a Gradio-based AI Doctor application and a 3D Brain Segmentation model.

## Project Structure

- `frontend/` - Next.js frontend application with Clerk authentication
- `Ai_Doctor/` - Python-based AI Doctor application using Gradio, Groq, and ElevenLabs
- `backend/3d_segmentation_model/` - 3D Brain Segmentation model visualization

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- FFmpeg (for audio processing)

### Environment Variables

1. For the frontend (Next.js):
   - Create a `.env.local` file in the `frontend/` directory with your Clerk API keys
   
2. For the AI Doctor (Python):
   - Set up the `.env` file in the `Ai_Doctor/` directory with your Groq and ElevenLabs API keys

## Running the Application

### Initial Setup

```bash
# Install dependencies
npm install
cd frontend && npm install
cd backend/3d_segmentation_model && npm install
cd Ai_Doctor && pip install -r requirements.txt
```

### Option 1: Start All Servers at Once

```bash
# Start all servers
npm start
```

This will start:
- Next.js frontend on http://localhost:3000 (should open automatically in browser)
- 3D Segmentation Model on http://localhost:3001 (runs in background)

### Option 2: Start Servers Individually

#### Start the Next.js Frontend

```bash
npm run start:frontend
```

#### Start the 3D Segmentation Model

```bash
npm run start:3d-model
```

#### Start the Gradio Server

```bash
npm run start:gradio
```

### If the Browser Doesn't Open Automatically

If the browser doesn't open automatically, you can manually open it with:

```bash
npm run open-browser
```

Or simply navigate to http://localhost:3000 in your browser.

## Accessing the Application

1. The Next.js frontend should automatically open at `http://localhost:3000`
2. Sign in using Clerk authentication
3. Navigate to the dashboard to access:
   - Patient Management
   - AI Doctor (requires Gradio server running on port 7860)
   - 3D Brain Segmentation (requires 3D model server running on port 3001)

## Troubleshooting

- If you encounter port conflicts, check that no other applications are using ports 3000, 3001, or 7860
- For microphone issues with the AI Doctor, ensure your browser has permission to access the microphone
- If FFmpeg is not installed, follow the installation instructions for your operating system
- If the browser doesn't open automatically, run `npm run open-browser` or manually navigate to http://localhost:3000 