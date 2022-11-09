import {container} from "tsyringe";
import {TicketEventHandler} from "./TicketHandler";

/**
 * `container.registerSingleton(TicketEventHandler.name, TicketEventHandler)`
 * 핸들러 등록시 위와 같은 형태로 Token 을 name 으로써 등록해야함.
 *
 * 추후 runEvent 에서 컨테이너를 이용해서 핸들러 인스턴스를 꺼내쓸 때 컨벤션임.
 */
export const handlerConfiguration = () => {
    container.registerSingleton(TicketEventHandler.name, TicketEventHandler)
}