<template>
    <div class='stock'>
        <div class='header'>
            <img v-if='logoSrc' class='logo' :src='logoSrc'/>
            <span class='symbol' v-text='symbol'/>
            <div class='change' :class='className'>
                <span class='fas' :class='{ "fa-caret-up": changePerc > 0, "fa-caret-down": changePerc < 0 }'/>
                <span v-text='Math.abs(change).toFixed(2) + ` (${((Math.abs(changePerc) || 0).toFixed(2))}%)`'/>
            </div>
        </div>
        <div class='body'>
            <div class='chart'>
                <StockChart :stock='stock'/>
            </div>
        </div>
        <div class='footer'>
            <div class='info'>
                <span class='name' v-text='name'/>
                <span class='value' v-text='"$" + price.toFixed(2)'/>
            </div>
            <div class='stats'>
                <span v-text='"Open: "'/>
                <span v-text='"$" + open' class='value'/>
                <span v-text='"Close: "'/>
                <span v-text='"$" + close' class='value'/>
                <span v-text='"Low: "'/>
                <span v-text='"$" + low' class='value'/>
                <span v-text='"High: "'/>
                <span v-text='"$" + high' class='value'/>
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
    background: white;
    border-radius: 5px;
    border-bottom: 2px solid darken(rgb(242, 242, 247), 5%);

    .header {
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 16px;

        .logo {
            width: 20px;
            height: 20px;
            margin-right: 4px;
            image-rendering: pixelated;
        }

        .symbol {
            font-weight: 700;
        }

        .change {
            margin-left: auto;
            align-self: flex-start;

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

    .body {
        .chart {
            background: rgb(245, 245, 250);
        }
    }

    .footer {
        display: flex;
        flex-direction: column;
        padding: 16px;
        font-size: 13px;

        .info {
            display: flex;
            font-weight: 700;

            .value {
                margin-left: auto;
            }
        }

        .stats {
            display: grid;
            grid-column-gap: 32px;
            grid-row-gap: 8px;
            grid-template-columns: repeat(4, 1fr);
            margin-top: 8px;

            .value {
                margin-left: auto;
            }
        }
    }
}
</style>