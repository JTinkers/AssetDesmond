<script lang='ts'>
import { defineComponent } from 'vue';
import { Line } from 'vue3-chart-v2';
import IStock from '@/services/stocks/interfaces/IStock';
import IStockHistory from '@/services/stocks/interfaces/IStockHistory';
import { format } from 'date-fns';

const y = 360;

const component = defineComponent({
    extends: Line,
    props: {
        stock: {
            type: Object as () => IStock
        }
    },
    data: () => ({
        chartData: {
            labels: undefined as any,
            datasets: [{
                data: undefined as any,
                lineTension: 1,
                cubicInterpolationMode: 'monotone',
                backgroundColor: undefined as CanvasGradient | undefined,
                borderColor: 'rgb(0, 105, 240)',
                borderWidth: 2,
                pointBorderColor: 'rgb(0, 105, 240)',
                pointBackgroundColor: 'rgb(0, 105, 240)',
                pointRadius: 0,
                pointHitRadius: 2
            }]
        },
        chartOptions: {
            animation: {
                duration: 1000
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 1)',
                cornerRadius: 3,
                displayColors: false,
                callbacks: {
                    label: (item: any) => '$' + item.value
                }
            },
            legend: {
                display: false
            },
            layout: {
                padding: {
                    top: 20
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        tickMarkLength: 0
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        tickMarkLength: 0
                    },
                    ticks: {
                        display: false
                    }
                }]
            },
            responsive: true
        }
    }),
    watch: {
        'stock.history': {
            handler(history: Array<IStockHistory>) {
                const start = Math.max(history.length - y, 0);

                this.chartData.datasets[0].data = history
                    .slice(start, history.length)
                    .map(x => x.price.toFixed(2));

                this.chartData.labels = history
                    .slice(start, history.length)
                    /*eslint-env node*/
                    .map(x => format(new Date(x.timestamp), 'HH:mm:ss'));

                this.state.chartObj?.update();
            },
            deep: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            const canvas = this.$refs.canvas as HTMLCanvasElement;
            const context = (canvas).getContext('2d');
            const gradient = context?.createLinearGradient(0, 0, 0, this.state.chartObj?.canvas?.height ?? 0);
            gradient?.addColorStop(0, 'rgba(0, 105, 240, 1)');
            gradient?.addColorStop(1, 'rgba(0, 200, 240, 1)');
            this.chartData.datasets[0].backgroundColor = gradient;
        });

        this.renderChart(this.chartData, this.chartOptions);
    }
});

export default component;
</script>