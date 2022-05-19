import { Observable, Subject } from 'rxjs';
import { QueryParam } from './query-param.model';

export class LookupBean {
    public url: string;
    public selector: string;
    public webSocketType: string;
    public queryParams: QueryParam[];
    public queryParamsStartEnd: { start?: QueryParam, end?: QueryParam }[];
    public queryParamStart: QueryParam;
    public queryParamEnd: QueryParam;
    public sub: { subject: Subject<any>, observable: Observable<any>, reset(): void };
    public withDataHolder: boolean;
    public pathParam: string | number;
    public fetchedAllData: boolean;
    public mapper: (data: any) => any;

    constructor(url: string, selector: string, queryParams: QueryParam[], queryParamStart: QueryParam, queryParamEnd: QueryParam,
                sub: { subject: Subject<any>, observable: Observable<any>, reset(): void }, withDataHolder: boolean = true,
                mapper: (data: any) => any = null, queryParamsStartEnd?: { start?: QueryParam, end?: QueryParam }[]) {
        this.url = url;
        this.selector = selector;
        this.queryParams = queryParams;
        this.queryParamStart = queryParamStart;
        this.queryParamEnd = queryParamEnd;
        this.sub = sub;
        this.withDataHolder = withDataHolder;
        this.fetchedAllData = false;
        const map: any = (data: any): any => {
            return data;
        };
        if (!mapper) {
            this.mapper = map;
        }
        this.queryParamsStartEnd = queryParamsStartEnd;
    }

    public addWebSocket(typeName: string): LookupBean {
        this.webSocketType = typeName;
        return this;
    }

    public addQueryParam(queryParam: QueryParam): LookupBean {
        if (!this.queryParams) {
            this.queryParams = [];
        }
        this.queryParams.push(queryParam);
        return this;
    }

    public addQueryParams(queryParams: QueryParam[]): LookupBean {
        if (!this.queryParams) {
            this.queryParams = [];
        }
        this.queryParams = [ ...this.queryParams, ...queryParams ];
        return this;
    }

    /**
     * @deprecated Use addQueryParamsStartEnd instead
     */
    public addQueryParamStart(queryParam: QueryParam): LookupBean {
        this.queryParamStart = queryParam;
        return this;
    }

    /**
     * @deprecated Use addQueryParamsStartEnd instead
     */
    public addQueryParamEnd(queryParam: QueryParam): LookupBean {
        this.queryParamEnd = queryParam;
        return this;
    }

    public addQueryParamStartEnd(start?: QueryParam, end?: QueryParam): LookupBean {
        if (!this.queryParamsStartEnd) {
            this.queryParamsStartEnd = [];
        }
        this.queryParamsStartEnd.push({ start, end });
        return this;
    }

    public addQueryParamsStartEnd(queryParamsStartEnd: { start?: QueryParam, end?: QueryParam }[]): LookupBean {
        if (!this.queryParamsStartEnd) {
            this.queryParamsStartEnd = [];
        }
        this.queryParamsStartEnd = [ ...this.queryParamsStartEnd, ...queryParamsStartEnd ];
        return this;
    }

    public withoutDataHolder(): LookupBean {
        this.withDataHolder = false;
        return this;
    }

    public addPathParam(paramValue: number | string): LookupBean {
        this.pathParam = paramValue;
        return this;
    }

    public addMapper(mapper: (data: any) => any): void {
        this.mapper = mapper;
    }
}
