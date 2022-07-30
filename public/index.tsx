import {
  LocationProvider,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from "preact-iso";
import App from "./app";

export function AppWrapper() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </LocationProvider>
  );
}

hydrate(<AppWrapper />);

export async function prerender(data) {
  return await ssr(<AppWrapper {...data} />);
}
