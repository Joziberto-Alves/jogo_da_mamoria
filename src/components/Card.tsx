type Props = {
    cards: {
        emoji: string;
        flipped: boolean;
        matched?: boolean;
    },
    handleClick: () => void;
}

export default function Card({ cards, handleClick }: Props) {
    return (
    <div
        className="relative h-26 w-18 sm:w-34 sm:h-44  xl:w-40 xl:h-56 cursor-pointer perspective" 
        onClick={handleClick}
    >
        <div className={`relative w-full h-full duration-500 transform-style preserve-3d
                ${cards.flipped || cards.matched ? "rotate-y-180" : ""}`}>
            {/* Verso da carta (começa visível) */}
            <div className="absolute w-full h-full backface-hidden bg-blue-500 border border-gray-300 rounded-lg flex items-center justify-center text-4xl">
                ❓
            </div>
            {/* Frente da carta (emoji) */}
            <div className="absolute w-full h-full backface-hidden bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-4xl rotate-y-180">
                {cards.emoji}
            </div>
        </div>
    </div>

    )
}
