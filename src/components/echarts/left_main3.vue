<!--  -->
<template>
    <div class="left_main3">
        <div id="left_main3">
           
        </div>
        <div class="nyr">
                    <div :class="active == 1 ?'active':''" @click="initLeftMain3(1)">日</div>
                    <div :class="active == 2 ? 'active' : ''" @click="initLeftMain3(2)">月</div>
                    <div :class="active == 3 ? 'active' : ''" @click="initLeftMain3(3)">年</div>
               </div>
    </div>
    
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from 'echarts'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'ComponentName',
    //name必须是大驼峰规范,和文件名保持一致
    data() {
        //这里存放数据
        return {
            active:1,
             interval: '',
            option_leftmain3:{
            // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],

            grid: {
                top: '15%',
                    left: '0%',
                        right: '0%',
                            bottom: '8%',
                                containLabel: true
            },
             
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
                    axisLabel: {
                        color: '#9E9FA3',//坐标数值颜色,
                        fontSize: 11,
                        interval: 0
                    },
                    boundaryGap: true,
                    
                }
            ],
                yAxis: [
                    {
                        type: 'value',
                        // name: "单位℃",
                        nameGap: 10,//距离坐标轴距离
                        nameTextStyle: {
                            color: '#9E9FA3',
                            fontWeight: "bold",
                            fontSize: 12,
                            align: 'right'
                        },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'rgba(255,255,255,0.3)',
                            width:1,
                            type:'dashed'
                        }
                    },
                        axisLabel: {
                            color: '#9E9FA3',//坐标数值颜色,
                            fontSize: 15
                        }

                    },

                ],
                    visualMap: {
                type: 'piecewise',
                    show: false,
                        pieces: [{
                            gt: 1,
                            lt: 3,
                            color: 'skyblue'
                        }]
            },
            series: [
                {
                    name: 'Line 1',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,

                    lineStyle: {
                        color: '#B9DBAD',
                        width: 2,

                        type: 'solid'
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#B9DBAD'
                            },
                            {
                                offset: 1,
                                color: 'transparent'
                            }
                        ])
                    },
                    itemStyle: {

                        normal: {
                            color: '#FFD821',
                            borderColor: 'red',
                            //图形的描边颜色

                            borderWidth: 10
                        },

                    },
                    data: [21, 30, 35, 32, 40, 18, 42, 30, 35, 32, 40, 18,]
                },


            ],

            }
         
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        initLeftMain3(val) {
            //左边波浪图
           this.active=val
                  var leftMain3 = this.$echarts.init(
                    document.getElementById('left_main3')
                )
                
            this.$api.MMS.Home.GetWorkOrderTrendStatistics({
                type:val
            }).then((res) => {
                if(res.ok){
                let result=res.data
                 this.option_leftmain3.xAxis[0].data = result.xData
            this.option_leftmain3.series[0].data = result.yData
                }
                 leftMain3.clear()
                   leftMain3.setOption(this.option_leftmain3);
            })
           
            window.addEventListener('resize', () => {
                leftMain3.resize()
            })
          
                
          
            
        },
    },
    beforeCreate() { }, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    beforeMount() { }, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

        this.initLeftMain3(1)
      this.interval= setInterval(() => {
        if(this.active==1){
             this.initLeftMain3(1)
        }
       if (this.active == 2) {
                this.initLeftMain3(2)
            }
            if (this.active == 3) {
                this.initLeftMain3(3)
            }
       }, 10000);
    },
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { 
        clearInterval(this.interval)
    }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    deactivated() { }, //如果页面有keep-alive缓存功能，当组件移除时候，这个函数会触发
}
</script>
<style lang="scss">
@import '../index/css/indexLeft.scss';
</style>