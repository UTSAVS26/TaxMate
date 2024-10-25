// components/MainButtons.js
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MainButtons({ onAISClick }) {
  return (
    <div className="flex space-x-4">
      <Button onClick={onAISClick}>Upload AIS</Button>
      <Link href="/chat" passHref>
        <Button variant="secondary">Chat with Lex</Button>
      </Link>
    </div>
  );
}
