const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

//data
var data = 
[
{
name: "Ahmed",
photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
scores: [
"5",
"1",
"4",
"4",
"5",
"1",
"2",
"5",
"4",
"1"
]
},
{
name: "Jacob Deming",
photo: "https://pbs.twimg.com/profile_images/691785039043022849/oWsy8LNR.jpg",
scores: [
"4",
"2",
"5",
"1",
"3",
"2",
"2",
"1",
"3",
"2"
]
},
{
name: "Jeremiah Scanlon",
photo: "https://avatars2.githubusercontent.com/u/8504998?v=3&s=460",
scores: [
"5",
"2",
"2",
"2",
"4",
"1",
"3",
"2",
"5",
"5"
]
},
{
name: "Louis T. Delia",
photo: "https://pbs.twimg.com/profile_images/639214960049000449/lNCRC-ub.jpg",
scores: [
"3",
"3",
"4",
"2",
"2",
"1",
"3",
"2",
"2",
"3"
]
},
{
name: "Lou Ritter",
photo: "https://m.facebook.com/photo.php?fbid=10208500699025296&id=1542229019&set=a.1549418665704.77596.1542229019&source=11",
scores: [
"4",
"3",
"4",
"1",
"5",
"2",
"5",
"3",
"1",
"4"
]
},
{
name: "Jordan Biason",
photo: "https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/12741971_10205764267089153_4212986785721953092_n.jpg?oh=4e18265f7d380167223a97fbd7eba278&oe=57B78445",
scores: [
"4",
"4",
"2",
"3",
"2",
"2",
"3",
"2",
"4",
"5"
]
},
{
name: "John Doe",
photo: "google.com",
scores: [
"2",
"3",
"3",
"4",
"3",
"3",
"5",
"1",
"3",
"2"
]
},
{
name: "Yoyo",
photo: "https://image.shutterstock.com/z/stock-vector-yo-yo-273937748.jpg",
scores: [
"5",
"5",
"5",
"5",
"5",
"5",
"1",
"1",
"1",
"4"
]
}
]



//Express listening to port
app.listen(port, function() {
    console.log("express listening to", port)
});


//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});


app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req,res){
    res.json(data);
});


app.post("/api/friends", function(req,res){
    var newUser = req.body;

    var min = 100;
    var friendIndex;
    for(var i=0; i < data.length; i++){
        var difference=0;
        for(var x = 0; x < 10; x++ ){
            difference += Math.abs(data[i].scores[x] - newUser.scores[x]);
        }
        if(difference < min){
            min = difference;
            friendIndex = i;
        }
        console.log("Name: "+ data[i].name+"----Difference: "+difference)
    }
    console.log("=========================");
    console.log("Least difference was: "+min+" at index: "+friendIndex);
    res.json(data[friendIndex]);

})