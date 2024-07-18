import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IClient, StatusEnum } from '../Models/IClient.Interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService{

  urlAPi: string = environment.apiUrl;

  constructor(private http:HttpClient) { 
  }

  pegarTodos(): Observable<IClient[]>{
    return this.http.get<IClient[]>(`${this.urlAPi}/clients`);
  }


  buscarPorId(id: number | string): Observable<IClient>{
    return this.http.get<IClient>(`${this.urlAPi}/clients/${id}`);
  }

  buscarPorNome(nome: string):Observable<IClient>{
    return this.http.get<IClient>(`${this.urlAPi}/clients/${nome}`);
  }

  buscarPorTelefone(tel: string):Observable<IClient>{
    return this.http.get<IClient>(`${this.urlAPi}/clients/${tel}`);
  }

  addDate():string{
    const agora = new Date();
    const dia = this.addZero(agora.getDate());
    const mes = this.addZero(agora.getMonth() + 1);
    const ano = agora.getFullYear();

    return `${dia}/${mes}/${ano}`
  }
  addZero(n: number){
    return n < 10 ? '0'+n : n;
  }

  cadastrarCliente( clienteForm: IClient):Observable<IClient>{
    
    clienteForm.updatedDate = "--/--/----"
    clienteForm.createdDate = this.addDate();
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    

    return this.http.post<IClient>(`${this.urlAPi}/clients`, clienteForm, httpOptions).pipe(
      catchError( err => {
        console.error("Erro ao cadastrar o cliente... Sem resposta da API: ",err)
        throw err
    }));
  }

  pesquisarPorTipo(dados: string, tipo: string):Observable<IClient> | null{
    let cliente = null;
    
    switch(tipo){
      case 'id':
        cliente = this.buscarPorId(parseInt(dados));        
        break;

      case 'name':
        cliente = this.buscarPorNome(dados);       
        break;
      
      case 'phone':
        cliente = this.buscarPorTelefone(dados);        
        break;

      default:
        console.error("O tipo especificado não é Valido. Tipo:" , tipo);
    }
    return cliente;
  }


}
