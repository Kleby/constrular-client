import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { IClient } from '../../Models/IClient.Interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public listaClientes: IClient[] = [];

  registerDate:string = "";

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.pegarTodos()
    this.registerDate = new Date().toLocaleDateString();    
  }

  pegarTodos(){
    this.clienteService.pegarTodos().subscribe({
      next: res => {
        this.listaClientes = res;
      },
      error: err => console.error(`Não foi possivel solicitar os dados... Error: ${err}`),
      complete: ()=> console.log("Finalizado")
    })
  }
  

}
