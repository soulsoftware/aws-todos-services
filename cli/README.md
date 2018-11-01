## AWS LABS

### AWS CLI

[AWS CLI Official Docs]( https://aws.amazon.com/documentation/cli/)

#### AWS CLI from DOCKER

* [mesosphere/aws-cli](https://hub.docker.com/r/mesosphere/aws-cli/)
> `docker pull mesosphere/aws-cli`
>
> ```
docker run --rm \
-t $(tty &>/dev/null && echo "-i") \
-e "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" \
-e "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" \
-e "AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}" \
-v "$(pwd):/project" \
mesosphere/aws-cli
> ```

### DYNAMODB

```
aws dynamodb list-tables
```

```
aws dynamodb delete-table --table-name todo
```

```
aws dynamodb create-table --cli-input-json file://dynamodb/schema.json"
```
