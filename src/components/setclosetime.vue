<template>
<div class="wrap flexColumn">
    <div class="Container flexBox whitebg">
        <header>
            <router-link :to="'/'">
            <div class="h-back">
                <Icon type="ios-arrow-left"></Icon>
            </div>
            </router-link>
            <div class="h-tit">显示亮度</div>
            <div v-on:click="saveCheck" class="h-confirm">确定</div>
        </header>
        
        <div class="settingTit">亮度</div>
        
        <div class="settingMain">
            <div class="settingBox clear">
                <div class="voiceLow"><Icon type="ios-volume-low"></Icon></div>
                <div class="voiceSlider">
                    <div class="SliderMain" id="SliderMain">
                        <div id="SliderIng" class="SliderIng"></div>
                        <div id="SliderBlock" class="SliderBlock"></div>
                    </div>
                </div>
                <div class="voiceHigh"><Icon type="ios-volume-high"></Icon></div>
            </div>
            <div class="settingBox clear">
                <div class="tit">用按钮调整<br><span>音量可用音量按钮调节</span></div>
                <div class="cont">
                    <i-switch v-model="voicetAuto" @on-change='change' class="mt20">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
            </div>
        </div>

        <div>
            
        </div>

    </div>
</div>
</template>

<script>

export default {
  name: 'setvoice',
  data:function(){
    return{ 
       //isTouchSlider:false,      //判断是否触碰了滑块
        voicetAuto:false,
        voiceValue:20,
        HtmlFont:0
    }
  },
  components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册

  },
  mounted:function(){

     this.HtmlFont = document.getElementsByTagName('html')[0].style.fontSize.replace("px","");
     var that = this;
     var StartX = document.getElementById("SliderMain").offsetLeft;
     document.getElementById("SliderBlock").addEventListener("touchmove",function(e){
         var stepX = e.touches[0].clientX - StartX
         //console.log(stepX)
         //console.log(that.HtmlFont)
         var perStep = (stepX/that.HtmlFont)/5.4*100;
         //console.log(perStep);
         that.ChangeBlock(perStep) 
     })

     this.VoiceValue = this.$store.getters.getVoiceValue;

     this.ChangeBlock(this.VoiceValue);

         
  },
  methods:{
    saveCheck(){
        //提交保存并且返回上级菜单
        this.$router.push({path:'/' })
    },
    change(status){
        console.log("status="+status);
    },
    ChangeBlock(perStep){
        //console.log(perStep);
        if(perStep>0&&perStep<100){
            document.getElementById("SliderBlock").style.left = (5.4*this.HtmlFont*perStep)/100+"px";
            document.getElementById("SliderIng").style.width = perStep+"%";
        }else if(perStep<=0){
            document.getElementById("SliderBlock").style.left = "0px";
            document.getElementById("SliderIng").style.width = "0%";
            perStep = 0;
        }else if(perStep>100){
            document.getElementById("SliderBlock").style.left = (5.4*this.HtmlFont)+"px";
            document.getElementById("SliderIng").style.width = "100%";
            perStep = 100;
        }
        
        this.VoiceValue = perStep;
        this.$store.dispatch("setVoiceValue",perStep);
        
    }



  }
}
</script>

<style>



</style>

