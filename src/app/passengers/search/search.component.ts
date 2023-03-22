import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormArray,
    FormControl,
    Validators,
} from '@angular/forms';
import { PassengersService } from '../passengers.service';

@Component({
    selector: 'searchComponent',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    isModalOpen: boolean;
    _modalSubscription: any;

    @Output() serchPokemon: EventEmitter<string> = new EventEmitter();
    // @Input() testAPI: (searchCriteria: []) => void;

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
        this.CriteriaFilterSearch = this.passengersService.criteriaFilterChange;
    }

    onToggleCreateForm() {
        this.passengersService.onToggleCreateForm();
        console.log('click modal from FORM close', this.isModalOpen);
    }
    submitForm() {
        // console.log(this.form.value);
        let selectCriteria = this.form.value.checkArrayTypes;
        console.log(selectCriteria);
        this.passengersService.filterPassegerByCriteria(selectCriteria);
        console.log("criteriaFilterChange from Serach component", this.CriteriaFilterSearch);
    }

    clearFilters(){
        this.passengersService.filterPassegerByCriteria([]);
        console.log("CriteriaFilterSearch from clear", this.CriteriaFilterSearch);
    }
}
