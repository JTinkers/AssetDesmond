<template>
    <div v-show='!config.compact' id='grid' :class='{ compact: config.compact }'>
        <Stock v-for='stock in stocks' :key='stock.symbol' :stock ='stock'/>
    </div>
    <div v-show='config.compact' id='grid' :class='{ compact: config.compact }'>
        <StockCompact v-for='stock in stocks' :key='stock.symbol' :stock ='stock'/>
    </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, reactive } from 'vue';
import IStock from '@/services/stocks/interfaces/IStock';
import IStockProvider from '@/services/stocks/interfaces/IStockProvider';
import Stock from '@/components/Stock.vue';
import StockCompact from '@/components/StockCompact.vue';
import IDesmond from '@/services/desmond/interfaces/IDesmond';
import IAppConfig from '@/services/desmond/interfaces/IAppConfig';

const view = defineComponent({
    components: { Stock, StockCompact },
    setup() {
        const instance = getCurrentInstance();
        const provider: IStockProvider = instance?.appContext.config.globalProperties.$stockProvider;
        const desmond: IDesmond = instance?.appContext.config.globalProperties.$desmond;
        const config: IAppConfig | undefined = desmond.config;
        const stocks: IStock[] = reactive(provider.stocks);

        return {
            desmond,
            provider,
            config,
            stocks
        };
    }
});

export default view;
</script>

<style lang='scss' scoped>
#grid {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    align-items: flex-start;
    padding: 16px;
    width: 100vw;

    &.compact {
        grid-gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        padding: 8px;
    }
}
</style>