import { injectable } from "tsyringe";

import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";

@injectable()
export class DomainMediator implements EventMediator {
  private readonly handlers: EventHandler[] = [];

  public subscribe(handler: EventHandler): void {
    this.handlers.push(handler);
  }

  public subscribeAll(handlers: EventHandler[]): void {
    this.handlers.push(...handlers);
  }

  public publish(event: DomainEvent): void {
    for (const handler of this.handlers) {
      if (handler.eventName === event.name) {
        handler.handle(event);
      }
    }
  }
}
