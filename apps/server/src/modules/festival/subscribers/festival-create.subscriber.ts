import { FestivalEntity, DayEntity } from '@blagost/server/domain';
import { uuid } from '@blagost/server/shared/uuid';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class FestivalCreateSubscriber
  implements EntitySubscriberInterface<FestivalEntity>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return FestivalEntity;
  }

  beforeInsert(event: InsertEvent<FestivalEntity>) {
    console.log(`BEFORE POST INSERTED: `, event.entity);
  }

  async afterInsert(event: InsertEvent<FestivalEntity>) {
    const festival = event.entity;
    const dayRepository = event.manager.getRepository(DayEntity);

    const interval = FestivalEntity.interval(festival);

    const daysNumber = interval.length('days');

    await Promise.all(
      Array.from({ length: daysNumber }, async (_, index) => {
        const day = dayRepository.create();
        Object.assign(day, {
          id: uuid(),
          index,
          festival,
        });
        await dayRepository.save(day);
        return day;
      })
    );
  }
}
