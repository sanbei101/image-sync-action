# Docker Image Sync · GitHub Action

一键把镜像同步到国内仓库,例如`华为云 SWR`、`阿里云 ACR`。

## 📦 使用

```yaml
name: sync

on:
  workflow_dispatch:
  schedule:
    - cron: "0 3 * * *" # 每天 03:00

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: sync images
        uses: sanbei101/image-sync-action@v1
        with:
          registry: swr.cn-north-4.myhuaweicloud.com
          namespace: sanbei
          username: ${{ secrets.HUAWEI_SWR_USERNAME }}
          password: ${{ secrets.HUAWEI_SWR_TOKEN }}
          images: |
            postgres:latest
            nginx:1.25
            ghcr.io/bitnami/redis:8
```
