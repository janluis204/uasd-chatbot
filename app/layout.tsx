import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UASD Chat — Estatuto Orgánico",
  description:
    "Consulta inteligente del Estatuto Orgánico de la Universidad Autónoma de Santo Domingo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
