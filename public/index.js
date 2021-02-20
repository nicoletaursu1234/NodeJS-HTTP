const form = document.getElementsByTagName("form");
let file = document.getElementById("file");
let info = document.getElementById("info");
let status = document.getElementById("status__text");

file.addEventListener("change", onChange);
form[0].addEventListener("submit", onSubmit);

function onChange(e) {
  const target = e.target;
  let file = target.files[0];

  if (file) {
    const maxAllowedSize = 2 * 1024 * 1024;

    if (file.size > maxAllowedSize) {
      info.textContent =
        "The file is too big! Please select a file smaller than 2MB";

      target.value = "";
    } else {
      info.textContent = file.name;

      console.log(file);
    }
  }
}

function onSubmit(e) {
  e.preventDefault();

  let form = new FormData();
  
  let to = document.getElementById("to").value;
  let subject = document.getElementById("subject").value;
  let text = document.getElementById("text").value;
  let file = document.getElementById("file").files[0];

  form.append("to", to);
  form.append("subject", subject);
  form.append("text", text);
  form.append("file", file);

  axios
    .post("http://localhost:3000/send", form, {
      "Content-Type": "multipart/form-data",
    })
    .then((res) => handleResponse(res))
    .catch((err) => handleResponse(err));

  e.target.reset();
}

function handleResponse(res) {
  let statusContainer = document.getElementById("status");

  statusContainer.style.display = "block";

  if (res.status == 200) {
    status.textContent = "Email was sent successfully!";
    status.style.color = "green";
  } else {
    status.textContent = "Email was not sent. Please try again.";
    status.style.color = "darkred";
  }

  setTimeout(() => {
    statusContainer.style.display = "none";
  }, 5000);
}
