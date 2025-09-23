import React from 'react';
import { useState } from 'react';

export default function Wordle() {
    const [word, setWord] = useState("");
    const [guess, setGuess] = useState("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z]*$/.test(value) && value.length <= 5) {
            setWord(value);
        }
    };


    const handleGuess = () => {
        if (word.length === 5) {
            setGuess(word);
        } else {
            alert("Word must be exactly 5 letters!");
        }
    };


    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <input
                type="text"
                value={word}
                onChange={handleChange}
                placeholder="Enter 5-letter word"
                className="w-60 text-center"
            />
            <button onClick={handleGuess} className="w-32">
                Guess
            </button>
            {guess && (
                <div className="mt-4 text-xl font-bold">Your guess: {guess}</div>
            )}
        </div>
    );
}