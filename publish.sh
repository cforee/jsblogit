s3cmd put -r ./articles/*.md s3://tgiaw-production/articles/ --acl-public
ls -m ./articles > manifest.html
s3cmd put ./manifest.html s3://tgiaw-production --acl-public
