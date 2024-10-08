import { useState } from "react"

function WordDisplay({partialWord, mistakes}){

    return(
        <div>{partialWord.join(' ')}</div>
    )
}

export default WordDisplay