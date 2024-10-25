// components/FormSection.js
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FormSection({ onSubmit }) {
  const [selectedScheme, setSelectedScheme] = useState("");
  const [fileName, setFileName] = useState("");

  return (
    <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="mb-4">
        <Button onClick={() => alert('AIS Upload')}>Upload AIS</Button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="pdf-upload" className="block text-sm font-medium text-muted-foreground">
            Upload PDF
          </label>
          <Input
            type="file"
            id="pdf-upload"
            onChange={(e) => setFileName(e.target.files[0]?.name || "")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="scheme-select" className="block text-sm font-medium text-muted-foreground">
            Select Scheme
          </label>
          <select
            id="scheme-select"
            className="block w-full mt-1 bg-background border border-input text-muted-foreground rounded-md py-2 px-3 shadow-sm"
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
          >
            <option value="" disabled>Select Scheme</option>
            <option value="old">Old Scheme</option>
            <option value="new">New Scheme</option>
          </select>
        </div>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
}
