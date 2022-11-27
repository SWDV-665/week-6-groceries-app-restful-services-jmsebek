import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  title = "Grocery";

  items = [];
  errorMessage: string;

  constructor(private toastController: ToastController, private alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, private socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged:boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems(){
    this.dataService.getItems()
    .subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error);
  }

  async removeItem(id){
    
    this.dataService.removeItem(id);
  }

  async shareItem(item, index){
    console.log("Sharing Item -", item.name, index);
    const toast = await this.toastController.create({
      message: "Sharing Item - " + index,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
    // Sharing via email is possible
    console.log("Shared Successfully!");
    }).catch((error) => {
    // Sharing via email is not possible
    console.error("Error while sharing", error);
});
    
  }

  async editItem(item, index){
    console.log("Editing Item -", item.name, index);
    const toast = await this.toastController.create({
      message: "Editing Item - " + index,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
    this.inputDialogService.showPrompt(item, index);
    
  }

  addItem(){
    console.log("Adding item");
    this.inputDialogService.showPrompt();
  }

  


}
