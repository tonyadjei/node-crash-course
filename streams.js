// readFile() and writeFile() can be used for simpler or smaller files
//for large file sizes, it is best to use streams, so that we can quickly access bits of the data while the file is still loading
//we need to create a stream, and indicate which file we will be passing data from, to do this, we use the createReadStream() method. It takes the name of the file as an argument(relative path)
//the second argument is optional, it is an option object which we can use to pass an 'encoding' property so that we get our buffer in readable format


const fs = require('fs');
let i = 0;

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./docs/blog4.txt');

//in the line below, we place an event listener on our stream object, specifically we listen for the 'data' event. Everytime we get a new buffer(package of data), the callback function is run
//in the callback function, we get access to the buffer.
readStream.on('data', (chunk) => {
    console.log('--------------NEW CHUNK ' + i + ' ---------------')
    // console.log(chunk.toString());
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
    i += 1;
})

//piping: piping is meant to make our lives easier by providing a much faster way of passing data between a readable stream and a writable stream
readStream.pipe(writeStream);