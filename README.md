

`npm i`
`npm run build core`


`fesm2015/sla-ng-core.js -> updateLookupById` is different than `esm2015/lookup/lookup.service.js -> updateLookupById`

The following code is dropped

```
if (lookup.withDataHolder) {
    result = dataHolder.data[0];
}
else {
    result = dataHolder;
}
```
