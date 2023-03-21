import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Passenger } from './passenger';
import { PassengersService } from './passengers.service';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  passengersTotal: Passenger[] = [];

  isModalOpen : boolean;
  _modalSubscription:any;

  constructor(private passengerService: PassengersService){
    this.isModalOpen = passengerService.isModalOpenService;
    this._modalSubscription = passengerService.isModalOpenServiceChange.subscribe((value) => {
      this.isModalOpen = value;
    })
  }

  ngOnInit(): void {
    //rajouter filter
    this.passengerService.getPassengers().subscribe((passengerslist: any) =>
    {
      this.passengersTotal = passengerslist.passengers;
      console.log("😊from ngOnInit ", this.passengersTotal);

    } )
     this.isModalOpen = this.passengerService.isModalOpenService;
  }


}
