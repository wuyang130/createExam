<template>
  <div id="app" class="app">
    <!-- <img src="./assets/logo.png"> -->
    <div>
      <el-button @click="test">生成{{len}}</el-button>
      <el-button @click="createData">生成{{len}}</el-button>
      <el-button @click="print">Start{{date}}</el-button>
    </div>
    <div class="math-exam">
      <el-container style="width:800px;height:auto;border: 1px solid #eee;margin:auto" >
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <span style="font-size: 20px;">姓名_________</span>
            <span style="font-size: 20px;">分数_________</span>
          </el-header>

          <!-- <test v-for="item in tableData" :key="item" v-bind:msg="item"></test> -->
        </el-container>
      </el-container>
      <div class="line"><test v-for="item in tableData1" :key="item" v-bind:msg="item"></test></div>
      <div class="line"><test v-for="item in tableData2" :key="item" v-bind:msg="item"></test></div>
    </div>

  </div>
</template>

<script>
import test from './test.vue'
export default {
  components: {
    'test': test,
  },
  data() {
    const item = [
      '11','+','23', '+','1','=','100',
    ];
    var tableData1 = []
    return {
      tableData1: [],
      tableData2: [],
      len:tableData1.length,
      date:(new Date()).toLocaleDateString()
    }
  },
  methods: {
    test(){
      console.log(this._createItems(99,25,this.tableData1))
      console.log(this._createItems(99,25,this.tableData2))
    },
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
    createData(){
      const item = [
        '111', '+','?','=','200',
      ];
      this.tableData.push(item)
      this.len = this.tableData.length
    },
    _createItems(range,sum,tableData){
      tableData.splice(0,tableData.length);
      for(let i = 0;i<sum;i++){
        var list = this._createItem(range)
        var v = this._compute(list)
        
        if(v > range/2){
          if(this._randomNum(0,1) == 0){
            const num3 = this._randomNum(v)
            list.push("-")
            list.push(num3)
          }else{
            const num3 = this._randomNum(range - v)
            list.push("+")
            list.push(num3)
          }
        }else{
          if(this._randomNum(0,1) == 0){
            const num3 = this._randomNum(range - v)
            list.push("+")
            list.push(num3)
          }else{
            const num3 = this._randomNum(v)
            list.push("-")
            list.push(num3)
          }
        }
        tableData.push(this._computeAll(list))
      }
      return tableData

    },
    _computeAll(list){
      var flg = 1
      var sum = 0
      for(let i=0;i<list.length;i++){
        if(list[i] == '-'){
          flg = -1
        }else if(list[i] == '+'){
          flg = 1
        }else{
          sum = sum + flg*list[i]
        }
      }
      list.push("=")
      list.push(sum)
      return list
    },
    _compute(list){
      const num1 = list[0]
      const num2 = list[2]
      if(list[1] == '+'){
        return num1 + num2
      }else{
        return num1 - num2
      }
    },
    _createItem(range){
      const num1 = this._randomNum(range)
      const num2 = this._randomNum(range)
      var list = []
      if((num1 + num2) > 99){
        if (num1 > num2){
          list = [num1,'-',num2]
        }else{
          list = [num2,'-',num1]
        }
      }else{
        if (num1 > num2){
          if(this._randomNum(0,1) == 0){
            list = [num1,'+',num2]
          }else{
            list = [num1,'-',num2]
          }
        }else{
          if(this._randomNum(0,1) == 1){
            list = [num2,'+',num1]
          }else{
            list = [num2,'-',num1]
          }
        }
      }
      return list
    },
    _randomNum(minNum,maxNum){ 
      switch(arguments.length){ 
        case 1: 
          if(minNum == 0){
            return 0
          }
          return parseInt(Math.random()*minNum+1); 
        break; 
        case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum); 
        break; 
        default: 
          return 0; 
        break; 
      } 
    },


    print () {
      var target = document.getElementsByClassName("math-exam")[0];
      target.style.background = "#FFFFFF";

      html2canvas(target, {
        onrendered:function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;

        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                  pdf.addPage();
                }
            }
        }

        pdf.save("content.pdf");
    }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.math-exam{
  width:800px;
  height:auto;
  border: 1px solid #eee;
  margin:auto;
}
.line {
  display:inline-block;
  margin-right: 60px;
}
</style>
