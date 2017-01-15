window.onload = function () {
  window.document.body.onload = load();
};


function load() {

  if ($("#graph").length == 1) {
    refreshProductivity();
    $("input[type=radio][name=period]").change(refreshProductivity)
  }

  else if ($(".categoryTasksList").length == 1) {
    refreshTasks();
    $("input[type=radio][name=category]").change(refreshTasks)
  }


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

  window.onclick = function (event) {
    if (event.target == logoutModal) {
      logoutModal.style.display = "none";
    }
    if (event.target == taskModal) {
      taskModal.style.display = "none";
    }
  };

  if (logoutButton)
    logoutButton.onclick = function () {
      logoutModal.style.display = "block";
    };

  if (logoutSpan)
    logoutSpan.onclick = function () {
      logoutModal.style.display = "none";
    };

  if (cancelLogout)
    cancelLogout.onclick = function () {
      logoutModal.style.display = "none";
    };

  if (doLogout)
    doLogout.onclick = function () {
      document.location = "/logout";
    };


  if (taskButton)
    taskButton.onclick = function () {
      taskModal.style.display = "block";
    };

  if (doAdd)
    doAdd.onclick = function () {
      addTaskToList(taskModal, doAdd);
    };

  if (taskSpan)
    taskSpan.onclick = function () {
      clearTaskInput(taskModal);
    };

  if (cancelAdd)
    cancelAdd.onclick = function () {
      clearTaskInput(taskModal);
    };

}


function refreshProductivity() {
  var period = $("input[name=period]:checked", "#periodForm").val();

  $.ajax({
    url: "/productivity/data",
    data: {
      period: period
    },
    success: function (result) {
      drawGraph(result.productivity);
      $("#completed").html(result.completed);
      $("#missed").html(result.missed);
      $("#total").html(result.total);
    }
  });
}

function refreshTasks() {
  var category = $("input[name=category]:checked", "#categoryForm").val();

  $.ajax({
    url: "/tasks/category",
    data: {
      category: category
    },
    success: function (result) {
      $(".categoryTasksList").html(result);
      $("#categoryTag").html("Tasks in category " + category);
    }
  });
}

function clearTaskInput(taskModal) {
  document.getElementById("taskName").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskDue").value = "";
  document.getElementById("taskPriority").value = 1;
  taskModal.style.display = "none";
  document.getElementById("taskModalHeader").innerHTML = "Add a new TODO";
  document.getElementById("doAddButton").innerHTML = "Add task";
  var doAdd = document.getElementById("doAddButton");
  doAdd.onclick = function () {
    addTaskToList(taskModal, doAdd);
  };

}

function addTaskToList(taskModal, doAdd) {
  console.log("started addTaskToList");

  var name = document.getElementById("taskName").value;
  var desc = document.getElementById("taskDesc").value;
  var due = document.getElementById("taskDue").value;
  var priority = document.getElementById("taskPriority").value;
  var category = document.getElementById("taskCategory").value;
  var categoryTasksList = document.getElementsByClassName("categoryTasksList")[0];

  if (name && due) {
    clearTaskInput(taskModal, doAdd);
    $.ajax({
      url: "/tasks",
      data: {
        name: name,
        description: desc,
        dueDate: new Date(due),
        priority: priority,
        category: category
      },
      method: "POST",
      success: function (result) {
        var chosenCategory = $("input[name=category]:checked", "#categoryForm").val();
        if (chosenCategory == "All" || category == chosenCategory)
          $(".categoryTasksList").append(result);
      }
    });

  }
  else {
    alert("Provide the name and due date!")
  }
}


function doneTask(element) {
  var button = $(element);
  var task = button.closest("li");
  var taskID = task.children(".hidden").html();

  $.ajax({
    url: "/tasks",
    data: {
      id: taskID,
      completed: true
    },
    method: "PATCH",
    success: function (result) {
      task.remove();
    }
  })


}

function editTask(element) {
  console.log("started editTask");

  var button = $(element);
  var task = button.closest("li");
  var taskID = task.children(".hidden").html();

  var taskModal = document.getElementById("taskModal");
  taskModal.style.display = "block";

  document.getElementById("taskModalHeader").innerHTML = "Edit TODO";
  var doAdd = document.getElementById("doAddButton");
  doAdd.innerHTML = "Edit task";


  $("#taskName").val(task.find(".liName").html());
  $("#taskDesc").val(task.find(".liDescription").html());
  $("#taskDue").val(task.find(".liDueDate").html());
  $("#taskPriority").val(task.find(".liPriority").html().trim());
  $("#taskCategory").val(task.find(".liCategory").html().trim());


  doAdd.onclick = function () {
    editTaskInList(taskModal, doAdd, task, taskID);
  };
}

function editTaskInList(taskModal, doAdd, task, taskID) {
  console.log("started editTaskInList");

  $.ajax({
    url: "/tasks",
    data: {
      id: taskID,
      name: $("#taskName").val(),
      dueDate: $("#taskDue").val(),
      description: $("#taskDesc").val(),
      priority: $("#taskPriority").val(),
      category: $("#taskCategory").val()
    },
    method: "PATCH",
    success: function (result) {
      task.replaceWith(result);
      clearTaskInput(taskModal);
      doAdd.onclick = function () {
        addTaskToList(taskModal, doAdd);
      };
    },
    failure: function () {
      console.log("failed to edit task");
    }
  });


}

function editUser(element) {

  var button = $(element);
  var user = button.closest("li");
  var userID = user.find(".liUserID").html();

  $.ajax({
    url: "/admin",
    data: {
      id: userID
    },
    method: "PATCH",
    success: function (result) {
      location.reload();
    }
  })

}

function showTasks(element) {

  var button = $(element);
  var user = button.closest("li");
  var userID = user.find(".liUserID").html().trim();

  $.ajax({
    url: "/admin/tasks",
    data: {
      userID: userID
    },
    success: function (result) {
      console.log(result);
      $(".userTaskList").html(result);
    }
  })
}



function drawGraph(productivity) {
  var c = document.getElementById("graph");
  var xSize = c.offsetWidth;
  var ySize = c.offsetHeight;
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);

  var units = productivity.length;
  var max = Math.max.apply(null, productivity);

  var offset = 50;
  var xDist = (xSize - 2 * offset) / units;
  var yDist = (ySize - 2 * offset) / max;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.moveTo(offset, ySize - offset);
  ctx.lineTo(xSize - offset / 2, ySize - offset);
  ctx.moveTo(offset, ySize - offset);
  ctx.lineTo(offset, offset / 2);
  ctx.stroke();

  for (var i = 1; i <= units; i++) {
    ctx.fillText(i, offset + i * xDist, ySize - offset / 2);
  }

  for (i = 1; i <= max; i++) {
    ctx.fillText(i, offset / 2, ySize - offset - i * yDist);
  }
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "#222299";

  ctx.moveTo(offset, ySize - offset);
  var y = ySize - offset;

  for (i = 1; i <= units; i++) {
    ctx.moveTo(offset + (i - 1) * xDist, y);
    y = ySize - offset - productivity[i - 1] * yDist;
    ctx.lineTo(offset + i * xDist, y);
  }

  ctx.stroke();
  ctx.closePath();
}

String.prototype.format = function () {
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


function checkPasswords() {
  var pass1 = document.getElementById("pwd").value;
  var pass2 = document.getElementById("cpwd").value;
  var same = pass1 == pass2;
  if (!same) {
    alert("Passwords must match");
    return false;
  }
  else
    return true;
}
