export const metadata = {
  title: 'Eje 360 | Volante Inmobiliario',
  description: 'Dise?ador de volante para compra/venta de inmuebles',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`body { font-family: Manrope, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial; }`}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
