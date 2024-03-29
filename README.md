# StockPhoto Web

画像共有サービスWebフロントエンド (Next.js)

## 構築手順

### .envファイルの配置

プロジェクトルートに `.env.local` を作成し、下記リンク先のシークレットの中身をコピペする

```
$ touch .env.local
```

[WEB_ENV_LOCAL](https://console.cloud.google.com/security/secret-manager/secret/WEB_ENV_LOCAL/versions?hl=ja&project=stock-photo-test)

### module インストール

プロジェクトルートでコマンド実行

```
$ yarn install
```

### 起動

プロジェクトルートでコマンド実行

```
$ yarn dev
```

起動したら http://localhost:3000 でアクセス
<br><br>

## Open API コード自動生成

本プロジェクトでは、バックエンドとの連携のため Open API (swagger) を用いた自動生成コードを使用しています

### コード自動生成手順

ghコマンドが入っていない場合はインストールし、githubにログインする

```
$ brew install gh
$ gh auth login
```

バックエンドのリポジトリから `swagger.yaml` を取得

```
$ yarn api:fetch
```

`swagger.yaml` からコード生成

```
$ yarn api:gen
```
