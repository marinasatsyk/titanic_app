import { Injectable } from '@angular/core';
import { Passenger } from './passenger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, of, Subject, map } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root',
})

export class PassengersService {
    private passengers: Passenger[] = [];
    public sendCurrentPage = new Subject<number>();
    isModalOpenService: boolean;
    isModalOpenServiceChange: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient) {
        this.isModalOpenService = false;
    }

    private server = {
        mongo: 8000,
        local: 3000,
    };

    getPassengers(): Observable<Passenger[]> {
        return this.http
            .get<Passenger[]>(`http://localhost:${this.server.mongo}/passengers`)
            .pipe(
                tap((passengersList) => console.log('from service', passengersList)),
                catchError((error) => {
                    console.log(error);
                    return of([]);
                })
            );
    }

    // paginate(start: number, end: number, pokemons: Pokemon[]): Pokemon[] {
    //     return pokemons.slice(start, end);
    // }

    paginateNumberPage(): number {
        // return environment.numberPage;
        return 2;
    }

    currentPage(numberPage: number) {
        // l'Observer notifie l'info de la page, ici un nombre, puis l'envoie
        return this.sendCurrentPage.next(numberPage);
    }

    getPassenger(id: string): Observable<Passenger> {
        return this.http
            .get<Passenger>(
                `http://localhost:${this.server.mongo}/passengers/find/${id}`,
                httpOptions
            )
            .pipe(tap((passenger) => console.log(passenger)));
    }

    getUserByEmail(credentials: { name: String; email: String }) {
        return this.http.post(
            `http://localhost:${this.server.mongo}/user/login`,
            { ...httpOptions, body: credentials }
        );
    }

    onToggleCreateForm(): void {
        this.isModalOpenService = !this.isModalOpenService;
        this.isModalOpenServiceChange.next(this.isModalOpenService);
    }
}
