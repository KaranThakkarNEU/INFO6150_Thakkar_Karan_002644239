//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");

var defaultStudentsCount = 3; // 3 students will always be there when page loads

/**
 * toggles row when clicked on image
 */
function toggleRow(img) {
  var belowRow = img.parentElement.parentElement.nextElementSibling;
  if (belowRow.style.display == "none" || !belowRow.style.display) {
    belowRow.style.display = "table-row";
  } else {
    belowRow.style.display = "none";
  }
}

/**
 * Adds new row in Student table
 */
function addNewStudent() {
  // Get reference of table using table Id
  var tableRef = document.getElementById("myTable");

  // getting index of last row in table
  var lastRowIdx = getLastRowIdx(tableRef);

  // Inserting new row at end of table
  var newStudentRow = tableRef.insertRow(-1);
  var newStudentInfoRow = tableRef.insertRow(-1);
  // extra info row will be collapsed when we add new student
  newStudentInfoRow.style.display = "none";

  // Inserting new cell to newly created row using newRow variable reference
  try {
    // for student row(name,teacher,percentage, etc)
    var newCell0 = newStudentRow.insertCell(0);
    var newCell1 = newStudentRow.insertCell(1);
    var newCell2 = newStudentRow.insertCell(2);
    var newCell3 = newStudentRow.insertCell(3);
    var newCell4 = newStudentRow.insertCell(4);
    var newCell5 = newStudentRow.insertCell(5);
    var newCell6 = newStudentRow.insertCell(6);
    var newCell7 = newStudentRow.insertCell(7);
    var newCell8 = newStudentRow.insertCell(8);
    newCell8.id = "hide-cell";
    newCell8.style.display = "none";
    var newCell9 = newStudentRow.insertCell(9);
    newCell9.id = "hide-cell";
    newCell9.style.display = "none";

    // for collapsible row
    var newInfoCell0 = newStudentInfoRow.insertCell(0);
    newInfoCell0.colSpan = 8;
  } catch (error) {
    alert(`Failed to add new student \nError: ${error}`);
  }

  // add respective data to newly created cell
  try {
    // for student row(name,teacher,percentage, etc)
    newCell0.innerHTML =
      '<input type="checkbox" onclick="checkBoxClick(this)" /><br /><br /><img src="down.png" onclick="toggleRow(this)" width="25px" />';
    newCell1.innerHTML = `Student ${defaultStudentsCount + 1}`;
    newCell2.innerHTML = `Teacher ${defaultStudentsCount + 1}`;
    newCell3.innerHTML = "Approved";
    newCell4.innerHTML = "Fall";
    newCell5.innerHTML = "TA";
    newCell6.innerHTML = `${Math.random()}`.substring(2, 7);
    newCell7.innerHTML = "100%";
    // newCell8.innerHTML = ""; // kept empty. we be filled when row checkbox is clicked
    // newCell9.innerHTML = ""; // kept empty. we be filled when row checkbox is clicked

    // for collapsible row
    newInfoCell0.innerHTML =
      "Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />";

    alert(`Student ${defaultStudentsCount + 1} added successfully`);
    defaultStudentsCount++;
  } catch (error) {
    alert(`Failed to add new student \nError: ${error}`);
  }
}

/**
 * take length of all table row including the nested row inside student record
 *
 * Do minus 1 from the length because we have header as default row
 *
 * Divide the number by 2 because we have nested row inside every student record. So when there's 2 student record we actually have 4 rows
 *
 * add one to final number from above calculation that's our last index
 * @param tableRef
 * @returns 1-based index. so if one row is present it will return 1, for 2 rows 2 so on
 * @Note we don't consider nested row inside student as last index and indexing is 1-based
 */
function getLastRowIdx(tableRef) {
  var lastRowIdx;
  if (tableRef.rows.length > 0) {
    lastRowIdx = tableRef.rows.length - 1;
    return lastRowIdx - Math.abs(lastRowIdx) / 2;
  } else {
    return 1;
  }
}

/**
 * checks if any of the checkbox is active/checked
 * if its checked then add respective styles and functionality
 * else remove respective styles and functionality
 */
function checkBoxClick(checkbox) {
  var parentEl = checkbox.parentElement.parentElement;
  // row style changes
  if (parentEl.style.backgroundColor == "yellow") {
    parentEl.style.backgroundColor = "#fff";
  } else {
    parentEl.style.backgroundColor = "yellow";
  }

  // submit button style changes code
  submitToggle();
  // add delete-edit button
  addButtons(checkbox);
}

/**
 * adds/removes delete button for only clicked checkbox row
 * @param checkbox element
 */
function addButtons(checkboxEl) {
  if (checkboxEl.value == 1) {
    checkboxEl.value = 0;
    // removing delete button
    checkboxEl.parentElement.parentElement.lastElementChild.previousElementSibling.innerHTML =
      "";
    // removing edit button
    checkboxEl.parentElement.parentElement.lastElementChild.innerHTML = "";
  } else {
    checkboxEl.value = 1;
    // add edit button
    console.log(
      checkboxEl.parentElement.parentElement.lastElementChild
        .previousElementSibling
    );
    checkboxEl.parentElement.parentElement.lastElementChild.previousElementSibling.innerHTML =
      '<button onclick="deleteRow(this)">Delete</button>';
    // add remove button
    checkboxEl.parentElement.parentElement.lastElementChild.innerHTML =
      '<button onclick="editRow(this)">Edit</button>';
  }
}

/**
 * Toggles submit btn when clicked on checkbox
 * @param
 */
function submitToggle() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var tableHeaders = document.querySelectorAll("#hide-column");
  var tableCells = document.querySelectorAll("#hide-cell");
  var isChecked = false; // isChecked to check if any one checkbox is active, if any one checkbox is active then change style of submit button

  if (checkboxes.length) {
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked && !isChecked) {
        // add delete and edit column
        tableHeaders.forEach((header) => {
          header.style.display = "table-cell";
        });

        // display delete and edit cell
        tableCells.forEach((cell) => {
          cell.style.display = "table-cell";
        });

        // enable submit button
        document.getElementById("button").disabled = false;
        isChecked = true;
      } else if (!isChecked) {
        // hide delete and edit column
        tableHeaders.forEach((header) => {
          header.style.display = "none";
        });

        // hide delete and edit cell
        tableCells.forEach((cell) => {
          cell.style.display = "none";
        });

        document.getElementById("button").disabled = true;
      }
    });
  } else {
    // hide delete and edit column
    tableHeaders.forEach((header) => {
      header.style.display = "none";
    });
    // hide delete and edit cell
    tableCells.forEach((cell) => {
      cell.style.display = "none";
    });

    document.getElementById("button").disabled = true;
  }
}

/**
 * Deletes row from table
 * Deletes selected row and the row below that which shows info about advisor,status, etc
 * @param params
 */
function deleteRow(deleteEl) {
  deleteEl?.parentElement?.parentElement?.parentElement?.removeChild(
    deleteEl?.parentElement?.parentElement?.nextElementSibling
  );
  deleteEl.parentElement.parentElement.remove();
  alert(
    `${deleteEl.parentElement.parentElement.cells[1].innerHTML} Record deleted successfully`
  );
  submitToggle();
}

/**
 * Edits row from table
 * @param params
 */
function editRow(editEl) {
  var isConfirmed = confirm(
    `Edit details of ${editEl.parentElement.parentElement.cells[1].innerHTML}\n${editEl.parentElement.parentElement.cells[2].innerHTML}\n${editEl.parentElement.parentElement.cells[3].innerHTML}\n${editEl.parentElement.parentElement.cells[4].innerHTML}\n${editEl.parentElement.parentElement.cells[5].innerHTML}\n${editEl.parentElement.parentElement.cells[6].innerHTML}\n${editEl.parentElement.parentElement.cells[7].innerHTML}`
  );
  if (isConfirmed) {
    alert(
      `${editEl.parentElement.parentElement.cells[1].innerHTML} data updated successfully`
    );
  }
}
