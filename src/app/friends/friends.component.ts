import { Component, OnInit } from '@angular/core';
import { Friend } from '../Friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Friend[];
  // selectedFriend: Friend;

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.getFriends();
  }
  // get friends from service call.
  getFriends(): void {
    this.friendService.getFriends()
              .subscribe(friends => this.friends = friends);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.friendService.addFriend(name)
      .subscribe(hero => {
        this.friends.push(hero);
      });
  }

  delete(friend: Friend): void {
    this.friends = this.friends.filter(h => h !== friend);
    this.friendService.deleteFriend(friend).subscribe();
  }
  // onSelect of a particular friend
  /*onSelect(friend: Friend): void {
    this.selectedFriend = friend;
  }*/
}
