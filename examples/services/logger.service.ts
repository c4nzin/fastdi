import { Injectable } from "../../src/decorators/injectable";
import { LifeCycle } from "../../src/enums/life-cycle.enum";

@Injectable({ lifeCycle: LifeCycle.Transient })
export class LoggerService {
  public log(message: string): void {
    console.log(`[LOGGER]: ${message}`);
  }
}
