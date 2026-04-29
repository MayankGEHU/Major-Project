import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";

// Patch autoTable onto jsPDF instances (required for v5)
applyPlugin(jsPDF);

const LABEL_MAP = {
  "0":"BENIGN","1":"DDoS","2":"DoS Hulk","3":"FTP-Patator",
  "4":"PortScan","5":"SSH-Patator","6":"Web Attack","7":"DoS GoldenEye",
  "8":"DoS Slowloris","9":"Bot","10":"Web Attack","11":"SQL Injection",
  "12":"SQL Injection","13":"Infiltration","14":"Heartbleed",
};
const resolveLabel = (raw) => (raw ? (LABEL_MAP[String(raw)] ?? raw) : "Unknown");

const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const sevColor = (sev) => {
  switch ((sev || "").toUpperCase()) {
    case "CRITICAL": return [220, 38, 38];
    case "HIGH":     return [234, 88, 12];
    case "MEDIUM":   return [202, 138, 4];
    case "LOW":      return [22, 163, 74];
    default:         return [120, 120, 120];
  }
};

/**
 * generateReport({ stats, alerts, fromDate, toDate })
 */
export const generateReport = ({ stats, alerts = [], fromDate, toDate }) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W      = doc.internal.pageSize.getWidth();
  const margin = 14;

  // ── Header ────────────────────────────────────────────────────────────────
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, W, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("QuantumSentinel IDS", margin, 12);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("AI-powered Intrusion Detection System", margin, 19);

  const rangeLabel = fromDate && toDate
    ? `Report period: ${fromDate}  →  ${toDate}`
    : `Generated: ${new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })}`;
  doc.setTextColor(180, 180, 180);
  doc.text(rangeLabel, W - margin, 19, { align: "right" });

  // ── Summary ───────────────────────────────────────────────────────────────
  let y = 36;
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", margin, y);
  y += 4;

  doc.autoTable({
    startY: y,
    head:   [["Metric", "Value"]],
    body:   [
      ["Total Detections",  (stats?.total_detections  ?? 0).toLocaleString()],
      ["Total Threats",     (stats?.total_threats     ?? 0).toLocaleString()],
      ["Network Events",    (stats?.network_detections  ?? 0).toLocaleString()],
      ["Endpoint Events",   (stats?.endpoint_detections ?? 0).toLocaleString()],
      ["Critical",          (stats?.critical_count ?? 0).toLocaleString()],
      ["High",              (stats?.high_count     ?? 0).toLocaleString()],
      ["Medium",            (stats?.medium_count   ?? 0).toLocaleString()],
      ["Low",               (stats?.low_count      ?? 0).toLocaleString()],
    ],
    margin:               { left: margin, right: margin },
    styles:               { fontSize: 9, cellPadding: 3 },
    headStyles:           { fillColor: [30, 30, 30], textColor: 255, fontStyle: "bold" },
    alternateRowStyles:   { fillColor: [245, 245, 245] },
    columnStyles:         { 0: { fontStyle: "bold", cellWidth: 70 } },
  });

  y = doc.lastAutoTable.finalY + 8;

  // ── Top attack types ──────────────────────────────────────────────────────
  if (stats?.top_attack_types?.length) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text("Top Attack Types", margin, y);
    y += 4;

    doc.autoTable({
      startY: y,
      head:   [["Rank", "Attack Type", "Count"]],
      body:   stats.top_attack_types.map((t, i) => [
        `#${i + 1}`,
        resolveLabel(t.label),
        t.count.toLocaleString(),
      ]),
      margin:             { left: margin, right: margin },
      styles:             { fontSize: 9, cellPadding: 3 },
      headStyles:         { fillColor: [79, 70, 229], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 245, 255] },
    });

    y = doc.lastAutoTable.finalY + 8;
  }

  // ── Threat log ────────────────────────────────────────────────────────────
  if (alerts.length > 0) {
    if (y > 200) { doc.addPage(); y = 16; }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(`Threat Log  (${alerts.length} events)`, margin, y);
    y += 4;

    doc.autoTable({
      startY: y,
      head:   [["Time", "Attack", "Severity", "Source IP", "Dest IP", "Confidence"]],
      body:   alerts.slice(0, 300).map((a) => [
        fmtDate(a.created_at),
        resolveLabel(a.predicted_label),
        a.severity ?? "—",
        a.src_ip   ?? "—",
        a.dst_ip   ?? "—",
        `${((a.confidence ?? 0) * 100).toFixed(0)}%`,
      ]),
      margin:             { left: margin, right: margin },
      styles:             { fontSize: 7.5, cellPadding: 2.5, overflow: "ellipsize" },
      headStyles:         { fillColor: [15, 23, 42], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      didParseCell(data) {
        if (data.section === "body" && data.column.index === 2) {
          const [r, g, b] = sevColor(data.cell.raw);
          data.cell.styles.textColor = [r, g, b];
          data.cell.styles.fontStyle = "bold";
        }
      },
    });
  }

  // ── Footer on every page ──────────────────────────────────────────────────
  const pages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `QuantumSentinel IDS  •  Confidential  •  Page ${p} of ${pages}`,
      W / 2,
      doc.internal.pageSize.getHeight() - 6,
      { align: "center" }
    );
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const filename = fromDate && toDate
    ? `QuantumSentinel_${fromDate}_to_${toDate}.pdf`
    : `QuantumSentinel_${new Date().toISOString().slice(0, 10)}.pdf`;

  doc.save(filename);
};
