import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

// Post型の定義
type Post = {
  id: string;
  title: string;
  body: string;
  userId: string; // Typo修正: useId → userId
};
export const meta: MetaFunction = () => {
  return [
    { title: "testブログ" },
    { name: "description", content: "testtesttest！" },
  ];
};

// データを取得するloader関数
export const loader = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  if (!response.ok) {
    throw new Error("投稿データの取得に失敗しました");
  }

  const data: Post[] = await response.json();
  return json({ posts: data });
};

// コンポーネントのメイン関数
export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="font-bold text-3xl">strawberrys</h1>
      <ul className="list-disc pl-5">
        {" "}
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            {" "}
            <Link
              to={`/posts/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
