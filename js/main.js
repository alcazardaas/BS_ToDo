var taskInput = document.getElementById("new-task"); // input new-task
var addButton = document.getElementsByTagName("button")[0];//add button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //new tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed tasks


var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li"); //create list element
    var checkBox = document.createElement("input"); //todo or completed
    var label = document.createElement("label"); //info todo
    var deleteButton = document.createElement("button"); //delete button

    checkBox.type = "checkBox";

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    // add elements to list
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
}


//Add task
var addTask = function () {
    var listItem = createNewTaskElement(taskInput.value);
    
    incompleteTasksHolder.appendChild(listItem); //Append item to todo
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

//Delete task
var deleteTask = function () {
    var listItem = this.parentNode; //Remove the parent list item from the ul
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

//Task complete When the Checkbox is checked move to completed
var taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete); //add event uncheck checkbox
}


//Make task incomplete when check checkbox
var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


addButton.addEventListener("click", addTask);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector('input[type="checkbox"]');
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;

}

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)	
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)	
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}









