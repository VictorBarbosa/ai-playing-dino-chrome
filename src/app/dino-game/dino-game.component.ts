import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs'
import RunnerDino from '../dino/runner';
@Component({
  selector: 'app-dino-game',
  templateUrl: './dino-game.component.html',
  styleUrls: ['./dino-game.component.scss']
})
export class DinoGameComponent implements OnInit {
  runner: RunnerDino | null = null




  /**
   * Model
   */
  model: tf.GraphModel<string | tf.io.IOHandler> | null = null;

  myJson: any = []

  /**
   *
   */
  constructor() {
    tf.loadGraphModel('assets/web_dino_model/model.json').then((model: tf.GraphModel<string | tf.io.IOHandler>) => {
      this.model = model
    }
    );

  }


  ngOnInit(): void {
    this.runner = new RunnerDino(this.obstaclePositionCallback.bind(this));
  }

  /**
   * This callback came from runner.js , It trigged when an obstacle is showen on the screen
   * @param type "CACTUS_SMALL", "CACTUS_LARGE", "PTERODACTYL"
   * @param x position of obstacle
   * @param y position of obstacle
   * @param speed of obstacle
   */
  obstaclePositionCallback(type: any, x: number, y: number, speed: number) {

    const classe_para_valor = ["CACTUS_SMALL", "CACTUS_LARGE", "PTERODACTYL"]

    const classes = ["JUMP", "Crouched", "RUN",]
    const classId = classe_para_valor.findIndex(x => x === type);

    const input = tf.tensor([[classId, x, y, speed]]);
    if (this.model) {

      const prediction = this.model?.predict(input) as tf.Tensor;

      const predictionsArray = (prediction.squeeze() as any).arraySync();

      const maxValue = Math.max(...predictionsArray);
      const classId = predictionsArray.findIndex((value: number) => value === maxValue);

      const classPredicted = classes[classId];

      switch (classPredicted) {
        case "JUMP":
          this.runner?.jump();
          break;
        case "Crouched":
          this.runner?.crouched();
          break;
        case "RUN":
          this.runner?.run();
          break;
      }

    }

  }


}
