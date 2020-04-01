function invalidName(textbox) {
  if (textbox.value === "") {
    const first = document.createElement("P");
    const text = document.createTextNode("Please enter a name!");
    first.appendChild(text);
    document.querySelector(".name").appendChild(first);
    console.log(text);
  } else if(textbox.value == ' ') {
    const first = document.querySelector(".name");
    first.removeChild(first);
  }
  return true
}
