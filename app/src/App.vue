<template>
    <div id='container' :class='{"theme-dark": config.darkMode}'>
        <div id='view'>
            <router-view/>
        </div>
        <Nav/>
    </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance } from 'vue';
import Nav from '@/components/Nav.vue';
import IDesmond from './services/desmond/interfaces/IDesmond';
import IAppConfig from './services/desmond/interfaces/IAppConfig';

const App = defineComponent({
    components: { Nav },
    setup() {
        const instance = getCurrentInstance();
        const desmond: IDesmond = instance?.appContext.config.globalProperties.$desmond;
        const config: IAppConfig | undefined = desmond.config;

        return {
            desmond,
            config
        };
    }
});

export default App;
</script>

<style lang='scss'>
@import '@/assets/scss/defaults.scss';
</style>

<style lang='scss'>
#container.theme-dark {
    @import '@/assets/scss/theme-dark.scss';
}

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