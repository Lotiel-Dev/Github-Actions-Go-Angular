import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { ParticlesComponent } from '../../shared/particles/particles.component';

@Component({
  selector: 'app-home',
  // imports: [ ParticlesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.adjustCarouselAnimation();
    
    window.addEventListener('resize', () => {
      this.adjustCarouselAnimation();
    });
  }
  
  
  adjustCarouselAnimation(): void {
    const scrollContainer = document.querySelector('.auto-scroll') as HTMLElement;
    if (scrollContainer) {
      const cards = scrollContainer.querySelectorAll('.work-areas-card');
      const cardWidth = cards[0].clientWidth;
      const gap = 20; 
      
      
      const containerWidth = scrollContainer.parentElement?.clientWidth || window.innerWidth;
      const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
      
      
      document.documentElement.style.setProperty(
        '--scroll-distance', 
        `${-(cardWidth + gap) * (cards.length / 2)}px`
      );
      
      
      const styleSheet = document.styleSheets[0];
      let keyframesRule: CSSKeyframesRule | null = null;
      
      
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (rule.type === CSSRule.KEYFRAMES_RULE && 
            (rule as CSSKeyframesRule).name === 'autoScroll') {
          keyframesRule = rule as CSSKeyframesRule;
          break;
        }
      }
      
      if (keyframesRule) {
        
        keyframesRule.deleteRule('100%');
        keyframesRule.appendRule(`100% { transform: translateX(${-(cardWidth + gap) * (cards.length / 2)}px); }`);
      } else {
        
        const animationText = `
          @keyframes autoScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(${-(cardWidth + gap) * (cards.length / 2)}px); }
          }
        `;
        styleSheet.insertRule(animationText, styleSheet.cssRules.length);
      }
    }
  }
}