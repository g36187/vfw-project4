// DOMcheck
window.addEventListener("DOMContentLoaded", function(){

/* Define each list item variable */

var itemType = document.getElementById("dropList");
var whatName = document.getElementById("itemName");
var numberOf = document.getElementById("howMany");
var notes = document.getElementById("textNotes");
var handyVal;

/* radio button info collector */

function checkValue(){
	var handable = document.getElementById("theForm").handy;
	for (var i=0; i<handable.length; i++){
		if (handable[i].checked){
			handyVal = handable[i].value;
		}
	}
}

/* actual local data storage */

function storeData(key){
	checkValue();
/* random keygen and gather data for unique local data */
	if (!key){
		var id 			= Math.floor(Math.random()*9001);
	}else{
		id = key;
	}
	
	var item		= {};
		item.itype  = ["Item Type", itemType.value];
		item.iname  = ["Item Name", whatName.value];
		item.inumber= ["How Many", numberOf.value];
		item.ihand  = ["Carried By Hand", handyVal];
		item.inotes = ["Notes", notes.value];
	
/* stringify for local storage */
	localStorage.setItem (id, JSON.stringify(item)); 	
	alert("Information Submitted");
}
	
/* Function to fill in data if local storage is empty */
function dataFiller(){
	for (var f in fillerData){
		var id = Math.floor(Math.random()*9001);
		localStorage.setItem(id, JSON.stringify(fillerData[f]));
	}
}	
	
/* extract data for show */
function showYou(){
	if(localStorage.length === 0){
		alert("No Local Storage Data stored! Loading default data");
		dataFiller();
	}
	var createDiv = document.createElement('div');
	createDiv.setAttribute("id", "items");
	var addList = document.createElement('ul');
	createDiv.appendChild(addList);
	document.body.appendChild(createDiv);
// go through local storage and get data .. loop as necessary
	for (i=0, stori=localStorage.length; i<stori; i++){
		var makeli = document.createElement('li');
		var linkList = document.createElement('li');
		addList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
// parse data and begin putting into list elements
		var obj = JSON.parse(value);
		var addSubList = document.createElement('ul');
		makeli.appendChild(addSubList);
// add the icons corresponding to the item categories
	putIcons(obj.itype[1],addSubList);
// export date in pairs		
		for (var n in obj){
			var addSubli = document.createElement('li');
			addSubList.appendChild(addSubli);
			var optSubText = obj[n][0]+" : "+obj[n][1];
			addSubli.innerHTML = optSubText;
			addSubList.appendChild(linkList);
		}
// puts links to edit / delete
		createEditDelete(localStorage.key(i), linkList);
	}
}	

// icon picker for category images
function putIcons(icoName, addSubList){
	var iconLi = document.createElement('li');
	addSubList.appendChild(iconLi);
	var newIcon = document.createElement('img');
	var setSrc = newIcon.setAttribute("src", "images/"+ icoName +".png");
	iconLi.appendChild(newIcon);
	
}
/* add the ability to edit / delete stored data */
function createEditDelete(key, linkList){
	var lineBreaker = document.createElement('br');
	var linkEdit = document.createElement('a');
	linkEdit.href = "#";
	linkEdit.key = key;
	var textEdit = "Edit";
	linkEdit.addEventListener("click", itemEdit);
	linkEdit.innerHTML = textEdit;
	linkList.appendChild(linkEdit);

	linkList.appendChild(lineBreaker);

	var linkDelete = document.createElement('a');
	linkDelete.href = "#";
	linkDelete.key = key;
	var textDelete = "Delete";
	linkDelete.addEventListener("click", itemDelete);
	linkDelete.innerHTML = textDelete;
	linkList.appendChild(linkDelete);
}

function itemEdit(){
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);

/* repop the fields in the form for editing */

	itemType.value = item.itype[1];
	whatName.value = item.iname[1];
	numberOf.value = item.inumber[1];

	var handio = document.getElementById("theForm").handy;
	for (var i=0; i<handio.length; i++){
		if (handio[i].value == "Yes" && item.ihand[0] == "Yes"){
			handio[i].setAttribute("checked", "checked");
		}
		else if (handio[i].value == "No" && item.ihand[0] == "No"){
			handio[i].setAttribute("checked", "checked");
		}
		
	}
	notes.value = item.inotes[1];

// rename the submit key and allow re-submit
	submit.removeEventListener("click", storeData);
	submit.value = "Edit Item";
	var editSubmit = submit;
	editSubmit.addEventListener("click", storeData);
	editSubmit.key = this.key;
}

/* delete item */
function itemDelete(){
	var youSure = confirm ("Do you really want to delete this?");
	if (youSure){
		localStorage.removeItem(this.key);
		window.location.reload();
	}else {
		alert ("Not deleted.");
	}
}

/* important buttons for navigation*/

var emptiness = function (){
	localStorage.clear();
}

cleary.addEventListener("click", emptiness);
submit.addEventListener("click", storeData);
displaya.addEventListener("click", showYou);


//End of DOM check
});
