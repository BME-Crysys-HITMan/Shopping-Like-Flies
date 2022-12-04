import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRequest } from 'src/app/sdk';
import { LoginDto } from 'src/app/types';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

    loginForm = this.fb.group({
        username: [''],
        password: [''],
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

    cancel () {
        this.dialogRef.close();
    }

    onSubmit() {
        if (!this.loginForm.valid) {
            return;
        }
        this.spinner.show();
        const loginRequest: LoginRequest = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password,
        };
        this.loginService.login(loginRequest)
            .subscribe({
                next: () => {
                    this.spinner.hide();
                    this.dialogRef.close();
                },
                error: (e) => {
                    this.handleError(e);
                    this.spinner.hide();
                },
            });
    }

    private handleError(e): void {
        console.log(e);
        if (e.status === 401) {
            this.error = 'Incorrect password or username';
        } else {
            this.error = 'Unknown error occured';
        }
    }

}
