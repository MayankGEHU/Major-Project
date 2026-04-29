import "./globals.css";

export const metadata = {
  title: "QuantumSentinel IDS",
  description: "AI-powered Intrusion Detection System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
