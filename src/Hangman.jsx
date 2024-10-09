import { useState, useRef, useEffect} from "react"
import HangmanImage from "./HangmanImage";
import WordDisplay from "./WordDisplay";
import LetterButton from "./LetterButton";

function Hangman(){

    const word = useRef("squirrel")
    const [mistakes, setMistakes] = useState(0);
    const [partialWord,setPartialWord] = useState(["_","_","_","_","_","_","_","_"])
    const [letters,setLetters] = useState(Array(26).fill(0))
    const [gameState,setGameState] = useState("startState")
    
    useEffect(()=>{
        getRandomWord(8);
    },[])


    async function getRandomWord(length=5, start='?', samples = 100) {
        const APIREQUEST = `https://api.datamuse.com/words?sp=${start}${'?'.repeat(length-1)}&max=${100}`;
        fetch(APIREQUEST).
        then(request => request.json()).
        then(json => json[Math.floor(Math.random()*Math.min(samples,json.length))].word).
        then(randomWord=>{
            word.current = randomWord;
            setPartialWord(Array(word.current.length).fill('_'));
        })
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

    function generateButtons(){
        const res = []
        for (let index = 0; index < letters.length; index++) {
            res.push(<LetterButton key={index}
                                   letterIndex={index}
                                   letterVal={letters[index]} 
                                   handleClick={()=>handleButtonClick(String.fromCharCode(97+index))}/>)
        }
        return res;
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
    }))}

    }

    return(
        <div>
            <HangmanImage mistakes={mistakes}/>
            <div>
                <WordDisplay partialWord={partialWord} mistakes={mistakes}/>
                <br />
                {generateButtons()}
            </div>
        </div>
    )
}

export default Hangman

