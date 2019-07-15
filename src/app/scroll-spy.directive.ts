import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
    selector: '[scrollSpy]'
})
export class ScrollSpyDirective implements OnInit {
    private currentSection = null;
    private STICKY_HEADER_HEIGHT = 64;
    private MIN_VISIBLE_PIXELS = 100;
    private MIN_VISIBLE_PERC = 0.5;

    constructor(private _el: ElementRef, private service: ScrollSpyService, private router: Router) {}


    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentSection = "";
                this.service.sectionChange.emit(this.currentSection);
            }
        });
    }

    @HostListener('window:scroll', [])
    onScroll() {
        let max = 0, maxID = "";
        const children = this._el.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            const lower = Math.max(window.scrollY + this.STICKY_HEADER_HEIGHT, element.offsetTop);
            const upper = Math.min(window.scrollY + window.innerHeight, element.offsetTop + element.scrollHeight);
            const visiblePixels = Math.max(upper - lower, 0);
            const visiblePerc = visiblePixels / element.scrollHeight;
            if (element.id && visiblePerc > max && 
                (visiblePixels >= this.MIN_VISIBLE_PIXELS || visiblePerc >= this.MIN_VISIBLE_PERC)) {
                max = visiblePerc;
                maxID = element.id;
            }
        }
        if (maxID !== this.currentSection) {
            this.currentSection = maxID;
            this.service.sectionChange.emit(this.currentSection);
        }
    }
}
