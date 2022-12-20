import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export interface UnitDescriptor {
    units_func?: UnitsFunction;
    units_desc?: [string, string];
}

export type UnitsFunction = (data: any) => number;

export interface ExtraFunctionsEntry extends UnitDescriptor {
    hidden?: boolean;
    name: string;
    base_price: number;
    extra_infos?: string;
    parent?: string;
    child?: string;
    disabled?: (data: any) => boolean;
}

export interface ExtraFunctionsMap {
    [key: string]: ExtraFunctionsEntry;
}

export interface PackageMap {
    [key: string]: {
        name: string;
        category: string,
        max_meetings?: number;
        max_accounts?: number;
        min_accounts?: number;
        price?: number;
        priceinfo?: string;
    };
}

export interface ServiceMap {
    [key: string]: {
        name: string;
        default?: boolean;
    };
}

export const packages: PackageMap = {
    meeting: {
        name: _('Sitzung'),
        category: _('Einzelveranstaltung'),
        max_accounts: 50,
        price: 250
    },
    conference: {
        name: _('Tagung'),
        category: _('Einzelveranstaltung'),
        max_accounts: 250,
        price: 500
    },
    congress: {
        name: _('Kongress'),
        category: _('Einzelveranstaltung'),
        max_accounts: 500,
        price: 1000
    }
};

export const extraFunctions: ExtraFunctionsMap = {
    service: {
        name: _('Basis-Supportpauschale für eine Veranstaltung'),
        base_price: 750,
        units_func: null,
        units_desc: null,
        extra_infos: _(
            // tslint:disable-next-line
            'Zur individuellen Basisunterstützung in der Vor- und Nachbereitung Ihrer Veranstaltung - per E-Mail und Telefon.'
        )
    },
    video: {
        name: _('Video-Livestream mit Jitsi-Videokonferenz'),
        base_price: 1750,
        // add one to duration because we want the number of days, not the diff
        units_func: data => (data.event_from && data.event_to?.diff(data.event_from, 'days') + 1) || 1,
        units_desc: [_('Tag'), _('Tage')],
        extra_infos: _(
            // tslint:disable-next-line
            'Bereitstellung und Integration eines Video-Livestreams in OpenSlides, Bereitstellung eines Jitsi-Videokonferenzraums, Koppelung mit der aktuellen Redeliste. - Der Preis gilt pauschal pro Veranstaltungstag für die ersten 250 Streamingnutzer. Abhängig vom Veranstaltungstag und Verfügbarkeiten.'
        ),
        disabled: data => data.package === 'meeting',
        child: 'external_video'
    },
    'video-additional-units': {
        hidden: true,
        name: _('zusätzliche Streamingnutzer'),
        base_price: 1500,
        units_func: data => Math.ceil(data.expected_users / 250) - 1,
        units_desc: [_('Einheit'), _('Einheiten')],
        extra_infos: _(
            // tslint:disable-next-line
            'Eine Einheit kann bis zu 250 Streamingnutzer bedienen. Pro 250 Nutzer ist somit eine zusätzliche Streaming-Einheit nötig.'
        )
    },
    external_video: {
        name: _('externer Livestream'),
        base_price: 750,
        parent: 'video',
        units_func: null,
        units_desc: null,
        extra_infos: _(
            // tslint:disable-next-line
            'Einrichtung eines RTMP-Streaming-Uploads für einen vor Ort produzierten Video-Livestream. Koordination der Schnittstellen mit Ihrem Streaming-Dienstleister (hybrides Veranstaltungsformat).'
        ),
        disabled: data => !data.extra_functions.video
    },
    saml: {
        hidden: true,
        name: _('Single Sign-On via SAML'),
        base_price: 200,
        extra_infos: _(
            // tslint:disable-next-line
            'Zur Anbindung eines bereits existierenden SAML-Mitgliedsservers. Nur verfügbar für das Hostingpaket "Kongress"'
        ),
        disabled: data => data.package !== 'congress'
    }
};

export const services: ServiceMap = {
    schooling: {
        name: 'Online-Schulung'
    },
    local_service: {
        name: 'Technische Begleitung Ihrer Veranstaltung (virtuell oder Vor-Ort)'
    },
    phone: {
        name: 'Telefonrufbereitschaft'
    }
};
