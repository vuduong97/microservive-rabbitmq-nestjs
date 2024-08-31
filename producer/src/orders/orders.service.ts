import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  placeOrder(order: OrderDto) {
    this.rabbitClient.emit('order-placed', order);

    return {
      message: 'Order placed',
    };
  }
}
