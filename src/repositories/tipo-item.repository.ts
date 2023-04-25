import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {TipoItem, TipoItemRelations} from '../models';

export class TipoItemRepository extends DefaultCrudRepository<
  TipoItem,
  typeof TipoItem.prototype.id,
  TipoItemRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(TipoItem, dataSource);
  }
}
