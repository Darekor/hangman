function EndWindow({win,word, onRestart}){
    
    function getText(){
        return (win?"You won!":"You lost!")
    }
    
        return (
        <div>
            <h2 className="word-display">{word}</h2>
            <p>{getText()}</p>
            <button onClick={onRestart}>Try Again</button>
        </div>
    )
}

export default EndWindow