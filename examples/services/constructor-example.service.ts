import { Injectable } from "../../src/decorators/injectable";
import { LifeCycle } from "../../src/enums/life-cycle.enum";
import { DatabaseService } from "./database.service";
import { LoggerService } from "./logger.service";

@Injectable({ lifeCycle: LifeCycle.Singleton })
export class RealWorldService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly loggerService: LoggerService
  ) {}

  public getDatabase() {
    this.databaseService.query("example db!");
    this.loggerService.log("Done");
  }
}
