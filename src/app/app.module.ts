import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule,
         MatDividerModule, MatListModule, MatInputModule, MatSelectModule, MatDatepickerModule,
         MAT_DATE_FORMATS } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SlideshowModule } from 'ng-simple-slideshow';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageControllerComponent } from './language-controller/language-controller.component';
import { WrappableDirective } from './wrappable.directive';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { PricesComponent } from './prices/prices.component';
import { OrderComponent } from './order/order.component';
import { FeatureComponent } from './feature/feature.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

export const MOMENT_FORMATS = {
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD.MM.YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
    }
}

@NgModule({
    declarations: [
        AppComponent,
        LanguageControllerComponent,
        WrappableDirective,
        ScrollSpyDirective,
        MainMenuComponent,

        MainComponent,
        PrivacyComponent,
        ImpressumComponent,
        ReferencesComponent,
        ContactComponent,
        PricesComponent,
        OrderComponent,
        FeatureComponent,
        LoginComponent,
        OrderSuccessComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SlideshowModule,
        HttpClientModule,

        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MOMENT_FORMATS },
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
