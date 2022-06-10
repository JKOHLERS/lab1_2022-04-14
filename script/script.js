$(document).ready(function () {
  $("#fromTB").change(fromChange);
  $("#toTB").change(toChange);
});

function fromChange() {
  const fromA = document.getElementById("fromTB").value.toLowerCase();
  fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
    .then(response => response.json())
    .then(data => {
      if (data[fromA]) {
      } else {
        alert("Sorry, currency not found.");
        document.getElementById("fromTB").value = null;
        document.getElementById("fromTB").focus();
      }
    });
}

function toChange() {
  const toA = document.getElementById("toTB").value.toLowerCase();
  fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
    .then(response => response.json())
    .then(data => {
      if (data[toA]) {
      } else {
        alert("Sorry, currency not found.");
        document.getElementById("toTB").value = null;
        document.getElementById("toTB").focus();
      }
    });
}

function conversion() {
  const fromB = document.getElementById("fromTB").value.toLowerCase();
  const toB = document.getElementById("toTB").value.toLowerCase();
  const amountB = document.getElementById("amountTB").value.toLowerCase();

  if ((fromB == "" || toB == "" || amountB == "")) {
    alert("All fields are mandatory!");
  } else {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/' + fromB + '.json')
      .then(response => response.json())
      .then(data => {
        var exRate = data[fromB][toB];
        //console.log(exRate);
        var result = (amountB * exRate).toFixed(2);
        document.getElementById("resultDIV").innerHTML = `${amountB} ${fromB.toUpperCase()} = ${result} ${toB.toUpperCase()}`;
      });
  }
  //localStorage - still not working properly. need to be reviewed.
  var data = { "From": fromB, "To": toB, "Amount": amountB };
  //var pastConversions = [];

  if (localStorage["pastConversions"]) {
    pastConversions = JSON.parse(localStorage["pastConversions"]);
  }

  if (pastConversions.indexOf(data) == -1) {
    pastConversions.unshift(data);
    if (pastConversions.length > 5) {
      pastConversions.pop();
    }
    localStorage["pastConversions"] = JSON.stringify(pastConversions);
  }
  /*
  localStorage.setItem("From", fromB);
  localStorage.setItem("To", toB);
  localStorage.setItem("Amount", amountB);
  */
  console.log(localStorage)
}

