export class MockFirebaseAdminApp {
  private _database: MockFirebaseAdminDatabase;

  constructor(initialData: Record<string, unknown> = {}) {
    this._database = new MockFirebaseAdminDatabase(initialData);
  }

  database() {
    return {
      ref: (path: string) =>
        new MockFirebaseAdminDatabaseQuery(this._database).ref(path),
    };
  }
}

class MockFirebaseAdminDatabase {
  private data: Record<string, unknown>;

  constructor(initialData: Record<string, unknown>) {
    this.data = initialData;
  }

  ref(path: string) {
    return new MockFirebaseAdminDatabaseQuery(this).ref(path);
  }

  get(path: string) {
    return this.data[path];
  }
}

class MockFirebaseAdminDatabaseQuery {
  private paths: string[];

  constructor(private database: MockFirebaseAdminDatabase) {
    this.paths = [];
  }

  ref(path: string) {
    this.paths.push(path);

    return this;
  }

  child(path: string) {
    this.paths.push(path);

    return this;
  }

  async get() {
    const fullPath = this.paths.join('/');
    const data = this.database.get(fullPath);

    return {
      exists: () => Boolean(data),
      val: () => data,
    };
  }
}
