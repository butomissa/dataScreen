<template>
<div :id="id"/>
</template>

<script>
import guangdong from "@/assets/guangdong"
export default {
    props: { id: String },
    mounted() {
        this.$echarts.registerMap("guangdong", guangdong)
        this.draw()
    },
    methods: {
        draw() {
            this.chart = this.$echarts.init(document.getElementById(this.id), {renderer: "svg"})
            let data = guangdong.features.map((item) => {
                return {
                    value: (Math.random() * 50 + 50).toFixed(0),
                    name: item.properties.name,
                }
            })
            this.chart.setOption({
                visualMap: {
                    show: false,
                    type: "continuous",
                    min: 50,
                    max: 100,
                    range: [50, 100],
                    inRange: {
                        color: [ "hsla(199, 100%, 2%, 1)", "hsla(199, 100%, 4%, 1)", "hsla(199, 100%, 6%, 1)",
                            "hsla(199, 100%, 8%, 1)", "hsla(199, 100%, 10%, 1)" ],
                    }
                },
                tooltip: {},
                geo: {
                    map: "guangdong",
                    show: true,
                    roam: false,
                    label: { emphasis: { show: false }},
                    zoom: 1.1,
                    itemStyle: {
                        normal: {
                            areaColor: "transparent",
                            borderColor: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[0][0] + ", 0.8)"
                            }, {
                                offset: 1, color: this.color[0][1] + ", 1)"
                            }], false),
                            borderWidth: 4,
                            shadowColor: this.color[0][1] + ", 0.5)",
                            shadowBlur: 40,
                            shadowOffsetY: 20,
                        }
                    }
                },
                series: [{
                    tooltip: { trigger: "item" },
                    name: "广东省",
                    type: "map",
                    map: "guangdong",
                    showLegendSymbol: false,
                    label: { emphasis: { show: false }},
                    zoom: 1.1,
                    itemStyle: {
                        normal: {
                            borderColor: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[0][0] + ", 0.3)"
                            }, {
                                offset: 1, color: this.color[0][1] + ", 0.3)"
                            }], false),
                            borderWidth: 1,
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[1][0] + ", 0.3)"
                            }, {
                                offset: 1, color: this.color[1][1] + ", 0.3)"
                            }], false),
                            borderColor: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0, color: this.color[1][0] + ", 0.8)"
                            }, {
                                offset: 1, color: this.color[1][1] + ", 1)"
                            }], false),
                            borderWidth: 4,
                            shadowColor: this.color[1][1] + ", 0.7)",
                            shadowOffsetX: 4,
                            shadowOffsetY: 10,
                            shadowBlur: 20,
                        }
                    },
                    data: data,
                }],
            })
        },
        randomColor() {
            return 
        }
    },
    data() {
        return {
            chart: null,
            color: [
                [ "hsla(274, 100%, 62%", "hsla(210, 92%, 60%" ],
                [ "hsla(10, 77%, 54%" , "hsla(37, 100%, 62%" ],
            ],
        }
    }
}
</script>