"use client";
import { useState } from "react";
import ChatModal from "./ChatModal";

export default function ChatbotLauncher({ variant = "button" }: { variant?: "button" | "floating" }) {
  const [open, setOpen] = useState(false);
  const trigger =
    variant === "floating" ? (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full bg-[#009CE3] text-white px-5 py-3 shadow-lg hover:shadow-xl"
      >
        Talk to our AI
      </button>
    ) : (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-[#009CE3] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#0088cc] hover:shadow-lg transition-all"
      >
        Talk to our AI
      </button>
    );

  return (
    <>
      {trigger}
      <ChatModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
