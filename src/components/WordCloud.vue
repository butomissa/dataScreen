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
            this.chart = this.$echarts.init(document.getElementById(this.id), {renderer: "svg"})
            this.chart.setOption({
                // grid: {
                //     borderWidth: 0,
                //     top: 10,
                //     left: 10,
                //     right: 10,
                //     bottom: 10,
                // },
                tooltip: {},
                series: [{
                    type: "wordCloud",
                    top: "center",
                    left: "center",
                    right: null,
                    bottom: null,
                    height: "80%",
                    width: "80%",
                    sizeRange: [14, 26],
                    rotationRange: [-45, 45],
                    rotationStep: 90,
                    gridSize: 0,
                    // shape: "rect",
                    textStyle: {
                        normal: {
                            color: this.randomColor,
                            fontWeight: 400,
                        },
                        emphasis: {
                            color: this.color[this.color.length - 1],
                            fontWeight: 800,
                        }
                    },
                    data: [
                        { name: "智慧交通产品", value: "213" },
                        { name: "电动车安全充电", value: "435" },
                        { name: "两轮车智能联网", value: "132" },
                        { name: "车载定位", value: "324" },
                        { name: "主动安全驾驶监控", value: "792" },
                        { name: "产品 0", value: "67" },
                        { name: "智慧园区产品", value: "213" },
                        { name: "智能烟感", value: "255" },
                        { name: "产品 21", value: "214" },
                        { name: "产品 1", value: "2155" },
                        { name: "产品", value: "544" },
                        { name: "村村通喇叭", value: "87" },
                        { name: "公网对讲", value: "232" },
                        { name: "智慧电梯", value: "876" },
                        { name: "智能灯杆", value: "242" },
                        { name: "智能连接产品", value: "213" },
                        { name: "智能", value: "213" },
                        { name: "连接", value: "312" },
                        { name: "产品 2", value: "218" },
                        { name: "连接产品", value: "524" },
                        { name: "智能连接", value: "721" },
                        { name: "智能连接产品 5", value: "674" },
                        { name: "智能连接产品 6", value: "128" },
                        { name: "智能连接产品 7", value: "357" },
                        { name: "智能连接产品 8", value: "453" },
                        { name: "智能连接产品 9", value: "1287" },
                        { name: "智能连接产品 10", value: "42" },
                    ],
                }],
            })
            // console.log(this.color[Math.floor(Math.random() * 6)]);
        },
        randomColor() {
            return this.color[Math.floor(Math.random() * (this.color.length - 1))]
        },
    },
    data() {
        return {
            chart: null,
            color: [ "hsl(274, 80%, 62%)", "hsl(210, 92%, 60%)", "hsl(210, 92%, 60%)",
                "hsl(210, 92%, 60%)", "hsl(17, 100%, 62%)", "hsl(37, 100%, 62%)" ],
        }
    }
}
</script>