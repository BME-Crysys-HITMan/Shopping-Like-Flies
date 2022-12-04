import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AddCommentDTO, CaffResponse, CommentResponse, UserResponse } from 'src/app/sdk';
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

    comments: CommentResponse[] = []

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
                    this.comments = caff.comments;
                },
                error: (err) => {
                    this.spinner.hide();
                    this.snackBar.open('Unknown error occured')
                }
            });
    }

    addCommentCaff() {
        const addCommentCaffDto: AddCommentDTO = {
            caffId: this.caff.id,
            comment: this.commentForm.value.comment,
        }
        this.caffService.addCommentCaff(addCommentCaffDto)
        .subscribe({
            next: (res) => {
                this.spinner.hide();
                this.comments.push({
                    userId: this.currentUser.id,
                    text: this.commentForm.value.comment,
                })
            },
            error: (err) => {
                this.spinner.hide();
                this.snackBar.open('Unknown error occured')
            }
        });
    }

    buyCaff() {
        // TODO: call buy then download
    }

}
