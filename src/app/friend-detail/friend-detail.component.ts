import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FriendService } from '../friend.service';
import { Friend } from '../Friend';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {

  @Input() selectedFriend: Friend;
  constructor(private route: ActivatedRoute,
              private friendService: FriendService,
              private location: Location) { }

  ngOnInit(): void {
    this.getFriend();
  }

  getFriend(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.friendService.getFriend(id)
      .subscribe(friend => this.selectedFriend = friend);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.friendService.updateFriend(this.selectedFriend)
      .subscribe(() => this.goBack());
  }
}
