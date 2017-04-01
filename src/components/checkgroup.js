import Vue from 'vue'
Vue.component('multiple-select-simplify', {
    props: ['optionsdata'],
    data: function() {
    var data = {
        isAllCheck:false,
        selectedList: [{"listTitle":"暂无信息","listItem": [{}]}]  //给了一个初始数据,不给报错....
    }
    return data
    },
    watch: {
        optionsdata: function (val, oldVal) {
            // console.log('option old: ' + JSON.stringify(oldVal))
            // console.log('option new: ' + JSON.stringify(val))
            this.selectedList = val;
            this.isAllCheck = true;
            for(var i=0;i<this.selectedList[0].listItem.length;i++){
                if(!this.selectedList[0].listItem[i].ischeck){
                this.isAllCheck =false; 
                break;   
                }    
            }     
        }
    },
    methods:{
        changeTitleChecked(event){
            // console.log(event);
            // console.log(event.target.id);
            // console.log(this.selectedList[0].listItem);
            for(var i=0;i<this.selectedList[0].listItem.length;i++){
                if(this.selectedList[0].listItem[i].id==event.target.id){
                    if( this.selectedList[0].listItem[i].ischeck){
                        this.selectedList[0].listItem[i].ischeck=false;
                    }else{
                        this.selectedList[0].listItem[i].ischeck=true;
                    }
                }
            }
            for(var j=0;j<data.listItem.length;j++){
                data.listItem[j].ischeck=false;
                data.Allcheck=false;
            }
            for(var i=0;i<this.selectedList[0].listItem.length;i++){
                if(!this.selectedList[0].listItem[i].ischeck){
                this.isAllCheck =false; 
                break;   
                }    
            }   
            // console.log(event.target.checked);
        },
        changeAllChecked(event){
            var isallcheck = true;
            for(var i=0;i<this.selectedList[0].listItem.length;i++){
                if(!this.selectedList[0].listItem[i].ischeck){
                isallcheck =false; 
                break;   
                }    
            }
            if(isallcheck){
                for(var j=0;j<this.selectedList[0].listItem.length;j++){
                    this.selectedList[0].listItem[j].ischeck=false;
                    this.isAllCheck=false;
                }
            }else{
                for(var j=0;j<this.selectedList[0].listItem.length;j++){
                    this.selectedList[0].listItem[j].ischeck=true;
                    this.isAllCheck=true;
                }
            }
            

        }
    },
    template:'<div class="selClassList checkbox-group">' +
            '<label :for="selectedList[0].listTitle"><div class="Allcheckbox" v-bind:class="{check:isAllCheck}">' +
                '<span>{{selectedList[0].listTitle}}</span><input type="checkbox" :id="selectedList[0].listTitle" @change="changeAllChecked($event)">' +
                '<div class="silderUp">展开 <Icon class="icons" type="chevron-down"></Icon></div>' +
            '</div></label>'+
            '<div class="checkList">' +
                '<div class="checkbox" v-bind:class="{check:item.ischeck}" v-for="item in selectedList[0].listItem">' +
                    '<label :for="item.id"><div class="cb-l">' +
                        '<span>{{item.name}}</span><input type="checkbox" :id="item.id" @change="changeTitleChecked($event)">' +
                    '</div></label>' +
                '</div>' +
            '</div>' +
        '</div>'
})
