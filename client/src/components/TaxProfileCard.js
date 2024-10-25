// components/TaxProfileCard.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaxProfileCard({ selectedScheme, fileName }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Selected Scheme: {selectedScheme}</p>
        <p>Uploaded File: {fileName || "No file uploaded"}</p>
      </CardContent>
    </Card>
  );
}
