import { Directive, Input, ElementRef, AfterViewChecked, OnInit } from "@angular/core";

@Directive({
    selector: '[autoPosition]'
})
export class AutoPositionDirective implements AfterViewChecked, OnInit {
    @Input() positionTarget: HTMLElement;

    @Input() containerTarget: string | HTMLElement | ElementRef;

    constructor(private elRef: ElementRef) {

    }

    ngOnInit() {
        if (this.containerTarget && this.positionTarget && this.elRef) {
            if (typeof this.containerTarget === 'string') {
                let targetElement = <HTMLElement>document.querySelector(this.containerTarget);
                targetElement.appendChild(this.positionTarget);
                this.positionTop();
            } else if (this.containerTarget instanceof HTMLElement) {
                this.containerTarget.appendChild(this.positionTarget);
                this.positionTop();
            } else {
                let targetElement = <HTMLElement>this.containerTarget.nativeElement;
                targetElement.appendChild(this.positionTarget);
                this.positionTop();
            }
        }
    }

    ngAfterViewChecked() {
        if (this.positionTarget && this.elRef) {
            let rects = <DOMRect>this.elRef.nativeElement.getBoundingClientRect();
            this.positionTarget.style.left = rects.width + 'px';
        }
    }

    private positionTop() {
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let rects = <DOMRect>this.elRef.nativeElement.getBoundingClientRect();

        this.positionTarget.style.top = (rects.bottom + 5) + 'px';
        this.positionTarget.style.zIndex = "99999";
    }

}