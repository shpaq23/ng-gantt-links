import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LinkContainerComponent } from 'src/app/links/LinkContainerComponent';
import { LinkDirective } from 'src/app/links/LinkDirective';
import { BarComponent } from 'src/app/bar/BarComponent';
import { RouterModule, Routes } from '@angular/router';
import { SimpleViewComponent } from 'src/app/simple-view/SimpleViewComponent';
import { TestingViewComponent } from 'src/app/testing-view/TestingViewComponent';

const routes: Routes = [
	{ path: 'simple-view', component: SimpleViewComponent },
	{ path: 'testing-view', component: TestingViewComponent },
	{ path: '',   redirectTo: '/simple-view', pathMatch: 'full' },
	{ path: '**', redirectTo: '/simple-view', pathMatch: 'full' },
];

@NgModule({
	declarations: [
		AppComponent,
		LinkContainerComponent,
		LinkDirective,
		BarComponent,
		SimpleViewComponent,
		TestingViewComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
