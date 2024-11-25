'use client';

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy } from 'lucide-react'
import Link from 'next/link'

export default function ColorPicker() {
  const [color, setColor] = useState('#000000')
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 })
  const [hslColor, setHslColor] = useState({ h: 0, s: 0, l: 0 })

  useEffect(() => {
      updateRgbColor(color)
      updateHslColor(color)
  }, [color])

  const updateRgbColor = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      setRgbColor({
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      })
    }
  }

  const updateHslColor = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      const r = parseInt(result[1], 16) / 255
      const g = parseInt(result[2], 16) / 255
      const b = parseInt(result[3], 16) / 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0, s
      const l = (max + min) / 2

      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }

      setHslColor({
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      })
    }
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      setColor(newColor)
    }
  }

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>, channel: 'r' | 'g' | 'b') => {
    const value = Math.max(0, Math.min(255, Number(e.target.value)))
    const newRgb = { ...rgbColor, [channel]: value }
    setRgbColor(newRgb)
    setColor(`#${newRgb.r.toString(16).padStart(2, '0')}${newRgb.g.toString(16).padStart(2, '0')}${newRgb.b.toString(16).padStart(2, '0')}`)
  }

  const handleHslChange = (e: React.ChangeEvent<HTMLInputElement>, channel: 'h' | 's' | 'l') => {
    const max = channel === 'h' ? 360 : 100
    const value = Math.max(0, Math.min(max, Number(e.target.value)))
    const newHsl = { ...hslColor, [channel]: value }
    setHslColor(newHsl)
    const rgb = hslToRgb(newHsl.h / 360, newHsl.s / 100, newHsl.l / 100)
    setColor(`#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`)
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Color Picker</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <HexColorPicker color={color} onChange={setColor} />
            <div
              className="w-full h-24 rounded-md"
              style={{ backgroundColor: color }}
            />
            <Tabs defaultValue="hex">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hex">HEX</TabsTrigger>
                <TabsTrigger value="rgb">RGB</TabsTrigger>
                <TabsTrigger value="hsl">HSL</TabsTrigger>
              </TabsList>
              <TabsContent value="hex" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="hex">HEX</Label>
                  <Input
                    id="hex"
                    value={color}
                    onChange={handleHexChange}
                    className="flex-grow"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(color)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="rgb" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="r">R</Label>
                  <Input
                    id="r"
                    type="number"
                    min="0"
                    max="255"
                    value={rgbColor.r}
                    onChange={(e) => handleRgbChange(e, 'r')}
                  />
                  <Label htmlFor="g">G</Label>
                  <Input
                    id="g"
                    type="number"
                    min="0"
                    max="255"
                    value={rgbColor.g}
                    onChange={(e) => handleRgbChange(e, 'g')}
                  />
                  <Label htmlFor="b">B</Label>
                  <Input
                    id="b"
                    type="number"
                    min="0"
                    max="255"
                    value={rgbColor.b}
                    onChange={(e) => handleRgbChange(e, 'b')}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="hsl" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="h">H</Label>
                  <Input
                    id="h"
                    type="number"
                    min="0"
                    max="360"
                    value={hslColor.h}
                    onChange={(e) => handleHslChange(e, 'h')}
                  />
                  <Label htmlFor="s">S</Label>
                  <Input
                    id="s"
                    type="number"
                    min="0"
                    max="100"
                    value={hslColor.s}
                    onChange={(e) => handleHslChange(e, 's')}
                  />
                  <Label htmlFor="l">L</Label>
                  <Input
                    id="l"
                    type="number"
                    min="0"
                    max="100"
                    value={hslColor.l}
                    onChange={(e) => handleHslChange(e, 'l')}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
    
  )
}

