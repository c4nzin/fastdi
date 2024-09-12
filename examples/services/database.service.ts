import { Injectable } from "../../src/decorators/injectable";

@Injectable()
export class DatabaseService {
  public query(dbName: string): string {
    return `querying to ${dbName}`;
  }
}
