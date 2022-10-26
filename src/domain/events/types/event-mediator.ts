import { EventHandler } from "@/domain/events/types/event-handler";

import { DomainEvent } from "./domain-event";

export abstract class EventMediator {
  public abstract subscribe(handler: EventHandler): void;
  public abstract subscribeAll(handlers: EventHandler[]): void;
  public abstract publish(event: DomainEvent): void;
}
