import { Component, OnInit } from '@angular/core';
import { ScrollSpyService } from '../scroll-spy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    public currentSection = "";

    constructor(private service: ScrollSpyService, private router: Router) {}

    ngOnInit() {
        const $this = this;
        this.service.sectionChange.subscribe(function(id: string) {
            console.log(id);
            $this.currentSection = id;
        });
    }
}
