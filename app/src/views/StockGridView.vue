<template>
  <div id='grid'>
    <div v-for='stock in stocks' :key='stock.symbol' class='stock' :class='stock.changeClass'>
      <div class='header'>
        <span class='symbol' v-text='stock.symbol'/>
        <span class='price' :class='stock.changeClass' v-text='stock.price.toFixed(2)'/>
      </div>
      <div class='info'>
        <span class='name' v-text='stock.name'/>
        <span class='change' v-text='stock.change'/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { defineComponent, getCurrentInstance } from 'vue';
  import IStock from '@/services/stocks/interfaces/IStock';
  import IStockProvider from '@/services/stocks/interfaces/IStockProvider';

  const StockGridView = defineComponent({
    setup() {
      const instance = getCurrentInstance();
      const provider: IStockProvider = instance?.appContext.config.globalProperties.$stockProvider;

      return {
        provider
      };
    },
    computed: {
      stocks(): IStock[] {
        const stocks = this.provider.stocks;

        stocks.map(x => {
          const stock = x as any;
          stock.changeClass = x.price > x.openPrice ? 'positive' : 'negative';

          const change = x.price - x.openPrice;
          const changePerc = (change / x.openPrice) * 100;
          stock.change = change.toFixed(2) + ` (${(changePerc.toFixed(2))}%)`;

          return stock;
        });

        return stocks;
      }
    }
  });

  export default StockGridView;
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
  #grid {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    content: auto-fill;
    align-content: flex-start;
    width: 100vw;
    height: 100vh;
    background: rgb(247, 247, 250);
  }

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
        font-weight: 600;
      }

      .symbol {
        margin-left: -1px;
      }

      .price {
        margin-left: auto;

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

    .info {
      display: flex;
      padding-top: 4px;

      .name {
        font-size: 14px;
      }

      .change {
        margin-left: auto;
      }
    }
  }
</style>