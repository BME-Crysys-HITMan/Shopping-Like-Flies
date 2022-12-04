import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [
  layoutChildRoutes([
    {path: 'profile', component: ProfileDetailsComponent, canActivate: [AuthGuard]}
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
