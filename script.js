// Created arrays containing all the characters that will be used to generate a password
var lowercaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialArray = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

// Asks the user their desired password length and returns the user's response
function askPasswordLength() {
  var userResponse = 0;
  while (userResponse == 0) {
    userResponse = parseInt(prompt("Enter desired password length (between 8-128 characters)."));
    // Below if statement brings up an alert and returns userResponse value to 0 to ask the desired password length again if the user enters a non numeric value or a number less than 8 or greater than 128
    if (isNaN(userResponse) || userResponse < 8 || userResponse > 128) {
      alert("Please enter a number between 8-128.");
      userResponse = 0;
    }
  }
  return userResponse;
}

// Asks the user if they would like to include each character type in their password and returns true or false based on their response
function askUser(characterType) {
  return confirm("Would you like to include " + characterType + " characters?");
}

function generatePassword() {
  var passwordLength = askPasswordLength();

  // Loop calls askUser function for each character type to determine which character types will be included in the generated password
  var typeSelect = false;
  while (typeSelect == false) {
    var lowercase = askUser("lowercase");
    var uppercase = askUser("uppercase");
    var numeric = askUser("numeric");
    var special = askUser("special");

    // If statement makes sure the user selects at least one character type to break the loop otherwise brings up an alert and restarts the loop
    if (lowercase || uppercase || numeric || special) {
      typeSelect = true;
    } else {
      alert("Please select at least one character type.");
    }
  }

  // Created empty array and used the following if statements to fill said array with all possible characters that can be used for the password based on the user responses
  var selectArray = [];
  if (lowercase) {
    selectArray = selectArray.concat(lowercaseArray);
  } 
  if (uppercase) {
    selectArray = selectArray.concat(uppercaseArray);
  }
  if (numeric) {
    selectArray = selectArray.concat(numArray);
  }
  if (special) {
    selectArray = selectArray.concat(specialArray);
  }

  // Created a string and used the following loop to fill the string with random characters from selectArray until the string length is the desired password length
  var generatedPassword = ""
  for (var i = 0; i < passwordLength; i++) {
    generatedPassword += selectArray[Math.floor(Math.random() * selectArray.length)];
  }

  return generatedPassword;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
