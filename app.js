// Cuentas //
const accounts = [
  {
    identificationNumber: 1010,
    userName: "Lina",
    userPassword: 908070,
    accountBalance: 350,
  },
  {
    identificationNumber: 1020,
    userName: "Juana",
    userPassword: 807060,
    accountBalance: 100,
  },
  {
    identificationNumber: 1030,
    userName: "Gerardo",
    userPassword: 706050,
    accountBalance: 100,
  },
];

const maxAmount = 990;
const minAmount = 10;

// Declaración de constantes //

const logInButton = document.getElementById("login-button"); //boton para desplegar form de login
const logOutButton = document.getElementById("logout-button"); //boton para refrescar pág
const loginUser = document.getElementById("login-form-div"); // div con el form de login
const welcomeMessage = document.getElementById("welcomeMessage"); // el h3 con saludo al usuario
const accountUserData = document.getElementById("account-user-data"); // div con las opciones para el usuario
const checkAccountBalance = document.getElementById("check-account-balance"); // botón para consultar el saldo
const myBalanceIs = document.getElementById("my-balance-is"); // Div que contiene el <p> con el saldo
const balanceAccount = document.getElementById("balance-account"); // <p> que informa el saldo al usuario
const newBalanceAccount = document.getElementById("new-balance-account"); // <p> que informa el saldo actualizado
const newBalanceAccount2 = document.getElementById("new-balance-account2"); // <p> que informa el saldo actualizado
const depositMoney = document.getElementById("deposit-money"); // Botón que despliega el DIV de consignar
const cleanSum = document.getElementById("form-sum-deposit-amount"); //formulario de suma
const depositAmount = document.getElementById("deposit-amount"); // DIV con el form de depositar dinero
const sumImputAmount = document.getElementById("deposit-amount-value"); // imput que toma el valor del deposito del usuario
const validDepositAmountValue = document.getElementById(
  "valid-deposit-amount-value"
); // Botón que toma la información del valor a sumar
const withdrawMoney = document.getElementById("withdraw-money"); // Botón que despliega el DIV de retirar
const withdrawAmount = document.getElementById("withdraw-amount"); // DIV con el form de retirar dinero
const cleanRest = document.getElementById("form-rest-deposit-amount"); // formulario de resta
const restImputAmount = document.getElementById("withdraw-amount-value"); // imput que toma el valor del retiro del usuario
const validWithdrawAmountValue = document.getElementById(
  "valid-withdraw-amount-value"
); // Botón que toma la información del valor a restar

//BOTONES//

// Ingreso a la cuenta - despliega el DIV con el form para el login
logInButton.addEventListener("click", function (logInButton) {
  loginUser.style.display = "block";
});

// Salida de la cuenta - refresca la pág para cerrar la sesión
logOutButton.addEventListener("click", function (logOutButton) {
  location.reload();
});

// desplegar divs segun los botones de opciones para usuario //

// desplegar valor del saldo //
checkAccountBalance.addEventListener("click", function (checkAccountBalance) {
  console.log("click");
  myBalanceIs.style.display = "block";
  depositAmount.style.display = "none";
  withdrawAmount.style.display = "none";
});

// desplegar el DIV del deposito de dinero //
depositMoney.addEventListener("click", function (depositMoney) {
  console.log("click");
  depositAmount.style.display = "block";
  myBalanceIs.style.display = "none";
  withdrawAmount.style.display = "none";
});

// desplegar el DIV del retiro de dinero //
withdrawMoney.addEventListener("click", function (withdrawMoney) {
  console.log("click");
  withdrawAmount.style.display = "block";
  depositAmount.style.display = "none";
  myBalanceIs.style.display = "none";
});

// FUNCIONES

// Validación de usuario y contraseña para ingreso a la cuenta

function verifyUser() {
  //trae los datos ingresados de usuario y contraseña
  identificationNumber = parseInt(
    document.getElementById("identification-number").value
  );
  userPassword = parseInt(document.getElementById("user-password").value);

  //valida que la contraseña y el usuario sean correctas
  let verify = !!accounts.find(
    (element) =>
      element.identificationNumber === identificationNumber &&
      element.userPassword === userPassword
  );
  console.log(verify);

  //si la contraseña y el usuario generan un true entonces - alert de ingreso exitoso y oculta el DIV de login e ingreso a la cuenta
  // y muestra el boton de salir de la cuenta el div con los botones de consultar saldo, consignar y retirar.
  if (verify) {
    alert("¡Ingreso Exitoso!");
    logInButton.style.display = "none";
    loginUser.style.display = "none";
    logOutButton.style.display = "block";
    accountUserData.style.display = "block";
  } else {
    alert("Número de Identificación o contraseña incorrectos");
    location.reload();
  }
}

// Función que lo hace todo //

document
  .getElementById("loginUserButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const identificationNumber = document.getElementById(
      "identification-number"
    ).value;

    const account = accounts.find(
      (account) => account.identificationNumber == identificationNumber
    ); // busca el número del ID entre los objetos y si lo encuentra trae todos sus valores

    if (account) {
      welcomeMessage.textContent = `Hola ${account.userName} qué quieres hacer hoy ? `;
      balanceAccount.textContent = `Tu saldo a la fecha es de USD ${account.accountBalance}.`;
    } // si el account es verdadero trae el saludo personalizado y el valor actual de mi cuenta

    console.log(account.accountBalance);

    //funcion para consignar

    validDepositAmountValue.addEventListener("click", function (event) {
      //cuando le dan click al botón esta función
      event.preventDefault();
      console.log("Clik");

      const stringForSum = document.getElementById(
        //trae el valor que uso el usuario en el imput como string
        "deposit-amount-value"
      ).value;
      const ValueForSum = parseInt(stringForSum); // convierte el string a número

      account.accountBalance += ValueForSum; // suma el imput y modifica el valor del saldo en la cuenta

      // formula que verifica el cumplimiento de la condición
      if (account.accountBalance > maxAmount) {
        //si no la cumple envía una alerta y
        alert("La transacción supera los montos establecidos");
        account.accountBalance -= ValueForSum; // si no cumple hace la resta del valor del imput para no modificar el valor del saldo en la cuenta
        cleanSum.addEventListener("submit", function (event) {
          //limpia el form
          event.preventDefault();
          cleanSum.reset();
        });
      } else {
        // si cumple la condición
        account.accountBalance; // toma el nuevo valor del saldo en la cuenta
        newBalanceAccount.textContent = `Tu saldo nuevo saldo es de USD ${account.accountBalance}.`;
        balanceAccount.textContent = `Tu saldo a la fecha es de USD ${account.accountBalance}.`; //actualiza el valor en el DIV de consultar saldo.
        cleanSum.addEventListener("submit", function (event) {
          //limpia el form
          event.preventDefault();
          cleanSum.reset();
        });
      }

      console.log(account.accountBalance);
    });

    // función para restar

    validWithdrawAmountValue.addEventListener("click", function (event) {
      //cuando le dan click al botón esta función
      event.preventDefault();
      console.log("Clik");

      const stringForRest = document.getElementById(
        "withdraw-amount-value"
      ).value; //trae el valor que uso el usuario en el imput como string
      const ValueForRest = parseInt(stringForRest); // convierte el string a número

      account.accountBalance -= ValueForRest; // resta el imput y modifica el valor del saldo en la cuenta

      // formula que verifica el cumplimiento de la condición
      if (account.accountBalance < minAmount) {
        //si no la cumple envía una alerta y
        alert("La transacción supera los montos establecidos");
        account.accountBalance += ValueForRest; // si no cumple hace la suma del valor del imput para no modificar el valor del saldo en la cuenta
        cleanRest.addEventListener("submit", function (event) {
          //limpia el form
          event.preventDefault();
          cleanRest.reset();
        });
      } else {
        // si cumple la condición
        account.accountBalance; // toma el nuevo valor del saldo en la cuenta
        newBalanceAccount2.textContent = `Tu saldo nuevo saldo es de USD ${account.accountBalance}.`;
        balanceAccount.textContent = `Tu saldo a la fecha es de USD ${account.accountBalance}.`; //actualiza el valor en el DIV de consultar saldo.
        cleanRest.addEventListener("submit", function (event) {
          //limpia el form
          event.preventDefault();
          cleanRest.reset();
        });
      }
      console.log(account.accountBalance);
    });
  });
