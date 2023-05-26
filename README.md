# mdx-bundler  vs  next-mdx-remote

## 방법

1. 비교하고 싶은 내용을 `data/blog/sample.mdx`에 복사, 붙여넣기 해주세요. (현재 예시로 작성되어 있습니다)
2. dev 모드에서 비교하고 싶다면 
   1. `yarn dev`로 실행해주세요.
   2. 메인 페이지에서 `MDX Bundler` 버튼을 클릭하면 `public/compare/mdx-bundler.json` 파일이, `Next MDX Remote` 버튼을 클릭하면 `public/compare/next-remote-mdx.json` 파일이 생성되며 라우팅 됩니다.
   3. 두 파일의 사이즈를 비교하시면 됩니다.
3. build 모드에서 비교하고 싶다면
   1. `yarn build`로 빌드 해주세요.
   2. `public/compare` 폴더 안에 `mdx-bundler.json`과 `next-mdx-remote.json` 파일이 생성됩니다.
   3. 두 파일의 사이즈를 비교하시면 됩니다.
   4. 만약 실행되는 것도 보고 싶으시면 `yarn start`로 실행해주세요.
4. contentlayer를 사용한 결과를 보고 싶으시면
   1. `contentlayer build`를 실행해주세요. `yarn build`를 해도 됩니다.
   2. `.contentlayer/generated/Blog/blog__sample.mdx.json` 파일이 생성됩니다.
   3. 이 파일의 사이즈를 비교하시면 됩니다.

## 결과

[use Query 동작원리(1)](https://www.timegambit.com/blog/digging/react-query/01) 포스트로 비교해본 결과 다음과 같습니다.

|            |mdx-bundler|next-mdx-remote|
|:----------:|:---:|:---:|
|    dev     |621KB|531KB|
| production |176KB|264KB|
