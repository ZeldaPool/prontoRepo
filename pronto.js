let gitStat;
const { exec } = require('child_process');


exec('git --git-dir=W:/prontoProject/prontoRepo/.git status', (err, stdout, stderr) => {
    let outputArray = stdout.split("\n")

    console.log(outputArray)
    //
});

exec('git --git-dir=W:/prontoProject/prontoRepo/.git log --pretty=format:"%an %ad"', (err, stdout, stderr) => {
    let outputArray = stdout.split(" ")

    let author = outputArray[0]
    let date = outputArray[2] + " " + outputArray[3] + " " + outputArray[5]

    var commitDate = new Date(date);
    var today = new Date();
    
    commitDate = Date.parse(new Date(commitDate.getFullYear(), commitDate.getMonth(), commitDate.getDate() + 7))
    today = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate()))

    if (commitDate >= today){
        console.log("WITHIN 7 DAYS")
    }else{
        console.log("NOTTTT WITHIN 7 DAYS")
    }
});

