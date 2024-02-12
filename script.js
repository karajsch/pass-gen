document.addEventListener("DOMContentLoaded", function () {
  const result = document.getElementById("result");
  const lengthInput = document.getElementById("length");
  const lowercaseToggle = document.getElementById("toggleLowercase");
  const numbersToggle = document.getElementById("toggleNumbers");
  const symbolsToggle = document.getElementById("toggleSymbols");
  const generateBtn = document.getElementById("generate");
  const copyBtn = document.getElementById("copyPW");

  const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  copyBtn.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = result.innerText;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  });

  generateBtn.addEventListener("click", () => {
    const length = +lengthInput.value;
    const hasLower = lowercaseToggle.checked;
    const hasNumber = numbersToggle.checked;
    const hasSymbol = symbolsToggle.checked;

    result.innerText = generatePassword(length, hasLower, hasNumber, hasSymbol);
  });

  lowercaseToggle.addEventListener("click", () =>
    toggleAriaPressed(lowercaseToggle)
  );
  numbersToggle.addEventListener("click", () =>
    toggleAriaPressed(numbersToggle)
  );
  symbolsToggle.addEventListener("click", () =>
    toggleAriaPressed(symbolsToggle)
  );

  function toggleAriaPressed(element) {
    const isPressed = element.checked;
    element.setAttribute("aria-pressed", isPressed);
    element.textContent = isPressed ? "On" : "Off";
  }

  function generatePassword(length, lower, number, symbol) {
    let generatedPassword = "";
    const typesCount = lower + number + symbol;
    const typesArr = [
      { lower },
      { upper: true },
      { number },
      { symbol },
    ].filter((item) => Object.values(item)[0]);

    if (typesCount === 0) return "";

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funName = Object.keys(type)[0];
        generatedPassword += randomFunctions[funName]();
      });
    }

    return generatedPassword.slice(0, length);
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
});
