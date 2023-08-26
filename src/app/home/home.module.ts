import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ObjectDetectionFromYoloToTensorflowModule } from 'object-detection-from-yolo-to-tensorflow';
import { DinoGameComponent } from '../dino-game/dino-game.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ObjectDetectionFromYoloToTensorflowModule
  ],
  declarations: [HomePage, DinoGameComponent]
})
export class HomePageModule { }
