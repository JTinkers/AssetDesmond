<template>
    <div class='stock' :class='className'>
        <div class='left'>
            <img v-if='logoSrc' class='logo' :src='logoSrc'/>
            <span class='symbol' v-text='symbol'/>      
        </div>
        <div class='middle'>
            <span class='price' v-text='"$" + price.toFixed(2)'/>
        </div>
        <div class='right' :class='className'>
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: white;
    border-radius: 5px;
    padding: 8px;
    border-bottom: 2px solid darken(rgb(242, 242, 247), 5%);
    font-size: 32px;

    .left {
        display: flex;
        align-items: center;

        .symbol {
            font-weight: 700;
        }

        .logo {
            width: 32px;
            height: 32px;
            margin-right: 8px;
            image-rendering: pixelated;
        }
    }

    .middle {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;

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