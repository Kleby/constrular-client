import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusEnum } from '../../Models/IClient.Interface';
import { ClienteService } from '../../services/cliente.service';
import { ButtonComponent } from "../../components/button/button.component";
import { FlashMessageComponent } from '../../components/flash-message/flash-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, FlashMessageComponent],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent  implements OnInit{

  formRegister!: FormGroup;
  statusEnum = StatusEnum; 
  isChecked: boolean = false;

  enabledFlashMessage: boolean = false;

  constructor( private fb:FormBuilder, private clienteService: ClienteService, private router: Router){}

  ngOnInit(): void {
      this.formRegister = this.fb.group({
        name: ["", Validators['required']],
        address: this.fb.group({
          street: ["", Validators['required']],
          city: ["", Validators["required"]],
          state: ["", Validators["required"]]
        }),
        phone: ["", Validators['required']],
        statusEnum: ['isBuild'],
      })
  }

  submit(){        
    this.clienteService.cadastrarCliente(this.formRegister.value).subscribe({
      next: res => {
        console.log("Usuário Cadastrado com sucesso! "+ res);
        this.onFlashMessage();
      },
      error: err => console.error("Não foi possível cadastrar o usuário... error: "+ err),
      complete: ()=> console.log("Fim da requisição")
      
    });    
  }

  addClassDirty( isValid: boolean): string{
    if(isValid) return "dirty";
    return "";
  }

  addClassDisabled(): string{
    if(this.formRegister.invalid) return "btn-disabled";
    return ""
    
  }

  onFlashMessage(){
    this.enabledFlashMessage = true;
    setTimeout(()=> {
      this.enabledFlashMessage = false
      this.router.navigate(['/']);
    } ,2000)
  }

}
