export const setShowMode = function({commit},type){
    commit("set_ShowMode",type)
}

export const setMachineStat = function({commit},type){
    commit("set_MachineStat",type)
}

export const setLightValue = function({commit},type){
    commit("set_LightValue",type)
}

export const setVoiceValue = function({commit},type){
    commit("set_VoiceValue",type)
}

export const setOpenTime = function({commit},type){
    commit("set_OpenTime",type)
}

export const setOpenDate = function({commit},type){
    commit("set_OpenDate",type)
}

export const setCloseTime = function({commit},type){
    commit("set_CloseTime",type)
}

export const setCloseDate = function({commit},type){
    commit("set_CloseDate",type)
}

export const setAutoLight = function({commit},type){
    commit("set_AutoLight",type)
}

export const setAutoVoice = function({commit},type){
    commit("set_AutoVoice",type)
}

export const setMyClass = function({commit},type){
    commit("set_MyClass",type)
}

export const setOtherClass = function({commit},type){
    commit("set_OtherClass",type)
}

export const WeekStr = function({commit},num){
    var reStr="";
    for(var i=0;i<num.length;i++){
        if(i==0){
            reStr = reStr + getWeekStr(num[i]);
        }else{
            reStr = reStr + "," + getWeekStr(num[i]);
        }
    }
    return reStr;
}

function getWeekStr(num){
    switch(num){
        case 1:
        return "星期一";
        case 2:
        return "星期二";
        case 3:
        return "星期三";
        case 4:
        return "星期四";
        case 5:
        return "星期五";
        case 6:
        return "星期六";
        case 0:
        return "星期日";
    }
}