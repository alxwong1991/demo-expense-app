import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  expenses: Expense[];

  constructor(
    private expenseService: ExpenseService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.fetchExpenses();
  }

  async onDelete(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.expenseService.delete(id).subscribe({
              next: () => {
                this.fetchExpenses();
              },
              error: (error) => {
                console.log(error);
              },
            });
          },
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

  async fetchExpenses() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loading.present();

    this.expenseService.getAll().subscribe({
      next: (expenses) => {
        loading.dismiss();
        this.expenses = expenses;
      },
      error: (error) => {
        console.log(error);
        loading.dismiss();
      },
    });
  }
}
