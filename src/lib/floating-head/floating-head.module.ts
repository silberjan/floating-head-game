import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FloatingHeadComponent } from './floating-head.component'

@NgModule({
  declarations: [FloatingHeadComponent],
  imports: [CommonModule],
  exports: [FloatingHeadComponent],
})
export class FloatingHeadModule {}
