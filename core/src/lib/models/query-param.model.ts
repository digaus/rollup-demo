export class QueryParam {
    public key: string;
    public value: any;
    /**
     * value > result -> 1, value < result -> -1, value == result -> 0
     */
    public compareFnc?: (value: any, result: any) => 1 | -1 | 0;
}
