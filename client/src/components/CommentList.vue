<template>
    <div class="commentOn">
        <div class="noContent" style="display: none" v-show="$store.state.commentList.length == 0"  >暂无留言</div>
        <div class="messList" id="div_list" v-for="item in $store.state.commentList">
            <div class="reply">
                <p class="replyContent">{{item.content}}</p>
                <p class="operation">
                    <span class="replyTime">{{item.time | getNowDate}}</span>
                    <span class="handle">
                        <a href="javascript:;" @click="acc(item)" class="top">{{item.acc}}</a>
                        <a href="javascript:;" @click="ref(item)" class="down_icon">{{item.ref}}</a>
                        <a href="javascript:;" class="cut" @click="delComment(item)">删除</a>	</span></p></div>
        </div>
        
        <Paging v-if="$store.state.commentList.length != 0" />

    </div>
</template>

<script>
    import Paging from './Paging.vue'
    import sweetalert from 'sweetalert'
    export default {
        name: 'commentList',
        components:{
            Paging
        },
        methods:{
            getList:function () {

              /*分发*/
              this.$store.dispatch('getList')

            },
            delComment:function (item) {
                var me = this;


              swal({
                    title: "请输入删除口令！",
                    text: "说出去的话，泼出去的水，哪有那么容易收回来！",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Write something"
                  },
                  function(inputValue){
                    if (inputValue === false) return false;

                    if (inputValue === "") {
                      swal.showInputError("猜一猜吧，万一对了呢!");
                      return false
                    }

                    swal("帮你提交了，对不对看你的命了!");
                    me.ajax.del({
                      _id:item._id,
                      key:inputValue
                    }).then(function (res) {

                      if(res.data.code === 0) {

                          /*数据删除完后退一页*/
                        if(me.$store.state.commentList.length === 1) {

                          me.$store.dispatch('backOne').then(function () {

                            me.$store.dispatch('getList');

                          })
                        } else {

                          me.$store.dispatch('getList');
                        }

                      }
                      console.log(res)
                    }).catch(function (err) {

                      console.log(err)
                    })

                  });




            },
            acc:function (item) {

                item.acc = item.acc + 1;

                this.ajax.acc(item).then(function (res) {

                    console.log(res)
                }).catch(function (err) {

                    console.log(err)
                })
            },
            ref:function (item) {

                item.ref = item.ref + 1;

                this.ajax.ref(item).then(function (res) {

                    console.log(res)
                }).catch(function (err) {

                    console.log(err)
                })
            }
        },
        mounted () {

            this.getList();

        }
    }

</script>

<style>
    @import "../static/css/sweetalert.css";
    .commentOn {
        width: 753px;
        display: block;
        margin-top: 25px;
        font-family: Verdana;
        overflow: hidden;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(165, 188, 255);
        border-image: initial;
        background: rgb(243, 248, 253);
    }

    .noContent {
        text-align: center;
        display: block;
        background: #FFF;
        font: 14px/2.3 "Microsoft YaHei";
        border-bottom: #e9e9e9 solid 1px;
        border-top: #e9e9e9 solid 1px;
        color: #999;

    }

    .messList {
        overflow: hidden;
    }

    .reply {
        overflow: hidden;
        padding: 0 20px;
        background: #FFF;
        border-top: #e9e9e9 solid 1px;
        border-bottom: #e9e9e9 solid 1px;
    }

    .replyContent {
        line-height: 24px;
        font-size: 14px;
        color: #2b2b2b;
        font-family: "Microsoft YaHei";
    }

    .operation {
        clear: both;
        width: 100%;
        height: 30px;
        margin-top: 8px;
    }

    .replyTime {
        float: left;
        color: #8b8585;
        line-height: 30px;
        font-size: 11px;
    }

    .handle {
        float: right;
        padding-top: 6px;
    }

    .handle a {
        text-decoration: none;
        float: left;
        margin-left: 12px;
        background: url(../static/images/icons.png) 0 0 no-repeat;
        height: 18px;
        line-height: 18px;
        padding-left: 20px;
    }

    .handle .down_icon {
        background-position: 0 -17px;
    }

    .handle a {
        text-decoration: none;
        float: left;
        margin-left: 12px;
        background: url(../static/images/icons.png) 0 0 no-repeat;
        height: 18px;
        line-height: 18px;
        padding-left: 20px;
    }

    a {
        outline: 0;
        color: #313030;
    }

    .handle .cut {
        background-position: 0 -33px;
    }

    .handle a {
        text-decoration: none;
        float: left;
        margin-left: 12px;
        background: url(../static/images/icons.png) 0 0 no-repeat;
        height: 18px;
        line-height: 18px;
        padding-left: 20px;
    }

    .page {
        text-align: right;
        font-size: 0;
        font-family: Verdana;
        padding: 10px 16px;
    }

    .page .active {
        background: #CCC;
    }

    .page a {
        display: inline-block;
        height: 20px;
        padding: 0 7px;
        border: #CCC solid 1px;
        font: 12px/20px Verdana;
        text-decoration: none;
        margin-left: 5px;
        background: #FFF;
    }
</style>