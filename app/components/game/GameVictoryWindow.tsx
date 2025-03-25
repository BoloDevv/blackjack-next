import React, {useEffect} from 'react';
import {motion, useAnimation} from "framer-motion";

interface GameWidowDialogProps {
    resetGame: () => void;
}

function GameLoseWindow(props: GameWidowDialogProps) {
    const containerControls = useAnimation();
    const innerControls = useAnimation();

    const innerVariants = {
        hidden: {opacity: 0, x: 40},
        visible: {opacity: 1, x: 0}
    };

    useEffect(() => {
        async function firstAnimation() {
            await containerControls.start({
                opacity: [0, 0.9],
                transition: {duration: 1}
            });
        }

        async function secondAnimation() {
            await innerControls.start({
                opacity: 1,
                transition: {duration: 2}
            });
        }

        firstAnimation()
        secondAnimation()
    }, [containerControls, innerControls]);

    return (
        <motion.div
            className="z-40 fixed inset-0 items-center bg-black"
            initial={{opacity: 0}}
            animate={containerControls}
        >
            <motion.div
                className="flex flex-col w-full h-full justify-center items-center"
                initial={{opacity: 0}}
                animate={innerControls}
            >
                <motion.h1
                    className="text-6xl md:text-7xl mb-12 text-transparent bg-clip-text drop-shadow-2xl"
                    variants={innerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{delay: 0.4, duration: 0.6}}>
          <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
            Vitória!
          </span>
                </motion.h1>
                <motion.button
                    onClick={props.resetGame}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-lg rounded-full hover:duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
                    variants={innerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{delay: 0.4, duration: 0.6}}
                >
                    Jogar novamente
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default GameLoseWindow;
