# Firefox OS アプリテンプレート
Firefox OS アプリを作って Heroku や Github を使って公開するためのテンプレートです。

## ファイル構成

アプリ本体のファイル:
* public/index.html
  * アプリ本体の HTML
* public/manifest.webapp
  * アプリ情報ファイル

Heroku 展開用ファイル:
* Gemfile
  * sinatra 使うと宣言
* Gemfile.lock
  * Gemfile を元に `bundle install` で生成される
* Procfile
  * heroku で起動するプロセス指定
* web.rb

GitHub Pages 用ファイル:
* CNAME
  * GitHub Pages で独自ドメイン運用する場合に必要


----------------------------------------
## Heroku で公開する (推奨)
Heroku は Ruby や Python などのプログラムを動作させる PaaS であるが、このテンプレートでは静的ファイルをホスティングする Web サーバとしてのみ利用しています。

このリポジトリを git clone したら heroku アプリを作成し、そのままデプロイしてみてください:

```
heroku login
heroku apps:create <APPNAME>
git push heroku master
```
heroku の create コマンドで指定したアプリ名に応じて http://APPNAME.herokuapp.com/ ドメインで公開されます。http://hostedapp.herokuapp.com/ と同様に見られるようになっていれば OK です。

Ruby の Sinatra を使って public ディレクトリのファイルをそのまま返すだけの最小限の設定を web.rb に書いているので、公開したいファイルを public ディレクトリ配下に入れたら git コマンドで Heroku に push してください:
```
git add .
git commit -m "commite-message"
git push heroku master
```

ローカルで動作確認したいのであれば ruby, bundler, foreman などが必要ですが、Heroku にガンガン Deploy して試すだけなら heroku と git コマンドがあれば十分です。

Heroku についてはこの辺りを参照:
* [Getting Started with Heroku](https://devcenter.heroku.com/articles/quickstart)
* [Getting Started with Ruby on Heroku](https://devcenter.heroku.com/articles/ruby)


## Heroku で独自ドメインを使う

DNS で使いたいドメインの CNAME レコードに APPNAME.herokuapp.com を設定して次のコマンドを実行するだけで独自ドメインでアプリを公開できます。
```
heroku domains:add APPNAME.herokuapp.com
```

独自ドメインを使う場合についてはこの辺りを参照:
* [Custom Domains](https://devcenter.heroku.com/articles/custom-domains)


----------------------------------------
## GitHub Pages で公開する

GitHub ではリポジトリのファイルをそのまま Web ホスティングしてくれる GitHub Pages と言われる機能があります。これは各リポジトリに gh-pages という名前のブランチを作ることで有効になります。USERNAME.github.io という名前のリポジトリの gh-pages ブランチは http://USERNAME.github.io/ ドメインルートで、それ以外のリポジトリ REPONAME のgh-pages ブランチは http://USERNAME.github.io/REPONAME/ ディレクトリ配下で公開されます。

そのため、次のようなコマンドで master ブランチではなく gh-pages ブランチに push することでアプリを公開できます。

```
git push origin master:gh-pages
```

ただし、このリポジトリのファイルは Heroku を想定して public ディレクトリ配下にアプリファイルを入れているため http://USERNAME.github.io/REPONAME/public/ というディレクトリで公開されることになるので注意してください。

そもそも、ドメインとアプリが 1:1 で対応する Firefox OS アプリでは使えるドメインが一つだけでは不便なので、GitHub Pages での公開はあまり使いやすくありません。アプリ毎に [GitHub の Organization を作って](https://github.com/account/organizations/new) ORGNAME.github.is リポジトリで公開するなら自由に新しいドメインを作れるので、テストではなくアプリを GitHub Pages で公開するのであれば Organization アカウントの GitHub Pages で公開するのが良いかと思います。


## GitHub Pages で独自ドメインを使う

独自ドメインを用意すれば GitHub Pages でも DNS で使いたいドメインの CNAME レコードに USERNAME.github.com を設定して CNAME ファイルにドメイン名を書いておくだけで独自ドメインで公開できます。この場合は Organization アカウントも不要です。

もちろん GitHub Pages ではパフォーマンスなどの制約もあるので、独自ドメインでも Heroku で公開した方が良いかも知れません。

独自ドメインを使う場合についてはこの辺りを参照:
* [Setting up a custom domain with Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)
* [GitHub Pages で独自ドメインのアプリを公開する](https://gist.github.com/dynamis/4975455)

