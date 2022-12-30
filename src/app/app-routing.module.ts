import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/expenses/expenses.module').then(
        (m) => m.ExpensesPageModule
      ),
  },
  {
    path: 'add',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/add-expense/add-expense.module').then(
        (m) => m.AddExpensePageModule
      ),
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/edit-expense/edit-expense.module').then(
        (m) => m.EditExpensePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
