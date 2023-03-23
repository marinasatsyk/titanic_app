import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PassengersService } from '../passengers.service';

@Component({
    selector: 'headerComponent',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Output() serchPassengers: EventEmitter<String[]> = new EventEmitter();

    search: string = '';
    // isCriteriaFilter: any;

    constructor(
        private route: ActivatedRoute,
        private PassengersService: PassengersService
    ) {
        // this.isCriteriaFilter = PassengersService.criteriaFilterChange.subscribe((value) => {
        //     this.isCriteriaFilter = value;
        //   })
       
    }

    onSubmitSearch(form: NgForm) {
        console.log('form.value.search', form.value.search);
    }

    onSearchPassengers($event: String[]) {
        this.serchPassengers.emit($event);
        console.log('❤️❤️❤️***header*** onSearchPassengers', $event);
    }

    onToggleCreateForm() {
        this.PassengersService.onToggleCreateForm();
    }
}
