import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../home/home';
// import { CreatePage } from '../create/create';
@IonicPage({
  name: 'tabs-page'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Create: any = 'create-page';
  View: any = 'home-page';

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
