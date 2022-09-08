import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  verificado!:boolean
  loginForm:FormGroup
  constructor(private readonly fb:FormBuilder, private auth:AuthService) { 
    this.loginForm= this.initForm()
  }

  ngOnInit(): void {
  }

  initForm():FormGroup{
    return this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }
  onSubmit(event: Event)
  {
    event.preventDefault();
    this.auth.iniciarSesion(this.loginForm.value).subscribe(data => {
      console.log("DATA LOGIN-COMPONENT:" + JSON.stringify(data));
      if(data.error==="Usuario invalido"){
        this.verificado=false;
      }else{
        location.reload()
      }
    })
  }
  get Email(){
    return this.loginForm.get('email')
  }
  get Password(){
    return this.loginForm.get('password')
  }
  get Verificado(){
    return this.verificado
  }

  reiniciarForm(){
    this.loginForm.reset();
    this.verificado=true
  }
}
