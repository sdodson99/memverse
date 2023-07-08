export class MockFirebaseAdminApp {
  private _database: MockFirebaseAdminDatabase;

  constructor(data: Record<string, unknown> = {}) {
    this._database = new MockFirebaseAdminDatabase(data);
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

  set(path: string, value: unknown) {
    this.data[path] = value;
  }
}

class MockFirebaseAdminDatabaseQuery {
  private paths: string[];

  constructor(private database: MockFirebaseAdminDatabase) {
    this.paths = [];
  }

  get fullPath() {
    return this.paths.join('/');
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
    const data = this.database.get(this.fullPath);

    return {
      exists: () => Boolean(data),
      val: () => data,
    };
  }

  async set(value: unknown) {
    this.database.set(this.fullPath, value);
  }
}
