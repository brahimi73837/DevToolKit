'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush, FileCode, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const tools = [
  {
    name: "Color Picker",
    description: "A CSS Color Picker tool with dark mode support. Choose colors in HEX, RGB, or HSL format.",
    href: "/tools/color-picker",
    icon: Paintbrush,
    color: "text-pink-500 dark:text-pink-400",
    bgColor: "bg-pink-500/10 dark:bg-pink-400/10"
  },
  {
    name: "Markdown Converter",
    description: "Convert Markdown to HTML with live preview. Support for common markdown syntax.",
    href: "/tools/markdown-converter",
    icon: FileCode,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-400/10"
  }
];

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-4 right-4 z-10"
      >
        {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>

      <main className="flex-1 flex items-center justify-center w-full">
        <section className="container grid grid-cols-1 gap-6 pb-8 pt-6 md:py-10 mx-4 max-w-7xl">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl text-center">
              Welcome to DevToolKit
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Here you can find a collection of tools to help you in your development process.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="block">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className={`rounded-lg p-2 ${tool.bgColor}`}>
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <CardTitle>{tool.name}</CardTitle>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Click to open tool →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
