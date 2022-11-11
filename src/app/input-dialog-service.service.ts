import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService, private alertCtrl: AlertController) { }


  async showPrompt(item?, index?) {
    const prompt = await this.alertCtrl.create({
      header: item? 'Edit Item': 'Add Item',
      buttons: [{
        text: 'Save',
        handler: item =>{
          console.log("Saved Clicked", item);
          if (index !== undefined){
            this.dataService.editItem(item, index);
          }
          else {
            this.dataService.addItem(item);
          }
        }
        },
        {
        text: 'Cancel',
        handler: item => {
          console.log('Cancel clicked');
        }
      }],
      message: item? 'Please edit item...': 'Please enter item...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: item? item.quantity : '1',
          value: item? item.quantity : 1,
          min: 1,
          max: 20
        }
      ] 
    });
    await prompt.present()

  }
}
