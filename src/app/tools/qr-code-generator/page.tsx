"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas instead of QRCodeSVG
import Link from "next/link"; // For the back to home link
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"; // Define allowed error correction levels

const QRCodeGeneratorTool = () => {
  const [qrText, setQrText] = useState("");
  const [qrSize, setQrSize] = useState(256); // Default size is 256x256 pixels
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionLevel>("L"); // Default error correction level 'L'

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qrCanvas") as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-code.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Back to Home Button */}
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
          <CardDescription>
            Generate a QR code from any text or URL, with customizable size and
            error correction levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* QR Code Input and Customization */}
            <div className="space-y-4">
              {/* QR Text Input */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="qrText" className="text-sm">
                  Enter Text or URL
                </label>
                <Input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="w-full"
                  placeholder="Enter text or URL here"
                />
              </div>

              {/* QR Size and Error Correction Options */}
              <div className="flex flex-col space-y-2">
                {/* QR Size */}
                <div className="flex justify-between items-center">
                  <label htmlFor="qrSize" className="text-sm">
                    QR Code Size: {qrSize}px
                  </label>
                  <input
                    type="range"
                    id="qrSize"
                    min="128"
                    max="512"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Error Correction Level */}
                <div className="flex items-center gap-2">
                  <span>Error Correction Level:</span>
                  <Select
                    value={errorCorrection}
                    onValueChange={(value) =>
                      setErrorCorrection(value as ErrorCorrectionLevel)
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (L)</SelectItem>
                      <SelectItem value="M">Medium (M)</SelectItem>
                      <SelectItem value="Q">Quartile (Q)</SelectItem>
                      <SelectItem value="H">High (H)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Display Generated QR Code */}
            {qrText && (
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex justify-center items-center">
                  <QRCodeCanvas
                    id="qrCanvas" // Ensure it has an id for canvas reference
                    value={qrText}
                    size={qrSize}
                    level={errorCorrection} // No need for "as any" anymore
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleDownloadQR} variant="outline">
                    Download QR Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGeneratorTool;
