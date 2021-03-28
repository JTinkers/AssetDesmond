<script lang='ts'>
import { defineComponent } from 'vue';
import { Line } from 'vue3-chart-v2';
import IStock from '@/services/stocks/interfaces/IStock';
import IStockChartPoint from '@/services/stocks/interfaces/IStockChartPoint';
import IAppConfig from '@/services/desmond/interfaces/IAppConfig';

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
                lineTension: 0,
                cubicInterpolationMode: 'monotone',
                backgroundColor: 'rgba(0, 105, 240, 0.2)',
                borderColor: 'rgb(0, 105, 240)',
                borderWidth: 2,
                pointBorderColor: 'rgb(0, 105, 240)',
                pointBackgroundColor: 'rgb(0, 105, 240)',
                pointRadius: 0,
                pointHitRadius: 0
            }]
        },
        chartOptions: {
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
        'stock.chartData': {
            handler(chartData: Array<IStockChartPoint>) {
                const start = Math.max(chartData.length - this.config.maxChartYTicks, 0);

                const data = chartData
                    .slice(start, chartData.length)
                    .map(point => point.x.toFixed(2));

                const labels = chartData
                    .slice(start, chartData.length)
                    .map(point => point.y);

                this.chartData.datasets[0].data = data;
                this.chartData.labels = labels;

                this.state.chartObj?.update();
            },
            deep: true
        }
    },
    computed: {
        config(): IAppConfig {
            return this.$desmond.config;
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    }
});

export default component;
</script>