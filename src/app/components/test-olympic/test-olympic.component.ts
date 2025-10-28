import {Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlympicService } from '../../core/services/olympic';
import { OlympicCountry } from '../../core/models/olympic';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-test-olympic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-olympic.component.html',
  styleUrls: ['./test-olympic.component.scss']
})
export class TestOlympicComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  olympics: OlympicCountry[] = [];
  loading = true;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympicsAndLog().pipe(takeUntil(this.destroy$)).subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
