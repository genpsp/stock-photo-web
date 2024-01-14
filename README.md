# StockPhoto Web

画像共有サービスWebフロントエンド (Next.js)

## 構築手順

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
