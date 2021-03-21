<template>
    <div class='stock' :class='className'>
        <div class='header'>
            <span class='symbol' v-text='symbol'/>
            <span class='price' v-text='"$" + price.toFixed(2)'/>
        </div>
        <div class='footer'>
            <span class='name' v-text='name'/>
            <div class='change' :class='className'>
                <span class='fas' :class='{ "fa-caret-up": changePerc > 0, "fa-caret-down": changePerc < 0 }'/>
                <span v-text='`${((Math.abs(changePerc) || 0).toFixed(2))}%`'/>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Stock from '@/components/Stock.vue';

const component = defineComponent({
    props: Stock.props,
    watch: Stock.watch,
    setup: Stock.setup
});

export default component;
</script>

<style lang='scss' scoped>
.stock {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 5px;
    padding: 8px;

    .header {
        display: flex;

        .symbol {
            font-weight: 700;
            font-size: 20px;
            margin-left: -1px;
        }

        .price {
            margin-left: auto;
        }
    }

    .footer {
        display: flex;
        padding-top: 4px;
        align-items: flex-end;

        .name {
            font-size: 13px;
        }

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