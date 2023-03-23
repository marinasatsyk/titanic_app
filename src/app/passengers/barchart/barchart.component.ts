import {
    Component,
    ViewChild,
    Input,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    ChartConfiguration,
    ChartData,
    ChartEvent,
    ChartType,
    ChartOptions,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
    selector: 'barchartComponent',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    @Input() labels: string[];
    @Input() data1: number[] = [];
    @Input() data2: number[] = [];
    @Input() data3: number[] = [];
    @Input() label1: string = "";
    @Input() label2: string = "";
    @Input() label3: string = "";
    @Input() maxY: number;

    // public barChartOptions: ChartConfiguration['options'] = {
    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            x: {},
            y: {
                min: 0,
                max: 891,
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
            },
        },
    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [DataLabelsPlugin];

    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    // public barChartData: ChartData<'bar'> = {
    //   labels: [ 'Total  on board',
    //   'Total victims',
    //   'Total age up to 20 years old',
    //   'Total from 21 to 40 years old',
    //   'Total from 41 to 60 years old',
    //   'Total from 61 to 80 years old',
    //   'Total from 81 to 100 years old',
    //   'Total 1 Class',
    //   'Total 2 Class',
    //   'Total 3 Class',],
    //   datasets: [
    //     { data: [ 891, 549, 179, 360, 120, 19, 0, 216, 184, 491 ], label: 'Total' },
    //   ]
    // };
    // public barChartData: ChartData<'bar'> = {
    //   labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    //   datasets: [
    //     { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
    //     { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    //   ]
    // };

    public chartClicked({
        event,
        active,
    }: {
        event?: ChartEvent;
        active?: {}[];
    }): void {
        // console.log(event, active);
    }

    public chartHovered({
        event,
        active,
    }: {
        event?: ChartEvent;
        active?: {}[];
    }): void {
        // console.log(event, active);
    }

    // public randomize(): void {
    //   // Only Change 3 values
    //   this.barChartData.datasets[0].data = [
    //     Math.round(Math.random() * 100),
    //     59,
    //     80,
    //     Math.round(Math.random() * 100),
    //     56,
    //     Math.round(Math.random() * 100),
    //     40 ];

    //   this.chart?.update();
    // }
    constructor() {
        console.log('this.data1 constructor', this.data1);
    }
    // console.log("this.data1", this.data1);

    ngOnInit(): void {
        
        console.log('this.data1', this.data1);
        

        
        console.log('this.barChartData OnInit', this.barChartData);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes from barchart', changes);
        this.barChartData = {
           labels: [...this.labels],
            datasets: [
                { data: this.data1, label: this.label1 },
                { data: this.data2, label: this.label2 },
                { data: this.data3, label: this.label3 },
            ],
        };
    }
}
