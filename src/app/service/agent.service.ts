import { Injectable } from '@angular/core';
import { Agent } from '../model/agent/agent';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient: HttpClient) { }

  public getHTTPAgent(): any {
    return this.httpClient.get('http://localhost:8080/json/get', { responseType: 'text' });
  }

  getAgent() {
    let agent : Agent = new Agent();
    
    agent.address1 = "No.1 Jalan Satu";
    agent.address2 = "";

  return agent;

  }
}
