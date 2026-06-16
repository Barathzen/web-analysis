# Visitor Data Collection Methods

This demo site shows three common ways to collect information about visitors:

| Method | Where the data is stored | Typical data captured | How to view the data |
|--------|--------------------------|----------------------|----------------------|
| **Web server log files** (Express + Morgan) | Files on the server (`logs/access.log` and `logs/tracking.log`) | Timestamp, IP address, HTTP method, URL, response status, referrer, user‑agent, any custom JSON payload sent to `/api/track` | Open the log files directly on the server or request them via the `/logs` endpoint. |
| **Google Analytics page tagging** | Google Analytics cloud service (accessible from the GA UI) | Page views, sessions, geographic location, device type, browser, acquisition source, custom events (e.g., the button click in the demo) | Log in to the GA property (replace `G-XXXXXXXXXX` with your Measurement ID) and view the **Realtime** and **Events** reports. |
| **Browser developer tools** | In the visitor’s own browser (Network tab, Console, Performance tab) | Full request/response headers, payloads, timing information, JavaScript errors, cookies, local storage values | Open the DevTools (F12), go to the **Network** tab and reload the page. Click the request to `/api/track` to see the JSON body that was sent. |

## What each method tells you

* **Server logs** give you a reliable, low‑level view of every HTTP request that reaches your server. They are useful for security audits, debugging, and building your own analytics pipeline.
* **Google Analytics** provides high‑level, aggregated insights without you having to store any data yourself. It automatically enriches the data with geographic and device information and lets you create custom dashboards.
* **Developer tools** let you inspect the exact data that the browser is sending and receiving at runtime. This is handy for debugging client‑side code and verifying that your tracking payloads are correct.

## Quick checklist for the demo

1. **Start the server** – `npm install && npm start`.
2. Open `http://localhost:3000` in a browser.
3. Click **Send Custom Event to Server** – this triggers a POST to `/api/track` which is logged in `logs/tracking.log`.
4. Open the **Network** tab in DevTools and locate the `track` request to see the JSON payload.
5. If you have a real GA Measurement ID, replace `G-XXXXXXXXXX` in `public/index.html` and view the event in the GA dashboard.

---

*All three methods complement each other – server logs give you raw data, GA gives you aggregated analytics, and DevTools let you verify the client‑side implementation.*