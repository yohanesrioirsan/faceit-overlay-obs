"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectTemplateProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  className?: string;
}

export function SelectTemplate({
  value,
  onValueChange,
  options = [
    { value: "type1", label: "Type 1" },
    { value: "classic", label: "Classic" },
    { value: "neo-brutalism", label: "Neo-Brutalism" },
  ],
  placeholder = "Select a template",
  label = "Templates Name",
  className = "w-[180px]",
}: SelectTemplateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className}>
        <div className="h-full w-full border border-input rounded-md bg-transparent px-3 py-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {value
              ? options.find((opt) => opt.value === value)?.label || placeholder
              : placeholder}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
