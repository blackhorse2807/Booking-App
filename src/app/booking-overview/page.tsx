"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

const BookingOverview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract booking details dynamically
  const customerName = searchParams.get("name") || "Customer";
  const table = searchParams.get("table") || "Not Assigned";
  const time = searchParams.get("time") || "Not Specified";
  const date = searchParams.get("date") || "Not Provided";
  const orderId = searchParams.get("orderId") || "Unknown Order ID";

  // Combine extracted data for QR code
  const qrData = JSON.stringify({ customerName, table, time, date, orderId });

  // Function to generate and download PDF receipt
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Booking Receipt", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Customer Name: ${customerName}`, 20, 40);
    doc.text(`Order ID: ${orderId}`, 20, 50);
    doc.text(`Table: ${table}`, 20, 60);
    doc.text(`Time: ${time}`, 20, 70);
    doc.text(`Date: ${date}`, 20, 80);

    // Convert QR Code to image and add to PDF
    const qrCanvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (qrCanvas) {
      const qrImageData = qrCanvas.toDataURL("image/png");
      doc.addImage(qrImageData, "PNG", 80, 90, 50, 50);
    }

    doc.save("booking_receipt.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Booking Overview</h1>
        </div>

        {/* Display Booking Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-gray-600">
            <p className="font-semibold text-gray-800">Customer Name</p>
            <p>{customerName}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-semibold text-gray-800">Order ID</p>
            <p>{orderId}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-semibold text-gray-800">Table</p>
            <p>{table}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-semibold text-gray-800">Time</p>
            <p>{time}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-semibold text-gray-800">Date</p>
            <p>{date}</p>
          </div>
        </div>

        {/* Display QR Code */}
        <div className="flex justify-center mb-8">
          <QRCodeCanvas id="qr-code" value={qrData} size={150} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4 items-center">
          <button
            onClick={handleDownloadReceipt}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Download Receipt
          </button>
          <button
            onClick={() => router.push("/home")}
            className="w-full bg-orange-200 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
