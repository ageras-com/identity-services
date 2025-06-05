# identity-services

Identity Services for IAM maintained by Core Services

# Dependencies

This will install yarn, turbo, and nestjs cli globally.

```bash
npm install -g yarn
yarn global add turbo
yarn global add @nestjs/cli
```

# DB

Setup docker-compose to run the database.

```bash
docker-compose -f apps/api/docker-compose.yml up -d
```

# Running the project

```bash
yarn install
yarn dev
```

# Project resources overview

| Resource    | Description                   | Address                   |
|-------------|-------------------------------|---------------------------|
| Portal      | Identity Services Portal      | http://localhost:3300     |
| API         | Identity Services API         | http://localhost:3301     |
| API Swagger | Identity Services API Swagger | http://localhost:3301/api |
| DB          | Identity Services Database    | localhost:3302            |