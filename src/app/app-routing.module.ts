import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {BwbsComponent} from './bewerbungen/bwbs.component';
import {BwbComponent} from './bewerbung/bwb.component';
import {AboutExtraComponent} from './about-extra/about-extra.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'about', component: AboutComponent, children: [
      {path: 'extra', component: AboutExtraComponent}
    ]
  },
  {path: 'bewerbungen', component: BwbsComponent},
  {path: 'bewerbung/:id', component: BwbComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
