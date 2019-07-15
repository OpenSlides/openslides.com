import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';


// Define here new languages...
export const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'cs', name: 'Český' },
    { code: 'ru', name: 'русский' },
];

/**
 * Custom url matcher to manage language prefixes.
 * If url starts with a valid language code, consume the language part and continue with routing.
 * Otherwise, returns null, so route doesn't match and default route is used (see routing module).
 */
const langRegEx = new RegExp("^(" + languages.map(e => e.code).join("|") + ")$");    // class attr so mapping is only done once
export function LanguageUrlMatcher(url: UrlSegment[]) {
    return url.length && url[0].path.match(langRegEx) ? { consumed: url.slice(0, 1) } : null;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements CanActivate {

    constructor(private router: Router) {}

    /**
     * get detected browser language code
     */
    public getBrowserLanguage() {
        var lang = navigator.language || navigator["userLanguage"]; // IE fallback
        if (lang.indexOf('-') !== -1)
            lang = lang.split('-')[0];
        if (lang.indexOf('_') !== -1)
            lang = lang.split('_')[0];
        return lang;
    }

    /**
     * Helper function because languages has to be static because the UrlMatcher has to static
     * to be accessible in the routing module.
     */
    public getLanguages() {
        return languages;
    }

    /**
     * Extracts the current language from the url.
     */
    public getCurrentLanguage() {
        try {
            return this.router.url.match(/^\/(..)/)[1];   // match the language part of the url. At index 1 is the search group result
        } catch {
            return this.getBrowserLanguage();
        }
    }

    /**
     * set current language and return updated languages object array
     */
    public setCurrentLanguage(lang: string) {
        this.router.navigate([lang].concat(this.router.url.split(/#|\?/)[0].split("/").slice(2)));  // slice(2) cause the url is /xx/page so the array is ["", "xx", "page"] and we only want to keep the page, not the language
    }

    /**
     * Acts as a Guard for routing. Redirects to the browser default language.
     */
    public canActivate(route: ActivatedRouteSnapshot): boolean {
        this.router.navigate([this.getCurrentLanguage()].concat(route.url.map(e => e.path)), {
            fragment: route.fragment,
            queryParams: route.queryParams,
            // queryParamsHandling: "merge" // not working...
            // preserveFragment: true,
        });
        return false;
    }
}