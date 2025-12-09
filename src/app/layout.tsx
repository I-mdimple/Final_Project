import "./globals.css";   // ⭐ REQUIRED FOR TAILWIND TO WORK ⭐

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}








