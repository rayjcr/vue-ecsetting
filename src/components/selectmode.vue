<template>
<div class="wrap flexColumn">
    <div class="Container flexBox graybg">
        <header>
            <router-link :to="'/'">
            <div class="h-back">
                <Icon type="ios-arrow-left"></Icon>
            </div>
            </router-link>
            <div class="h-tit">选择模式</div>
            <div v-on:click="saveCheck" class="h-confirm">确定</div>
        </header>

        <div class="selModeList radio-group">
            <div class="radioList">
                <div class="radiobox" v-bind:class="{cur:indexradio==0}">
                    <label class="clear" for="1"><div class="cb-l">
                        <span>日常模式</span><input id="1" name="mode" type="radio" value="0" @change="changeMode($event)">
                        <Icon class="icons" type="android-done"></Icon>
                    </div></label>  
                </div>
                <div class="radiobox" v-bind:class="{cur:indexradio==1}">
                    <label class="clear" for="2"><div class="cb-l">
                        <span>上课模式</span><input id="2" name="mode" type="radio" value="1" @change="changeMode($event)">
                        <Icon class="icons" type="android-done"></Icon>
                    </div></label>
                </div>
                <div class="radiobox" v-bind:class="{cur:indexradio==2}">
                    <label class="clear" for="3"><div class="cb-l">
                        <span>紧急通知模式</span><input id="3" name="mode" type="radio" value="2" @change="changeMode($event)">
                        <Icon class="icons" type="android-done"></Icon>
                    </div></label>
                </div>
            </div>
        </div>


    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'selectmode',
  data:function(){
    return{ 
        indexradio:0
    }
  },
  components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册

  },
  mounted:function(){
	 this.indexradio = this.$store.getters.getShowMode;
  },
  methods:{
    changeMode(event){
        this.indexradio = $(event.target).parents(".radiobox").index();
        this.$store.dispatch("setShowMode",event.target.value);
    },
    saveCheck(){
        //提交保存并且返回上级菜单
        this.$router.push({path:'/' })
    }
  }
}
</script>

<style>



</style>

