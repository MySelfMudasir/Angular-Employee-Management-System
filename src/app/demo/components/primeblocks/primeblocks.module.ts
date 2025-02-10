import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        ChipModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        TooltipModule,
    ],
    declarations: []
})
export class PrimeBlocksModule { }
