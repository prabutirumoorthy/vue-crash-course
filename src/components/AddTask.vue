<template>
    <form @submit="onAddTask" class="add-form">
        <div class="form-control">
            <label >Task</label>
            <input type="text" name="text" v-model="text" placeholder="Add Task">
        </div>
        <div class="form-control">
            <label >Day & time</label>
            <input type="text" v-model="day" name="day" placeholder="Add day & time">
        </div>
        <div class="form-control form-control-check">
            <label >Set Reminder</label>
            <input type="checkbox" v-model="reminder" name="reminder">
        </div>
        <input type="submit" value="Save task" class="btn btn-block">
    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'AddTask',
    data(){
        return {
            text:'' ,
            day:'' ,
            reminder:false 

        }
    },
    methods:{
        onAddTask(e:Event){
            e.preventDefault();
            if(!this.text){
                alert('Please add task')
                return
            }
            const newTask={
                // id:Math.floor(Math.random()*100),
                text: this.text,
                day:this.day,
                reminder:this.reminder

            };

                this.text ='';
                this.day = '';
                this.reminder = false;
                this.$emit('add-task',newTask)
        }
    }
    
})
</script>
<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
