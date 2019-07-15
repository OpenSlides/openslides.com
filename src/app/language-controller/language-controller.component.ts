import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-language-controller',
  templateUrl: './language-controller.component.html',
  styleUrls: ['./language-controller.component.scss']
})
export class LanguageControllerComponent {
    constructor(public languageService: LanguageService) {};
}