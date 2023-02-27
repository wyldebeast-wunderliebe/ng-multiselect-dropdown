import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

	// make this work when used inside a shadowRoot
	let fixedTarget = event.componsedPath()[2];

        const clickedInside = this._elementRef.nativeElement.contains(fixedTarget);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}
