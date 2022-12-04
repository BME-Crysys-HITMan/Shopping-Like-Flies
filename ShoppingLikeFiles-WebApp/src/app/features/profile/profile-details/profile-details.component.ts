import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ChangePasswordRequest, UpdateUserRequest, UserResponse } from 'src/app/sdk';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

    editUserForm = this.fb.group({
        username: [''],
        firstname: [''],
        lastname: [''],
    });

    changePasswordForm = this.fb.group({
        oldPassword: [''],
        newPassword: [''],
    });

    currentUser: UserResponse;

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private profileService: ProfileService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getUser();
        this.editUserForm.setValue(
            {
                username: this.currentUser.username,
                firstname: this.currentUser.firstname,
                lastname: this.currentUser.lastname,
            },
        );
    }

    onSubmit() {
        if (!this.editUserForm.valid) {
            return;
        }
        this.spinner.show();
        const updateUserRequest: UpdateUserRequest = {
            username: this.editUserForm.value.username,
            firstname: this.editUserForm.value.firstname,
            lastname: this.editUserForm.value.lastname,
        };
        this.profileService.updateUser(this.currentUser.id ,updateUserRequest)
            .subscribe({
                next: (result) => {
                    // this.authService()
                    this.spinner.hide();
                },
                error: (e) => {
                    this.spinner.hide();
                    // TODO: error handling
                },
            });
    }

    changePassword() {
        if (!this.editUserForm.valid) {
            return;
        }
        this.spinner.show();
        const changePasswordRequest: ChangePasswordRequest = {
            oldPassword: this.changePasswordForm.value.oldPassword,
            newPassword: this.changePasswordForm.value.newPassword,
        };
        this.profileService.changePassword(this.currentUser.id, changePasswordRequest)
            .subscribe({
                next: (result) => {
                    this.spinner.hide();
                },
                error: (e) => {
                    this.spinner.hide();
                    // TODO: error handling
                },
            });
    }
}
