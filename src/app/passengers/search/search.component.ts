import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormArray,
    FormControl,
    Validators,
    NgForm,
} from '@angular/forms';
import { PassengersService } from '../passengers.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'searchComponent',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    isModalOpen: boolean;
    _modalSubscription: any;
    @Output() serchPassengers: EventEmitter<String[]> = new EventEmitter();


    selectFields: Array<any> = [
        { name: 'Sex', value: 'Sex' },
        { name: 'Age', value: 'Age' },
        { name: 'Class', value: 'Pclass' },
    ];

    form: any = FormGroup;
    submitted: boolean = false;
    CriteriaFilterSearch: any;

    constructor(
        private fb: FormBuilder,
        private passengersService: PassengersService
    ) {
        this.form = this.fb.group({
            checkArrayTypes: this.fb.array([], [Validators.required]),
        });

        this.isModalOpen = passengersService.isModalOpenService;
        this._modalSubscription =
            passengersService.isModalOpenServiceChange.subscribe((value) => {
                this.isModalOpen = value;
            });
        this.CriteriaFilterSearch = passengersService.criteriaFilterChange.subscribe((value) => {
            this.CriteriaFilterSearch = value;
        })
    }

    onCheckboxChange(e: any) {
        const checkArrayTypes: FormArray = this.form.get(
            'checkArrayTypes'
        ) as FormArray;
        if (e.target.checked) {
            checkArrayTypes.push(new FormControl(e.target.value));
        } else {
            let i: number = 0;
            checkArrayTypes.controls.forEach((item: any) => {
                if (item.value == e.target.value) {
                    checkArrayTypes.removeAt(i);
                    return;
                }
                i++;
            });
        }
        console.log(this.form);
    }

    

    ngOnInit() {
        this.isModalOpen = this.passengersService.isModalOpenService;
        // this.passengersService.criteriaFilterChange
        this.CriteriaFilterSearch = this.passengersService.criteriaFilterChange;
    }

    onToggleCreateForm() {
        this.passengersService.onToggleCreateForm();
        console.log('click modal from FORM close', this.isModalOpen);
    }
    search:string = "";
    submitForm() {
        let selectCriteria = this.form.value.checkArrayTypes;
        // console.log(selectCriteria);
        // this.passengersService.filterPassegerByCriteria(selectCriteria).subscribe((value) => {
        //     console.log("", value);
            
        // });
        console.log("criteriaFilterChange from Serach component", selectCriteria);
        if(selectCriteria.length > 0){
           console.log("🦊event from search");
            this.serchPassengers.emit(selectCriteria);
        }
    }

    clearFilters(){
        this.serchPassengers.emit([]);
        // this.passengersService.filterPassegerByCriteria([]);
        // console.log("CriteriaFilterSearch from clear", this.CriteriaFilterSearch);
    }
}
