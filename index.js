let password_copied=document.querySelector("[password_copied]")
let copiedText=document.querySelector("[copied-text]")
let copiedIcon=document.querySelector("[copied-icon]")
let password_length=document.querySelector("[password_length]")
let slider_range=document.querySelector("[slider_range]")
let allCheckBox=document.querySelectorAll("input[type=checkbox]")
let passwod_value=document.querySelector("[passwod_value]")
let password_btn=document.querySelector("[password_btn]")
let checkUppercase=document.querySelector("[checkUppercase]")
let checkLowercase=document.querySelector("[checkLowercase]")
let checkNumber=document.querySelector("[checkNumber]")
let checkSymbol=document.querySelector("[checkSymbol]")
let password_strength=document.querySelector("[password_strength]")
let password_strength_color=document.querySelector("[password_strength_color]")
let inputBox=document.getElementsByClassName('inputBox')

const symbols='~`!@#$%^&*()[]{}_,.<>?/;:"=-+'

async function handleCopied(){
    try{
        await navigator.clipboard.writeText(passwod_value.value)
        copiedText.innerHTML="copied"
    }
    catch(e){  
        copiedText.innerHTML="failed"
    }
    copiedText.classList.add("active")

    setTimeout(()=>{
        copiedText.classList.remove("active")
    },2000)
}
copiedIcon.addEventListener("click",()=>{
    if(passwod_value.value){
        handleCopied()
    }
})

let password=""
let passwordLength=10;
let checkCount=0;
handleSlider()


function handleSlider(){
    slider_range.value=passwordLength
    password_length.innerHTML=passwordLength
    const min=slider_range.min
    const max=slider_range.max
    console.log(max)
    console.log(min)
    
    console.log(passwordLength)
    slider_range.style.backgroundSize=(passwordLength-min)*100/(max-min)+"% 100%"
    console.log((passwordLength-min)*100/(max-min))

}
slider_range.addEventListener("input",function(e){
    // passwordLength=slider_range.value
    passwordLength=e.target.value
    handleSlider()
    
})




function randomGenerate(max,min){
    return Math.floor(Math.random()* (max-min) + min)
}
function randomNumber(){
    return randomGenerate(1,9)
}
function randomUperrcase(){
    return String.fromCharCode(randomGenerate(65,91))
}
function randomLowercase(){
    return String.fromCharCode(randomGenerate(97,123))
}
function randomSymbols(){
    let randomIndex=randomGenerate(0,symbols.length)
    return symbols.charAt(randomIndex)
}
function handleCheck(){
    checkCount=0;
    allCheckBox.forEach(checkBox=>{
        if(checkBox.checked){
            checkCount++;
           
        }    
    })

    if(passwordLength<checkCount){
        passwordLength=checkCount
        handleSlider()   
    }
    

}

allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheck)
})




function checkStrength(){
    let hashU=false;
    let hashL=false;
    let hashN=false;
    let hashS=false;

    if(checkUppercase.checked) hashU=true
    if(checkLowercase.checked) hashL=true
    if(checkNumber.checked) hashN=true
    if(checkSymbol.checked) hashS=true

    if(hashU && hashL && hashN && hashS && passwordLength>=10 ){
        password_strength_color.style.backgroundColor="green"
    }
    else if(hashU && hashS && passwordLength>=6){
        password_strength_color.style.backgroundColor="yellow"
    }
    else{
        password_strength_color.style.backgroundColor="red"
    }

}

function suffleValue(array){

    for(let i=array.length-1; i>0; i--){
        let j=randomGenerate(0,i-1)
        let temp=array[i]
        array[i]=array[j]
        array[j]=temp
    }
    let str=""
    for(let i=0; i<array.length; i++){
        str+=array[i];
    }
    return str;
}

password_btn.addEventListener("click",()=>{
    if(checkCount<=0){
        return 
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount
        handleSlider()   
    }
    let FunArray=[];
    password="";
    if(checkUppercase.checked){
        FunArray.push(randomUperrcase)
    }
    if(checkLowercase.checked){
     FunArray.push(randomLowercase)
    }
   if(checkNumber.checked){
    FunArray.push(randomNumber)
   }
   if(checkSymbol.checked){
    FunArray.push(randomSymbols)
   }

   for(let i=0; i<FunArray.length; i++){
    password+=FunArray[i]()
   }
   for(let i=0; i<passwordLength-FunArray.length; i++){
    let randomIndex=randomGenerate(0,FunArray.length)
    password+=FunArray[randomIndex]()
   }
   
   console.log(password)
   password=suffleValue(Array.from(password))

   console.log(password)

    passwod_value.value=password

    checkStrength()


})



