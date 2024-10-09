import LetterButton from "./LetterButton";

function LetterButtonContainer({letters, handleButtonClick}){

    function generateButtons(){
        const res = []
        for (let index = 0; index < letters.length; index++) {
            res.push(<LetterButton key={index}
                                   className={letters[index]===1? "wrong-button" : letters[index]===2 ? "correct-button":"unpressed-button"}
                                   letterIndex={index}
                                   letterVal={letters[index]} 
                                   handleClick={()=>handleButtonClick(String.fromCharCode(97+index))}/>)
        }
        return res;
    }

    return (
        <div>{generateButtons()}</div>
    )
}

export default LetterButtonContainer