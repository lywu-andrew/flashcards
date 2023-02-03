# Homework 1

The instructions can be found in `README.md` in the `main` branch. 


## Compiling and running

The project is setup with npm already. `npm install` will install packages, `npm run compile` will run the TypeScript compiler, and `npm run start` will start the compiled program. *Tip*: When using `npm run start`, type `--` after start to ensure arguments you pass are interpreted as part of the `flashcard` command. 

## TS-Standard

The project comes preconfigured with [ts-standard](https://github.com/standard/ts-standard), which you can execute with `npm run lint` or `npx ts-standard`. It is very opinionated and picky about style and will fail the build on minor deviations. You can let it auto-format many things with `npx ts-standard --fix`.

If you do not want to follow this specific style guide, feel free to disable ts-standard entirely from this project or replace it with a differently configured checker. Try to follow a reasonably consistent style in your solution, but we won't require that you meet the ts-standard specs exactly.

## Blocking I/O

The code uses blocking I/O calls which are not idomatic in Node.js. We will discuss this later in the class.

## Testing Strategy

The tests incorporate the strategy of boundary value analysis, which tests certain values on the boundary
of valid and invalid inputs. For example, the number of repetitions for a repeater cannot be less than 1, so the tests account for when the user inputs -1, 0, or 1 for the number of repetitions. This technique was chosen because it's much more efficient to test the boundaries than a wide range of values (say -20 to 20). By splitting up the values by invalid and valid ranges and focusing on a few inputs from each of these ranges, we cut out much redundant testing.

## Specification vs structure testing

With specification testing, the specifications included all the expected behaviors of functions or methods, so I used them as a guide to create my tests. For example, the RecentMistakesFirstSorter class's reorganize function used a stable sort and the NonRepeatingCardOrganizer marks completion with any answer. These specs made it much easier for me to know what to test for. In addition, clients typically are only exposed to interfaces, so specification testing is the most important to ensure clients receive expected behaviors.
On the other hand, structure testing got confusing at times when there weren't specific guards or warnings about certain function usage. In one instance, I tried calling checkNewAchievements on a card deck with no results on each card, but the program exited with an IndexOutOfBounds error. It took a while for me to trace down exactly which function caused the error, so I believe that specification testing is better in this regard. However, even though specification testing is easier, structure testing is still important because the underlying structure of the program should be robust.
