"use client";
import useGameState from "@/app/hooks/useGameState";
import {useState} from "react";
import {Player} from "@/utils/types";
import VisualGame from "@/app/components/game/VisualGame";
import BackgroundPattern from "@/app/components/BackgroundPattern";
import {Work_Sans} from "next/font/google";
import {PlayCircle} from "lucide-react";

export const fontaic = Work_Sans({
    subsets: ['latin'],
    variable: '--font-worksans',
});

function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    const [playerQuantity, setPlayerQuantity] = useState(1);
    const {createGameState, hit, stand, players, dealer, isGameLost, resetGameState} = useGameState()
    const uninitializedPlayers: Player[] = []

        function startGame() {
        for (let i = 0; i < playerQuantity; i++) {
            uninitializedPlayers.push({id: `${i + 1}`, hand: [], name: `player${i + 1}`})
        }

        createGameState({id: "dealer", hand: []}, uninitializedPlayers)
        setGameStarted(true)
    }

    return (
        <div className="min-h-screen">
            {gameStarted ? (
                    <VisualGame hit={hit} stand={stand} players={players} dealer={dealer} isGameLost={isGameLost} resetGame={resetGameState}/>
            ): (
                <div className="min-h-screen bg-gradient-to-b from-blackjack-board to-green-800 text-white">
                    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
                        <BackgroundPattern/>
                        <div className="relative z-10 text-center px-4">
                            <h1 className="text-6xl md:text-7xl mb-6 text-transparent bg-clip-text drop-shadow-2xl">
                                <span className={`text-transparent font-bold bg-clip-text bg-gradient-to-r from-main-btn to-yellow-200 ${fontaic.className}`}>Royal Blackjack</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">Sinta a adrenalina do 21 na ponta dos seus dedos. </p>
                            <button
                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-main-btn hover:bg-yellow-400
                     text-black font-bold text-lg rounded-full transition-all duration-300
                     transform hover:scale-105 hover:shadow-xl cursor-pointer"
                                onClick={() => startGame()}
                            >
                                <span>Jogar Agora</span>
                                <PlayCircle className="w-6 h-6 group-hover:animate-pulse" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}


export default Game;