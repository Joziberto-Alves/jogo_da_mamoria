
import CardsGrid from "@/components/CardsGrid";



export default function Home() {
const MemoryCards = [
  { id: 1, emoji: "🐶", flipped: false, matched: false },
  { id: 2, emoji: "🐱", flipped: false, matched: false },
  { id: 3, emoji: "🐰", flipped: false, matched: false },
  { id: 4, emoji: "🐼", flipped: false, matched: false },
  { id: 5, emoji: "🦊", flipped: false, matched: false },
  { id: 6, emoji: "🐸", flipped: false, matched: false },
  { id: 7, emoji: "🐵", flipped: false, matched: false },
  { id: 8, emoji: "🐧", flipped: false, matched: false },
  { id: 9, emoji: "🐶", flipped: false, matched: false },
  { id: 10, emoji: "🐱", flipped: false, matched: false },
  { id: 11, emoji: "🐰", flipped: false, matched: false },
  { id: 12, emoji: "🐼", flipped: false, matched: false },
  { id: 13, emoji: "🦊", flipped: false, matched: false },
  { id: 14, emoji: "🐸", flipped: false, matched: false },
  { id: 15, emoji: "🐵", flipped: false, matched: false },
  { id: 16, emoji: "🐧", flipped: false, matched: false },
]


  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <CardsGrid cards={MemoryCards} />
    </div>
  );
}
