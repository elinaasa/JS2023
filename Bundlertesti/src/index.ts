import { greeting } from "./functions/greetings";

const h1Element = document.getElementById("greeting");
if (h1Element) {
  h1Element.innerHTML = greeting("moi");
}
