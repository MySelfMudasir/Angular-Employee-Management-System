import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-access',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        RouterLink
    ],
    templateUrl: './access.component.html',
})
export class AccessComponent { }
