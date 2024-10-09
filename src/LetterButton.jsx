function LetterButton({letterIndex=0,letterVal=0,className="unpressed-button",handleClick}){
    return (
        <button className={className} disabled={letterVal!==0} onClick={handleClick}>
            {String.fromCharCode(65 + letterIndex)}
        </button>
    )
}

export default LetterButton