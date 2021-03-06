define({ "api": [
  {
    "type": "post",
    "url": "/profile",
    "title": "Edit user profile",
    "name": "EditProfile",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dailyTasks",
            "description": "<p>Number of daily tasks</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "maxPriorityFirst",
            "description": "<p>Pick tasks with maximum priority first</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>profile page refresh</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProfileController.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/admin",
    "title": "Get admin panel",
    "name": "GetAdminPanel",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>admin panel load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>error loading users</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProfileController.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profile",
    "title": "Get user profile",
    "name": "GetProfile",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>profile page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProfileController.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logs out the current user by deleting the user id from the cookie",
    "name": "Logout",
    "group": "Profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>redirect to login page</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProfileController.js",
    "groupTitle": "Profile"
  },
  {
    "type": "post",
    "url": "/tasks",
    "title": "Create a new task",
    "name": "AddTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dueDate",
            "description": "<p>Due date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>Task priority</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Task category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>task page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>missing data for task creation</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/tasks",
    "title": "Edit task",
    "name": "EditTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "taskId",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task's unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dueDate",
            "description": "<p>Due date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>Task priority</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Task category</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "completed",
            "description": "<p>Task completion status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>task page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>missing data for task creation</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/admin/tasks",
    "title": "Get tasks of a user for admin panel",
    "name": "GetAdminTasks",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>tasks list for user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/productivity",
    "title": "Load productivity page",
    "name": "GetProductivity",
    "group": "Task",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>productivity page load</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/productivity/data",
    "title": "Get productivity data for specified time period",
    "name": "GetProductivityData",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "period",
            "description": "<p>Time period</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>productivity data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>missing or wrong time period</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/tasks",
    "title": "Load task view with daily tasks",
    "name": "GetTasks",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>task page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/tasks/category",
    "title": "",
    "name": "GetTasksCategory",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Task category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>task page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/TaskController.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/login",
    "title": "Load login page",
    "name": "GetLogin",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>login page load</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/register",
    "title": "Load register page",
    "name": "GetRegister",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>register page load</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Logs in with the provided username and password",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>user's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>task page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/admin",
    "title": "Promote user to admin",
    "name": "PromoteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>admin panel refresh</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register a new user",
    "name": "Register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "checkPassword",
            "description": "<p>User's password repeated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>login page load</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>missing data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  }
] });
