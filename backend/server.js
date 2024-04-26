const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const app = express();

// Enable CORS middleware


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



app.post('/pathvalue',(req,res)=>{
    let das=req.body;
    console.log(das);
    res.send(das)
})




// Function to read CSV file and convert to JSON
function readCSVAndConvertToJSON() {
    const jsonArray = [];
    fs.createReadStream('C:\\Users\\Victus\\Documents\\Capstone\\Results\\x_results.csv')
        .pipe(csv())
        .on('data', (row) => {
            jsonArray.push(row);
        })
        .on('end', () => {
            // Write JSON data to file
            fs.writeFileSync('data.json', JSON.stringify(jsonArray));
            console.log('CSV file successfully processed.');
        });
}

// Initial data conversion
readCSVAndConvertToJSON();    

// Schedule data conversion every 60 seconds
setInterval(readCSVAndConvertToJSON, 2000);



// Route to serve JSON data
app.get('/data', (req, res) => {
    // Read JSON data from file
    const jsonData = fs.readFileSync('data.json', 'utf8');
    res.json(JSON.parse(jsonData));
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
