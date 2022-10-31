import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  title = "Grocery";

  items = [
    {
      name:"Milk",
      quantity: 2
    },
    {
      name:"Bread",
      quantity: 1
    },
    {
      name:"Banana",
      quantity: 3
    },
    {
      name:"Sugar",
      quantity: 1
      }
  
  ];

  constructor(private toastController: ToastController, private alertCtrl: AlertController) {}

  async removeItem(item, index){
    console.log("Removing Item -", item.name, index);
    const toast = await this.toastController.create({
      message: "Removing Item - " + index,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
    this.items.splice(index, 1);
  }

  addItem(){
    console.log("Adding item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header:'Add Item',
      buttons: [{
        text: 'Save',
        handler: data =>{
          console.log("Saved Clicked");
          this.items.push(data);
        }
        },
        {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }],
      message: 'Please enter item...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        }
      ]
    });
    await prompt.present()

  }

}
