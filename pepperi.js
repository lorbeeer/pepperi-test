$(document).ready(function () {
	var arrayOfPairs = []; 
	var wrapper = $('#list-wrapper');           //wrapper for value/pairs list

	$('#addPair').submit(function (e) {         //add button submits user unput
		e.preventDefault();
		var newPair = $('#pair').val();           //get input value
		$('#pair').val('');							        	//clear input field
		if(newPair.includes('=')) {      				  //check if we have divider for name and value
			var words = newPair.split('='); 				//create array of words divided by =
			var re=/^\w+$/;													//RegExp for alphanumeric value
			words = words.map(x => x.trim());			 	//get rid of spaces before and after word
			if(words.length == 2 && words[0].match(re) != null && words[1].match(re) != null ) { //check if we have 2 words and they match RegExp
				arrayOfPairs.push({name:words[0], value:words[1]});                                //push them into our data array as object
				updateView();																																			 //udate view with new data
			}
		}
	});
	$('#deletePair').submit(function (e) {		  //delete button submits which item to delete
		e.preventDefault();
		var idPair = parseInt($('input[name=list]:checked').val());  //find checked input value and make it integer to use as index
		arrayOfPairs.splice(idPair, 1);                              //delete from data array one item at index
		updateView();                                                //udate view with new data
	})
	$('#sortName').click(function () {          //sortName button handler
		sortByName();
		updateView();
	})
	$('#sortValue').click(function () {         //sortValue button handler
		sortByValue();
		updateView();
	})

	function updateView() {                     //update view with new data
		wrapper.empty();													//empty from old data
		var content = '';												  //create new empty content string
		for(var i=0; i<arrayOfPairs.length; i++) {                                  //for each item in data array
			var value = arrayOfPairs[i].name+'='+arrayOfPairs[i].value;               //creating value to show in list
			var line = '<div><input type="radio" id="'+i+'" name="list" value="'+i    //creating html string for item
									+'"><label for="'+i+'">'+value+'</label></div>';
			content += line;                                                          //add it to content 
		}
		wrapper.append(content);                                                    //add content to div
	}
	function sortByName(){                     
		arrayOfPairs.sort(function (a, b) {
			var nameA = a.name.toUpperCase();        //ensure all characters have same case
			var nameB = b.name.toUpperCase();
			if (nameA < nameB) {                     //sorting logic
				return -1;
			}																				
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
		updateView();
	}
	function sortByValue(){
		arrayOfPairs.sort(function (a, b) {
			var valA = a.value.toUpperCase();
			var valB = b.value.toUpperCase();
			if (valA < valB) {
				return -1;
			}
			if (valA > valB) {
				return 1;
			}
			return 0;
		});
		updateView();
	}
});

