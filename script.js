const form = document.getElementById("checkerForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const from = document.getElementById("from").value.toUpperCase();
  const to = document.getElementById("to").value.toUpperCase();
  const day = document.getElementById("day").value;

  if (!from || !to || !day) {
    result.textContent = "Please fill everything out.";
    result.style.color = "red";
    return;
  }

  let message = "";
  let color = "";

  if (day === "Tue" || day === "Wed") {
    message = "✅ Good chance. Midweek flights are usually easier.";
    color = "green";
  }
  else if (day === "Mon" || day === "Thu") {
    message = "⚠️ Okay chance. Have at least one backup flight.";
    color = "orange";
  }
  else {
    message = "❌ Higher risk. Weekend flights are usually more full.";
    color = "red";
  }

  result.style.color = color;
  result.textContent = `${from} → ${to}: ${message}`;
});