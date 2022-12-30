import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    loading.present();

    this.authService.login(this.form.value).subscribe({
      next: (response: any) => {
        loading.dismiss();
        this.form.reset();

        localStorage.setItem('expenseAppToken', response.token);
        localStorage.setItem('name', response.name);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        loading.dismiss();
        console.log(error);
      },
    });
  }
}
