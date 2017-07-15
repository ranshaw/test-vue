<template>
    <div class="pager">
        <button class="btn btn-pager" :class="{dark:$store.state.current == 1}" @click="prePage">上一页</button>
        <span v-if="$store.state.pageNo !== 1" class="page-index " :class="{active:1 == $store.state.current }" @click="goPage(1)">1</span>
        <span v-if="$store.state.preClipped" class="page-index ">...</span>
        <span v-for="index in $store.getters.pages" class="page-index " :class="{active:index == $store.state.current  }" @click="goPage(index)">{{index}}</span>
        <span v-if="$store.state.backClipped" class="page-index">...</span>
        <span   class="page-index" :class="{active:$store.state.pageNo == $store.state.current }" @click="goPage($store.state.pageNo)">{{$store.state.pageNo}}</span>
        <button class="btn btn-pager" :class="{dark:$store.state.current == $store.state.pageNo}" @click="nextPage">下一页</button>

    </div>

</template>
<script>
//    import {prePage , nextPage , goPage} from 'vuex'
    export default {
        data: function () {
            return {
                // 用于判断省略号是否显示
                backClipped: true,
                preClipped: false,
                pageNo:4,
                current:1
            }
        },
        methods: {
            prePage () {
                // 上一页
                var me = this;
                this.$store.dispatch('prePage').then(function () {
                  me.$store.dispatch('getList');
                })

            },
            nextPage () {
                // 下一页
                var me = this;
                this.$store.dispatch('nextPage').then(function () {
                  me.$store.dispatch('getList');
                });

            },
            goPage (index) {
                // 跳转到相应页面

                var me = this;
                this.$store.dispatch('goPage',{
                  page:index
                }).then(function () {
                  me.$store.dispatch('getList');
                });

            }
        }
    }
</script>
// 组件样式
<style scoped>
    .pager {
        text-align: right;
        margin-top:10px;
        margin-bottom:10px;
        margin-right: 5px;
    }
    .pager span {
        text-align:center
    }
    .btn-pager {
        margin-left: 10px;
        padding: 0px;
        width: 60px;
        height: 30px;
        text-align: center;
        background-color: #fcffe4;
        color: #000000;
        border: 1px solid #e3e3e3;
        border-radius: 0px;;
    }

    .btn-pager:hover {
        background-color: #f2f2f2;
    }

    .page-index {
        display: inline-block;
        margin-left: 10px;
        width: 35px;
        height: 30px;
        line-height: 30px;
        background-color: #e3efff;
        cursor: pointer;
        color: #000000;
    }

    .active {
        color: #ffffff;
        background-color: #0bbe06;
    }

    .dark {
        background-color: rgba(144, 138, 138, 0.18);
    }
</style>