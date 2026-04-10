import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ... ExecutiveScorecard component er bhetore

export const handleDownloadPDF = async () => {
  const element = document.getElementById("printable-dashboard"); // ID ta element e add korte hobe
  if (!element) return;

  // Buttons ar Search bar hide korar jonno temporary class add
  const noPrintElements = document.querySelectorAll(".no-print");
  noPrintElements.forEach((el) => ((el as HTMLElement).style.display = "none"));

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Quality baranor jonno
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 297; // A4 Landscape width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Executive-Scorecard-${new Date().toLocaleDateString()}.pdf`);
  } catch (error) {
    console.error("PDF generation failed", error);
  } finally {
    // Hidden elements gulo abar back ana
    noPrintElements.forEach(
      (el) => ((el as HTMLElement).style.display = "flex"),
    );
  }
};
