import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { DateAdapter } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private currentYear = (new Date()).getFullYear();

    constructor(private router: Router, private scroller: ViewportScroller, private dateAdapter: DateAdapter<any>) {}

    ngOnInit() {
        this.scroller.setOffset([0, 64]);
        this.dateAdapter.setLocale("de");
    }
}
