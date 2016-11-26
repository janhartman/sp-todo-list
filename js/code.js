window.onload = function() {
    window.document.body.onload = load();
};


function addTask(parent, child) {
    parent.appendChild(child);
}

function doneTask(element) {
    var task = element.parentNode;
    var list = task.parentNode;
    list.removeChild(task);

}

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

function load() {
    if (document.querySelector(".tasks"))
        loadTasks(showTasks);
    else if (document.querySelector(("#graph")))
        drawGraph();
}

function showTasks(tasks) {
    var taskFormat = "<li class=\"task\"> <header>{0}</header> <p>Priority: {1}</p> <p>Due: {2}</p> <p>Description: {3}</p> <button>Edit</button> <button onclick=\"doneTask(this)\">Done</button> </li>";

    var categoryTasksList = document.getElementsByClassName("categoryTasksList")[0];
    var dailyTasksList = document.getElementsByClassName("dailyTasksList")[0];

    tasks.forEach(function(task) {
        var taskNode = document.createElement("LI");
        var taskNode2 = document.createElement("LI");
        taskNode.innerHTML = taskNode2.innerHTML = taskFormat.format(task.name, task.priority, task.due, task.description);
        addTask(categoryTasksList, taskNode);
        addTask(dailyTasksList, taskNode2);
    })
}

function loadTasks(callback) {
    loadJSON("js/tasks.json", function (data) {
        var tasks = JSON.parse(data).tasks;
        callback(tasks);
    });

}

function drawGraph() {
    var c = document.getElementById("graph");
    var ctx = c.getContext("2d")



    ctx.stroke();

}

String.prototype.format = function() {
   var content = this;
   for (var i = 0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};

/* HIDE SHOW CATEGORIES */

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    /*document.getElementById("main").style.marginLeft = "250px";*/

    document.getElementById('openCat').style.visibility = 'hidden';

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    /*document.getElementById("main").style.marginLeft= "0";*/

    document.getElementById('openCat').style.visibility = 'visible';
}

