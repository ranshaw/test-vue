<template>
    <div class="takeComment">
        <textarea name="textarea" class="takeTextField" v-model="content" ></textarea>
        <div class="takeSbmComment">
            <input type="button" class="inputs" value="" @click="add" >
             <span>(可按 Enter 回复)</span>
        </div>

    </div>
</template>

<script>

    export default {
        name:'takeComment',
        data () {

            return {
                content:''
            }
        },
        methods:{
            add:function () {

                var me = this;
                this.ajax.add(me.content).then(function(res){

                    if(res.data.code === 0) {
                      /*刷新页面，本地添加的数据没有ID,无法操作其他功能*/
                      me.$store.dispatch('getList');

                    }
                    console.log(res)
                }).catch(function (error) {

                    console.log(error)
                })
            }
        }
    }
</script>

<style>
    .takeComment {
        width: 713px;
        display: block;
        overflow: hidden;
        border: #a5bcff solid 1px;
        background: #f3f8fd;
        margin-top: 25px;
        font-family: Verdana;
        padding: 15px 20px
    }
    .takeTextField {
        width: 701px;
        height: 70px;
        border: #b1b1b1 solid 1px;
        clear: both;
        display: block;
        margin: 10px 0 10px 0;
        line-height: 20px;
        padding: 5px;
        box-shadow: inset 0 0 5px #DDD;
        font-family: "Microsoft YaHei"
    }

    .takeSbmComment {
        display: block;
        overflow: hidden
    }

    .takeSbmComment span {
        float: right;
        color: #CCC;
        line-height: 37px;
        padding-right: 10px
    }
    .inputs {
        float: right;
        width: 125px;
        height: 37px;
        cursor: pointer;
        opacity: 0.8;
        border-width: 0px;
        border-style: none;
        border-color: initial;
        border-image: initial;
        background: url(../static/images/takeSbmComment.png) left top no-repeat;
    }
    .takeSbmComment span {
        float: right;
        color: rgb(204, 204, 204);
        line-height: 37px;
        padding-right: 10px;
    }
    input:focus {
        outline: none;
    }
</style>