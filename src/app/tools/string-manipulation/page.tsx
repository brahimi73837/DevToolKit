'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Copy } from 'lucide-react'; // Import Copy icon from lucide-react

export default function StringManipulationToolkit() {
  const [inputString, setInputString] = useState('');
  const [outputString, setOutputString] = useState('');

  // Existing string manipulation functions
  const toUpperCase = () => setOutputString(inputString.toUpperCase());
  const toLowerCase = () => setOutputString(inputString.toLowerCase());
  const trimString = () => setOutputString(inputString.trim());
  const replaceString = (search: string, replacement: string) => {
    setOutputString(inputString.replace(new RegExp(search, 'g'), replacement));
  };

  // New string manipulation functions
  const reverseString = () => setOutputString(inputString.split('').reverse().join(''));
  const wordCount = () => setOutputString(inputString.split(/\s+/).filter(Boolean).length.toString());
  const letterCount = () => setOutputString(inputString.replace(/[^a-zA-Z]/g, '').length.toString());
  const quoteString = () => setOutputString(`"${inputString}"`);
  const spacesToNewLines = () => setOutputString(inputString.replace(/\s+/g, '\n'));
  const convertToCamelCase = () => {
    const camelCaseString = inputString
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, '');
    setOutputString(camelCaseString);
  };
  const checkPalindrome = () => {
    const cleanedString = inputString.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const isPalindrome = cleanedString === cleanedString.split('').reverse().join('');
    setOutputString(isPalindrome ? 'Palindrome' : 'Not a palindrome');
  };
  const removePunctuation = () => setOutputString(inputString.replace(/[^\w\s]/g, ''));

  // New functionality for converting comma-separated values and line-separated values
  const convertCsvToQuoted = () => {
    const quotedValues = inputString
      .split(',')
      .map((value) => `'${value.trim()}'`)
      .join(', ');
    setOutputString(quotedValues);
  };

  const convertNewLineToQuoted = () => {
    const quotedValues = inputString
      .split('\n')
      .map((value) => `'${value.trim()}'`)
      .join(', ');
    setOutputString(quotedValues);
  };

  // New button functionality: Clear input/output
  const clearInputOutput = () => {
    setInputString('');
    setOutputString('');
  };

  // New button functionality: Copy output to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputString);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            <span>String Manipulation Toolkit</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 relative">
            <Textarea
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              placeholder="Enter your string here..."
              className="min-h-[200px] font-mono"
            />
            {/* Clear Button (X) inside Input Field */}
            {inputString && (
              <Button
                onClick={clearInputOutput}
                variant="link"
                className="absolute top-[-8px] right-[-8px] p-2 text-2xl text-gray-500 hover:text-red-600 transition-colors"
              >
                &times;
              </Button>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={toUpperCase}>To Uppercase</Button>
              <Button onClick={toLowerCase}>To Lowercase</Button>
              <Button onClick={trimString}>Trim</Button>
              <Button onClick={() => replaceString(' ', '-')}>Replace Spaces with Hyphens</Button>
              <Button onClick={reverseString}>Reverse String</Button>
              <Button onClick={wordCount}>Word Count</Button>
              <Button onClick={letterCount}>Letter Count</Button>
              <Button onClick={quoteString}>Quote String</Button>
              <Button onClick={spacesToNewLines}>Spaces to New Lines</Button>
              <Button onClick={convertToCamelCase}>To CamelCase</Button>
              <Button onClick={checkPalindrome}>Check Palindrome</Button>
              <Button onClick={removePunctuation}>Remove Punctuation</Button>
              <Button onClick={convertCsvToQuoted}>Convert CSV to Quoted</Button>
              <Button onClick={convertNewLineToQuoted}>Convert New Line to Quoted</Button>

              {/* Copy Code Button with Icon (next to output) */}
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="ml-auto"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <h3 className="font-semibold mb-2">Output:</h3>
            <div className="relative">
              <Textarea
                value={outputString}
                readOnly
                placeholder="Output will appear here..."
                className="min-h-[200px] font-mono"
              />
              {/* Copy button next to the output */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
