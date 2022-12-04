import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CaffResponse, UserResponse } from 'src/app/sdk';
import { CaffService } from '../caff.service';

@Component({
    selector: 'app-caff-details',
    templateUrl: './caff-details.component.html',
    styleUrls: ['./caff-details.component.scss']
})
export class CaffDetailsComponent implements OnInit {

    commentForm = this.fb.group({
        comment: [''],
    });

    caff: CaffResponse;
    currentUser: UserResponse;

    comments = [
        {
            comment: 'tesaasdas dsad as',
            user: {
                username: '2423423'
            } 
        },
        {
            comment: 'tesaasdas dsad as',
            user: {
                username: '2423423'
            } 
        },
        {
            comment: 'tesaasdas dsad as',
            user: {
                username: '2423423'
            } 
        }
    ]

    constructor(
        private caffService: CaffService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getUser();
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.caffService.getCaff(parseInt(params.get('id')))))
            .subscribe({
                next: (caff: CaffResponse) => {
                    this.spinner.hide();
                    this.caff = caff;
                },
                error: (err) => {
                    this.spinner.hide();
                    this.snackBar.open('Unknown error occured')
                }
            });
    }

    addComment() {
        // this.caffService
        this.comments.push({
            comment: 'tesaasdas dsad as',
            user: {
                username: '2423423'
            } 
        })
        // TODO: call add comment
    }

    buyCaff() {
        // TODO: call buy then download
    }

}
