'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Link from 'next/link';

// Define the type for the generated data
interface GeneratedData {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

const RandomDataGenerator = () => {
  const [numRecords, setNumRecords] = useState<number>(1);
  const [generatedData, setGeneratedData] = useState<GeneratedData[]>([]); // Define the state type
  const [includeName, setIncludeName] = useState<boolean>(true);
  const [includeEmail, setIncludeEmail] = useState<boolean>(true);
  const [includeAddress, setIncludeAddress] = useState<boolean>(true);
  const [includePhone, setIncludePhone] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<string>('default'); // Default or JSON

  const generateRandomData = () => {
    const data: GeneratedData[] = [];
    for (let i = 0; i < numRecords; i++) {
      const randomName = `Name ${Math.floor(Math.random() * 1000)}`;
      const randomEmail = `user${Math.floor(Math.random() * 1000)}@example.com`;
      const randomAddress = `Address ${Math.floor(Math.random() * 1000)}, City, Country`;
      const randomPhone = `+1-${Math.floor(Math.random() * 1000000000)}`;

      const record: GeneratedData = {}; // Start with an empty record
      if (includeName) record.name = randomName;
      if (includeEmail) record.email = randomEmail;
      if (includeAddress) record.address = randomAddress;
      if (includePhone) record.phone = randomPhone;

      data.push(record);
    }
    setGeneratedData(data);
  };

  const handleFormatChange = (value: string) => {
    setOutputFormat(value);
  };

  const renderGeneratedData = () => {
    if (outputFormat === 'json') {
      return (
        <pre className="bg-gray-900 text-white p-4 rounded">{JSON.stringify(generatedData, null, 2)}</pre>
      );
    }

    return (
      <ul>
        {generatedData.map((item, index) => (
          <li key={index} className="mb-2">
            {includeName && item.name && <><strong>Name:</strong> {item.name} <br /></>}
            {includeEmail && item.email && <><strong>Email:</strong> {item.email} <br /></>}
            {includeAddress && item.address && <><strong>Address:</strong> {item.address} <br /></>}
            {includePhone && item.phone && <><strong>Phone:</strong> {item.phone} <br /></>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Random Data Generator</CardTitle>
          <CardDescription>
            Generate random data for testing or debugging purposes, including names, emails, addresses, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label htmlFor="numRecords" className="text-sm">Number of Records:</label>
              <Input
                type="number"
                id="numRecords"
                value={numRecords}
                onChange={(e) => setNumRecords(Number(e.target.value))}
                className="w-20"
                min={1}
              />
              <Button onClick={generateRandomData} variant="outline">Generate</Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Select Data Fields:</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="name"
                    checked={includeName}
                    onCheckedChange={(checked) => setIncludeName(checked === true)} // Ensure it returns a boolean
                  />
                  <label htmlFor="name" className="text-sm">Name</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="email"
                    checked={includeEmail}
                    onCheckedChange={(checked) => setIncludeEmail(checked === true)} // Ensure it returns a boolean
                  />
                  <label htmlFor="email" className="text-sm">Email</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="address"
                    checked={includeAddress}
                    onCheckedChange={(checked) => setIncludeAddress(checked === true)} // Ensure it returns a boolean
                  />
                  <label htmlFor="address" className="text-sm">Address</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="phone"
                    checked={includePhone}
                    onCheckedChange={(checked) => setIncludePhone(checked === true)} // Ensure it returns a boolean
                  />
                  <label htmlFor="phone" className="text-sm">Phone</label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Select Output Format:</h3>
              <Select onValueChange={handleFormatChange} value={outputFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default (Text)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h3 className="font-semibold mb-2">Generated Data:</h3>
            <div className="border rounded p-4 bg-background">
              {generatedData.length > 0 ? renderGeneratedData() : <p>No data generated yet.</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RandomDataGenerator;
