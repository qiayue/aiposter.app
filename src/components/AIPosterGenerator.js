"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Edit, Plus, Trash2 } from 'lucide-react';
import AlignmentGrid from './AlignmentGrid';
import ColorSelect from './ColorSelect';
import { drawPoster, calculateTextPosition, setGridSize, getGridSize, pixelsToGrid, gridToPixels } from '../lib/posterUtils';

export default function AIPosterGenerator() {
  const [gridSize, setGridSizeState] = useState(50);
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(12);
  const [bgColor, setBgColor] = useState('#1608f9');
  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState({ content: '', color: '#01037d', size: 30, x: 1, y: 1 });
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    setGridSize(gridSize);
    if (isEditMode) {
      drawPoster(canvasRef.current, bgColor, gridWidth, gridHeight, texts, selectedTextId, true);
    }
  }, [gridSize, gridWidth, gridHeight, bgColor, texts, isEditMode, selectedTextId]);

  const updateGridSize = (size) => {
    setGridSizeState(size);
    setGridSize(size);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target)) {
        setSelectedTextId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const addText = () => {
    if (newText.content) {
      const newId = Math.max(0, ...texts.map(t => t.id), 0) + 1;
      const newY = texts.length + 1; // 新文字的 y 坐标将是当前文字数量
      setTexts([...texts, { ...newText, id: newId, x: 1, y: newY }]);
      setNewText({ 
        content: '', 
        color: '#01037d', 
        size: 30, 
        x: 1, 
        y: texts.length + 1 // 为下一个新文字预设 y 坐标
      });
    }
  };

  const updateText = (id, field, value) => {
    setTexts(texts.map(text =>
      text.id === id ? { ...text, [field]: value } : text
    ));
  };

  const removeText = (id) => {
    setTexts(texts.filter(text => text.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };


  const alignText = (id, alignment) => {
    const text = texts.find(t => t.id === id);
    if (!text) return;

    const { x: newX, y: newY } = calculateTextPosition(text, alignment, gridWidth, gridHeight);

    setTexts(texts.map(t => 
      t.id === id ? { ...t, x: newX, y: newY } : t
    ));
  };


  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 创建一个新的离屏 canvas 来绘制最终图片
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = gridWidth * getGridSize();
    offscreenCanvas.height = gridHeight * getGridSize();
    
    // 在离屏 canvas 上绘制海报，不显示网格
    drawPoster(offscreenCanvas, bgColor, gridWidth, gridHeight, texts, null, false);
    
    const dataUrl = offscreenCanvas.toDataURL('image/png');
    
    // 生成文件名
    const date = new Date();
    const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
    const timeString = date.toTimeString().split(' ')[0].replace(/:/g, '');
    const fileName = `aiposter.app_${dateString}_${timeString}.png`;
    
    // 创建一个临时的 a 元素来设置下载属性
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    
    setGeneratedImage({ dataUrl, fileName });
    setIsEditMode(false);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage.dataUrl;
      link.download = generatedImage.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const returnToEditMode = () => {
    setIsEditMode(true);
    setGeneratedImage(null);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-600"><a href="https://aiposter.app/">AIPoster.app</a></CardTitle>
        <p className="text-center text-gray-600">Free AI Poster Generator Online.</p>
      </CardHeader>
      <CardContent>
        {isEditMode ? (
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="gridSize">格子大小</Label>
                <Input id="gridSize" type="number" value={gridSize} onChange={(e) => updateGridSize(Number(e.target.value))} />
              </div>
              <div className="flex-1">
                <Label htmlFor="gridWidth">网格宽度</Label>
                <Input id="gridWidth" type="number" value={gridWidth} onChange={(e) => setGridWidth(Number(e.target.value))} />
              </div>
              <div className="flex-1">
                <Label htmlFor="gridHeight">网格高度</Label>
                <Input id="gridHeight" type="number" value={gridHeight} onChange={(e) => setGridHeight(Number(e.target.value))} />
              </div>
              <div className="flex-1">
                <Label htmlFor="bgColor">背景颜色</Label>
                <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2 ">
              <Label>添加新文字</Label>
              <div className="flex space-x-2 col-span-2 grid grid-cols-6 gap-2">
                <Input
                  type="text"
                  placeholder="文字内容"
                  value={newText.content}
                  onChange={(e) => setNewText({ ...newText, content: e.target.value })}
                  className="flex-grow col-span-3"
                />
                <Input
                  type="number"
                  placeholder="大小"
                  value={newText.size}
                  onChange={(e) => setNewText({ ...newText, size: Number(e.target.value) })}
                  className="col-span-1"
                />
                <ColorSelect className="col-span-1" textId="new" currentColor={newText.color} updateText={(_, __, value) => setNewText({ ...newText, color: value })} />
                <Button className="col-span-1" onClick={addText}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>


            <div className="relative">
              <canvas 
                ref={canvasRef} 
                width={gridWidth * getGridSize()} 
                height={gridHeight * getGridSize()} 
                className="border border-gray-300 w-full h-auto"
              />
            </div>

            <div className="space-y-2">
              <Label>文字列表</Label>
              <div className="grid grid-cols-7 gap-2 font-bold text-sm text-gray-600 mb-2">
                <div className="col-span-3">内容</div>
                <div>大小</div>
                <div>颜色</div>
                <div>X</div>
                <div>Y</div>
              </div>
              {texts.map((text) => (
                <div key={text.id} 
                     className={`space-y-2 p-1 rounded-lg ${selectedTextId === text.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}
                     onClick={() => setSelectedTextId(text.id)}>
                  <div className="grid grid-cols-7 gap-2 items-center">
                    <Input
                      type="text"
                      placeholder="文字内容"
                      value={text.content}
                      onChange={(e) => updateText(text.id, 'content', e.target.value)}
                      className="col-span-3"
                    />
                    <Input
                      type="number"
                      placeholder="大小"
                      value={text.size}
                      onChange={(e) => updateText(text.id, 'size', Number(e.target.value))}
                    />
                    <ColorSelect textId={text.id} currentColor={text.color} updateText={updateText} />
                    <Input
                      type="number"
                      placeholder="X"
                      value={text.x}
                      onChange={(e) => updateText(text.id, 'x', Number(e.target.value))}
                    />
                    <Input
                      type="number"
                      placeholder="Y"
                      value={text.y}
                      onChange={(e) => updateText(text.id, 'y', Number(e.target.value))}
                    />
                    
                  </div>
                  
                </div>
              ))}
            </div>


            <Button onClick={generateImage} className="w-full">
              <Image className="mr-2 h-4 w-4" /> 生成图片
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {generatedImage && <img src={generatedImage.dataUrl} alt="Generated Poster" className="w-full h-auto" />}
            <Button onClick={handleDownload} className="w-full">
              下载图片 ({generatedImage.fileName})
            </Button>
            <Button onClick={() => setIsEditMode(true)} className="w-full">
              <Edit className="mr-2 h-4 w-4" /> 返回编辑模式
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}