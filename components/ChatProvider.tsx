"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import ChatModal from "@/components/ChatModal";

type ChatContextType = {
  openChat: () => void;
  closeChat: () => void;
  isOpen: boolean;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("flowgenix:openChat", handleOpenChat);
    return () => window.removeEventListener("flowgenix:openChat", handleOpenChat);
  }, []);

  return (
    <ChatContext.Provider value={{ openChat, closeChat, isOpen }}>
      {children}
      <ChatModal open={isOpen} onClose={closeChat} />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
