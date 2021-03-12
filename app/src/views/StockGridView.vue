<template>
  <div>
    <span v-text='"Stock Count: "'/>
    <span v-text='stocks.length'/>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import IStock from '@/services/stocks/interfaces/IStock';

  const StockGridView = defineComponent({
    computed: {
      stocks(): IStock[] {
        return [];
      }
    }
  });

  export default StockGridView;
</script>