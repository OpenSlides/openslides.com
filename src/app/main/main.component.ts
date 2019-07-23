import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private references = [
        { img: "assets/img/references/gruene-logo.png",  name: "Bündnis 90/Die Grünen" },
        { img: "assets/img/references/spd-logo.png",  name: "SPD" },
        { img: "assets/img/references/linke-logo.png",  name: "Die LINKE" },
        { img: "assets/img/references/piraten-logo.png",  name: "PiratenPartei" },
        { img: "assets/img/references/gruene-jugend-logo.png",  name: "Grüne Jugend" },
        { img: "assets/img/references/jusos-logo.png",  name: "JUSOS" },
        { img: "assets/img/references/linksjugend-logo.png",  name: "linksjugend" },
        { img: "assets/img/references/pog-logo.png",  name: "Piraten ohne Grenzen" }
    ];
    private images = [
        { caption: "<b>Lorem</b> ipsum", href: "/feature/agenda", url: "assets/img/features/agenda-list_de.png" },
        { caption: "Lorem ipsum", href: "/feature/motions", url: "assets/img/features/agenda-list-of-speakers_de.png" },
        { caption: "Lorem ipsum", href: "/feature/elections", url: "assets/img/features/agenda-list-of-speakers-projector_de.png" },
        { caption: "Lorem ipsum", href: "/feature/projectors", url: "assets/img/features/agenda-projector_de.png" }
    ];
    private quotes_source = [
        { author: "BÜNDNIS 90/DIE GRÜNEN, Landesverband Hamburg", text: "Wir sehen in OpenSlides ein innovatives Open Source Produkt, das dabei hilft, unsere demokratischen, innerparteilichen Strukturen in das digitale Zeitalter zu transportieren." },
        { author: "Evangelischer Kirchenkreis Krefeld-Viersen", text: "OpenSlides unterstützt uns schon bei der Planung unserer Kreissynoden durch die strukturierte Eingabe der Tagesordnung, der Anträge und Wahlen. Während der Veranstaltung bleiben wir immer flexibel und können situationsbedingt 'Folien' ein- und ausblenden." },
        { author: "Sächsische Landesärztekammer", text: "Eine Software ist auf Dauer nur so gut wie seine Entwickler. Wir gehen davon aus, mit der Firma Intevation und Herrn Schütze auf Dauer einen kompetenten und verlässlichen Partner an unserer Seite zu haben." },
    ];
    private quotes = [];

    ngOnInit() {
        this.quotes = [];
        for (let quote of this.quotes_source) {
            this.quotes.push({ caption: `
                <div class="quote-container">
                    <h1>
                        <i>"${quote.text}"</i>
                    </h1>
                    <div class="mt-1">
                        <span>${quote.author}</span>
                    </div>
                </div>
            `});
        }
    }
}