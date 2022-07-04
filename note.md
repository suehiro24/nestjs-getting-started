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
