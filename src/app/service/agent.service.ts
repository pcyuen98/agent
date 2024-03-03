import { Injectable } from '@angular/core';
import { Agent } from '../model/agent/agent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient: HttpClient) { }

  public getHTTPAgent(id: any): any {
    return this.httpClient.get(GlobalConstants.agentApiURL + '/json/get?id=' + id, { responseType: 'text' });
  }

  public getHTTPUser(id: any): any {
    return this.httpClient.get(GlobalConstants.agentApiURL + '/json/getUser?id=' + id, { responseType: 'text' });
  }

  getAgent() {
    let agent : Agent = new Agent();
    
    agent.address1 = "No.1 Jalan Satu";
    agent.address2 = "";

  return agent;

  }

  public addPost(agent: any) {

    return this.httpClient.post(GlobalConstants.agentApiURL + '/json/post', JSON.parse(agent)

    ).subscribe((data: any) => {

    }
      ,
      (error) => {
        console.log(error);
        //this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
      })
  }

  public registerPost(user: any) {
    return this.httpClient.post(GlobalConstants.agentApiURL + '/register/post', JSON.parse(user)
    );
  }

  public donatePost(user: any) {
    console.log("GlobalConstants.agentApiURL--->" + GlobalConstants.agentApiURL);
    return this.httpClient.post(GlobalConstants.agentApiURL + '/donate/post', JSON.parse(user)
    );
  }

  public getScamURL(str: any): any {
    if (str != undefined || str != null) {
      var urlRegex = /(https?:\/\/[^ ]*)/;
      try {
        var res = str.match(urlRegex)[1];
  
        res = res.replace('https://','');
        res = res.replace('http://','');
        console.log("The extracted URL from given string is: " + res);
        if (res != undefined || res != null) {
          return res;
        }
        else {
          return undefined;
        }
      } catch (e) {
        console.error(e);
      }
    }
    else {
      return undefined;
    }
    
  }
}
