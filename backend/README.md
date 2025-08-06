# Backend API

This is the backend API for the application.

## Endpoints

### Microsoft Graph API

*   `GET /microsoft/auth/outlook`: Redirects to Microsoft login for authentication.
*   `GET /microsoft/auth/outlook/callback`: Callback URL for Microsoft authentication.
*   `GET /microsoft/profile`: Fetches the user's profile from Microsoft.
*   `GET /microsoft/emails`: Fetches the user's emails from Microsoft.

### Client Request API

*   `GET /client-request`: Fetches the latest email, analyzes it, and returns structured legal metadata.

## How to run the application

1.  Install the dependencies: `npm install`
2.  Create a `.env` file and add the following environment variables:
    *   `OAUTH_CLIENT_ID`
    *   `OAUTH_CLIENT_SECRET`
    *   `OAUTH_REDIRECT_URI`
    *   `SESSION_SECRET`
    *   `GOOGLE_GEMINI_API_KEY`
3.  Start the application: `npm start` 