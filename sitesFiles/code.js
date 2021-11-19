document.addEventListener("DOMContentLoaded", init)

//create variables we want to reference on entire page 
const baseUrl = 'https://placekeanu.com/';

function init(){
    document.querySelector("#submitbutton").addEventListener("click", (e)=>formsubmit(e))
    fetch("https://api.adviceslip.com/advice") 
    .then(r=>r.json())
    .then(data=>{
        console.log(data.slip.advice)
        const adviceOne = document.querySelector("#advice-one");
        adviceOne.textContent = data.slip.advice;
    })
    // couldn't get the second advice slip to generate so I deleted so as not to overcomplicate 
}


function formsubmit(e){
    e.preventDefault();
    const form = e.target.parentNode.parentNode.parentNode;

    //create variables for the text content from each form input
    const noun = form.querySelector("#noun").querySelector("input");
    const adjective = form.querySelector("#adjective").querySelector("input");
    const superlative = form.querySelector("#superlative").querySelector("input");
    const secondNoun = form.querySelector("#noun-Two").querySelector("input");
    
    createMadLibs(noun.value, adjective.value, superlative.value, secondNoun.value)
    summonKeanu(noun.value, adjective.value, superlative.value, secondNoun.value);

    // add save to db.json somewhere and possibly a delete button
    noun.value = "";
    adjective.value = "";
    superlative.value = "";
    secondNoun.value = "";
}

function createMadLibs(noun, adjective, superlative, secondNoun){
    const madLibs = document.querySelector("#mad-libs-div")

    //variables for where the mad-libs form values will be added
    const first = document.querySelector("#value-one");
    const second = document.querySelector("#value-two");
    const third = document.querySelector("#value-three");
    const fourth = document.querySelector("#value-four");

    console.log(noun, adjective, superlative, secondNoun);
    // here we update the mad libs with the new strings we got

    first.textContent = `Keanu means "cool breeze over the ${noun}" in Hawaiian.` 
    second.textContent = `His breakthrough acting role came when he played time-travelling slacker 
    in the science fiction comedy Bill & Ted's ${adjective} Adventure (1989).`  
    third.textContent = `The release of John Wick (2014) was met with 
    positive reviews, with critics labeling it as one of Reeves' ${superlative} performances 
    and one of the best action films of 2014.`
    fourth.textContent = `The story focuses on John Wick (Reeves) 
    searching for the men who broke into his home, stole his ${secondNoun} and killed 
    his puppy, which was a last gift to him from his recently deceased wife.`

    madLibs.append(first, second, third, fourth);
}


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
            const wordarr = r[1];
            console.log(wordarr);
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
    let lengthadjusted = 0;
    if(ifClicked){
       let lengthadjusted = 1;
    }
    else{
        let lengthadjusted = 0;
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












// document.addEventListener("DOMContentLoaded", init)

// //create variables we want to reference on entire page 
// const baseUrl = 'https://placekeanu.com/';

// const madLibs = document.querySelector("#shabaw-form");
// madLibs.addEventListener("submit", formsubmit);

// //create variables for the text content from each form input
// const noun = form.querySelector("#noun").querySelector("input");
// const adjective = form.querySelector("#adjective").querySelector("input");
// const superlative = form.querySelector("#superlative").querySelector("input");
// const secondNoun = form.querySelector("#noun-Two").querySelector("input");

// //variables for where the mad-libs form values will be added
// const first = document.querySelector("#value-one");
// const second = document.querySelector("#value-two");
// const third = document.querySelector("#value-three");
// const fourth = document.querySelector("#value-four");


// function init(){
//     fetch("https://api.adviceslip.com/advice") 
//     .then(r=>r.json())
//     .then(data=>{
//         console.log(data.slip.advice)
//         const adviceOne = document.querySelector("#advice-one");
//         adviceOne.textContent = data.slip.advice;
//     })
//     // couldn't get the second advice slip to generate so I deleted so as not to overcomplicate 
// }


// function formsubmit(e){
//     e.preventDefault();
//     const form = e.target.parentNode.parentNode.parentNode;
    
//     console.log(noun.value, adjective.value, superlative.value, secondNoun.value);
//     debugger;
    
//     function createMadLibs(){
//         debugger;
//         // here we update the mad libs with the new strings we got
    
//         // first.textContent = `Keanu means "cool breeze over the ${noun}" in Hawaiian.` 
//         // second.textContent = `His breakthrough acting role came when he played time-travelling slacker 
//         // in the science fiction comedy Bill & Ted's ${adjective} Adventure (1989).`  
//         // third.textContent = `The release of John Wick (2014) was met with 
//         // positive reviews, with critics labeling it as one of Reeves' ${superlative} performances 
//         // and one of the best action films of 2014.`
//         // fourth.textContent = `The story focuses on John Wick (Reeves) 
//         // searching for the men who broke into his home, stole his ${secondNoun} and killed 
//         // his puppy, which was a last gift to him from his recently deceased wife.`
    
//         // madLibs.append(first, second, third, fourth);
//     }
//     summonKeanu();

//     // add save to db.json somewhere and possibly a delete button
//     noun.value = "";
//     adjective.value = "";
//     superlative.value = "";
//     secondNoun.value = "";
// }



    




// function summonKeanu(noun = 5, adjective = 8, superlative = "y", adverb = "n"){
//     if(noun === 5 && adjective === 8 && superlative === "y" && adverb === "n"){
//         //this is where the default fetch request for the initial picture will go, we change the default values to be whatever we want the picture to be
//     }
//     else{
//         fetch("http://localhost:3000/random-alphabet")
//         .then(r=>r.json())
//         .then(r=>{
//             const summonArr = [];
//             const arg = [...arguments];
//             arg.forEach(e=>{
//                 summonArr.push(e.slice(-2))
//             })
//             console.log(summonArr)
//             for(let i = 0; i < 2; i++){
//                 const a = summonArr[i].slice(-1).toLowerCase().charCodeAt(0) - 97;
//                 const b = summonArr[i].slice(-2, 1).toLowerCase().charCodeAt(0) - 97;
//                 summonArr[i] = r.alphabet[a] * r.alphabet[b];
//             }
//             if(r.alphabet2.includes(summonArr[2].slice(-1))){
//                 summonArr[2] = "y"
//             }
//             else{
//                 summonArr[2] = "";
//             }
//             if(r.alphabet2.includes(summonArr[3].slice(-1))){
//                 summonArr[3] = "g"
//             }
//             else{
//                 summonArr[3] = "";
//             }
//             return [summonArr, arg] //changed the return to return both the random number and words for storage reasons...
//         })
//         .then(r=>{
//             console.log(r)
//             const numarr = r[0];
//             const wordarr = r[1]
//             const newImage = document.querySelector("#form-img");
//             console.log(newImage)
//             newImage.src = `${baseUrl}/${numarr[0]}/${numarr[1]}/${numarr[2]}${numarr[3]}`

//             fetch("http://localhost:3000/summoned-ones", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body : JSON.stringify({
//                     furl : newImage.src,
//                     words : wordarr,
//                     timeassigned : {
//                         year : new Date().getFullYear(),
//                         month : new Date().getMonth(),
//                         day : new Date().getDay(),
//                         hours : new Date().getHours(),
//                         minutes : new Date().getMinutes(),
//                         seconds : new Date().getSeconds(),
//                         milliseconds : new Date().getMilliseconds()
//                     }
//                 })
//             })
//             .then(r=>r.json())
//             .then(r=>{
//                 const deleteCurrentButton = document.createElement("button");
//                 deleteCurrentButton.textContent = "x";
//                 deleteCurrentButton.id = "very-id"
//                 deleteCurrentButton.addEventListener("click", e=>delCurBut(e, r))
//                 document.querySelector("#image-section").append(deleteCurrentButton)
//                 removalContigency(r)
//                 createButtons(true)
//             })

//         })
//         //this is where the equations and then the fetch request would be
//     }
// }




// function delCurBut(event, r){
//     event.preventDefault()
//     document.querySelector("#form-img").src = "";
//     document.querySelector("#very-id").remove()
//     fetch(`http://localhost:3000/summoned-ones/${r.id}`, {
//         method: "DELETE",
//         headers : {
//             "Content-Type" : "application/json"
//         }
//     })
//     .then(r=>r.json())
//     .then(r=>console.log(r))
// }
// function removalContigency(r){
//     fetch("http://localhost:3000/summoned-ones")
//     .then(r=>r.json())
//     .then(r=>{
//         r.forEach(e=>{
//             if(e.furl === returned.furl && e.id != returned.id){
//                 fetch(`http://localhost:3000/summoned-ones/${e.id}`,{
//                 method: "DELETE",
//                 headers : {
//                     "Content-Type" : "application/json"
//                 }
//                 })
//             }
//         })
//     })
// }
// function createButtons(ifClicked = false){
//     let lengthadjusted = 0;
//     if(ifClicked){
//        let lengthadjusted = 1;
//     }
//     else{
//         let lengthadjusted = 0;
//     }
//     fetch("http://localhost:3000/summoned-ones")
//     .then(r=>r.json())
//     .then(r=>{
//         for(const i = 0; i < r.length - lengthadjusted; i++){
//             const funNewButton = document.createElement("button")
//             const date = r[i].timeassigned
//             funNewButton.textContent = `${date.year}-${date.month}-${date.day}-${date.hours}-${date.minutes}-${date.seconds}-${date.milliseconds}`
//             funNewButton.addEventListener("click", e=>summonKeanu2(e, r[i]))
//         }
//     })
// }


// function summonKeanu2(event, keanudata){
//     const newImage = document.querySelector("#form-img");
//     newImage.src = keanudata.furl;
//     const deleteCurrentButton = document.createElement("button");
//     deleteCurrentButton.textContent = "x";
//     deleteCurrentButton.id = "very-id"
//     deleteCurrentButton.addEventListener("click", e=>delCurBut(e, r))
//     document.querySelector("#image-section").append(deleteCurrentButton)
//     event.target.remove()
// }





