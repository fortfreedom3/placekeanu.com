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
    createMadLibs(noun.value, adjective, superlative, adverb);
    summonKeanu(noun.value, adjective.value, superlative.value, adverb.value);
    // add save to db.json somewhere and possibly a delete button
    noun.value = "";
    adjective.value = "";
    superlative.value = "";
    adverb.value = "";
}

const url = ''

function summonKeanu(noun = 5, adjective = 8, superlative = "y", adverb = "n"){
    if(noun === 5 && adjective === 8 & superlative === "y" && adverb === "n"){
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
                console.log(a)
                console.log(b)
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
            return summonArr
        })
        .then(r=>{
            console.log(r)
        })
        //this is where the equations and then the fetch request would be
    }
}
function createMadLibs(noun, adjective, superlative, adverb){
    // here we update the mad libs with the new strings we got
}