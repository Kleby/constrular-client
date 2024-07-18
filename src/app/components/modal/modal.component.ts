import { Component, Input, output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  closeModal = output<boolean>();
  
  public id:WritableSignal<number> = signal(0);
  @Input() set inputId(id: number){
    this.id.set(id);
  }

  public name:WritableSignal<string> = signal("");
  @Input() set inputName(name: string){
    this.name.set(name);
  }

  public street:WritableSignal<string> = signal("");
  @Input() set inputStreet(street: string){
    this.street.set(street);
  }

  public city:WritableSignal<string> = signal("");
  @Input() set inputCity(city: string){
    this.city.set(city);
  }

  public state:WritableSignal<string> = signal("");
  @Input() set inputState(state: string){
    this.state.set(state);
  }

  public phone:WritableSignal<string> = signal("");
  @Input() set inputPhone(phone: string){
    this.phone.set(phone);
  }

  public statusEnum:WritableSignal<string> = signal("");
  @Input() set inputStatusEnum(statusEnum: string){
    this.statusEnum.set(statusEnum);
  }

  onCloseModal(){    
    this.closeModal.emit(false);
  }

  onCloseEsc(event: KeyboardEvent){
    
    if(event.key ==="Escape") this.closeModal.emit(false);        
  }

}
