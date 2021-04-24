export const logTypes = {
  new: 'new',
  invalid: 'invalid',
  phase1: 'phase1',
}


export class Log {
  constructor(
    public type: string,
    public id?: number,
    public turn?: number,
    public message?: string
) {
    let errorMessage = ''
    this.id = id || 0;

    switch(type) {
        case logTypes.new:
            this.setEmpty()
            break;
        case logTypes.invalid:
          errorMessage = `The log with this id not exists (id: ${id})`
          this.setInvalidLog(errorMessage)
            break
        default:
          this.setLog(turn, message)
    }
    return this
  }

  private setEmpty() {
      this.turn = 0;
      this.message = 'The list is empty.'
  }

  private setLog(turn: number = -2, message: string = '?') {
      this.turn = turn;
      this.message = message
  }

  private setInvalidLog(message: string) {
      this.turn = -1;
      this.message = message;
    }
}
