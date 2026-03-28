export type SocialPlatform =
	| "x"
	| "youtube"
	| "twitch"
	| "discord"
	| "github"
	| "misskey";

export interface SocialLink {
	platform: SocialPlatform;
	url: string;
}

export interface ProfileCard {
	displayName: string;
	avatarUrl: string;
	bio: string;
	vrcId: string;
	socialLinks: SocialLink[];
	templateId: string;
}
