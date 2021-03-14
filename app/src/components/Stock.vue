<template>
    <Card class='stock'>
        <template #title>
            <span class='symbol' v-text='symbol'/>
        </template>
        <template #subtitle>
            <span class='name' v-text='name'/>
        </template>
        <template #content>
            <div class='chart'>
                <StockChart :stock='stock'/>
            </div>
        </template>
        <template #footer>
            <div class='info'>
                <span class='price' v-text='"$" + price.toFixed(2)'/>
                <div class='change' :class='className'>
                    <span class='fas' :class='{ "fa-caret-up": changePerc > 0, "fa-caret-down": changePerc < 0 }'/>
                    <span v-text='Math.abs(change).toFixed(2) + ` (${((Math.abs(changePerc) || 0).toFixed(2))}%)`'/>
                </div>
            </div>
        </template>
    </Card>
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
                    stock.className = stock.price > stock.openPrice ? 'positive' : 'negative';
    
                    stock.change = stock.price - stock.openPrice;
                    stock.changePerc = (stock.change / stock.openPrice) * 100;
                },
                deep: true,
                immediate: true
            }
        }
    });

    export default component;
</script>

<style lang='scss'>
    @keyframes flash-positive {  
        from { background: rgba(0, 105, 240, 0.25); }
        to { background: default; }
    }

    @keyframes flash-negative {  
        from { background: rgba(245, 0, 120, 0.25); }
        to { background: default; }
    } 
</style>

<style lang='scss' scoped>
    ::v-deep(.p-card-content) {
        padding: 0;
    }

    ::v-deep(.p-card-body) {
        font-family: 'Quicksand', sans-serif;
    }

    .chart {
        background: rgb(250, 250, 255);
    }

    .info {
        display: flex;
        font-weight: 600;

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
</style>