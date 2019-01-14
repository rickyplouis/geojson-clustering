## addressclustering [![Build Status](https://travis-ci.org/rickyplouis/addressClustering.svg?branch=master)](https://travis-ci.org/rickyplouis/addressClustering)

A tool built to allow k-means clustering of geoJSON data.

1. Run on mock dataset

```
$ node index.js
```

2. Run on your dataset
```
$ node index.js filename.geojson [clusters=] [max=]
```
### Optional params

* clusters: number of clusters to organize data into
* max: the max number of iterations that will be used for creating clusters and centroids
