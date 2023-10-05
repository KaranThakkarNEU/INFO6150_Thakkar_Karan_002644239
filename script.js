var form = document.getElementById("form");
var title = document.getElementsByName("title");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var emailId = document.getElementById("emailId");
var phoneNumber = document.getElementById("phoneNumber");
var street1 = document.getElementById("street1");
var street2 = document.getElementById("street2");
var city = document.getElementById("city");
var state = document.getElementById("state");
var zipcode = document.getElementById("zipcode");
var miss = document.getElementById("miss");
var mr = document.getElementById("mr");
var mrs = document.getElementById("mrs");
var comments = document.getElementById("comments");
var review = document.getElementById("review");
var reviewContainer = document.getElementById("reviewContainer");
var sourceCheckboxes = document.querySelectorAll(
  "input[type=checkbox][name=source]"
);
var radioBtnGrp = document.querySelectorAll("input[name='title']");
var submitBtn = document.getElementById("submit");
var dataTable = document.getElementById("data-table");
var dataTableBody = document.getElementById("data-table-body");
var placesList = document.getElementById("placesList");
var placesCheckboxContainer = document.getElementById("placeCheckboxContainer");

var selectedSourceCheckboxes = [];
var selectedCitiesCheckboxes = [];

// regex
const noSpecialCharOrNumRegex = "^[a-zA-Z ]+$";
const onlyNumRegex = "^[-0-9]+$";
const phoneNumberRegex = /\d{3}-?\d{3}-\d{4}$/;
const emailIdRegex = "^[a-zA-Z0-9._]+@northeastern.edu$";
const zipcodeRegex = /\d{5}$/;

// add input event listener to all fields to validate field when user types
firstName.addEventListener("input", validateFields);
lastName.addEventListener("input", validateFields);
emailId.addEventListener("input", validateFields);
phoneNumber.addEventListener("input", validateFields);
street1.addEventListener("input", validateFields);
street2.addEventListener("input", validateFields);
city.addEventListener("input", validateFields);
state.addEventListener("input", validateFields);
zipcode.addEventListener("input", validateFields);
comments.addEventListener("input", validateFields);
placesList.addEventListener("change", createDynamicCheckbox);

// add submit event listener to form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  toggleTable("inline-table");

  // insert new row to table
  var newRow = dataTableBody.insertRow(-1);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);
  var cell8 = newRow.insertCell(7);
  var cell9 = newRow.insertCell(8);
  var cell10 = newRow.insertCell(9);
  var cell11 = newRow.insertCell(10);
  var cell12 = newRow.insertCell(11);
  var cell13 = newRow.insertCell(12);
  var cell14 = newRow.insertCell(13);
  var cell15 = newRow.insertCell(14);
  // add data to cell
  cell1.innerHTML = Array.from(radioBtnGrp).filter((rb) => rb.checked)[0].value;
  cell2.innerHTML = firstName.value;
  cell3.innerHTML = lastName.value;
  cell4.innerHTML = emailId.value;
  cell5.innerHTML = phoneNumber.value;
  cell6.innerHTML = street1.value;
  cell7.innerHTML = street2.value;
  cell8.innerHTML = city.value;
  cell9.innerHTML = state.value;
  cell10.innerHTML = zipcode.value;
  cell11.innerHTML = selectedSourceCheckboxes.join(",");
  cell12.innerHTML = placesList.value;
  cell13.innerHTML = selectedCitiesCheckboxes.join(",");
  cell14.innerHTML = review.value;
  cell15.innerHTML = comments.value;

  form.reset();
  resetForm();
});

setInterval(() => {
  let isClassError = document.getElementsByClassName("error");

  isClassError.length
    ? submitBtn.setAttribute("disabled", true)
    : submitBtn.removeAttribute("disabled");
}, 1000);

// check if source(social media) checkboxes is valid
sourceCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      selectedSourceCheckboxes.push(checkbox.value);
    } else {
      selectedSourceCheckboxes = selectedSourceCheckboxes.filter(
        (cb) => cb != checkbox.value
      );
    }

    if (selectedSourceCheckboxes.length) {
      setSuccessMsg(sourceCheckboxes[2], "Looks good!");
    } else {
      setErrorMsg(sourceCheckboxes[2], "Please select one option");
    }
  });
});

// check if radio button is valid
radioBtnGrp.forEach((radioBtn) => {
  radioBtn.addEventListener("change", () => {
    if (radioBtn.checked) {
      setSuccessMsg(radioBtnGrp[2], "Looks good!");
    }
  });
});

/**
 * validates all fields as user types and shows error specific msg
 */
function validateFields(e) {
  let value = e.target.value.trim();

  switch (this.id) {
    case "firstName":
    case "lastName":
      if (!value) {
        setErrorMsg(
          this.id == "firstName" ? firstName : lastName,
          "Please enter name"
        );
      } else if (!value.match(noSpecialCharOrNumRegex)) {
        setErrorMsg(
          this.id == "firstName" ? firstName : lastName,
          "No special character and numbers allowed"
        );
      } else if (value.length < 3) {
        setErrorMsg(
          this.id == "firstName" ? firstName : lastName,
          "length should be greater than 2"
        );
      } else if (value.length > 10) {
        setErrorMsg(
          this.id == "firstName" ? firstName : lastName,
          "length should be less than 10"
        );
      } else {
        setSuccessMsg(
          this.id == "firstName" ? firstName : lastName,
          "Looks good!"
        );
      }
      break;

    case "emailId":
      if (!value) {
        setErrorMsg(emailId, "Please enter email id");
      } else if (!value.match(emailIdRegex)) {
        setErrorMsg(
          emailId,
          "Enter valid email address ending with @northeastern.edu"
        );
      } else if (value.length > 50 || value.length < 17) {
        setErrorMsg(
          emailId,
          "length should be less than 50 and greater than 17"
        );
      } else {
        setSuccessMsg(emailId, "Looks good!");
      }
      break;

    case "phoneNumber":
      if (!value) {
        setErrorMsg(phoneNumber, "Please enter phone number");
      } else if (!value.match(onlyNumRegex)) {
        setErrorMsg(phoneNumber, "Only numbers are allowed");
      } else if (!value.match(phoneNumberRegex)) {
        setErrorMsg(phoneNumber, "format should xxx-xxx-xxxx");
      } else if (value.length < 12 || value.length > 12) {
        setErrorMsg(phoneNumber, "length should be 10");
      } else {
        setSuccessMsg(phoneNumber, "Looks good!");
      }
      break;

    case "street1":
      if (!value) {
        setErrorMsg(street1, "Please enter street 1");
      } else if (value.length > 50) {
        setErrorMsg(street1, "length should be less than 50 characters");
      } else {
        setSuccessMsg(street1, "Looks good!");
      }
      break;

    case "street2":
      if (value && value.length < 50) {
        setSuccessMsg(street2, "Looks good!");
      } else if (value.length > 50) {
        setErrorMsg(street2, "length should be less than 50 characters");
      }
      break;

    case "city":
      if (!value) {
        setErrorMsg(city, "Please enter city");
      } else if (!value.match(noSpecialCharOrNumRegex)) {
        setErrorMsg(
          city,
          "Invalid city. No special characters or numbers allowed"
        );
      } else if (value.length < 3 || value.length > 20) {
        setErrorMsg(city, "Length should be between 3 and 20");
      } else {
        setSuccessMsg(city, "Looks good!");
      }
      break;

    case "state":
      if (!value) {
        setErrorMsg(state, "Please enter state");
      } else if (!value.match(noSpecialCharOrNumRegex)) {
        setErrorMsg(
          state,
          "Invalid state. No special characters or numbers allowed"
        );
      } else if (value.length < 3 || value.length > 20) {
        setErrorMsg(state, "Length should be between 3 and 20");
      } else {
        setSuccessMsg(state, "Looks good!");
      }
      break;

    case "zipcode":
      if (!value) {
        setErrorMsg(zipcode, "Please enter zipcode");
      } else if (value.length > 5 || value.length < 5) {
        setErrorMsg(zipcode, "length should be 5");
      } else if (!value.match(zipcodeRegex)) {
        setErrorMsg(zipcode, "Invalid zipcode");
      } else {
        setSuccessMsg(zipcode, "Looks good!");
      }
      break;

    case "comments":
      if (!value) {
        setErrorMsg(comments, "Please enter comment");
      } else if (value.length > 250) {
        setErrorMsg(comments, "Length should be less than 250 characters");
      } else {
        setSuccessMsg(comments, "Looks good!");
      }
      break;

    case "review":
      if (!value) {
        setErrorMsg(reviewContainer, "Please enter review");
      } else {
        setSuccessMsg(reviewContainer, "Looks good!");
      }
      break;

    default:
      break;
  }
}

/**
 * sets error msg below the field
 * @param {*} element
 * @param {*} message
 */
function setErrorMsg(element, message) {
  let inputControl = element.nextElementSibling;

  inputControl.innerText = message;
  inputControl.classList.remove("success");
  inputControl.classList.add("error");
}

/**
 * sets success msg below the field
 * @param {*} element
 * @param {*} message
 */
function setSuccessMsg(element, message) {
  let inputControl = element.nextElementSibling;

  inputControl.innerText = message;
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
}

function resetForm() {
  let allErrorClass = document.querySelectorAll(".error");
  let allSuccessClass = document.querySelectorAll(".success");

  allErrorClass.forEach((err) => {
    err.innerHTML = "";
  });

  allSuccessClass.forEach((success) => {
    success.innerHTML = "";
    success.classList.add("error");
    success.classList.remove("success");
  });

  // // delete all rows of table
  // for (let index = dataTable.rows.length - 1; index > 0; index--) {
  //   dataTable.deleteRow(index);
  // }
}

function toggleTable(displayProperty) {
  dataTable.style.display = displayProperty;
}

function createDynamicCheckbox() {
  let selectedValue = placesList.value;

  reviewContainer.classList.add("review-hidden");
  review.value = "";
  reviewContainer.nextElementSibling.innerText = "";
  selectedCitiesCheckboxes = [];

  if (selectedValue == "default") {
    placesCheckboxContainer.innerHTML = "";
    setErrorMsg(placesList, "Please select one option");
    return;
  } else {
    switch (selectedValue) {
      case "USA":
        createCheckboxEl(
          ["bosCheckbox", "caCheckbox", "azCheckbox", "nyCheckbox"],
          "usaCheckbox",
          ["Boston", "California", "Arizona", "New York"]
        );
        break;

      case "India":
        createCheckboxEl(
          ["mumCheckbox", "gjCheckbox", "manCheckbox", "rajCheckbox"],
          "indCheckboxes",
          ["Mumbai", "Gujarat", "Manali", "Rajashtan"]
        );
        break;

      case "Canada":
        createCheckboxEl(
          ["torCheckbox", "ottCheckbox", "vanCheckbox"],
          "canCheckbox",
          ["Toronto", "Ottawa", "Vancouver"]
        );
        break;

      case "Europe":
        createCheckboxEl(["barCheckbox", "romCheckbox"], "eurCheckbox", [
          "Barcelona",
          "Rome",
        ]);
        break;

      case "UK":
        createCheckboxEl(
          [
            "lonCheckbox",
            "manCheckbox",
            "birmCheckbox",
            "brisCheckbox",
            "livCheckbox",
          ],
          "ukCheckbox",
          ["London", "Manchester", "Birmingham", "Bristol", "Liverpool"]
        );
        break;

      default:
        placesCheckboxContainer.innerHTML = "";
        break;
    }
  }
}

function createCheckboxEl(idsArr, name, valuesArr) {
  placesCheckboxContainer.innerHTML = "";

  idsArr.forEach((id, index) => {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = name;
    checkbox.id = id;
    checkbox.value = valuesArr[index];

    // Add an onChange event handler to each checkbox
    checkbox.addEventListener("change", function () {
      if (
        checkbox.checked &&
        selectedCitiesCheckboxes.indexOf(checkbox.value) < 0
      ) {
        selectedCitiesCheckboxes.push(checkbox.value);
      } else {
        selectedCitiesCheckboxes = selectedCitiesCheckboxes.filter(
          (cb) => cb != checkbox.value
        );
      }

      if (selectedCitiesCheckboxes.length && placesList.value != "default") {
        setSuccessMsg(placesList, "Looks good!");
      } else {
        setErrorMsg(placesList, "Please select one option");
      }
      toggleTextField(checkbox);
    });

    placesCheckboxContainer.appendChild(checkbox);
    placesCheckboxContainer.appendChild(
      document.createTextNode(valuesArr[index])
    );
  });
}

function toggleTextField(checkbox) {
  if (selectedCitiesCheckboxes.length) {
    reviewContainer.classList.remove("review-hidden");
    review.addEventListener("input", validateFields);
  } else {
    reviewContainer.classList.add("review-hidden");
    review.value = "";
    reviewContainer.nextElementSibling.innerText = "";
  }
}
