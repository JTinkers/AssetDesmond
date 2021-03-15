<template>
    <div id='container'>
        <router-view/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const App = defineComponent({});

export default App;
</script>

<style lang='scss'>
    @import '@/assets/scss/defaults.scss';
</style>

<style lang='scss' scoped>
    #container {
        display: flex;
        min-height: 100vh;
    }
</style>