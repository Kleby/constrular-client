import { Component, Input, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  btnTitle: WritableSignal<string> = signal('')
  @Input() set inputBtnTitle(btnTitle: string){
    this.btnTitle.set(btnTitle);
  }

  isValid: WritableSignal<boolean> = signal(false);
  @Input() set inputIsValid(isvalid: boolean){
    this.isValid.set(isvalid);
  }

  onSubmitEmit: OutputEmitterRef<string> = output<string>();


  addClassDisabled(): string{
    
    if(!this.isValid()) return "btn-disabled";
    return ""
    
  }

  onSubmit(value: string){
        
    this.onSubmitEmit.emit(value);
  }
}
