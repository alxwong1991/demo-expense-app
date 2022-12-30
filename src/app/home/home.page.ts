import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string;
  totalExpenses: number;
  loaded: boolean;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('name');
  }

  ionViewWillEnter() {
    this.loaded = false;
    this.totalExpenses = 0;

    this.expenseService.getAll().subscribe({
      next: (expenses) => {
        this.loaded = true;
        expenses.forEach((expense) => {
          this.totalExpenses += expense.amount;
        });
      },
    });
  }

  onLogout() {
    this.alertCtrl
      .create({
        header: 'Logout',
        message: 'Are you sure want to leave',
        buttons: [
          { text: 'Stay' },
          {
            text: 'Leave',
            handler: () => {
              this.authService.logout().subscribe({
                next: () => {
                  localStorage.removeItem('expenseAppToken');
                  localStorage.removeItem('name');
                  this.router.navigateByUrl('/login');
                },
                error: (error) => {
                  // handle error
                  console.log(error);
                },
              });
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
