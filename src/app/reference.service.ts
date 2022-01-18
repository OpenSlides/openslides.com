import { Injectable } from '@angular/core';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

export interface ReferenceObject {
    name: string;
    event: string;
    src: string;
    frontpage?: boolean;
}
export interface CategoryObject {
    name: string;
    refs: ReferenceObject[];
}

@Injectable({
    providedIn: 'root'
})
export class ReferenceService {
    public references: CategoryObject[] = [
        {
            name: _('Gewerkschaften'),
            refs: [
                {
                    name: 'Deutscher Gewerkschaftsbund (DGB)',
                    event: 'Bundeskongress 2018, Bundesjugendkonferenz, Bezirkskonferenzen',
                    src: 'dgb-logo.png',
                    frontpage: true
                },
                {
                    name: 'ver.di',
                    event: 'Bundeskongress 2019, Bundesjugendkonferenz',
                    src: 'verdi-logo.png',
                    frontpage: true
                },
                {
                    name: 'Industriegewerkschaft Bauen Agrar Umwelt (IG BAU)',
                    event: 'Gewerkschaftstag 2017',
                    src: 'igbau-logo.png'
                },
                {
                    name: 'Gewerkschaft der Polizei (GdP)',
                    event: 'Bundeskongress 2018, Bundeskonferenzen der Frauen/Senioren/Jugend 2018',
                    src: 'gdp-logo.png'
                },
                {
                    name: 'Gewerkschaft Nahrung Genuss Gaststätten (NGG)',
                    event: 'Gewerkschaftstag 2018, Bundesjugendkonferenz 2018',
                    src: 'ngg-logo.png'
                },
                {
                    name: 'Gewerkschaft Erziehung und Wissenschaft (GEW)',
                    event: 'Gewerkschaftstag 2021, Landesvertreterversammlungen',
                    src: 'gew-logo.png'
                },
                {
                    name: 'Industriegewerkschaft Bergbau, Chemie, Energie (IG BCE)',
                    event: 'Bundesjugendkonferenz 2021',
                    src: 'igbce-logo.png'
                },
                {
                    name: 'Gewerkschaft Öffentlicher Dienst (Österreich)',
                    event: 'Bundeskongress, Landeskongresse',
                    src: 'goed-logo.png'
                }
            ]
        },
        {
            name: _('Parteien'),
            refs: [
                {
                    name: 'BÜNDNIS 90/DIE GRÜNEN',
                    event: 'Landesparteitage Hamburg / Hessen / Schleswig-Holstein',
                    src: 'gruene-logo.png',
                    frontpage: true
                },
                {
                    name: 'SPD',
                    event: 'Bundesparteitag, Landes-, Bezirks- und Kreisparteitage',
                    src: 'spd-logo.png',
                    frontpage: true
                },
                {
                    name: 'FDP',
                    event: 'Bundes- und Landesparteitage',
                    src: 'fdp-logo.png',
                    frontpage: true
                },
                {
                    name: 'DIE LINKE.',
                    event: 'Bundes-, Landes- und Kreisparteitage',
                    src: 'linke-logo.png'
                },
                {
                    name: 'CDU',
                    event: 'Landesparteitag BaWü',
                    src: 'cdu-logo.png'
                },
                {
                    name: 'SPÖ',
                    event: 'Landesparteitag Oberösterreich, Bundeskonferenz JG',
                    src: 'spoe-logo.png'
                },
                {
                    name: 'Grüne Jugend',
                    event: 'Bundeskongress',
                    src: 'gruene-jugend-logo.png'
                },
                {
                    name: 'Jusos',
                    event: 'Bundeskongress',
                    src: 'jusos-logo.png'
                },
                {
                    name: 'Junge Liberale',
                    event: '1. virtueller Landeskongress der JuLis Bayern',
                    src: 'julis-logo.png'
                },
                {
                    name: 'Linksjugend',
                    event: 'Bundeskongress, Landesmitgliederversammlungen',
                    src: 'linksjugend-logo.png'
                },
                {
                    name: 'Piratenpartei Deutschland / Schweiz',
                    event: 'Bundes-, Landes- und Kreisparteitage',
                    src: 'piraten-logo.png'
                }
            ]
        },
        {
            name: _('Gesundheitswesen'),
            refs: [
                {
                    name: 'Marburger Bund',
                    event: 'Hauptversammlung',
                    src: 'mb-logo.png',
                    frontpage: true
                },
                {
                    name: 'Sächsische Landesärztekammer',
                    event: 'Kammerversammlung',
                    src: 'slaek-logo.png'
                },
                {
                    name: 'Landesärztekammer Hessen',
                    event: 'Delegiertenversammlung',
                    src: 'laekh-logo.png'
                },
                {
                    name: 'Ärztekammer Saarland',
                    event: 'Vertreterversammlung',
                    src: 'aeksaar-logo.png'
                },
                {
                    name: 'Landesärztekammer Brandenburg',
                    event: 'Kammerversammlung',
                    src: 'laekb-logo.png'
                },
                {
                    name: 'Berufsverband der Kinder- und Jugendärzte e.V.',
                    event: 'Delegiertenversammlung',
                    src: 'bvkj-logo.png'
                },
                {
                    name: 'Berufsverband der Augenärzte Deutschlands e.V.',
                    event: 'Delegiertenversammlung',
                    src: 'bva-logo.png'
                },
                {
                    name: 'Deutscher Hebammenverband',
                    event: 'Bundesdelegiertentagung',
                    src: 'dhv-logo.png'
                },
                {
                    name: 'Virchowbund',
                    event: 'Bundeshauptversammlung',
                    src: 'virchowbund-logo.png'
                },
                {
                    name: 'Bundes-Psychotherapeuten-Kammer (BPtK)',
                    event: 'Bundespsychotherapeutentag',
                    src: 'bptk-logo.png'
                },
                {
                    name: 'Kassenzahnärztliche Vereinigung Nordhrein',
                    event: 'Vertreterversammlung',
                    src: 'kzvnr-logo.png'
                }
            ]
        },
        {
            name: _('Jugendverbände'),
            refs: [
                {
                    name: 'Bundesjugendwerk der AWO',
                    event: '(virtuelle) Bundesjugendwerkskonferenz',
                    src: 'bujw-logo.png'
                },
                {
                    name: 'Landesjugendring Rheinland-Pfalz',
                    event: '(virtuelle) Vollversammlung',
                    src: 'ljrrlp-logo.png'
                },
                {
                    name: 'Landesjugendring Niedersachsen',
                    event: 'Vollversammlung',
                    src: 'ljrnds-logo.png'
                },
                {
                    name: 'Landesjugendring Brandenburg',
                    event: 'Vollversammlung',
                    src: 'ljrbbg-logo.png'
                },
                {
                    name: 'Deutsche Pfadfinderschaft Sankt Georg (DPSG)',
                    event: 'Bundesversammlung',
                    src: 'dpsg-logo.png'
                },
                {
                    name: 'Bund der Pfadfinderinnen und Pfadfinder e.V.',
                    event: 'Bundesversammlung',
                    src: 'bdp-logo.png'
                },
                {
                    name: 'Katholische junge Gemeinde',
                    event: 'Bundeskonferenz',
                    src: 'kjg-logo.png'
                },
                {
                    name: 'Bund der Deutschen Katholischen Jugend',
                    event: 'Osnabrück, Trier, München, Berlin, ...',
                    src: 'bdkj-logo.png'
                },
                {
                    name: 'Arbeitsgemeinschaft der Evangelischen Jugend in Deutschland e.V. (aej)',
                    event: 'Mitgliederversammlung',
                    src: 'aej-logo.png'
                },
                {
                    name: 'Evangelische Jugend in Bayern',
                    event: 'Vollversammlung Landesjugendkonvent',
                    src: 'ejb-logo.png'
                },
                {
                    name: 'Evangelische Jugend Oldenburg',
                    event: 'Vollversammlung',
                    src: 'ejo-logo.png'
                },
                {
                    name: 'Junge Europäische Föderalisten Deutschland e.V.',
                    event: 'Bundeskongress',
                    src: 'jef-logo.png'
                },
                {
                    name: 'Dt. Jugendfeuerwehr (LV NDS)',
                    event: 'NJF Jugendforum',
                    src: 'jf-logo.png'
                }
            ]
        },
        {
            name: _('Kirchen'),
            refs: [
                {
                    name: 'Evangelische Kirche in Deutschland',
                    event: 'Synode der EKD',
                    src: 'ekd-logo.png'
                },
                {
                    name: 'Evangelisch-Lutherische Kirche in Norddeutschland',
                    event: 'Landessynode',
                    src: 'nordkirche-logo.png'
                },
                {
                    name: 'Evangelisch-Lutherische Landeskirche Sachsens',
                    event: 'Landessynode',
                    src: 'lk-sachsen-logo.png'
                },
                {
                    name: 'Lippische Landeskirche',
                    event: 'Landessynode',
                    src: 'lk-lippe-logo.png'
                },
                {
                    name: 'Evangelischer Kirchenkreis Krefeld-Viersen',
                    event: 'Kreissynode',
                    src: 'ev-kirche-krefeld-viersen-logo.png'
                }
            ]
        },
        {
            name: _('Sozialverbände'),
            refs: [
                {
                    name: 'AWO',
                    event: 'Bundeskonferenz',
                    src: 'awo-logo.png',
                    frontpage: true
                },
                {
                    name: 'Diakonisches Werk Bayern',
                    event: 'Mitgliederversammlung',
                    src: 'diakonie-logo.png'
                },
                {
                    name: 'Kolpingwerk Deutschland',
                    event: 'Bundesversammlung',
                    src: 'kolping-logo.png'
                },
            ]
        },
        {
            name: _('Sportverbände'),
            refs: [
                {
                    name: 'Volleyball Bundesliga GmbH',
                    event: 'Bundesligaversammlung',
                    src: 'vbl-logo.png'
                },
                {
                    name: 'Deutscher Segler-Verband e.V. (DSV)',
                    event: 'Seglertag, Jugendseglertag',
                    src: 'dsv-logo.png'
                },
                {
                    name: 'Hamburger Sportbund e.V. (HSB)',
                    event: 'Mitgliederversammlung',
                    src: 'hsb-logo.png'
                },
                {
                    name: 'Hamburger Fußball-Verband e.V. (HFV)',
                    event: 'Mitgliederversammlung',
                    src: 'hfv-logo.png'
                },
            ]
        },
        {
            name: _('Hochschulbereich'),
            refs: [
                {
                    name: 'AStA der Universität des Saarlandes',
                    event: 'Studierendenparlament',
                    src: 'asta-uni-saarland-logo.png'
                },
                {
                    name: 'Pädagogische Hochschule Heidelberg',
                    event: 'div. Hochschulgremien',
                    src: 'phhd-logo.png'
                },
                {
                    name: 'Deutsch-Französische Hochschule Saarbrücken',
                    event: 'div. Hochschulgremien',
                    src: 'dfh-logo.png'
                },
                {
                    name: 'Stipendiatinnen und Stipendiaten des Cusanuswerks',
                    event: 'Cusanerkonferenz, Vollversammlung',
                    src: 'cusaner-logo.png'
                },
                {
                    name: 'Evangelische StudentInnengemeinde in der Bundesrepublik Deutschland (ESG)',
                    event: 'Bundesversammlung',
                    src: 'esg-logo.png'
                }
            ]
        },
        {
            name: _('Weitere Verbände, Vereine und Organisationen'),
            refs: [
                {
                    name: 'Amnesty International',
                    event: 'Jahresversammlung',
                    src: 'amnesty-logo.png',
                    frontpage: true
                },
                {
                    name: 'Bundesverband WindEndergie',
                    event: '(virtuelle) Delegiertenversammlung',
                    src: 'bwe-logo.png'
                },
                {
                    name: 'Allgemeiner Deutscher Fahrrad-Club e.V. (ADFC)',
                    event: 'Bund-Länder-Rat',
                    src: 'adfc-logo.png'
                },
                {
                    name: 'Verkehrsclub Deutschland e.V.',
                    event: 'Delegiertenversammlung',
                    src: 'vcd-logo.png'
                },
                {
                    name: 'VDI Verein Deutscher Ingenieure e.V.',
                    event: 'Vorstandsversammlung',
                    src: 'vdi-logo.png'
                },
                {
                    name: 'Verband der Automobilindustrie',
                    event: 'Mitgliederversammlung',
                    src: 'vda-logo.png'
                },
                {
                    name: 'Bund Deutscher Kriminalbeamter e.V.',
                    event: 'Bundesdelegiertentag',
                    src: 'bdk-logo.png'
                },
                {
                    name: 'Bund der Selbständigen Baden-Württemberg e.V.',
                    event: 'Mitgliederversammlung',
                    src: 'bds-logo.png'
                },
                {
                    name: 'Naturland e.V.',
                    event: 'Delegiertenversammlung',
                    src: 'naturland-logo.png'
                },
                {
                    name: 'Deutscher Verband für Neuro-Linguistisches Programmieren e.V.',
                    event: 'Mitgliederversammlung',
                    src: 'dvnlp-logo.png'
                },
                {
                    name: 'Marchfelder Bank eG',
                    event: 'Generalversammlung',
                    src: 'marchfelderbank-logo.png'
                },
                {
                    name: 'Deutsche Schäferhunde (SV) e.V.',
                    event: 'Bundesversammlung',
                    src: 'schaeferhunde-logo.png'
                },
                {
                    name: 'Deutsche Gesellschaft für Polarforschung e.V.',
                    event: 'Mitgliederversammlung',
                    src: 'polarforschung-logo.png'
                },
                {
                    name: 'Gemeinde Neu Wulmstorf',
                    event: 'Gemeinderat',
                    src: 'neu-wulmstorf-logo.png'
                },
                {
                    name: 'Mensa in Deutschland e.V.',
                    event: 'Mitgliederversammlung',
                    src: 'mensa-logo.png'
                }
            ]
        }
    ];
    public frontpageRefs: ReferenceObject[];

    public constructor(protected translate: TranslateService) {
        // get frontpage references and randomize their order
        this.frontpageRefs = this.references
            .flatMap(e => e.refs)
            .filter(r => r.frontpage)
            .shuffle();
    }
}
