import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { OlympicService } from '../../core/services/olympic';
import { Router } from '@angular/router';

// Chart.js + plugin datalabels
Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // KPIs (maquette)
  totalJOs = 0;
  totalCountries = 0;

  // Pie chart
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    layout: { padding: 12 },
    plugins: {
      legend: { display: false }, // maquette: pas de légende, labels autour
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw} médailles`
        }
      },
      // labels autour des parts (comme la maquette)
      datalabels: {
        color: '#34495e',
        font: { weight: 'bold', size: 13 },
        formatter: (_value, context) => context.chart.data.labels?.[context.dataIndex] || '',
        anchor: 'end',
        align: 'end',
        offset: 12,
        clamp: true,
        clip: false
      }
    },
    // clic sur une part -> page détail
    onClick: (_event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const country = this.pieChartData.labels?.[index];
        if (country) this.router.navigate(['/detail', country]);
      }
    }
  };

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((data) => {
      // labels + valeurs
      const labels = data.map(c => c.country);
      const values = data.map(c =>
        c.participations.reduce((sum, p) => sum + p.medalsCount, 0)
      );

      // couleurs (ordre du JSON)
      const colors = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#F44336'];

      this.pieChartData = {
        labels,
        datasets: [{ data: values, backgroundColor: colors }]
      };

      // KPIs
      this.totalCountries = data.length;
      const years = new Set<number>();
      data.forEach(c => c.participations.forEach(p => years.add(p.year)));
      this.totalJOs = years.size;
    });
  }
}
