import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Passenger } from './passenger';
import { PassengersService } from './passengers.service';
import { HeaderComponent } from './header/header.component';
import { count } from 'rxjs';
@Component({
    selector: 'passengers',
    templateUrl: './passengers.component.html',
    styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent implements OnInit {
    passengersTotal: Passenger[] = [];

    isModalOpen: boolean;
    _modalSubscription: any;
    isCriteriaFilter: any;
    // datasets: [
    //   { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
    //   { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    // ]

    totalDataChart: any[] =
        // totalOnBoard: number,
        // totalNotSurvived: number,
        // totalF: number,
        // totalH: number,
        // totalAgeTo20: number,
        // totalAgeFrom21To40: number,
        // totalAgeFrom41To60: number,
        // totalAgeFrom61To80: number,
        // totalAgeFrom81To100: number,
        // total1Class: number,
        // total2Class: number,
        // total3Class: number,
        [];
    totalLables: string[] = [
        'Total  on board',
        'Total victims',
        'Total age up to 20 years old',
        'Total from 21 to 40 years old',
        'Total from 41 to 60 years old',
        'Total from 61 to 80 years old',
        'Total from 81 to 100 years old',
        'Total 1 Class',
        'Total 2 Class',
        'Total 3 Class',
    ];

    statiticsTitles = {
      total: "Total Statistics",
      age: "Age Statistics",
      sex: "Sex Statistics"
    }

    constructor(private passengerService: PassengersService) {
        this.isModalOpen = passengerService.isModalOpenService;
        this._modalSubscription =
            passengerService.isModalOpenServiceChange.subscribe((value) => {
                this.isModalOpen = value;
            });
        this.isCriteriaFilter = passengerService.criteriaFilterChange.subscribe(
            (value) => {
                this.isCriteriaFilter = value;
            }
        );
    }

    ngOnInit(): void {
        //rajouter filter
        this.passengerService
            .getPassengers()
            .subscribe((passengerslist: any) => {
                this.passengersTotal = passengerslist.passengers;
                // console.log('😊from ngOnInit ', this.passengersTotal);
                // this.totalDataSet();
                // const totalFilter = this.filterTotal();

                this.totalDataChart = [
                    ...[this.filterTotal()],
                    ...[this.filterTotal('0')],
                    ...[this.filterTotalAge({ from: 0, to: 20 })],
                    ...[this.filterTotalAge({ from: 21, to: 40 })],
                    ...[this.filterTotalAge({ from: 41, to: 60 })],
                    ...[this.filterTotalAge({ from: 61, to: 80 })],
                    ...[this.filterTotalAge({ from: 81, to: 100 })],
                    ...[this.filterTotalClass(1)],
                    ...[this.filterTotalClass(2)],
                    ...[this.filterTotalClass(3)],
                ];
                console.log('🔎', this.totalDataChart);
            });
        this.isModalOpen = this.passengerService.isModalOpenService;
    }

    filterTotal(isSurvived?: number | string) {
        let count = 0;
        if (isSurvived) {
            this.passengersTotal.map((passenger) => {
                if (passenger.Survived == isSurvived) {
                    count++;
                }
            });
        } else {
            count = this.passengersTotal.length;
        }
        console.log(
            isSurvived
                ? `survived=${isSurvived} total ${count}`
                : `total ${count}`
        );
        return count;
    }

    filterTotalAge(
        scope: { from: number; to: number },
        isSurvived?: number | string
    ): number {
        let count = 0;
        if (isSurvived) {
            this.passengersTotal.map((passenger) => {
                if (
                    passenger.Age >= scope.from &&
                    passenger.Age <= scope.to &&
                    passenger.Survived == isSurvived
                ) {
                    count++;
                }
            });
        } else {
            this.passengersTotal.map((passenger) => {
                if (passenger.Age > scope.from && passenger.Age <= scope.to) {
                    count++;
                }
            });
        }
        console.log(
            isSurvived
                ? `survived=${isSurvived} il y a ${count} passengers from ${scope.from} to ${scope.to}`
                : `TOTAL il y a ${count} passengers from ${scope.from} to ${scope.to}`
        );
        return count;
    }

    filterTotalClass(Pclass: number, isSurvived?: number | string): number {
        let count = 0;
        if (isSurvived) {
            this.passengersTotal.map((passenger) => {
                if (
                    passenger.Pclass == Pclass &&
                    passenger.Survived == isSurvived
                ) {
                    count++;
                }
            });
        } else {
            this.passengersTotal.map((passenger) => {
                if (passenger.Pclass == Pclass) {
                    count++;
                }
            });
        }
        console.log(
            isSurvived
                ? `survived=${isSurvived} il y a ${count} passengers of class ${Pclass}`
                : `TOTAL il y a il y a ${count} passengers of class ${Pclass}`
        );

        return count;
    }

    // totalDataSet() {
    //     this.totalDataChart.totalOnBoard = this.filterTotal();
    //     this.totalDataChart.totalNotSurvived = this.filterTotal('0');
    //     this.totalDataChart.totalAgeTo20 = this.filterTotalAge({
    //         from: 0,
    //         to: 20,
    //     });
    //     this.totalDataChart.totalAgeFrom21To40 = this.filterTotalAge({
    //         from: 21,
    //         to: 40,
    //     });
    //     this.totalDataChart.totalAgeFrom41To60 = this.filterTotalAge({
    //         from: 41,
    //         to: 60,
    //     });
    //     this.totalDataChart.totalAgeFrom61To80 = this.filterTotalAge({
    //         from: 61,
    //         to: 80,
    //     });
    //     this.totalDataChart.totalAgeFrom81To100 = this.filterTotalAge({
    //         from: 81,
    //         to: 100,
    //     });
    //     this.totalDataChart.total1Class = this.filterTotalClass(1);
    //     this.totalDataChart.total2Class = this.filterTotalClass(2);
    //     this.totalDataChart.total3Class = this.filterTotalClass(3);
    // }
}

// totalAgeFrom61To80: number;
//         total1Class: number;
//         total2Class: number;
//         total3Class: number;
