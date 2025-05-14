import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  progress: number;
  modules: number;
  completedModules: number;
  image: string;
  lastAccessed: Date;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedDate: Date;
}

@Component({
  selector: 'app-learning-progress',
  templateUrl: './learning-progress.component.html',
  styleUrls: ['./learning-progress.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LearningProgressComponent implements OnInit {
  username: string = 'Usuario';
  totalProgress: number = 0;
  courses: Course[] = [];
  achievements: Achievement[] = [];
  activeCourses: number = 0;
  completedCourses: number = 0;
  
  ngOnInit(): void {
    // Datos de prueba
    this.username = 'Alex';
    this.courses = [
      {
        id: 1,
        title: 'Fundamentos de Python',
        progress: 75,
        modules: 8,
        completedModules: 6,
        image: 'assets/images/curso-python.png',
        lastAccessed: new Date('2025-05-10')
      },
      {
        id: 2,
        title: 'Estructuras de datos en Python',
        progress: 40,
        modules: 10,
        completedModules: 4,
        image: 'assets/images/curso-python.png',
        lastAccessed: new Date('2025-05-12')
      },
      {
        id: 3,
        title: 'Programación Orientada a Objetos',
        progress: 20,
        modules: 12,
        completedModules: 2,
        image: 'assets/images/curso-python.png',
        lastAccessed: new Date('2025-05-08')
      },
      {
        id: 4,
        title: 'Desarrollo Web con Flask',
        progress: 0,
        modules: 15,
        completedModules: 0,
        image: 'assets/images/curso-python.png',
        lastAccessed: new Date()
      }
    ];
    
    this.achievements = [
      {
        id: 1,
        title: 'Primer código',
        description: 'Completaste tu primer programa "Hola Mundo"',
        icon: 'trophy',
        earnedDate: new Date('2025-05-01')
      },
      {
        id: 2,
        title: 'Experto en Variables',
        description: 'Dominaste el uso de variables y tipos de datos',
        icon: 'star',
        earnedDate: new Date('2025-05-03')
      },
      {
        id: 3,
        title: 'Bucles Conquistados',
        description: 'Completaste todos los ejercicios de bucles',
        icon: 'medal',
        earnedDate: new Date('2025-05-07')
      }
    ];
    
    this.calculateOverallProgress();
    this.countActiveCourses();
  }
  
  calculateOverallProgress(): void {
    if (this.courses.length === 0) {
      this.totalProgress = 0;
      return;
    }
    
    const sum = this.courses.reduce((total, course) => total + course.progress, 0);
    this.totalProgress = Math.round(sum / this.courses.length);
  }
  
  countActiveCourses(): void {
    this.activeCourses = this.courses.filter(course => course.progress > 0 && course.progress < 100).length;
    this.completedCourses = this.courses.filter(course => course.progress === 100).length;
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}