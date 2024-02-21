import {ChangeDetectionStrategy, ChangeDetectorRef, Component, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {SAMPLE} from './samples/sample';
import {SAMPLE_ASYNC} from './samples/sample-async';
import { CommonModule } from '@angular/common';  
import { AgentService } from './service/agent.service';
import { SafePipe } from './service/safePipe.service';


@Component({
  selector: 'app-root',
  providers: [AgentService],
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AppComponent {
  position: GeolocationPosition | null = null;
  toggle = false;
  sampleURL: any = "//www.openstreetmap.org/export/embed.html?bbox=101.68899520000001,3.0765351,101.6989952,3.0865351&marker=3.0815351,101.6939952&layer=mapnik";
  
  currentPositionUrl: SafeResourceUrl | null = null;
  currentDummyPositionUrl: SafeResourceUrl | null = null;
  watchSubscription: Subscription | null = null;
  error: GeolocationPositionError | null = null;
  safeUrl: any;

  // Public properties
  itsSafe: SafeHtml | undefined;

  // Private properties
  private safePipe: SafePipe = new SafePipe(this.domSanitizer);
  public agent: any;

  readonly sample = SAMPLE;
  readonly sampleAsync = SAMPLE_ASYNC;

  constructor(
      public agentService: AgentService,
      readonly geolocation$: GeolocationService,
      public readonly domSanitizer: DomSanitizer,
      private readonly changeDetectorRef: ChangeDetectorRef,
  ) 
  {
    

  }

  ngOnInit(): void{
    this.getCurrentDummyPosition();

    console.log("agent-->: " + this.agentService.getAgent());
    this.agent = this.agentService.getAgent();
  }


  getCurrentPosition() {
    console.log("getCurrentPosition..2.");
    this.geolocation$.pipe(take(1)).subscribe(
        position => {
            this.currentPositionUrl = this.getUrl(position);
            console.log("this.currentPositionUrl-->'" + this.currentPositionUrl + "'");
            this.changeDetectorRef.markForCheck();
            console.log("after mark this.currentPositionUrl-->'" + this.currentPositionUrl + "'");
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

  getCurrentDummyPosition() {
    console.log("getCurrentDummyPosition..2.");
    this.geolocation$.pipe(take(1)).subscribe(
        position => {
            this.currentDummyPositionUrl = this.getUrlDummy();
            this.changeDetectorRef.markForCheck();
            const sanitizedValue = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, this.currentDummyPositionUrl);
            console.log("sanitizedValue:--->" + sanitizedValue);
            let aString = sanitizedValue || "www.google.com";
            
            
            this.safeUrl = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, 
                this.domSanitizer.bypassSecurityTrustResourceUrl(aString));

            this.safeUrl = this.safePipe.transform(this.safeUrl, 'resourceUrl');
            console.log("this.safeUrl:--->'" + this.safeUrl + "'");
            
            
            this.sampleURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.sampleURL, );
            console.log("before:--->'" + this.sampleURL + "'");
        },
        error => {
            console.log("currentDummyPositionUrl error..." + error);
            this.error = error;
            this.changeDetectorRef.markForCheck();
        },
    );    
}

  private getUrlDummy(): SafeResourceUrl {
    const longitude = 101.7182277;
    const latitude = 3.121707;

    return this.domSanitizer.bypassSecurityTrustResourceUrl(
        `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
            0.005},${latitude - 0.005},${longitude + 0.005},${latitude +
            0.005}&marker=${latitude},${
            longitude
        }&layer=mapnik`,
    );
}

  private getUrl(position: GeolocationPosition): SafeResourceUrl {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      
      let url = `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
      0.005},${latitude - 0.005},${longitude + 0.005},${latitude +
      0.005}&marker=${position.coords.latitude},${
      position.coords.longitude
  }&layer=mapnik`;
      let returnURL = this.domSanitizer.bypassSecurityTrustResourceUrl(url,
        );
        console.log("working url-->" + url);
        console.log("clean returnURL -->" + returnURL);
      return returnURL;
  }
}

