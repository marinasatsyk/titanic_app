import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private uS: UsersService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onLogin() {
        // recuperer l'email et le password du formulaire
        const credentials = this.form.value;

        // demander au service de récupérer l'utilisateur ayant cet email
        this.uS.getUserByemail(credentials).subscribe((res: any) => {
            if (!res.message) {
                sessionStorage.setItem('user', JSON.stringify(res.user));
                this.router.navigateByUrl('/passengers');
            } else {
                console.error(res.message);
            }
        });
    }
}
