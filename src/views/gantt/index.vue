<template>
  <div class="app-container">
    <gantt class="left-container" :tasks="tasks"></gantt>
  </div>
</template>
 
<script>
import Gantt from '@/components/Gantt';
 
export default {
  name: 'app',
  components: {Gantt},
  data () {
    return {
      tasks: {
        data: [
          {id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6},
          {id: 2, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 3, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 4, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 5, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 6, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 7, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 8, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 9, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4},
          {id: 210, text: 'Task #2', start_date: '2020-01-20', duration: 30, progress: 0.4},
        ],
        links: [
          {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
    }
  }
}
</script>

<style scope>
  .left-container {
    overflow: hidden;
    position: relative;
    height: calc(100vh - 124px);
  }
</style>