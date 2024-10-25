'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m Lex, your TaxMate assistant. How can I help you with your tax-related questions today?' }
  ])
  const [userInput, setUserInput] = useState('')

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: userInput }])
      // Simulate bot response (replace with actual API call in production)
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'bot', content: `I'm Lex, and I understand you're asking about "${userInput}". How can I provide more specific information about this tax topic?` }])
      }, 1000)
      setUserInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
      <header className="w-full bg-primary text-primary-foreground p-6 shadow-lg flex justify-between items-center">
        <Link href="/" passHref>
          <Button variant="ghost" className="text-primary-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Chat with Lex</h1>
        <div className="w-[100px]"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-grow flex flex-col p-6">
        <Card className="w-full max-w-4xl mx-auto flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-700">TaxMate Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow mb-4 p-4 border rounded-md">
              {chatMessages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center mt-4">
              <Input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow mr-2 bg-white border-purple-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <Button onClick={handleSendMessage} className="bg-purple-500 hover:bg-purple-600 text-white">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
