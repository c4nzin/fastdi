import { Module } from "../../src/decorators/module";
import { DatabaseService } from "../services/database.service";
import { LoggerService } from "../services/logger.service";

@Module({
  providers: [DatabaseService, LoggerService],
})
export class AppModule {}
