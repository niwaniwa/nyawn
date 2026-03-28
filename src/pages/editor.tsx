import { useRef } from "react";
import { CardForm } from "../components/card-form";
import { ExportButton } from "../components/export-button";
import { useCardStore } from "../stores/card-store";
import { DefaultTemplate } from "../templates/default";

export function EditorPage() {
	const { card } = useCardStore();
	const cardRef = useRef<HTMLDivElement>(null);

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row">
				<div className="flex-1">
					<h2 className="mb-4 text-xl font-bold text-gray-900">編集</h2>
					<CardForm />
				</div>
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-xl font-bold text-gray-900">プレビュー</h2>
					<div ref={cardRef}>
						<DefaultTemplate card={card} />
					</div>
					<ExportButton targetRef={cardRef} />
				</div>
			</div>
		</div>
	);
}
