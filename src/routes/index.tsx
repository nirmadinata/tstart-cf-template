import { createFileRoute } from "@tanstack/react-router";
import { createStandardSchemaV1, parseAsInteger, useQueryStates } from "nuqs";

const searchParams = {
	count: parseAsInteger.withDefault(0),
};

export const Route = createFileRoute("/")({
	component: App,
	validateSearch: createStandardSchemaV1(searchParams, {
		partialOutput: true,
	}),
	ssr: true,
});

function App() {
	const [{ count }, setState] = useQueryStates(searchParams);

	return (
		<div className="min-h-screen">
			<p>Test Landing Page</p>
			<button onClick={() => setState({ count: count + 1 })} type="button">
				Increment {count}
			</button>
		</div>
	);
}
