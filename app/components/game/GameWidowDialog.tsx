import React from 'react';

interface GameWidowDialogProps {
    resetGame: () => void;
}

function GameWidowDialog(props: GameWidowDialogProps) {
    return (
        <div className="z-40 w-1/4 h-1/4">
            <span>
                Você perdeu!
            </span>
            <button onClick={props.resetGame}>Reiniciar jogo</button>
        </div>
    );
}

export default GameWidowDialog;
