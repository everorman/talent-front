import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreComponent } from './components/core/core.component';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { MappingTextComponent } from './components/mapping-text/mapping-text.component';

@NgModule({
  declarations: [AppComponent, CoreComponent, MappingTextComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
