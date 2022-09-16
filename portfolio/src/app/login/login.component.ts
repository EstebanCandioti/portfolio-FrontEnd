import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailVerificado!: boolean;
  contraseniaVerificada!: boolean;
  verificado!: boolean;
  loginForm: FormGroup;
  constructor(private readonly fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.auth.iniciarSesion(this.loginForm.value).subscribe((data) => {
      if (data.error) {
        console.log('credenciales invalidas login');
        this.verificado = false;
        this.contraseniaVerificada=true;
        this.emailVerificado=true;
      }else{
        location.reload();
      }
      console.log('DATA LOGIN-COMPONENT:' + JSON.stringify(data));
    });
  }
  get Email() {
    return this.loginForm.get('email');
  }
  get Password() {
    return this.loginForm.get('password');
  }

  reiniciarForm() {
    this.loginForm.reset();
    this.emailVerificado = true;
    this.contraseniaVerificada = true;
  }
}
