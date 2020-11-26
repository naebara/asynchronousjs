// Get all Projects
let projects = fetch("https://app.paymoapp.com/api/projects/", {
  headers: {
    "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
  },
}).then((res) => res.json());

// Get all Tasklists
let taskLists = fetch("https://app.paymoapp.com/api/tasklists/", {
  headers: {
    "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
  },
}).then((res) => res.json());

// Get all Tasks
let tasks = fetch("https://app.paymoapp.com/api/tasks/", {
  headers: {
    "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
  },
}).then((res) => res.json());

Promise.all([projects, taskLists, tasks]).then(([projects, t, tasks]) => {
  console.log("---------------");
  console.log(projects);
  console.log(t);
  console.log(tasks);
  console.log("---------------");

  projects.projects.forEach((element) => {
    let tlist = t.tasklists
      .filter((tle) => tle.project_id == element.id)
      .map((i) => {
        console.log({ i });
        return {
          name: i.name,
          tasks: tasks.tasks.filter(
            (u) => u.project_id == element.id && u.tasklist_id == i.id
          ),
        };
      });

    let project = {
      name: element.name,
      taskLists: tlist,
    };
    console.log({ project });
  });
});
