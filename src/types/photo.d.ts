interface Photo {
  /**
   * 标题
   */
  title: string;
  /**
   * 发布日期
   */
  date: string;
  /**
   * 描述内容
   */
  content: string;
  /**
   * 照的URL列表
   */
  photoUrls: string[];
  /**
   * 封面图宽高比（width / height）
   */
  coverAspectRatio?: number;
  /**
   * 每张图对应的宽高比（width / height）
   */
  photoAspectRatios?: Array<number | undefined>;
}
