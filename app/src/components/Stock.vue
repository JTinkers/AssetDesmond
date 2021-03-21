<template>
    <div class='stock'>
        <div class='header'>
            <span class='symbol' v-text='symbol'/>
            <span class='name' v-text='name'/>
        </div>
        <div class='body'>
            <div class='chart'>
                <StockChart :stock='stock'/>
            </div>
        </div>
        <div class='footer'>
            <span v-text='"$" + price.toFixed(2)'/>
            <div class='change' :class='className'>
                <span class='fas' :class='{ "fa-caret-up": changePerc > 0, "fa-caret-down": changePerc < 0 }'/>
                <span v-text='Math.abs(change).toFixed(2) + ` (${((Math.abs(changePerc) || 0).toFixed(2))}%)`'/>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import IStock from '@/services/stocks/interfaces/IStock';
import StockChart from '@/components/StockChart.vue';

const component = defineComponent({
    components: {
        StockChart
    },
    setup(props) {
        return props.stock;
    },
    props: {
        stock: {
            type: Object as () => IStock
        }
    },
    watch: {
        stock: {
            handler() {
                const stock = this.stock as any;
                stock.className = stock.price > stock.close ? 'positive' : 'negative';

                stock.change = stock.price - stock.close;
                stock.changePerc = (stock.change / stock.close) * 100;
            },
            deep: true,
            immediate: true
        }
    }
});

export default component;
</script>

<style lang='scss' scoped>
.stock {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: white;
    border-radius: 5px;

    .header {
        display: flex;
        flex-direction: column;

        .symbol {
            font-weight: 700;
            font-size: 28px;
            margin-left: -1px;
        }

        .name {
            padding: 8px 0;
            font-size: 13px;
        }
    }

    .body {
        .chart {
            background: rgb(245, 245, 250);
        }
    }

    .footer {
        display: flex;
        padding-top: 16px;
        font-weight: 700;

        .change {
            margin-left: auto;

            &.positive {
                transition: all 1s;
                color: rgb(0, 105, 240);
            }

            &.negative {
                transition: all 1s;
                color: rgb(245, 0, 120);
            }

            .fas {
                margin-right: 4px;
            }
        }
    }
}
</style>