import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard, UnAuthGuard } from './modules/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m =>m.DashboardModule)
  },
  {
    path: 'auth',
    canActivate: [UnAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m =>m.AuthModule)
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}