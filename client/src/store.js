/**
 * Created by Ranshaw on 2017/7/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);


const state = {
    current:1,
    commentList:[],
    pageNo:1,
    backClipped: true,
    preClipped: false,
};

const mutations = {
  getList: function (state,val) {

       state.commentList = val.rows;
       state.pageNo = Math.ceil(val.total/5);
  },
  prePage: function (state) {

    if (state.current > 1) {
      state.current--
    }
  },
  nextPage: function (state) {

    if (state.current < state.pageNo) {

      state.current++

    }
  },
  goPage: function (state,page) {

    var index = page.page;
    if (index !== state.current) {
      state.current = index
    }

  },
  backOne: function (state) {

      if(state.current > 1) {
        state.current--;

      }

  }
};

const actions = {
  getList: function ({commit,state}) {

   return new Promise(function (resolve,reject) {
     axios.get('http://m.dayread.top/get',{
       params:{
         page:state.current
       }
     }).then(function (res) {
       resolve('成功');
       if(res.data.code === 0) {
         console.log(res);
         commit('getList',res.data.info);

       }

     }).catch(function (err) {
       reject(err);
       console.log(err)
     });

    });

  },
  prePage: function ({commit}) {

    commit('prePage');

  },
  nextPage: function ({commit}) {

    commit('nextPage');

  },
  goPage: function (context,page) {

    context.commit('goPage',page)
  },
  backOne: function ({commit}) {
        console.log('删除');
      commit('backOne')
  }
};

const getters = {
    pages:function (state) {
        
      let ret = [2,3,4,5],
          ret2 = [state.pageNo-4,state.pageNo-3,state.pageNo-2,state.pageNo-1];
      if (state.current >= 5 && state.pageNo > 5) {

        ret = [state.current-1,state.current,state.current+1];

        state.preClipped = true

      } else {
        ret = [];
        for(var i = 2; i < state.pageNo ;i++) {
          if(i == 6) {
            break;
          }
          ret.push(i)
        }
        state.preClipped = false;
      }


        /*跳转到最后5页*/
      if(state.current > state.pageNo - 4 && state.pageNo > 5) {

        state.backClipped = false;
        return ret2;
      } else {

        state.backClipped = true;
      }

        /*页码数小于等于5隐藏省略号*/
      if(state.pageNo <= 5) {

        state.backClipped = false;
      }

      // 返回整个页码组
      console.log(ret);
      return ret
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})