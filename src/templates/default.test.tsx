import { render, screen } from "@testing-library/react";
import type { ProfileCard } from "../types/profile-card";
import { DefaultTemplate } from "./default";

const baseCard: ProfileCard = {
	displayName: "テストユーザー",
	avatarUrl: "",
	bio: "",
	vrcId: "",
	socialLinks: [],
	templateId: "default",
};

describe("DefaultTemplate", () => {
	it("renders display name", () => {
		render(<DefaultTemplate card={baseCard} />);
		expect(screen.getByText("テストユーザー")).toBeInTheDocument();
	});

	it("shows fallback when displayName is empty", () => {
		render(<DefaultTemplate card={{ ...baseCard, displayName: "" }} />);
		expect(screen.getByText("Display Name")).toBeInTheDocument();
	});

	it("renders bio when provided", () => {
		render(<DefaultTemplate card={{ ...baseCard, bio: "よろしく！" }} />);
		expect(screen.getByText("よろしく！")).toBeInTheDocument();
	});

	it("hides bio when empty", () => {
		render(<DefaultTemplate card={baseCard} />);
		expect(screen.queryByText("よろしく！")).not.toBeInTheDocument();
	});

	it("hides avatar when avatarUrl is empty", () => {
		render(<DefaultTemplate card={baseCard} />);
		expect(screen.queryByRole("img")).not.toBeInTheDocument();
	});

	it("shows avatar when avatarUrl is provided", () => {
		render(
			<DefaultTemplate
				card={{ ...baseCard, avatarUrl: "https://example.com/avatar.png" }}
			/>,
		);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
	});

	it("renders social links with URLs", () => {
		render(
			<DefaultTemplate
				card={{
					...baseCard,
					socialLinks: [{ platform: "x", url: "https://x.com/test" }],
				}}
			/>,
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://x.com/test");
	});

	it("filters out social links with empty URLs", () => {
		render(
			<DefaultTemplate
				card={{
					...baseCard,
					socialLinks: [{ platform: "x", url: "" }],
				}}
			/>,
		);
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});
});
