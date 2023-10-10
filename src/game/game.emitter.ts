import { Injectable, } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
	public emitter: EventEmitter2 = new EventEmitter2();
}
