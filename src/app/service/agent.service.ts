import { Injectable } from '@angular/core';
import { Agent } from '../model/agent/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor() { }

  getAgent() {
    let agent : Agent = new Agent();
    
    agent.address1 = "No.1 Jalan Satu";
    agent.address2 = "";

  return agent;

  }
}
