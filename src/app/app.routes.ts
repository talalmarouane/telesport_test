import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { ComponentDetail } from './components/component.detail/component.detail';
import { TestOlympicComponent } from './components/test-olympic/test-olympic.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; // 👈 import ajouté

export const routes: Routes = [
  // Redirection racine -> /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Page d'accueil (Pie chart)
  { path: 'home', component: HomeComponent },

  // Page détail (Line chart pour un pays sélectionné)
  { path: 'detail/:country', component: ComponentDetail },

  // Page test-olympic (ton composant de test)
  { path: 'test', component: TestOlympicComponent },

  // 🚨 Page Not Found - catch-all
  { path: '**', component: NotFoundComponent }
];
