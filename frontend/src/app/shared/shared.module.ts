import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { ElementModule } from './modules/element.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ElementModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ElementModule,
    ],
    declarations: [],
})
export class SharedModule {}
