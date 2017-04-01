<template>
<div class="wrap flexColumn">
    <div class="Container flexBox graybg">
        <header>
            <router-link :to="'/'">
            <div class="h-back">
                <Icon type="ios-arrow-left"></Icon>
            </div>
            </router-link>
            <div class="h-tit">定时开启时间设置</div>
            <div v-on:click="saveCheck" class="h-confirm">确定</div>
        </header>

        <div class="SetOpenTime">
        <div class="SetTimeDataBox">
            <div class="cusSelBox" style="width:2.6rem; margin-left:.5rem;">
                <ul>
                    <li>--</li>
                    <li>上午</li>
                    <li>下午</li>
                    <li></li>
                </ul>
            </div>		
            <div class="cusSelBox leftside">
                <ul>
                    <li>--</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                    <li></li>
                </ul>
            </div>
            <div class="splitxt">点</div>
            <div class="cusSelBox leftside">
                <ul>
                    <li>--</li>
                    <li>0</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                    <li>15</li>
                    <li>16</li>
                    <li>17</li>
                    <li>18</li>
                    <li>19</li>
                    <li>20</li>
                    <li>21</li>
                    <li>22</li>
                    <li>23</li>
                    <li>24</li>
                    <li>25</li>
                    <li>26</li>
                    <li>27</li>
                    <li>28</li>
                    <li>29</li>
                    <li>30</li>
                    <li>31</li>
                    <li>32</li>
                    <li>33</li>
                    <li>34</li>
                    <li>35</li>
                    <li>36</li>
                    <li>37</li>
                    <li>38</li>
                    <li>39</li>
                    <li>40</li>
                    <li>41</li>
                    <li>42</li>
                    <li>43</li>
                    <li>44</li>
                    <li>45</li>
                    <li>46</li>
                    <li>47</li>
                    <li>48</li>
                    <li>49</li>
                    <li>50</li>
                    <li>51</li>
                    <li>52</li>
                    <li>53</li>
                    <li>54</li>
                    <li>55</li>
                    <li>56</li>
                    <li>57</li>
                    <li>58</li>
                    <li>59</li>
                    <li></li>
                </ul>    
            </div>
            <div class="splitxt">分</div>	
		</div>
        </div>

        <div class="SelList mt20">
            <div class="SelUnit">
                <router-link :to="{path:'selectweek',query:{stat:state}}">
                    <div class="SelTit">重复</div>
                    <div class="SelCont">
                        <div class="val">{{DateStr}}<i><Icon type="chevron-right"></Icon></i></div>
                    </div>
                </router-link>
            </div>
        </div>
					


    </div>
</div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'settime',
  data:function(){
    return{ 
        isInit:false,   //是否第一次加载，当手触摸后就置为false;
        state:"",
        HtmlFont:0,
        DateStr:"",
        TimeAP:0,
        TimeH:0,
        TimeM:0
    }
  },
  components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册

  },
  mounted:function(){

    this.state = this.$route.query.stat;
    //state = 'close'  是关机日期的页面


    this.HtmlFont = document.getElementsByTagName('html')[0].style.fontSize.replace("px","");  //得到根html的font-size 用于把rem转成px
    var that = this;

    //初始化页面，可以用来ajax读取初始化数据
    var init_Time,init_Date;
    if(this.state =='close'){
        init_Time = this.$store.getters.getCloseTime;
        init_Date = this.$store.getters.getCloseDate; 
    }else{
        init_Time = this.$store.getters.getOpenTime;
        init_Date = this.$store.getters.getOpenDate;
    }

    //把时间格式化 例: 18:50 ->格式化后为 下午 6:50
    var timeArr = init_Time.split(":");
    if(parseInt(timeArr[0])>12){
        this.TimeAP = 1;
        this.TimeH = parseInt(timeArr[0]) - 12;
    }else{
        this.TimeH = parseInt(timeArr[0]);
    }
    this.TimeM = parseInt(timeArr[1]);
    
    //设置时间显示轴上的坐标
    var TempTime = [this.TimeAP,this.TimeH-1,this.TimeM];

    for(var i=0;i<TempTime.length;i++){
        this.isInit = true;
        $(".cusSelBox").eq(i).find("li").eq(TempTime[i]+1).addClass("cur");
        $(".cusSelBox").eq(i).animate({scrollTop: TempTime[i]*that.HtmlFont*1.2}, 500);
    }
    
    /*返回星期的字符类型*/
    //console.log(this.$store.dispatch('WeekStr',OpenDate));

    this.$store.dispatch('WeekStr',init_Date).then(function(resolve, reject){
        that.DateStr = resolve;
    })




    /////////////////////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  以下全是完成了滚动时间的程序  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓/////////////////////////
    var curnum=0;
    var isTouchend=false;
    var scrollTime,jsTimer;
    var autoFix = function(){  
        if(isTouchend){
            for(var i=0;i<$(".cusSelBox").length;i++){
                curnum = $(".cusSelBox").eq(i).find(".cur").index()-1;
                $(".cusSelBox").eq(i).animate({scrollTop: curnum*that.HtmlFont*1.2}, 50);
            }
        }	
    }

    $(function () {
        $(".cusSelBox").scroll(function() {
            if(!that.isInit){
                clearTimeout(scrollTime);
                var curnum = Math.round($(this).scrollTop()/(that.HtmlFont*1.2));
                $(this).children("ul").children(".cur").removeClass("cur");
                $(this).children("ul").children("li").eq(curnum+1).addClass("cur");
                
                clearTimeout(jsTimer);
                jsTimer = setTimeout(function(){
                    scrollTime = setTimeout(autoFix,50);
                },50)
            }
        });	
    })

    document.addEventListener('touchend',touchend,false);
    function touchend (event){
        that.isInit = false;
        isTouchend=true;
        scrollTime = setTimeout(autoFix,50);
    }

    document.addEventListener('touchstart',touchstart,false);
    function touchstart (event){
        isTouchend=false;
    }
    /////////////////////////////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑/////////////////////////////////

         
  },
  methods:{
    saveCheck(){
        var t_AP = $($(".cusSelBox")[0]).find(".cur").index()-1;
        var t_H = $($(".cusSelBox")[1]).find(".cur").index();
        var t_M = $($(".cusSelBox")[2]).find(".cur").index()-1;
        
        if(t_AP>0){
            t_H = t_H+12;
        }
        var tempTime = t_H+":"+t_M;
        if(this.state =='close'){
            this.$store.dispatch("setCloseTime",tempTime);
        }else{
            this.$store.dispatch("setOpenTime",tempTime);
        }
        //提交保存并且返回上级菜单
        this.$router.push({path:'/' })
    },
    
  }
}
</script>

<style>



</style>

