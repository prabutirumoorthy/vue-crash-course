<template>
    <header>
        <h1>{{ title }}</h1>
        <FormButton @button-click="$emit('show-toggle-task')" :text="showAddtask ? 'Close' : 'Add Task'" :color="showAddtask ?'red':'green'" />
    </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FormButton from './FormButton.vue'

export default defineComponent({
    name: 'PageHeader',
    props: {
        title:String,
        showAddtask:Boolean
    },
    components:{
        FormButton
    }
});
</script>
<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>