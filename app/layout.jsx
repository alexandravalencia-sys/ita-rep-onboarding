export const metadata = {
  title: "LEXVOYAGE • ITA & Rep Onboarding",
  description: "Elegant, step-by-step enrolment experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Premium typefaces */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
