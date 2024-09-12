import "reflect-metadata";
import { RealWorldService } from "../examples/services/constructor-example.service";
import { Container } from "./containers/container";
import { DatabaseService } from "../examples/services/database.service";
import { AppModule } from "../examples/modules/app.module";

Container.loadModules(AppModule);

const userService = Container.get(RealWorldService);
const dbService = Container.get(DatabaseService);

console.log(dbService.query("mongoblad"));

userService.getDatabase();
