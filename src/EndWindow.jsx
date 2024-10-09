function EndWindow({win,word, onRestart}){
    
    function getText(){
        return (win?"You win":"You lose")
    }
    
        return (
        <div>
            <h2>The word:{word}</h2>
            <p>{getText()}</p>
            <button onClick={onRestart}>Try Again</button>
        </div>
    )
}

export default EndWindow