import "reflect-metadata";
import { Injectable } from "../src/decorators/injectable";
import { Container } from "../src/containers/container";
import { LifeCycle } from "../src/enums/life-cycle.enum";
import { Module } from "../src/decorators/module";
import { NotFoundException } from "../src/exceptions/not-found.exception";

//Singleton use case
@Injectable({ lifeCycle: LifeCycle.Singleton })
class TestService {
  public sayHello() {
    return "Hello";
  }
}

@Injectable()
class UserService {
  constructor(private readonly testService: TestService) {}

  public greetUser() {
    return this.testService.sayHello();
  }
}

//Transient use case
@Injectable({ lifeCycle: LifeCycle.Transient })
class DatabaseService {
  public dbName(): string {
    return "Example Db.";
  }
}

@Injectable({ lifeCycle: LifeCycle.Transient })
class ConfigService {
  constructor(private readonly databaseService: DatabaseService) {}

  public connectDatabase(): string {
    return this.databaseService.dbName();
  }
}

class BadService {}

@Module({ providers: [ConfigService] })
class ExampleModule {}

describe("Coverage tests", () => {
  it("Should create singleton instance", () => {
    const instance = Container.get(TestService);
    const instance2 = Container.get(TestService);

    expect(instance).toBe(instance2); // these two must be same instances as singleton needs
    expect(instance.sayHello()).toBe("Hello");
  });

  it("Should inject dependencies", () => {
    const instance = Container.get(UserService);

    expect(instance.greetUser()).toBe("Hello");
  });

  it("Should create transient instance", () => {
    const instance = Container.get(ConfigService);

    expect(instance.connectDatabase()).toBe("Example Db.");
  });

  it("Should load all modules and its providers", () => {
    Container.loadModules(ExampleModule);
    const instance = Container.get(ConfigService);

    expect(instance).toBeDefined();
    expect(instance.connectDatabase()).toBe("Example Db.");
  });

  //need to fix
  // it("Should throw NotFoundException", () => {
  //   expect(() => {
  //     Container.get(BadService);
  //   }).toThrow(new NotFoundException("Not found in container."));
  // });
});
