import  Providers  from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>LUXOR𓂀ASWAN - Discover Egypt</title>
        <meta
          name="description"
          content="SolDelNilo is your gateway to Egypt's beauty. Explore tours, cities, and cultural experiences."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{overflowX:"hidden"}}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
