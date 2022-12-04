import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterRequest } from 'src/app/sdk';
import { RegisterDto } from 'src/app/types';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-register-dialog',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
    //TODO: cancel button helyett jobb felso sarok x
    registerForm = this.fb.group({
        username: [''],
        firstname: [''],
        lastname: [''],
        password: [''],
        passwordConfirm: [''],
    });

    error = '';

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        public dialogRef: MatDialogRef<LayoutComponent>,
        private loginService: LoginService,
    ) { }

    ngOnInit(): void {
    }

    cancel() {
        this.dialogRef.close();
    }

    onSubmit() {
        if (!this.registerForm.valid) {
            return;
        }
        if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
            this.error = 'Passwords are different';
            return;
        }
        this.spinner.show();
        const registerRequest: RegisterRequest = {
            username: this.registerForm.value.username,
            firstname: this.registerForm.value.firstname,
            lastname: this.registerForm.value.lastname,
            password: this.registerForm.value.password,
            passwordConfirm: this.registerForm.value.passwordConfirm,
        };
        this.loginService.register(registerRequest)
            .subscribe({
                next: () => {
                    this.spinner.hide();
                    this.dialogRef.close();
                },
                error: (e) => {
                    // TODO: ... handle shit
                    this.spinner.hide();
                    if (e.status === 400) {
                        this.error = 'A megadott felhasználó név már foglalt';
                    } else {
                        this.error = e;
                    }
                },
            });
    }

}
