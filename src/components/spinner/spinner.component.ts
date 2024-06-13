import { Component } from '@angular/core';
import { LoadingService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  constructor(public loader: LoadingService) { }
}
