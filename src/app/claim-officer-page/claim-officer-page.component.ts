import { Component, OnInit } from '@angular/core';
import { Claim } from '../model/Claim';

import {UserService} from '../service/user/user.service';
import {ReportService} from '../service/report/report.service';
import {ClaimService} from '../service/claim/claim.service';
import { User } from '../model/User';
import {Router, RouterModule} from '@angular/router';
import { Report } from '../model/Report';

@Component({
  selector: 'claim-officer-page',
  templateUrl: './claim-officer-page.component.html',
  styleUrls: ['./claim-officer-page.component.css']
})
export class ClaimOfficerPageComponent implements OnInit {
  claims: Claim[];
  c: Claim = new Claim();
  users: any;
  u: User = new User();
  claimTable: HTMLElement;
  inspectorTable: HTMLElement;
  claim: Claim;
  report: any;

  constructor(
    private claimService: ClaimService,
    private userService: UserService,
    private reportService: ReportService,
    private $router: Router
    ) { }

  ngOnInit() {
    this.claimService.getClaims().subscribe(data => {this.claims = data; });
    this.userService.getUsersByType('inspect_officers')
          .subscribe(data => {
            this.users = data;
          });
  }

  handleLogout() {
    sessionStorage.removeItem('user');
    return this.$router.navigate(['cover']);
  }

  showInspectors(claim) {
    this.claim = claim; // stored to be used in assignInspector
    this.claimTable = document.getElementById('claimTable') as HTMLElement;
    this.claimTable.style.display = 'none';
    this.inspectorTable = document.getElementById('inspectorTable') as HTMLElement;
    this.inspectorTable.style.display = 'block';
  }
  assignInspector(lname) {
    //create default report object
    this.report=new Report();
    this.report.inspectOfficer=lname;
    this.report.claim=this.claim;
    this.report.reportId=this.report.claim.claimId;
    this.report.claimOfficer="Admin"; //need to get actual name of whoever is logged in TO-DO
    this.report.estimate=0.00;
    this.report.evaluation="";
    //this.report.insuredEmail=this.report.claim.user.email;
    this.report.insuredEmail="";
    //this.report.insuredPhone=this.report.claim.user.phone;
    this.report.insuredPhone="";
    console.log(this.report)
    //send to DB
    this.reportService.postReport(this.report).subscribe(data => {this.report = data;});

    this.claimTable = document.getElementById('claimTable') as HTMLElement;
    this.claimTable.style.display = 'block';
    this.inspectorTable = document.getElementById('inspectorTable') as HTMLElement;
    this.inspectorTable.style.display = 'none';
  }
  approve(claim) {
    this.claim = claim;
    this.claim.status = 'Approved';
    this.claimService.updateClaim(claim, this.claim.claimId)
      .subscribe(data => {
        this.claim = data;
      });
  }
  decline(claim) {
    this.claim = claim;
    this.claim.status = 'Declined';
    this.claimService.updateClaim(claim, this.claim.claimId)
      .subscribe(data => {
        this.claim = data;
      });
  }
  hider() {
    this.claimTable = document.getElementById('claimTable') as HTMLElement;
    this.claimTable.style.display = 'block';
    this.inspectorTable = document.getElementById('inspectorTable') as HTMLElement;
    this.inspectorTable.style.display = 'none';
  }
}
