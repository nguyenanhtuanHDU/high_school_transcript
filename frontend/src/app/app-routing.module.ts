import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { AuthGuard } from './guard/auth.guard';
import { GadingComponent } from './gading/gading.component';
import { BlockTempComponent } from './block-temp/block-temp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BlockComponent } from './block/block.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gading',
    component: GadingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'block/temp',
    component: BlockTempComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'block',
    component: BlockComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
