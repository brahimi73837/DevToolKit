'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

// Normalize code to avoid differences due to whitespace, indentation, and empty lines
const normalizeCode = (code: string) => {
  return code
    .split('\n')  // Split code by lines
    .map(line => line.trim())  // Remove leading/trailing whitespace for each line
    .filter(line => line.length > 0)  // Remove completely empty lines (after trimming)
    .map(line => line.replace(/\s+/g, ' '))  // Replace multiple spaces with a single space
    .join('\n');  // Reassemble the code with normalized spaces
};

// Compare two code versions line-by-line
const highlightDiff = (oldCode: string, newCode: string) => {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  const maxLength = Math.max(oldLines.length, newLines.length);
  const diffResult: { oldLine: string; newLine: string; isDiff: boolean }[] = [];

  for (let i = 0; i < maxLength; i++) {
    const oldLine = oldLines[i] || '';
    const newLine = newLines[i] || '';
    const isDiff = oldLine !== newLine;
    diffResult.push({ oldLine, newLine, isDiff });
  }

  return diffResult;
};

const DiffViewer = ({ codeA, codeB }: { codeA: string, codeB: string }) => {
  // Normalize the code before diffing
  const normalizedCodeA = normalizeCode(codeA);
  const normalizedCodeB = normalizeCode(codeB);

  const diffResult = highlightDiff(normalizedCodeA, normalizedCodeB);

  return (
    <div className="space-y-2">
      {diffResult.map((line, index) => (
        <div key={index} className="flex">
          {/* Old line (before changes) */}
          <div className={`w-1/2 p-2 border rounded overflow-x-auto ${line.isDiff ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>
            <pre>{line.oldLine}</pre>
          </div>
          {/* New line (after changes) */}
          <div className={`w-1/2 p-2 border rounded overflow-x-auto ${line.isDiff ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}>
            <pre>{line.newLine}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CodeDiffViewer() {
  const [codeA, setCodeA] = useState('// Version A\nconst a = 1;\nconst b = 2;\n\nconsole.log(a + b);'); // Example with empty line
  const [codeB, setCodeB] = useState('// Version B\nconst a = 1;\nconst b = 3;\nconsole.log(a + b);'); // No empty line

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            <span>Code Diff Viewer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Version A</span>
              <Textarea
                value={codeA}
                onChange={(e) => setCodeA(e.target.value)}
                placeholder="Enter code for version A..."
                className="min-h-[200px] font-mono bg-gray-900 text-white resize-none overflow-auto"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Version B</span>
              <Textarea
                value={codeB}
                onChange={(e) => setCodeB(e.target.value)}
                placeholder="Enter code for version B..."
                className="min-h-[200px] font-mono bg-gray-900 text-white resize-none overflow-auto"
              />
            </div>
            <div className="border rounded p-4 min-h-[200px] bg-background">
              <h3 className="font-semibold mb-2 text-white">Diff Preview</h3>
              <DiffViewer codeA={codeA} codeB={codeB} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
