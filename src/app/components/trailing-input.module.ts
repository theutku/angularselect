import { NgModule } from '@angular/core';
import { TrailingInputComponent } from "./trailing-input.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TrailingInputSearch } from './pipes/trailing-input-search';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AutoPositionDirective } from './directives/auto-position.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        TrailingInputComponent,
        TrailingInputSearch,
        ClickOutsideDirective,
        AutoPositionDirective
    ],
    providers: [],
    exports: [TrailingInputComponent]
})
export class NucobjSearchModule { }
