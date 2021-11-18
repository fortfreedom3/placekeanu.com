document.addEventListener("DOMContentLoaded", init)
const baseUrl = 'https://placekeanu.com/';
function init(){
    //we need an initial image loader here
    document.querySelector("#submitbutton").addEventListener("click", (e)=>formsubmit(e))
    fetch("https://api.adviceslip.com/advice") 
    .then(r=>r.json())
    .then(data=>console.log(data))
    fetch("https://api.adviceslip.com/advice") 
    .then(r=>r.json())
    .then(data=>console.log(data))
}
function formsubmit(e){
    e.preventDefault();
    const form = e.target.parentNode.parentNode.parentNode;
    const noun = form.querySelector("#noun").querySelector("input");
    const adjective = form.querySelector("#adjective").querySelector("input");
    const superlative = form.querySelector("#superlative").querySelector("input");
    const adverb = form.querySelector("#adverb").querySelector("input");
    createMadLibs(noun.value, adjective.value, superlative.value, adverb.value);
    summonKeanu(noun.value, adjective.value, superlative.value, adverb.value);
    // add save to db.json somewhere and possibly a delete button
    noun.value = "";
    adjective.value = "";
    superlative.value = "";
    adverb.value = "";
}

//create variables for each piece of form input 
const baseUrl = 'https://placekeanu.com/';

//I'd like to rename the form #ids to make a little more sense to me I don't understand the naming 
const valueOne = document.querySelector("")
const valueTwo = document.querySelector("")
const valueThree = document.querySelector("")
const valueFour = document.querySelector("")

//replace header image with the newly generated keanu image 
const newImage = document.querySelector("#form-img");
newImage.src = `${baseUrl}/${valueOne}/${valueTwo}/${valueThree}${valueFour}`


function summonKeanu(noun = 5, adjective = 8, superlative = "y", adverb = "n"){
    if(noun === 5 && adjective === 8 && superlative === "y" && adverb === "n"){
        //this is where the default fetch request for the initial picture will go, we change the default values to be whatever we want the picture to be
    }
    else{
        fetch("http://localhost:3000/random-alphabet")
        .then(r=>r.json())
        .then(r=>{
            const summonArr = [];
            const arg = [...arguments];
            arg.forEach(e=>{
                summonArr.push(e.slice(-2))
            })
            console.log(summonArr)
            for(let i = 0; i < 2; i++){
                const a = summonArr[i].slice(-1).toLowerCase().charCodeAt(0) - 97;
                const b = summonArr[i].slice(-2, 1).toLowerCase().charCodeAt(0) - 97;
                summonArr[i] = r.alphabet[a] * r.alphabet[b];
            }
            if(r.alphabet2.includes(summonArr[2].slice(-1))){
                summonArr[2] = "y"
            }
            else{
                summonArr[2] = "";
            }
            if(r.alphabet2.includes(summonArr[3].slice(-1))){
                summonArr[3] = "g"
            }
            else{
                summonArr[3] = "";
            }
            return [summonArr, arg] //changed the return to return both the random number and words for storage reasons...
        })
        .then(r=>{
            console.log(r)
            const numarr = r[0];
            const wordarr = r[1]
            const newImage = document.querySelector("#form-img");
            console.log(newImage)
            newImage.src = `${baseUrl}/${numarr[0]}/${numarr[1]}/${numarr[2]}${numarr[3]}`
            fetch("http://localhost:3000/summoned-ones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    furl : newImage.src,
                    words : wordarr,
                    timeassigned : {
                        year : new Date().getFullYear(),
                        month : new Date().getMonth(),
                        day : new Date().getDay(),
                        hours : new Date().getHours(),
                        minutes : new Date().getMinutes(),
                        seconds : new Date().getSeconds(),
                        milliseconds : new Date().getMilliseconds()
                    }
                })
            })
            .then(r=>r.json())
            .then(r=>{
                const deleteCurrentButton = document.createElement("button");
                deleteCurrentButton.textContent = "x";
                deleteCurrentButton.id = "very-id"
                deleteCurrentButton.addEventListener("click", e=>delCurBut(e, r))
                document.querySelector("#image-section").append(deleteCurrentButton)
                removalContigency(r)
                createButtons(true)
            })

        })
        //this is where the equations and then the fetch request would be
    }
}
function createMadLibs(noun, adjective, superlative, adverb){
    // here we update the mad libs with the new strings we got
}
function delCurBut(event, r){
    event.preventDefault()
    document.querySelector("#form-img").src = "";
    document.querySelector("#very-id").remove()
    fetch(`http://localhost:3000/summoned-ones/${r.id}`, {
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(r=>r.json())
    .then(r=>console.log(r))
}
function removalContigency(r){
    fetch("http://localhost:3000/summoned-ones")
    .then(r=>r.json())
    .then(r=>{
        r.forEach(e=>{
            if(e.furl === returned.furl && e.id != returned.id){
                fetch(`http://localhost:3000/summoned-ones/${e.id}`,{
                method: "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
                })
            }
        })
    })
}
function createButtons(ifClicked = false){
    const lengthadjusted;
    if(ifClicked){
        lengthadjusted = 1;
    }
    else{
        lengthadjusted = 0;
    }
    fetch("http://localhost:3000/summoned-ones")
    .then(r=>r.json())
    .then(r=>{
        for(const i = 0; i < r.length - lengthadjusted; i++){
            const funNewButton = document.createElement("button")
            const date = r[i].timeassigned
            funNewButton.textContent = `${date.year}-${date.month}-${date.day}-${date.hours}-${date.minutes}-${date.seconds}-${date.milliseconds}`
            funNewButton.addEventListener("click", e=>summonKeanu2(e, r[i]))
        }
    })
}
function summonKeanu2(event, keanudata){
    const newImage = document.querySelector("#form-img");
    newImage.src = keanudata.furl;
    const deleteCurrentButton = document.createElement("button");
    deleteCurrentButton.textContent = "x";
    deleteCurrentButton.id = "very-id"
    deleteCurrentButton.addEventListener("click", e=>delCurBut(e, r))
    document.querySelector("#image-section").append(deleteCurrentButton)
    event.target.remove()
}