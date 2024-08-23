"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ColorSelect({ textId, currentColor, updateText }) {
  return (
    <Select
      value={currentColor}
      onValueChange={(value) => updateText(textId, 'color', value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="颜色" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="#d3347c">红色</SelectItem>
        <SelectItem value="#01037d">蓝色</SelectItem>
      </SelectContent>
    </Select>
  );
}