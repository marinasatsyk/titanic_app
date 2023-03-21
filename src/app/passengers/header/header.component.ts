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
    @Output() serchPassengers: EventEmitter<string> = new EventEmitter();

    search: string = '';

    constructor(
        private route: ActivatedRoute,
        private PassengersService: PassengersService
    ) {}

    onSubmitSearch(form: NgForm) {
        console.log('form.value.search', form.value.search);
    }

    onSearchPassengers($event: string) {
        console.log('*header* onSearchPassengers', $event);
        this.serchPassengers.emit($event);
    }

    onToggleCreateForm() {
        this.PassengersService.onToggleCreateForm();
    }
}
