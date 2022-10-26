import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class FoundPriceEvent implements DomainEvent {
  public readonly name: EventName = "FOUND_PRICE";

  public constructor(
    public readonly pageId: string,
    public readonly price: number,
    public readonly benchmarkUrl: string
  ) {}
}
