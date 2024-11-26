'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; 
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type Device = 'desktop' | 'tablet' | 'mobile'; // Define the allowed device types

export default function ResponsiveDesignPreviewTool() {
  const [url, setUrl] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<Device>('desktop');
  const [iframeSrc, setIframeSrc] = useState('');
  const [error, setError] = useState('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleDeviceChange = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleTestButtonClick = async () => {
    if (url) {
      // Check if the URL is embeddable
      try {
        const response = await fetch(url, { method: 'HEAD' });
        const xFrameOptions = response.headers.get('X-Frame-Options');

        if (xFrameOptions && (xFrameOptions === 'DENY' || xFrameOptions === 'SAMEORIGIN')) {
          setError(`This website doesn't allow embedding in an iframe due to security restrictions.`);
          setIframeSrc('');
        } else {
          setIframeSrc(url);
          setError('');
        }
      } catch (err) {
        console.error(err);  // Log the error to the console or handle it further
        setError('Unable to fetch the URL. Please check the URL and try again.');
        setIframeSrc('');
      }
    }
  };

  // Localhost button functionality
  const handleLocalhostButtonClick = () => {
    setUrl('http://localhost:3000');
  };

  // Define breakpoints for different devices
  const deviceDimensions: Record<Device, { width: number; height: number }> = {
    desktop: { width: 1200, height: 800 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 },
  };

  // Get current device dimensions
  const currentDimensions = deviceDimensions[selectedDevice];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            <span>Responsive Design Preview Tool</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* URL Input Field */}
            <div className="flex items-center gap-2">
              <Input
                type="url"
                placeholder="Enter URL to preview (http://localhost:3000)"
                value={url}
                onChange={handleUrlChange}
                className="font-mono"
              />
              <Button onClick={handleTestButtonClick} variant="outline">
                Test
              </Button>
              {/* Localhost Button */}
              <Button onClick={handleLocalhostButtonClick} variant="outline">
                Localhost
              </Button>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500">{error}</div>}

            {/* Device Selection */}
            <div className="flex items-center gap-2">
              <span>Device:</span>
              <Select value={selectedDevice} onValueChange={handleDeviceChange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview Box */}
            {iframeSrc && !error && (
              <div
                className="flex justify-center items-center" // Ensure the iframe is centered
                style={{
                  width: `${currentDimensions.width}px`,
                  height: `${currentDimensions.height}px`,
                  border: '1px solid #ccc',
                  marginTop: '20px',
                  position: 'relative',
                  overflow: 'hidden', // Prevents overflow issues
                }}
              >
                <iframe
                  src={iframeSrc}
                  title="Responsive Design Preview"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', objectFit: 'cover' }} // Ensure the iframe content fits the box
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
