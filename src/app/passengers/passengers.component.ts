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
    @Output() serchPassengers: EventEmitter<String[]> = new EventEmitter();

    passengersTotal: Passenger[] = [];

    isModalOpen: boolean;
    _modalSubscription: any;

    /**filters */
    crteriaFilter: any;
    isAgeCriteria: boolean = false;
    isSexCriteria: boolean = false;
    isClassCriteria: boolean = false;

    /**Total data */
    totalDataChart: any[] = [];
    classDataChart: any[] = [];
    sexDataChart: any[] = [];
    ageDataChart: any[] = [];
    totalGlobalLables: string[] = [
        'Total on board',
        'Total age up to 20 years old',
        'Total from 21 to 40 years old',
        'Total from 41 to 60 years old',
        'Total from 61 to 80 years old',
        'Total from 81 to 100 years old',
        'Total 1 Class',
        'Total 2 Class',
        'Total 3 Class',
        'Total Women',
        'Total Men'
    ];

    totalLabels: string[] = [
        'Total',
        'Victims',
        'Survived'
    ];
    classGlobalLables: string[] = [
        'Total on board',
        'Total victims',
        'Total age up to 20 years old',
        'Total from 21 to 40 years old',
        'Total from 41 to 60 years old',
        'Total from 61 to 80 years old',
        'Total from 81 to 100 years old',
        'Total F',
        'Total H',
    ];
    
    classLables: string[] = [
        '1 Class',
        '2 Class',
        '3 Class',
    ]

    statiticsTitles = {
        total: 'Total Statistics',
        age: 'Age Statistics',
        sex: 'Sex Statistics',
        classS: 'Class Statistics'
    };

    constructor(private passengerService: PassengersService) {
        this.isModalOpen = passengerService.isModalOpenService;
        this._modalSubscription =
            passengerService.isModalOpenServiceChange.subscribe((value) => {
                this.isModalOpen = value;
            });
        // this.cirteriaFilter = passengerService.criteriaFilterChange.subscribe(
        //     (value) => {
        //         this.cirteriaFilter = value;
        //     }
        // );
    }

    ngOnInit(): void {
        this.passengerService
            .getPassengers()
            .subscribe((passengerslist: any) => {
                this.passengersTotal = passengerslist.passengers;

                this.totalDataChart[0] = [
                    ...[this.filterTotal()],
                    ...[this.filterTotalAge({ from: 0, to: 20 })],
                    ...[this.filterTotalAge({ from: 21, to: 40 })],
                    ...[this.filterTotalAge({ from: 41, to: 60 })],
                    ...[this.filterTotalAge({ from: 61, to: 80 })],
                    ...[this.filterTotalAge({ from: 81, to: 100 })],
                    ...[this.filterTotalClass(1)],
                    ...[this.filterTotalClass(2)],
                    ...[this.filterTotalClass(3)],
                    ...[this.filterTotalSex('female')],
                    ...[this.filterTotalSex('male')],
                ];
                this.totalDataChart[1] = [
                    ...[this.filterTotal('0')],
                    ...[this.filterTotalAge({ from: 0, to: 20 }, '0')],
                    ...[this.filterTotalAge({ from: 21, to: 40 }, '0')],
                    ...[this.filterTotalAge({ from: 41, to: 60 }, '0')],
                    ...[this.filterTotalAge({ from: 61, to: 80 }, '0')],
                    ...[this.filterTotalAge({ from: 81, to: 100 }, '0')],
                    ...[this.filterTotalClass(1, '0')],
                    ...[this.filterTotalClass(2, '0')],
                    ...[this.filterTotalClass(3, '0')],
                    ...[this.filterTotalSex('female', '0')],
                    ...[this.filterTotalSex('male', '0')],
                ];
                this.totalDataChart[2] = [
                    ...[this.filterTotal(1)],
                    ...[this.filterTotalAge({ from: 0, to: 20 }, 1)],
                    ...[this.filterTotalAge({ from: 21, to: 40 }, 1)],
                    ...[this.filterTotalAge({ from: 41, to: 60 }, 1)],
                    ...[this.filterTotalAge({ from: 61, to: 80 }, 1)],
                    ...[this.filterTotalAge({ from: 81, to: 100 }, 1)],
                    ...[this.filterTotalClass(1, 1)],
                    ...[this.filterTotalClass(2, 1)],
                    ...[this.filterTotalClass(3, 1)],
                    ...[this.filterTotalSex('female', 1)],
                    ...[this.filterTotalSex('male', 1)],

                ];
                console.log('🔎', this.totalDataChart);
            });

         console.log('✅✅✅✅✅✅***passengersComponent***', this.crteriaFilter);
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
        // console.log(
        //     isSurvived
        //         ? `survived=${isSurvived} total ${count}`
        //         : `total ${count}`
        // );
        return count;
    }

    filterTotalAge(
        scope: { from: number; to: number },
        isSurvived?: number | string,
        classNum?: number,
        sex?: string
    ): number {
        let count = 0;
        if (isSurvived) {
            if (!classNum && !sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Survived == isSurvived
                    ) {
                        count++;
                    }
                });
                console.log('passengers num', count);
                
            } else if (classNum && !sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Survived == isSurvived &&
                        passenger.Pclass == classNum
                    ) {
                        count++;
                    }
                });
            } else if (classNum && sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Survived == isSurvived &&
                        passenger.Pclass == classNum &&
                        passenger.Sex == sex
                    ) {
                        count++;
                    }
                });
            } else if (!classNum && sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Survived == isSurvived &&
                        passenger.Sex == sex
                    ) {
                        count++;
                    }
                });
            }
        } else {
             if (classNum && !sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Pclass == classNum
                    ) {
                        count++;
                    }
                });
            } else if (classNum && sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Pclass == classNum &&
                        passenger.Sex == sex
                    ) {
                        count++;
                    }
                });
            } else if (!classNum && sex) {
                this.passengersTotal.map((passenger) => {
                    if (
                        passenger.Age >= scope.from &&
                        passenger.Age <= scope.to &&
                        passenger.Sex == sex
                    ) {
                        count++;
                    }
                });
            }else if(!classNum && !sex){
                this.passengersTotal.map((passenger) => {
                    if (passenger.Age > scope.from && passenger.Age <= scope.to) {
                        count++;
                    }
                });
            }
        }
        // console.log(
        //     isSurvived
        //         ? `survived=${isSurvived} il y a ${count} passengers from ${scope.from} to ${scope.to}`
        //         : `TOTAL il y a ${count} passengers from ${scope.from} to ${scope.to}`
        // );
        return count;
    }

    filterTotalClass(Pclass: number, isSurvived?: number | string, sex?: string): number {
        let count = 0;
        if (isSurvived) {
           if(sex){
            this.passengersTotal.map((passenger) => {
                if (
                    passenger.Pclass == Pclass &&
                    passenger.Survived == isSurvived &&
                    passenger.Sex == sex
                ) {
                    count++;
                }
            });
           }else{
            this.passengersTotal.map((passenger) => {
                if (
                    passenger.Pclass == Pclass &&
                    passenger.Survived == isSurvived
                ) {
                    count++;
                }
            });
           }
           
        } else {
           if(sex){
            this.passengersTotal.map((passenger) => {
                if (passenger.Pclass == Pclass && passenger.Sex== sex) {
                    count++;
                }
            });
           }else{
            this.passengersTotal.map((passenger) => {
                if (passenger.Pclass == Pclass) {
                    count++;
                }
            });
           }
        }
        // console.log(
        //     isSurvived
        //         ? `survived=${isSurvived} il y a ${count} passengers of class ${Pclass}`
        //         : `TOTAL il y a il y a ${count} passengers of class ${Pclass}`
        // );

        return count;
    }

    filterTotalSex(sex: string, isSurvived?: number | string): number {
        let count = 0;
        if (isSurvived) {
            this.passengersTotal.map((passenger) => {
                if (
                    passenger.Sex == sex && 
                    passenger.Survived == isSurvived
                ) {
                    count++;
                }
            });
        } else {
            this.passengersTotal.map((passenger) => {
                if (passenger.Sex == sex) {
                    count++;
                }
            });
        }
        // console.log(
        //     isSurvived
        //         ? `survived=${isSurvived} il y a ${count} passengers of class ${Pclass}`
        //         : `TOTAL il y a il y a ${count} passengers of class ${Pclass}`
        // );

        return count;
    }

    filterCriteria($event: String[]) {
        this.serchPassengers.emit($event);
        this.crteriaFilter = $event;
        console.log('🐈‍⬛🐈‍⬛🐈‍⬛***passengersComponent***',  this.crteriaFilter);
        console.log('🐈‍⬛🐈‍⬛🐈‍⬛***passengersComponent***',  this.passengersTotal);
        
        
        if ( this.crteriaFilter.includes('Pclass')) {
           console.log('IN CLASS');
           
            this.isClassCriteria = true;
            //data il faut 3 data: First class
            this.classDataChart[0] = [
                ...[this.filterTotalClass(1)], //total  1 class pass
                ...[this.filterTotalClass(1, '0')], //total 1 class victims
                ...[this.filterTotalAge({ from: 0, to: 20 }, undefined, 1)], //total scope age 1 class
                ...[this.filterTotalAge({ from: 21, to: 40 }, undefined, 1)],
                ...[this.filterTotalAge({ from: 41, to: 60 }, undefined, 1)],
                ...[this.filterTotalAge({ from: 61, to: 80 }, undefined, 1)],
                ...[this.filterTotalAge({ from: 81, to: 100 }, undefined, 1)],
                ...[this.filterTotalClass(1, undefined, 'female')], //total 1 class female
                ...[this.filterTotalClass(1, undefined, 'male')], //total 1 class female
            ];
            this.classDataChart[1] = [
                ...[this.filterTotalClass(2)], //total  2 class pass
                ...[this.filterTotalClass(2, '0')], //total 2 class victims
                ...[this.filterTotalAge({ from: 0, to: 20 }, undefined, 2)], //total scope age 2 class
                ...[this.filterTotalAge({ from: 21, to: 40 }, undefined, 2)],
                ...[this.filterTotalAge({ from: 41, to: 60 }, undefined, 2)],
                ...[this.filterTotalAge({ from: 61, to: 80 }, undefined, 2)],
                ...[this.filterTotalAge({ from: 81, to: 100 }, undefined, 2)],
                ...[this.filterTotalClass(2, undefined, 'female')], //total 2 class female
                ...[this.filterTotalClass(2, undefined, 'male')], //total 2 class female
            ];
            this.classDataChart[2] = [
                ...[this.filterTotalClass(3)], //total  3 class pass
                ...[this.filterTotalClass(3, '0')], //total 3 class victims
                ...[this.filterTotalAge({ from: 0, to: 20 }, undefined, 3)], //total scope age 3 class
                ...[this.filterTotalAge({ from: 21, to: 40 }, undefined, 3)],
                ...[this.filterTotalAge({ from: 41, to: 60 }, undefined, 3)],
                ...[this.filterTotalAge({ from: 61, to: 80 }, undefined, 3)],
                ...[this.filterTotalAge({ from: 81, to: 100 }, undefined, 3)],
                ...[this.filterTotalClass(3, undefined, 'female')], //total 3 class female
                ...[this.filterTotalClass(3, undefined, 'male')], //total 3 class female
            ];
        } else if ( this.crteriaFilter.includes('Age')) {
            this.isAgeCriteria = true;
        } else if ( this.crteriaFilter.includes('Sex')) {
            this.isSexCriteria = true;
        }
        console.log('this.classDataChart', this.classDataChart);
        
    }
}
