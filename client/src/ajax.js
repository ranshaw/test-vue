/**
 * Created by Ranshaw on 2017/6/25.
 */


exports.install = function (Vue,axios ) {

    var url = 'http://m.dayread.top';

    Vue.prototype.ajax =  {

        add:function (content) {

            return axios.get(url + '/add',{
                params:{
                    content:content
                }
            })
        },
        get:function (page) {

            return axios.get(url + '/get',{
                params:{
                    page:page
                }
            })
        },
        del:function (obj) {

            return axios.get(url + '/del',{
                params:{
                    _id:obj._id,
                    key:obj.key
                }
            })
        },
        acc:function (obj) {

            return axios.get(url + '/acc',{
                params:{
                    _id:obj._id,
                    acc:obj.acc
                }
            })
        },
        ref:function (obj) {

            return axios.get(url + '/ref',{
                params:{
                    _id:obj._id,
                    ref:obj.ref
                }
            })
        }

    };


};