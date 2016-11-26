function alertUser(message) {
	alert(message);
}


function addTask(parent, child) {
    parent.appendChild(child);
}

function removeTask(element) {
    element.parentNode.remove();
}

document.addEventListener("DOMContentLoaded", loadTasks);

function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function loadTasks() {
    var taskFormat = "<li class=\"task\"> <header>{0}</header> <p>Priority: {1}</p> <p>Due: {2}</p> <p>Description: {3}</p> <button>Edit</button> <button onclick=\"removeTask(this)\">Delete</button> </li>";

    loadJSON("js/tasks.json", function(data) {
        var tasks = JSON.parse(data);
        var categoryTasksList = document.getElementsByClassName("categoryTasksList")[0];
        var dailyTasksList = document.getElementsByClassName("dailyTasksList")[0];

        tasks.tasks.forEach(function(task) {
            var taskNode = document.createElement("LI");
            var taskNode2 = document.createElement("LI");
            taskNode.innerHTML = taskNode2.innerHTML = taskFormat.format(task.name, task.priority, task.due, task.description);
            addTask(categoryTasksList, taskNode);
            addTask(dailyTasksList, taskNode2);
        })
    })

}

String.prototype.format = function()
{
   var content = this;
   for (var i = 0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};

/*


 */