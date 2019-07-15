import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    private standard = Validators.pattern(/^[A-Za-zäöüß0-9'\.\-\s\,#]+$/);
    private standard_no_number = Validators.pattern(/^[A-Za-zäöüß'\.\-\s\,#]+$/);

    private orderForm = this.fb.group({
        tariff: ['', [Validators.required, Validators.pattern(/^(single|basic|enterprise)$/)]],
        domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        event_name: ['', [Validators.required, this.standard]],
        organizer: ['', [Validators.required, this.standard]],
        location: ['', [Validators.required, this.standard]],
        date_from: ['', [Validators.required]],
        date_to: ['', [Validators.required]],
        expected_users: ['', [Validators.required, Validators.min(1)]],
        contact_person: this.fb.group({
            name: ['', [Validators.required, this.standard_no_number]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))\d{1,14}$/)]]
        }),
        billing_address: this.fb.group({
            name: ['', [Validators.required, this.standard]],
            street: ['', [Validators.required, this.standard]],
            zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,5}$/)]],
            city: ['', [Validators.required, this.standard_no_number]]
        })
    }, {
        validator: this.dateLessThan('date_from', 'date_to')
    });

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) { }

    ngOnInit() {
        let t = this.route.snapshot.queryParamMap.get("tariff");
        if (t) {
            this.orderForm.get("tariff").setValue(t);
        }
        console.log(this.orderForm);
    }

    onSubmit() {
        let data = this.orderForm.value;
        if (data.date_from && data.date_from.format) data.date_from = data.date_from.format("DD.MM.YYYY");
        if (data.date_to && data.date_to.format) data.date_to = data.date_to.format("DD.MM.YYYY");
        this.http.post("/api/order", data).subscribe(res => {
            console.log("res:", res);
        });
    }
    
    dateLessThan(from: string, to: string) {
        return (group: FormGroup) => {
            let f = group.controls[from];
            let t = group.controls[to];
            if (f.value && t.value && f.value > t.value) {
                let errors = t.errors || {};
                errors["negativeDatespan"] = true;
                t.setErrors(errors);
                errors = f.errors || {};
                errors["negativeDatespan"] = true;
                f.setErrors(errors);
                return { negativeDatespan: true };
            } else {
                if (t.errors && t.errors["negativeDatespan"]) t.updateValueAndValidity();
                if (f.errors && f.errors["negativeDatespan"]) f.updateValueAndValidity();
                return {};
            }
        }
    }
}
