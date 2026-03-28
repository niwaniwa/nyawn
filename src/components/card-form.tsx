import { useCardStore } from "../stores/card-store";
import type { SocialLink, SocialPlatform } from "../types/profile-card";

const SOCIAL_PLATFORMS: { value: SocialPlatform; label: string }[] = [
	{ value: "x", label: "X (Twitter)" },
	{ value: "youtube", label: "YouTube" },
	{ value: "twitch", label: "Twitch" },
	{ value: "discord", label: "Discord" },
	{ value: "github", label: "GitHub" },
	{ value: "misskey", label: "Misskey" },
];

export function CardForm() {
	const { card, updateCard } = useCardStore();

	const updateSocialLink = (index: number, updates: Partial<SocialLink>) => {
		const newLinks = [...card.socialLinks];
		newLinks[index] = { ...newLinks[index], ...updates };
		updateCard({ socialLinks: newLinks });
	};

	const addSocialLink = () => {
		if (card.socialLinks.length >= 3) return;
		const usedPlatforms = new Set(card.socialLinks.map((l) => l.platform));
		const available = SOCIAL_PLATFORMS.find((p) => !usedPlatforms.has(p.value));
		if (!available) return;
		updateCard({
			socialLinks: [
				...card.socialLinks,
				{ platform: available.value, url: "" },
			],
		});
	};

	const removeSocialLink = (index: number) => {
		updateCard({
			socialLinks: card.socialLinks.filter((_, i) => i !== index),
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<label className="flex flex-col gap-1">
				<span className="text-sm font-medium text-gray-700">
					表示名 <span className="text-pink-400">*</span>
				</span>
				<input
					type="text"
					value={card.displayName}
					onChange={(e) => updateCard({ displayName: e.target.value })}
					maxLength={30}
					placeholder="あなたの名前"
					className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
				/>
			</label>

			<label className="flex flex-col gap-1">
				<span className="text-sm font-medium text-gray-700">
					アバター画像URL
				</span>
				<input
					type="url"
					value={card.avatarUrl}
					onChange={(e) => updateCard({ avatarUrl: e.target.value })}
					placeholder="https://example.com/avatar.png"
					className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
				/>
			</label>

			<label className="flex flex-col gap-1">
				<span className="text-sm font-medium text-gray-700">ひとこと紹介</span>
				<textarea
					value={card.bio}
					onChange={(e) => updateCard({ bio: e.target.value })}
					maxLength={100}
					rows={3}
					placeholder="自己紹介を書いてね"
					className="resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
				/>
			</label>

			<label className="flex flex-col gap-1">
				<span className="text-sm font-medium text-gray-700">VRChat ID</span>
				<input
					type="text"
					value={card.vrcId}
					onChange={(e) => updateCard({ vrcId: e.target.value })}
					placeholder="usr_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
					className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
				/>
			</label>

			<div className="flex flex-col gap-2">
				<span className="text-sm font-medium text-gray-700">SNSリンク</span>
				{card.socialLinks.map((link, index) => (
					<div key={link.platform} className="flex items-center gap-2">
						<select
							value={link.platform}
							onChange={(e) =>
								updateSocialLink(index, {
									platform: e.target.value as SocialPlatform,
								})
							}
							className="rounded-lg border border-gray-200 px-2 py-2 text-sm focus:border-pink-400 focus:outline-none"
						>
							{SOCIAL_PLATFORMS.map((p) => (
								<option key={p.value} value={p.value}>
									{p.label}
								</option>
							))}
						</select>
						<input
							type="url"
							value={link.url}
							onChange={(e) => updateSocialLink(index, { url: e.target.value })}
							placeholder="https://..."
							className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
						/>
						<button
							type="button"
							onClick={() => removeSocialLink(index)}
							className="rounded-lg px-2 py-2 text-sm text-gray-400 hover:text-red-400"
						>
							削除
						</button>
					</div>
				))}
				{card.socialLinks.length < 3 && (
					<button
						type="button"
						onClick={addSocialLink}
						className="self-start rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-pink-400 hover:text-pink-400"
					>
						+ SNSを追加
					</button>
				)}
			</div>
		</div>
	);
}
