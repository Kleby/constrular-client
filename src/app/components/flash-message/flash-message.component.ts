import { Component, Input, input, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [],
  templateUrl: './flash-message.component.html',
  styleUrl: './flash-message.component.css'
})
export class FlashMessageComponent implements OnInit {

  message: WritableSignal<string> = signal('');
  @Input() set inputMessage(message: string){
    this.message.set(message);
  }

  ngOnInit(): void {
    this.addClassLoading();
  }

  addClassLoading(): string{
    return "loading";
  }

}
