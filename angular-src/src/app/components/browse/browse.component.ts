import { Component, OnInit } from '@angular/core';
import { RelationshipService } from '../../services/relationship.service'
import { Subscription } from "rxjs/Subscription";
import {Router, ActivatedRoute, Params} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})

export class BrowseComponent implements OnInit {
  private preferences: Map<String, any>;
  private profile: any;
  private profileSet: Array<any>;
  constructor( private relationshipService: RelationshipService) { 
    this.loadPreferences()
  }

  ngOnInit() {
    
    this.browse()
  }

  ngAfterContentInit() {
      $(document).ready(function() {
        $('select').material_select();
      });

      this.getProfileRequests()
  }

  loadPreferences() {
    this.preferences = new Map()
    this.preferences.set('age', 10)    
    this.preferences.set('sex', 'Female')    
    this.preferences.set('orientation', 'Heterosexual')    
    this.preferences.set('location', 100)    
    this.preferences.set('baseLocation', [41.8781136, -87.63])    
  
  }

  browse(){
     this.relationshipService.getProfiles(this.preferences).subscribe(res => {
      res.profiles.forEach(element => {
        element.status = undefined      
      });

      this.relationshipService.fetchProfiles(res.profiles)
      this.profile = res.profiles
      
    })
  }

  getProfileRequests() {
    this.getProfileAdd()
    this.getProfileRemoveRequest()
    this.getProfileRemoveReject()
    this.getProfileReject()
    this.getProfileConfirm()
  }

  getProfileAdd(){
    this.relationshipService.listenProfileToAdd().subscribe(res => {
      console.log(res.profile._id)
      this.relationshipService.sendPendingRequest({_id: res.profile._id}).subscribe((res) => {
        console.log(res)
      })
    })
  }

  getProfileRemoveRequest(){
    this.relationshipService.listenProfileToRemoveRequest().subscribe(res => {
      console.log(res)
      this.relationshipService.removePendingRequest({_id: res.profile._id}).subscribe(res => {
        console.log(res)        
      })      
    })
  }

  getProfileReject(){
    this.relationshipService.listenProfileToReject().subscribe(res => {
      console.log(res)
      this.relationshipService.rejectRequest({_id: res.profile._id}).subscribe(res => {
        console.log(res)
      })      
    })
  }

  getProfileRemoveReject(){
    this.relationshipService.listenProfileToRemoveReject().subscribe(res => {
      console.log(res)
      this.relationshipService.removeRejectRequest({_id: res.profile._id}).subscribe(res => {
        console.log(res)        
      })      
    })
  }

  getProfileConfirm(){
    this.relationshipService.listenProfileToConfirm().subscribe(res => {
      console.log(res)      
    })
  }

  setSexPref() {

  }

  setOrientationPref() {

  }

  setAgePref() {

  }

}
