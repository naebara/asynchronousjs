// Get all Projects
let projectsPromise = fetch("https://app.paymoapp.com/api/projects/", {
  headers: {
    "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
  },
}).then((res) => res.json());

// Get all Tasklists
let taskListsPromise = fetch("https://app.paymoapp.com/api/tasklists/", {
  headers: {
    "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
  },
}).then((res) => res.json());

// Get all Tasks
let tasksPromise = fetch("https://app.paymoapp.com/api/tasks/", {
  headers: {
    "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
  },
}).then((res) => res.json());

Promise.all([projectsPromise, taskListsPromise, tasksPromise])
  .then(([projectsObject, taskListsObject, tasksObject]) => {
    let finalResult = [];

    projectsObject.projects.forEach((element) => {
      let task_lists = taskListsObject.tasklists
        .filter((taskListElement) => taskListElement.project_id == element.id)
        .map((taskListElement) => {
          return {
            name: taskListElement.name,
            tasks: tasksObject.tasks
              .filter(
                (taskElement) =>
                  taskElement.project_id == element.id &&
                  taskElement.tasklist_id == taskListElement.id
              )
              .map((e) => e.name),
          };
        });

      let project = {
        name: element.name,
        taskLists: task_lists,
      };
      finalResult.push(project);
    });
    return Promise.resolve(finalResult);
  })
  .then((result) => {
    let list = document.querySelector("#list");
    console.log(list);
    result.forEach((project) => {
      let li = document.createElement("li");
      let projectName = document.createTextNode(project.name);
      li.appendChild(projectName);

      project.taskLists.forEach((taskList) => {
        let ul = document.createElement("ul");
        let taskListName = document.createTextNode(taskList.name);
        ul.appendChild(taskListName);
        taskList.tasks.forEach((i) => {
          let lil = document.createElement("ul");

          let taskName = document.createTextNode(i);

          lil.appendChild(taskName);
          ul.appendChild(lil);
        });
        li.appendChild(ul);
      });
      list.appendChild(li);
    });
  });
