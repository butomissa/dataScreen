<template>
<div id="app">
    <router-view/>
</div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@font-face {
    font-family: "DIN";
    src: url("./assets/DIN-Bold.otf");
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
    font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
    text-decoration: none;
    /* color: hsla(0, 0%, 100%, 1); */
}
::-webkit-scrollbar-track-piece,
::-webkit-scrollbar-corner {
    background: transparent;
}
::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}
::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.4);
    border-radius: 6px;
}
</style>
