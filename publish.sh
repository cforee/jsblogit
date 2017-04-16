s3cmd put -r ./articles/*.md s3://$JSBLOGIT_SOURCE_BUCKET/articles/ --acl-public
ls -m ./articles > manifest.html
s3cmd put ./manifest.html s3://$JSBLOGIT_SOURCE_BUCKET/jsblogit/ --acl-public
