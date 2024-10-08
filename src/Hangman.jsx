import { useState} from "react"
import HangmanImage from "./HangmanImage";
import WordDisplay from "./WordDisplay";

function Hangman(){

    const word = "squirrel"
    const [mistakes, setMistakes] = useState(0);
    const [partialWord,setPartialWord] = useState(["_","_","_","_","_","_","_","_"])
    const [letters,setLetters] = useState(Array(5).fill(0))
    


    function findIndices(letter){
        let start = word.indexOf(letter,0);
        const indices = [];
        while (start !== -1){
            indices.push(start);
            start = word.indexOf(letter,start+1);
        }
        return indices;
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

    function makeButtons(){
        const res = []
        for (let index = 0; index < 26; index++) {
            res.push(
            <button key={index} onClick={
                ()=>handleButtonClick(String.fromCharCode(97+index))
            }>
                {String.fromCharCode(65 + index)}
            </button>)
        }
        return res;
    }

    function handleButtonClick(letter){
        const indices = findIndices(letter);
        if (indices.length===0){
            setMistakes(mistakes+1);
        }
        else{
            setPartialWord(pw=>fillPartialWord(pw,indices,letter));
        }
    }

    return(
        <div>
            <HangmanImage mistakes={mistakes}/>
            <div>
                <WordDisplay partialWord={partialWord}/>
                <div>
                    {makeButtons()}
                </div>
            </div>
        </div>
    )
}

export default Hangman

