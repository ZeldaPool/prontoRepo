const gitFacts = (git_dir) => {

    //exec for running the command line arguments for git directory
    const { exec } = require('child_process');
    const util = require('util');

    //We need to promisify exec so we can wait for the commands to return an output
    const execute = util.promisify(exec);

    //Pre-defining the required variables to store the required outputs
    let activeBranch;
    let localChanges;
    let recentChanges;
    let blameRufus;

    //We need to run 2 git commands to get the required info
    //git status for the activeBranch and localChanges
    //git log for the recentChanges and whether to blame Rufus or not

    //executeStatus for running the git status command
    const executeStatus = async () => {
        try {
            const {stdout} = await execute('git --git-dir='+git_dir+' status') 

            //outputArray will store the string in an array format by new lines
            let outputArray = stdout.split("\n")

            //activeBranch will always be on the 3rd word of the first line of output which we store in activeBranch
            activeBranch = outputArray[0].split(" ")[2];
        
            //removing the first line incase our branch name is one of the change status and that might interfere with our next part of code
            outputArray.shift()

            //converting the rest of the part of the output to a string again
            outputArray = outputArray.toString()

            //if this string has the word "modified:" or "new file:" or "deleted:" that means there is a change that is detected
            if(outputArray.search("modified:")!= -1 || outputArray.search("deleted:")!= -1 || outputArray.search("new file:")!= -1){
                //we make localChanges true if that is the case
                localChanges = true;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    //executeLog for running the git status command
    const executeLog = async () => {
        try{
            //here we are using the "--pretty=format" parameter to just get the author name and the date of the latest commit
            const {stdout} = await execute('git --git-dir='+git_dir+' log --pretty=format:"%an %ad"')
            
            //outputArray will store the string in an array format by spaces
            let outputArray = stdout.split(" ")
        
            //the first word in the string or the first element in this array will always be the author name
            let author = outputArray[0]

            //if author is rufus then we blame him otherwise we wont
            author == "Rufus" ? blameRufus = true : blameRufus = false;
        
            //getting the date which will always be the following elements according to our log after the pretty parameter 
            let date = outputArray[2] + " " + outputArray[3] + " " + outputArray[5]
        
            //here we are just considering the date and not the time in the day for commit to check the recentChanges parameter
            //we can add the timing constraint as well if needed with couple extra lines of code

            //commitDate will be the date of the latest commit in date format
            var commitDate = new Date(date);

            //today will be the current date
            var today = new Date();
            
            //We are parsing the date to get a numerical format for the same for easy comparison
            //Adding 7 days to the commit date which is explained in the next comment
            commitDate = Date.parse(new Date(commitDate.getFullYear(), commitDate.getMonth(), commitDate.getDate() + 7))
            today = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
        
            //if after adding 7 days in commit date if it is smaller than today's date it means that the commit was done more than 7 days prior to today
            commitDate >= today ? recentChanges = true : recentChanges = false
        }
        catch (error){
            console.log(error)
        }
        
    }

    //Promise to make sure that the commands are executed first
    //That will make sure that we have values in our variables that we require
    Promise.all([executeStatus(), executeLog()]).then(() => {

        //we can modify this to return the values, but for now as per the prompt I am printing the required data
        console.log("active branch: " + activeBranch)
        console.log("local changes: " + localChanges)
        console.log("recent changes: " + recentChanges)
        console.log("blame rufus: " + blameRufus)
    });

}

// Test example with the same repository
testDirectory = "W:/prontoProject/prontoRepo/.git"
gitFacts(testDirectory)