import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  layoutChildRoutes([
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: { admin: true},}
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
