<template>
    <button :style="{ backgroundColor: color }" class="btn" @click="onClick()" >{{ text }}</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'FormButton',
    props: {
        text: String,
        color: String
    },
    methods:{
        onClick(){
            this.$emit('button-click')
        }
    }
})
</script>