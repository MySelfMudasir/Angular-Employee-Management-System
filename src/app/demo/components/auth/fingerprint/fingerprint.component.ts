import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fingerprint-login',
  standalone: true,
  templateUrl: './fingerprint.component.html',
  styleUrl: './fingerprint.component.scss'
})
export class FingerprintLoginComponent implements OnInit, OnDestroy {
  private timer: any;
  private timerSuccesss: any;

  constructor() { }

  ngOnInit(): void {
    this.addEventListeners();
  }

  ngOnDestroy(): void {
    // Clean up event listeners to prevent memory leaks
    this.removeEventListeners();
  }

  private addEventListeners(): void {
    const body = document.querySelector('body');
    body?.addEventListener('mousedown', this.onTouchstart.bind(this));
    body?.addEventListener('touchstart', this.onTouchstart.bind(this));
    body?.addEventListener('mouseup', this.onTouchEnd.bind(this));
    body?.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private removeEventListeners(): void {
    const body = document.querySelector('body');
    body?.removeEventListener('mousedown', this.onTouchstart.bind(this));
    body?.removeEventListener('touchstart', this.onTouchstart.bind(this));
    body?.removeEventListener('mouseup', this.onTouchEnd.bind(this));
    body?.removeEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private onTouchstart(): void {
    const fingerprint = document.querySelector('.fingerprint');
    fingerprint?.classList.add('active');
    this.timer = setTimeout(this.onSuccess.bind(this), 2000);
  }

  private onTouchEnd(): void {
    const fingerprint = document.querySelector('.fingerprint');
    fingerprint?.classList.remove('active');
    clearTimeout(this.timer);
  }

  private onSuccess(): void {
    const body = document.querySelector('body');
    const fingerprint = document.querySelector('.fingerprint');
    const center = document.querySelector('.center');
    
    body?.removeEventListener('mousedown', this.onTouchstart.bind(this));
    body?.removeEventListener('touchstart', this.onTouchstart.bind(this));

    fingerprint?.classList.remove('active');
    center?.classList.add('success');

    clearTimeout(this.timerSuccesss);

    this.timerSuccesss = setTimeout(() => {
      body?.addEventListener('mousedown', this.onTouchstart.bind(this));
      body?.addEventListener('touchstart', this.onTouchstart.bind(this));
      center?.classList.remove('success');
    }, 3000);
  }
}
