var prefs = {};

// Read Preferences
function readPrefs() {
	prefs.AZOnly = $('#PrefAZOnly')[0].checked;
	prefs.ignoreCase = $('#PrefIgnoreCase')[0].checked;
};

// Calculate work counts
function countWords() {

	readPrefs();

	console.log(prefs.AZOnly);
	console.log(prefs.IgnoreCase);
	

	var inputText = $('#inputText')[0].value;
	
	//console.log(inputText);

	// Get array of words
	var inputs = inputText.split(" ");
	inputs = trimall(inputs);

	// Prepare result object
	var results = {};
	
	// For each word in inputs, add to the results count
	for (var x=0; x < inputs.length; x++) {
		
		var word;
		if (prefs.ignoreCase) {
			word = inputs[x].toLowerCase();
		} else {
			word = inputs[x];
		}
		
		if (results[word] === undefined) {
			results[word] = 1;
		} else {
			results[word]++;
		}
	}
	
	writeResults(results);
}

function writeResults(results){
	var size = 0, key;
	for (key in this) {
		if (this.hasOwnProperty(key)) size++;
	}

	var x = 0;
	var results_tbody = $("#results tbody")[0];
	results_tbody.innerHTML = "";
	var rowCount = results_tbody.rows.length;

	for (x in results) {

		if (isClean(x)){

			var row = results_tbody.insertRow(rowCount);

			var cell1 = row.insertCell(0);
			cell1.innerHTML = x;

			var cell2 = row.insertCell(0);
			cell2.innerHTML = results[x];

			rowCount++;

		}
	}
	var myTH = $('th')[0];
	sorttable.innerSortFunction.apply(myTH, []);
}

//test against the checked filters
function isClean(word){
	if (prefs.AZOnly){
		if(!/^[a-zA-Z]+$/.test(word)){
			return false;
		}
	}
	return true;
}

//trim all strings of an arr
function trimall(arr){
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].trim();
	}
	return arr;
}