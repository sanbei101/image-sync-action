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
        uses: sanbei101/image-sync-action@v1.2.0
        with:
          source_registry: dhi.io
          source_username: ${{ secrets.DOCKER_HUB_USERNAME }}
          source_password: ${{ secrets.DOCKER_HUB_TOKEN }}
          registry: swr.cn-north-4.myhuaweicloud.com
          namespace: sanbei
          username: ${{ secrets.HUAWEI_SWR_USERNAME }}
          password: ${{ secrets.HUAWEI_SWR_TOKEN }}
          images: |
            dhi.io/redis:8
            dhi.io/postgres:18
            dhi.io/caddy:2
```
## 📄 从 txt 读取镜像列表

支持通过 `images_file` 直接读取镜像列表文件（每行一条）。

- 空行会被忽略
- 以 `#` 开头的行会被当作注释忽略
- `images` 与 `images_file` 可同时使用，最终会合并

例如仓库中有 `images.txt`：

```txt
# base images
dhi.io/redis:8
dhi.io/postgres:18
```

Action 配置：

```yaml
- name: sync images
  uses: sanbei101/image-sync-action@v1.2.0
  with:
    source_registry: dhi.io
    source_username: ${{ secrets.DOCKER_HUB_USERNAME }}
    source_password: ${{ secrets.DOCKER_HUB_TOKEN }}
    registry: swr.cn-north-4.myhuaweicloud.com
    namespace: sanbei
    username: ${{ secrets.HUAWEI_SWR_USERNAME }}
    password: ${{ secrets.HUAWEI_SWR_TOKEN }}
    images_file: ./images.txt
```
```
