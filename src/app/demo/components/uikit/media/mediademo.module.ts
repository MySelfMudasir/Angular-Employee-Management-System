import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
	imports: [
		CommonModule,
		ButtonModule,
		ImageModule,
		GalleriaModule,
		CarouselModule
	],
	declarations: []
})
export class MediaDemoModule { }
