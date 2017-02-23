import {Injectable} from "@angular/core";
import {LIST_FONT,Font} from "../components/style";


@Injectable()
export class StyleService{
    getFonts(): Promise<Font[]>{
        return Promise.resolve(LIST_FONT);
    }
}