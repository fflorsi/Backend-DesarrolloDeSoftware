export interface Repository<T> {
  findAll(): Promise<T[] | undefined>
  findOne(vaccine: {id: string}): Promise<T | undefined>
  add(vaccine: T): Promise<T | undefined>
  update(id: string, vaccine: T): Promise<T | undefined>
  delete(vaccine: {id:string}): Promise<T | undefined>
}
