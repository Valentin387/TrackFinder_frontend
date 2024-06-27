import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SpinnerService } from '../services/spinner.service'; // Import SpinnerService
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  private readonly spinnerSvc = inject (SpinnerService); // Inject SpinnerService
  isLoading = this.spinnerSvc.isLoading; // Set isLoading to SpinnerService.isLoading

}
