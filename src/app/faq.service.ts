import { Injectable } from '@angular/core';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class FAQService {
    public constructor(protected languageService: LanguageService) {}

    public getUrl(): string {
        const langSuffix = this.languageService.getCurrentLanguage() === 'de' ? 'de-de' : 'en-gb';
        return 'https://support.openslides.com/help/' + langSuffix;
    }
}
