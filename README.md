# Memory Game

The memory game is a simple way to test your brain while having fun! 

## How to Play

Click or tap a card to flip it over. As you flip cards remember their symbol and placement with the aim of matching two of the same cards. 

Once you have all cards matched up the time will stop and you'll see how you faired. Play again to try to beat your last time!

<<<<<<< HEAD
##Dependencies 
The Memory game relies on the following: 
* Google fonts for the Dosis and Exo 2 fonts, 
* Font Awesome for card images

Functionality:
* The shuffle and shuffleDeck functions work to provide a new setup of cards on each page load/reset
* The score panel at the top includes a move count, star rating, and timer 
* * The move count allows the user to see how many attempts it took to match all cards in the deck
* * Star rating indicates the relative ability of the player to match cards in as few moves as possible. Stars are removed after 5, 7, 9, and 10+ missed matches.
* * The timer employs an incrementTime and startTimer function to track how long it takes a user to complete a game
* The gamePlay function kicks off gameplay and employs multiple functions (matching, noMatch, and matchCheck) to determine whether card images match or not
* * These functions increase either the win or missed count
* * For a missed count the starReducer function is employed to remove star ratings as the game progresses and the afore mentioned limits are met
* The Reset button allows the player to start over whenever they'd like
* Once all cards are matched the endGame function pops up a modal with player stats and an offer to play again
=======
>>>>>>> 6d838784a1dbdbb051d9a54916a3bfd2a8e9ea44
