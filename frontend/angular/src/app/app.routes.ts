import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExercisesListComponent } from './pages/exercises-list/exercises-list.component';
import { VideosListComponent } from './pages/videos-list/videos-list.component';
import {PaginaBuscadorComponent} from './pages/pagina-buscador/pagina-buscador.component';
import { LearningProgressComponent } from './pages/learning-progress/learning-progress.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { TerminalComponent } from './pages/terminal/terminal.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },


  // listas
  { path: 'buscador', component: PaginaBuscadorComponent },
  {path: "lista-videos", component: VideosListComponent},
  {path: "lista-ejercicios", component: ExercisesListComponent},
  {path: "progreso-aprendizaje", component: LearningProgressComponent},
  {path: "lista-cursos", component: CoursesListComponent},
  {path: "terminal", component: TerminalComponent},
];