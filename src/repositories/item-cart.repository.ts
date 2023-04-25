import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Cart, Espectador, ItemCart, ItemCartRelations, PrecioLocalidad, AsientoEvento, TipoItem} from '../models';
import {CartRepository} from './cart.repository';
import {EspectadorRepository} from './espectador.repository';
import {PrecioLocalidadRepository} from './precio-localidad.repository';
import {AsientoEventoRepository} from './asiento-evento.repository';
import {TipoItemRepository} from './tipo-item.repository';

export class ItemCartRepository extends DefaultCrudRepository<
  ItemCart,
  typeof ItemCart.prototype.id,
  ItemCartRelations
> {

  public readonly cart: BelongsToAccessor<Cart, typeof ItemCart.prototype.id>;

  public readonly espectador: BelongsToAccessor<Espectador, typeof ItemCart.prototype.id>;

  public readonly precioLocalidad: BelongsToAccessor<PrecioLocalidad, typeof ItemCart.prototype.id>;

  public readonly asientoEvento: BelongsToAccessor<AsientoEvento, typeof ItemCart.prototype.id>;

  public readonly tipoItem: BelongsToAccessor<TipoItem, typeof ItemCart.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
    @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>,
    @repository.getter('EspectadorRepository') protected espectadorRepositoryGetter: Getter<EspectadorRepository>, @repository.getter('PrecioLocalidadRepository') protected precioLocalidadRepositoryGetter: Getter<PrecioLocalidadRepository>, @repository.getter('AsientoEventoRepository') protected asientoEventoRepositoryGetter: Getter<AsientoEventoRepository>, @repository.getter('TipoItemRepository') protected tipoItemRepositoryGetter: Getter<TipoItemRepository>,
  ) {
    super(ItemCart, dataSource);
    this.tipoItem = this.createBelongsToAccessorFor('tipoItem', tipoItemRepositoryGetter,);
    this.registerInclusionResolver('tipoItem', this.tipoItem.inclusionResolver);
    this.asientoEvento = this.createBelongsToAccessorFor('asientoEvento', asientoEventoRepositoryGetter,);
    this.registerInclusionResolver('asientoEvento', this.asientoEvento.inclusionResolver);
    this.precioLocalidad = this.createBelongsToAccessorFor('precioLocalidad', precioLocalidadRepositoryGetter,);
    this.registerInclusionResolver('precioLocalidad', this.precioLocalidad.inclusionResolver);
    this.espectador = this.createBelongsToAccessorFor('espectador', espectadorRepositoryGetter,);
    this.registerInclusionResolver('espectador', this.espectador.inclusionResolver);
    this.cart = this.createBelongsToAccessorFor('cart', cartRepositoryGetter,);
    this.registerInclusionResolver('cart', this.cart.inclusionResolver);

  }
}
