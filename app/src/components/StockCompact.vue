<template>
    <div class='stock' :class='className'>
        <div class='header'>
            <span class='symbol' v-text='symbol'/>
            <span class='price' v-text='"$" + price.toFixed(2)'/>
        </div>
        <div class='info'>
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
    min-width: 300px;
    background: rgb(255, 255, 255);
    padding: 8px;

    &.positive {
      animation: flash-positive 1s linear;
    }

    &.negative {
      animation: flash-negative 1s linear;
    }

    .header {
      display: flex;

      .symbol, .price {
        font-size: 32px;
      }

      .symbol {
        font-weight: 600;
        margin-left: -1px;
      }

      .price {
        margin-left: auto;
      }
    }

    .info {
      display: flex;
      padding-top: 4px;

      .name {
        font-size: 14px;
      }

      .change {
        margin-left: auto;
        font-weight: 600;

        > .fas {
          margin-right: 4px;
        }

        &.positive {
          transition: all 1s;
          color: rgb(0, 105, 240);
        }

        &.negative {
          transition: all 1s;
          color: rgb(245, 0, 120);
        }
      }
    }
  }
</style>