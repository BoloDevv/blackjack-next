import React from 'react';
import VisualHand from "@/app/components/game/VisualHand";
import {Dealer, Player} from "@/utils/types";
import GameActionButton from "@/app/components/game/GameActionButton";
import GameLoseWindow from "@/app/components/game/GameLoseWindow";

interface visualGameProps {
    hit: (player: Player) => void;
    stand: (dealer: Dealer) => void;
    players: Player[];
    dealer: Dealer;
    isGameLost: boolean;
    resetGame: () => void;
}

function VisualGame(props: visualGameProps) {
    const {hit, stand, players, dealer, isGameLost, resetGame} = props;

    const renderPlayersHands = () => {
        return players.map((player: Player, index) => {
            return (
                <div key={index} className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl mb-4 text-main">{player.name}</h2>
                    <div className="flex relative flex-col items-center">
                        <VisualHand hand={player.hand} key={index}/>
                        <div className="flex h-full w-full">
                            <GameActionButton onClick={() => hit(player)} action="hit"/>
                            <GameActionButton onClick={() => stand(player)} action="stand"/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (

        <div className="bg-blackjack-board h-screen w-full relative flex flex-col justify-center items-center">
            {isGameLost ? (
                <GameLoseWindow resetGame={resetGame}/>
            ) : null}
            <div className="flex relative flex-col justify-center items-center h-1/2 w-1/4">
                <h2 className="text-2xl mb-4 text-main">Dealer</h2>
                <VisualHand hand={dealer.hand}/>
            </div>
            <div className="flex relative justify-center items-center h-1/2">
                {renderPlayersHands()}
            </div>
        </div>
    );
}

export default VisualGame;