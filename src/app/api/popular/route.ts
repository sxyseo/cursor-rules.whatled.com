import { rules } from "@/data";
import { NextResponse } from "next/server";

export const revalidate = 86400; // Revalidate once every day
export const dynamic = "force-static";

// 移除 getPopularRules 的调用，改用静态数据
const popularRules = rules.map((rule) => ({
  ...rule,
  count: 1, // 默认计数，或者你可以设置一个固定的优先级
}));

export async function GET() {
  // 使用静态规则数据
  const sortedRules = popularRules.sort((a, b) => b.count - a.count);

  return new NextResponse(JSON.stringify({ data: sortedRules }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=86400",
      "CDN-Cache-Control": "public, s-maxage=86400",
      "Vercel-CDN-Cache-Control": "public, s-maxage=86400",
    },
  });
}
