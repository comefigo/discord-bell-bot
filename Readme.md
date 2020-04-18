# 概要

ボイスチャネルに人がいれば、ボットが順にチャイムを鳴らしていきます
ボット（人も同様）が同時に複数チャネルに参加できないので、このような仕様になっています...

# 前提条件

- Discordのアカウントが開設済みであること
- サーバの管理者であること
- dockerおよびdocker-composeがインストールされていること

# 手順

## 1. DiscordのBotを作成

[Discord Developer Portal](https://discordapp.com/developers/applications)で新規アプリケーションを作成します
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/30522/aaae0870-f612-5638-6d8a-17f10c5d69c2.png)

アプリケーションに適当な名前を付けた後は、Botを作成します
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/30522/49f343d6-ea80-15aa-8d5f-671794fb4e24.png)

アクセス用TOKENを控えときましょう
**PUBLIC BOTは無効化**することをお勧めします
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/30522/c99aed6e-f218-74c6-26d8-2c78ccb617f2.png)

OAuth2用にBotのアクセス権限を選択し、URLを「Copy」します
当サンプルコードでは「Stream」権限のみでOKです
※当記事公開後にこのBotは削除しますので、client_idはそのままになっています
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/30522/0c44c28a-844a-569a-df49-5a97f3b4f512.png)

コピーしたURLを新しいタブで開き、追加するサーバを選択します
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/30522/ecb74445-78db-ca42-e64d-98260cffef08.png)

追加したサーバに以下の様にメッセージが表示されたらOKです
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/30522/b23f93b0-2e72-b962-0846-49f46420c94c.png)

## 2. プログラムをスケジュール実行

サンプルコードを取得し、docker-compose.ymlの以下の変数を修正します

- TOKEN_ID･･･前述で控えたアクセスTOKEN
- MUSIC_FILE･･･チャイムの音楽ファイルを差し替える場合は、そのファイルパスを記載
- INTERVAL_TIME･･･チャネルからチャネルに移る際の待ち時間（最低2秒）
    ※この待ち時間がないと正常に動作しません！

cronで`docker-compose up -d`指定するのみ！

### Docker環境がない場合以下

- Node.jsをインストール
- サンプルコードのapp配下で`npm install`
- TOKEN_ID、MUSIC_FILE、INTERVAL_TIMEを環境変数化するか、app.js内のそれらのコードを直書きする
- cronで`npm start`指定する

# 開発方法

VSCodeのRemote Containerをサポートしています

# 著作権

チャイム素材は[OtoLogic](https://otologic.jp/free/se/school_bell01.html)より取得しました