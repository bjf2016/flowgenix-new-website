"use client";
import { useChat } from "@/components/ChatProvider";

export default function ChatbotLauncher({ variant = "button" }: { variant?: "button" | "floating" }) {
  const { openChat } = useChat();
  const common = "rounded-full bg-[#009CE3] text-white shadow-md hover:bg-[#0088cc] hover:shadow-lg transition-all";
  return variant === "floating" ? (
    <button onClick={openChat} className={`fixed bottom-6 right-6 px-5 py-3 ${common}`}>
      Talk to our AI
    </button>
  ) : (
    <button onClick={openChat} className={`${common} px-6 py-2.5 text-sm font-semibold`}>
      Talk to our AI
    </button>
  );
}
