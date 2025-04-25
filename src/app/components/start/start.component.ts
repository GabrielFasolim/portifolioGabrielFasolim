import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, AfterViewInit {
  // Original properties
  texto: string = 'Gabriel Fasolim';
  imagemUrl: string = '../../../assets/htmlSimbol.png';
  
  // New properties
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;
  
  skills: string[] = [
    'Angular', 'Vue.js', '.NET', 'MySQL', 'JavaScript', 'TypeScript', 'C#', 'SCSS'
  ];
  
  displayedSkills: string[] = [];
  
  // Canvas properties
  private ctx?: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId?: number;
  
  // Mouse position
  private mouseX: number = 0;
  private mouseY: number = 0;
  
  constructor() {}
  
  ngOnInit() {
    // Display only 5 skills initially
    this.displayedSkills = this.skills.slice(0, 5);
    
    // Original method
    this.transformarParaMaiusculas();
  }
  
  ngAfterViewInit() {
    this.initCanvas();
  }
  
  // Original method
  transformarParaMaiusculas() {
    this.texto = this.texto.toUpperCase();
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  
  @HostListener('window:resize')
  onResize() {
    if (this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.initParticles();
    }
  }
  
  private initCanvas() {
    if (!this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d') || undefined;
    
    if (!this.ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    this.initParticles();
    this.animate();
  }
  
  private initParticles() {
    if (!this.ctx || !this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];
    
    // Create minimalist particles
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 0.5;
      const color = this.getRandomColor();
      const speed = Math.random() * 0.2 + 0.1;
      
      this.particles.push(new Particle(x, y, size, color, speed));
    }
  }
  
  private getRandomColor(): string {
    const colors = ['#35155D', '#512B81', '#4477CE', '#8CABFF'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  private animate() {
    if (!this.ctx || !this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (const particle of this.particles) {
      // Subtle mouse interaction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        particle.x -= Math.cos(angle) * 0.5;
        particle.y -= Math.sin(angle) * 0.5;
      }
      
      particle.update(canvas.width, canvas.height);
      particle.draw(this.ctx);
    }
    
    // Draw connections
    this.drawConnections();
    
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  private drawConnections() {
    if (!this.ctx) return;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(140, 171, 255, ${0.1 - distance / 1000})`;
          this.ctx.lineWidth = 0.2;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Minimalist particle class
class Particle {
  constructor(
    public x: number,
    public y: number,
    public size: number,
    public color: string,
    public speed: number,
    public angle: number = Math.random() * Math.PI * 2
  ) {}
  
  update(width: number, height: number) {
    // Move in a gentle, slightly random direction
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    
    // Slightly change direction
    this.angle += (Math.random() - 0.5) * 0.01;
    
    // Wrap around edges
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}