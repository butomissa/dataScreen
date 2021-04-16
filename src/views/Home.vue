<template>
<div id="home">
    <Pointwave :id="'pointwave'" ref="Pointwave"/>
    <div id="info">
        <div>
            <div id="main-title">{{ mainTitle }}</div>
            <div id="time">{{ cuttentTime }}</div>
        </div>
        <div id="selected">数据月份:<br/>
            <a-month-picker :default-value="moment(currentMonth)" v-model="currentMonth"
            :disabled-date="disabledMonth" @change="onChange">
                <span id="selected-month">
                    {{ dataMonth[0] }}<span>年</span>
                    {{ dataMonth[1] }}<span>月&nbsp;</span>
                    <span class="iconfont icon-arrow"></span>
                </span>
            </a-month-picker>
        </div>
    </div>
        <!-- 问题单数量 -->
        <div id="bugs-item" class="item">
            <div class="title">{{ title[1] }}</div>
            <Bugs :id="'bugs'" class="chart" ref="Bugs"/>
        </div>
        <!-- Bug 趋势 -->
        <div id="daily-bugs-item" class="item">
            <div class="title">{{ title[2] }}</div>
            <DailyBugs :id="'daily-bugs'" class="chart" ref="DailyBugs"/>
        </div>
        <!-- 用户反馈 -->
        <div id="word-cloud-item" class="item">
            <div class="title">{{ title[6] }}</div>
            <WordCloud :id="'word-cloud'" class="chart" ref="WordCloud"/>
        </div>
        <!-- map -->
        <Map :id="'map'" ref="Map"/>
        <!-- 每日发展 -->
        <div id="daily-develop-item" class="item">
            <div class="title">{{ title[3] }}</div>
            <DailyDevelop :id="'daily-develop'" class="chart" ref="DailyDevelop"/>
        </div>
        <!-- 本月数据 -->
        <div id="user-num-item" class="item">
            <div class="title">{{ title[0] }}</div>
            <div id="user-num">
                <div class="data-item" v-for="(item, index) of userNum" :key="'userNum' + index">
                    <div class="data-title">{{ item.title }}</div>
                    <div class="data-value">{{ formatNum(item.value) }}</div>
                </div>
                <div class="data-item">
                    <div class="data-title">{{ userPercentTitle }}</div>
                    <div class="data-value">
                        {{ getPercent(userNum[1].value, userNum[2].value) }}
                        <span class="data-unit">%</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- API 调用 -->
        <div id="month-apis-item" class="item">
            <div class="title">{{ title[4] }}</div>
            <div id="month-apis">
                <div class="data-item" v-for="(item, index) of monthApis" :key="'monthApis' + index">
                    <div class="data-title">{{ item.title }}</div>
                    <div class="data-value">{{ formatNum(item.value) }}</div>
                </div>
            </div>
        </div>
        <!-- API 分布 -->
        <div id="apis-item" class="item">
            <div class="title">{{ title[5] }}</div>
            <Apis :id="'apis'" class="chart" ref="Apis"/>
        </div>
    <img id="bg-img" :src="img">
</div>
</template>

<script>
import moment from "moment"
import "moment/locale/zh-cn"
import Pointwave from "@/components/Pointwave"
import Bugs from "@/components/Bugs"
import DailyBugs from "@/components/DailyBugs"
import Map from "@/components/Map"
import DailyDevelop from "@/components/DailyDevelop"
import Apis from "@/components/Apis"
import WordCloud from "@/components/WordCloud"
export default {
    name: "home",
    components: {
        Pointwave,
        Bugs, DailyBugs, Map, DailyDevelop, Apis, WordCloud,
    },
    created() {
        window.onresize = this.resize
        let t = new Date()
        this.cuttentTime = "数据更新时间: " + t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日 " +
            t.toLocaleTimeString()
        this.currentMonth = moment(t.toUTCString())
        this.onChange()
        // console.log(this.currentMonth);
    },
    methods: {
        moment,
        disabledMonth(current) {
            return current > moment().endOf("month")
        },
        onChange() {
            let t = new Date(this.currentMonth)
            this.dataMonth = []
            this.dataMonth.push(t.getFullYear())
            this.dataMonth.push((t.getMonth() + 1))
        },
        resize() {
            this.$refs.Pointwave.resize()
            this.$refs.Bugs.chart.resize()
            this.$refs.DailyBugs.chart.resize()
            this.$refs.Map.chart.resize()
            this.$refs.DailyDevelop.chart.resize()
            this.$refs.Apis.chart.resize()
            this.$refs.WordCloud.chart.resize()
        },
        formatNum(val) {
            return val ? Math.trunc(val).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') :"暂无数据"
        },
        getPercent(val0, val1) {
            return (val0 / val1 * 100).toFixed(2)
        }
    },
    data() {
        return {
            mainTitle: "dataScreen",
            cuttentTime: "",
            currentMonth: "",
            dataMonth: [],
            img: require("@/assets/bg.jpg"),
            title: [ "本月数据", "问题单数量", "Bug 趋势", "每日发展", "API 调用", "API 分布", "用户反馈" ],
            userNum: [
                { title: "注册用户 (个)", value: 1999999 },
                { title: "订购用户 (个)", value: 142857 },
                { title: "有效用户 (个)", value: 666999 },
            ],
            userPercentTitle: "转化率",
            monthApis: [
                { title: "访问量 (次)", value: 34567 },
                { title: "推送量 (次)", value: 1024 },
            ],
        }
    },
}
</script>

<style scoped>
#home {
    position: relative;
    height: 100vh;
    min-height: 800px;
    width: 100vw;
    min-width: 1200px;
    /* background: hsla(200, 60%, 12%, 1); */
}
#info {
    position: absolute;
    display: flex;
    align-items: center;
    margin: 2% auto auto 3%;
}
#main-title {
    font-size: 38px;
    font-weight: 800;
    color: hsla(0, 100%, 100%, 1);
}
#time {
    color: hsla(0, 100%, 100%, 0.4);
}
#selected {
    padding: 10px 12px;
    margin: auto auto auto 20px;
    white-space: nowrap;
    color: hsla(0, 100%, 100%, 0.4);
    background: radial-gradient( at 0% 0%, hsla(199, 100%, 16%, 0.2) 5%, hsla(199, 100%, 12%, 0.05) 30%, hsla(199, 100%, 16%, 0.2) 100%);
    border: 1px solid hsla(199, 100%, 16%, 0.1);
    box-shadow: 0 0 4px 0px hsla(199, 100%, 0%, 0.8), 2px 2px 20px 0px hsla(199, 100%, 0%, 0.6);
    z-index: 999;
}
#selected-month {
    cursor: pointer;
    font-family: "DIN";
    font-size: 22px;
    font-weight: 800;
    color: transparent;
    background: linear-gradient(to right, hsla(210, 92%, 60%, 1), hsla(274, 100%, 62%, 1));
    background-clip: text;
    transition: all ease, 0.3s; /* 看起来只有Edge会有动画效果 */
}
#selected-month:hover {
    background: linear-gradient(to right, hsla(37, 100%, 62%, 1), hsla(10, 77%, 54%, 1));
    background-clip: text;
}
#pointwave {
    opacity: 0.4;
}
.title {
    padding: 0 10px;
    height: 30px;
    font-size: 16px;
    color: hsla(0, 100%, 100%, 1);
}
.item {
    position: absolute;
    padding: 10px;
    background: radial-gradient( at 0% 0%, hsla(199, 100%, 16%, 0.2) 5%, hsla(199, 100%, 12%, 0.05) 30%, hsla(199, 100%, 16%, 0.2) 100%);
    border: 1px solid hsla(199, 100%, 16%, 0.1);
    box-shadow: 0 0 4px 0px hsla(199, 100%, 0%, 0.8), 2px 2px 20px 0px hsla(199, 100%, 0%, 0.6);
}
.chart {
    height: calc(100% - 30px);
    width: 100%;
}
.data-item {
    margin: 5px auto 5px auto;
    padding: 0 0 0 10px;
    width: 50%;
    z-index: 999;
    cursor: default;
}
.data-item:hover > .data-value {
    background: linear-gradient(to right, hsla(37, 100%, 62%, 1), hsla(10, 77%, 54%, 1));
    background-clip: text;
}
.data-title {
    color: hsla(0, 100%, 100%, 0.4);
}
.data-value {
    font-family: "DIN";
    font-size: 28px;
    color: transparent;
    background: linear-gradient(to right, hsla(210, 92%, 60%, 1), hsla(274, 100%, 62%, 1));
    background-clip: text;
    transition: all ease, 0.3s; /* 看起来只有Edge会有动画效果 */
}
.data-unit {
    margin: auto auto auto -6px;
    font-family: "DIN";
    font-size: 20px;
    color: transparent;
}

#bugs-item {
    height: 25%;
    width: 25%;
    left: 30px;
    bottom: calc(50% + 50px);
}
#daily-bugs-item {
    height: 25%;
    width: 25%;
    left: 30px;
    bottom: calc(25% + 40px);
}
#word-cloud-item {
    height: 25%;
    width: 25%;
    left: 30px;
    bottom: 30px;
}

#map {
    position: absolute;
    height: calc(73% - 60px);
    width: calc(50% - 60px);
    top: 30px;
    left: calc(25% + 30px);
    /* border: 1px solid hsla(0, 100%, 100%, 1); */
}
#daily-develop-item {
    height: 27%;
    width: calc(75% - 70px);
    right: 30px;
    bottom: 30px;
}


#user-num-item {
    width: 25%;
    top: 30px;
    right: 30px;
}
#user-num {
    display: flex;
    flex-wrap: wrap;
}
#month-apis-item {
    width: 25%;
    top: 238px;
    right: 30px;
}
#month-apis {
    display: flex;
    flex-wrap: wrap;
}
#apis-item {
    height: calc(73% - 413px);
    width: 25%;
    top: 373px;
    right: 30px;
}

#bg-img {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: 0.25;
    z-index: -2;
}
</style>