import { DOCUMENT } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy } from '@angular/core'
import { delayWhen, Subject, takeUntil, timer } from 'rxjs'

interface Coords {
  x: number
  y: number
}

interface CoordsAndDelay extends Coords {
  // delay
  d: number
}

@Component({
  selector: 'app-floating-head',
  templateUrl: './floating-head.component.html',
  styleUrls: ['./floating-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingHeadComponent implements AfterViewInit, OnDestroy {
  /**
   *  speed in px per s
   */
  private speed = 200

  /**
   * width of the head
   */
  private w = Math.random() * 150 + 30

  private state$: Subject<CoordsAndDelay> = new Subject()

  private destroy$ = new Subject<void>()

  private get nativeEl(): HTMLElement {
    return this.elRef.nativeElement
  }
  private get elWidth() {
    return this.nativeEl.clientWidth
  }
  private get elHeight() {
    return this.nativeEl.clientHeight
  }
  private get clientWidth() {
    return this.document.body.clientWidth
  }
  private get clientHeight() {
    return this.document.body.clientHeight
  }

  constructor(private elRef: ElementRef, @Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit() {
    this.nativeEl.style.width = `${this.w}px`

    // interval(100).subscribe(() => console.log(this.nativeEl.offsetTop))

    this.state$
      .pipe(
        takeUntil(this.destroy$),
        delayWhen(({ d }) => timer(d))
      )
      .subscribe(({ x, y }) => {
        const next = this.getNextGoal({ x, y })
        this.setPosition(next.x, next.y)
        this.nativeEl.style.transitionDuration = `${next.d}ms`
        this.state$.next(next)
      })

    // set initial randon position
    const initialState = { x: this.xPosition(), y: this.yPosition(), d: 0 }
    this.setPosition(initialState.x, initialState.y)
    this.state$.next(initialState)
  }

  private setPosition(x: number, y: number) {
    this.nativeEl.style.left = `${x}px`
    this.nativeEl.style.top = `${y}px`
  }

  private getNextGoal(lastGoal: Coords) {
    const { x: lastX, y: lastY } = lastGoal
    const lastEdge = lastX === 0 ? 'w' : lastX >= this.xPosition(1) ? 'e' : lastY === 0 ? 'n' : 's'

    const nextEdge = ['w', 'e', 'n', 's'].filter((e) => e !== lastEdge)[Math.floor(Math.random() * 2.999)]

    let nextGoal: Coords

    switch (nextEdge) {
      case 'w':
        nextGoal = {
          x: this.xPosition(0),
          y: this.yPosition(),
        }
        break
      case 'e':
        nextGoal = {
          x: this.xPosition(1),
          y: this.yPosition(),
        }
        break
      case 'n':
        nextGoal = {
          x: this.xPosition(),
          y: this.yPosition(0),
        }
        break
      case 's':
        nextGoal = {
          x: this.xPosition(),
          y: this.yPosition(1),
        }
        break
      default:
        nextGoal = null
    }

    const distance = this.getDistance(lastGoal, nextGoal)
    console.log('distance', distance)
    const d = (distance / this.speed) * 1000

    return {
      ...nextGoal,
      d,
    }
  }

  /**
   * Returns the distance between tow coords
   */
  private getDistance(a: Coords, b: Coords) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
  }

  private xPosition(seed = Math.random()) {
    return seed * this.clientWidth - this.elWidth * seed
  }

  private yPosition(seed = Math.random()) {
    return seed * this.clientHeight - this.elHeight * seed
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }
}
