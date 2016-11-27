window.onload = function() {
    window.document.body.onload = load();
};


function load() {
    if (document.querySelector(".tasks"))
        loadTasks(showTasks);
    else if (document.querySelector(("#graph")))
        drawGraph();

    /* MODAL */
    var logoutModal = document.getElementById("logoutModal");
    var taskModal = document.getElementById("taskModal");
    var logoutButton = document.getElementById("logoutButton");
    var taskButton = document.getElementById("addTaskButton");
    var logoutSpan = document.getElementById("closeLogout");
    var cancelLogout = document.getElementById("cancelLogout");
    var doLogout = document.getElementById("doLogout");
    var taskSpan = document.getElementById("closeTaskAdd");
    var cancelAdd = document.getElementById("cancelAddButton");
    var doAdd = document.getElementById("doAddButton");

     window.onclick = function(event) {
        if (event.target == logoutModal) {
            logoutModal.style.display = "none";
        }
        if (event.target == taskModal) {
            taskModal.style.display = "none";
        }
    };

    if (logoutButton)
        logoutButton.onclick = function() {
            logoutModal.style.display = "block";
        };

    if (logoutSpan)
        logoutSpan.onclick = function() {
            logoutModal.style.display = "none";
        };

    if (cancelLogout)
        cancelLogout.onclick = function() {
            logoutModal.style.display = "none";
        };

    if (doLogout)
        doLogout.onclick = function() {
            document.location = "index.html";
        };


    if (taskButton)
        taskButton.onclick = function() {
            taskModal.style.display = "block";
        };

    if (doAdd) {
        doAdd.onclick = function () {
            var name = document.getElementById("taskName").value;
            var desc = document.getElementById("taskDesc").value;
            var due = document.getElementById("taskDue").value;
            var priority = document.getElementById("taskPriority").value;
            var created = new Date();
            var categoryTasksList = document.getElementsByClassName("categoryTasksList")[0];

            if (name && due) {
                addTask(categoryTasksList, name, priority, due, desc);
                clearTaskInput(taskModal, doAdd);
            }
            else {
                alert("Provide the name and due date!")
            }
        };
    }
    if (taskSpan)
        taskSpan.onclick = function() {
        clearTaskInput(taskModal);
        };

    if (cancelAdd)
        cancelAdd.onclick = function() {
        clearTaskInput(taskModal);
        };

}

function clearTaskInput(taskModal) {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskDue").value = "";
    document.getElementById("taskPriority").value= 1;
    taskModal.style.display = "none";
}


function showTasks(tasks) {
    var categoryTasksList = document.getElementsByClassName("categoryTasksList")[0];
    var dailyTasksList = document.getElementsByClassName("dailyTasksList")[0];

    tasks.forEach(function(task) {
        addTask(categoryTasksList, task.name, task.priority, task.due, task.description);

        if (Math.round(Math.random()) == 1)
            addTask(dailyTasksList, task.name, task.priority, task.due, task.description);
    })
}


function addTask(parent, name, priority, due, description) {
    var taskFormat = "<li class=\"task\"> <header>{0}</header> <p>Priority: {1}</p> <p>Due: {2}</p> <p>Description: {3}</p> <button>Edit</button> <button onclick=\"doneTask(this)\">Done</button> </li>";
    var taskNode = document.createElement("LI");
    taskNode.innerHTML = taskFormat.format(name, priority, due, description);

    parent.appendChild(taskNode);
}

function doneTask(element) {
    var task = element.parentNode;
    var list = task.parentNode;
    list.removeChild(task);

}

function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function loadTasks(callback) {
    loadJSON("js/tasks.json", function (data) {
        var tasks = JSON.parse(data).tasks;
        callback(tasks);
    });

}

function drawGraph() {
    var c = document.getElementById("graph");
    var xSize = c.offsetWidth;
    var ySize = c.offsetHeight;
    var ctx = c.getContext("2d");

    var offset = 50;
    var max = 10;
    var scale = ySize - 2*offset;
    var days = 20;
    var xDist = (xSize - 2*offset)/days;
    var yDist = (ySize - 2*offset)/max;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(offset, ySize - offset);
    ctx.lineTo(xSize - offset/2, ySize - offset);
    ctx.moveTo(offset, ySize - offset);
    ctx.lineTo(offset, offset/2);
    ctx.stroke();

    for (var i = 1; i <= days; i++) {
        ctx.fillText(i, offset/2 + i * xDist, ySize - offset/2);
    }

    for (i = 1; i <= max; i++) {
        ctx.fillText(i, offset/2, ySize - offset  - i * yDist);
    }
    ctx.closePath();


    ctx.beginPath();
    ctx.strokeStyle = "#222299";

    ctx.moveTo(offset, ySize - offset);
    var y = ySize - offset;
    for (i = 1; i <= days; i++) {
        ctx.moveTo(offset + (i-1) * xDist, y);
        var rand = Math.round(Math.random() * scale) ;
        rand = Math.round(rand / max) * max;
        y = ySize - offset -  rand;
        ctx.lineTo(offset + i * xDist, y);
    }

    ctx.stroke();
    ctx.closePath();

}

String.prototype.format = function() {
   var content = this;
   for (var i = 0; i < arguments.length; i++) {
        var replacement = "{" + i + "}";
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};


function modifyNav(width, visibility) {
    document.getElementById("mySidenav").style.width = width + "px";
    document.getElementById("open").style.visibility = visibility;
}


