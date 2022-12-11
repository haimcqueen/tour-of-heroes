import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HerodetailsComponent} from './herodetails/herodetails.component';


const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'heroes/:id', component: HerodetailsComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
