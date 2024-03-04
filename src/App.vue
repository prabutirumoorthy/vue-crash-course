<template>
  <div class="container">
    <PageHeader :showAddtask="showAddToggleTask" @show-toggle-task="toggleTask" title="Task Tracker" />
    <div v-show="showAddToggleTask">
      <AddTask @add-task="addTask" />
    </div>
    <UserTasks :tasks="tasks" @task-toggle="onToggleReminder" @task-delete="onDeleteTask" />
    <router-view></router-view>
    <PageFooter />
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import UserTasks from './components/UserTasks.vue'
import AddTask from './components/AddTask.vue'
import { Tasks } from './components/models/tasks'


export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    UserTasks,
    AddTask,
    PageFooter
  },
  data() {
    return {
      tasks: [] as Tasks[],
      showAddToggleTask: false
    }
  },
  async created() {
    this.tasks = await this.fetchTasks();

  },
  methods: {
    async addTask(task: Tasks) {
      const res = await fetch(`api/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'JSON'
        },
        body: JSON.stringify(task)
      })
      const taskItem = await res.json();
      this.tasks = [...this.tasks, taskItem]
    },
    toggleTask() {
      this.showAddToggleTask = !this.showAddToggleTask
    },
    async onDeleteTask(id: number) {
      if (confirm('Are you sure ?')) {

        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE'
        })
        const status = res.status === 200 ? (this.tasks = this.tasks.filter(x => x.id != id)) : alert('Error while deleteing record')

      }

    },
    async onToggleReminder(id: number) {
      const taskToToggle = await this.fetchTasksById(id);
      const updTask = {...taskToToggle,reminder:!taskToToggle.reminder}
      
      const updateTask = await fetch(`api/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type': 'application/json',
        },
        body:JSON.stringify(updTask)
      })
      const data = await updateTask.json()
      this.tasks = this.tasks.map((task:Tasks) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
   
    },
    async fetchTasksById(id: number) {
      const taskdata = await fetch(`api/tasks/${id}`)

     const data = await taskdata.json()

     return data

    },
    async fetchTasks() {
      const taskdata = await fetch('api/tasks')

      return await taskdata.json()

    }
  },
  emits: ['task-delete', 'task-toggle']

});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
