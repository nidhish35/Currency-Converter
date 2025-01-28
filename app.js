const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const fromOption = document.querySelectorAll(".converter select");
const btn = document.querySelector(".btn-converter button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".converted p");

window.addEventListener("load", () => {
    // Populate the currency options
    for (let select of fromOption) {
        for (let curr in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = curr;
            newOption.value = curr;
            if (select.name === "from" && curr === "USD") {
                newOption.selected = "selected";
            } else if (select.name === "to" && curr === "INR") {
                newOption.selected = "selected";
            }
            select.append(newOption);
        }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
    updateExchangeRate();
});

const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector(".converter img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    const amount = document.querySelector(".inputv input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const rate = data[toCurr.value.toLowerCase()];
        const finalAmount = amtValue * rate;
        console.log(finalAmount);
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Failed to fetch exchange rate. Please try again later.";
    }
};
