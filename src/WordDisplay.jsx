import { useState } from "react"

function WordDisplay({partialWord, mistakes,gameState}){

    if(gameState==="loadingState"){
        return(<div>LOADING</div>)
    }

    return(
        <div>{partialWord.join(' ')}</div>
    )
}

export default WordDisplay