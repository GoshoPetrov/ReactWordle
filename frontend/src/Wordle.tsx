import React from 'react';
import { useState } from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';

const words = [
    "APPLE",
    "BRAVE",
    "CRANE",
    "DRIVE",
    "ELATE",
    "FRAME",
    "GHOST",
    "HONEY",
    "INPUT",
    "JUMBO",
    "KNIFE",
    "LIGHT",
    "MIGHT",
    "NINJA",
    "OCEAN",
    "PRIDE",
    "QUILT",
    "RIVER",
    "SHINE",
    "TRAIN",
    "UNITY",
    "VALUE",
    "WATER",
    "XENON",
    "YIELD",
    "ZEBRA",
];

let randomWord = "";

function GetRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
}

GetRandomWord();
console.log(randomWord);

export default function Wordle() {
    const [word, setWord] = useState("");
    const [guess, setGuess] = useState("");
    const [results, setResults] = useState<[string, string][][]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z]*$/.test(value) && value.length <= 5) {
            setWord(value);
        }
    };

    // function evaluateGuess(solution: string, guess: string) {
    //     const result = Array(guess.length).fill("gray"); // default all gray
    //     const solArr = solution.split("");
    //     const guessArr = guess.split("");

    //     // Pass 1: mark greens
    //     for (let i = 0; i < guessArr.length; i++) {
    //         if (guessArr[i] === solArr[i]) {
    //             result[i] = "green";
    //             solArr[i] = ""; // consume
    //             guessArr[i] = "";
    //         }
    //     }

    //     // Pass 2: mark yellows
    //     for (let i = 0; i < guessArr.length; i++) {
    //         if (guessArr[i] && solArr.includes(guessArr[i])) {
    //             result[i] = "yellow";
    //             solArr[solArr.indexOf(guessArr[i])] = ""; // consume
    //         }
    //     }

    //     return result;
    // }


    const handleGuess = () => {
        if (word.length !== 5) {
            alert("Word must be exactly 5 letters!");
            return;
        }

        const newResult: [string, string][] = [];

        if (word === randomWord) {
            console.log("That's the word!");
        } else {
            console.log("That IS NOT the word");
        }

        for (let i = 0; i < 5; i++) {
            if (word[i] === randomWord[i]) {
                newResult.push([word[i], "green"]);
            } else if (randomWord.includes(word[i])) {
                newResult.push([word[i], "yellow"]);
            } else {
                newResult.push([word[i], "gray"]);
            }
        }

        setResults((prev) => [...prev, newResult]); // add this row of guesses
        setGuess(word);
        setWord(""); // clear input
    };



    const handleKey = (key: string) => {
        if (key === "Enter") {
            handleGuess();
        } else if (key === "Backspace") {
            setWord((prev) => prev.slice(0, -1));
        } else if (/^[a-zA-Z]$/.test(key) && word.length < 5) {
            setWord((prev) => prev + key.toUpperCase());
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

            <div className="history"></div>

            {guess && (
                <div className="">{guess}</div>
            )}

            <div className="mt-4 space-y-2">
                {results.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center">
                        {row.map(([letter, color], i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded ${color === "green"
                                        ? "bg-green-500"
                                        : color === "yellow"
                                            ? "bg-yellow-400"
                                            : "bg-gray-500"
                                    }`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <OnScreenKeyboard onKey={(k) => handleKey(k)} />
            </div>


        </div>

    );
}