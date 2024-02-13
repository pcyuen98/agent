import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {SAMPLE} from './samples/sample';
import {SAMPLE_ASYNC} from './samples/sample-async';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  position: GeolocationPosition | null = null;
  toggle = false;
  currentPositionUrl: SafeResourceUrl | null = null;
  watchSubscription: Subscription | null = null;
  error: GeolocationPositionError | null = null;

  readonly sample = SAMPLE;
  readonly sampleAsync = SAMPLE_ASYNC;

  constructor(
      readonly geolocation$: GeolocationService,
      private readonly domSanitizer: DomSanitizer,
      private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  getCurrentPosition() {
      console.log("getCurrentPosition...");
      this.geolocation$.pipe(take(1)).subscribe(
          position => {
              this.currentPositionUrl = this.getUrl(position);
              this.changeDetectorRef.markForCheck();
          },
          error => {
              console.log("getCurrentPosition error..." + error);
              this.error = error;
              this.changeDetectorRef.markForCheck();
          },
      );
  }

  toggleWatch() {
      this.toggle = !this.toggle;
  }

  private getUrl(position: GeolocationPosition): SafeResourceUrl {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;

      return this.domSanitizer.bypassSecurityTrustResourceUrl(
          `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
              0.005},${latitude - 0.005},${longitude + 0.005},${latitude +
              0.005}&marker=${position.coords.latitude},${
              position.coords.longitude
          }&layer=mapnik`,
      );
  }
}

