import { useState } from "react"
import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import * as RadioGroup from '@radix-ui/react-radio-group';

export function AISUploadDialog({ onFileUpload, onSchemeSelection, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("File selected:", file); // Debugging
      onFileUpload(file)
    }
  }

  const handleSchemeChange = (scheme) => {
    console.log("Scheme selected:", scheme); // Debugging
    onSchemeSelection(scheme)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Upload AIS</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF and Select Scheme</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Upload PDF</Label>
          <Input type="file" accept=".pdf" onChange={handleFileChange} />
          
          <Label>Select Scheme</Label>
          <RadioGroup.Root onValueChange={handleSchemeChange} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroup.Item value="old" className="form-radio" />
              <span>Old Scheme</span>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroup.Item value="new" className="form-radio" />
              <span>New Scheme</span>
            </div>
          </RadioGroup.Root>
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  )
}
