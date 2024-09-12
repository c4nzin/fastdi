## FastDI a Dependency Injection Library

This project implements a modular and flexible Dependency Injection (DI) framework using TypeScript and Node.js. It features decorator-based injectability, lifecycle management, and dynamic module loading.

## Features

- **Decorator-Based Injection**: Use `@Injectable` to make classes injectable.
- **Lifecycle Management**: Manage service lifecycles as **singleton** or **transient**.
- **Modular Architecture**: Define and load modules dynamically.
- **Dynamic Module Loading**: Load modules on demand.


Container and Injectable
The Container class is the core of this library, managing instances and dependencies of injectable classes. With @Injectable decorator marks a class as injectable.
## Examples
```typescript
import { Injectable } from "./decorators/injectable";
import { Container } from "./container/container";

@Injectable()
class ExampleService {
  public getMessage():string {
    return "Hello from ExampleService!";
  }
}

const exampleService = Container.get(ExampleService);
console.log(exampleService.getMessage());
```


# Lifecycle Management
You can specify the lifecycle of your services using the @Injectable decorator:

Singleton: A single instance is created and shared throughout the application.
</br>
Transient: A new instance is created every time

```typescript
import { Injectable } from "./decorators/injectable";
import { Lifecycle } from "./constants/lifecycle";

@Injectable({ lifecycle: Lifecycle.Transient })
class TransientService {
  public log(message: string):string {
    console.log(`[TransientService] ${message}`);
  }
}
```

In this example, TransientService is marked with a transient lifecycle, meaning a new instance will be created each time when it is requested.


# Modular Architecture
You can define and load modules using the @Module decorator. This allows for organizing services and dependencies in a modular way...

```typescript
import { Module } from "./decorators/module";
import { ExampleService } from "./services/example.service";

@Module({
  providers: [ExampleService]
})
class ExampleModule {}
```
Note : We have only the providers at this moment more coming in the way in advance.

Modules are loaded into the container as globally:
```typescript
Container.loadModule(ExampleModule);
```

## More Realworld Examples
```typescript
import { Injectable } from "./decorators/injectable";
import { DatabaseService } from "./services/database.service";
import { LoggerService } from "./services/logger.service";

@Injectable()
class UserService {
  constructor(
    private databaseService: DatabaseService,
    private loggerService: LoggerService
  ) {}

  public getUser(userName:string) {
    this.loggerService.log("Fetching user...");
    return this.databaseService.query() + " User: " + userName;
  }
}
```

## AuthService example
```typescript
import { Injectable } from "./decorators/injectable";

@Injectable()
class AuthService {
  authenticate() {
    return "Authenticated!";
  }
}

import { Module } from "./decorators/module";

@Module({
  providers: [AuthService]
})
class AuthModule {}

Container.loadModule(AuthModule);
const authService = Container.get(AuthService);
console.log(authService.authenticate());
```
Project Architecture
The project is structured as follows:

decorators: Contains decorators like @Injectable and @Module. </br>
constants: Defines constants like Lifecycle. </br>
container: Manages dependency injection and lifecycle management. </br>
services: Contains example services and their implementations. </br>
modules: Defines application modules and their configurations.

# Contributing
The project only for testing&improving myself so i appreciate it. issues or pull request are not going to accept by myside, Thank you for reading :)
