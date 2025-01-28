const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const fromOption = document.querySelectorAll(".converter select")
const btn = document.querySelector(".btn-converter button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".converted p");

window.addEventListener =("load", () =>{
    updateExchangeRate();
});


for(let select of fromOption){
    for (curr in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curr;
        newOption.value = curr;
        if(select.name === "from" && curr === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && curr === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector(".converter img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() => {
    let amount = document.querySelector(".inputv input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue <1){
        amtValue = 1;
        amount.value = "1"; 
    }
    
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json;
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}