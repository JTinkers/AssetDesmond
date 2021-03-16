<template>
    <div id='grid' :class='{ compact: config.compact }'>
        <component :is='stockComponent' v-for='stock in stocks' :key='stock.symbol' :stock ='stock'/>
    </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance } from 'vue';
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

        return {
            desmond,
            provider
        };
    },
    computed: {
        config(): IAppConfig {
            return this.$desmond.config;
        },
        stockComponent(): any {
            return this.config.compact ? StockCompact : Stock;
        },
        stocks(): IStock[] {
            return this.provider.stocks;
        }
    }
});

export default view;
</script>

<style lang='scss' scoped>
#grid {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    padding: 16px;
    align-content: flex-start;
    width: 100vw;
    background: rgb(224, 227, 235);

    &.compact {
        grid-gap: 1px;
        padding: 0;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
</style>