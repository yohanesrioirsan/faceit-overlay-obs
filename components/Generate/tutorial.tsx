"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface HowToUseProps {
  trigger?: React.ReactNode;
  nickname?: string;
  selectedTemplate?: string;
}

export default function HowToUse({
  trigger,
  nickname,
  selectedTemplate = "classic",
}: HowToUseProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL ||
        window.location.origin ||
        "https://faceitobs.vercel.app"
      : "https://faceitobs.vercel.app";

  const triggerButton = trigger || <Button>How to use ?</Button>;

  const embedUrl = nickname
    ? `${baseUrl}/overlay/${nickname}?template=${selectedTemplate}`
    : `${baseUrl}/overlay/[your-nickname]?template=${selectedTemplate}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-2xl backdrop-blur-md bg-[#181717]/70">
        <DialogHeader>
          <DialogTitle>How to Use FaceitOBS</DialogTitle>
          <DialogDescription className="space-y-4">
            Add Overlay/Widget to your OBS
          </DialogDescription>

          <div className="mt-3 space-y-4">
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">1. Copy this embed code</h1>
              <div className="relative">
                <div className="px-3 py-2 bg-white/80 text-black/70 text-xs border rounded-lg pr-10 break-all">
                  {embedUrl}
                </div>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-orange-500/70 bg-orange-500"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">2. Add the resource</h1>
              <ol className="list-decimal list-inside space-y-2 ml-3">
                <li>Open your OBS App.</li>
                <li>Add Browser resources.</li>
                <li>Paste the code that you copied on the URL box.</li>
                <li>Remove all the CSS code in Custom CSS box.</li>
                <li>Click OK and you are all set!</li>
              </ol>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h2 className="text-sm font-semibold text-amber-400 mb-1">
                ⚠️ Auto-Refresh Notice
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Stats update automatically every <strong>90 seconds</strong> (or{" "}
                <strong>45 seconds</strong> when recent activity is detected).
                This means your stats will refresh within 1-2 minutes after a
                match ends, not instantly. This balance ensures timely updates
                while keeping API usage efficient.
              </p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
