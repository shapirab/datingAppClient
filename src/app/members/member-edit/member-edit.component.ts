import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { AcountService } from 'src/app/services/acount.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  //To prevent an unintentional move from our page outside the app - for instance, closing the tab in chrome -
  //we can use the following decorator:
  @HostListener('window:beforeunload', ['$event']) notify($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  member?: Member;

  constructor(private accountService: AcountService, private memberService: MembersService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.memberService.getMember(user.userName).subscribe({
            next: member => this.member = member,
            error: err => console.log(err)
          });
        }
      },
      error: err => console.log(err)
    });
  }

  updateMember(){
    if(this.member){
      this.memberService.updateMember(this.member).subscribe({
        next: () =>  {
          this.toastr.success('Profile updated successfully');
          this.editForm?.reset(this.member);
        },
        error: (err: any) => console.log(err)
      });
    }
  }
}
