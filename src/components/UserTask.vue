<template>
    <div @touchstart="handleTouchStart(task.id)" @dblclick="onToggleReminer(task.id)"
        :class="[task.reminder ? 'reminder' : '', 'task']">
        <h3>{{ task.text }}
            <i @click="onDelete(task.id)" class="fas fa-times"></i>
        </h3>
        <p>{{ task.day }}</p>
    </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Tasks } from './models/tasks';
export default defineComponent({
    name: 'UserTask',
    props: {
        task: {
            type: Object as () => Tasks,
            required: true
        }
    },
    data() {
        return {
            lastTouchTime: 0,
            delay: 300 // Adjust this value as needed
        };
    },
    methods: {
        onDelete(id: number) {
            this.$emit('task-delete', id);
        },
        onToggleReminer(id: number) {
            this.$emit('task-toggle', id);
        },
        handleTouchStart(id: number) {
            const now = new Date().getTime();
            const lastTouchTime = this.lastTouchTime;
            if (now - lastTouchTime < this.delay) {
                // Double tap detected
                this.onToggleReminer(id);
                //  this.preventDefault();
            }
            this.lastTouchTime = now;
        },
    }
})
</script>
<style scoped>
.fas {
    color: red;
}

.task {
    background-color: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.reminder {
    border-left: 5px solid green;
}

.task h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}</style>