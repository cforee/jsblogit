s3cmd put -r ./jsblogit s3://$JSBLOGIT_SOURCE_BUCKET/ --acl-public
s3cmd put index.html s3://$JSBLOGIT_SOURCE_BUCKET/index.html --acl-public

