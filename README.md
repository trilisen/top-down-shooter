INSERT MANDATORY GIF

# Zombie Base Defender

Text about the project and which JavaScript library you're using. This would also be a great place to link the game on Netlify.

# Installation

Add the installation instructions.

# Changelog

- [#1 - Add a link to each pull request with a descriptive line.](#1)
- https://github.com/trilisen/top-down-shooter/commit/6650552bd4ef27a4986eb3a18082e04299ca8cd5 -Setup and start on player controller.
- https://github.com/trilisen/top-down-shooter/commit/6e07de9f62614d7d041f0c35864bf9b9ab3a984d -Update to player controller.
- https://github.com/trilisen/top-down-shooter/commit/46fa78d662949b2194b6df8b053c15a9de19ca28 -Small changes to player.
- https://github.com/trilisen/top-down-shooter/commit/da3a0fd01af4726706184851de28f5893d358cea -Added zombies.
- https://github.com/trilisen/top-down-shooter/commit/e428f302250f791373a47df759e7dc6c984d45b6 -Added bullets.
- https://github.com/trilisen/top-down-shooter/commit/0e711153d320625b9b9c9e0111f5f54fe0b6cb37 -Change To bullets.
- https://github.com/trilisen/top-down-shooter/commit/719866d24852f7560f1cf0a26ddfadf61d1873af -Added ending to the game.
- https://github.com/trilisen/top-down-shooter/commit/fb2d2025548c774d575bcb5204dd6d370ad396b2 -Vite
- https://github.com/trilisen/top-down-shooter/commit/78788fbcee648b27bc8624f839303aeecc2001e3 -Changes to the house.
- https://github.com/trilisen/top-down-shooter/commit/e85b50290ba48bd9895df23d61d4a0709ed60680 -Added support for multiple guns.
- https://github.com/trilisen/top-down-shooter/commit/d5c1aa60de34938c9c4dc4379d89e16b07399fb1 -Small changes to guns.
- https://github.com/trilisen/top-down-shooter/commit/bb322a56b38715a1dfc7b301855575bae5c434cd -Added shooting delay to guns.
- https://github.com/trilisen/top-down-shooter/commit/1fd3293aaa7fa8134b8c64198ac08f5387efb9c1 -Changes to guns.

# Code Review by Jonathan Larsson and Agnes Binett

1. `Scene1.js:198-200` - A block of unused code
2. `Scene1.js:89` - Delta is declared but never used
3. `House.js:3` - Unused line of code
4. `index.html` - This is probably irrelevant, but instead of using flex-box and CSS to position your canvas, you could use Phaser to do it in your index.js-file under scale. (for instance: autoCenter: Phaser.Scale.CENTER_BOTH)
5. `/webpack` - Since you're already using vite - Do you still need the webpack folder?
6. `package-lock.json` - There are a lot of dependencies installed (for Babeljs for example), that I don't think you're using.
7. `Installation` - Running npm install I get 4 high severity vulnerabilities (even after running npm audit fix)
8. `Game` - Fun and addictive game overall!
9. `gun.js:27` - Forgotten console.log
10. `.babelrc` - unused?

Great job guys!

# Testers

Tested by the following people:

1. Erik White
2. Mark Mados
3. Agnes Binett
4. Jonathan Larsson

Tested by the following muggles (non-coders):

1. Oliver Wisell
2. Viktor Henrysson
3. Liam McGarvie
4. Kaj Lindström
