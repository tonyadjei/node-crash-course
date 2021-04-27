const fs = require('fs'); //the built-in filesystem modules enables us to create files, read files, work with directories and delete files

// reading files
fs.readFile('./docs/blohg.txt', (err, data) => {
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});

console.log('last line ');

// writing files

fs.writeFile('./docs/blog2.txt', 'hello again', () => {
    console.log('file was written');
});

// working with directories
if(!fs.existsSync('./assets')){ //existsSync() checks whether a folder exists or not, it is synchronous and will stop the program till it is done(it takes a short period of time)
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log("folder created");
    
    })
} else {
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    })
}

// deleting files
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}

