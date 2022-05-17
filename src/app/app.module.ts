import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LinkContainerComponent } from 'src/app/links/LinkContainerComponent';
import { LinkDirective } from 'src/app/links/LinkDirective';
import { BarComponent } from 'src/app/bar/BarComponent';

@NgModule({
	declarations: [
		AppComponent,
		LinkContainerComponent,
		LinkDirective,
		BarComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
