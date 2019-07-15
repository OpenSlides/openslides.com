import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
    private path = "assets/img/features/";
    public routes: Object = {
        agenda: {
            title: "Tagesordnung",
            icon: "calendar_today",
            intro: "Bleiben Sie flexibel: Ergänzen, ändern oder verschieben Sie Tagesordnungspunkte im laufenden Betrieb.",
            images: [
                `${this.path}agenda-list_de.png`,
                `${this.path}agenda-list-of-speakers_de.png`,
                `${this.path}agenda-list-of-speakers-projector_de.png`,
                `${this.path}agenda-projector_de.png`,
                `${this.path}agenda-edit_de.png`
            ],
            details: [
                "Redelisten für jeden Tagesordnungspunkt.",
                "Die aktuelle Redeliste stets im Blick (als Überblendung oder auf einem 2. Projektor).",
                "Countdowns zur Redezeitbeschränkung.",
                "Automatische Nummerierung von Tagesordnungspunkten.",
                "Zeitplanung: Dauer pro Tagesordnungspunkt schätzen.",
                "Inoffizielle Tagesordnungspunkte (z. B. Pausen) in die Tagesordnung integrieren.",
                "Abgeschlossene Tagesordnungspunkte markieren und verstecken.",
                "Tagesordnung als PDF exportieren.",
                "Projektor über die Seitenleiste steuern.",
                "Tagesordnung per Drag&Drop sortieren."
            ],
            order: 1
        },
        motions: {
            title: "Anträge",
            icon: "note",
            intro: "Sparen Sie Papier: Erfassen und verwalten Sie Anträge und Abstimmungsergebnisse digital.",
            images: [
                `${this.path}motions-list_de.png`,
                `${this.path}motions-detail_de.png`,
                `${this.path}motions-projector_de.png`,
                `${this.path}motions-pdf_de.png`
            ],
            details: [
                "Anträge mit Zeilennummern verwalten.",
                "Anpassbare Antrag-Statusmeldungen und -Arbeitsabläufe.",
                "Sachgebiete, Antragsblöcke und Schlagwörter verwalten.",
                "Erforderlichen Unterstützern pro Antrag definieren.",
                "Unterstützung für Änderungsanträge und Änderungsempfehlungen.",
                "Anzeigen/Verstecken von Anträgen in der Tagesordnung.",
                "Versionshistorie zur Verwaltung der Antragsänderungen.",
                "HTML-Inline-Editor zum Formatieren von Antragstext und -begründung.",
                "Kommentarfelder für Anträge erlauben.",
                "Abstimmungsergebnisse erfassen.",
                "Anträge als PDF, CSV und DOCX exportieren."
            ],
            order: 2
        },
        elections: {
            title: "Wahlen",
            icon: "pie_chart",
            intro: "Beschleunigen Sie das Prozedere: Generieren Sie ad-hoc Stimmzettel für Ihre geheime Wahlen.",
            images: [
                `${this.path}elections-list_de.png`,
                `${this.path}elections-detail_de.png`,
                `${this.path}elections-projector_de.png`,
                `${this.path}elections-ballot-pdf_de.png`
            ],
            details: [
                "Kandidaten aus der Teilnehmenden-Liste vorschlagen.",
                "Personalisierte Wahlscheine für geheime Wahlen drucken.",
                "Unterstützte Wahlverfahren: Ja/Nein/Enthaltung oder eine Stimme pro Kandidat.",
                "Calculated percentages on different 100% bases.",
                "Mehrere Wahlgänge.",
                "Wahlergebnisse eingeben und mit Diagramm projizieren.",
                "Wahlen (mit allen Ergebnissen) als PDF exportieren."
            ],
            order: 3
        },
        projectors: {
            title: "Projektoren",
            icon: "videocam",
            intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            images: [
                `${this.path}elections-list_de.png`,
                `${this.path}elections-detail_de.png`,
                `${this.path}elections-projector_de.png`,
                `${this.path}elections-ballot-pdf_de.png`
            ],
            details: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            ],
            order: 3
        },
        miscellaneous: {
            title: "Weitere Funktionen",
            icon: "search",
            intro: "",
            images: [
                `${this.path}general-users-list_de.png`,
                `${this.path}general-files-list_de.png`,
                `${this.path}general-chat-frontpage_de.png`,
                `${this.path}general-windows-portable.png`
            ],
            details: [
                "Mehrere Projektoren erstellen.",
                "Teilnehmende, Gruppen und Berechtigungen verwalten.",
                "Dokumentenablage mit PDF-, Bild- und Video-Projektion.",
                "CSV-Import und -Export für Tagesordnung, Anträge und Teilnehmende.",
                "Gruppenchat.",
                "Anpassbare Startseite.",
                "Volltextsuche.",
                "Anpassbares Projektor-Template.",
                "Responsive Design.",
                "Portable Version für Windows.",
                "Mehrsprachigkeit (Englisch, Deutsch, Französisch, Tschechisch, Portugiesisch, Spanisch und Russisch).",
                "OpenSlides ist eine plattformunabhängige Webanwendung basierend auf Python 3 und AngularJS mit einer REST-API."
            ],
            order: 4
        }
    };

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.setData();
            }
        });
        this.setData();
    }

    private setData() {
        let url = this.route.snapshot.url;
        let data = this.routes[url[url.length - 1].path];
        for (let key in data) {
            this[key] = data[key];
        }
    }
}
