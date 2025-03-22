import React from 'react';
import {PokerAction} from "@/utils/types";

interface GameActionButtonProps {
    action: PokerAction;
    onClick: () => void;
}

function GameActionButton(props: GameActionButtonProps) {
    const {onClick, action} = props;
    return (
        <button onClick={onClick} className="w-2 h-2 mx-8">{action}</button>
    );
}

export default GameActionButton;