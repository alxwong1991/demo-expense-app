import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {
  form: FormGroup;

  constructor(
    private expenseService: ExpenseService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loading.present();

    this.expenseService.add(this.form.value).subscribe({
      next: () => {
        loading.dismiss();
        this.form.reset();
        this.toastCtrl
          .create({
            message: 'Expenses added successfully',
            duration: 2000,
          })
          .then((toast) => toast.present());
      },
      error: () => {
        loading.dismiss();
      },
    });
  }
}
