import React, { useState } from 'react';
import { Dog, Home, Users, Clock, Volume2, Droplets, Heart, AlertCircle, Briefcase, Baby, Activity } from 'lucide-react';
import { DollarSign, TrendingUp, Calendar, PiggyBank } from 'lucide-react';

// 病気・怪我の詳細説明データベース
const diseaseDetails: { [key: string]: { description: string; prevention: string } } = {
  // あ行
  'アトピー性皮膚炎': {
    description: '環境中のアレルゲンに対する過敏反応による皮膚炎。かゆみや発疹が特徴で、慢性的な管理が必要です。',
    prevention: '定期的なシャンプー、アレルゲンの特定と除去、処方食の使用、獣医師の指導のもと適切な薬物治療を行います。'
  },
  'アレルギー性皮膚炎': {
    description: '食物や環境アレルゲンによる皮膚炎。かゆみ、脱毛、皮膚の赤みなどの症状が現れます。',
    prevention: 'アレルゲン検査で原因を特定し、アレルギー対応フード、環境の清潔維持、定期的な皮膚ケアが重要です。'
  },
  '外耳炎': {
    description: '耳の外耳道に起こる炎症。垂れ耳の犬種に多く、定期的な耳掃除が予防に重要です。',
    prevention: '週1回程度の耳掃除、耳内の通気性確保、シャンプー後の耳の乾燥、定期的な獣医師チェックが効果的です。'
  },

  // か行
  '股関節形成不全': {
    description: '股関節の発育異常。遺伝的要因が強く、大型犬に多い。運動制限や手術が必要になることがあります。',
    prevention: '適切な体重管理、過度な運動を避ける、子犬期の栄養管理、滑りにくい床材の使用が予防に役立ちます。'
  },
  '肘関節形成不全': {
    description: '肘関節の発育異常。前肢の跛行や痛みを引き起こし、進行すると関節炎になります。',
    prevention: '成長期の適切な栄養管理、過度な運動制限、体重管理、早期発見のための定期検診が重要です。'
  },
  '気管虚脱': {
    description: '気管が潰れて呼吸困難を起こす疾患。小型犬に多く、咳や呼吸音の異常が特徴です。',
    prevention: '首輪ではなくハーネスの使用、肥満予防、興奮を避ける、適切な室温・湿度管理が効果的です。'
  },
  '膝蓋骨脱臼': {
    description: '膝のお皿（膝蓋骨）がずれる疾患。小型犬に多く、重症の場合は手術が必要です。',
    prevention: '滑りにくい床材、適切な体重維持、激しいジャンプを避ける、筋力維持のための適度な運動が予防になります。'
  },
  '緑内障': {
    description: '眼圧が上昇して視神経が損傷される病気。放置すると失明する可能性があります。',
    prevention: '定期的な眼圧測定、早期発見と治療、眼科専門医の定期検診が重要です。家系に発症歴がある場合は特に注意が必要です。'
  },
  '骨折': {
    description: '骨が折れる外傷。超小型犬や華奢な犬種は骨が細く、高所からの落下などで骨折しやすい傾向があります。',
    prevention: '高所からの飛び降り防止、階段使用の制限、滑りにくい床材、抱っこ時の注意が骨折予防に効果的です。'
  },
  '骨肉腫': {
    description: '骨に発生する悪性腫瘍。大型犬に多く、早期発見と治療が重要です。',
    prevention: '定期的な健康診断、跛行などの異常の早期発見、過度な運動負荷の回避が重要です。'
  },

  // さ行
  '歯周病': {
    description: '歯と歯茎の病気。口臭や歯の脱落を引き起こし、全身の健康にも影響します。',
    prevention: '毎日の歯磨き、歯石除去、デンタルケア用おやつ、定期的な歯科検診が予防に効果的です。'
  },
  '白内障': {
    description: '目の水晶体が白濁する病気。進行すると視力が低下し、失明することもあります。',
    prevention: '定期的な眼科検診、抗酸化サプリメントの使用、糖尿病の予防・管理が白内障予防に役立ちます。'
  },
  '進行性網膜萎縮症': {
    description: '網膜が徐々に変性する遺伝性疾患。夜盲から始まり、最終的に失明します。',
    prevention: '遺伝子検査による繁殖管理が最も重要。発症後は環境の変更を最小限にし、生活の質を維持します。'
  },
  '心臓病': {
    description: '心臓の機能障害。咳、呼吸困難、運動不耐性などの症状が現れます。',
    prevention: '定期的な心臓検査、適切な運動量、塩分控えめの食事、肥満予防が心臓病予防に重要です。'
  },
  '先天性聴覚障害': {
    description: '生まれつき聴覚に障害がある状態。ダルメシアンなど特定犬種に多く見られます。',
    prevention: '繁殖時の聴覚検査、遺伝子検査による繁殖管理が予防の基本。発症犬には視覚的な合図を使った訓練が有効です。'
  },
  '僧帽弁閉鎖不全症': {
    description: '心臓の僧帽弁が正常に閉じなくなる病気。小型犬に多く、進行すると心不全を起こします。',
    prevention: '定期的な心臓エコー検査、早期発見と治療、適切な運動管理、塩分制限食が進行抑制に効果的です。'
  },
  '脊髄空洞症': {
    description: '脊髄内に液体の溜まった空洞ができる病気。首や肩の痛み、神経症状を引き起こします。',
    prevention: 'MRI検査による早期発見、首への負担を減らす（首輪よりハーネス）、遺伝的素因のある犬の繁殖制限が重要です。'
  },

  // た行
  '短頭種気道症候群': {
    description: '短頭種特有の呼吸器の構造異常。いびき、呼吸困難、熱中症のリスクが高まります。',
    prevention: '適切な体重管理、暑い時間の散歩を避ける、興奮を避ける、必要に応じて外科手術を検討します。'
  },
  '椎間板ヘルニア': {
    description: '背骨の椎間板が飛び出して神経を圧迫する病気。胴長犬種に多く、麻痺を起こすこともあります。',
    prevention: '階段やソファへの飛び乗り防止、適切な体重管理、背中への負担軽減、抱き方の工夫が予防に効果的です。'
  },
  '糖尿病': {
    description: 'インスリンの不足や機能低下による病気。多飲多尿、体重減少などの症状が現れます。',
    prevention: '適切な体重管理、バランスの取れた食事、定期的な運動、定期的な血糖値チェックが予防に重要です。'
  },
  '甲状腺機能低下症': {
    description: '甲状腺ホルモンの分泌低下。元気がない、肥満、脱毛などの症状が見られます。',
    prevention: '定期的な血液検査、適切な栄養管理、早期発見と治療が重要。ホルモン補充療法で管理可能です。'
  },
  'てんかん': {
    description: '脳の異常な電気活動による発作。遺伝的要因が関与することがあります。',
    prevention: '発作の記録、ストレス軽減、規則正しい生活、獣医師の指導のもと抗てんかん薬の適切な使用が管理に重要です。'
  },

  // な行
  '涙やけ（流涙症）': {
    description: '過剰な涙で目の周りが変色する状態。白い被毛の犬種で目立ちやすく、目のケアが必要です。',
    prevention: '毎日の目の周りの清拭、涙管の詰まり除去、アレルギー対策、専用フードの使用が効果的です。'
  },
  '尿路結石': {
    description: '尿路に結石ができる病気。頻尿、血尿、排尿困難などの症状が現れます。',
    prevention: '十分な水分摂取、処方食の使用、定期的な尿検査、適切なpH管理が結石予防に効果的です。'
  },

  // は行
  '肥満': {
    description: '過剰な体重増加。関節疾患、糖尿病、心臓病などのリスクを高めます。',
    prevention: '適切なカロリー管理、定期的な運動、おやつの制限、定期的な体重測定が肥満予防に重要です。'
  },
  '皮膚炎': {
    description: '皮膚の炎症。アレルギー、細菌、寄生虫など様々な原因があります。',
    prevention: '定期的なブラッシング、適切なシャンプー、ノミ・ダニ予防、清潔な飼育環境の維持が予防に効果的です。'
  },
  '変性性脊髄症': {
    description: '脊髄が変性する進行性の神経疾患。後肢の麻痺から始まり、徐々に進行します。',
    prevention: '遺伝子検査による繁殖管理、適度な運動、リハビリテーション、生活の質を維持するサポートが重要です。'
  },
  '壊死性髄膜脳炎': {
    description: 'パグに特有の脳の炎症性疾患。発作や神経症状を引き起こし、致命的になることがあります。',
    prevention: '遺伝的素因の理解、早期の神経症状発見、獣医師による適切な治療が重要です。予防法は確立されていません。'
  },

  // ま行
  '水頭症': {
    description: '脳内に脳脊髄液が過剰に溜まる病気。超小型犬に多く、神経症状を引き起こします。',
    prevention: '繁殖時のスクリーニング、頭部への衝撃回避、神経症状の早期発見、必要に応じた外科的治療が重要です。'
  },
  '門脈シャント': {
    description: '肝臓への血流が正常に流れない先天性の血管異常。成長不良や神経症状を引き起こします。',
    prevention: '繁殖時のスクリーニング、早期発見、低タンパク食、外科的治療の検討が管理に重要です。'
  },
  '悪性腫瘍（がん）': {
    description: '悪性の腫瘍。早期発見と治療が重要で、定期的な健康診断が推奨されます。',
    prevention: '定期的な健康診断、しこりの早期発見、バランスの取れた食事、適度な運動が予防に役立ちます。'
  },

  // ら行
  'レッグペルテス病': {
    description: '大腿骨頭への血流障害による病気。小型犬の若齢期に多く、跛行や痛みを引き起こします。',
    prevention: '遺伝的素因の理解、跛行の早期発見、適切な運動制限、必要に応じた外科的治療が重要です。'
  },

  // C
  'コリー眼異常': {
    description: 'コリー系犬種に見られる遺伝性の眼疾患。視力障害や網膜剥離を引き起こすことがあります。',
    prevention: '遺伝子検査による繁殖管理、定期的な眼科検診、発症犬の繁殖制限が予防の基本です。'
  },

  // 眼
  '眼疾患（乾性角結膜炎）': {
    description: '涙の分泌が減少して目が乾燥する病気。目やにや充血が見られ、悪化すると角膜損傷を起こします。',
    prevention: '定期的な眼科検診、人工涙液の使用、免疫抑制剤の投与、目の周りの清潔維持が管理に重要です。'
  },

  // 脱
  '脱毛症': {
    description: '異常な抜け毛や脱毛。ホルモン異常、アレルギー、皮膚病など様々な原因があります。',
    prevention: '原因の特定と治療、バランスの取れた栄養、ストレス軽減、適切な皮膚ケアが脱毛予防に効果的です。'
  },

  // 胃
  '胃捻転': {
    description: '胃がねじれて血流が遮断される緊急疾患。大型犬に多く、即座の手術が必要です。',
    prevention: '食後すぐの激しい運動を避ける、1日の食事を数回に分ける、早食い防止食器の使用が予防に効果的です。'
  }
};

// 犬種ごとの参考URLデータベース
const breedReferenceLinks: { [key: string]: { title: string; url: string }[] } = {
  'トイプードル': [
    { title: 'みんなのブリーダー - トイプードルの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_toy-poodle_1.html' },
    { title: 'みんなの犬図鑑 - トイプードル', url: 'https://www.min-inuzukan.com/toy-poodle.html' },
    { title: 'Wikipedia - プードル', url: 'https://ja.wikipedia.org/wiki/プードル' }
  ],
  'チワワ': [
    { title: 'みんなのブリーダー - チワワの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_chihuahua-long_1.html' },
    { title: 'みんなの犬図鑑 - チワワ', url: 'https://www.min-inuzukan.com/chihuahua.html' },
    { title: 'Wikipedia - チワワ', url: 'https://ja.wikipedia.org/wiki/チワワ_(犬種)' }
  ],
  'ミニチュアダックスフンド': [
    { title: 'みんなのブリーダー - ダックスフンドの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_miniature-dachshund_1.html' },
    { title: 'みんなの犬図鑑 - ミニチュアダックスフンド', url: 'https://www.min-inuzukan.com/miniature-dachshund.html' },
    { title: 'Wikipedia - ダックスフンド', url: 'https://ja.wikipedia.org/wiki/ダックスフント' }
  ],
  'ポメラニアン': [
    { title: 'みんなのブリーダー - ポメラニアンの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_pomeranian_1.html' },
    { title: 'みんなの犬図鑑 - ポメラニアン', url: 'https://www.min-inuzukan.com/pomeranian.html' },
    { title: 'Wikipedia - ポメラニアン', url: 'https://ja.wikipedia.org/wiki/ポメラニアン' }
  ],
  '柴犬': [
    { title: 'みんなのブリーダー - 柴犬の子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_shiba_1.html' },
    { title: 'みんなの犬図鑑 - 柴犬', url: 'https://www.min-inuzukan.com/shiba.html' },
    { title: 'Wikipedia - 柴犬', url: 'https://ja.wikipedia.org/wiki/柴犬' }
  ],
  'ヨークシャーテリア': [
    { title: 'みんなのブリーダー - ヨークシャーテリアの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_yorkshire-terrier_1.html' },
    { title: 'みんなの犬図鑑 - ヨークシャーテリア', url: 'https://www.min-inuzukan.com/yorkshire-terrier.html' },
    { title: 'Wikipedia - ヨークシャーテリア', url: 'https://ja.wikipedia.org/wiki/ヨークシャー・テリア' }
  ],
  'フレンチブルドッグ': [
    { title: 'みんなのブリーダー - フレンチブルドッグの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_french-bulldog_1.html' },
    { title: 'みんなの犬図鑑 - フレンチブルドッグ', url: 'https://www.min-inuzukan.com/french-bulldog.html' },
    { title: 'Wikipedia - フレンチブルドッグ', url: 'https://ja.wikipedia.org/wiki/フレンチ・ブルドッグ' }
  ],
  'シーズー': [
    { title: 'みんなのブリーダー - シーズーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_shih-tzu_1.html' },
    { title: 'みんなの犬図鑑 - シーズー', url: 'https://www.min-inuzukan.com/shih-tzu.html' },
    { title: 'Wikipedia - シーズー', url: 'https://ja.wikipedia.org/wiki/シー・ズー' }
  ],
  'マルチーズ': [
    { title: 'みんなのブリーダー - マルチーズの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_maltese_1.html' },
    { title: 'みんなの犬図鑑 - マルチーズ', url: 'https://www.min-inuzukan.com/maltese.html' },
    { title: 'Wikipedia - マルチーズ', url: 'https://ja.wikipedia.org/wiki/マルチーズ_(犬)' }
  ],
  'ゴールデンレトリバー': [
    { title: 'みんなのブリーダー - ゴールデンレトリバーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_golden-retriever_1.html' },
    { title: 'みんなの犬図鑑 - ゴールデンレトリバー', url: 'https://www.min-inuzukan.com/golden-retriever.html' },
    { title: 'Wikipedia - ゴールデンレトリバー', url: 'https://ja.wikipedia.org/wiki/ゴールデン・レトリバー' }
  ],
  'パグ': [
    { title: 'みんなのブリーダー - パグの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_pug_1.html' },
    { title: 'みんなの犬図鑑 - パグ', url: 'https://www.min-inuzukan.com/pug.html' },
    { title: 'Wikipedia - パグ', url: 'https://ja.wikipedia.org/wiki/パグ' }
  ],
  'ラブラドールレトリバー': [
    { title: 'みんなのブリーダー - ラブラドールレトリバーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_labrador-retriever_1.html' },
    { title: 'みんなの犬図鑑 - ラブラドールレトリバー', url: 'https://www.min-inuzukan.com/labrador-retriever.html' },
    { title: 'Wikipedia - ラブラドールレトリバー', url: 'https://ja.wikipedia.org/wiki/ラブラドール・レトリバー' }
  ],
  'ミニチュアシュナウザー': [
    { title: 'みんなのブリーダー - ミニチュアシュナウザーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_miniature-schnauzer_1.html' },
    { title: 'みんなの犬図鑑 - ミニチュアシュナウザー', url: 'https://www.min-inuzukan.com/miniature-schnauzer.html' },
    { title: 'Wikipedia - シュナウザー', url: 'https://ja.wikipedia.org/wiki/シュナウザー' }
  ],
  'ウェルシュコーギー': [
    { title: 'みんなのブリーダー - ウェルシュコーギーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_welsh-corgi-pembroke_1.html' },
    { title: 'みんなの犬図鑑 - ウェルシュコーギー', url: 'https://www.min-inuzukan.com/welsh-corgi-pembroke.html' },
    { title: 'Wikipedia - ウェルシュコーギー', url: 'https://ja.wikipedia.org/wiki/ウェルシュ・コーギー・ペンブローク' }
  ],
  'ボストンテリア': [
    { title: 'みんなのブリーダー - ボストンテリアの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_boston-terrier_1.html' },
    { title: 'みんなの犬図鑑 - ボストンテリア', url: 'https://www.min-inuzukan.com/boston-terrier.html' },
    { title: 'Wikipedia - ボストンテリア', url: 'https://ja.wikipedia.org/wiki/ボストン・テリア' }
  ],
  'キャバリアキングチャールズスパニエル': [
    { title: 'みんなのブリーダー - キャバリアの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_cavalier-king-charles-spaniel_1.html' },
    { title: 'みんなの犬図鑑 - キャバリア', url: 'https://www.min-inuzukan.com/cavalier-king-charles-spaniel.html' },
    { title: 'Wikipedia - キャバリア', url: 'https://ja.wikipedia.org/wiki/キャバリア・キング・チャールズ・スパニエル' }
  ],
  'パピヨン': [
    { title: 'みんなのブリーダー - パピヨンの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_papillon_1.html' },
    { title: 'みんなの犬図鑑 - パピヨン', url: 'https://www.min-inuzukan.com/papillon.html' },
    { title: 'Wikipedia - パピヨン', url: 'https://ja.wikipedia.org/wiki/パピヨン_(犬種)' }
  ],
  'ビーグル': [
    { title: 'みんなのブリーダー - ビーグルの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_beagle_1.html' },
    { title: 'みんなの犬図鑑 - ビーグル', url: 'https://www.min-inuzukan.com/beagle.html' },
    { title: 'Wikipedia - ビーグル', url: 'https://ja.wikipedia.org/wiki/ビーグル' }
  ],
  'シベリアンハスキー': [
    { title: 'みんなのブリーダー - シベリアンハスキーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_siberian-husky_1.html' },
    { title: 'みんなの犬図鑑 - シベリアンハスキー', url: 'https://www.min-inuzukan.com/siberian-husky.html' },
    { title: 'Wikipedia - シベリアンハスキー', url: 'https://ja.wikipedia.org/wiki/シベリアン・ハスキー' }
  ],
  'ジャックラッセルテリア': [
    { title: 'みんなのブリーダー - ジャックラッセルテリアの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_jack-russell-terrier_1.html' },
    { title: 'みんなの犬図鑑 - ジャックラッセルテリア', url: 'https://www.min-inuzukan.com/jack-russell-terrier.html' },
    { title: 'Wikipedia - ジャックラッセルテリア', url: 'https://ja.wikipedia.org/wiki/ジャック・ラッセル・テリア' }
  ],
  'ボーダーコリー': [
    { title: 'みんなのブリーダー - ボーダーコリーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_border-collie_1.html' },
    { title: 'みんなの犬図鑑 - ボーダーコリー', url: 'https://www.min-inuzukan.com/border-collie.html' },
    { title: 'Wikipedia - ボーダーコリー', url: 'https://ja.wikipedia.org/wiki/ボーダー・コリー' }
  ],
  'アメリカンコッカースパニエル': [
    { title: 'みんなのブリーダー - アメリカンコッカースパニエルの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_american-cocker-spaniel_1.html' },
    { title: 'みんなの犬図鑑 - アメリカンコッカースパニエル', url: 'https://www.min-inuzukan.com/american-cocker-spaniel.html' },
    { title: 'Wikipedia - コッカースパニエル', url: 'https://ja.wikipedia.org/wiki/アメリカン・コッカー・スパニエル' }
  ],
  'ブルドッグ': [
    { title: 'みんなのブリーダー - ブルドッグの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_bulldog_1.html' },
    { title: 'みんなの犬図鑑 - ブルドッグ', url: 'https://www.min-inuzukan.com/bulldog.html' },
    { title: 'Wikipedia - ブルドッグ', url: 'https://ja.wikipedia.org/wiki/ブルドッグ' }
  ],
  'バーニーズマウンテンドッグ': [
    { title: 'みんなのブリーダー - バーニーズマウンテンドッグの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_bernese-mountain-dog_1.html' },
    { title: 'みんなの犬図鑑 - バーニーズマウンテンドッグ', url: 'https://www.min-inuzukan.com/bernese-mountain-dog.html' },
    { title: 'Wikipedia - バーニーズマウンテンドッグ', url: 'https://ja.wikipedia.org/wiki/バーニーズ・マウンテン・ドッグ' }
  ],
  'シェットランドシープドッグ': [
    { title: 'みんなのブリーダー - シェットランドシープドッグの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_shetland-sheepdog_1.html' },
    { title: 'みんなの犬図鑑 - シェットランドシープドッグ', url: 'https://www.min-inuzukan.com/shetland-sheepdog.html' },
    { title: 'Wikipedia - シェットランドシープドッグ', url: 'https://ja.wikipedia.org/wiki/シェットランド・シープドッグ' }
  ],
  'ミニチュアピンシャー': [
    { title: 'みんなのブリーダー - ミニチュアピンシャーの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_miniature-pinscher_1.html' },
    { title: 'みんなの犬図鑑 - ミニチュアピンシャー', url: 'https://www.min-inuzukan.com/miniature-pinscher.html' },
    { title: 'Wikipedia - ミニチュアピンシャー', url: 'https://ja.wikipedia.org/wiki/ミニチュア・ピンシャー' }
  ],
  'イタリアングレーハウンド': [
    { title: 'みんなのブリーダー - イタリアングレーハウンドの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_italian-greyhound_1.html' },
    { title: 'みんなの犬図鑑 - イタリアングレーハウンド', url: 'https://www.min-inuzukan.com/italian-greyhound.html' },
    { title: 'Wikipedia - イタリアングレーハウンド', url: 'https://ja.wikipedia.org/wiki/イタリアン・グレーハウンド' }
  ],
  'ダルメシアン': [
    { title: 'みんなのブリーダー - ダルメシアンの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_dalmatian_1.html' },
    { title: 'みんなの犬図鑑 - ダルメシアン', url: 'https://www.min-inuzukan.com/dalmatian.html' },
    { title: 'Wikipedia - ダルメシアン', url: 'https://ja.wikipedia.org/wiki/ダルメシアン' }
  ],
  'グレートピレニーズ': [
    { title: 'みんなのブリーダー - グレートピレニーズの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_great-pyrenees_1.html' },
    { title: 'みんなの犬図鑑 - グレートピレニーズ', url: 'https://www.min-inuzukan.com/great-pyrenees.html' },
    { title: 'Wikipedia - グレートピレニーズ', url: 'https://ja.wikipedia.org/wiki/グレート・ピレニーズ' }
  ],
  'サモエド': [
    { title: 'みんなのブリーダー - サモエドの子犬検索', url: 'https://www.min-breeder.com/dogSearch_dogKind_samoyed_1.html' },
    { title: 'みんなの犬図鑑 - サモエド', url: 'https://www.min-inuzukan.com/samoyed.html' },
    { title: 'Wikipedia - サモエド', url: 'https://ja.wikipedia.org/wiki/サモエド_(犬種)' }
  ]
};

// 質問の型定義
interface Question {
  id: string;
  text: string;
  type: 'select' | 'radio' | 'slider';
  options?: string[];
  icon: React.ReactNode;
}

// ユーザー回答の型定義
interface UserAnswers {
  [key: string]: string | number;
}

// 犬種提案の型定義
interface DogRecommendation {
  breed: string;
  characteristics: string;  // 新設：犬種の特徴
  suitabilityReason: string;
  cautions: string;
  commonDiseases: string[];  // 新設：かかりやすい病気・怪我（3点）
  difficulty: string;
  rating: number;
  breedData: DogBreed;  // 詳細スコア計算用の犬種データ
}

// 費用データの型定義
interface BreedCost {
  initial: {
    purchase: number;
    supplies: number;
  };
  monthly: {
    food: number;
    grooming: number;
    supplies: number;
  };
  yearly: {
    medical: number;
    insurance: number;
  };
}

// 犬種別費用データベース
const breedCosts: { [key: string]: BreedCost } = {
  'トイプードル': {
    initial: { purchase: 300000, supplies: 50000 },
    monthly: { food: 5000, grooming: 6000, supplies: 3000 },
    yearly: { medical: 50000, insurance: 30000 }
  },
  'チワワ': {
    initial: { purchase: 250000, supplies: 40000 },
    monthly: { food: 4000, grooming: 0, supplies: 2500 },
    yearly: { medical: 40000, insurance: 25000 }
  },
  'ミニチュアダックスフンド': {
    initial: { purchase: 200000, supplies: 45000 },
    monthly: { food: 5000, grooming: 0, supplies: 2500 },
    yearly: { medical: 55000, insurance: 28000 }
  },
  'ポメラニアン': {
    initial: { purchase: 280000, supplies: 45000 },
    monthly: { food: 4500, grooming: 5000, supplies: 3000 },
    yearly: { medical: 45000, insurance: 27000 }
  },
  '柴犬': {
    initial: { purchase: 200000, supplies: 60000 },
    monthly: { food: 8000, grooming: 0, supplies: 3000 },
    yearly: { medical: 60000, insurance: 35000 }
  },
  'ヨークシャーテリア': {
    initial: { purchase: 280000, supplies: 45000 },
    monthly: { food: 4000, grooming: 6000, supplies: 2500 },
    yearly: { medical: 45000, insurance: 26000 }
  },
  'フレンチブルドッグ': {
    initial: { purchase: 350000, supplies: 55000 },
    monthly: { food: 6000, grooming: 0, supplies: 3000 },
    yearly: { medical: 80000, insurance: 45000 }
  },
  'シーズー': {
    initial: { purchase: 250000, supplies: 45000 },
    monthly: { food: 5000, grooming: 5500, supplies: 2500 },
    yearly: { medical: 50000, insurance: 28000 }
  },
  'マルチーズ': {
    initial: { purchase: 250000, supplies: 45000 },
    monthly: { food: 4500, grooming: 6000, supplies: 2500 },
    yearly: { medical: 48000, insurance: 27000 }
  },
  'ゴールデンレトリバー': {
    initial: { purchase: 300000, supplies: 80000 },
    monthly: { food: 15000, grooming: 8000, supplies: 4000 },
    yearly: { medical: 80000, insurance: 50000 }
  },
  'パグ': {
    initial: { purchase: 280000, supplies: 50000 },
    monthly: { food: 5500, grooming: 0, supplies: 3000 },
    yearly: { medical: 75000, insurance: 42000 }
  },
  'ラブラドールレトリバー': {
    initial: { purchase: 280000, supplies: 80000 },
    monthly: { food: 15000, grooming: 0, supplies: 4000 },
    yearly: { medical: 75000, insurance: 48000 }
  },
  'ミニチュアシュナウザー': {
    initial: { purchase: 250000, supplies: 45000 },
    monthly: { food: 5000, grooming: 6000, supplies: 2500 },
    yearly: { medical: 48000, insurance: 28000 }
  },
  'ウェルシュコーギー': {
    initial: { purchase: 280000, supplies: 60000 },
    monthly: { food: 9000, grooming: 0, supplies: 3500 },
    yearly: { medical: 65000, insurance: 38000 }
  },
  'ボストンテリア': {
    initial: { purchase: 250000, supplies: 50000 },
    monthly: { food: 5500, grooming: 0, supplies: 3000 },
    yearly: { medical: 55000, insurance: 32000 }
  },
  'キャバリアキングチャールズスパニエル': {
    initial: { purchase: 280000, supplies: 50000 },
    monthly: { food: 5500, grooming: 5000, supplies: 3000 },
    yearly: { medical: 70000, insurance: 40000 }
  },
  'パピヨン': {
    initial: { purchase: 230000, supplies: 40000 },
    monthly: { food: 4000, grooming: 4500, supplies: 2500 },
    yearly: { medical: 42000, insurance: 25000 }
  },
  'ビーグル': {
    initial: { purchase: 200000, supplies: 55000 },
    monthly: { food: 7000, grooming: 0, supplies: 3000 },
    yearly: { medical: 55000, insurance: 33000 }
  },
  'シベリアンハスキー': {
    initial: { purchase: 250000, supplies: 75000 },
    monthly: { food: 14000, grooming: 7000, supplies: 4000 },
    yearly: { medical: 70000, insurance: 45000 }
  },
  'ジャックラッセルテリア': {
    initial: { purchase: 220000, supplies: 45000 },
    monthly: { food: 5000, grooming: 0, supplies: 2500 },
    yearly: { medical: 48000, insurance: 28000 }
  },
  'ボーダーコリー': {
    initial: { purchase: 250000, supplies: 65000 },
    monthly: { food: 10000, grooming: 5000, supplies: 3500 },
    yearly: { medical: 65000, insurance: 38000 }
  },
  'アメリカンコッカースパニエル': {
    initial: { purchase: 250000, supplies: 55000 },
    monthly: { food: 7000, grooming: 7000, supplies: 3000 },
    yearly: { medical: 60000, insurance: 35000 }
  },
  'ブルドッグ': {
    initial: { purchase: 350000, supplies: 60000 },
    monthly: { food: 7000, grooming: 0, supplies: 3500 },
    yearly: { medical: 90000, insurance: 50000 }
  },
  'バーニーズマウンテンドッグ': {
    initial: { purchase: 350000, supplies: 85000 },
    monthly: { food: 16000, grooming: 8000, supplies: 4500 },
    yearly: { medical: 85000, insurance: 55000 }
  },
  'シェットランドシープドッグ': {
    initial: { purchase: 250000, supplies: 60000 },
    monthly: { food: 8000, grooming: 6000, supplies: 3500 },
    yearly: { medical: 60000, insurance: 36000 }
  },
  'ミニチュアピンシャー': {
    initial: { purchase: 230000, supplies: 40000 },
    monthly: { food: 4000, grooming: 0, supplies: 2500 },
    yearly: { medical: 43000, insurance: 26000 }
  },
  'イタリアングレーハウンド': {
    initial: { purchase: 280000, supplies: 45000 },
    monthly: { food: 4500, grooming: 0, supplies: 2500 },
    yearly: { medical: 50000, insurance: 30000 }
  },
  'ダルメシアン': {
    initial: { purchase: 280000, supplies: 70000 },
    monthly: { food: 12000, grooming: 0, supplies: 4000 },
    yearly: { medical: 70000, insurance: 42000 }
  },
  'グレートピレニーズ': {
    initial: { purchase: 350000, supplies: 90000 },
    monthly: { food: 18000, grooming: 9000, supplies: 5000 },
    yearly: { medical: 90000, insurance: 58000 }
  },
  'サモエド': {
    initial: { purchase: 350000, supplies: 80000 },
    monthly: { food: 15000, grooming: 8000, supplies: 4500 },
    yearly: { medical: 75000, insurance: 48000 }
  }
};

// 犬種データベース
interface DogBreed {
  name: string;
  size: 'small' | 'medium' | 'large';
  exerciseNeed: 'low' | 'medium' | 'high';
  barkingLevel: 'low' | 'medium' | 'high';
  sheddingLevel: 'low' | 'medium' | 'high';
  goodWithKids: boolean;
  goodForApartment: boolean;
  experienceNeeded: 'beginner' | 'intermediate' | 'advanced';
  hypoallergenic: boolean;
  aloneTimeTolerance: 'low' | 'medium' | 'high';
  characteristics: string;  // 新設：犬種の特徴（50文字程度）
  description: string;
  cautions: string;
  commonDiseases: string[];  // 新設：かかりやすい病気・怪我（3点）
}

// 詳細スコア計算関数
const calculateDetailedScores = (userAnswers: UserAnswers, breed: DogBreed) => {
  const scores = {
    housing: 0,
    exercise: 0,
    grooming: 0,
    experience: 0,
    health: 0
  };

  // 1. 住環境の相性
  let housingScore = 0;
  if (userAnswers.housing === 'マンション・アパート' && breed.goodForApartment) {
    housingScore += 50;
  } else if (userAnswers.housing?.toString().includes('戸建て') && breed.size !== 'large') {
    housingScore += 40;
  } else if (userAnswers.housing === '戸建て（庭あり）') {
    housingScore += 50;
  } else if (userAnswers.housing === 'マンション・アパート' && !breed.goodForApartment) {
    housingScore += 20;
  } else {
    housingScore += 30;
  }

  if (userAnswers.space === '広い（15㎡以上）') {
    housingScore += 30;
  } else if (userAnswers.space === '標準（8〜15㎡）' && breed.size !== 'large') {
    housingScore += 30;
  } else if (userAnswers.space === '限られている（8㎡未満）' && breed.size === 'small') {
    housingScore += 30;
  } else if (userAnswers.space === '限られている（8㎡未満）' && breed.size === 'large') {
    housingScore += 10;
  } else {
    housingScore += 20;
  }

  if (userAnswers.dogSize === '小型犬' && breed.size === 'small') housingScore += 20;
  if (userAnswers.dogSize === '中型犬' && breed.size === 'medium') housingScore += 20;
  if (userAnswers.dogSize === '大型犬' && breed.size === 'large') housingScore += 20;
  if (userAnswers.dogSize === 'こだわらない') housingScore += 15;

  scores.housing = Math.min(100, housingScore);

  // 2. 運動・活動量の相性
  let exerciseScore = 0;
  if (userAnswers.walkTime === '60分以上' && breed.exerciseNeed === 'high') {
    exerciseScore += 60;
  } else if (userAnswers.walkTime === '30〜60分' && breed.exerciseNeed === 'medium') {
    exerciseScore += 60;
  } else if (userAnswers.walkTime === '30分未満' && breed.exerciseNeed === 'low') {
    exerciseScore += 60;
  } else if (userAnswers.walkTime === '散歩は難しい' && breed.exerciseNeed === 'low') {
    exerciseScore += 50;
  } else if (userAnswers.walkTime === '60分以上' && breed.exerciseNeed === 'medium') {
    exerciseScore += 50;
  } else if (userAnswers.walkTime === '30分未満' && breed.exerciseNeed === 'high') {
    exerciseScore += 20;
  } else {
    exerciseScore += 35;
  }

  if (userAnswers.exercise === '積極的に運動させたい' && breed.exerciseNeed === 'high') {
    exerciseScore += 40;
  } else if (userAnswers.exercise === '適度なら問題ない' && breed.exerciseNeed === 'medium') {
    exerciseScore += 40;
  } else if (userAnswers.exercise === 'あまり多くない方がいい' && breed.exerciseNeed === 'low') {
    exerciseScore += 40;
  } else if (userAnswers.exercise === '運動は最小限がいい' && breed.exerciseNeed === 'low') {
    exerciseScore += 40;
  } else if (userAnswers.exercise === '運動は最小限がいい' && breed.exerciseNeed === 'high') {
    exerciseScore += 10;
  } else {
    exerciseScore += 25;
  }

  scores.exercise = Math.min(100, exerciseScore);

  // 3. お手入れ・ケアの相性
  let groomingScore = 0;
  if (userAnswers.shedding === 'できるだけ少ない方がいい' && breed.sheddingLevel === 'low') {
    groomingScore += 50;
  } else if (userAnswers.shedding === '最小限がいい' && breed.sheddingLevel !== 'high') {
    groomingScore += 45;
  } else if (userAnswers.shedding === '手入れは積極的にできる') {
    groomingScore += 50;
  } else if (userAnswers.shedding === 'できるだけ少ない方がいい' && breed.sheddingLevel === 'high') {
    groomingScore += 20;
  } else {
    groomingScore += 35;
  }

  const needsRegularGrooming = ['トイプードル', 'マルチーズ', 'ヨークシャーテリア', 'シーズー', 'ミニチュアシュナウザー'].includes(breed.name);

  if (userAnswers.grooming === '月1回以上通える' && needsRegularGrooming) {
    groomingScore += 50;
  } else if (userAnswers.grooming === '月1回以上通える') {
    groomingScore += 50;
  } else if (userAnswers.grooming === '数ヶ月に1回なら可能' && !needsRegularGrooming) {
    groomingScore += 50;
  } else if (userAnswers.grooming === '難しい' && !needsRegularGrooming) {
    groomingScore += 45;
  } else if (userAnswers.grooming === '難しい' && needsRegularGrooming) {
    groomingScore += 20;
  } else {
    groomingScore += 35;
  }

  scores.grooming = Math.min(100, groomingScore);

  // 4. 経験・飼いやすさの相性
  let experienceScore = 0;
  if (userAnswers.experience === '初めて飼う' && breed.experienceNeeded === 'beginner') {
    experienceScore += 40;
  } else if (userAnswers.experience === '1回飼育経験あり' && breed.experienceNeeded !== 'advanced') {
    experienceScore += 40;
  } else if (userAnswers.experience === '複数回飼育経験あり') {
    experienceScore += 40;
  } else if (userAnswers.experience === '初めて飼う' && breed.experienceNeeded === 'advanced') {
    experienceScore += 15;
  } else {
    experienceScore += 30;
  }

  if (userAnswers.barking === '非常に静かな犬種希望' && breed.barkingLevel === 'low') {
    experienceScore += 30;
  } else if (userAnswers.barking === 'できるだけ静かな方がいい' && breed.barkingLevel !== 'high') {
    experienceScore += 30;
  } else if (userAnswers.barking === 'あまり気にしない') {
    experienceScore += 30;
  } else if (userAnswers.barking === '非常に静かな犬種希望' && breed.barkingLevel === 'high') {
    experienceScore += 10;
  } else {
    experienceScore += 20;
  }

  if (userAnswers.aloneTime === '8時間以上' && breed.aloneTimeTolerance === 'high') {
    experienceScore += 30;
  } else if (userAnswers.aloneTime === '4〜8時間' && breed.aloneTimeTolerance !== 'low') {
    experienceScore += 30;
  } else if (userAnswers.aloneTime?.toString().includes('ない') && breed.aloneTimeTolerance === 'low') {
    experienceScore += 25;
  } else if (userAnswers.aloneTime === '8時間以上' && breed.aloneTimeTolerance === 'low') {
    experienceScore += 10;
  } else {
    experienceScore += 20;
  }

  scores.experience = Math.min(100, experienceScore);

  // 5. 健康管理・コストの相性
  let healthScore = 50;
  const highMedicalCostBreeds = ['フレンチブルドッグ', 'パグ', 'ブルドッグ', 'バーニーズマウンテンドッグ', 'グレートピレニーズ'];
  const lowMedicalCostBreeds = ['柴犬', 'ビーグル', 'ミニチュアシュナウザー'];

  if (userAnswers.medicalCost === 'できるだけ医療費が少ない犬種がいい') {
    if (lowMedicalCostBreeds.includes(breed.name)) {
      healthScore += 30;
    } else if (highMedicalCostBreeds.includes(breed.name)) {
      healthScore += 5;
    } else {
      healthScore += 20;
    }
  } else if (userAnswers.medicalCost === '高額でも適切な治療を受けさせたい') {
    healthScore += 30;
  } else {
    healthScore += 25;
  }

  const fragileBreeds = ['チワワ', 'イタリアングレーハウンド', 'パピヨン'];
  const spinalIssueBreeds = ['ミニチュアダックスフンド', 'ウェルシュコーギー'];
  const robustBreeds = ['ビーグル', 'ラブラドールレトリバー', '柴犬'];

  if (userAnswers.injuryRisk === '丈夫で怪我しにくい犬種がいい') {
    if (robustBreeds.includes(breed.name)) {
      healthScore += 20;
    } else if (fragileBreeds.includes(breed.name) || spinalIssueBreeds.includes(breed.name)) {
      healthScore += 5;
    } else {
      healthScore += 12;
    }
  } else if (userAnswers.injuryRisk === '標準的な体格の犬が安心') {
    if (breed.size === 'medium') {
      healthScore += 20;
    } else if (fragileBreeds.includes(breed.name)) {
      healthScore += 8;
    } else {
      healthScore += 15;
    }
  } else {
    healthScore += 15;
  }

  scores.health = Math.min(100, healthScore);

  return scores;
};

// 費用計算関数
const calculateBreedCost = (breedName: string) => {
  const cost = breedCosts[breedName];
  if (!cost) return null;

  const monthlyTotal = cost.monthly.food + cost.monthly.grooming + cost.monthly.supplies;
  const yearlyTotal = cost.yearly.medical + cost.yearly.insurance;
  const initialTotal = cost.initial.purchase + cost.initial.supplies;

  const firstYear = initialTotal + (monthlyTotal * 12) + yearlyTotal;
  const annualFromSecondYear = (monthlyTotal * 12) + yearlyTotal;
  const tenYearTotal = firstYear + (annualFromSecondYear * 9);

  return {
    firstYear,
    annualFromSecondYear,
    tenYearTotal,
    monthlyAverage: monthlyTotal,
    breakdown: {
      initial: initialTotal,
      monthlyTotal,
      yearlyFixed: yearlyTotal,
      details: cost
    }
  };
};


const dogDatabase: DogBreed[] = [
  {
    name: 'トイプードル',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'medium',
    sheddingLevel: 'low',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: true,
    aloneTimeTolerance: 'low',
    characteristics: 'クルクルの巻き毛が特徴的。賢く、様々なカットスタイルを楽しめる人気No.1犬種。',
    description: '日本で最も人気の高い犬種。抜け毛が少なく、賢く学習能力が高い傾向。初心者でもしつけがしやすいと言われています。',
    cautions: '定期的なトリミングが必要（月1回程度）。分離不安を起こしやすい傾向があり、徐々に留守番に慣れさせる必要があります。',
    commonDiseases: ['膝蓋骨脱臼', '進行性網膜萎縮症', '外耳炎']
  },
  {
    name: 'チワワ',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'high',
    sheddingLevel: 'low',
    goodWithKids: false,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '世界最小の犬種。大きな瞳とりんご型の頭が特徴。勇敢で飼い主に忠実な性格。',
    description: '世界最小の犬種で、日本でも常に人気上位。省スペースで飼育可能。忠実で飼い主に献身的と言われています。',
    cautions: '小さな子供との相性は注意が必要。吠え癖がつきやすい傾向。寒さに弱く、冬場は服を着せる配慮が必要です。',
    commonDiseases: ['水頭症', '気管虚脱', '膝蓋骨脱臼']
  },
  {
    name: 'ミニチュアダックスフンド',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'high',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '胴長短足の独特な体型。元々は狩猟犬で、好奇心旺盛で勇敢な性格が特徴。',
    description: '日本で長年人気の犬種。好奇心旺盛で陽気な性格の傾向。小型犬ながら勇敢で、番犬としても活躍します。',
    cautions: '吠え癖がつきやすい傾向。胴長短足の体型のため、椎間板ヘルニアに注意。階段の上り下りは控えめに。',
    commonDiseases: ['椎間板ヘルニア', '進行性網膜萎縮症', '糖尿病']
  },
  {
    name: 'ポメラニアン',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'high',
    sheddingLevel: 'high',
    goodWithKids: false,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: 'ふわふわの豊かな被毛が魅力。小さな体に大きな個性を持つ活発な犬種。',
    description: 'ふわふわの被毛が人気の小型犬。活発で遊び好き、家庭犬として安定した人気。コンパクトで室内飼いに適しています。',
    cautions: '吠え声が大きい傾向があり、しつけが重要。抜け毛が多く、毎日のブラッシングが必要。デリケートな性格の個体もいます。',
    commonDiseases: ['気管虚脱', '膝蓋骨脱臼', '脱毛症']
  },
  {
    name: '柴犬',
    size: 'medium',
    exerciseNeed: 'medium',
    barkingLevel: 'medium',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'high',
    characteristics: '日本犬の代表格。凛とした佇まいと、クルンと巻いた尾が特徴的な中型犬。',
    description: '日本犬の代表格で、海外でも人気急上昇。独立心が強く、留守番も得意な傾向。日本の住環境に適応しやすい中型犬。',
    cautions: '警戒心が強い傾向があり、子犬期からの社会化が重要。換毛期の抜け毛が多く、定期的なブラッシングが必要。',
    commonDiseases: ['アトピー性皮膚炎', '股関節形成不全', '膝蓋骨脱臼']
  },
  {
    name: 'ヨークシャーテリア',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'medium',
    sheddingLevel: 'low',
    goodWithKids: false,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: true,
    aloneTimeTolerance: 'low',
    characteristics: 'シルクのような美しい被毛を持つ「動く宝石」。小さいながらもテリア気質で勇敢。',
    description: '「動く宝石」と呼ばれる美しい小型犬。抜け毛が少なく、マンション暮らしに適しています。勇敢で活発な性格の傾向。',
    cautions: '小さな子供との相性に注意。定期的なトリミングが必要。デリケートで寒さに弱い傾向があります。',
    commonDiseases: ['気管虚脱', '膝蓋骨脱臼', '門脈シャント']
  },
  {
    name: 'フレンチブルドッグ',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'low',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: 'コウモリ耳と潰れた鼻が特徴。筋肉質でがっしりした体型のコンパニオン犬。',
    description: '近年人気急上昇中の犬種。穏やかで人懐っこい性格の傾向。運動量は比較的少なめで、短時間の散歩で満足しやすいと言われています。',
    cautions: '短頭種のため暑さに弱く、夏場の温度管理が重要。呼吸器系トラブルに注意が必要。医療費が高額になる可能性があります。',
    commonDiseases: ['短頭種気道症候群', '椎間板ヘルニア', '皮膚炎']
  },
  {
    name: 'シーズー',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'low',
    sheddingLevel: 'low',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: true,
    aloneTimeTolerance: 'medium',
    characteristics: '豊かな被毛と短い鼻が特徴。穏やかで社交的な性格のコンパニオン犬。',
    description: '穏やかでフレンドリーな性格で長年人気。抜け毛が少なく、吠えも少ない傾向。マンション暮らしに適した犬種と言われています。',
    cautions: '長い被毛の手入れが必要。目や耳のケアが重要。暑さに弱いため、夏場の温度管理に注意が必要です。',
    commonDiseases: ['眼疾患（乾性角結膜炎）', '外耳炎', '椎間板ヘルニア']
  },
  {
    name: 'マルチーズ',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'medium',
    sheddingLevel: 'low',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: true,
    aloneTimeTolerance: 'low',
    characteristics: '真っ白な絹のような被毛が美しい。古くから愛玩犬として親しまれてきた小型犬。',
    description: '真っ白な被毛が美しい人気の小型犬。抜け毛が少なく、穏やかな性格の傾向。家庭犬として長い歴史があります。',
    cautions: '白い被毛の手入れが必要（涙やけ対策）。分離不安を起こしやすい。定期的なトリミングが必要です。',
    commonDiseases: ['僧帽弁閉鎖不全症', '膝蓋骨脱臼', '涙やけ（流涙症）']
  },
  {
    name: 'ゴールデンレトリバー',
    size: 'large',
    exerciseNeed: 'high',
    barkingLevel: 'low',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '金色の美しい被毛と優しい表情。温厚で従順な性格の大型犬の代表格。',
    description: '家族向け大型犬として絶大な人気。温厚で人懐っこく、子供とも仲良くできる傾向。訓練性能が高いと言われています。',
    cautions: '大型犬のため広いスペースが必要。毎日60分以上の運動が推奨。抜け毛が多く、定期的なブラッシングが必須。',
    commonDiseases: ['股関節形成不全', '悪性腫瘍（がん）', '進行性網膜萎縮症']
  },
  {
    name: 'パグ',
    size: 'small',
    exerciseNeed: 'low',
    barkingLevel: 'low',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: 'しわくちゃの顔と大きな目が愛嬌たっぷり。陽気でユーモラスな性格が魅力。',
    description: '愛嬌のある顔立ちで人気の犬種。人懐っこい性格。運動量は少なめで、マンションでも飼いやすい傾向。',
    cautions: '短頭種のため呼吸器系に注意。暑さに非常に弱く、夏場のエアコン管理必須。抜け毛は意外と多め。',
    commonDiseases: ['短頭種気道症候群', '壊死性髄膜脳炎', '皮膚炎']
  },
  {
    name: 'ラブラドールレトリバー',
    size: 'large',
    exerciseNeed: 'high',
    barkingLevel: 'low',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '筋肉質でがっしりした体格。友好的で活発、盲導犬として活躍する賢い大型犬。',
    description: '世界的に人気の高い大型犬。友好的で活発、盲導犬や介助犬としても活躍。子供との相性が良い傾向。',
    cautions: '非常に活発で毎日60分以上の運動が必要。食欲旺盛で肥満に注意。広いスペースが必要です。',
    commonDiseases: ['股関節形成不全', '肘関節形成不全', '肥満']
  },
  {
    name: 'ミニチュアシュナウザー',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'medium',
    sheddingLevel: 'low',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: true,
    aloneTimeTolerance: 'medium',
    characteristics: '特徴的なヒゲと眉毛、四角い体型。勇敢で警戒心の強いテリア気質を持つ。',
    description: '抜け毛が少なく、賢い小型犬。番犬としても優秀で、家族に忠実な傾向。',
    cautions: '定期的なトリミングが必要。吠え癖がつきやすい。皮膚トラブルに注意が必要です。',
    commonDiseases: ['尿路結石', 'アトピー性皮膚炎', '白内障']
  },
  {
    name: 'ウェルシュコーギー',
    size: 'medium',
    exerciseNeed: 'medium',
    barkingLevel: 'medium',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '短い脚と長い胴、ピンと立った耳が特徴。元気で活発な牧羊犬。',
    description: '短い脚と長い胴が人気の中型犬。賢く、訓練性が高い傾向。家族思いで子供とも仲良くできます。',
    cautions: '胴長短足のため、椎間板ヘルニアに注意。抜け毛が多い。食欲旺盛で肥満管理が重要です。',
    commonDiseases: ['椎間板ヘルニア', '股関節形成不全', '変性性脊髄症']
  },
  {
    name: 'ボストンテリア',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'low',
    sheddingLevel: 'low',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: 'タキシードを着たような白黒の毛色。大きな目と立ち耳が印象的な小型犬。',
    description: '「アメリカの紳士」と呼ばれ、日本でも人気上昇中。人懐っこく、賢く訓練しやすい傾向。マンションでも飼いやすいサイズ。',
    cautions: '短頭種のため呼吸器系に注意。目が大きいため目のケアが重要。暑さと寒さの両方に弱い傾向。',
    commonDiseases: ['短頭種気道症候群', '白内障', '膝蓋骨脱臼']
  },
  {
    name: 'キャバリアキングチャールズスパニエル',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'low',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '大きく丸い目と長い垂れ耳が優雅。絹のような美しい被毛を持つスパニエル。',
    description: '温厚で人懐っこく、「究極の家庭犬」と人気。子供や他のペットとも仲良くできる傾向。穏やかな性格。',
    cautions: '心臓病のリスクが高い犬種。定期的な健康診断が重要。分離不安を起こしやすい傾向があります。',
    commonDiseases: ['僧帽弁閉鎖不全症', '脊髄空洞症', '外耳炎']
  },
  {
    name: 'パピヨン',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'medium',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '蝶のような飾り毛の立ち耳が特徴。華奢で優雅な体型の小型犬。',
    description: '蝶のような耳が特徴で人気の小型犬。非常に賢く、訓練性が高い傾向。活発で社交的な性格と言われています。',
    cautions: '繊細で骨が細いため、怪我に注意。吠え癖がつきやすい。分離不安を起こしやすい傾向があります。',
    commonDiseases: ['膝蓋骨脱臼', '進行性網膜萎縮症', '歯周病']
  },
  {
    name: 'ビーグル',
    size: 'medium',
    exerciseNeed: 'high',
    barkingLevel: 'high',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '垂れ耳と大きな目が愛らしい。スヌーピーのモデルとして有名な猟犬。',
    description: 'スヌーピーのモデルとして有名な人気犬種。陽気で好奇心旺盛。子供との相性が良く、家族向け。',
    cautions: '吠え声が大きく、近隣への配慮が必要。食欲旺盛で肥満に注意。十分な運動が必要で、散歩は毎日60分程度推奨。',
    commonDiseases: ['椎間板ヘルニア', '外耳炎', '肥満']
  },
  {
    name: 'シベリアンハスキー',
    size: 'large',
    exerciseNeed: 'high',
    barkingLevel: 'low',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'advanced',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: 'オオカミのような美しい外見。青い瞳を持つ個体も多い。スタミナ抜群の作業犬。',
    description: 'オオカミのような美しい外見で人気。非常に活発で、運動を好む傾向。家族との絆を大切にします。',
    cautions: '極めて高い運動量が必要。暑さに弱く、寒冷地向き。抜け毛が非常に多く、独立心が強いため訓練が難しい場合も。',
    commonDiseases: ['股関節形成不全', '白内障', '進行性網膜萎縮症']
  },
  {
    name: 'ジャックラッセルテリア',
    size: 'small',
    exerciseNeed: 'high',
    barkingLevel: 'high',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '小柄ながら筋肉質で運動能力抜群。エネルギッシュで勇敢なテリア。',
    description: '映画などで人気の活発な小型犬。非常にエネルギッシュで賢く、訓練性が高い傾向。アクティブな飼い主に向いています。',
    cautions: '小型犬の中でも特に運動量が多い。吠え癖や掘る行動に注意。十分な運動と刺激がないと問題行動を起こす可能性。',
    commonDiseases: ['膝蓋骨脱臼', 'レッグペルテス病', '白内障']
  },
  {
    name: 'ボーダーコリー',
    size: 'medium',
    exerciseNeed: 'high',
    barkingLevel: 'medium',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'advanced',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '世界で最も賢い犬種。鋭い眼差しと俊敏な動き。優秀な牧羊犬。',
    description: '世界で最も賢い犬種として有名。運動能力が高い牧羊犬。アジリティなどのドッグスポーツで活躍。',
    cautions: '極めて高い運動量が必要（1日2時間以上推奨）。知的刺激も必要で、退屈すると問題行動を起こす可能性。経験者向け。',
    commonDiseases: ['股関節形成不全', 'コリー眼異常', 'てんかん']
  },
  {
    name: 'アメリカンコッカースパニエル',
    size: 'medium',
    exerciseNeed: 'medium',
    barkingLevel: 'low',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '豊かで波打つ被毛と大きな垂れ耳。優しい表情の愛玩・猟犬。',
    description: 'ディズニー映画で人気になった陽気で優しい犬種。子供との相性が良く、家族思いの傾向。美しい被毛が特徴。',
    cautions: '被毛の手入れが大変。耳が垂れているため耳の病気に注意。分離不安を起こしやすい傾向があります。',
    commonDiseases: ['外耳炎', '緑内障', '股関節形成不全']
  },
  {
    name: 'ブルドッグ',
    size: 'medium',
    exerciseNeed: 'low',
    barkingLevel: 'low',
    sheddingLevel: 'medium',
    goodWithKids: true,
    goodForApartment: true,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: 'しわだらけの顔とがっしりした体格。独特な風貌と穏やかな性格のギャップが魅力。',
    description: 'ユニークな外見で人気。穏やかで忍耐強い性格。運動量は少なく、のんびりとした生活を好む傾向。',
    cautions: '短頭種のため呼吸器系の問題に注意。暑さに非常に弱い。皮膚のしわのケアが必要。医療費が高額になる可能性。',
    commonDiseases: ['短頭種気道症候群', '皮膚炎', '股関節形成不全']
  },
  {
    name: 'バーニーズマウンテンドッグ',
    size: 'large',
    exerciseNeed: 'medium',
    barkingLevel: 'low',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'beginner',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '美しい三色（黒・白・茶）の長毛。穏やかな表情の超大型犬。',
    description: '美しい三色の被毛で人気の大型犬。穏やかで優しく、子供との相性が非常に良い。「子守犬」とも呼ばれます。',
    cautions: '大型犬のため広いスペースが必要。抜け毛が非常に多い。暑さに弱く、寿命が比較的短い傾向があります。',
    commonDiseases: ['悪性腫瘍（がん）', '股関節形成不全', '肘関節形成不全']
  },
  {
    name: 'シェットランドシープドッグ',
    size: 'medium',
    exerciseNeed: 'high',
    barkingLevel: 'high',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: 'コリーを小さくしたような優雅な外見。豊かな被毛を持つ牧羊犬。',
    description: 'コリーに似た美しい外見で人気。賢く、訓練性が非常に高い牧羊犬。家族に忠実で、子供の世話も上手な傾向。',
    cautions: '吠え癖がつきやすい。抜け毛が非常に多い。十分な運動と知的刺激が必要。神経質な個体もいます。',
    commonDiseases: ['コリー眼異常', '股関節形成不全', '甲状腺機能低下症']
  },
  {
    name: 'ミニチュアピンシャー',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'high',
    sheddingLevel: 'low',
    goodWithKids: false,
    goodForApartment: true,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: 'ドーベルマンを小型化したような外見。引き締まった体と立ち耳が特徴的。',
    description: '「小さな王様」と呼ばれる活発な小型犬。エネルギッシュで勇敢な性格の傾向。番犬としても優秀で人気。',
    cautions: '吠え癖がつきやすい。小さな子供との相性に注意。寒さに弱く、冬場は服が必要。脱走に注意。',
    commonDiseases: ['膝蓋骨脱臼', 'レッグペルテス病', '進行性網膜萎縮症']
  },
  {
    name: 'イタリアングレーハウンド',
    size: 'small',
    exerciseNeed: 'medium',
    barkingLevel: 'low',
    sheddingLevel: 'low',
    goodWithKids: false,
    goodForApartment: true,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '細くしなやかな体型と優雅な動き。最小のサイトハウンド（視覚猟犬）。',
    description: 'スレンダーで優雅な外見が人気。穏やかで愛情深い性格の傾向。抜け毛が少なく、マンション向き。',
    cautions: '非常に繊細で骨折しやすい。寒さに極端に弱く、服や暖房が必須。分離不安を起こしやすい傾向。',
    commonDiseases: ['骨折', '歯周病', '膝蓋骨脱臼']
  },
  {
    name: 'ダルメシアン',
    size: 'large',
    exerciseNeed: 'high',
    barkingLevel: 'medium',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '白地に黒または茶色の斑点模様。スタイリッシュで筋肉質な大型犬。',
    description: '白地に黒斑点の美しい外見で人気。活発でエネルギッシュ。家族に忠実で、番犬としても優秀な傾向。',
    cautions: '非常に高い運動量が必要。抜け毛が多い。聴覚障害のリスクあり。十分な社会化とトレーニングが重要。',
    commonDiseases: ['先天性聴覚障害', '尿路結石', 'アレルギー性皮膚炎']
  },
  {
    name: 'グレートピレニーズ',
    size: 'large',
    exerciseNeed: 'medium',
    barkingLevel: 'medium',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'medium',
    characteristics: '真っ白で厚い二重被毛。威厳ある佇まいの超大型護衛犬。',
    description: '真っ白なふわふわの被毛が美しい大型犬。穏やかで優しく、家族を守る本能が強い傾向。',
    cautions: '非常に大きく、広いスペースが必要。抜け毛が極めて多い。暑さに弱い。独立心が強く、訓練に根気が必要。',
    commonDiseases: ['股関節形成不全', '骨肉腫', '胃捻転']
  },
  {
    name: 'サモエド',
    size: 'large',
    exerciseNeed: 'high',
    barkingLevel: 'medium',
    sheddingLevel: 'high',
    goodWithKids: true,
    goodForApartment: false,
    experienceNeeded: 'intermediate',
    hypoallergenic: false,
    aloneTimeTolerance: 'low',
    characteristics: '真っ白でふわふわの被毛。口角が上がった「サモエドスマイル」が有名。',
    description: '「笑顔の犬」として知られる白くふわふわの人気犬種。友好的で社交的。家族思いの性格の傾向。',
    cautions: '抜け毛が極めて多く、毎日のブラッシングが必須。高い運動量が必要。暑さに弱い。分離不安を起こしやすい。',
    commonDiseases: ['股関節形成不全', '糖尿病', '進行性網膜萎縮症']
  }
];

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'questions' | 'loading' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [recommendations, setRecommendations] = useState<DogRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [openBreedLink, setOpenBreedLink] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 'housing',
      text: '住居形態を教えてください',
      type: 'radio',
      options: ['戸建て（庭あり）', '戸建て（庭なし）', 'マンション・アパート'],
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 'space',
      text: '飼育可能なスペースはどのくらいですか？',
      type: 'radio',
      options: ['広い（15㎡以上）', '標準（8〜15㎡）', '限られている（8㎡未満）'],
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 'walkTime',
      text: '1日にどのくらい散歩できますか？',
      type: 'radio',
      options: ['60分以上', '30〜60分', '30分未満', '散歩は難しい'],
      icon: <Clock className="w-6 h-6" />
    },
    {
      id: 'aloneTime',
      text: '犬が留守番する時間はどのくらいですか？',
      type: 'radio',
      options: ['ほぼない（在宅勤務等）', '4時間未満', '4〜8時間', '8時間以上'],
      icon: <Clock className="w-6 h-6" />
    },
    {
      id: 'exercise',
      text: '運動量の多い犬を飼うことに対する許容度は？',
      type: 'radio',
      options: ['積極的に運動させたい', '適度なら問題ない', 'あまり多くない方がいい', '運動は最小限がいい'],
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 'barking',
      text: '吠え声に対する許容度を教えてください',
      type: 'radio',
      options: ['あまり気にしない', '時々なら問題ない', 'できるだけ静かな方がいい', '非常に静かな犬種希望'],
      icon: <Volume2 className="w-6 h-6" />
    },
    {
      id: 'shedding',
      text: '抜け毛やお手入れに対する許容度は？',
      type: 'radio',
      options: ['手入れは積極的にできる', '週に数回なら可能', '最小限がいい', 'できるだけ少ない方がいい'],
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: 'experience',
      text: '犬の飼育経験を教えてください',
      type: 'radio',
      options: ['複数回飼育経験あり', '1回飼育経験あり', '初めて飼う'],
      icon: <Dog className="w-6 h-6" />
    },
    {
      id: 'children',
      text: '小さなお子様（6歳未満）はいますか？',
      type: 'radio',
      options: ['いる', 'いない'],
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'allergies',
      text: 'ご家族にアレルギーのある方はいますか？',
      type: 'radio',
      options: ['いる', 'いない', 'わからない'],
      icon: <AlertCircle className="w-6 h-6" />
    },
    {
      id: 'dogSize',
      text: '希望する犬のサイズは？',
      type: 'radio',
      options: ['小型犬', '中型犬', '大型犬', 'こだわらない'],
      icon: <Dog className="w-6 h-6" />
    },
    {
      id: 'grooming',
      text: 'トリミングサロンに定期的に通えますか？',
      type: 'radio',
      options: ['月1回以上通える', '数ヶ月に1回なら可能', '難しい'],
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: 'medicalCost',
      text: '犬の医療費についてどのように考えていますか？',
      type: 'radio',
      options: ['高額でも適切な治療を受けさせたい', '一般的な範囲であれば対応できる', 'できるだけ医療費が少ない犬種がいい', 'ペット保険の加入を検討している'],
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      id: 'healthCare',
      text: '定期的な健康診断や予防ケアについて',
      type: 'radio',
      options: ['年2回以上の健康診断を受けさせられる', '年1回は確実に受けさせられる', '必要最小限で考えている', '基本的なワクチン接種のみ予定'],
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 'injuryRisk',
      text: '骨折などの怪我のリスクについて',
      type: 'radio',
      options: ['小さな犬でも問題なくケアできる', '標準的な体格の犬が安心', '丈夫で怪我しにくい犬種がいい', '特に気にしていない'],
      icon: <AlertCircle className="w-6 h-6" />
    }
  ];

  const handleStart = () => {
    setStep('questions');
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (useAI) {
        analyzeDogBreedsWithAI(newAnswers);
      } else {
        analyzeDogBreedsWithLogic(newAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // ロジックベースの診断（AI不使用）
  const analyzeDogBreedsWithLogic = async (userAnswers: UserAnswers) => {
    setStep('loading');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // スコアリングシステムで犬種を評価
    const scoredBreeds = dogDatabase.map(breed => {
      let score = 0;

      // 住居タイプでスコアリング
      if (userAnswers.housing === 'マンション・アパート' && breed.goodForApartment) score += 20;
      if (userAnswers.housing?.toString().includes('戸建て') && breed.size !== 'large') score += 10;
      if (userAnswers.housing === '戸建て（庭あり）') score += 5;

      // 散歩時間でスコアリング
      if (userAnswers.walkTime === '60分以上' && breed.exerciseNeed === 'high') score += 20;
      if (userAnswers.walkTime === '30〜60分' && breed.exerciseNeed === 'medium') score += 20;
      if (userAnswers.walkTime === '30分未満' && breed.exerciseNeed === 'low') score += 20;
      if (userAnswers.walkTime === '散歩は難しい' && breed.exerciseNeed === 'low') score += 15;

      // 留守時間でスコアリング
      if (userAnswers.aloneTime === '8時間以上' && breed.aloneTimeTolerance === 'high') score += 15;
      if (userAnswers.aloneTime === '4〜8時間' && breed.aloneTimeTolerance !== 'low') score += 15;
      if (userAnswers.aloneTime?.toString().includes('いない') && breed.aloneTimeTolerance === 'low') score += 10;

      // 吠え声でスコアリング
      if (userAnswers.barking === '非常に静かな犬種希望' && breed.barkingLevel === 'low') score += 20;
      if (userAnswers.barking === 'できるだけ静かな方がいい' && breed.barkingLevel !== 'high') score += 15;
      if (userAnswers.barking === 'あまり気にしない') score += 5;

      // 抜け毛でスコアリング
      if (userAnswers.shedding === 'できるだけ少ない方がいい' && breed.sheddingLevel === 'low') score += 15;
      if (userAnswers.shedding === '最小限がいい' && breed.sheddingLevel !== 'high') score += 10;

      // 飼育経験でスコアリング
      if (userAnswers.experience === '初めて飼う' && breed.experienceNeeded === 'beginner') score += 20;
      if (userAnswers.experience === '1回飼育経験あり' && breed.experienceNeeded !== 'advanced') score += 15;
      if (userAnswers.experience === '複数回飼育経験あり') score += 10;

      // 子供の有無でスコアリング
      if (userAnswers.children === 'いる' && breed.goodWithKids) score += 20;
      if (userAnswers.children === 'いない') score += 5;

      // アレルギーでスコアリング
      if (userAnswers.allergies === 'いる' && breed.hypoallergenic) score += 25;

      // 犬のサイズでスコアリング
      if (userAnswers.dogSize === '小型犬' && breed.size === 'small') score += 15;
      if (userAnswers.dogSize === '中型犬' && breed.size === 'medium') score += 15;
      if (userAnswers.dogSize === '大型犬' && breed.size === 'large') score += 15;

      // 医療費でスコアリング
      if (userAnswers.medicalCost === 'できるだけ医療費が少ない犬種がいい') {
        // 短頭種は医療費が高い傾向
        if (breed.name === 'フレンチブルドッグ' || breed.name === 'パグ' || breed.name === 'ブルドッグ') {
          score -= 10;
        }
        // 大型犬は医療費が高い傾向
        if (breed.size === 'large') {
          score -= 5;
        }
        // 丈夫な犬種にプラス
        if (breed.name === '柴犬' || breed.name === 'ビーグル' || breed.name === 'ミニチュアシュナウザー') {
          score += 10;
        }
      }

      // 健康管理でスコアリング
      if (userAnswers.healthCare === '必要最小限で考えている' || userAnswers.healthCare === '基本的なワクチン接種のみ予定') {
        // 健康リスクが高い犬種を避ける
        if (breed.name === 'キャバリアキングチャールズスパニエル' || breed.name === 'ダルメシアン') {
          score -= 15;
        }
        if (breed.name === 'バーニーズマウンテンドッグ' || breed.name === 'グレートピレニーズ') {
          score -= 10;
        }
      }

      // 怪我のリスクでスコアリング
      if (userAnswers.injuryRisk === '標準的な体格の犬が安心' || userAnswers.injuryRisk === '丈夫で怪我しにくい犬種がいい') {
        // 骨折しやすい超小型犬・華奢な犬種
        if (breed.name === 'チワワ' || breed.name === 'イタリアングレーハウンド' || breed.name === 'パピヨン') {
          score -= 15;
        }
        // ミニチュアダックスフンドは椎間板ヘルニアのリスク
        if (breed.name === 'ミニチュアダックスフンド' || breed.name === 'ウェルシュコーギー') {
          score -= 10;
        }
        // 丈夫な犬種にプラス
        if (breed.size === 'medium' || breed.name === 'ビーグル' || breed.name === 'ラブラドールレトリバー') {
          score += 10;
        }
      }

      return { breed, score };
    });

    // スコアの高い順にソートして上位5つを取得
    const topBreeds = scoredBreeds
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const recommendations: DogRecommendation[] = topBreeds.map((item, index) => ({
      breed: item.breed.name,
      characteristics: item.breed.characteristics || '情報なし',
      suitabilityReason: item.breed.description,
      cautions: item.breed.cautions,
      commonDiseases: item.breed.commonDiseases || [],
      difficulty: item.breed.experienceNeeded === 'beginner' ? '初心者向け' :
        item.breed.experienceNeeded === 'intermediate' ? 'やや経験者向け' : '経験者向け',
      rating: Math.min(5, Math.max(3, Math.round(5 - index * 0.5))),
      breedData: item.breed,
    }));

    setRecommendations(recommendations);
    setStep('results');
    setIsLoading(false);
  };

  // 費用シミュレーターコンポーネント
  const CostSimulator = ({ breedName }: { breedName: string }) => {
    const costData = calculateBreedCost(breedName);

    if (!costData) {
      return (
        <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
          この犬種の費用データは現在準備中です
        </div>
      );
    }

    const formatCurrency = (amount: number) => {
      return amount.toLocaleString('ja-JP') + '円';
    };

    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mt-4">
        <h4 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          参考：{breedName}の飼育費用
        </h4>

        {/* サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600">初年度</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(costData.firstYear)}
            </div>
            <div className="text-xs text-gray-500 mt-1">初期費用含む</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">2年目以降/年</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(costData.annualFromSecondYear)}
            </div>
            <div className="text-xs text-gray-500 mt-1">月平均 {formatCurrency(Math.round(costData.annualFromSecondYear / 12))}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">10年間総額</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(costData.tenYearTotal)}
            </div>
            <div className="text-xs text-gray-500 mt-1">生涯費用の目安</div>
          </div>
        </div>

        {/* 詳細内訳 */}
        <div className="bg-white rounded-lg p-4">
          <h5 className="font-semibold text-gray-700 mb-3 text-sm">費用の詳細内訳</h5>

          <div className="space-y-3">
            {/* 初期費用 */}
            <div className="border-b pb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">初期費用(初年度のみ)</span>
                <span className="text-sm font-bold text-gray-800">{formatCurrency(costData.breakdown.initial)}</span>
              </div>
              <div className="pl-4 space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>・犬の購入費</span>
                  <span>{formatCurrency(costData.breakdown.details.initial.purchase)}</span>
                </div>
                <div className="flex justify-between">
                  <span>・初期用品(ケージ、食器等)</span>
                  <span>{formatCurrency(costData.breakdown.details.initial.supplies)}</span>
                </div>
              </div>
            </div>

            {/* 月額費用 */}
            <div className="border-b pb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">月額費用</span>
                <span className="text-sm font-bold text-gray-800">{formatCurrency(costData.monthlyAverage)}/月</span>
              </div>
              <div className="pl-4 space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>・フード代</span>
                  <span>{formatCurrency(costData.breakdown.details.monthly.food)}</span>
                </div>
                {costData.breakdown.details.monthly.grooming > 0 && (
                  <div className="flex justify-between">
                    <span>・トリミング代</span>
                    <span>{formatCurrency(costData.breakdown.details.monthly.grooming)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>・消耗品(ペットシーツ等)</span>
                  <span>{formatCurrency(costData.breakdown.details.monthly.supplies)}</span>
                </div>
              </div>
            </div>

            {/* 年間固定費 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">年間固定費</span>
                <span className="text-sm font-bold text-gray-800">{formatCurrency(costData.breakdown.yearlyFixed)}/年</span>
              </div>
              <div className="pl-4 space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>・医療費(ワクチン、健診等)</span>
                  <span>{formatCurrency(costData.breakdown.details.yearly.medical)}</span>
                </div>
                <div className="flex justify-between">
                  <span>・ペット保険(推奨)</span>
                  <span>{formatCurrency(costData.breakdown.details.yearly.insurance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // AIベースの診断（Claude API使用）
  const analyzeDogBreedsWithAI = async (userAnswers: UserAnswers) => {
    setStep('loading');
    setIsLoading(true);

    try {
      const dogList = dogDatabase.map(d => d.name).join('、');

      const prompt = `あなたは犬の飼育に関する専門的な知識を持つアドバイザーです。以下のユーザー情報に基づいて、適切な犬種を提案してください。

【ユーザー情報】
住居: ${userAnswers.housing}
スペース: ${userAnswers.space}
散歩時間: ${userAnswers.walkTime}
留守時間: ${userAnswers.aloneTime}
運動量許容度: ${userAnswers.exercise}
吠え声許容度: ${userAnswers.barking}
お手入れ許容度: ${userAnswers.shedding}
飼育経験: ${userAnswers.experience}
小さな子供: ${userAnswers.children}
アレルギー: ${userAnswers.allergies}
希望サイズ: ${userAnswers.dogSize}
トリミング: ${userAnswers.grooming}
予算: ${userAnswers.budget}
ライフスタイル: ${userAnswers.lifestyle}
飼育目的: ${userAnswers.purpose}

【利用可能な犬種】
${dogList}

【出力形式】
以下のJSON形式で、上記の犬種から3〜5種類を提案してください。必ず有効なJSONのみを返してください。

[
  {
    "breed": "犬種名（上記リストから選択）",
    "characteristics": "犬種の特徴（50文字程度、見た目や性格の概要）",
    "suitabilityReason": "この方に向いている理由（3〜5行、「傾向として」「一般的に」などの表現を使用）",
    "cautions": "飼育時の注意点（3〜5行）",
    "commonDiseases": ["病気1", "病気2", "病気3"],
    "difficulty": "初心者向け / やや経験者向け / 経験者向け",
    "rating": 5
  }
]

【重要な注意事項】
- 「絶対に大丈夫」「必ず〜になる」などの断定表現は使用しない
- 「傾向として」「一般的に」「〜と言われています」などの表現を使用
- 医療的な断定は避ける
- 各犬種について、ポジティブな面と注意が必要な面の両方を記載
- ユーザーの生活環境に合わない場合は、その理由も明確に
- 必ず上記の犬種リストから選択すること`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [
            { role: 'user', content: prompt }
          ],
        }),
      });

      const data = await response.json();
      const content = data.content[0].text;

      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsedRecommendations = JSON.parse(jsonMatch[0]);
        setRecommendations(parsedRecommendations);
        setStep('results');
      } else {
        throw new Error('JSONの解析に失敗しました');
      }
    } catch (error) {
      console.error('AI診断エラー:', error);
      alert('AI診断中にエラーが発生しました。ロジックベースの診断に切り替えます。');
      analyzeDogBreedsWithLogic(userAnswers);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setRecommendations([]);
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // イントロ画面
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 md:p-12">
          <div className="text-center">
            <Dog className="w-20 h-20 mx-auto text-indigo-600 mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              犬の飼育適性診断
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              あなたのライフスタイルに合った犬種を見つけましょう
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">この診断について</p>
                  <p className="mb-2">この診断は参考情報として提供されるものであり、実際の飼育判断は専門家（獣医師、ブリーダー、保護団体等）にご相談ください。</p>
                  <p>犬種の特性は個体差があり、飼育環境やトレーニングによって大きく変わります。</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors w-full md:w-auto"
            >
              診断を始める（所要時間: 約5分）
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 質問画面
  if (step === 'questions') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 md:p-12">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                質問 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 p-3 rounded-full">
                {question.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{question.text}</h2>
            </div>

            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← 前の質問に戻る
            </button>
          )}
        </div>
      </div>
    );
  }

  // ローディング画面
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-12 text-center">
          <Dog className="w-20 h-20 mx-auto text-indigo-600 mb-6 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">診断中です...</h2>
          <p className="text-gray-600">
            {useAI ? 'AIがあなたに最適な犬種を分析しています' : 'あなたに最適な犬種を分析しています'}
          </p>
        </div>
      </div>
    );
  }

  // 結果画面
  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              診断結果
            </h1>
            <p className="text-center text-gray-600 mb-8">
              あなたのライフスタイルに合った犬種をご提案します
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  以下の提案は参考情報です。実際の飼育判断は、獣医師やブリーダー、保護団体などの専門家にご相談ください。
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <h3
                        className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors flex items-center gap-2"
                        onClick={() => setOpenBreedLink(openBreedLink === index ? null : index)}
                      >
                        {rec.breed}
                        <span className="text-sm text-gray-500">(詳細を見る 🔗)</span>
                      </h3>
                      {breedReferenceLinks[rec.breed] && openBreedLink === index && (
                        <div className="absolute left-0 top-full mt-2 z-20 w-96 p-4 bg-white border-2 border-indigo-300 rounded-lg shadow-2xl">
                          <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Dog className="w-4 h-4" />
                            詳細情報を見る
                          </div>
                          <div className="space-y-2">
                            {breedReferenceLinks[rec.breed].map((link, linkIdx) => (
                              <a
                                key={linkIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded transition-colors border border-indigo-200 hover:border-indigo-400"
                              >
                                🔗 {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-500 text-xl">{renderStars(rec.rating)}</div>
                      <span className="text-sm text-gray-500">おすすめ度</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {rec.difficulty}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Dog className="w-5 h-5 text-blue-600" />
                        犬種の特徴
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{rec.characteristics}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        向いている理由
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{rec.suitabilityReason}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        飼育時の注意点
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{rec.cautions}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        かかりやすい病気・怪我
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                        {rec.commonDiseases && rec.commonDiseases.map((disease, idx) => (
                          <li key={idx} className="group relative">
                            <span className="cursor-help border-b border-dotted border-gray-400 hover:border-red-600 transition-colors">
                              {disease}
                            </span>
                            {diseaseDetails[disease] && (
                              <div className="hidden group-hover:block absolute right-full mr-4 top-0 z-10 w-80 p-4 bg-gray-800 text-white text-sm rounded-lg shadow-xl">
                                <div className="absolute -right-2 top-3 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                                <div className="font-semibold text-yellow-300 mb-2">📋 詳細</div>
                                <p className="mb-3 leading-relaxed">{diseaseDetails[disease].description}</p>
                                <div className="font-semibold text-green-300 mb-2">💡 対策</div>
                                <p className="leading-relaxed">{diseaseDetails[disease].prevention}</p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 詳細適性スコア */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-5 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">📊 詳細適性スコア</h4>
                    {(() => {
                      const detailedScores = calculateDetailedScores(answers, rec.breedData);
                      const totalScore = Math.round(
                        (detailedScores.housing + detailedScores.exercise + detailedScores.grooming +
                          detailedScores.experience + detailedScores.health) / 5
                      );

                      const ScoreBar = ({ label, score, icon, color }: { label: string; score: number; icon: string; color: string }) => (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{icon}</span>
                              <span className="text-sm font-medium text-gray-700">{label}</span>
                            </div>
                            <span className="text-sm font-bold" style={{ color }}>{score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${score}%`, backgroundColor: color }}
                            />
                          </div>
                        </div>
                      );

                      return (
                        <>
                          <div className="mb-4 p-3 bg-white rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">総合適性度</span>
                              <span className="text-2xl font-bold text-indigo-600">{totalScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                                style={{ width: `${totalScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <ScoreBar label="住環境の相性" score={detailedScores.housing} icon="🏠" color="#3b82f6" />
                            <ScoreBar label="運動・活動量の相性" score={detailedScores.exercise} icon="🏃" color="#10b981" />
                            <ScoreBar label="お手入れ・ケアの相性" score={detailedScores.grooming} icon="✂️" color="#8b5cf6" />
                            <ScoreBar label="経験・飼いやすさの相性" score={detailedScores.experience} icon="🏆" color="#f59e0b" />
                            <ScoreBar label="健康管理・コストの相性" score={detailedScores.health} icon="❤️" color="#ef4444" />
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div>
                    <CostSimulator breedName={rec.breed} />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleRestart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                もう一度診断する
              </button>
            </div>

            {/* 費用についての注意事項 */}
            <div className="mb-6 text-xs text-gray-600 bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="font-semibold mb-2">💡 費用についての注意点</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>上記は平均的な目安です。地域や購入先により異なります</li>
                <li>病気や怪我の治療費は含まれていません(別途必要)</li>
                <li>保護犬の場合、購入費は大幅に低くなります(3〜5万円程度)</li>
                <li>老犬になると医療費が増加する傾向があります</li>
              </ul>
            </div>



            <div className="mt-8 text-center text-sm text-gray-600">
              <p>さらに詳しい情報は以下をご参照ください：</p>
              <p className="mt-2">
                環境省 動物愛護管理 | 日本獣医師会 | ジャパンケネルクラブ（JKC）
              </p>
            </div>
          </div>
        </div >
      </div >
    );
  }

  return null;
};

export default App;