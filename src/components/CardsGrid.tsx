'use client'

import Card from "./Card"
import { useState, useEffect } from "react"


type CardType = {
    id: number;
    emoji: string;
    flipped: boolean;
    matched?: boolean;
}

type Props = {
    cards: CardType[]
}

const shuffledCards = (array: CardType[]) => {
    return [...array].sort(() => Math.random() - 0.5)
}

export default function CardsGrid({ cards }: Props) {
    const [cardsState, setCardsState] = useState(cards)
    const [isChecking, setIsChecking] = useState(false)
    const [time, setTime] = useState(0)
    const [pontuacao, setPontuacao] = useState(0)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        handleShuffle()
    }, [])

    useEffect(() => {
    if (success) return;
    const timer = setInterval(() => {
        if (!success) {
        setTime(prev => prev + 1)
        }
    }, 1000);

    return () => clearInterval(timer); // limpa quando o componente desmonta
    }, [success]);


    const handleShuffle = () => {
        const shuffled = shuffledCards(cardsState).map(card => ({
            ...card,
            flipped: false,
            matched: false,
        }))
        setCardsState(shuffled)
        setPontuacao(0)
        setTime(0)
        setSuccess(false)
    }



    const verifyMatch = (firstId: number, secondId: number) => {
        const firstCard = cardsState.find(card => card.id === firstId)!
        const secondCard = cardsState.find(card => card.id === secondId)!

        if (firstCard.emoji === secondCard.emoji) {
            setCardsState(prev =>
                prev.map(card =>
                    card.id === firstId || card.id === secondId
                        ? { ...card, matched: true }
                        : card
                )
            )
            setPontuacao(prev => prev + 1)
            handleSuccess()
        } else {
            // Se não forem iguais, virar de volta após 800ms
            setTimeout(() => resetFlippedCards(), 800)
        }
    }

    const resetFlippedCards = () => {
        setCardsState(prev =>
            prev.map(card =>
                card.matched ? { ...card, flipped: true } : { ...card, flipped: false }
            )
        )
    }

    const handleCardClick = (id: number) => {
        if (isChecking) return
        // Virar a carta clicada
        setCardsState(prev =>
            prev.map(card =>
                card.id === id ? { ...card, flipped: true } : card
            )
        )

        const flipped = cardsState.filter(card => card.flipped && !card.matched)

        if (flipped.length === 1) {
            // Se já tiver uma carta virada, verificar match
            const firstId = flipped[0].id
            const secondId = id

            setIsChecking(true) // bloqueia novos cliques
            verifyMatch(firstId, secondId)
            setTimeout(() => setIsChecking(false), 800) // libera depois de 1s
        }
    }

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

    const handleSuccess = () => {
        if (pontuacao === 7) { // 8 pares, mas a pontuação é incrementada após encontrar um par
            setSuccess(true)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
        
        {/* Mensagem de vitória */}
        {success && (
            <div className="text-center bg-green-400 text-black font-semibold p-6 rounded-2xl shadow-xl animate-bounce">
                <p className="text-2xl mb-2">🎉 Parabéns! Você venceu!</p>
                <p>⏱ Tempo: {formatTime(time)}</p>
                <p>⭐ Pontuação: {pontuacao}</p>
                <button
                    onClick={handleShuffle}
                    className="mt-4 bg-white text-green-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition"
                >
                    Jogar Novamente
                </button>
            </div>
        )}

        {/* Área do jogo */}
        {!success && (
            <div className="w-full flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between bg-white text-black p-4 rounded-xl shadow-md">
                <p className="font-mono text-lg">⏱ {formatTime(time)}</p>
                <h1 className="text-3xl font-extrabold">Jogo da Memória</h1>
                <div className="flex items-center gap-4">
                <p className="font-semibold">Pontuação: {pontuacao}</p>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition"
                    onClick={handleShuffle}
                >
                    Reiniciar
                </button>
                </div>
            </div>

            {/* Grid de cartas */} 
            <div className="grid lg:grid-cols-8 grid-cols-4  gap-4 p-4 justify-items-center items-center">
                {cardsState.map(card =>
                <Card key={card.id} cards={card} handleClick={() => handleCardClick(card.id)} />
                )}
            </div>
            </div>
        )}
        </div>
    )
}
