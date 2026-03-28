import { toPng } from "html-to-image";
import type { RefObject } from "react";

interface Props {
	targetRef: RefObject<HTMLDivElement | null>;
}

export function ExportButton({ targetRef }: Props) {
	const handleExport = async () => {
		if (!targetRef.current) return;

		const dataUrl = await toPng(targetRef.current, {
			pixelRatio: 2,
		});

		const link = document.createElement("a");
		link.download = "profile-card.png";
		link.href = dataUrl;
		link.click();
	};

	return (
		<button
			type="button"
			onClick={handleExport}
			className="rounded-xl bg-pink-400 px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-pink-500"
		>
			PNGでダウンロード
		</button>
	);
}
