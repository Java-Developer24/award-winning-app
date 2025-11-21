# Award Winning — Best Design Reveal App

A premium, cinematic single-page application for revealing award winners with 3D visuals, sequential suspense codes, and confetti celebrations.

## Features

- **First-time Visit Loader**: GoDaddy-style SVG morph animation (cached via localStorage).
- **3D Visuals**: Integrated Spline 3D scene (with graceful fallback).
- **Sequential Reveal**: Modal flow that reveals winners 1-by-1.
- **Suspense Code**: 4-digit code reveal animation with specific timing (350ms/digit).
- **Admin Upload**: Hidden UI to replace finalist data on the fly (in-memory).
- **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173`

## Configuration & Customization

### 1. Modifying Data (Permanent)
Edit the file `public/data/winners.json`. Ensure the structure matches:
```json
{
  "finalists": [
    {
      "id": 1,
      "name": "Name Here",
      "avatar": "URL_TO_IMAGE",
      "code": "1234",
      "prize": "Prize Name"
    },
    ...
  ]
}
```

### 2. Uploading Data (Temporary/Live)
1. On the main screen, click the small **Settings (Gear)** icon in the bottom right corner.
2. Upload a JSON file matching the schema above.
3. The app state updates immediately without a refresh.

### 3. Resetting the Loader
For testing purposes, you can reset the "First Visit" flag:
1. Click the Settings icon (bottom right).
2. Click "Reset First Visit Loader".
3. The page will reload and show the intro animation.

### 4. Changing the 3D Scene
Open `src/components/SplineScene.jsx` and replace the `scene` prop URL with your own exported Spline Public URL.
```jsx
<Spline scene="YOUR_NEW_SPLINE_URL" ... />
```
*Note: If the Spline scene fails to load (or WebGL is blocked), the app falls back to a CSS gradient background automatically.*

## Testing

A developer backdoor exists to skip reveal animations for quick testing:
- Press `Cmd + K` (Mac) or `Ctrl + K` (Windows) while the modal is open to instantly advance to the next step.

## Asset Credits
- Images used are from Unsplash (via source URL).
- 3D Scene is a public Spline asset (placeholder).

## Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion (Animation)
- @splinetool/react-spline (3D)
- React Confetti
