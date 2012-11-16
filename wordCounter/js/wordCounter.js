function calculate() {

	var inputText = document.getElementById('inputText').value;
	
	console.log(inputText);

	//get array of words
	var inputs = inputText.split(" ");
	inputs = trimall(inputs);

	//prepare result object
	var results = {};

	//for each word in inputs add to the results count
	for (var x=0; x<inputs.length; x++){
		if (results[inputs[x]] === undefined){
			results[inputs[x]] = 1;
		}else{
			results[inputs[x]] = results[inputs[x]] + 1;
		}
	}

	writeResults(results);
}

function writeResults(results){
	var size = 0, key;
	for (key in this) {
		if (this.hasOwnProperty(key)) size++;
	}

	var x=0;
	var resultsbody = $("#results tbody")[0];
	resultsbody.innerHTML = "";
	var rowCount = resultsbody.rows.length;

	for (x in results) {

		if (isClean(x)){

			var row = resultsbody.insertRow(rowCount);

			var cell1 = row.insertCell(0);
			cell1.innerHTML = x;

			var cell2 = row.insertCell(0);
			cell2.innerHTML = results[x];

			rowCount++;

		}
	}
	sorttable.makeSortable(table);
	var myTH = $('th')[0];
	sorttable.innerSortFunction.apply(myTH, []);
}

//test against the checked filters
function isClean(word){
	var prefAZOnly = $('#PrefAZOnly')[0].checked;
	if (prefAZOnly){
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