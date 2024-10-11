import { useState } from "react"

function WordDisplay({partialWord}){

    return(
        <div className="word-display">{partialWord.join('')}</div>
    )
}

export default WordDisplay