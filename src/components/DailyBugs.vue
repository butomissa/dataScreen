<template>
<div :id="id"/>
</template>

<script>
export default {
    props: { id: String },
    mounted() {
        this.draw()
    },
    methods: {
        draw() {
            this.chart = this.$echarts.init(document.getElementById(this.id), {renderer: 'svg'})
            let data = []
            for (let i = 0; i < this.originalData.length; i++) {
                let line = {
                    name: this.originalData[i].name,
                    type: "line",
                    smooth: 0,
                    data: this.originalData[i].data,
                    // color: this.color[i],
                    symbol: "circle",
                    symbolSize: 2,
                    itemStyle: {
                        normal: { color: this.color[i][1] },
                        emphasis: { color: this.color[i][1] },
                    },
                    lineStyle: {
                        normal: {
                            width: 3,
                            color: this.color[i][1] + ", 1)",
                            shadowBlur: 20,
                            shadowColor: this.color[i][1] + ", 1)",
                        },
                    },
                    areaStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[i][0] + ", 0)"
                            }, {
                                offset: 1, color: this.color[i][1] + ", 1)"
                            }], false),
                        }
                    },
                }
                data.push(line)
            }
            this.chart.setOption({
                grid: {
                    borderWidth: 0,
                    top: 30,
                    left: 40,
                    right: 20,
                    bottom: 30,
                },
                legend: {
                    selectedMode: false,
                    icon: "circle",
                    itemWidth: 12,
                    itemGap: 20,
                    top: -2,
                    right: 20,
                    textStyle: { color: "hsla(0, 100%, 100%, 0.6)" },
                    data: [ this.originalData[0].name, this.originalData[1].name ],
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: { lineStyle: { color: "hsla(0, 100%, 100%, 0.3)" }},
                },
                xAxis: {
                    type: "category",
                    data: this.list,
                    axisLine: { lineStyle: { color: "hsla(0, 100%, 100%, 0.3)" }},
                    axisTick: { show: false },
                    axisLabel: { textStyle: { color: "hsla(0, 100%, 100%, 0.6)" }},
                },
                yAxis: {
                    name: "数量(个)",
                    type: "value",
                    axisLine: { show: false },
                    nameTextStyle: { color: "hsla(0, 100%, 100%, 0.8)", align: "left" },
                    splitLine: { lineStyle: { color: "hsla(0, 100%, 100%, 0.2)" }},
                    axisLabel: { textStyle: { color: "hsla(0, 100%, 100%, 0.6)" }},
                },
                series: data,
            })
        },
    },
    data() {
        return {
            chart: null,
            list: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
            originalData: [
                { name: "上周", data: [ 120, 200, 150, 80, 70, 110, 130 ] },
                { name: "本周", data: [ 80, 50, 150, 180, 120, 110, 60 ] },
            ],
            color: [
                [ "hsla(274, 100%, 62%", "hsla(210, 92%, 60%" ],
                [ "hsla(10, 77%, 54%" , "hsla(37, 100%, 62%" ],
            ],
        }
    }
}
</script>