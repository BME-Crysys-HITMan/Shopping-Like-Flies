import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getUser();
        if (currentUser) {
            if (route.data["admin"] && !currentUser.isAdmin) {
                this.router.navigate(['/caffs']);
                return false;
            }
            return true;
        }

        this.router.navigate(['/caffs']);
        return false;
    }
}