'use client'

import { useState } from "react"
import { Header } from "@/components/Header"
import { AboutSection } from "@/components/AboutSection"
import { AISUploadDialog } from "@/components/AISUploadDialog"
import { MainButtons } from "@/components/MainButtons"
import { TaxProfileCard } from "@/components/TaxProfileCard"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePage() {
  const [fileName, setFileName] = useState("")
  const [selectedScheme, setSelectedScheme] = useState("")
  const [showProfile, setShowProfile] = useState(false)

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file); // Debugging
    setFileName(file.name)
  }

  const handleSchemeSelection = (scheme) => {
    console.log("Selected scheme:", scheme); // Debugging
    setSelectedScheme(scheme)
  }

  const handleSubmit = () => {
    console.log("Submitting form, showing profile..."); // Debugging
    setShowProfile(true)
    setTimeout(() => {
      document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 flex flex-col">
      <Header />
      <AboutSection />
      <main className="flex-grow flex flex-col">
        <div className="flex-grow flex items-center justify-center p-8">
          <MainButtons onAISClick={handleSubmit} />
        </div>
      </main>
      <AISUploadDialog 
        onFileUpload={handleFileUpload} 
        onSchemeSelection={handleSchemeSelection} 
        onSubmit={handleSubmit} 
      />
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
            <TaxProfileCard selectedScheme={selectedScheme} fileName={fileName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
