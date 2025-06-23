"use client";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiDownload, FiHome, FiCalendar, FiClock, FiUser, FiHash, FiCheck } from "react-icons/fi";
import Image from "next/image";

const BookingOverview = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Extract user name from session or fallback
  const customerName = session?.user?.name || searchParams.get("name") || "Customer";
  const table = searchParams.get("table") || "Not Assigned";
  const time = searchParams.get("time") || "Not Specified";
  const date = searchParams.get("date") || "Not Provided";
  const orderId = searchParams.get("orderId") || "Unknown Order ID";

  // Combine extracted data for QR code
  const qrData = JSON.stringify({ customerName, table, time, date, orderId });

  // Function to generate and download PDF receipt
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // Add logo or header
    doc.setFontSize(24);
    doc.setTextColor(33, 33, 33);
    doc.text("Booking Confirmation", 105, 30, { align: "center" });

    // Add a line
    doc.setDrawColor(242, 96, 39); // Orange color
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Add booking details
    doc.setFontSize(12);
    doc.setTextColor(66, 66, 66);
    
    const startY = 50;
    const lineHeight = 10;
    
    doc.text(`Order ID: ${orderId}`, 20, startY);
    doc.text(`Customer: ${customerName}`, 20, startY + lineHeight);
    doc.text(`Table: ${table}`, 20, startY + lineHeight * 2);
    doc.text(`Date: ${date}`, 20, startY + lineHeight * 3);
    doc.text(`Time: ${time}`, 20, startY + lineHeight * 4);

    // Add QR Code
    const qrCanvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (qrCanvas) {
      const qrImageData = qrCanvas.toDataURL("image/png");
      doc.addImage(qrImageData, "PNG", 70, startY + lineHeight * 6, 70, 70);
    }

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("Thank you for your booking!", 105, 270, { align: "center" });

    // Save the PDF
    doc.save("booking_confirmation.pdf");
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">Booking Confirmation</h1>
            <p className="mt-1 text-sm text-gray-500">
              Your booking has been confirmed successfully
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Success Banner */}
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiCheck className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Booking Confirmed
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <FiHash className="w-5 h-5 text-orange-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Order ID</div>
                        <div className="font-medium">{orderId}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiUser className="w-5 h-5 text-orange-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Customer</div>
                        <div className="font-medium">{customerName}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="w-5 h-5 text-orange-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-medium">{date}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiClock className="w-5 h-5 text-orange-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="font-medium">{time}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                  <button
                    onClick={handleDownloadReceipt}
                    className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition shadow-sm hover:shadow-md"
                  >
                    <FiDownload className="w-5 h-5 mr-2" />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => router.push("/home")}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    <FiHome className="w-5 h-5 mr-2" />
                    Back to Home
                  </button>
                </div>
              </div>

              {/* Right Column - QR Code */}
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <QRCodeCanvas
                    id="qr-code"
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Scan this QR code at the venue
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Download Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
          Receipt downloaded successfully
        </div>
      )}
    </div>
  );
};

export default BookingOverview;
