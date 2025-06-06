import React from "react";

export default function PhotoRoute() {
  return (
    <div className="flex">
      {/* 左侧浮动文字区 */}
      <div
        lang="zh-CN"
        className="sticky flex flex-col w-1/3 px-12"
        style={{ top: "100px", height: "calc(100vh - 140px)" }}
      >
        <h1 className="mb-6 leading-tight">我是标题</h1>
        <p className="leading-relaxed">文字区</p>
      </div>

      {/* 右侧滚动内容区 */}
      <div className="w-2/3">
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
