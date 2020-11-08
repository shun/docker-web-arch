import { Component } from '@angular/core';
import { LoggerService } from "./logger.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'frontapp';
  constructor(private loggerService: LoggerService) {
    console.log(window.navigator);
    loggerService.debug({name: "kudo"});
  }
}
