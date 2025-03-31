import "./globals.css";
import Providers from "../components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div style={{ border: "2px solid red", padding: "1rem" }}>
            <p style={{ color: "red", fontWeight: "bold" }}>🔥 Providers Layout Active</p>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
