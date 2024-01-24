export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly crompletedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {}

    if (this.text) returnObj.text = this.text
    if (this.crompletedAt) returnObj.completedAt = this.crompletedAt

    return returnObj
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props

    if (!id || isNaN(id)) return ["Id must be a valid number"]

    if (completedAt) {
      const newCompletedAt = new Date(completedAt)
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt must be a valid date"]
      }
    }

    return [undefined, new UpdateTodoDto(id, text, completedAt)]
  }
}
