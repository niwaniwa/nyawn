import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileCard } from "../types/profile-card";

const DEFAULT_CARD: ProfileCard = {
	displayName: "",
	avatarUrl: "",
	bio: "",
	vrcId: "",
	socialLinks: [],
	templateId: "default",
};

interface CardState {
	card: ProfileCard;
	schemaVersion: number;
	updateCard: (updates: Partial<ProfileCard>) => void;
	resetCard: () => void;
}

export const useCardStore = create<CardState>()(
	persist(
		(set) => ({
			card: DEFAULT_CARD,
			schemaVersion: 1,
			updateCard: (updates) =>
				set((state) => ({
					card: { ...state.card, ...updates },
				})),
			resetCard: () => set({ card: DEFAULT_CARD }),
		}),
		{
			name: "nyawn-card-store",
		},
	),
);
