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
            for (let i = 0; i < this.list.length; i++) {
                let x = i % this.color.length
                let line = {
                    name: this.list[i],
                    value: this.originalData[i],
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[x][0] + ", 0)"
                            }, {
                                offset: 0.2, color: this.color[x][0] + ", 0.16)"
                            }, {
                                offset: 0.7, color: this.color[x][1] + ", 0.4)"
                            }], false),
                            barBorderRadius: [999, 999, 0, 0],
                            borderWidth: 3,
                            borderColor: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[x][0] + ", 0)"
                            }, {
                                offset: 0.2, color: this.color[x][0] + ", 0.4)"
                            }, {
                                offset: 0.7, color: this.color[x][1] + ", 1)"
                            }], false),
                            shadowBlur: 20,
                            shadowColor: this.color[x][1] + ", 1)",
                        },
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
                tooltip: {
                    // trigger: "axis",
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
                series: {
                    type: "bar",
                    barWidth: "50%",
                    data: data,
                },
                // animationEasing: "cubicOut",
            })
        },
    },
    data() {
        return {
            chart: null,
            list: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
            originalData: [ 120, 200, 150, 80, 70, 110, 130 ],
            color: [
                [ "hsla(274, 100%, 62%", "hsla(210, 92%, 60%" ],
                [ "hsla(10, 77%, 54%" , "hsla(37, 100%, 62%" ],
            ],
            // emphasisColor: [ "hsla(10, 77%, 54%" , "hsla(37, 100%, 62%" ],
        }
    }
}
</script>