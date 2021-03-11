import { Store, createStore } from 'vuex'

declare interface RootState 
{
    _: undefined;
}

const store: Store<RootState> = createStore({})

export default store