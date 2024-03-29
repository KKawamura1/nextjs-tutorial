---
title: 'About recent JS'
date: '2020-12-05'
---

色々調べてわかったこと
JSは完全に独自の進化を遂げヤバい世界を形成している

- node.js と npm
  - 元々は front end 、つまり client の browser 上で HTML の object とかを動かすための言語だった JS を、 server side、つまり HTTP Request を受けて HTML とか client JS とかを生成するためにも使いたいという需要から、 node.js が生まれた
    - node.js 自体はライブラリではなく、独自のライブラリを含む js の実行環境
    - それまでは JS の実行環境といえば web browser だった
  - node.js には npm という package 管理ツールが付いている
    - python の pip とか poetry みたいなやつ
  - npm の代替品として yarn というものも登場した。現在のシェアは半々くらい
    - yarn のほうがナウいっぽいが、 npm が長い間デファクトだったので npm を使ったドキュメントと yarn を使ったドキュメントを両方見かける戦国時代
    - 最近の npm には npx という module 実行ツールが付いてきており、 yarn を使う人もこれだけは使うことが多い（ので、余計にわかりにくい）
- ES6 とコンパイル、 module import
  - JS 自体も進化を続けていて、 ES6 という規格で様々なナウい文法が導入された
    - というより、ES5以前の化石みたいな文法をやめられるようになった
  - が、 web ブラウザで動作するという性質上、 ES5 以前でしか動かない化石ブラウザ（主にIEを指す）のサポートを切るわけには行かず、結局古い記法しか使えなかった
  - これを解決するために、 Babel という JS コンパイラ（トランスパイラ）が登場した。これは新しい JS を古い JS に変換してくれる
  - ところで、 ES6 で登場した module （ざっくり言うと各 JS file に固有の namespace を導入して名前衝突を防ぐ機能）については、 ES6 登場より前に欲しい人がたくさんいたため、独自実装するフレームワークがいた
    - それが webpack であり、全 JS の import を解析して名前衝突を防ぐ処理をかけたのち全部を1つの JS file にまとめてくれる
    - `import { hoge } from "./fuga"` みたいに書く
    - これは元々 nodejs （正確にはそれを一般化したい CommonJS という規格）が採用していた記法であるため、実は node.js 上では webpack がなくても動く。これを web browser 上でも動かすための仕組みが webpack
  - ところが、 ES6 の import は webpack なんてサードパーティのことは知ったこっちゃないため、ES6 の import のための記法は webpack とは異なっている
    - `hoge = require("./fuga").hoge` みたいに書く
  - 先述の通り ES6 は化石ブラウザでは動かない机上の空論なので、 Babel を通すと require は import に変換される（つまり、結局 webpack がないと動かない）
  - ので、 Babel + webpack は web 業界のデファクトになっている。
    - 普段は ES6 っぽく書いてるくせに import は CommonJS で書いてるし、最後はコンパイルされて古代言語になる、という謎のプロセスをみんな経ていることになる。
- JS 直書きしたくない人々
  - どうせ全部 JS で管理するんだし、 JS と HTML を分ける必要なくね？ という気持ちから、 JSX という拡張JSを用いる react というライブラリが登場した
    - JSX では HTML が リテラルとして扱われるので、 `return <p>Hello</p>` とか書ける
    - 当然 JSX は JS ではないので、コンパイラが必要。実は前述の Babel が JSX を JS に変換してくれる
  - JS は型がなくて書きにくいので、型の付いた新しい JS が生まれた。これが type script (TS)。
    - TS は python と同じ漸進的型付けを採用していて、あらゆる型{から,に}変換できる any 型がいる
    - 当然 TS も JS ではないので、コンパイラが必要。前述の Babel が TS を JS に変換してくれる
    - もちろん TS と JSX を組み合わせた TSX もある。これも Babel がよしなに古い JS を生成してくれる
  - というわけで、 JSX/TSX が web 業界のデファクトになりつつある。JS を書いていると言っている人々が書いているのはもはや JS ではない。
- CSS 直書きしたくない人々
  - CSS は名前空間が共通なので、放っておくと名前衝突を起こす（お前もか……）
  - どうせ全部 JS で管理するんだし、 CSS も JS の中にぶち込んであげればよくね？ という気持ちから、 CSS を JS の中に文字列で埋め込んでそれを CSS として使ってくれる styled-components というライブラリが登場した
    - 一応 react なしでも動くっぽいが多くの場合 react （つまり JSX）と組み合わせて使われる
    - `const a = styled.h1\`color: red;\`` とか書く
  - それとは全く別に、同じ問題への対処として CSS を JS module に変換してそいつを import （または require） したいという思想があった
    - CSS modules というやつで、 いくつかライブラリがあるっぽいが、 webpack の css-loader というやつがデファクトっぽい
  - というわけで、 CSS modules と styled-components がバチバチに争う戦国時代が訪れている
    - どっちにもメリット・デメリットがあるっぽく、調べるときのこたけのこに近い論争が各所で起こっているのを見ることができる
  - ちょっと話はずれるが、 CSS 自体の文法がイケてないので、 Sass という CSS の拡張言語が生まれた。 JS に対する TS とか JSX みたいな立ち位置
    - 変数が使えたり四則演算ができたりする。
    - 当然こいつもコンパイルが必要。 CSS は JS ではないので Babel がコンパイルしてくれたりはしない。 Sass 自体にコンパイラが付いていて、それを使って CSS を生成する。
- web 業界はお金がたくさん動いていて需要も多いので、上で挙げたような根幹の部分以外でも、様々な戦争が起きている
  - データベースとか、状態管理とか、話題一つごとに様々なライブラリがあって鎬を削っている
- で、 next.js って？
  - SSR/CSR/SSG という新たな戦争を巻き起こすマンです（いつどこで html + client js を生成するかの違い）
  - それはそれとして Babel + webpack + CSS modules + ... みたいな各種おまじないを一手に引き受けてくれる
  - React を使うことを前提にしている（ので、 JSX を書いて Babel で変換してもらう）
    - TSX にもできる、そのときもいい感じに Babel を叩いてちゃんと JS を生成してくれる

