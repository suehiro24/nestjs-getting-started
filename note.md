### Create nest project

```
npx @nestjs/cli new nest-project
# .gitignoreだけ使いたい
cd nest-project  && rm -rf .git && cd ..
```

### Start container

```
docker compose up -d && docker exec -it nest bash
```

### Use CLI's CRUD generator

```
nest g resource

> ? What name would you like to use for this resource (plural, e.g., "users")? users
> ? What transport layer do you use? REST API
> ? Would you like to generate CRUD entry points? Yes
```
