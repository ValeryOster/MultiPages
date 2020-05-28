import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Bewerbung, BwbService} from '../auth/service/bwb.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './bwb.component.html',
  styleUrls: ['./bwb.component.css']
})
export class BwbComponent implements OnInit {
  bewerbung: Bewerbung;
  form: FormGroup;
  firmenName: string;
  newBewerbung = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bwbService: BwbService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firmName: new FormControl('', Validators.required),
      partner: new FormControl('', Validators.required),
      telnummer: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.email,
        Validators.required]),
      adresse: new FormControl('', [
        Validators.required, Validators.minLength(10)]),
      zustand: new FormControl('Bewerben', Validators.required),
      notizen: new FormControl('', Validators.required),
      bewerbungsDatum: new FormControl('', Validators.required),
    });
    this.route.params.subscribe((params: Params) => {
      if (params.id !== 'new') {
        this.bwbService.getById(+params.id).subscribe(bwb => {
          this.bewerbung = bwb;
          this.firmenName = bwb.firmName;
          this.form.get('adresse').setValue(this.bewerbung.firmAdress);
          this.form.get('partner').setValue(this.bewerbung.ansprechPartner);
          this.form.get('email').setValue(this.bewerbung.email);
          this.form.get('zustand').setValue(this.bewerbung.zustand);
          this.form.get('telnummer').setValue(this.bewerbung.telNummer);
          this.form.get('notizen').setValue(this.bewerbung.notizen);
          this.form.get('bewerbungsDatum').setValue(new Date(this.bewerbung.bewerbungsDatum).toISOString().split('T')[0]);
        });

      } else {
        this.newBewerbung = true;
        this.bewerbung = new Bewerbung();
      }
    });
  }

  save() {
    this.bewerbung.bewerbungsDatum = this.form.get('bewerbungsDatum').value;
    this.bewerbung.firmAdress = this.form.get('adresse').value;
    this.bewerbung.ansprechPartner = this.form.get('partner').value;
    this.bewerbung.email = this.form.get('email').value;
    this.bewerbung.zustand = this.form.get('zustand').value;
    this.bewerbung.telNummer = this.form.get('telnummer').value;
    this.bewerbung.notizen = this.form.get('notizen').value;
    if (this.newBewerbung) {
      this.bewerbung.firmName = this.form.get('firmName').value;
      console.log(this.bewerbung);
      this.bwbService.create(this.bewerbung).subscribe(bwb => {
        console.log(bwb);
      });
    } else {
      this.bwbService.update(this.bewerbung).subscribe(bwb => {
        console.log(bwb);
      });
    }
  }

  delete() {
    this.bwbService.delete(this.bewerbung.id).subscribe(bwb => {
      console.log(bwb);
    });
    this.router.navigate(['bewerbungen']);
  }
}
