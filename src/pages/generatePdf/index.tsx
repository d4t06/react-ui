import Button from "@/components/Button";
import { useState } from "react";

export default function GeneratePdfPage() {
	const isOnMobile = "ontouchstart" in window;

	const [isPrinting, setIsPrinting] = useState(false);
	const [error, setError] = useState("");

	const handlePrint = async () => {
		try {
			setIsPrinting(true);

			const content = `<html>
        <head>
          <title>Test PDF</title>
        </head>
        <body>
           // The contents of our PDF will go here...
        </body>
      </html>`;

			const res = await fetch("https://hd-mobile-backend-ts.vercel.app/api/pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content }),
			});

			if (res.ok) {
				const payload = await res.json();

				const base64PDF = payload.data;
				const pdfBytes = new Uint8Array(
					atob(base64PDF)
						.split("")
						.map((char) => char.charCodeAt(0)),
				);
				const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
				const pdfURL = URL.createObjectURL(pdfBlob);

				window.open(pdfURL, isOnMobile ? "_self" : "_blank");

				setIsPrinting(false);
			}
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<>
			<Button loading={isPrinting} onClick={handlePrint}>
				Print <a href="" target="_blank"></a>
			</Button>
			<p>{error}</p>
		</>
	);
}
