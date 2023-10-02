import BaseEntity from "../../@shared/entity/base.entity";
import Id from "../../@shared/value-object/id.value-object";

type TodoProps = {
  id?: Id;
  title: string;
  description?: string;
  favorite?: boolean;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Todo extends BaseEntity {
  private _title: string;
  private _description?: string;
  private _favorite: boolean;
  private _color: string;

  constructor(props: TodoProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._title = props.title;
    this._description = props.description;
    this._favorite = props.favorite || false;
    this._color = props.color || "blue";
  }

  get title(): string {
    return this._title;
  }

  get description(): string | null {
    return this._description || null;
  }

  get favorite(): boolean {
    return this._favorite;
  }

  get color(): string {
    return this._color;
  }

  set title(title: string) {
    if (title.length === 0) throw new Error("Titulo nao pode ser vazio");
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set color(color: string) {
    if (color.length === 0) throw new Error("Nenhuma cor selecionada");
    this._color = color;
  }

  toggle() {
    this._favorite = !this._favorite;
  }
}
