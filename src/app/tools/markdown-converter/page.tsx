'use client';

import React, { useState } from 'react';
import useMounted from '@/hooks/useMounted';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a **markdown** preview.');
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  marked.setOptions({
    gfm: true,
    breaks: true
  });

  const getHTML = (md: string) => {
    try {
      const rawHTML = marked.parse(md) as string;
      return DOMPurify.sanitize(rawHTML);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return 'Error parsing markdown';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Markdown to HTML Converter</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="split">Split View</TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Markdown</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(markdown)}
                        className="h-8"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Markdown
                      </Button>
                    </div>
                    <Textarea
                      value={markdown}
                      onChange={(e) => setMarkdown(e.target.value)}
                      placeholder="Enter your markdown here..."
                      className="min-h-[200px] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Preview</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(getHTML(markdown))}
                        className="h-8"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy HTML
                      </Button>
                    </div>
                    <div
                      className="prose dark:prose-invert max-w-none border rounded-md p-4 min-h-[200px] bg-background"
                      dangerouslySetInnerHTML={{ __html: getHTML(markdown) }}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="split" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Markdown</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(markdown)}
                        className="h-8"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Markdown
                      </Button>
                    </div>
                    <Textarea
                      value={markdown}
                      onChange={(e) => setMarkdown(e.target.value)}
                      placeholder="Enter your markdown here..."
                      className="min-h-[400px] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Preview</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(getHTML(markdown))}
                        className="h-8"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy HTML
                      </Button>
                    </div>
                    <div
                      className="prose dark:prose-invert max-w-none border rounded-md p-4 min-h-[400px] bg-background"
                      dangerouslySetInnerHTML={{ __html: getHTML(markdown) }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}