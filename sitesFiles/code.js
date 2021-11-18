document.addEventListener("DOMContentLoaded", init)
function init(){
    //we need an initial image loader here
    document.querySelector("#submitbutton").addEventListener("click", (e)=>formsubmit(e))
}
function formsubmit(e){
    e.preventDefault();
    const form = e.target.parentNode.parentNode.parentNode;
    const noun = form.querySelector("#noun").querySelector("input");
    const adjective = form.querySelector("#adjective").querySelector("input");
    const superlative = form.querySelector("#superlative").querySelector("input");
    const adverb = form.querySelector("#adverb").querySelector("input");
    console.log(noun.value)
    createMadLibs(noun, adjective, superlative, adverb);
    summonKeanu(noun, adjective, superlative, adverb);
    // add save to db.json somewhere and possibly a delete button
    noun.value = ""
}

//create variables for each piece of form input 
const baseUrl = 'https://placekeanu.com/';

//I'd like to rename the form #ids to make a little more sense to me I don't understand the naming 
// const valueOne = document.querySelector("")
// const valueTwo = document.querySelector("")
// const valueThree = document.querySelector("")
// const valueFour = document.querySelector("")

//replace header image with the newly generated keanu image 
const newImage = document.querySelector("#form-img");
// newImage.src = `${baseUrl}/${valueOne}/${valueTwo}/${valueThree}${valueFour}`


function summonKeanu(noun = 5, adjective = 8, superlative = "y", adverb = "n"){
    if(noun === 5 && adjective === 8 & superlative === "y" && adverb === "n"){
        //this is where the default fetch request for the initial picture will go, we change the default values to be whatever we want the picture to be
    }
    else{
        //this is where the equations and then the fetch request would be
    }
}
function createMadLibs(noun, adjective, superlative, adverb){
    // here we update the mad libs with the new strings we got
}