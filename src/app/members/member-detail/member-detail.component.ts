import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }
  member?: Member;
  images: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [];
  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];
  }

  loadMember(){
    let username = this.route.snapshot.paramMap.get('username');
    if(!username){
      return;
    }
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.member.photos.map(photo => {
          this.images.push(new NgxGalleryImage({
            small: photo.url,
            medium: photo.url
          }));
        });
      }
    });
  }

}
