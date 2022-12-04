import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './core/auth/auth.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from './core/layout/layout.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationErrorInterceptorService } from './core/authorization-error-interceptor.service';
import { BASE_URL } from './base-urls';
import { AuthService } from './core/auth/auth.service';
import { CaffModule } from './features/caff/caff.module';
import { AdminModule } from './features/admin/admin.module';
import { ProfileModule } from './features/profile/profile.module';
import { Configuration } from './sdk';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AuthModule,
        CoreModule,
        HttpClientModule,
        MaterialModule,
        NgxSpinnerModule,
        CaffModule,
        ProfileModule,
        AdminModule,
        LayoutModule,
        AppRoutingModule,
    ],
    providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationErrorInterceptorService,
            multi: true,
        },
        {
            provide: Configuration,
            useFactory: (authService: AuthService) =>
                new Configuration({
                    basePath: BASE_URL,
                    // accessToken: authService.getAccessToken.bind(authService),
                    credentials: {
                        'Bearer': authService.getAccessToken.bind(authService), 
                    },
                    // withCredentials: true,
                    // Bearer:
                    //     authService.getAccessToken.bind(authService),
                }),
            deps: [AuthService],
            multi: false,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
