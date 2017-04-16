s3cmd del -r s3://$JSBLOGIT_SOURCE_BUCKET/articles
echo '' > ./manifest.html
s3cmd put ./manifest.html s3://$JSBLOGIT_SOURCE_BUCKET --acl-public
