import React from 'react';
import {Club as Clubs, Diamond as Diamonds, Heart as Hearts, Spade as Spades} from "lucide-react";

function BackgroundPattern() {
    return (
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-x-0 flex items-center justify-center scale-150">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {Array.from({length:92}).map((_, i) => (
                        <div key={i} className="flex gap-8">
                            <Spades size={32}/>
                            <Hearts size={32}/>
                            <Diamonds size={32}/>
                            <Clubs size={32}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BackgroundPattern;