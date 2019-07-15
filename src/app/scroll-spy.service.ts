import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
    public sectionChange = new EventEmitter<string>();

    constructor() { }
}
