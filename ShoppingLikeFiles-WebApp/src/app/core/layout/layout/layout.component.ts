import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { interval, takeUntil, timer } from 'rxjs';
import { UserResponse } from 'src/app/sdk';
import { AuthService } from '../../auth/auth.service';
import { LoginDialogComponent } from '../../auth/login-dialog/login-dialog.component';
import { LoginService } from '../../auth/login.service';
import { RegisterDialogComponent } from '../../auth/register-dialog/register-dialog.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    currentUser: UserResponse;
    duration;
    countdown = '';

    constructor(
        private authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        private loginService: LoginService,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getUser();
    }

    login(): void {
        this.dialog.open(LoginDialogComponent, {
            width: '500px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: true,
        }).afterClosed().subscribe({
            next: () => {
                // Angular refresh page workaround
                this.router.navigateByUrl('/404', {skipLocationChange: true}).then(() => {
                    // TODO: fix timer
                    this.startTimer();
                    this.router.navigate(['/caffs',]);
                });
            },
            complete: () => this.startTimer()
        });
    }

    register(): void {
        this.dialog.open(RegisterDialogComponent, {
            width: '500px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: true,
        }).afterClosed().subscribe();
    }

    logout(): void {
        this.loginService.logout().subscribe({
            next: () => {
                // Angular refresh page workaround
                this.router.navigateByUrl('/404', {skipLocationChange: true}).then(() => {
                    this.router.navigate(['/caffs',]);
                  });
                // this.router.navigate(["/caffs"])
            },
            error: (err) => console.log(err),
        });
    }

    navigateToProfile() {
        this.router.navigate(["/profile"]);
    }

    private startTimer() {
        this.duration = moment.duration(30,'minute');
        this.countdown = moment(this.duration.asMilliseconds()).format('mm:ss');
        const sub = interval(1000);

        // Countdown 15 minutes then complate the observable
        sub
        .pipe(takeUntil(timer(600000)))
        .subscribe({
            next: () => {
                this.duration = this.duration.subtract(moment.duration(1, 'second'))
                this.countdown = moment(this.duration.asMilliseconds()).format('mm:ss');
            },
            complete: () => {
                this.authService.clear();
                this.router.navigate(['/caffs']);
            }
        });
    }
}
