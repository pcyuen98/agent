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
    return this.httpClient.get('http://localhost:8080/json/get?id=' + id, { responseType: 'text' });
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
}
