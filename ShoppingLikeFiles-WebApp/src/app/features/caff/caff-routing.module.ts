import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { CaffDetailsComponent } from './caff-details/caff-details.component';
import { CaffListComponent } from './caff-list/caff-list.component';

const routes: Routes = [
  layoutChildRoutes([
    { path: '', redirectTo: 'caffs', pathMatch: 'full' },
    {path: 'caffs', component: CaffListComponent},
    {path: 'caff/:id', component: CaffDetailsComponent}
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaffRoutingModule { }
