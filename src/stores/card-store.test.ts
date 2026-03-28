import { useCardStore } from "./card-store";

const DEFAULT_CARD = {
	displayName: "",
	avatarUrl: "",
	bio: "",
	vrcId: "",
	socialLinks: [],
	templateId: "default",
};

beforeEach(() => {
	useCardStore.setState({
		card: { ...DEFAULT_CARD },
		schemaVersion: 1,
	});
});

describe("card-store", () => {
	it("has correct initial state", () => {
		const state = useCardStore.getState();
		expect(state.card).toEqual(DEFAULT_CARD);
		expect(state.schemaVersion).toBe(1);
	});

	it("updates card fields partially", () => {
		useCardStore.getState().updateCard({ displayName: "テストユーザー" });
		const { card } = useCardStore.getState();
		expect(card.displayName).toBe("テストユーザー");
		expect(card.avatarUrl).toBe("");
		expect(card.templateId).toBe("default");
	});

	it("updates socialLinks", () => {
		useCardStore.getState().updateCard({
			socialLinks: [{ platform: "x", url: "https://x.com/test" }],
		});
		const { card } = useCardStore.getState();
		expect(card.socialLinks).toHaveLength(1);
		expect(card.socialLinks[0].platform).toBe("x");
	});

	it("resets card to default", () => {
		useCardStore.getState().updateCard({
			displayName: "変更済み",
			bio: "テスト",
		});
		useCardStore.getState().resetCard();
		expect(useCardStore.getState().card).toEqual(DEFAULT_CARD);
	});

	it("has schemaVersion 1", () => {
		expect(useCardStore.getState().schemaVersion).toBe(1);
	});
});
