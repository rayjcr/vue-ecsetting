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

        <div class="selWeekList checkbox-group">
            <div class="checkList">
                <div class="checkbox" v-bind:class="{check:indexcheck[0]==1}">
                    <label class="clear" for="0"><div class="cb-l">
                        <span>每周日</span><input id="0" name="mode" type="checkbox" value="0" @change="selWeek($event)">
                    </div></label>  
                </div>
                <div class="checkbox" v-bind:class="{check:indexcheck[1]==1}">
                    <label class="clear" for="1"><div class="cb-l">
                        <span>每周一</span><input id="1" name="mode" type="checkbox" value="1" @change="selWeek($event)">
                    </div></label>
                </div>
                <div class="checkbox" v-bind:class="{check:indexcheck[2]==1}">
                    <label class="clear" for="2"><div class="cb-l">
                        <span>每周二</span><input id="2" name="mode" type="checkbox" value="2" @change="selWeek($event)">
                    </div></label>
                </div>
                <div class="checkbox" v-bind:class="{check:indexcheck[3]==1}">
                    <label class="clear" for="3"><div class="cb-l">
                        <span>每周三</span><input id="3" name="mode" type="checkbox" value="3" @change="selWeek($event)">
                    </div></label>
                </div>
                <div class="checkbox" v-bind:class="{check:indexcheck[4]==1}">
                    <label class="clear" for="4"><div class="cb-l">
                        <span>每周四</span><input id="4" name="mode" type="checkbox" value="4" @change="selWeek($event)">
                    </div></label>
                </div>
                <div class="checkbox" v-bind:class="{check:indexcheck[5]==1}">
                    <label class="clear" for="5"><div class="cb-l">
                        <span>每周五</span><input id="5" name="mode" type="checkbox" value="5" @change="selWeek($event)">
                    </div></label>
                </div>
                <div class="checkbox" v-bind:class="{check:indexcheck[6]==1}">
                    <label class="clear" for="6"><div class="cb-l">
                        <span>每周六</span><input id="6" name="mode" type="checkbox" value="6" @change="selWeek($event)">
                    </div></label>
                </div>

            </div>
        </div>


    </div>
</div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'selectmode',
  data:function(){
    return{ 
        indexcheck:[0,0,0,0,0,0,0],    //选中星期的默认值
        state:""                       //settime传递过来的参数，用来判断是 开机 还是 关机 close是关机，默认空值是开机
    }
  },
  components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册

  },
  mounted:function(){  //页面$el挂载完毕后执行Creat之后

     this.state = this.$route.query.stat;    //得到状态参数 是否开关机
     var TimeArray;                          //store里的Date数据变量
     
     //得到store里Date值
     if(this.state =='close'){
	    TimeArray = this.$store.getters.getCloseDate;
     }else{
        TimeArray = this.$store.getters.getOpenDate;
     }

     //把store里的Date值转换成indexcheck数组值...这样方便单选按钮的操作
     for(var i=0;i<TimeArray.length;i++){
         this.indexcheck[TimeArray[i]]=1;
     }
     //因为vue自身data的双向绑定的原因observer改变了才会触发双向绑定,单纯的改变数组里的值是无法双向绑定，所以这里做了一下（数组->字符串->数组）的过程用来触发observer的改变
     this.indexcheck=this.indexcheck.toString().split(",");

  },
  methods:{

    //点击单选项重新组一下数组触发绑定
    selWeek(event){
        var eventId=event.target.id;
        if(this.indexcheck[eventId]==1){
            this.indexcheck[eventId]=0;
            this.indexcheck=this.indexcheck.toString().split(",");
        }else{
            this.indexcheck[eventId]=1;
            this.indexcheck=this.indexcheck.toString().split(",");
        }
    },

    //提交保存并且返回上级菜单
    saveCheck(){    
        var selindex=[]; //存放最终星期的临时数组
        for(var i=0;i<this.indexcheck.length;i++){
            if(this.indexcheck[i]==1){
                selindex.push(i);
            }
        }

        //调用dispatch("xxxx")去设置store里的值...
        //并且这里需要做一个异步保存数据
        if(this.state =='close'){
            this.$store.dispatch("setCloseDate",selindex);
        }else{
            this.$store.dispatch("setOpenDate",selindex);
        }
        this.$router.push({path:'settime',query:{stat:this.state}})

        //self.location='/#/settime?stat='+this.state;
    }
  }
}
</script>

<style>
.selWeekList{background-color:#FFF;}


</style>

