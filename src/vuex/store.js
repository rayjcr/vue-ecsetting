import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    ShowMode:0,            //显示模式 0：日常模式  1：上课模式  2：紧急模式
    MachineStat:0,         //设备状态 0：关机状态   1：开机状态
    LightValue:0,          //亮度大小 0 ~ 100
    AutoLight:false,       //是否自动调节亮度
    VoiceValue:0,          //音量大小 0 ~ 100
    AutoVoice:false,       //是否自动调节声音
    OpenTime:"8:16",       //开机时间
    OpenDate:[1,2,5,0],    //开机重复星期
    CloseTime:"21:16",     //关机时间
    CloseDate:[3,6],       //关机重复星期
    //我的班级
    MyClass:{
            "listTitle":"全部班级",
            "Allcheck":false,
            "isshow":true,
            "listItem": 
            [{"id":"1","name":"一年级2班","ischeck":true},{"id":"2","name":"一年级3班","ischeck":true},{"id":"3","name":"一年级4班","ischeck":false}
            ]
            },
    //其他班级            
    OtherClass:{
            "listTitle":"其他场地",
            "Allcheck":true,    //是否全选,这里任意值也可以不赋值
            "isshow":true,      //是否显示,这里任意值也可以不赋值
            "listItem": 
            [{"id":"7","name":"其他2班","ischeck":true},{"id":"9","name":"其他3班","ischeck":false},{"id":"13","name":"其他4班","ischeck":true}
            ]
            }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})