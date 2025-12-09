// Final_Project\src\app\layout.tsx

import "./globals.css"; // ⭐ REQUIRED FOR TAILWIND TO WORK ⭐
import ChatWidget from '../components/chatbot/ChatWidget.tsx'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children} {/* Renders the actual page content */}
        
        {/* 2. Integrate the Chatbot here */}
        <ChatWidget /> 
      </body>
    </html>
  );
}