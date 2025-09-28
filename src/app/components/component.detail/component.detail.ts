import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-component-detail',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './component.detail.html',
  styleUrls: ['./component.detail.scss']
})
export class ComponentDetail implements OnInit {
  country!: string;
  lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };

  totalEntries = 0;
  totalMedals = 0;
  totalAthletes = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country')!;

    this.olympicService.getOlympics().subscribe(data => {
      const countryData = data.find(c => c.country === this.country);

      if (countryData) {
        const years = countryData.participations.map(p => p.year);
        const medals = countryData.participations.map(p => p.medalsCount);

        this.totalEntries = countryData.participations.length;
        this.totalMedals = medals.reduce((sum, m) => sum + m, 0);
        this.totalAthletes = countryData.participations.reduce((sum, p) => sum + p.athleteCount, 0);

        this.lineChartData = {
          labels: years,
          datasets: [{
            label: `Médailles de ${this.country}`,
            data: medals,
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33,150,243,0.3)',
            fill: true,
            tension: 0.3
          }]
        };
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
