"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

export default function FlyerDesigner() {
  const flyerRef = useRef(null);
  const [logoUrl, setLogoUrl] = useState("/logo-placeholder.svg");

  const handleLogo = (evt) => {
    const file = evt.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogoUrl(url);
  };

  const downloadPng = async () => {
    if (!flyerRef.current) return;
    const node = flyerRef.current;
    const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 2, quality: 1 });
    const link = document.createElement("a");
    link.download = "Eje360-volante.png";
    link.href = dataUrl;
    link.click();
  };

  const downloadPdf = async () => {
    if (!flyerRef.current) return;
    const node = flyerRef.current;
    const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 2, quality: 1 });
    const jsPDF = (await import("jspdf")).default;

    // 1080x1350 px -> 216x270 mm at 127 dpi approx; we map to A4 portrait width keeping ratio
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: [810, 1013] });
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (imgProps.height * pdfW) / imgProps.width;
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfW, pdfH, undefined, "FAST");
    pdf.save("Eje360-volante.pdf");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 style={{ margin: 0 }}>Eje 360 ? Volante</h1>
        <div className="actions">
          <label className="button" style={{ cursor: "pointer" }}>
            Subir logo
            <input type="file" accept="image/*" onChange={handleLogo} style={{ display: "none" }} />
          </label>
          <button className="button" onClick={downloadPng}>Descargar PNG</button>
          <button className="button primary" onClick={downloadPdf}>Descargar PDF</button>
        </div>
      </div>

      <div className="panel preview-wrap">
        <div className="preview-inner">
          <div ref={flyerRef} className="flyer">
            <div className="flyer-inner">
              <div className="brand-row">
                <div className="brand-left">
                  <div className="logo">
                    <img src={logoUrl} alt="Logo Eje 360" />
                  </div>
                  <div className="brand-pill">Eje 360 Inmobiliaria</div>
                </div>
                <div className="badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/></svg>
                  Confianza certificada
                </div>
              </div>

              <div className="hero">
                <span className="kicker">Compra o vende tu inmueble</span>
                <h2 className="title">Movimiento inteligente,<br />resultados que s? pasan.</h2>
                <p className="subtitle">Acompa?amiento 360?: valoraci?n, marketing, visitas guiadas y cierre seguro. Transparencia y eficiencia en cada paso.</p>

                <div className="grid">
                  <div className="card">
                    <strong>Venta estrat?gica</strong>
                    <p style={{ margin: "6px 0 0", color: "#475569" }}>An?lisis comparativo, precio ?ptimo y difusi?n segmentada.</p>
                  </div>
                  <div className="card">
                    <strong>Compra sin estr?s</strong>
                    <p style={{ margin: "6px 0 0", color: "#475569" }}>Curadur?a de opciones y negociaci?n a tu favor.</p>
                  </div>
                  <div className="card">
                    <strong>Gesti?n legal</strong>
                    <p style={{ margin: "6px 0 0", color: "#475569" }}>Contratos blindados y verificaci?n documental.</p>
                  </div>
                </div>
              </div>

              <div className="footer">
                <button className="cta">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V21a1 1 0 01-1.09 1 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 013.05 3.1 1 1 0 014 2h4.09A1 1 0 019 2.65L10.91 6a1 1 0 01-.05 1L9.5 8.59a16 16 0 006 6l1.6-1.36a1 1 0 011-.06L21.35 15a1 1 0 01.65.94z" fill="#fff"/></svg>
                  Agenda una asesor?a
                </button>
                <div className="contact">+52 55 1234 5678 ? hola@eje360.com</div>
              </div>
            </div>

            {/* Decorative shapes */}
            <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width="100%" height="100%" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <circle cx="1020" cy="60" r="160" fill="url(#g1)" />
              <circle cx="-40" cy="200" r="220" fill="url(#g1)" />
              <circle cx="1040" cy="980" r="240" fill="url(#g1)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
