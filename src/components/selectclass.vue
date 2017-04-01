<template>
<div class="wrap flexColumn">
    <div class="Container flexBox graybg">
        <header>
            <router-link :to="'/'">
            <div class="h-back">
                <Icon type="ios-arrow-left"></Icon>
            </div>
            </router-link>
            <div class="h-tit">选择班级</div>
            <div v-on:click="saveCheck" class="h-confirm" v-bind:class="{nosel:!hassel}">确定</div>
        </header>

        <div class="selClassList checkbox-group">
            <div class="Allcheckbox"  v-bind:class="{check:MyClass.Allcheck}">
            <label :for="MyClass.listTitle">
                <span class="alltit">{{MyClass.listTitle}}</span><input type="checkbox" :id="MyClass.listTitle" @change="changeAllChecked(MyClass,$event)">
            </label>
                <div class="silderUp" v-on:click="toggle(MyClass,$event)"><span>收起</span> <Icon class="icons" type="chevron-up"></Icon></div>
            </div>
            <div class="checkList" v-show="MyClass.isshow">
                <div class="checkbox" v-bind:class="{check:item.ischeck}" v-for="item in MyClass.listItem">
                    <label :for="item.id"><div class="cb-l">
                        <span>{{item.name}}</span><input type="checkbox" :id="item.id" @change="changeTitleChecked(MyClass,$event)">
                    </div></label>
                </div>
            </div>
        </div>

        <div class="selClassList checkbox-group mt20">
            <div class="Allcheckbox" v-bind:class="{check:OtherClass.Allcheck}">
            <label :for="OtherClass.listTitle">
                <span class="alltit">{{OtherClass.listTitle}}</span><input type="checkbox" :id="OtherClass.listTitle" @change="changeAllChecked(OtherClass,$event)">
            </label>
                <div class="silderUp" v-on:click="toggle(OtherClass,$event)"><span>收起</span> <Icon class="icons" type="chevron-up"></Icon></div>
            </div>
            <div class="checkList" v-show="OtherClass.isshow">
                <div class="checkbox" v-bind:class="{check:item.ischeck}" v-for="item in OtherClass.listItem">
                    <label :for="item.id"><div class="cb-l">
                        <span>{{item.name}}</span><input type="checkbox" :id="item.id" @change="changeTitleChecked(OtherClass,$event)">
                    </div></label>
                </div>
            </div>
        </div>

<!--
        <multiple v-bind:optionsdata="atest"></multiple>

        <multiple class="mt20" v-bind:optionsdata="btest"></multiple>
-->

    </div>
</div>
</template>

<script>
//v-bind:class="{check:isAllCheck(atest)}"
//import checkgroup from '../components/checkgroup'
import $ from 'jquery'

export default {
  name: 'selectclass',
  data:function(){
    return{
      hassel:false,    //是否有选择班级，有选择为true
      MyClass: {},
      OtherClass: {}
    }
  },
  components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册

  },
  mounted:function(){
    this.MyClass = this.$store.getters.getMyClass;
    this.OtherClass = this.$store.getters.getOtherClass;
    this.isAllcheck(this.MyClass);
    this.isAllcheck(this.OtherClass);

    this.hasCheck();

    // console.log(this.MyClass)
    // console.log(this.OtherClass)
  },
  methods:{
    toggle(data,event){
        if(data.isshow){
            data.isshow=false;
            $(event.target).parents(".Allcheckbox").children(".silderUp").addClass("Down");
            $(event.target).parents(".Allcheckbox").children(".silderUp").children("span").html("展开");
        }else{
            data.isshow=true;
            $(event.target).parents(".Allcheckbox").children(".silderUp").removeClass("Down");
            $(event.target).parents(".Allcheckbox").children(".silderUp").children("span").html("收起");
        }
    },
    hasCheck(){

        var ClassArray=[];
        ClassArray.push(this.MyClass);
        ClassArray.push(this.OtherClass);
        this.hassel=false;
        //这里判断是否有选择班级
        for(var i=0;i<ClassArray.length;i++){
            for(var j=0;j<ClassArray[i].listItem.length;j++){
                if(ClassArray[i].listItem[j].ischeck){
                    this.hassel=true;
                    break;
                }
            }
        }


    },
    queryData(){
        //这里读取初始化数据.. 移到钩子函数mounted里了
    },
    isAllcheck(data){
        data.Allcheck =true; 
        for(var i=0;i<data.listItem.length;i++){
            if(!data.listItem[i].ischeck){
            data.Allcheck = false; 
            break;   
            }    
        } 
    },
    changeTitleChecked(data,event){
        for(var i=0;i<data.listItem.length;i++){
            if(data.listItem[i].id==event.target.id){
                if( data.listItem[i].ischeck){
                    data.listItem[i].ischeck=false;
                }else{
                    data.listItem[i].ischeck=true;
                }
            }
        }
        this.isAllcheck(data);
        this.hasCheck();
    },
    changeAllChecked(data,event){
        if(data.Allcheck){
            for(var j=0;j<data.listItem.length;j++){
                data.listItem[j].ischeck=false;
                data.Allcheck=false;
            }
        }else{
            for(var j=0;j<data.listItem.length;j++){
                data.listItem[j].ischeck=true;
                data.Allcheck=true;
            }
        }
        this.hasCheck();
    },
    saveCheck(){
        //提交保存并且返回上级菜单
        
        this.$store.dispatch("setMyClass",this.MyClass);
        this.$store.dispatch("setOtherClass",this.OtherClass);

        //console.log(this.MyClass);
        //console.log(this.OtherClass);
        this.$router.push({path:'/' })
    }



  }
}
</script>

<style>
.selClassList{background-color:#FFF;}


</style>

