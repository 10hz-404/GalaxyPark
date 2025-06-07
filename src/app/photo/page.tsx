import React from "react";

export default function PhotoRoute() {
  return (
    <div className="flex flex-col xl:flex-row">
      {/* 左侧浮动文字区 */}
      <div
        lang="zh-CN"
        className="flex flex-col w-full xl:w-1/3 pr-0 xl:pr-5 mb-8 xl:mb-0 xl:sticky xl:top-[100px] xl:h-[calc(100vh-140px)]"
      >
        <h1 className="mb-6 text-2xl leading-tight">示例标题</h1>
        <p className="leading-relaxed">
          我是否可将你比作夏日？ 你却更可爱、更温和： 粗风撼动五月心蕾初绽，
          夏日租期却又匆匆匆促： 有时炎阳骄阳炽烈难当， 常令金颜蒙尘失光辉；
          凡所有美总有褪色时， 或因命数或随岁月移； 但你的永夏永不凋零，
          也永不丧失那倾城容颜； 死神也难夸你入他阴影， 当你藉这诗行常驻人间：
          只要人类尚能呼吸视物， 这诗便存，此诗令你永生。
          <br />
          <br />
          Shall I compare thee to a summer’s day? Thou art more lovely and more
          temperate: Rough winds do shake the darling buds of May, And summer’s
          lease hath all too short a date: Sometime too hot the eye of heaven
          shines, And often is his gold complexion dimm’d; And every fair from
          fair sometime declines, By chance or nature’s changing course
          untrimm’d; But thy eternal summer shall not fade, Nor lose possession
          of that fair thou owest; Nor shall Death brag thou wander’st in his
          shade, When in eternal lines to time thou growest: So long as men can
          breathe or eyes can see, So long lives this, and this gives life to
          thee.
        </p>
      </div>

      {/* 右侧滚动内容区 */}
      <div className="w-full xl:w-2/3">
        {/* 示例图片，可替换为实际内容 */}
        <img
          src="https://i.pinimg.com/736x/e3/0b/45/e30b458163dbc1d2e59c406dc376ef97.jpg"
          alt="arcade-project-1"
          className="object-cover w-full shadow-lg"
        />
        <img
          src="https://i.pinimg.com/736x/56/0c/54/560c54783046a40e39446bfb95ac3d14.jpg"
          alt="arcade-project-2"
          className="object-cover w-full shadow-lg"
        />
        <img
          src="https://i.pinimg.com/736x/8c/9b/2b/8c9b2b56804720696c9a040ffc9c030d.jpg"
          alt="arcade-project-3"
          className="object-cover w-full shadow-lg"
        />
      </div>
    </div>
  );
}
