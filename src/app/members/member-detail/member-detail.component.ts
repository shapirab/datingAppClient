import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }
  member?: Member
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    let username = this.route.snapshot.paramMap.get('username');
    if(!username){
      return;
    }
    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    });
  }

}
