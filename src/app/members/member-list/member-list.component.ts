import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];
  constructor(public membersService: MembersService) { }

  ngOnInit(): void {
    this.membersService.members$.subscribe({
      next: members => {
        if (members.length > 0) {
          this.members = members;
        }
        else {
          this.loadMembers();
        }
      },
      error: err => console.log(err)
    });
  }

  loadMembers(){
    this.membersService.getMembers().subscribe({
      next: members => this.members = members,
      error: err => console.log(err)
    });
  }
}
