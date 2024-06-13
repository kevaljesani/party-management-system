import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginComponent from '../components/login/login.component';
import {CommonModule} from '@angular/common';
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoginComponent, CommonModule, SpinnerComponent,MatIconModule,MatCardModule]
})
export class AppComponent {
  title = 'party-management-system';
}
