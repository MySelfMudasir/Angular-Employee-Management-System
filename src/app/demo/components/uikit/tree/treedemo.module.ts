import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TreeModule,
		TreeTableModule
	],
	declarations: [],
})
export class TreeDemoModule { }
