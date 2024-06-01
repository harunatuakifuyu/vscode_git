import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useFetcher } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: `${isDarkMode ? "dark" : ""}`, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "bg-gray-200 text-slate-900 dark:bg-slate-800 text-black dark:text-slate-400", children: [
      /* @__PURE__ */ jsx("button", { id: "darkModeToggle", "aria-pressed": "true", className: "text-gray-600 dark:text-slate-400", onClick: handleClick, children: "ダークモード切替" }),
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "w-40 h-full fixed top-50 left-0  dark:bg-slate-800", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "H-N-A-F4" }) }),
      /* @__PURE__ */ jsxs("ul", { className: "nav-links", children: [
        /* @__PURE__ */ jsx("li", { className: "p-1 dark:hover:bg-gray-700", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "ホーム" }) }),
        /* @__PURE__ */ jsx("li", { className: "p-1 dark:hover:bg-gray-700", children: /* @__PURE__ */ jsx(Link, { to: "/network", children: "ネットワーク" }) }),
        /* @__PURE__ */ jsx("li", { className: "p-1 dark:hover:bg-gray-700", children: /* @__PURE__ */ jsx(Link, { to: "/program", children: "プログラム" }) }),
        /* @__PURE__ */ jsx("li", { className: "p-1 dark:hover:bg-gray-700", children: /* @__PURE__ */ jsx(Link, { to: "/scrap", children: "記事" }) }),
        /* @__PURE__ */ jsx("li", { className: "p-1 dark:hover:bg-gray-700", children: /* @__PURE__ */ jsx(Link, { to: "/book", children: "本" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Index$1() {
  return /* @__PURE__ */ jsx("div", { className: "pl-40", children: /* @__PURE__ */ jsx("h1", { children: "TEST" }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const supabaseUrl = "https://qdkajxkyhbghycbagcrd.supabase.co";
const supabaseAnonKey = "API_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
async function action({ request }) {
  const body = new URLSearchParams(await request.formData());
  const star1 = body.get("star1");
  const star2 = body.get("star2");
  const star3 = body.get("star3");
  const id = body.get("id");
  console.log("star3", typeof star3);
  const stars = {};
  if (star3 === "true") {
    console.log("if文", "1");
    stars["star1"] = 0;
    stars["star2"] = 0;
    stars["star3"] = 0;
  } else if (star2 === "true") {
    console.log("if文", "2");
    stars["star3"] = 1;
  } else if (star1 === "true") {
    console.log("if文", "3");
    stars["star2"] = 1;
  } else {
    console.log("if文", "4");
    stars["star1"] = 1;
  }
  await supabase.from("book").update(stars).eq("id", id);
  return {};
}
async function loader() {
  const { data, error } = await supabase.from("book").select("*").order("id");
  if (error) {
    throw error;
  }
  return {
    records: data
  };
}
function Index() {
  const { records } = useLoaderData();
  const fetcher = useFetcher();
  function handleClick(value) {
    console.log("value.star3", typeof value.star3);
    const formData = new FormData();
    formData.append("star1", value.star1);
    formData.append("star2", value.star2);
    formData.append("star3", value.star3);
    formData.append("id", value.id);
    console.log("formData", typeof formData.get("star3"));
    fetcher.submit(formData, { action: ".", method: "post" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pl-40", children: [
    /* @__PURE__ */ jsx("h1", { children: "技術書" }),
    /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-5 gap-4", children: records.map(
      (record, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { className: "bookimg", src: record.picurl, alt: "book cover" }),
        /* @__PURE__ */ jsx("button", { name: `${index}star1`, children: record.star1 ? "★" : "☆" }),
        /* @__PURE__ */ jsx("button", { name: `${index}star2`, children: record.star2 ? "★" : "☆" }),
        /* @__PURE__ */ jsx("button", { name: `${index}star3`, children: record.star3 ? "★" : "☆" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          handleClick(record);
        }, children: "+" })
      ] })
    ) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BuiRzO_W.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-DD0otnDp.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CQNehi_T.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-DD0otnDp.js"], "css": [] }, "routes/network": { "id": "routes/network", "parentId": "root", "path": "network", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/network-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/program": { "id": "routes/program", "parentId": "root", "path": "program", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/program-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-QSEezOvY.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": ["/assets/index-7xE_XzXK.css"] }, "routes/scrap": { "id": "routes/scrap", "parentId": "root", "path": "scrap", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/scrap-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/book": { "id": "routes/book", "parentId": "root", "path": "book", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/book-ClJM3E4H.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-DD0otnDp.js"], "css": ["/assets/index-7xE_XzXK.css"] } }, "url": "/assets/manifest-5ee77c61.js", "version": "5ee77c61" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/network": {
    id: "routes/network",
    parentId: "root",
    path: "network",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/program": {
    id: "routes/program",
    parentId: "root",
    path: "program",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/scrap": {
    id: "routes/scrap",
    parentId: "root",
    path: "scrap",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/book": {
    id: "routes/book",
    parentId: "root",
    path: "book",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
