<template>
  <div class="container">
    <PageHeader :showButton="isHomePage" :showAddtask="showAddToggleTask" @show-toggle-task="toggleTask" title="Task Tracker" />

    
    <router-view :showButton="isHomePage" :showAddTask="showAddToggleTask"></router-view>
    <PageFooter />
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import { RouteLocationNormalizedLoaded } from 'vue-router';


export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  data() {
    return {
      showAddToggleTask: false
    }
  },
  methods: {    
    toggleTask() {
      this.showAddToggleTask = !this.showAddToggleTask
    },
  },
  mounted() {
    // Access the current route name
    const currentRouteName = this.$route.name;
    console.log("Current route name:", currentRouteName);
  },
  computed: {
    isHomePage(): boolean {
      // Check if the current route is the home page
      return (this.$route as RouteLocationNormalizedLoaded).name === 'Home';
    },
  },

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
