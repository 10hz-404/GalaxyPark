#!/usr/bin/env node
/**
 * 将 public/photos/{数字参数}/ 目录下的图片添加到 content/photos/{文件名参数} 文件中
 * 
 * 用法: npm run add-photos <文件名> <数字参数>
 * 示例: npm run add-photos 1-MuggySummerVacation 1
 */

import fs from 'fs';
import path from 'path';

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('用法: npm run add-photos <文件名> <数字参数>');
  console.error('示例: npm run add-photos 1-MuggySummerVacation 1');
  process.exit(1);
}

const [fileName, numberParam] = args;

// 路径配置
const photosDir = path.join(process.cwd(), 'public', 'photos', numberParam);
const contentFile = path.join(process.cwd(), 'content', 'photos', `${fileName}.txt`);

// 检查图片目录是否存在
if (!fs.existsSync(photosDir)) {
  console.error(`错误: 图片目录不存在: ${photosDir}`);
  process.exit(1);
}

// 检查内容文件是否存在
if (!fs.existsSync(contentFile)) {
  console.error(`错误: 内容文件不存在: ${contentFile}`);
  process.exit(1);
}

// 支持的图片扩展名
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP', '.AVIF'];

// 读取目录中的所有图片文件
const files = fs.readdirSync(photosDir)
  .filter(file => {
    const ext = path.extname(file);
    return imageExtensions.includes(ext);
  })
  .sort(); // 按文件名排序

if (files.length === 0) {
  console.error(`警告: 目录 ${photosDir} 中没有找到图片文件`);
  process.exit(1);
}

// 生成图片链接格式
const photoLinks = files.map(file => `"/photos/${numberParam}/${file}"`);

// 读取现有文件内容
let content = fs.readFileSync(contentFile, 'utf-8');

// 查找 [photos] 标签的位置
const photosTagIndex = content.indexOf('[photos]');
if (photosTagIndex === -1) {
  console.error('错误: 文件中没有找到 [photos] 标签');
  process.exit(1);
}

// 查找 [photos] 后的下一个标签位置（如 [content]）
const afterPhotosTag = content.substring(photosTagIndex + '[photos]'.length);
const nextTagMatch = afterPhotosTag.match(/\n\[[\w]+\]/);

let newContent;
if (nextTagMatch) {
  // 如果找到下一个标签，在其前面插入新的图片链接
  const insertPosition = photosTagIndex + '[photos]'.length + nextTagMatch.index;
  const beforeInsert = content.substring(0, photosTagIndex + '[photos]'.length);
  const afterInsert = content.substring(insertPosition);
  newContent = beforeInsert + '\n' + photoLinks.join(',\n') + afterInsert;
} else {
  // 如果没有找到下一个标签，直接追加到文件末尾
  const beforePhotos = content.substring(0, photosTagIndex + '[photos]'.length);
  newContent = beforePhotos + '\n' + photoLinks.join(',\n') + '\n';
}

// 写入文件
fs.writeFileSync(contentFile, newContent, 'utf-8');

console.log(`✅ 成功添加 ${files.length} 张图片到 ${contentFile}`);
console.log('添加的图片:');
files.forEach(file => console.log(`  - /photos/${numberParam}/${file}`));
