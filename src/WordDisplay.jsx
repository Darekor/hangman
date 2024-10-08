import { useState } from "react"

function WordDisplay({partialWord}){

    return(
        <div>{partialWord.join()}</div>
    )
}

export default WordDisplay