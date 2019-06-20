var x = 1;

console.log("X is "+x);

function globalFunction(s){
    return s * s;
}

var myLibName = {};

myLibName.myFunction = function myFunction(s){
    return s*s;
}

var person = {
    firstname : "John",
    callMe : function callMe(){
        console.log(this.firstname);
    }
}

var users = [
    {
        name: "John",
        age: 18
    },
    {
        name: "Anna",
        age: 26
    }
]

var countryRanking = {
    USA : 1,
    Norway: 2,
    China: 5,
    Brazil: 4,
    Canada: 3
}

function buttonClick(event){
    console.log(this.innerHTML);
    console.log(event);
}

function init(){
    document.getElementById("button").addEventListener("click", () => {
        console.log("Here is the first event")
    })

    document.getElementById("button").addEventListener("click", buttonClick);
}