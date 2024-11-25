import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Paintbrush, FileCode } from 'lucide-react';
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
  },
  {
    name: "Form Builder",
    description: "Create forms with inputs, checkboxes, and buttons.",
    href: "/tools/form-builder",
    icon: FileCode,
    color: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-500/10 dark:bg-green-400/10"
  },
  {
    name: "Code Diff Viewer",
    description: "Display side-by-side or inline comparisons between two versions of code to highlight differences.",
    href: "/tools/code-difference",
    icon: FileCode,
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-500/10 dark:bg-orange-400/10"
  }
];

export default function HomePage() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="block">
                <Card className="h-full transition-colors hover:bg-muted/50 max-w-sm min-h-[200px] flex flex-col justify-between">
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
