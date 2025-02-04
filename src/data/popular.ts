import { rules } from "@/data";

export async function getPopularRules() {
  // 返回静态数据而不是从 Redis 获取
  return [
    {
      title: "Popular Rules",
      rules: rules.map((rule) => ({
        ...rule,
        count: 1, // 默认计数
      })),
    },
  ];
}
