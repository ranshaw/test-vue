<template>
  <div id="app">
     <TakeComment/>
     <CommentList/>
  </div>
</template>

<script>
    import TakeComment from './components/TakeComment.vue'
    import CommentList from './components/CommentList.vue'
export default {
  name: 'app',
  data () {
    return {

    }

  },
  components:{
      TakeComment,
      CommentList
  }
}
</script>

<style>
  #app {
    width: 755px;
    font-family: "Microsoft YaHei";
    overflow: hidden;
    margin: 0 auto;

  }
</style>


