import React from 'react';
import VisualHand from "@/app/components/game/VisualHand";
import {Dealer, Player} from "@/utils/types";
import GameActionButton from "@/app/components/game/GameActionButton";

interface visualGameProps {
    hit: (player: Player) => void;
    stand: (dealer: Dealer) => void;
    players: Player[];
    dealer: Dealer;
}

function VisualGame(props: visualGameProps) {
    const {hit, stand, players, dealer} = props;

    const renderPlayersHands = () => {
        return players.map((player: Player, index) => {
            return (
                <div key={index} className="flex flex-col justify-center items-center">
                    <h2 className="">{player.name}</h2>
                    <div className="flex relative items-center">
                        <VisualHand hand={player.hand} key={index}/>
                        <div className="flex flex-col w-full h-full">
                            <GameActionButton onClick={() => hit(player)} action="hit"/>
                            <GameActionButton onClick={() => stand(player)} action="stand"/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="bg-blackjack-board min-h-screen relative flex flex-col justify-center items-center">
            <div className="h-1/2 w-full flex flex-col justify-center items-center">
                <h2 className="text-2xl text-main">Dealer</h2>
                <VisualHand hand={dealer.hand}/>
            </div>
            <div className="h-full w-full flex justify-center items-cente">
                    {renderPlayersHands()}
            </div>
        </div>
    );
}

export default VisualGame;