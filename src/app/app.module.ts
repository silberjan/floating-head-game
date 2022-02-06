import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FloatingHeadModule } from 'src/lib/floating-head/floating-head.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FloatingHeadModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
