import { SocialIcon } from "../components/social-icon";
import type { ProfileCard } from "../types/profile-card";

interface Props {
	card: ProfileCard;
}

export function DefaultTemplate({ card }: Props) {
	return (
		<div className="w-80 rounded-3xl bg-white p-6 shadow-lg">
			<div className="flex flex-col items-center gap-4">
				{card.avatarUrl && (
					<img
						src={card.avatarUrl}
						alt={card.displayName}
						className="h-20 w-20 rounded-full object-cover"
					/>
				)}
				<div className="text-center">
					<h2 className="text-lg font-bold text-gray-900">
						{card.displayName || "Display Name"}
					</h2>
					{card.vrcId && (
						<p className="mt-1 text-xs text-gray-400">{card.vrcId}</p>
					)}
				</div>
				{card.bio && (
					<p className="text-center text-sm text-gray-600">{card.bio}</p>
				)}
				{card.socialLinks.length > 0 && (
					<div className="flex gap-2">
						{card.socialLinks
							.filter((link) => link.url)
							.map((link) => (
								<SocialIcon
									key={link.platform}
									platform={link.platform}
									url={link.url}
								/>
							))}
					</div>
				)}
			</div>
		</div>
	);
}
