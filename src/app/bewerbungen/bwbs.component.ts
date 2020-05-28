import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Bewerbung, BwbService} from '../auth/service/bwb.service';

@Component({
  selector: 'app-posts',
  templateUrl: './bwbs.component.html',
  styleUrls: ['./bwbs.component.css']
})
export class BwbsComponent implements OnInit {
  bewerbungen: Bewerbung[];

  constructor(public bwbService: BwbService,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bwbService.getAll().subscribe(bwb => {
      this.bewerbungen = bwb;
    });
  }

  showIdsProgram() {
    this.router.navigate(['/bewerbungen'], {
      queryParams: {
        showIds: true
      },
      fragment: 'program-fragment'
    });
  }
}
