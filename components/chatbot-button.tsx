"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { ChatInterface } from "./chat-interface"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-teal-400 hover:bg-teal-500 shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg w-full max-w-md h-[80vh] sm:h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ChatInterface />
          </div>
        </div>
      )}
    </>
  )
}
