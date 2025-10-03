'use client';

import { MessageCircle } from 'lucide-react';
import { openChat } from '@/lib/handoff';

export function ChatbotLauncher() {
  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#009CE3] px-6 py-4 text-white shadow-2xl hover:bg-[#0088cc] hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline font-semibold">Chat with AI</span>
    </button>
  );
}
