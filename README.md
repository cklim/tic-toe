## Introduction:

This game was re-created using Node.js v14, Express, Socket.io, jQuery and plain css. I removed bootstrap library as we're not using most of it classes.
The whole style sheet was rewritten with mobile first approach and a single break-point at 768px, it should look decent in any device with more than 360px in width, and it becomes scrollable on landscape mode and screens with relatively small height. I kept jQuery as the UI library and made extensive use of css classes all throught the game to control the UI.
As discussed in the interview, I added online play feature using socket.io and express, I could be tested if the app is ran on express server as show below.

to install the dependecies required run:

```
npm install
```

to test the app in the localhost:3000 run :

```
npm start
```

## 1- Logic improvements:

| Before                                         | After                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| Starts checking the winner from the first move | **Only Check the winner after 3rd move of each player**               |
| Query Cells by ID on each move                 | **Push cell coordinates into an array and use it for win check**      |
| Checks all possible combinations on each move  | **Check winning combination that includes the last played cell only** |
| Lot of annoying alerts and no reset possibily  | **Proper game flow and home page to change play modes or reset game** |

# 2- Scalability improvements:

- Anything to do with jQuery and UI manipulation is in the UI directory, managed by 3 classes `BoardUI`, `ControlUI` and `ScoreUI`
- The game play flow of offline mode is fully managed by `Game` class
- The game play flow of the online mode managed by `OnlineGame` class which inherits from `Game`
- the optimized Winning algorithm is in under Utils directory in `CheckWinner.js`
- The winning algorithm not limited to 3x3 boards, it could be used for bigger boards such as 4x4 and 5x5
- All reusable constants inside `constants.js` under config

# 3- User experience:

- Removed all the annoying alerts.
- Added the possibility to play against online opponents ( this feature is basic and only set to accomodate 2 players )
- Added a home page to switch between online and offline modes.
- Set animations on different stages to enhanced the user experience
- Set hover-in and hover-out Effects to indicate player turn
- Hidden game controls during the game play
- Added option to continue or reset the game.

# 4- Remarks:

- Known bug: Online play mode might not work as intended in **Mozila mobile view**
- some UI design decisions might not be perfect
