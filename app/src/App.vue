<template>
    <div id='container'>
        <div id='view'>
            <router-view/>
        </div>
        <Nav/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Nav from '@/components/Nav.vue';

const App = defineComponent({
    components: { Nav }
});

export default App;
</script>

<style lang='scss'>
@import '@/assets/scss/defaults.scss';
</style>

<style lang='scss' scoped>
#container {
    display: flex;
    flex-direction: column;
    background: rgb(242, 242, 247);
    height: 100vh;
}

#view {
    display: flex;
    align-items: flex-start;
    flex-grow: 1;
    overflow-y: auto;
}
</style>