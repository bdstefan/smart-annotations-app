#!/bin/bash

curl -X POST -d "comment=This a new annotation $RANDOM" -H "Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ" -H "Accept: application/json" http://localhost:3000/annotations/
#curl -X GET -H "Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ" -H "Accept: application/json" http://localhost:3000/annotations/
#curl -X PATCH -d "comment=This an updated annotation v3" -H "Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ" -H "Accept: application/json" http://localhost:3000/annotations/5d4c6cc542882b02e50863fb
#curl -X DELETE -H "Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ" -H "Accept: application/json" http://localhost:3000/annotations/5d4c6cc542882b02e50863fb