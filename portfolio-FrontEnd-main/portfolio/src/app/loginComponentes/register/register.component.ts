import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private readonly fb:FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.initForm();
  }


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

  onSubmit(event: Event){
    let email:string= this.registerForm.get('email')?.value;
    let password:string = this.registerForm.get('password')?.value;
    this.auth.register(email, password).then(response =>{
      console.log(response);
    }).catch(error => console.log(error));
  }

  reiniciarForm() {
    this.registerForm.reset()
  }
}
