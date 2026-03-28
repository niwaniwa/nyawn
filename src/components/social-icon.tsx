import {
	Github,
	MessageCircle,
	Music,
	Twitch,
	Twitter,
	Youtube,
} from "lucide-react";
import type { SocialPlatform } from "../types/profile-card";

const ICON_MAP: Record<
	SocialPlatform,
	React.ComponentType<{ size?: number }>
> = {
	x: Twitter,
	youtube: Youtube,
	twitch: Twitch,
	discord: MessageCircle,
	github: Github,
	misskey: Music,
};

interface Props {
	platform: SocialPlatform;
	url: string;
}

export function SocialIcon({ platform, url }: Props) {
	const Icon = ICON_MAP[platform];
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="text-gray-500 transition-colors hover:text-pink-400"
		>
			<Icon size={20} />
		</a>
	);
}
