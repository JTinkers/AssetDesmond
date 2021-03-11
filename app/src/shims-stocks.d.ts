import IStockProvider from './services/stocks/interfaces/IStockProvider';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $stockProvider: IStockProvider;
  }
}