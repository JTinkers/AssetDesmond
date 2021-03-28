<template>
    <div id='nav'>
        <div id='symbols'>
            <div v-for='symbol in symbols' class='symbol' :key='symbol' @click='() => removeSymbol(symbol)'>
                <i class='fas fa-dollar-sign'/>
                <span v-text='symbol'/>
            </div>
            <div id='add-symbol' @click='addSymbol'>
                <i class='fas fa-plus'/>
            </div>
        </div>
        <div id='uptime'>
            <i class='far fa-clock'/>
            <span v-text='uptime'/>
        </div>
        <div id='provider'>
            <i class='fas fa-link'/>
            <span v-text='provider.name'/>
        </div>
        <div id='switches'>
            <i class='switch fas fa-grip-horizontal' @click='changeCompact'/>
            <i class='switch fas fa-adjust' @click='changeDarkMode'/>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ref } from 'vue';
import IDesmond from '@/services/desmond/interfaces/IDesmond';
import IAppConfig from '@/services/desmond/interfaces/IAppConfig';
import IStockProvider from '@/services/stocks/interfaces/IStockProvider';

export default defineComponent({
    setup() {
        const instance = getCurrentInstance();
        const desmond: IDesmond = instance?.appContext.config.globalProperties.$desmond;
        const config: IAppConfig | undefined = desmond.config;
        const provider: IStockProvider = instance?.appContext.config.globalProperties.$stockProvider;
        const symbols: string[] | undefined = config?.symbols;

        const currentTime = ref(new Date());
        setInterval(() => {
            currentTime.value = new Date();
        }, 1000);

        return {
            desmond,
            config,
            currentTime,
            provider,
            symbols
        };
    },
    methods: {
        addSymbol() {
            const symbol = window.prompt('Enter symbol:');

            this.config?.addSymbol(symbol!);

            location.reload();
        },
        removeSymbol(symbol: string) {
            const confirmed = window.confirm('Remove ' + symbol + ' from the list?');

            if(!confirmed)
                return;

            this.config?.removeSymbol(symbol);

            location.reload();
        },
        changeCompact() {
            this.config!.compact = !this.config?.compact;
        },
        changeDarkMode() {
            this.config!.darkMode = !this.config?.darkMode;
        }
    },
    computed: {
        uptime(): string {
            const diff = this.currentTime.getTime() - this.desmond.initializeTimestamp;

            const hh = Math.floor(diff / 3600000).toString().padStart(2, '0');
            const mm = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
            const ss = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

            return `${hh}:${mm}:${ss}`;
        }
    }
});
</script>

<style lang='scss' scoped>
#nav {
    display: flex;
    color: white;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
    font-size: 13px;
    justify-items: flex-start;
    padding: 8px;
    background: rgb(30, 30, 40);
}

#uptime {
    display: flex;
    border-radius: 5px;
    margin-right: 16px;
    overflow: hidden;
    background: rgb(255, 64, 64);

    i {
        padding: 4px;
        background: rgb(255, 25, 25);
    }

    span {
        padding: 4px;
    }
}

#provider {
    display: flex;
    border-radius: 5px;
    margin-right: 16px;
    overflow: hidden;
    background: rgb(143, 64, 255);

    i {
        padding: 4px;
        background: rgb(121, 25, 255);
    }

    span {
        padding: 4px;
    }
}

#symbols {
    display: flex;
    margin-right: auto;
}

.symbol {
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    background: rgb(255, 128, 64);
    margin-right: 4px;

    i {
        padding: 4px 8px;
        background: rgb(255, 102, 25);
    }

    span {
        padding: 4px;
    }
}

#add-symbol {
    display: flex;
    cursor: pointer;
    padding: 4px;
    border-radius: 5px;
    background: rgb(255, 128, 64);
}

#switches {
    display: flex;
    margin-right: -4px;
}

.switch {
    border-radius: 5px;
    padding: 4px;
    background: rgb(64, 175, 255);
    margin-right: 4px;

    &:hover {
        cursor: pointer;
    }
}
</style>