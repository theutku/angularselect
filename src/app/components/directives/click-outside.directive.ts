import { Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, fromEvent, pipe, Subscription, } from 'rxjs';
import { delay, withLatestFrom, tap } from 'rxjs/operators';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
    private listening: boolean;
    private globalClick: Observable<MouseEvent>;
    private globalClickSubscription: Subscription;

    @Output('clickOutside') clickOutside: EventEmitter<Object>;

    constructor(private _elRef: ElementRef) {
        this.listening = false;
        this.clickOutside = new EventEmitter();
    }

    ngOnInit() {
        this.globalClick =
            fromEvent(document, 'click')
                .pipe(tap((event: MouseEvent) => {
                    this.listening = true;
                    return event;
                }));

        this.globalClickSubscription = this.globalClick.subscribe((event: MouseEvent) => {
            this.onGlobalClick(event);
        });
    }

    ngOnDestroy() {
        this.globalClickSubscription.unsubscribe();
    }

    onGlobalClick(event: MouseEvent) {
        if (event instanceof MouseEvent && this.listening === true) {
            if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
                this.clickOutside.emit({
                    target: (event.target || null),
                    value: false
                });
            } else {
                this.clickOutside.emit({
                    target: (event.target || null),
                    value: true
                });
            }
        }
    }

    isDescendant(parent, child) {
        let node = child;
        while (node) {
            if (node === parent) {
                return true;
            } else {
                node = node.parentNode;
            }
        }
        return false;
    }
}
