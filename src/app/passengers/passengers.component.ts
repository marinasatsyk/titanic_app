import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Passenger } from './passenger';
import { PassengersService } from './passengers.service';

@Component({
  selector: 'passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  passengers: Passenger[] = [];
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
      // this.passengers = this.passengerService.paginate( 0, 5,  this.passengersTotal);
      // this.passengers = this.passengerService.getPassengers();
      console.log("😊from ngOnInit ", this.passengersTotal);
      // console.log("❤️this.pokemons", this.passengers);

    } )
     this.isModalOpen = this.passengerService.isModalOpenService;
  }
  // paginate( $event: any )
  //   {
  //       this.passengers = this.passengerService.paginate( $event.start, $event.end, this.passengersTotal);
  //   }

}
