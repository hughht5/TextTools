/*jslint maxerr: 200, debug: true, plusplus: true, devel: true */

// Preferences
var prefs = {};

// Read Preferences
function readPrefs() {

	"use strict";

	prefs.AZOnly = $('#PrefAZOnly')[0].checked;
	prefs.ignoreCase = $('#PrefIgnoreCase')[0].checked;

	console.log(prefs);

}

function clearInput() {

	"use strict";

	$('#inputText')[0].value = '';

	$("#results tbody")[0].innerHTML = "";

	$('#inputText').focus();

}

// Test against the checked filters
function isClean(word) {

	"use strict";

	if (prefs.AZOnly) {
		if (!/^[a-zA-Z]+$/.test(word)) {
			return false;
		}
	}
	return true;
}

function writeResults(results) {

	"use strict";

	var size = 0,
		key,
		myTH,
		row,
		cell1,
		cell2,
		rowCount,
		x,
		results_tbody;

	for (key in this) {
		if (this.hasOwnProperty(key)) {
			size++;
		}
	}

	x = 0;
	results_tbody = $("#results tbody")[0];
	results_tbody.innerHTML = "";
	rowCount = results_tbody.rows.length;

	for (x in results) {

		if (isClean(x)) {

			row = results_tbody.insertRow(rowCount);

			cell1 = row.insertCell(0);
			cell1.innerHTML = x;

			cell2 = row.insertCell(0);
			cell2.innerHTML = results[x];

			rowCount++;

		}
	}
	myTH = $('th')[0];
	sorttable.innerSortFunction.apply(myTH, []);
}

// Calculate work counts
function countWords() {

	"use strict";

	var x,
		inputText,
		inputs,
		results,
		word;

	readPrefs();

	inputText = $('#inputText')[0].value;

	if (inputText === '') {

		alert('Please input your data into the text entry field.');

		return;
	}

	// Replaces all 3 types of line breaks with a space
	// Replace all double white spaces with single spaces
	// Trim from start and end
	inputText = inputText.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim();

	//console.log(inputText);

	// Get array of words
	inputs = inputText.split(" ");

	// Prepare result object
	results = {};

	// For each word in inputs, add to the results count
	for (x = 0; x < inputs.length; x++) {

		word = inputs[x];

		// Ignore Case if required
		if (prefs.ignoreCase) {
			word = word.toLowerCase();
		}

		if (results[word] === undefined) {
			results[word] = 1;
		} else {
			results[word]++;
		}
	}

	writeResults(results);
}