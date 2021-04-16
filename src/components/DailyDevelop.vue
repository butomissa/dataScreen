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
            let series = []
            let data = []
            for (let i = 0; i < this.originalData.length; i++) {
                data = []
                for (let j = 0; j < this.originalData[i].data.length; j++) {
                    let item = {
                        value: this.originalData[i].data[j],
                        itemStyle: {
                            normal: {
                                show: true,
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0, color: this.color[i][0] + ", 0)"
                                }, {
                                    offset: 0.2, color: this.color[i][0] + ", 0.16)"
                                }, {
                                    offset: 0.7, color: this.color[i][1] + ", 0.4)"
                                }], false),
                                barBorderRadius: [999, 999, 0, 0],
                                borderWidth: 3,
                                borderColor: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0, color: this.color[i][0] + ", 0)"
                                }, {
                                    offset: 0.2, color: this.color[i][0] + ", 0.4)"
                                }, {
                                    offset: 0.7, color: this.color[i][1] + ", 1)"
                                }], false),
                                shadowBlur: 20,
                                shadowColor: this.color[i][1] + ", 1)",
                            },
                        },
                    }
                    data.push(item)
                }
                let line = {
                    name: this.originalData[i].name,
                    barWidth: "20%",
                    color: this.color[i][1],
                    type: "bar",
                    data: data,
                }
                series.push(line)
            }
            // console.log(series);
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
                    data: [ this.originalData[0].name, this.originalData[1].name, this.originalData[2].name ],
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: { lineStyle: { width: "0" }},
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
                series: series,
            })
        },
    },
    data() {
        return {
            chart: null,
            list: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
            originalData: [
                { name: "Bar #0", data: [ 120, 200, 150, 80, 70, 110, 130 ] },
                { name: "Bar #1", data: [ 50, 120, 270, 100, 40, 140, 170 ] },
                { name: "Bar #2", data: [ 100, 80, 160, 110, 30, 50, 80 ] },
            ],
            color: [
                [ "hsla(274, 100%, 62%", "hsla(210, 92%, 60%" ],
                [ "hsla(10, 77%, 54%" , "hsla(37, 100%, 62%" ],
                [ "hsla(334, 82%, 57%" , "hsla(17, 100%, 62%" ],
            ],
        }
    }
}
</script>