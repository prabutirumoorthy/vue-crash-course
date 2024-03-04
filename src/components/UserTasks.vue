<template>
    <div :key="task.id" v-for="task in tasks">
        <UserTask @task-toggle="$emit('task-toggle',task.id)" @task-delete="$emit('task-delete', task.id)" :task="task" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Tasks } from './models/tasks';
import UserTask from './UserTask.vue'

export default defineComponent({
    name: 'UserTasks',
    props: {
        tasks: {
            type: Array as () => Tasks[],
            required: true
        }
    },
    components: {
        UserTask
    },
    emits: ['task-delete','task-toggle']


})
</script>
<style scoped></style>