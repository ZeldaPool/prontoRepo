# Was it Rufus

**Steps to run the code**
1. Open editor/IDE/terminal in the directory of the repository with the pronto.js file (This is so that windows does not block permission for accessing directory)
2. Run the command 
```
node pronto.js
```

The desired output should be printed

<hr>

**Steps to test on your own directory/local repository**
1. Copy the pronto.js file in the root of your desired repository (Windows does not allow code to access a git repository if it is in another directory)
2. Change the testDirectory variable in pronto.js (line 106)
The format of the directory/local repository path is as follows
>"W:/prontoProject/prontoRepo/.git"
3. Open editor/IDE/terminal in the directory of the repository with the pronto.js file (This is so that windows does not block permission for accessing directory)
4. Run the command 
```
node pronto.js
```

The desired output should be printed for your repository

<hr>

**EXAMPLE OUTPUT**

![image](https://user-images.githubusercontent.com/41510591/213964979-8fed58b0-b6c1-47bc-a245-915a0fbdaa63.png)

In the image above, the active branch is Master <br>
There has not been any changes after the last commit <br>
The latest commit was within the last 7 days <br>
No, we don't need to blame Rufus for this
