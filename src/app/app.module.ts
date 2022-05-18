import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BarComponent } from 'src/app/bar/BarComponent';
import { LinkDragEndDirective } from 'src/app/link-dnd/LinkDragEndDirective';
import { LinkDragService } from 'src/app/link-dnd/LinkDragService';
import { LinkDragStartDirective } from 'src/app/link-dnd/LinkDragStartDirective';
import { LinkContainerComponent } from 'src/app/links/LinkContainerComponent';
import { LinkDirective } from 'src/app/links/LinkDirective';
import { SimpleViewComponent } from 'src/app/simple-view/SimpleViewComponent';
import { TestingViewComponent } from 'src/app/testing-view/TestingViewComponent';
import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: 'simple-view', component: SimpleViewComponent },
	{ path: 'testing-view', component: TestingViewComponent },
	{ path: '', redirectTo: '/simple-view', pathMatch: 'full' },
	{ path: '**', redirectTo: '/simple-view', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		AppComponent,
		LinkContainerComponent,
		LinkDirective,
		BarComponent,
		SimpleViewComponent,
		TestingViewComponent,

		LinkDragStartDirective,
		LinkDragEndDirective
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [LinkDragService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
