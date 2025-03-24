import React from 'react';

interface GameWidowDialogProps {
    resetGame: () => void;
}

function GameLoseWindow(props: GameWidowDialogProps) {
    return (
        <div className="z-40 w-1/4 h-1/4 flex flex-col justify-center items-center bg-yellow-400">
            <span className="">
                Você perdeu!
            </span>
            <button onClick={props.resetGame}>Reiniciar jogo</button>
        </div>
    );
}

export default GameLoseWindow;
