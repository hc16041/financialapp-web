import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface Event {
    type: string;
    payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private handler = new Subject<Event>();
    constructor() { }

    /**
   * Publica un evento en el bus interno.
   * @param type Tipo de evento a notificar.
   * @param payload Carga útil opcional a entregar.
   */
    broadcast(type: string, payload = {}) {
        this.handler.next({ type, payload });
    }

    /**
   * Suscribe a un evento concreto y ejecuta el callback con su payload.
   * @param type Tipo de evento a escuchar.
   * @param callback Función a ejecutar con el payload.
   * @returns Suscripción RxJS para permitir cancelación.
   */
    subscribe(type: string, callback: EventCallback): Subscription {
        return this.handler.pipe(
            filter(event => event.type === type)).pipe(
                map(event => event.payload))
            .subscribe(callback);
    }
}
