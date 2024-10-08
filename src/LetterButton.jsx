function LetterButton({letterIndex=0,letterVal=0,handleClick}){
    return (
        <button disabled={letterVal!==0} onClick={handleClick}>
            {String.fromCharCode(65 + letterIndex)}
        </button>
    )
}

export default LetterButton