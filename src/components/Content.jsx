import React, { useEffect, useState } from 'react';

export default function Content() {
    const [words] = useState("Something wasn't right The farmer's market buzzed around him, his arms heavy with his cloth totes filled to the brim. There'd been a lovely selection of candles this morning. Now he waited among the sea of humanity in the square for the curly-haired vendor to wrap his fresh-cut flowers. An acoustic band played in the middle of the market, twangy notes bouncing off tents and muddled with the voices of the crowd. He reached out for his wrapped bouquet with a smile while alarm bells rang in his head. It seemed like a pleasant day- from all the available information, it was. Yet every time he turned a corner, every time he bumped into someone and mumbled his apologies, he felt as if eyes were burning into the back of his skull. He checked his breath rate and found it functionally normal. He tested his blinking mod and found no concerns. Still, as he weaved through the market, he zoned in on the port-o-johns and stood in line as calmly as he could.");
    const [word, setEnteredWords] = useState("");
    let [index, setIndex] = useState(0);
    let [score, setScore] = useState(0);

    const handleEnteredWords = (e) => {
        let word1 = e.target.value
        if(e.key === " ") {
            setEnteredWords(word1.trim())
            console.log(word1.trim().split(" ")[word1.trim().split(" ").length-1], words.split(" ")[index])
            if(word1.trim().split(" ")[word1.trim().split(" ").length-1] === words.split(" ")[index])
                setScore(score+1)
            setIndex(index+1)
        }
    }

    return (
        <div>
            <h2 className="text-capitalize">test your typing skills</h2>
            <h4>{words}</h4>
            <h4>Score: {score}</h4>
            <input onKeyUp={handleEnteredWords} />
        </div>
    )
}