import React from 'react';
import {PokerAction} from "@/utils/types";

interface GameActionButtonProps {
    action: PokerAction;
    onClick: () => void;
}

function GameActionButton(props: GameActionButtonProps) {
    const {onClick, action} = props;
    return (
        <button onClick={onClick} className="bg-main-btn rounded-sm w-[50px] h-[50px] m-8 cursor-pointer hover:bg-yellow-400 border">{action}</button>
    );
}

export default GameActionButton;