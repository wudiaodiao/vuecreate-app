<template>
  <div class="page">
    <table class="filtertable">
      <tr>
        <td class="title2">月份：</td>
        <td>
          <el-date-picker v-model="filter.month" type="month" value-format="yyyy-MM" :clearable="false" style="width:140px" />
        </td>
        <td class="title2">区域：</td>
        <td>
          <el-cascader v-model="filter.areaIds" :options="filter.areas" :props="{ checkStrictly: true }"></el-cascader>
        </td>
        <td>
          <a href="javascript:void(0)" class="button" @click="onQueryClick()">查询</a>
        </td>
      </tr>
    </table>
    <table class="filtertable">
      <tr>
        <td><strong>1. 同比环比分析</strong></td>
      </tr>
    </table>
    <div id="chartRatio" class="chart"></div>
    <table class="filtertable">
      <tr>
        <td><strong>2. 本月热量趋势</strong></td>
      </tr>
    </table>
    <div id="chartDay" class="chart"></div>
    <div>
      <p style="margin:0 30px;">结论：{{conclusion}}</p>
    </div>
    <table class="filtertable">
      <tr>
        <td><strong>3. 当月热量明细</strong></td>
        <td class="tool">
          <a :href="exportUrl" v-if="exportUrl" target="_blank" class="toolbutton">导出</a>
        </td>
      </tr>
    </table>
    <el-table :data="list" :row-class-name="onRowClassName">
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{ $Convert.getDate(scope.row.day) }}
        </template>
      </el-table-column>
      <el-table-column prop="value" label="用量" />
    </el-table>
  </div>
</template>
<script>
import DateTime from '../../../js/datetime'

export default {
  data() {
    return {
      list: [],
      conclusion: '',
      exportUrl: '',
      filter: {
        month: '',
        areas: [],
        areaIds: [],
      },
      optionRatio: {
        title: [{
          textStyle: {
            color: 'white'
          },
          left: '10%'
        },{
          textStyle: {
            color: 'white'
          },
          left: '55%'
        }],
        tooltip: {
            trigger: 'axis',
            borderColor: '#0b5980',
            backgroundColor: '#0b5980',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                color: '#ccd0d8'
            }
        },
        grid: [{
            left: '10%',
            width: '35%',
            bottom: '3%',
            containLabel: true
        }, {
            left: '55%',
            width: '35%',
            bottom: '3%',
            containLabel: true
        }],
        xAxis: [{
            type: 'category',
            axisLabel: {
                show: true,
                color: "#ccc"
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4d5b77',
                    width: 2,
                    type: 'solid'
                }
            },
            gridIndex: 0
        },
        {
            type: 'category',
            axisLabel: {
                show: true,
                color: "#ccc"
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4d5b77',
                    width: 2,
                    type: 'solid'
                }
            },
            gridIndex: 1
        }],
        yAxis: [{
            type: 'value',
            name: '吨',
            nameTextStyle: {
                color: "#ccc"
            },
            axisLabel: {
                show: true,
                color: "#ccc"
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(204, 204, 204, 0.2)',
                    width: 1,
                    type: 'solid'
                }
            },
            gridIndex: 0
        },
        {
            type: 'value',
            name: '吨',
            nameTextStyle: {
                color: "#ccc"
            },
            axisLabel: {
                show: true,
                color: "#ccc"
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(204, 204, 204, 0.2)',
                    width: 1,
                    type: 'solid'
                }
            },
            gridIndex: 1
        }],
        series: [{
          type: 'bar',
          itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgb(19,174,255)' },
                  { offset: 1, color: 'rgba(19,174,255,0.05)' }
              ])
          },
          label: {
            show: true
          },
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          type: 'bar',
          itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgb(19,174,255)' },
                  { offset: 1, color: 'rgba(19,174,255,0.05)' }
              ])
          },
          label: {
            show: true
          },
          xAxisIndex: 1,
          yAxisIndex: 1
        }]
      },
      optionDay: {
        tooltip: {
            trigger: 'axis',
            borderColor: '#0b5980',
            backgroundColor: '#0b5980',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                color: '#ccd0d8'
            }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
              show: true,
              color: "#ccc"
          },
          axisLine: {
              show: true,
              lineStyle: {
                  color: '#4d5b77',
                  width: 2,
                  type: 'solid'
              }
          }
        },
        yAxis: {
          type: 'value',
          name: '吨',
          nameTextStyle: {
              color: "#ccc"
          },
          axisLabel: {
              show: true,
              color: "#ccc"
          },
          splitLine: {
              show: true,
              lineStyle: {
                  color: 'rgba(204, 204, 204, 0.2)',
                  width: 1,
                  type: 'solid'
              }
          }
        },
        series: [{
          type: 'line',
          symbol: 'emptyCircle',
          symbolSize: 10,
          areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgb(19,174,255)' },
                  { offset: 1, color: 'rgba(19,174,255,0.05)' }
              ])
          },
          itemStyle: {
              color: 'rgb(19,174,255)',
          }
        }]
      },
      chartRatio: null,
      chartDay: null
    }
  },
  created() {},
  mounted() {
    this.filter.month = DateTime.thisMonth().format("yyyy-MM");
    this.queryArea();
    this.chartRatio = this.$echarts.init(document.getElementById('chartRatio'));
    this.chartRatio.setOption(this.optionRatio);
    this.chartDay = this.$echarts.init(document.getElementById('chartDay'));
    this.chartDay.setOption(this.optionDay);
  },
  destroyed() {},
  computed: {},
  methods: {
    onQueryClick() {
      if (!this.filter.month) {
          this.$Tools.LayerMsgErr('请选择月份')
          return;
      }
      if (this.filter.areaIds.length == 0) {
          this.$Tools.LayerMsgErr('请选择区域')
          return;
      }
      this.queryData();
    },
    queryArea() {
      this.$api.MMS.Area.GetAllList().then(res => {
        var options = [];
        this.getAreaOption(options, res.data);
        this.filter.areas = options;
        if (this.filter.areas.length > 0) {
          this.filter.areaIds = [ this.filter.areas[0].value ];
          this.queryData();
        }
      });
    },
    queryData() {
      this.queryRatioChart();
      this.queryDayReport();
    },
    queryRatioChart() {
      this.$api.MMS.EnergyReportDay.GetAreaRatioReport({
        month: this.filter.month,
        areaId: this.filter.areaIds[this.filter.areaIds.length - 1],
        type: 4 
      }).then(res => {
        this.optionRatio.title[0].text = res.data.yoyTitle;
        this.optionRatio.xAxis[0].data = res.data.yoy.categories;
        this.optionRatio.series[0].data = res.data.yoy.values;
        this.optionRatio.title[1].text = res.data.momTitle;
        this.optionRatio.xAxis[1].data = res.data.mom.categories;
        this.optionRatio.series[1].data = res.data.mom.values;
        this.chartRatio.setOption(this.optionRatio);
      });
    },
    queryDayReport() {
      this.$api.MMS.EnergyReportDay.GetAreaDetailReport({
        month: this.filter.month,
        areaId: this.filter.areaIds[this.filter.areaIds.length - 1],
        type: 4,
        unit: '吨'
      }).then(res => {
        this.optionDay.xAxis.data = res.data.chart.categories;
        this.optionDay.series[0].data = res.data.chart.values;
        this.chartDay.setOption(this.optionDay);
        this.conclusion = res.data.conclusion;
        this.list = res.data.list;
        if (this.list.length == 0)
          this.exportUrl = '';
        else
          this.exportUrl = this.$api.MMS.EnergyReportDay.GetExportAreaReportUrl({
            month: this.filter.month,
            areaId: this.filter.areaIds[this.filter.areaIds.length - 1],
            type: 4
          });
      });
    },
    getAreaOption(options, data) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let option = {
          label: item.model.name,
          value: item.model.id,
          children: []
        };
        options.push(option);
        this.getAreaOption(option.children, item.children);
      }
    },
    onRowClassName({ row, rowIndex }) {
      return rowIndex % 2 == 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>
