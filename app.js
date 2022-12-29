//Import Packages 
const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');


let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json())

//HTTP get server
app.get('/api/v1/longest-duration-movies',(req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    });
});

//HTTP post 
app.post('/api/v1/longest-duration-movies',(req, res) => {
    // console.log(req.body);
    const newId = movies[movies.length-1].id + 1;

    const newMovie = Object.assign({id: newId}, req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), () =>{
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
     //res.send('created');
});

//Create Server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})