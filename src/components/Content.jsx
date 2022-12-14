import React, { useState } from 'react';
import { useEffect } from 'react';
import ModalComponent from './common/Modal';
import useSpeechSynthesis from 'react-speech-kit/dist/useSpeechSynthesis';

export default function Content() {
    const [words] = useState("Something wasn't right The farmer's market buzzed around him, his arms heavy with his cloth totes filled to the brim. There'd been a lovely selection of candles this morning. Now he waited among the sea of humanity in the square for the curly-haired vendor to wrap his fresh-cut flowers. An acoustic band played in the middle of the market, twangy notes bouncing off tents and muddled with the voices of the crowd. He reached out for his wrapped bouquet with a smile while alarm bells rang in his head. It seemed like a pleasant day- from all the available information, it was. Yet every time he turned a corner, every time he bumped into someone and mumbled his apologies, he felt as if eyes were burning into the back of his skull. He checked his breath rate and found it functionally normal. He tested his blinking mod and found no concerns. Still, as he weaved through the market, he zoned in on the port-o-johns and stood in line as calmly as he could.");
    let [index, setIndex] = useState(0);
    let [score, setScore] = useState(0);
    let [seconds, setSeconds] = useState(60);
    let [isTimerStart, setTimerStart] = useState(false);
    let [isModalOpen, setModal] = useState(false);
    const { speak } = useSpeechSynthesis();

    const handleEnteredWords = (e) => {
        let word1 = e.target.value
        if (word1.length) {
            if (!isTimerStart) {
                startTimer();
            }
        }
        if (e.key === " ") {
            speak({ text: words.split(" ")[index+1] })
            // setEnteredWords(word1.trim())
            if (word1.trim().split(" ")[word1.trim().split(" ").length - 1] === words.split(" ")[index]) {
                setScore(score + 1);
                document.querySelector(`.class${index}`).classList.add('active');
            } else {
                document.querySelector(`.class${index}`).classList.add('inactive');
            }
            setIndex(index + 1)
        }
    }

    useEffect(() => {
        if (isTimerStart) {
            const interval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            if (seconds <= 0) {
                calculateFinalScore();
            }

            return () => {
                clearInterval(interval);
            };
        }
    });

    const startTimer = () => {
        setTimerStart(true);
    }

    const calculateFinalScore = () => {
        setModal(true);
        setTimerStart(false);
    }

    const setModalClose = () => {
        window.location.reload();
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center m-2">
            <h2 className="text-uppercase">typing speed test</h2>
            <p className="w-75 fs-5 words my-2">
                {words.split(" ").map((word, i) => <span className={`class${i}`} key={i}> {word}</span>)}
            </p>
            <div className="d-flex justify-content-around w-75 my-3">
                <span className="d-flex flex-column align-items-center justify-content-center rounded-border"> <p className="fs-4">{seconds}</p> <p>seconds</p></span>
                <span className="d-flex flex-column align-items-center justify-content-center rounded-border"> <p className="fs-4">{score}</p> <p>score</p></span>
            </div>
            <input className="form-control w-50 mt-4" placeholder="Start typing here..." onKeyUp={handleEnteredWords} />
            <ModalComponent isModalOpen={isModalOpen} score={score} index={index} setModalClose={setModalClose} />
        </div>
    )
}