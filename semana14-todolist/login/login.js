import './style.css';
import { loginUser } from '../firebase.js';

const inputElements = document.querySelector('#login-form').querySelectorAll('input');
console.log(inputElements);
const formButton = document.getElementById('login-button');
formButton.addEventListener('click', (e) => login(e));

function login(e) {
  e.preventDefault();

  const loginInfo = {};

  inputElements.forEach((elem) => {
    if (elem.value && elem.value.length > 0) {
      loginInfo[elem.name] = elem.value;
    } else {
      alert('No todos los valores están diligenciados');
    }
  });

  console.log(loginInfo);

  loginUser(loginInfo)
    .then(() => {
      window.location.href = '../index.html';
    })
    .catch((error) => {
      alert('Error en el inicio de sesión: ' + error.message);
    });
}
