import IAppConfig from './services/desmond/interfaces/IAppConfig';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $desmond: IDesmond;
    }
}