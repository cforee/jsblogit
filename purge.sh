s3cmd del -r s3://tgiaw-production/articles
echo '' > ./manifest.html
s3cmd put ./manifest.html s3://tgiaw-production --acl-public
