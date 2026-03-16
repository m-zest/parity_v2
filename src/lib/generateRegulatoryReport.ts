import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface RegulatoryAlert {
  title: string;
  description: string;
  severity: string;
  source: string;
  regulation: string;
  affected_framework: string;
  recommended_action: string;
  category?: string;
  date?: string;
}

interface ScanReportData {
  alerts: RegulatoryAlert[];
  scanDuration: number;
  sourcesScanned: number;
  sourcesSucceeded: number;
  organizationName?: string;
}

export function generateRegulatoryReport(data: ScanReportData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  const checkPageBreak = (height: number) => {
    if (yPos + height > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Title
  doc.setFontSize(24);
  doc.setTextColor(239, 68, 68); // red-500
  doc.text("RegulatoryRadar Scan Report", margin, yPos);
  yPos += 10;

  // Subtitle
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(data.organizationName || "Parity AI - Autonomous Compliance Enforcement", margin, yPos);
  yPos += 8;

  // Generated date
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}`, margin, yPos);
  yPos += 6;
  doc.text(`Scan Duration: ${data.scanDuration}s | Sources: ${data.sourcesSucceeded}/${data.sourcesScanned} successful`, margin, yPos);
  yPos += 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // Executive Summary
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text("Executive Summary", margin, yPos);
  yPos += 10;

  const criticalCount = data.alerts.filter(a => a.severity === "critical").length;
  const majorCount = data.alerts.filter(a => a.severity === "major").length;
  const moderateCount = data.alerts.filter(a => a.severity === "moderate").length;
  const minorCount = data.alerts.filter(a => a.severity === "minor" || a.severity === "negligible").length;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  const summaryLines = [
    `Total Alerts Detected: ${data.alerts.length}`,
    `Critical: ${criticalCount} | Major: ${majorCount} | Moderate: ${moderateCount} | Minor/Negligible: ${minorCount}`,
    `Sources Monitored: EUR-Lex, EU AI Office, NIST, NYC LL144`,
  ];

  for (const line of summaryLines) {
    doc.text(line, margin, yPos);
    yPos += 6;
  }
  yPos += 10;

  // Severity breakdown bar
  if (data.alerts.length > 0) {
    const barWidth = pageWidth - 2 * margin;
    const barHeight = 8;

    checkPageBreak(barHeight + 15);

    const total = data.alerts.length;
    const segments = [
      { count: criticalCount, color: [239, 68, 68] as [number, number, number] },
      { count: majorCount, color: [249, 115, 22] as [number, number, number] },
      { count: moderateCount, color: [234, 179, 8] as [number, number, number] },
      { count: minorCount, color: [34, 197, 94] as [number, number, number] },
    ];

    let xOffset = margin;
    for (const seg of segments) {
      if (seg.count > 0) {
        const segWidth = (seg.count / total) * barWidth;
        doc.setFillColor(seg.color[0], seg.color[1], seg.color[2]);
        doc.rect(xOffset, yPos, segWidth, barHeight, "F");
        xOffset += segWidth;
      }
    }
    yPos += barHeight + 10;
  }

  // Alerts Table
  checkPageBreak(30);
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text("Detailed Findings", margin, yPos);
  yPos += 10;

  if (data.alerts.length > 0) {
    const tableData = data.alerts.map(alert => [
      alert.title,
      alert.severity.toUpperCase(),
      alert.source,
      alert.regulation || "-",
      alert.affected_framework || "-",
      alert.recommended_action || "-",
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [["Alert", "Severity", "Source", "Regulation", "Framework", "Recommended Action"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [30, 30, 30],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 18, halign: "center" },
        2: { cellWidth: 22 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 40 },
      },
      didParseCell: (hookData) => {
        // Color-code severity column
        if (hookData.column.index === 1 && hookData.section === "body") {
          const severity = String(hookData.cell.raw).toLowerCase();
          if (severity === "critical") {
            hookData.cell.styles.textColor = [239, 68, 68];
            hookData.cell.styles.fontStyle = "bold";
          } else if (severity === "major") {
            hookData.cell.styles.textColor = [249, 115, 22];
            hookData.cell.styles.fontStyle = "bold";
          } else if (severity === "moderate") {
            hookData.cell.styles.textColor = [234, 179, 8];
          }
        }
      },
    });

    // @ts-expect-error — jspdf-autotable adds lastAutoTable to doc
    yPos = doc.lastAutoTable.finalY + 15;
  } else {
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("No regulatory alerts detected in this scan.", margin, yPos);
    yPos += 15;
  }

  // Detailed Alert Descriptions
  for (const alert of data.alerts.filter(a => a.severity === "critical" || a.severity === "major")) {
    checkPageBreak(45);

    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(`${alert.severity.toUpperCase()}: ${alert.title}`, margin, yPos);
    yPos += 7;

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);

    const descLines = doc.splitTextToSize(alert.description, pageWidth - 2 * margin);
    doc.text(descLines, margin, yPos);
    yPos += descLines.length * 4 + 4;

    if (alert.recommended_action) {
      doc.setTextColor(16, 185, 129);
      doc.text("Recommended Action:", margin, yPos);
      yPos += 5;
      doc.setTextColor(80, 80, 80);
      const actionLines = doc.splitTextToSize(alert.recommended_action, pageWidth - 2 * margin);
      doc.text(actionLines, margin, yPos);
      yPos += actionLines.length * 4 + 8;
    }
  }

  // Footer
  checkPageBreak(30);
  yPos += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("This report was automatically generated by RegulatoryRadar — Parity AI.", margin, yPos);
  yPos += 4;
  doc.text("Powered by TinyFish Web Agent API. For compliance audit purposes only.", margin, yPos);

  // Save
  const timestamp = format(new Date(), "yyyy-MM-dd_HHmm");
  doc.save(`RegulatoryRadar_Report_${timestamp}.pdf`);
}
