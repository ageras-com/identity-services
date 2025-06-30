# identity-services API

# Database

## Build

```bash
npm run db:start
```

### Db helper scripts

Destroys the database container AND volume

```bash
npm run db:destroy
```

Destroys the database container AND volume and creates a new one

```bash
npm run db:reset
```

## Migrations

### Option 1: Manual

Create a new empty migration file

```bash
npm run migration:create --name=<migration-name>
```

### Option 2: From Entity Changes

Generates a migration script based on changes in the Entity files

```bash
npm run migration:generate --name=<migration-name>
```

### Option 3: Create Entity from db Schema

Not a common use case, but you can create an entities from an existing database schema.
With [typeorm-model-generator](https://github.com/Kononnable/typeorm-model-generator)

### Run Migrations

Remember to import the migration scripts into `apps/api/migrations/index.ts`

```bash
npm run migration:run
```


