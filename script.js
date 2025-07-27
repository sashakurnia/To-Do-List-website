let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const statusClass = task.done ? "done" : "";
    const checked = task.done ? "checked" : "";

    list.innerHTML += `
      <li>
        <div>
          <span class="${statusClass}">${task.text}</span><br>
          <span class="timestamp">${task.timestamp}</span><br>
          <span class="category">${task.category}</span>
        </div>
        <div class="controls">
          <input type="checkbox" onchange="toggleDone(${index})" ${checked} />
          <span class="delete" onclick="deleteTask(${index})">❌</span>
        </div>
      </li>`;
  });
}

function addTask() {
  const textInput = document.getElementById("taskInput");
  const datetimeInput = document.getElementById("datetimeInput");
  const categoryInput = document.getElementById("categoryInput");

  const text = textInput.value.trim();
  const datetimeValue = datetimeInput.value;
  const category = categoryInput.value;

  if (text !== "" && datetimeValue !== "") {
    const dateObj = new Date(datetimeValue);

    const jam = dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const tanggal = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    const timestamp = `${tanggal} ${jam}`;

    tasks.push({ text, timestamp, done: false, category });
    textInput.value = "";
    datetimeInput.value = "";
    categoryInput.value = "Pekerjaan";
    saveTasks();
    renderTasks();
  } else {
    alert("Mohon isi tugas dan tanggal/waktu.");
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
