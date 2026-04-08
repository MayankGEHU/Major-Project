import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReport = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("QuantumSentinel IDS Report", 14, 20);

  const balance = "$25,000";
  const income = "$12,000";
  const expense = "$5,000";
  const profit = "$7,000";

  doc.setFontSize(12);
  doc.text(`Balance: ${balance}`, 14, 35);
  doc.text(`Income: ${income}`, 14, 45);
  doc.text(`Expense: ${expense}`, 14, 55);
  doc.text(`Profit: ${profit}`, 14, 65);

  autoTable(doc, {
    startY: 80,
    head: [["Risk Type", "Severity", "Status"]],
    body: [
      ["SQL Injection", "High", "Detected"],
      ["XSS Attack", "Medium", "Blocked"],
      ["DDoS", "Critical", "Mitigated"],
    ],
  });

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);

  window.open(url, "_blank");
};