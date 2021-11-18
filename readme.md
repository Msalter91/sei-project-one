# Project 1

## Overview

This is the first project I made as part of my General Assembly Software Engineering Immersive Course. 

### The Brief 

The brief was simple; using only vanilla Javascript, HTML and CSS, to create a grid based space invaders game. 
The point of the game was to use array manipulation to create movement and a playable, enjoyable game. 

The player had to be able to do the following at a minimum:

<ul>
  <li>The player had to be able to clear at least one wave of aliens</li>
  <li> The player's score have to visibile at the end of the game</li>
</ul>

We were encourage to add some enhacements to the game and so I decided to add the following: 

<ul>
  <li>Levels</li>
  <li>Motherships</li>
  <li>Stormtrooper mode</li>
  <li>A locally cached hi-score</li>
  <li>Cheat codes</li>

### The Theme

The idea behind the theme is the very task itself. 

Going into my GA course, I had no programming experience. A good friend of mine introduced me to the concept of rubberduck debugging. Talking to an innanimate quacker helped me work through a lot of early code bugs. So, armed only with my trusty yellow, semi-aquatic companion, I rode into battle against my own code. Slaying bugs one by one and completeing the challenge. Instead of lasers, the player fires sunglass-clad rubber ducks, and must defeat hords of Javascript aliens which drop bugs towards the players. 

## Generating the Game Objects

### The board 
The game is played on a 'grid' of divs that are generated at the start of that game using a for loop. The default grid width is set to 20 but this can easily be changed. 
Each of these divs is pushed into an array cells[] which allows the game to keep track of the positions of various game objects and move them accross the board. 
Along side this - the top row and bottom row of cells is iteratred through and given classes. These classes are used in collision avoidance later on to ensure that objects do not escape the board and crash the game. 

`function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    container.appendChild(cell)
    cells.push(cell)
  }
}`

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

### Shields Up 
The shields positions are hard-coded into an array and once the board is generate the shields are placed into the cells that match their values. 

The shields are the part that I would like to continue working on the most - they disappear when hit by either lasers or bombs, but it would be nice to add an effect where they dissapear gradually over time, or can take multiple hits. 

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
4. If the player hits and alien, the score increased by 100 or 2000 if they hit the mothership. This updates on the player screen.

### Being hit by things 

I really wanted to include the weapons dropped by the aliens in the game and so I added a random number generator to select one Alien in the array and have generate a 'bomb' one grid width below 

Similar to the lasers - everytime a bomb is generated its cell location is pushed into an array and the bombs move in the same way as the laser. Visually this is represented by the class having a background (in this case a bug)

In order to clear the bomb - I gave the bottom layer of the grid the class of 'barrier'. When a class contains both barrier and bomb, the bomb is indexed, sliced from the array and the bomb class removed.

The player being hit by an bomb is checked in the same way as the lasers hitting objects. If hit, the player's life count drops by 1 and a little blood spurt gif appears above the spot where the player was hit for 700ms. 

I did consider adding a sound for this - but as I imagine most people would play with the SFX off, I decided that a visual cue was better. 

### Stormtrooper Mode 

To add a quick way of making the game more challenging I added a 'stormtrooper mode' It can be turned on with a toggle and changes a boulean in the Javascript when activated. 
If stormtrooped mode is turned on the way the shoot function slightly changes - offsetting the lasers initial positions from up to ±4 places from where it would usually be 

![Alt text](/assets/readme_images/stormtroopermodecode.png?raw=true "Optional Title")

One small unintneded consequnce of this is that bullets have the ability to fire from the opposite side of the screen when the player is close to the grid edges - this is something I would like to fx in the next version. 

## The Level System 

One of the key foundations of space-invaders is moving through the levels and the Aliens getting faster every time. So I decided that a level function would make the game much more enjoyable for the players. 

I thought about hard coding the levels in, with a finite number and running a level check at the start of each game. After planning this out a bit, I realised that it was a lot of code and a pretty inefficient way of doing it. 

Plan B was to change the speed of each enemy object movement to a changeable variable. Every level up a function is run which changes their movement functions frequences using the level as a value. 

`function determineSpeed () {
  baseSpeed -= (level * 10)
  alienBombSpeed -= (level * 50)
  mothershipSpeed -= (level * 700)
}`

To successfully pass a level - the game checks the length of alien position array, once it reaches 0, all timer intervals are stopped and and a box appears telling them the level they have passed and giving them the options to continue. Once continue is selected - the board is cleared, the level increased and the speeds reassigned based on the new level. 

## Losing 

THe player starts with 3 lives and loses a life everytime they are hit by an alien bomb. If the life counter reaches 0 - the game is over. Similarly, if any cell has a class of alien and bottom barrier, it means that the aliens have reached the bottom row and the player instantly loses no matter how many lives they have. 

Check loss is a funciton which runs repeatedly in the background and constantly checks for both of these conditions. 

Once a player has lost - the game is stopped and the player shown a game over box which displays their final score and give them options to play again or give up. Both actually reset the game to level 1 and reset all value to start the game again, but it's nice to give the illusion of choice. 


  







