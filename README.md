# Homework 1

The instructions can be found in `README.md` in the top level directory 

## Note on Checkstyle

After you make changes to `Main.java`, you might notice that the build fails due to a checkstyle error. This is due to the `// TODO` comment; it will succeed when that comment is removed. You will probably see builds fail quite a bit more often during this course, as you push your own code. Keep an eye on this; it is often a helpful signal that something is broken or imperfect, so learning to read the logs to figure out why it failed is a helpful skill. Naturally, the build should not fail when you turn in your assignments.

## Specification vs structure testing

With specification testing, the specifications included all the expected behaviors of functions or methods, so I used them as a guide to create my tests. For example, the RecentMistakesFirstSorter class's reorganize function used a stable sort and the NonRepeatingCardOrganizer marks completion with any answer. These specs made it much easier for me to know what to test for. In addition, clients typically are only exposed to interfaces, so specification testing is the most important to ensure clients receive expected behaviors.
On the other hand, structure testing got confusing at times when there weren't specific guards or warnings about certain function usage. In one instance, I tried calling checkNewAchievements on a card deck with no results on each card, but the program exited with an IndexOutOfBounds error. It took a while for me to trace down exactly which function caused the error, so I believe that specification testing is better in this regard. However, even though specification testing is easier, structure testing is still important because the underlying structure of the program should be robust.
