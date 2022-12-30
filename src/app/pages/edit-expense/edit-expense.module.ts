import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExpensePageRoutingModule } from './edit-expense-routing.module';

import { EditExpensePage } from './edit-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditExpensePageRoutingModule,
  ],
  declarations: [EditExpensePage],
})
export class EditExpensePageModule {}
