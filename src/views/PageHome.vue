<template>
    <div>
        <div v-show="showAddTask">
            <AddTask @add-task="addTask" />
        </div>
        <UserTasks :tasks="tasks" @task-toggle="onToggleReminder" @task-delete="onDeleteTask" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserTasks from '../components/UserTasks.vue';
import AddTask from '../components/AddTask.vue';
import { Tasks } from '../components/models/tasks';



export default defineComponent({
    name: 'PageHome',
    props: {
        showAddTask: Boolean
    },
    components: {
        UserTasks,
        AddTask,
    },
    data() {
        return {
            tasks: [] as Tasks[],
        }
    },
    methods: {
        async addTask(task: Tasks): Promise<void> {
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
        async onDeleteTask(id: number): Promise<void> {
            if (confirm('Are you sure ?')) {

                const res = await fetch(`api/tasks/${id}`, {
                    method: 'DELETE'
                })
                const status = res.status === 200 ? (this.tasks = this.tasks.filter(x => x.id != id)) : alert('Error while deleteing record')

            }

        },
        async onToggleReminder(id: number): Promise<void> {
            const taskToToggle = await this.fetchTasksById(id);
            const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

            const updateTask = await fetch(`api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(updTask)
            })
            const data = await updateTask.json()
            this.tasks = this.tasks.map((task: Tasks) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )

        },
        async fetchTasksById(id: number): Promise<Tasks> {
            const taskdata = await fetch(`api/tasks/${id}`)

            const data = await taskdata.json()

            return data

        },
        async fetchTasks(): Promise<Tasks[]> {
            const taskdata = await fetch('api/tasks')

            return await taskdata.json()

        }
    },
    async created(): Promise<void> {
        this.tasks = await this.fetchTasks();
    },emits: ['task-delete', 'task-toggle']
});
</script>
