# DevTalles - Node: De cero a experto

<small>Sección 13: WebServer - Http/Http2</small>

1. Clonar `.env.template` en `.env`
2. Levantar base de datos `npm run db:start`
3. `npm run dev`

## Documentación

**`GET`** get todos

```curl
curl --location 'http://localhost:3000/api/todos/'
```

**`POST`** create todo

```curl
curl --location 'http://localhost:3000/api/todos/' \
--header 'Content-Type: application/json' \
--data '{ "text": "New todo" }'
```

**`UPDATE`** update todo

```curl
curl --location --request PUT 'http://localhost:3000/api/todos/:id' \
--header 'Content-Type: application/json' \
--data '{ "text": "Updated todo" }'
```

**`DELETE`** delete todo

```curl
curl --location --request DELETE 'http://localhost:3000/api/todos/:id'
```
