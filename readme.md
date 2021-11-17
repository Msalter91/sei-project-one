# Project 1

### The Brief 

The brief was simple; using only vanilla Javascript I was tasked to make a Space Invaders style game in a week. 
The player had to be able to clear at least one level of aliens, and the score had to be visible to the player. 

### The Theme

The idea behind the theme is the very task it self. Going into my GA course, I had no programming experience. A good friend of mine introduced me to the concept of rubberduck debugging. Armed only with my trusty yellow, semi-aquatic companion, I had rode into battle against my own code. Slaying bugs one by one and completeing the challenge. Therefore, instead of lasers the player fires sunglass-clad rubber ducks, and must defeat hord and hord of bug dropped Javascript aliens.  

## Generating the Game Objects

### The board 
The game is played on a 'grid' of divs that are generated at the start of that game using a for loop. The default grid width is set to 20 but this can easily be changed. 
Each of these divs is pushed into an array cells[] which allows the game to keep track of the positions of various game objects and move them accross the board. 
Along side this - the top row and bottom row of cells is iteratred through and given classes. These classes are used in collision avoidance later on to ensure that objects do not escape the board and crash the game. 

### The Aliens 
The aliens are placed on the board in a very similar way to the board creation method. 
The far left cells on rows 2-4 are given a class of 'alien' which gives them their image. The image is a simple Javascript logo - I just needed to let JS know who was really in charge whilst I made this game.

They then get pushed into an array, AlienPositions[] which lets me keep track of their positions on the board.
Three rows are generated independently on the top left hand side of the grid. I decided to generate the rows individually because this could allow for an 'easy mode' later on where less rows of aliens are generated in earlier levels. 

### The Mothership 
The mothership (represented by a friendly little Haskell logo) is generated independently of the Aliens in a function. The function generates the alien after 15 seconds in level one and then a little bit quicker every subsequent level. The mothership will always be generated on the top left and its position stored in a variable. 

### The Player
The middle of the bottom row is given the class of player which has a background of a panicing Fry from Futurama - my spirit animal during many of my debugging attempts. The players position is also stored in a variable

## Making a move 

Everything is the game moves and this was one of the most challenging parts of the code. 

### The Player
I made the player move with a simple event listener on the arrow keys. I thought I'd stick with the classic left = move left and right = move right. 

Each time a key is pressed, the playerPosition variable is increased or decreased by 1, depending on the direction, the class of player is removed for the previous position and added to the new one to give the illusion that the player is moving accross the board. 

To stop the player falling off the edge of the grid and into oblivion - the players position is checked against the edges of the grid. 

### The Aliens 
The Aliens move on a count and time function that starts running when the game start button is clicked.

Everytime the function fires, the alienPosition array is itterated through, and each value is increased by one. To make the images move, the alien class is removed from the old positions and added to the new ones. (This is basically how almost all movement is handled)

Each move to the left is counted until it reaches the counter reaches the point where it would be at the edge. Then aliens then move down resetting the directional counter and move in the opposite direction for ever and ever. 

### The Mothership 
Once the moterhship is generated, an interval-timed function is run that increases its position by 1, and adds and removed the class as appropriate. 

## Shooting Things 

The shooting event is handled by a keyup event listener on the S-key. One of the most frustraiting bugs that emerged in the whole process was created by the default behaviour of some keys. Pressing space would cause all my timer based functions to duplicate breaking the alien movement and casusing the game to become unplayable. Once all defaults were prevented within the eventlistener function, the bug was squashed. 

The basic function generates adds a class of laser to the position immediable above the player position. The position is then pushed into an array (similar to the aliens)

The laser's movement is handled by a background function that starts running when the game starts playing. Similar to the alien movement, the array of laser positions is iterated through, increased by the width of the grid, and the class of laser removed and added as appropriate to give the illusion of moving. Finding the correct timing for the laser was a challenge, as having too many lasers bunch up caused unexpected bug. After a little bit of trial and error, the timing was set at 100ms. 

I decided that the aliens should also be able to shoot back. A random alien is selected from the array every 2 seconds and it then drops a 'bomb' towards the player's row. The movement of this is handled similarly to the laser (albeit slower). 

### Hitting things

There are 3 things that can happen to the laser once it's shot. It can hit an alien, hit the mothership or miss everything. 
I decided to handle the collisions by iterating through the array of laser positions. 

I created a function that runs on a repeat timer in the background to check isf any of the laser positions are in the same cell that has a class of alien, mothership or top-barrier the following things happens. 

1. The class of laser is removed from the collision cell 
2. If needed the class of alien or mothership is also removed 
3. In order to make sure that the Aliens stay dead and that the lasers don't continue on into obvlivion and crash the game - the laser and alien need to be sliced from their array. 
The index of the alien hit and the laser that hit it are put into variables and then I used the slice method to cut that single laser/alien from the array. 
4. If the player hits and alien, the score increased by 100. 250 if they hit the mothership. This updates on the player screen.

The player being hit by an bomb is checked in the same way as the lasers hitting objects. If hit, the player's life count drops by 1 and a little blood spurt gif appears above the spot where the player was hit for 700ms. 





