import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // Nécessaire pour *ngIf et *ngFor
import { OlympicService } from '../../core/services/olympic';
import { OlympicCountry } from '../../core/models/olympic';

@Component({
  selector: 'app-test-olympic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-olympic.component.html',
  styleUrls: ['./test-olympic.component.scss']
})
export class TestOlympicComponent implements OnInit {
  olympics: OlympicCountry[] = [];
  loading = true;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympicsAndLog().subscribe({
      next: (data: OlympicCountry[]) => {
        console.log("✅ Données reçues dans le composant :", data);
        this.olympics = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error("❌ Erreur de chargement :", err);
        this.loading = false;
      }
    });
  }
}
