"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, Maximize2, ArrowRight, ArrowDownLeft, ArrowDown, ArrowDownRight } from 'lucide-react';


export default function AlignmentGrid({ textId, alignText }) {
  return (
    <div className="grid grid-cols-3 gap-1 mt-2">
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'top-left'); }}><ArrowUpLeft size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'top-center'); }}><ArrowUp size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'top-right'); }}><ArrowUpRight size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'middle-left'); }}><ArrowLeft size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'middle-center'); }}><Maximize2 size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'middle-right'); }}><ArrowRight size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'bottom-left'); }}><ArrowDownLeft size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'bottom-center'); }}><ArrowDown size={16} /></Button>
      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alignText(textId, 'bottom-right'); }}><ArrowDownRight size={16} /></Button>
    </div>
  );
}