<template>
<div class="wrap flexColumn">
    <div class="Container flexBox graybg">
        <header>
            <div class="h-back">
                <Icon type="ios-arrow-left"></Icon>
            </div>
            <div class="h-tit">设置</div>
        </header>
        <!--
        <Checkbox v-model="single">Checkbox</Checkbox>
        <span>{{single}}</span>
        -->
        
        <div class="SelList mt20">
            <div class="SelUnit">
                <div class="SelTit">选择班级</div>
                <router-link :to="'selclass'">
                    <div class="SelCont">
                        <div class="val">{{selClassTxt=="" ? '请选择班级':selClassTxt}} <i><Icon type="chevron-right"></Icon></i></div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="SelList mt20">
            <div class="SelUnit">
                <div class="SelTit">显示模式</div>
                <router-link :to="'selmode'">
                    <div class="SelCont">
                        <div class="val">{{modeTxt}} <i><Icon type="chevron-right"></Icon></i></div>
                    </div>
                </router-link>
            </div>
            <div class="SelUnit">
                <div class="SelTit">设备状态</div>
                <div class="SelCont">

                    <span v-on:click="SetMachineStats(0)"><i-button type="primary" v-show="MachineStat==1">关机</i-button></span>
                    <span v-on:click="SetMachineStats(1)"><i-button v-show="MachineStat==0">开启</i-button></span>
                </div>
            </div>
            <div class="SelUnit">
                <router-link :to="'settime'">
                    <div class="SelTit">定时开启时间</div>
                    <div class="SelCont">
                        <div class="val">{{OpenTxt}}<i><Icon type="chevron-right"></Icon></i></div>
                    </div>
                </router-link>
            </div>
            <div class="SelUnit">
                <router-link :to="{path:'settime',query:{stat:'close'}}">
                    <div class="SelTit">定时关机时间</div>
                    <div class="SelCont">
                        <div class="val">{{CloseTxt}} <i><Icon type="chevron-right"></Icon></i></div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="SelList mt20">
            <div class="SelUnit">
                <router-link :to="'setlighteness'">
                    <div class="SelTit">亮度</div>
                    <div class="SelCont">
                        <div class="placeholder">
                        <i><Icon type="chevron-right"></Icon></i>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="SelUnit">
                <router-link :to="'setvoice'">
                    <div class="SelTit">声音</div>
                    <div class="SelCont">
                        <div class="placeholder">
                        <i><Icon type="chevron-right"></Icon></i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="FootBtn">
            <i-button class="lbtn" type="primary">确 定</i-button>
        </div>

    </div>
</div>
</template>

<script>

export default {
  name: 'setting',
  data () {
    return {
        selClassTxt:"",   //选中的班级信息
        modeTxt:"",       //显示模式（文字状态）
        MachineStat:0,    //机器状态   
        OpenTxt:"",       //定时开启时间
        CloseTxt:"",      //定时关机时间

    }
  },
  mounted:function(){    
     //挂载到实例上去之后调用此钩子mounted (目前用作数据初始化)

     var that = this;

     //初始化selClassTxt 显示是否有选中班级
     var MyClass = this.$store.getters.getMyClass;
     var OtherClass = this.$store.getters.getOtherClass;
     var ClassArray=[];
     ClassArray.push(MyClass);
     ClassArray.push(OtherClass);
     this.initClassTxt(ClassArray);
     ///////////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑//////////

	 this.modeNum2Txt(this.$store.getters.getShowMode);
     this.MachineStat = this.$store.getters.getMachineStat;

     var OpenTime = this.$store.getters.getOpenTime;
     var OpenDate = this.$store.getters.getOpenDate;
     var CloseTime = this.$store.getters.getCloseTime;
     var CloseDate = this.$store.getters.getCloseDate;

     var openTemp,closeTemp;
     var timeArr = OpenTime.split(":");
     if(parseInt(timeArr[0])>12){
         openTemp = "下午 "+ (timeArr[0]-12)+":"+timeArr[1];
     }else{
         openTemp = "上午 "+ timeArr[0]+":"+timeArr[1];
     }

     timeArr = CloseTime.split(":");
     if(parseInt(timeArr[0])>12){
         closeTemp = "下午 "+ (timeArr[0]-12)+":"+timeArr[1];
     }else{
         closeTemp = "上午 "+ timeArr[0]+":"+timeArr[1];
     }
     
     this.$store.dispatch('WeekStr',OpenDate).then(function(resolve, reject){
        openTemp = openTemp + " " + resolve;
        that.OpenTxt = openTemp;
     })

     this.$store.dispatch('WeekStr',CloseDate).then(function(resolve, reject){
        closeTemp = closeTemp + " " + resolve;
        that.CloseTxt = closeTemp;
     })

    //console.log(openTemp);
    



  },
  components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册
  },
  methods:{
    initClassTxt(arrClass){
        this.selClassTxt="";
        for(var i=0;i<arrClass.length;i++){
            for(var j=0;j<arrClass[i].listItem.length;j++){
                if(arrClass[i].listItem[j].ischeck){
                    this.selClassTxt+=arrClass[i].listItem[j].name+",";
                }
            }
        }
        this.selClassTxt = this.selClassTxt.substring(0,this.selClassTxt.length-1)

    },
    modeNum2Txt(num){

      switch(parseInt(num)){
          case 0:
            this.modeTxt = "日常模式"
            break;
          case 1:
            this.modeTxt = "上课模式"
            break;
          case 2:
            this.modeTxt = "紧急通知模式"
            break;
          default:
            this.modeTxt = "请设置显示模式"   
      }
    },
    SetMachineStats(num){
        //这里开机关机有延迟。需要去判断当前机器的真实状态再做改变。需另写方法
        this.$store.dispatch("setMachineStat",num);
        this.MachineStat = num;
    }



  }
}
</script>

<style>

</style>

