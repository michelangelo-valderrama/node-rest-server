import request from "supertest"
import { testServer } from "../../test-server"
import { prisma } from "../../../src/data/postgres"

const todo1 = { text: "Hello, world. 01", completedAt: null }
const todo2 = { text: "Hello, world. 02", completedAt: null }

describe("Todo route testing", () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(() => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })

  test("should return TODOs api/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    })

    const { body } = await request(testServer.app).get("/api/todos").expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
  })

  test("should return a TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo?.id}`)
      .expect(200)

    expect(body).toEqual({
      id: todo?.id,
      ...todo1,
    })
  })

  test("should return a 404 NotFound api/todos/:id", async () => {
    const id = "123"

    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .expect(404)
    expect(body).toEqual({ error: `Todo with id ${id} not found.` })
  })

  test("should return a new TODO api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      ...todo1,
    })
  })

  test("should update a TODO api/todos", async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send(todo2)
      .expect(200)

    expect(body).toEqual({
      id: todo.id,
      ...todo2,
    })
  })

  test("should delete a TODO", async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200)

    expect(body).toEqual(todo)
  })

  test("should return 404 if TODO do not exist api/todos/:id", async () => {
    const id = 890
    
    const { body } = await request(testServer.app)
      .delete(`/api/todos/${id}`)
      .expect(404)

    expect(body.error).toEqual(`Todo with id ${id} not found.`)
  })
})
