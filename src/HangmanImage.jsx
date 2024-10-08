function HangmanImage({mistakes=0}){

    const IMAGES=[`
  +---+  
  |   |  
      |  
      |  
      |  
      |  
=========`,`
  +---+  
  |   |  
  O   |  
      |  
      |  
      |  
=========`,`
  +---+  
  |   |  
  O   |  
  |   |  
      |  
      |  
=========`,`
  +---+  
  |   |  
  O   |  
 /|   |  
      |  
      |  
=========`,`
  +---+  
  |   |  
  O   |  
 /|\\  |  
      |  
      |  
=========`,`
  +---+  
  |   |  
  O   |  
 /|\\  |  
 /    |  
      |  
=========`,`
  +---+  
  |   |  
  O   |  
 /|\\  |  
 / \\  |  
      |  
=========`]
    return(
        <pre>
			{IMAGES[Math.min(mistakes,6)]}
		</pre>
    )
}

export default HangmanImage