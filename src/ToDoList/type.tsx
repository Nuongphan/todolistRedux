interface ITodo {
  id: number,
  title: string,
  status: boolean,
}
interface InitialState {
  todos: ITodo[];
}
export type { ITodo, InitialState }
