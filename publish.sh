s3cmd put -r ./articles s3://tgiaw-production --acl-public
ls -m ./articles > manifest.html
