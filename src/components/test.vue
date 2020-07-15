<template>
  <div>
    <div class="subject ">
      <div v-for="i in msg" :key="i" v-bind:class="getClass(i)">&nbsp{{initValue(i)}}</div>
    </div>
   <!-- <div style="float:right" class="subject ">
      <div v-for="i in msg" :key="i" v-bind:class="getClass(i)">&nbsp{{initValue(i)}}</div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      date: '12',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      item:item
    }
  },
  computed: {
    getClass: function () {
      return function(v){
        if(v == '?'){
          return "inputdiv"
        }
        if(v == '+' || v == '-' ||  v == '='){
          return 'symbol'
        }
        return 'figure'
      }
    },
    initValue:function(){
      return function(v){
        if(v == '?'){
          return '';
        }

        return v
      }
    }
  },
  methods: {

  },
  props: {
    msg: {
    },
  },
}
</script>

<style>
.subject{
  /* display:inline-block; */
  margin-bottom: 3px;
}
.subject div {
  display:inline-block;
  height: 36px;
  margin-right: 10px;
  text-align:center;
  line-height: 36px;/*让黄色div中的文字内容垂直居中*/
}

.inputdiv{
  width: 36px;
  border:1px solid #000;
  /* background-color: bisque; */
  outline: auto;
}
.figure{
  width: 36px;
}
.symbol{
  width: 20px;
}
.box{
    background: yellow;
    float: left;
    width: 200px;
    height: 100px;
    line-height: 100px;/*让黄色div中的文字内容垂直居中*/
    text-align: center;/*让文字水平居中*/
    position: absolute;
    top:50%;
    margin-top: -50px;
    margin-left: 200px;    
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
