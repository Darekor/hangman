import { useState, useRef, useEffect} from "react"
import HangmanImage from "./HangmanImage";
import WordDisplay from "./WordDisplay";
import LetterButtonContainer from "./LetterButtonContainer";
import StartWindow from "./StartWindow";
import EndWindow from "./EndWindow";
import LoadingWindow from "./LoadingWindow";

function Hangman(){

    const word = useRef()
    const difficulty = useRef(8);
    const [mistakes, setMistakes] = useState(0);
    const [partialWord,setPartialWord] = useState([])
    const [letters,setLetters] = useState()
    const [gameState,setGameState] = useState("startState")
    
    useEffect(()=>{
        if (mistakes>=6){
            setGameState("lossState");
        }
    },[mistakes])

    useEffect(()=>{
        if (partialWord.join("")===word.current){
            setGameState("winState");
            setMistakes(0);
        }
    },[partialWord])


    async function getRandomWord(length=5, start='?', samples = 100) {
        setGameState("loadingState");
        const APIREQUEST = `https://api.datamuse.com/words?sp=${start}${'?'.repeat(length-1)}&max=${100}`;
        try{
            const response = await fetch(APIREQUEST);
            if (!response.ok){
                throw new Error('Network response was not correct');
            }
            const result = await response.json()
            const randomWord = result[Math.floor(Math.random()*result.length)].word;
            gameStartup(randomWord);
        }
        catch(err){
            console.log(err.message);
            setGameState("startState");
        }
    }

    function gameStartup(randomWord) {
        word.current = randomWord;
        setLetters(Array(26).fill(0));
        setPartialWord(Array(word.current.length).fill('_'));
        setGameState("gameState");
        setMistakes(0);
    }



    function handleButtonClick(letter){
        const indices = findIndices(letter);
        if (indices.length===0){
            setMistakes(mistakes+1);
            changeLetter(letter.charCodeAt(0)-97,1)
        }
        else{
            setPartialWord(pw=>fillPartialWord(pw,indices,letter));
            changeLetter(letter.charCodeAt(0)-97,2)
        }

        function findIndices(letter){
            let start = word.current.indexOf(letter,0);
            const indices = [];
            while (start !== -1){
                indices.push(start);
                start = word.current.indexOf(letter,start+1);
            }
            return indices;
        }

        function changeLetter(index,value){
            setLetters(l=>l.map((val,i)=>{
                if (i===index){
                    return value;
                }
                else{
                    return val;
                }
            }))
        }

        function fillPartialWord(pw,indices,letter){
            return pw.map((value,index)=>
                {
                    if (indices.indexOf(index)!==-1){
                        return letter;
                    }
                    return value;
                })
        }
    }

    function chooseComponent(){
        if (gameState==="startState"){
            return(
                <StartWindow onStart={()=>getRandomWord(difficulty.current)}></StartWindow>
            )}
        else if (gameState==="loadingState"){
            return(<LoadingWindow></LoadingWindow>)
        }
        else if (gameState==="gameState"){
            return(<div>
                <WordDisplay partialWord={partialWord}></WordDisplay>
                <br />
                <LetterButtonContainer letters={letters} handleButtonClick={handleButtonClick}></LetterButtonContainer>
            </div>)
        }
        return(<EndWindow word={word.current} win={gameState==="winState"} onRestart={()=>getRandomWord(difficulty.current)}></EndWindow>)
    }


    return(
        <div>
            <h1>Hangman</h1>
            <HangmanImage mistakes={mistakes}/>
            {chooseComponent()}
        </div>
    )
}

export default Hangman

