import React from 'react';
import {FaMinus, FaPlus} from "react-icons/fa";

interface IncrementCounterProps {
    minValue: number;
    maxValue: number;
    increment: number;
    setIncrement: (increment: number) => void;
}

function IncrementCounter(props: IncrementCounterProps) {
    const {increment, setIncrement, minValue, maxValue} = props

    return (
        <div
            className="flex w-full justify-between">
            <button onClick={() => {
                if (increment > minValue) setIncrement(increment - 1);
            }} className="h-12 cursor-pointer text-[#f1c40f]">
                <span><FaMinus/></span>
            </button>

            <p className="flex justify-center items-center text-2xl">{increment}</p>

            <button onClick={() => {
                if (increment < maxValue) setIncrement(increment + 1);
            }} className="cursor-pointer">
                <span className=""><FaPlus/></span>
            </button>
        </div>
    );
}

export default IncrementCounter;