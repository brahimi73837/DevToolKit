'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'react-feather'; // For copy icon
import Link from 'next/link'; // For the back to home link
import { Checkbox } from '@/components/ui/checkbox'; // ShadCN Checkbox
import { DualRangeSlider } from '@/components/ui/dual-range-slider'; // ShadCN DualRangeSlider

// Function to generate random passwords
const generatePassword = (
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string => {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  let characters = '';
  if (useUppercase) characters += upperCaseChars;
  if (useLowercase) characters += lowerCaseChars;
  if (useNumbers) characters += numberChars;
  if (useSymbols) characters += symbolChars;

  if (characters.length === 0) return ''; // In case no options are selected

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

const PasswordGeneratorTool = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(
      passwordLength,
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols
    );
    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
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
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>
            Generate random, secure passwords with customizable length and character set.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Password Length and Character Set Options */}
            <div className="space-y-4">
              {/* Password Length */}
              <div className="flex flex-nowrap justify-between items-center">
                <label htmlFor="length" className="text-sm mr-4">
                  Password Length: {passwordLength}
                </label>
                <DualRangeSlider
                  label={(value) => value}
                  value={[passwordLength]}
                  onValueChange={(value) => setPasswordLength(value[0])}
                  min={8}
                  max={32}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Character Set Options */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={useUppercase}
                    onCheckedChange={() => setUseUppercase(!useUppercase)}
                  />
                  <label>Uppercase</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={useLowercase}
                    onCheckedChange={() => setUseLowercase(!useLowercase)}
                  />
                  <label>Lowercase</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={useNumbers}
                    onCheckedChange={() => setUseNumbers(!useNumbers)}
                  />
                  <label>Numbers</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={useSymbols}
                    onCheckedChange={() => setUseSymbols(!useSymbols)}
                  />
                  <label>Symbols</label>
                </div>
              </div>
            </div>

            {/* Display Generated Password */}
            <div className="flex flex-col gap-2 mt-4">
              <Input
                type="text"
                value={generatedPassword}
                readOnly
                className="font-mono"
                placeholder="Generated password will appear here"
              />
              <div className="flex space-x-2">
                <Button onClick={handleGeneratePassword} variant="outline">
                  Generate Password
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyToClipboard}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGeneratorTool;
