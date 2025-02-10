import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-error',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        RouterLink
    ],
    templateUrl: './error.component.html',
})
export class ErrorComponent { }