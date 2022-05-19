import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { LookupBean } from '../models/lookup.model';


@Injectable({
    providedIn: 'root',
})
export class LookupService {

    private lookupDataMap: Map<string, Map<any, any>> = new Map<string, Map<any, any>>();
    private lookupMap: Map<string, LookupBean> = new Map<string, LookupBean>();

    private blocked: Map<string, Observable<any>> = new Map<string, Observable<any>>();

    constructor(
        private myHttpClientService: HttpClient,
    ) {
    }

    public updateLookupById(lookupName: string, id: any, updateLookup?: boolean): Promise<any> {
        const lookup: LookupBean = this.lookupMap.get(lookupName);
        return new Promise<any>((resolve: any): any => {
            if (lookup) {
                if (!!this.blocked.get(lookup.url + '/' + id)) {
                    this.blocked.get(lookup.url + '/' + id).subscribe((dataHolder: any) => {
                        let result: any;
                        if (lookup.withDataHolder) {
                            result = dataHolder.data[ 0 ];
                        } else {
                            result = dataHolder;
                        }
                        if (updateLookup) {
                            this.updateLookupWithObject(lookupName, result);
                        }
                        resolve(result);
                    }, () => resolve(null));
                } else {
                    const sub: any = this.myHttpClientService.get(lookup.url + '/' + id).pipe(share());
                    this.blocked.set(this.lookupMap.get(lookupName).url + '/' + id, sub);
                    sub.subscribe((dataHolder: any) => {
                        let result: any;
                        if (lookup.withDataHolder) {
                            result = dataHolder.data[ 0 ];
                        } else {
                            result = dataHolder;
                        }
                        if (updateLookup) {
                            this.updateLookupWithObject(lookupName, result);
                        }
                        this.blocked.delete(lookup.url + '/' + id);
                        resolve(result);
                    }, () => resolve(null));
                }
            } else {
                console.warn('Lookup mit dem lookupNamen "' + lookupName + '" konnte nicht gefunden werden');
                console.warn('Geladene Lookups: ' + Array.from(this.lookupMap.keys()).toString());
                resolve(null);
            }
        });
    }

    public updateLookupWithObject(lookupName: string, obj: any, isMap?: boolean): void {
        console.log(lookupName, obj, isMap);
    }


}
