import Router from "next/router";

export default (context, target) => {
  if (!process.browser && context) {
    // server
    // 303: "See other"
    context.res.writeHead(302, { Location: target });
    context.res.end()
    return;
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
};