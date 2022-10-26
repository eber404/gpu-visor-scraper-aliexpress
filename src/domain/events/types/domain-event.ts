import { EventName } from "./event-name";

export abstract class DomainEvent {
  public abstract readonly name: EventName;
}
