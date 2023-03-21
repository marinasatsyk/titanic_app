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

    submitForm() {
        console.log(this.form.value);
        //virer id ne new pokemon
        let selectCriteria = this.form.value.checkArrayTypes;
        console.log(selectCriteria);
    }

    ngOnInit() {
        this.isModalOpen = this.passengersService.isModalOpenService;
    }

    onToggleCreateForm() {
        this.passengersService.onToggleCreateForm();
        console.log('click modal from FORM close', this.isModalOpen);
    }
}
