type ReaderModelProps = {
  email: string
  sequence?: number
  maxSequence?: number
  totalRead?: number
  lastEditionOpened?: string
}

class ReaderModel {
  id: string
  email: string
  sequence: number
  maxSequence: number
  totalRead: number
  lastEditionOpened: string

  constructor(props: ReaderModelProps, id?: string) {
    Object.assign(this, {
      id: id ?? crypto.randomUUID(),
      email: props.email,
      sequence: props.sequence ?? 1,
      maxSequence: props.maxSequence ?? 1,
      totalRead: props.totalRead ?? 1,
      lastEditionOpened:
        props.lastEditionOpened ?? new Date().toISOString().split('T')[0]
    })
  }

  public incrementStreak(lastEditionOpened: string) {
    this.sequence += 1
    this.totalRead += 1
    if (this.sequence > this.maxSequence) {
      this.maxSequence = this.sequence
    }
    this.lastEditionOpened = lastEditionOpened
  }

  public resetStreak(lastEditionOpened: string) {
    this.sequence = 1
    this.totalRead += 1
    this.lastEditionOpened = lastEditionOpened
  }

  private isAlreadyRead(editionDate: string): boolean {
    return new Date(this.lastEditionOpened) >= new Date(editionDate)
  }

  public updateStreak(
    editionDate: string,
    previousBusinessDay: string
  ): ReaderModel {
    if (this.isAlreadyRead(editionDate)) {
      return this
    }

    const lastEditionIsRead = this.lastEditionOpened === previousBusinessDay

    if (lastEditionIsRead) {
      this.incrementStreak(editionDate)
    } else {
      this.resetStreak(editionDate)
    }

    return this
  }
}

export { ReaderModel }
