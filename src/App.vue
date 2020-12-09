<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
<script>
export default {
    created() {
        this.$axios.post('login', {
            id: 2002,
            password: 123
        }).then(res => {
            console.log(res.data)
        })
    }
}
</script>