import { Link } from "react-router";

export function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-gray-900">nyawn</h1>
				<p className="mt-2 text-gray-600">
					プロフィールカードを簡単に、モダンに、かわいく
				</p>
			</div>
			<Link
				to="/edit"
				className="rounded-xl bg-pink-400 px-8 py-3 font-medium text-white shadow-md transition-colors hover:bg-pink-500"
			>
				カードを作る
			</Link>
		</div>
	);
}
