import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCardStore } from "../stores/card-store";
import { CardForm } from "./card-form";

beforeEach(() => {
	useCardStore.setState({
		card: {
			displayName: "",
			avatarUrl: "",
			bio: "",
			vrcId: "",
			socialLinks: [],
			templateId: "default",
		},
		schemaVersion: 1,
	});
});

describe("CardForm", () => {
	it("renders all form fields", () => {
		render(<CardForm />);
		expect(screen.getByPlaceholderText("あなたの名前")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("https://example.com/avatar.png"),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("自己紹介を書いてね"),
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/usr_/)).toBeInTheDocument();
	});

	it("updates displayName in store on input", async () => {
		const user = userEvent.setup();
		render(<CardForm />);
		const input = screen.getByPlaceholderText("あなたの名前");
		await user.type(input, "テスト");
		expect(useCardStore.getState().card.displayName).toBe("テスト");
	});

	it("shows add social link button when no links exist", () => {
		render(<CardForm />);
		expect(screen.getByText("+ SNSを追加")).toBeInTheDocument();
	});

	it("adds a social link when button is clicked", async () => {
		const user = userEvent.setup();
		render(<CardForm />);
		await user.click(screen.getByText("+ SNSを追加"));
		expect(useCardStore.getState().card.socialLinks).toHaveLength(1);
	});

	it("removes a social link when delete is clicked", async () => {
		useCardStore.setState({
			card: {
				...useCardStore.getState().card,
				socialLinks: [{ platform: "x", url: "https://x.com/test" }],
			},
		});
		const user = userEvent.setup();
		render(<CardForm />);
		await user.click(screen.getByText("削除"));
		expect(useCardStore.getState().card.socialLinks).toHaveLength(0);
	});

	it("hides add button when 3 social links exist", () => {
		useCardStore.setState({
			card: {
				...useCardStore.getState().card,
				socialLinks: [
					{ platform: "x", url: "https://x.com/test" },
					{ platform: "youtube", url: "https://youtube.com/test" },
					{ platform: "discord", url: "https://discord.gg/test" },
				],
			},
		});
		render(<CardForm />);
		expect(screen.queryByText("+ SNSを追加")).not.toBeInTheDocument();
	});
});
