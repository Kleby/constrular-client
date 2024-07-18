import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { ClienteService } from '../../services/cliente.service';
import { IClient } from '../../Models/IClient.Interface';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, ModalComponent],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent implements OnInit{

  formSearch!: FormGroup;
  label: string = "ID";
  client: IClient | null = null;
  listClients: IClient[] = [];
  isSearchOk: boolean = false;

  constructor(private fb:FormBuilder, private clienteService: ClienteService){}

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      data: ['', Validators['required']],
      searchType: ['id', Validators['required']]
    })
  }

  addClassDirty( isValid: boolean): string{
    if(isValid) return "dirty";
    return "";
  }

  onSubmit(){
    const { data, searchType} = this.formSearch.value;
    return this.clienteService.pesquisarPorTipo(data, searchType)?.subscribe({
      next: res => {
        this.client = res;
        this.isSearchOk = true;
      },
      error: err => {
        console.error("Error ao consultar o cliente... error: ", err);
        alert(`Cliente com ${searchType}:${data} não encontrado`);
        // this.clearForm();
      },
      complete: ()=> console.log("consulta finalizada")
      
    });
    
  }

  addClassDisabled(controlName:string): string{
    if(!this.formSearch.controls[controlName].value.length) return "btn-disabled";
    return ""
    
  }

  onChangeLabel(){
    switch(this.formSearch.controls['searchType'].value){
      case 'name':
        this.label = "Nome";
        break;

      case 'phone':
        this.label = "Telefone";
        break

      default: 
        this.label = "ID"
        break;
    }
  }

  clearForm(){
    this.formSearch.controls?.['data'].value.setValue;    
  }

  onCloseModal(isSearchOk: boolean){
    this.isSearchOk = isSearchOk;
  }
  onCloseModalEsc(isSearchOk: boolean){
    this.isSearchOk = isSearchOk;
  }
}
