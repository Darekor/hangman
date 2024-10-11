import LetterButton from "./LetterButton";

function LetterButtonContainer({letters, handleButtonClick}){

    function generateButtons(){
        const res = []
        for (let index = 0; index < letters.length; index++) {
            res.push(<LetterButton key={index}
                                   className={(letters[index]===0? "" : "pressed-button")+" choice-button"}
                                   letterIndex={index}
                                   letterVal={letters[index]} 
                                   handleClick={()=>handleButtonClick(String.fromCharCode(97+index))}/>)
        }
        return res;
    }

    return (
        <div className="letter-button-container">{generateButtons()}</div>
    )
}

export default LetterButtonContainer