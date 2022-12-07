import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export interface FeatureDescription {
    title: string;
    icon?: string;
    intro: string;
    image_names: string[];
    details: string[];
}

export const FeaturesByRoute: { [route: string]: FeatureDescription } = {
    committees: {
        title: _('Gremienmanagement'),
        icon: 'apps',
        intro: _(
            'Bilden Sie ihre Organisationsstruktur ab, legen sie Freigaben fest und erstellen Sie beliebig viele Veranstaltungen unter einer URL.\
            <p>» <a class="inline" href="https://files.openslides.org/docs/Gremienmanagement-OS4.pdf" target="_blank">Schaubild: Gremienmanagement und Antragsweiterleitung in OS4</a><br>\
            » <a class="inline" href="https://files.openslides.org/docs/Rollen-und-Rechte-OS4.pdf" target="_blank">Schaubild: Rollen & Rechte in OS4</a>'
        ),
        image_names: ['calendar', 'list', 'details'],
        details: [
            _('Verwaltung von Gremienstrukturen'),
            _('Veranstaltungen anlegen, duplizieren, archivieren und löschen'),
            _('Vergabe von komplexen Administrationsrollen (Superadmin, Organisationsadmin, Accountadmin, Veranstaltungsadmin)'),
            _('globale Account-Verwaltung mit Zuweisung in Veranstaltungen'),
            _('Weiterleitungsoptionen von Anträge zwischen Gremien'),
            _('Farbdesign an eigenes CI anpassbar'),
            _('neues Profilmenü mit Dark-Theme-Möglichkeit'),
        ]
    },
    autopilot: {
        title: _('Autopilot'),
        icon: 'apps',
        intro: _(
            'Der Autopilot ist das Tool zur schnellen Navigation und Interaktion für Teilnehmende. Er bietet Teilnehmenden die Möglichkeit kompakte Informationen zum aktuellen Tagesordnungspunkt zu erhalten und gleichzeitig interaktiv am Veranstaltungsgeschehen teilzunehmen.'
        ),
        image_names: ['overview'],
        details: [
            _('Anzeige von aktuellen Tagesordnungspunkten und Redelisten'),
            _('direkter Aufruf des aktuellen Tagesordnungspunktes/Antrags'),
            _('Einreichung von Redebeiträgen oder GO-Anträgen durch Teilnehmende'),
            _('Klassifizierung von Redebeiträgen (Einbringung, Für-/Gegenrede) durch Teilnehmende'),
            _('Verwaltung der aktuellen Redeliste'),
            _('Stimmabgabe bei Antragsastimmungen, Personenwahlen und Umfragen')
        ]
    },
    agenda: {
        title: _('Tagesordnung'),
        icon: 'calendar_today',
        intro: _(
            'Bleiben Sie flexibel: Ergänzen, ändern oder verschieben Sie Tagesordnungspunkte im laufenden Betrieb.'
        ),
        image_names: ['overview', 'new-item'],
        details: [
            _('Flexibles Hinzufügen von Tagesordnungspunkten für jegliche Inhalte'),
            _('Automatische Nummerierung von Tagesordnungspunkten'),
            _('Abgeschlossene Tagesordnungspunkte markieren'),
            _('Individuelle Sichtbarkeiten für jeden Tagesordnungspunkt'),
            _('Inoffizielle Tagesordnungspunkte (z. B. Pausen) in die Tagesordnung integrieren'),
            _('Zeitplanung: geschätzte Dauer pro Tagesordnungspunkt ergänzen'),
            _('Tagesordnung als PDF exportieren'),
            _('Tagesordnung per Drag&Drop sortieren'),
            _('elektronische Umfragen mit freien Abstimmungsoptionen (ab 4.0)')
        ]
    },
    los: {
        title: _('Redeliste'),
        icon: 'record_voice_over',
        intro: _(
            'Nutzen Sie die Redeliste zur Verwaltung ihrer Redebeiträge. Erfassen sie sekundengenau Redezeiten und legen sie per Countdown Redezeiten fest. Das Highlight für die Bildregie: automatisierte Bauchbinden der Redner*innen.'
        ),
        image_names: ['list', 'projection'],
        details: [
            _('Separate Redeliste für jeden Tagesordnungspunkt/Antrag/Wahl'),
            _('Teilnehmende können sich selbstständig auf Redeliste listen'),
            _('Countdown zur Redezeitbegrenzung'),
            _('Geschäftsordnungsantrag als priorisierten Redebeitrag inkl. Anliegen'),
            _('Markierung von Redebeiträgen als Für-/Gegenrede oder (Antrags-)Einbringung'),
            _('Erfassung von Redezeit sowie Anzahl der Redebeiträge pro Person'),
            _('automatisierte Verwendung des aktuellen Redner*innennamens in einer Bauchbinde'),
            _('Sortieren von Redebeiträgen per Drag&Drop'),
            _('Projektion von Redelisten (als Vollbild oder Einblendung)')
        ]
    },
    motions: {
        title: _('Anträge'),
        icon: 'note',
        intro: _('Sparen Sie Papier: Erfassen und verwalten Sie Anträge und Abstimmungsergebnisse digital.'),
        image_names: ['overview', 'detail', 'projected', 'pdf'],
        details: [
            _('Anpassbare Antrag-Statusmeldungen und -Arbeitsabläufe'),
            _('Arbeitsablauf im- und exportierbar; Statusspalten sortierbar (ab 4.0)'),
            _('Anträge in Sachgebieten, Antragsblöcken und Schlagwörtern kategorisieren'),
            _('Anträge automatisch in Sachgebieten und Untersachgebieten nummerieren'),
            _('Sortierung von Anträgen in einer Aufrufliste'),
            _('Anträge unterstützen/mitzeichnen'),
            _('Startzeilennummer pro Antrag definierbar (ab 4.0)'),
            _('Anträge an Veranstaltungen weiterleiten (ab 4.0)'),
            _('Änderungsanträge und Änderungsempfehlungen auf Basis von Zeilennummern erstellen'),
            _('HTML-Editor zum Formatieren von Antragstext und -begründung'),
            _('(gruppenbezogene) Kommentarfelder konfigurierbar'),
            _('Hinzufügen von Anträgen in die Tagesordnung'),
            _('Verknüpfung von Anträgen mit hochgeladen Dateien'),
            _('Durchführung von elektronischen Abstimmungen (namentlich oder nicht-namentlich)'),
            _('analoge Abstimmungsergebnisse erfassen'),
            _('Anträge als PDF, CSV und XLSX exportieren'),
            _('PDF-Export von mehreren Anträgen als Fließtext mit fortlaufender Zeilennummerierung'),
            _('Layout, Schriftart und Logo vom PDF-Export anpassbar (z. B. Seitenränder, Schriftgröße)')
        ]
    },
    elections: {
        title: _('Wahlen'),
        icon: 'donut_large',
        intro: _('Beschleunigen Sie das Prozedere: Erstellen und starten Sie ad-hoc elektronische Wahlgänge.'),
        image_names: ['overview', 'detail', 'pdf'],
        details: [
            _('Kandidaten aus der Teilnehmenden-Liste vorschlagen'),
            _('Unterstützte Wahlverfahren: Ja/Nein/Enthaltung · Ja pro Kandidat · Nein pro Kandidat · Ja/Nein pro Kandidat, plus weitere generelle Wahloptionen (Enthaltung, Ablehnung, Zustimmung)'),
            _('Neue Stimmabgabeoption: mehrere Stimmen auf einen Kandidaten erlauben (kumulieren) (ab 4.0)'),
            _('Wahlergebnisse auf Grundlage verschiedener 100%-Basen'),
            _('Mehrere Wahlgänge (z. B. Stichwahlen)'),
            _('elektronische Stimmabgabe möglich'),
            _('Dauer der Stimmgabe wählbar: kurzlaufend (Live Voting) oder langlaufend (Umlaufverfahren) (ab 4.0)'),
            _('analoge Wahlstimmzettel als PDF generierbar'),
            _('ausgezählte Wahlergebnisse erfassen und projizieren'),
            _('Wahlen (mit allen Ergebnissen) als PDF exportieren')
        ]
    },
    users: {
        title: _('Teilnehmende'),
        icon: 'groups',
        intro: _('Verwalten Sie zentral auf Organisationsebene alle Accounts. Vergeben Sie Adminrechte zur Verwaltung von Gremien und Veranstaltungen. Legen Sie komplexe Nutzerrechte in Gruppen fest und bestimmen Sie, welche Person worauf Zugriff hat. Erfassen Sie effizient die Anwesenheit von Teilnehmenden in Veranstaltung – ihre Mandatsprüfungskommission wird begeistert sein.'),
        image_names: ['groups'],
        details: [
            _('Verwaltung von Teilnehmenden auf Organisations- und/oder Veranstaltungsebene (ab OS 4.0)'),
            _('Erstellung von Gruppen mit frei definierbaren Nutzungsrechten'),
            _('veranstaltungsübergreifende Nutzung von Accounts (ein zentraler Login) (ab OS 4.0)'),
            _('Einfache Erstellung von neuen Accounts per Einzelerstellung oder via CSV-Import auf Organisations- und/oder Veranstaltungsebene'),
            _('Erfassung der Anwesenheit und Export von Teilnehmendenliste (z. B. zur Mandatsprüfung)'),
            _('Stimmgewicht und Stimmrechtsübertragungen einstellbar'),
            _('Versand von Zugangsdaten per E-Mail mit anpassbarer Einladungstext'),
            _('vielseitige Filter- und Sortierfunktionen in der Teilnehmendenliste'),
            _('CSV-Import und -Export für Teilnehmende'),
            _('Zugangsdaten- und Begrüßungs-PDF-Export')
        ]
    },
    projectors: {
        title: _('Projektoren'),
        icon: 'videocam',
        intro: _('Live dabei: Zeigen Sie den Teilnehmenden gerade diskutierte Inhalte auf Projektionsflächen.'),
        image_names: ['overview', 'detail', 'chyron'],
        details: [
            _('Sofortige Aktualisierung bei Änderungen'),
            _('Unterstützung mehrerer Projektoren'),
            _('Individuelle Projektorgestaltung mit eigenem Logo und Farben'),
            _('Individuelle Countdowns und Mitteilungen einblendbar'),
            _('Einbindung von Redebeiträgen (Namen) als Bauchbinde'),
            _('Anordnen von Inhalten in einer Warteschlange'),
            _('Projektionshistorie durch einen Verlauf im Überblick behalten'),
            _('Unterstützung verschiedener Auflösungen'),
            _('Projektion von PDF- oder Bilddateien')
        ]
    },
    evoting: {
        title: _('Elektronische Stimmabgabe'),
        intro: _(
            'Nutzen Sie das integrierte elektronische Abstimmungssystem: Legen Sie die stimmberechtigte Nutzergruppe fest.\
             Nur in OpenSlides auf anwesend und stimmberechtigt geschaltete Teilnehmende dürfen abstimmen. \
             Möglich sind namentliche oder nicht-namentliche Antragsabstimmungen,Personenwahlen und Umfragen. \
             Mit OpenSlides sind rechtssichere, geheime Stimmabgaben möglich. \
             Ein <a class="inline" href="https://files.openslides.org/docs/Gutachten_Geheime-Wahlen-mit-OpenSlides3_20210325.pdf" target="_blank">Rechtsgutachten</a> liegt vor. \
             <p>Testen Sie die elektronische Stimmabgabe in der <a class="inline" href="https://demo.os4.openslides.com" target="_blank">Online-Demo</a>.'
        ),
        image_names: [
            'motion-active-voting',
            'motion-singlevotes',
            'election1-vote',
            'election2-confirm',
            'election3-result'
        ],
        details: [
            _(
                'rechtssichere Antragsabstimmungen (Ja/Nein/Enthaltung) und Personenwahlen (1-aus-n oder n-aus-m) möglich'
            ),
            _('namentliche (wer hat wie abgestimmt) und nicht-namentliche (anonyme) Stimmabgaben möglich'),
            _('stimmberechtigte Nutzergruppe(n) pro Abstimmung/Wahlgang festlegbar'),
            _('Nur in OpenSlides auf anwesend und stimmberechtigt geschaltete Teilnehmende dürfen abstimmen'),
            _('Individuelle Stimmgewichtungen pro Nutzer aktivierbar'),
            _('Stimmrechtsübertragungen (Vollmachtgeber und Vollmachtnehmer) einstellbar'),
            _('Einzelstimmennachweise für namentliche Stimmabgaben')
        ]
    },
    livestream: {
        title: _('Video-Livestream'),
        intro: _(
            'Integrieren Sie einen Video-Livestream Ihrer virtuellen Veranstaltung in OpenSlides.\
        Alle Teilnehmenden verfolgen den Stream jederzeit sichtbar in OpenSlides. Möchte sich eine Person zu Wort melden, setzt sich diese selbständig auf die aktuelle Redeliste in OpenSlides und wechselt damit automatisch in einen Jitsi-Videokonferenzraum.\
        Der Livestream überträgt die Videokonferenz. Nach Ende der Wortmeldung verlässt man den Konferenzraum und verfolgt wieder den Livestream.\
        <p>Dieses Verfahren ist sehr bandbreitenschonend (im Vergleich zu reinen Videokonferenzen) und erlaubt eine große Skalierung an Teilnehmerzahlen.\
        Virtuelle Veranstaltungen mit mehreren hundert Personen sind damit kein Problem mehr.\
        Hinzu kommt, dass die meisten Teilnehmenden eine Veranstaltung nur "konsumierend" verfolgen, d.h. nur ein kleiner Personenkreis sich aktiv mit Mikrofon und Kamera zu Wort meldet.\
        Setzen Sie auf bewährte Broadcast-Streaming-Lösung – intelligent gekoppelt mit der OpenSlides-Redelistenfunktion.\
        <p>Funktionsweise in Kurzanimation: <a href="https://files.openslides.org/press/3.2/OpenSlides3.2-Videokonferenz.gif" class="inline">Video-Livestream</a>'
        ),
        image_names: ['autopilot', 'jitsi-dialog'],
        details: [
            _('Anzeige des Livesstreams im Vordergrund (auch minimierbar oder im Vollbild nutzbar)'),
            _('Automatische Übertragung des aktuellen Redners in den Livestream'),
            _(
                'intelligente Koppelung mit der Redeliste (nur Personen auf der Redeliste dürfen in die Videokonferenz eintreten)'
            ),
            _('bandbreitenschonende Broadcast-Technik mit extrem niedriger Latenz (auch für sehr große virtuelle Veranstaltungen nutzbar)'),
            _('frei anpassbare Applaus-Funktion für Teilnehmende'),
            _('virtueller Help-Desk-Raum (z. B. zur technischen Prüfung der Teilnehmenden vor Redebeiträgen)')
        ]
    },
    misc: {
        title: _('Weitere Funktionen'),
        intro: _('Seien Sie neugierig: Entdecken Sie noch viele weitere Funktionen von OpenSlides.'),
        image_names: ['chat', 'files', 'history'],
        details: [
            _('Live-Änderungen direkt miterleben'),
            _('konfigurierbare Chatgruppen'),
            _('Umfangreiche Dateiverwaltung mit Zugriffsberechtigungen pro Datei und Ordner'),
            _('Chronik für Anträge, Wahlen und Teilnehmenden (ab 4.0)'),
            _('Umfangreiche Sortier- und Filtermöglichkeiten aller Listen'),
            _('Mehrsprachigkeit (Englisch, Deutsch, Spanisch, Italienisch, Tschechisch und Russisch)'),
            _('Benutzerdefinierte Übersetzungen: einfache Anpassung aller Begriffe nach individuellen Anforderungen pro Veranstaltung (z. B. Änderung von "Anträge" in "Beschlüsse".) '),
            _('Webanwendung basierend auf Python, Go und Angular im modernen Material Design'),
            _('Responsive Design'),
            _('Progressive WebApp ermöglicht Vollbild-App unter Android und iOS')
        ]
    }
};
