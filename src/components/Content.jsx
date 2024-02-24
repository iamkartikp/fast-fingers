import React, { useState } from 'react';
import { useEffect } from 'react';
import ModalComponent from './common/Modal';
import useSpeechSynthesis from 'react-speech-kit/dist/useSpeechSynthesis';
import content from "../assets/content.json";

export default function Content() {
    const [words, setWords] = useState("");
    const [difficulty, setDifficulty] = useState("1");
    const [fluency, setFluency] = useState("");
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
            speak({ text: words.split(" ")[index + 1] })
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
        setWords(content[difficulty][Math.floor(Math.random() * 6)])
    }, [difficulty])

    useEffect(() => {
        if (isTimerStart) {
            const interval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            if (seconds <= 0) {
                handleFluency();
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

    const handleChangeEvent = (e) => {
        const value = e.target.value;
        setDifficulty(value);
    }

    function handleFluency() {
        if (score < 20) {
            setFluency("Slow");
        } else if (score < 40) {
            setFluency("Average");
        } else if (score < 60) {
            setFluency("Fluent");
        } else if (score < 80) {
            setFluency("Fast");
        } else {
            setFluency("Pro");
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center m-2">
            <h1 className="text-uppercase">typing speed test</h1>

            <h5 className="text-uppercase mt-5">Select Difficulty</h5>
            <select className="form-select w-25" id="difficulty" onChange={handleChangeEvent}>
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
            </select>
            <p className="w-75 fs-5 words my-2">
                {words.split(" ").map((word, i) => <span className={`class${i}`} key={i}> {word}</span>)}
            </p>
            <div className="d-flex justify-content-around w-75 my-3">
                <span className="d-flex flex-column align-items-center justify-content-center rounded-border"> <p className="fs-4">{seconds}</p> <p>seconds</p></span>
                <span className="d-flex flex-column align-items-center justify-content-center rounded-border"> <p className="fs-4">{score}</p> <p>score</p></span>
            </div>
            <input className="form-control w-50 mt-4" placeholder="Start typing here..." onKeyUp={handleEnteredWords} />
            <ModalComponent isModalOpen={isModalOpen} fluency={fluency} score={score} index={index} setModalClose={setModalClose} />
        </div>
    )
}