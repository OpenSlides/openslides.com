import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

type PriceFunction = (months: number, users: number) => number;
interface ServicesMap {
    [key: string]: {
        name: string;
        base_price?: number;
        price_verbose: string;
        price_func: PriceFunction;
        monthly?: boolean;
    };
}

const defaultPriceFunction: PriceFunction = months => months * 50;

interface PackageMap {
    [key: string]: {
        name: string;
        max_users: number;
        price: number;
    };
}

interface OverviewTableEntry {
    name: string;
    base_price: number;
    monthly?: boolean;
    multiplier?: string;
    total?: number;
}
interface OverviewData {
    positions: OverviewTableEntry[];
    total: number;
    isUnlimited: boolean;
}

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
    // the applied VAT percentage
    public readonly VAT_PERCENTAGE = 0.16;

    private standard = Validators.pattern(
        /^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );
    private standardNoNumber = Validators.pattern(
        /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );

    public orderForm: FormGroup;
    public error = null;
    public isOverviewStep = false;

    public get overviewData(): OverviewData {
        const pkg = this.packages[this.orderForm.controls.package.value];
        let months = this.orderForm.controls.running_time.value;
        const isUnlimited = months === 'unlimited';
        if (isUnlimited) {
            months = 12;
        }
        const users = this.orderForm.controls.expected_users.value;
        const positions: OverviewTableEntry[] = [
            {
                name: this.translate.instant('Hostingpaket') + ': ' + this.translate.instant(pkg.name),
                base_price: pkg.price,
                monthly: true,
                total: months * pkg.price
            }
        ];
        for (const service_key in this.services) {
            if (this.orderForm.controls.services.value[service_key]) {
                const service = this.services[service_key];
                const service_total = service.price_func(months, users);
                positions.push({
                    name: this.translate.instant(service.name),
                    base_price: service.base_price || service_total,
                    monthly: service.monthly,
                    total: service_total
                });
            }
        }
        let total = 0;
        for (const entry of positions) {
            if (entry.monthly) {
                entry.multiplier = `${months} ` + this.translate.instant('Monate');
            } else {
                entry.multiplier =
                    this.translate.instant('pro Veranstaltungstag') +
                    '\n' +
                    this.translate.instant('zzgl. Techniksupport') +
                    ' *';
            }
            total += entry.total;
        }
        return { positions, total, isUnlimited };
    }

    public packages: PackageMap = {
        meeting: {
            name: _('Sitzung'),
            max_users: 50,
            price: 50
        },
        conference: {
            name: _('Tagung'),
            max_users: 500,
            price: 100
        },
        congress: {
            name: _('Kongress'),
            max_users: 1000,
            price: 200
        }
    };

    public services: ServicesMap = {
        evoting: {
            name: _('eVoting'),
            base_price: 50,
            price_verbose: _('50€/Monat'),
            price_func: defaultPriceFunction,
            monthly: true
        },
        audio: {
            name: _('Audiokonferenz via Jitsi'),
            base_price: 50,
            price_verbose: _('50€/Monat'),
            price_func: defaultPriceFunction,
            monthly: true
        },
        video: {
            name: _('Video-Livestream'),
            price_verbose: _('ab 750€'),
            price_func: (months, users) => Math.ceil(users / 250) * 750
        },
        saml: {
            name: _('Single Sign-On via SAML'),
            base_price: 50,
            price_verbose: _('50€/Monat'),
            price_func: defaultPriceFunction,
            monthly: true
        }
    };

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private translate: TranslateService
    ) {
        this.orderForm = this.fb.group({
            package: ['', [Validators.required, Validators.pattern(Object.keys(this.packages).join('|'))]],
            running_time: ['', [Validators.required]],
            domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)]],
            services: this.fb.group(Object.keys(this.services).mapToObject(service => ({ [service]: [false, []] }))),
            event_name: ['', [Validators.required, this.standard]],
            event_location: ['', [Validators.required, this.standard]],
            event_date: ['', [Validators.required, this.standard]],
            expected_users: ['', [Validators.required, Validators.min(0)]],
            contact_person: this.fb.group({
                organisation: ['', [Validators.required, this.standard]],
                name: ['', [Validators.required, this.standardNoNumber]],
                email: ['', [Validators.required, Validators.email]],
                phone: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            // tslint:disable-next-line
                            /^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))[\d\-/ ]{1,20}$/
                        )
                    ]
                ]
            }),
            billing_address: ['', [Validators.required]],
            comment: ['', []]
        });
        // this.isOverviewStep = true;
        // this.orderForm.patchValue({
        //     running_time: "unlimited",
        //     expected_users: 1,
        //     services: {
        //         evoting: true,
        //         audio: false,
        //         video: true,
        //         saml: false
        //     }
        // });
    }

    public ngOnInit(): void {
        let packageName = this.route.snapshot.queryParamMap.get('package');
        if (!['meeting', 'conference', 'congress'].includes(packageName)) {
            packageName = 'meeting';
        }
        this.orderForm.controls.package.setValue(packageName);
    }

    public showOverview(): void {
        this.isOverviewStep = true;
        window.scroll(0, 0);
    }

    public async onSubmit(): Promise<void> {
        const data = this.orderForm.value;

        try {
            await this.http.post<void>('/api/order', data).toPromise();
            this.router.navigate(['order', 'success']);
        } catch (error) {
            switch (error.status) {
                case 502:
                case 504:
                    this.error = _(
                        // tslint:disable-next-line
                        'Bei der Übermittlung des Formulars ist leider ein Fehler aufgetreten. Bitte senden Sie uns Ihre Anfrage per E-Mail: hosting@openslides.com'
                    );
                    break;
                default:
                    this.error = error.error.error || _('Ein unbekannter Fehler ist aufgetreten.');
                    break;
            }
        }
    }

    public originalOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
        return 0;
    }
}
