'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'; // Import the uuid library
import Link from 'next/link'; // For the back to home link

// Define a namespace for UUIDv5 (required for version 5 UUIDs)
const NAMESPACE = uuidv5.DNS; // You can change this namespace to something more specific to your app

const UuidGeneratorTool = () => {
  const [uuidVersion, setUuidVersion] = useState<'v4' | 'v5'>('v4'); // State to toggle UUID version
  const [generatedUuid, setGeneratedUuid] = useState('');

  const generateUuid = () => {
    let uuid = '';
    if (uuidVersion === 'v4') {
      uuid = uuidv4(); // Generate a v4 UUID
    } else {
      uuid = uuidv5('example.com', NAMESPACE); // Generate a v5 UUID using a namespace
    }
    setGeneratedUuid(uuid); // Set the generated UUID
  };

  const handleVersionChange = (version: 'v4' | 'v5') => {
    setUuidVersion(version);
    setGeneratedUuid(''); // Clear the generated UUID when changing version
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Back to Home Button */}
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
          <CardDescription>
            Generate Universally Unique Identifiers (UUIDs) for database records, session IDs, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* UUID Version Selection */}
            <div className="flex justify-between">
              <Button
                variant={uuidVersion === 'v4' ? 'default' : 'outline'}
                onClick={() => handleVersionChange('v4')}
              >
                UUID v4
              </Button>
              <Button
                variant={uuidVersion === 'v5' ? 'default' : 'outline'}
                onClick={() => handleVersionChange('v5')}
              >
                UUID v5
              </Button>
            </div>

            {/* Display Generated UUID */}
            <div className="flex flex-col gap-2 mt-4">
              <Input
                type="text"
                value={generatedUuid}
                readOnly
                className="font-mono"
                placeholder="Generated UUID will appear here"
              />
              <Button onClick={generateUuid} variant="outline">
                Generate UUID
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UuidGeneratorTool;
