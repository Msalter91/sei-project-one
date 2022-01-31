# Project 1

## Overview

This is the first project I made as part of my General Assembly Software Engineering Immersive Course. 
The brief was simple; using only vanilla Javascript, HTML and CSS, create a grid-based Space Invaders game in one week. 
The point of the game was to use array manipulation to create movement and a playable, enjoyable game.

## Built with

<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Git</li>
  <li>GitHub</li>
</ul>

## Deployed Version

[Play the deployed version of this game](https://msalter91.github.io/sei-project-one/)
[Finished Space Invaders Game]()


## Key Features

The player had to be able to do the following at a minimum:

<ul>
  <li>The player had to be able to clear at least one wave of aliens</li>
  <li> The player's score have to visible at the end of the game</li>
</ul>

Bonus features that I added to the game (all detailed below)

<ul>
  <li>Levels</li>
  <li>Motherships</li>
  <li>Stormtrooper mode</li>
  <li>A locally cached hi-score</li>
  <li>Cheat codes</li>
</ul>

## The Theme

The idea behind the theme is the very task itself. 

Going into my GA course, I had no programming experience. A good friend of mine introduced me to the concept of 'rubber duck debugging'. Talking to an inanimate quacker helped me work through a lot of early code bugs. So, armed only with my trusty yellow, semi-aquatic companion, I rode into battle against my own code. Slaying bugs one by one and completing the challenge. Instead of lasers, the player fires sunglass-clad rubber ducks, and must defeat hordes of Javascript aliens which drop bugs towards the players.

### The board

At the start, the board was a 20x20 grid made using a for loop. After testing, I realised that the top and bottom of the grid needed a barrier class added to facilitate collision detection. 

![Javascript-code](/assets/readme_images/grid-generation.png?raw=true)

### The Aliens  
The far left cells on rows 2 to 4 are given a class of 'alien' which gives them their image.
Three rows are generated independently on the top left hand side of the grid. I decided to generate the rows individually because this could allow for greater customisation later on. 

### The Player
The middle of the bottom row is given the class of player which has a background of a panicking Fry from Futurama - my spirit animal during many of my debugging attempts. 

### BONUS The Shields 
The shields positions are hard-coded into an array and once the board is generate the shields are placed into the cells that match their values. 

The shields are the part that I would like to continue working on the most - they disappear when hit by either lasers or bombs, but it would be nice to add an effect where they disappear gradually over time, or can take multiple hits. 

### BONUS The Mothership 
The mothership (represented by a friendly little Haskell logo) is generated independently. The function generates the mothership after 15 seconds in level one and then a little bit quicker every subsequent level. 

## Movement 

Every movable object in the game has its position stored in an array. When there is a need for movement, the position array is changed accordingly and the classes removed from the old position and added to the new one. 

The player moves on a 'keydown' event and the aliens, bombs and lasers all move on a set time. The movement of the aliens is set into a pattern and lasers and bombs fall straight from where they were fired. 

## Collisions

Collisions was the biggest challenge of this project. 

There are 3 things that can happen to the laser once it's shot. It can hit an alien, hit the mothership or miss everything. All of them were handled separately.

I created a function that runs on a repeat timer in the background to check if any of the laser positions are in the same cell that has a class of alien, mothership or top-barrier the following things happens. 

1. The class of laser is removed from the collision cell 
2. If needed the class of alien or mothership is also removed 
3. In order to make sure that the Aliens stay dead and that the lasers don't continue on into oblivion and crash the game - the laser and alien need to be sliced from their array. 
The index of the alien hit and the laser that hit it are put into variables and then I used the slice method to cut that single laser/alien from the array. 
4. If the player hits and alien, the score increased by 100 or 2000 if they hit the mothership. This updates on the player screen.

The bombs that the aliens drop follow a similar function, but that checks for the players position and takes a player life away if a collision is detected. 

## Winning

This game has a permanently increasing difficulty system. 

I thought about hard coding the levels in, with a finite number and running a level check at the start of each game. After planning this out a bit, I realised that it was a lot of code and a pretty inefficient way of doing it. 

Plan B was to change the speed of each enemy object movement to a changeable variable. Every level up a function is run which changes the frequency of their movement functions using the level as a value. 

![Java Script code](/assets/readme_images/speed-function.png?raw=true)

To successfully pass a level - the game checks the length of alien position array, once it reaches 0, all timer intervals are stopped and and a box appears telling them the level they have passed and giving them the options to continue. Once continue is selected - the board is cleared, the level increased and the speeds reassigned based on the new level.


## Losing 

THe player starts with 3 lives and loses a life every time they are hit by an alien bomb. If the life counter reaches 0 - the game is over. Similarly, if any cell has a class of alien and bottom barrier, it means that the aliens have reached the bottom row and the player instantly loses no matter how many lives they have. 

## The Bonus Features

I reached an MVP stage of this project with a couple of days to spare and challenged my self to add some fun bonus features that would stretch my knowledge:

### Stormtrooper Mode 

To add a quick way of making the game more challenging I added a 'stormtrooper mode' It can be turned on with a toggle and changes a boolean in the Javascript when activated. 
If stormtrooper mode is turned on the way the shoot function slightly changes - offsetting the lasers initial positions from up to ±4 places from where it would usually be 

![JavaScript code](/assets/readme_images/stormtroopermodecode.png?raw=true)

One small unintended consequences of this is that bullets have the ability to fire from the opposite side of the screen when the player is close to the grid edges - this is something I would like to fx in the next version. 

### Cheat codes 

Cheat codes were an essential part of my gaming in the 90s, so I thought I'd have a go at adding some that instantly changed the game variables. 

![JavaScript code](/assets/readme_images/cheatcodes.png?raw=true)

### High scores 

The user is also able to generate high-scores. These are stored in the local storage. 

![JavaScript code](/assets/readme_images/hi-score.png?raw=true)


## Blocks Encountered
<ul>
  <li>Default keyboard key behaviours affecting other functions</li>
    <li>Managing collision detection</li>
</ul>

## Wins
<ul>
  <li>Cemented JavaScript knowledge in some key areas and challenged myself with new learning</li>
  <li>A fun theme and design</li>
  <li>Gave the game some novel features</li>
</ul>

## Known Bugs
<ul>
  <li>Lasers can sometimes miss their collisions with the top barrier</li>
</ul>


<ul>
  <li>Responsive design</li>
  <li>Separate the aliens into rows with different images and scores</li>
</ul>

## Future Improvements 

<ul>
  <li>Responsive design</li>
  <li>Separate the aliens into rows with different images and scores</li>
</ul>

## Key Learnings 
This was my first static JS browser game and it taught me a lot about planning and organising a large piece of code into readable and understandable parts. I consolidated a lot of my understanding of DOM manipulation and most of all just how fun making something from scratch based on your own design is. 







