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

    /* MODAL */
    var modal = document.getElementById('logoutModal');
    var btn = document.getElementById("logoutBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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

        if (Math.round(Math.random()) == 1)
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
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};


function modifyNav(width, visibility) {
    document.getElementById("mySidenav").style.width = width + "px";
    document.getElementById('open').style.visibility = visibility;
}


