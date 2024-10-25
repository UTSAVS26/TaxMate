'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, User, Upload, FileText, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedScheme, setSelectedScheme] = useState("")
  const [fileName, setFileName] = useState("")
  const [showProfile, setShowProfile] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : "")
  }

  const handleSubmit = () => {
    console.log("File:", fileName)
    console.log("Selected Scheme:", selectedScheme)
    setIsOpen(false)
    setShowProfile(true)
    setTimeout(() => {
      document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 flex flex-col">
      <header className="w-full bg-primary text-primary-foreground p-6 shadow-lg">
        <h1 className="text-3xl font-bold">TaxMate</h1>
      </header>

      <section className="bg-background py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
            <Info className="mr-2 h-8 w-8" /> About Us
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Welcome to TaxMate, your intelligent companion for navigating the complex world of taxation. Our advanced AI-powered system is designed to simplify your tax-related queries and provide personalized assistance.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Whether you're dealing with personal income tax, business taxes, or seeking advice on tax planning, our chatbot is here to help. We combine cutting-edge technology with comprehensive tax knowledge to deliver accurate and timely information.
          </p>
          <p className="text-lg text-muted-foreground">
            Our AIS (Advanced Information System) feature allows you to upload your tax documents for a more tailored experience. Simply choose your preferred tax scheme, and let our AI analyze and provide insights based on your specific situation.
          </p>
        </div>
      </section>

      <main className="flex-grow flex flex-col">
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="space-y-8 sm:space-y-0 sm:space-x-16 flex flex-col sm:flex-row">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold py-8 px-10 h-auto w-64 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                  <FileText className="mr-2 h-6 w-6" /> AIS
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-cyan-100 to-emerald-100">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-emerald-700">Upload PDF and Select Scheme</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="pdf" className="text-lg font-semibold text-cyan-700">Upload PDF</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="pdf" type="file" accept=".pdf" onChange={handleFileChange} className="flex-grow bg-white border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500" />
                      <Upload className="text-emerald-600" />
                    </div>
                  </div>
                  {fileName && (
                    <p className="text-sm text-emerald-600 font-medium">
                      Selected file: {fileName}
                    </p>
                  )}
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="scheme" className="text-lg font-semibold text-cyan-700">Select Scheme</Label>
                    <RadioGroup id="scheme" onValueChange={setSelectedScheme} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="old" id="old" className="border-cyan-500 text-emerald-600" />
                        <Label htmlFor="old" className="text-cyan-700">Old Scheme</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" className="border-cyan-500 text-emerald-600" />
                        <Label htmlFor="new" className="text-cyan-700">New Scheme</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300">
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
            <Link href="/chat" passHref legacyBehavior>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white text-xl font-semibold py-8 px-10 h-auto w-64 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105" component="a">
                <MessageCircle className="mr-2 h-6 w-6" /> Chat with Lex
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            id="profile"
            className="p-8"
          >
            <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-pink-100 to-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-pink-700 flex items-center">
                  <User className="mr-2 h-6 w-6" /> Your Tax Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-orange-700 mb-4">
                  Based on your uploaded document and selected scheme, here's a summary of your tax profile:
                </p>
                <ul className="list-disc list-inside space-y-2 text-pink-800">
                  <li>Selected Scheme: {selectedScheme || 'Not specified'}</li>
                  <li>Uploaded File: {fileName || 'No file uploaded'}</li>
                  <li>Estimated Tax Liability: ₹50,000</li>
                  <li>Potential Deductions: ₹10,000</li>
                  <li>Recommended Tax Saving Investments: ELSS Funds</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}