import {Injectable} from "@angular/core";
import {LIST_LAYER, Layer} from "../components/layer";


@Injectable()
export class LayerService{
    getLayers():Promise<Layer[]>{
        return Promise.resolve(LIST_LAYER);
    }
}