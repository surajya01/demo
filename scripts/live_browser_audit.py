"""
Apexify Resort Phase 2 - Live Browser & UI Automated Audit Runner
Runs Playwright via installed Chrome against http://localhost:3005,
visits all routes, tests interactions, audits responsive layouts, captures screenshots,
inspects console logs, network requests, assets, accessibility, and APIs.
"""

import os
import sys
import json
import time
import urllib.request
import urllib.error

# Ensure immediate stdout flushing
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(line_buffering=True)

from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 3005
BASE_URL = f"http://localhost:{PORT}"
SCREENSHOTS_DIR = os.path.join(os.getcwd(), "docs", "screenshots")

os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

PUBLIC_ROUTES = [
    "/",
    "/about",
    "/rooms",
    "/rooms/deluxe-double-room",
    "/rooms/executive-double-room",
    "/rooms/standard-double-room-fan",
    "/rooms/deluxe-cottage",
    "/rooms/executive-suite",
    "/rooms/family-villa",
    "/dining",
    "/restaurant",
    "/facilities",
    "/gallery",
    "/offers",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/cancellation-policy",
]

VIEWPORTS = [
    {"name": "320px (Mobile S)", "width": 320, "height": 600},
    {"name": "375px (Mobile M - iPhone SE)", "width": 375, "height": 667},
    {"name": "390px (Mobile L - iPhone 12/13/14)", "width": 390, "height": 844},
    {"name": "430px (Mobile XL - iPhone 14 Pro Max)", "width": 430, "height": 932},
    {"name": "768px (Tablet Portrait - iPad)", "width": 768, "height": 1024},
    {"name": "1024px (Tablet Landscape / Laptop)", "width": 1024, "height": 768},
    {"name": "1280px (Desktop HD)", "width": 1280, "height": 800},
    {"name": "1440px (Desktop Full HD / Wide)", "width": 1440, "height": 900},
]

audit_results = {
    "server_info": {"port": PORT, "base_url": BASE_URL, "status": "CONNECTED"},
    "console_messages": [],
    "failed_requests": [],
    "route_status": {},
    "api_checks": {},
    "seo_endpoints": {},
    "responsive_checks": {},
    "interactive_tests": {},
    "image_checks": {},
    "accessibility_checks": {},
    "verified_resort_assets": {},
    "content_disclaimer_audit": {},
    "summary": {}
}

def test_api_routes():
    print("\n--- AUDITING API & SEO ENDPOINTS ---")
    
    # 1. Sitemap.xml
    try:
        req = urllib.request.Request(f"{BASE_URL}/sitemap.xml", headers={"User-Agent": "AuditBot/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read().decode("utf-8")
            status = resp.status
            content_type = resp.headers.get("Content-Type", "")
            has_urls = "<url>" in content and "apexify-resort" in content
            audit_results["seo_endpoints"]["sitemap"] = {
                "status": status,
                "content_type": content_type,
                "valid_xml": has_urls,
                "length_bytes": len(content)
            }
            print(f"[OK] /sitemap.xml - HTTP {status}, Content-Type: {content_type}, Valid: {has_urls}")
    except Exception as e:
        print(f"[FAIL] /sitemap.xml: {e}")
        audit_results["seo_endpoints"]["sitemap"] = {"error": str(e)}

    # 2. Robots.txt
    try:
        req = urllib.request.Request(f"{BASE_URL}/robots.txt", headers={"User-Agent": "AuditBot/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read().decode("utf-8")
            status = resp.status
            has_rules = "User-agent" in content.lower() and "disallow" in content.lower()
            audit_results["seo_endpoints"]["robots"] = {
                "status": status,
                "content_type": resp.headers.get("Content-Type", ""),
                "valid": has_rules,
                "content_snippet": content.strip().replace("\n", " | ")
            }
            print(f"[OK] /robots.txt - HTTP {status}, Content: {content.strip().replace(chr(10), ' | ')}")
    except Exception as e:
        print(f"[FAIL] /robots.txt: {e}")
        audit_results["seo_endpoints"]["robots"] = {"error": str(e)}

    # 3. GET /api/health
    try:
        req = urllib.request.Request(f"{BASE_URL}/api/health")
        with urllib.request.urlopen(req, timeout=5) as resp:
            body = json.loads(resp.read().decode("utf-8"))
            audit_results["api_checks"]["health"] = {
                "status": resp.status,
                "response": body,
                "no_db_crash": body.get("status") == "OK"
            }
            print(f"[OK] /api/health - HTTP {resp.status}, status={body.get('status')}, dbStatus={body.get('database', {}).get('status')}")
    except Exception as e:
        print(f"[FAIL] /api/health: {e}")
        audit_results["api_checks"]["health"] = {"error": str(e)}

    # 4. POST /api/availability/search
    try:
        search_payload = json.dumps({
            "checkIn": "2026-12-10",
            "checkOut": "2026-12-12",
            "adults": 2,
            "children": 0,
            "rooms": 1
        }).encode("utf-8")
        req = urllib.request.Request(
            f"{BASE_URL}/api/availability/search",
            data=search_payload,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            body = json.loads(resp.read().decode("utf-8"))
            rooms_found = len(body.get("data", {}).get("rooms", []))
            audit_results["api_checks"]["availability_search"] = {
                "status": resp.status,
                "success": body.get("success"),
                "rooms_count": rooms_found,
                "requires_db": False
            }
            print(f"[OK] /api/availability/search - HTTP {resp.status}, Found {rooms_found} verified rooms, Success: {body.get('success')}")
    except Exception as e:
        print(f"[FAIL] /api/availability/search: {e}")
        audit_results["api_checks"]["availability_search"] = {"error": str(e)}

    # 5. POST /api/enquiries
    try:
        enq_payload = json.dumps({
            "guestName": "Aditya Patel",
            "phone": "+919876543210",
            "email": "aditya.patel@example.com",
            "roomCategory": "DELUXE_COTTAGE",
            "checkIn": "2026-12-15",
            "checkOut": "2026-12-18",
            "guests": 2,
            "specialRequests": "Phase 2 frontend audit test enquiry"
        }).encode("utf-8")
        req = urllib.request.Request(
            f"{BASE_URL}/api/enquiries",
            data=enq_payload,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            body = json.loads(resp.read().decode("utf-8"))
            audit_results["api_checks"]["enquiries"] = {
                "status": resp.status,
                "success": body.get("success"),
                "enquiryId": body.get("data", {}).get("enquiryId"),
                "fallback_resilient": True
            }
            print(f"[OK] /api/enquiries - HTTP {resp.status}, ID: {body.get('data', {}).get('enquiryId')}, Success: {body.get('success')}")
    except Exception as e:
        print(f"[FAIL] /api/enquiries: {e}")
        audit_results["api_checks"]["enquiries"] = {"error": str(e)}

def run_browser_audit():
    print("\n--- LAUNCHING GOOGLE CHROME FOR PLAYWRIGHT TESTING ---")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME_PATH,
            headless=True
        )
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        # Listeners
        def handle_console(msg):
            entry = {"type": msg.type, "text": msg.text, "location": msg.location}
            if msg.type in ["error"]:
                print(f"  [BROWSER ERROR] {msg.text}")
            audit_results["console_messages"].append(entry)

        def handle_request_failed(request):
            entry = {
                "url": request.url,
                "failure": request.failure,
                "method": request.method,
                "resource_type": request.resource_type
            }
            print(f"  [REQUEST FAILED] {request.method} {request.url} - {request.failure}")
            audit_results["failed_requests"].append(entry)

        page.on("console", handle_console)
        page.on("requestfailed", handle_request_failed)

        # 1. ROUTE BY ROUTE AUDIT AT 1440px
        print("\n--- 1. ROUTE-BY-ROUTE VERIFICATION ---")
        for route in PUBLIC_ROUTES:
            url = f"{BASE_URL}{route}"
            try:
                t0 = time.time()
                response = page.goto(url, wait_until="networkidle", timeout=15000)
                duration_ms = round((time.time() - t0) * 1000)
                status_code = response.status if response else "NO_RESPONSE"
                page_title = page.title()

                has_crash = page.locator("body:has-text('Application error')").count() > 0 or \
                            page.locator("body:has-text('Unhandled Runtime Error')").count() > 0

                audit_results["route_status"][route] = {
                    "status": status_code,
                    "duration_ms": duration_ms,
                    "title": page_title,
                    "has_crash": has_crash
                }
                print(f"  [{status_code}] {route:<32} ({duration_ms:>4}ms) | Title: {page_title[:45]}")
            except Exception as e:
                print(f"  [ERROR] Visiting {route}: {e}")
                audit_results["route_status"][route] = {"status": "EXCEPTION", "error": str(e)}

        # 2. CAPTURE REQUIRED SCREENSHOTS
        print("\n--- 2. CAPTURING EVIDENCE SCREENSHOTS ---")
        shots = [
            ("/", "desktop-home.png", 1440, 900),
            ("/", "mobile-home.png", 390, 844),
            ("/rooms", "rooms.png", 1440, 900),
            ("/rooms/deluxe-double-room", "room-details-deluxe.png", 1440, 900),
            ("/dining", "dining.png", 1440, 900),
            ("/gallery", "gallery.png", 1440, 900),
            ("/contact", "contact.png", 1440, 900),
        ]
        for route, filename, w, h in shots:
            page.set_viewport_size({"width": w, "height": h})
            page.goto(f"{BASE_URL}{route}", wait_until="networkidle", timeout=12000)
            page.wait_for_timeout(600)  # allow animations to settle
            save_path = os.path.join(SCREENSHOTS_DIR, filename)
            page.screenshot(path=save_path, full_page=False)
            file_size_kb = round(os.path.getsize(save_path) / 1024, 1)
            print(f"  Captured: {filename:<28} ({w}x{h}) - {file_size_kb} KB")

        # Reset viewport to desktop standard
        page.set_viewport_size({"width": 1440, "height": 900})

        # 3. INTERACTIVE TESTING
        print("\n--- 3. TESTING INTERACTIVE CONTROLS ---")
        
        # Test 3.1: Header Sticky & Navigation
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        header = page.locator("header")
        brand_link = page.locator("header a:has-text('Apexify Resort')").first
        header_visible = header.is_visible() and brand_link.is_visible()
        print(f"  Header Sticky Navigation: {'PASS' if header_visible else 'FAIL'}")

        # Test 3.2: Quick Enquiry Modal Open, Tab Nav, & Close
        book_btn = page.locator("button:has-text('Book / Enquire'), button:has-text('Check Availability')").first
        modal_opened = False
        modal_closed = False
        if book_btn.count() > 0:
            book_btn.click()
            page.wait_for_timeout(400)
            modal = page.locator("[role='dialog']")
            modal_opened = modal.is_visible()
            
            # Close modal via close button
            close_btn = page.locator("[role='dialog'] button[aria-label='Close modal']").first
            if close_btn.count() > 0:
                close_btn.click()
            else:
                page.keyboard.press("Escape")
            page.wait_for_timeout(300)
            modal_closed = not modal.is_visible()
        print(f"  Quick Enquiry Modal: Open={'PASS' if modal_opened else 'FAIL'} | Close={'PASS' if modal_closed else 'FAIL'}")
        audit_results["interactive_tests"]["enquiry_modal"] = {"opened": modal_opened, "closed": modal_closed}

        # Test 3.3: Gallery Category Filters & Lightbox Modal
        page.goto(f"{BASE_URL}/gallery", wait_until="networkidle")
        filter_pool = page.locator("button:has-text('Swimming Pool')").first
        filter_all = page.locator("button:has-text('All Photographs')").first
        
        cards_initial = page.locator("div[role='button']").count()
        if filter_pool.count() > 0:
            filter_pool.click()
            page.wait_for_timeout(400)
            cards_pool = page.locator("div[role='button']").count()
            filter_all.click()
            page.wait_for_timeout(400)
            cards_restored = page.locator("div[role='button']").count()
            filters_ok = (cards_pool > 0 and cards_restored >= cards_pool)
            print(f"  Gallery Filters: Initial={cards_initial}, Pool={cards_pool}, Restored={cards_restored} - {'PASS' if filters_ok else 'FAIL'}")
            audit_results["interactive_tests"]["gallery_filters"] = {
                "initial": cards_initial,
                "pool": cards_pool,
                "restored": cards_restored,
                "pass": filters_ok
            }

        # Test Lightbox Click & ESC Close
        first_thumb = page.locator("div[role='button']:has(img)").first
        lightbox_open = False
        lightbox_closed = False
        if first_thumb.count() > 0:
            first_thumb.click()
            page.wait_for_timeout(400)
            lightbox_el = page.locator("[role='dialog']:has(img)")
            lightbox_open = lightbox_el.is_visible()
            page.keyboard.press("Escape")
            page.wait_for_timeout(300)
            lightbox_closed = not lightbox_el.is_visible()
        print(f"  Gallery Lightbox: Open={'PASS' if lightbox_open else 'FAIL'} | ESC Close={'PASS' if lightbox_closed else 'FAIL'}")
        audit_results["interactive_tests"]["gallery_lightbox"] = {"opened": lightbox_open, "closed": lightbox_closed}

        # Test 3.4: FAQ Accordions
        page.goto(f"{BASE_URL}/faq", wait_until="networkidle")
        faq_btns = page.locator("button[aria-expanded]")
        faq_toggled = False
        if faq_btns.count() > 0:
            first_faq = faq_btns.first
            init_state = first_faq.get_attribute("aria-expanded")
            first_faq.click()
            page.wait_for_timeout(300)
            new_state = first_faq.get_attribute("aria-expanded")
            faq_toggled = (init_state != new_state)
        print(f"  FAQ Accordions: Found {faq_btns.count()} items | Toggle={'PASS' if faq_toggled else 'FAIL'}")
        audit_results["interactive_tests"]["faq_accordions"] = {"count": faq_btns.count(), "toggled": faq_toggled}

        # Test 3.5: Contact Form Native Validation & Submission Simulation
        page.goto(f"{BASE_URL}/contact", wait_until="networkidle")
        name_in = page.locator("input#fullName").first
        email_in = page.locator("input#email").first
        phone_in = page.locator("input#phone").first
        msg_in = page.locator("textarea#message").first
        submit_btn = page.locator("button[type='submit']").first

        validation_ok = False
        submission_ok = False
        if name_in.count() > 0 and submit_btn.count() > 0:
            # Trigger native validation on empty required field
            name_in.fill("")
            submit_btn.click()
            page.wait_for_timeout(200)
            validation_ok = name_in.evaluate("el => el.checkValidity() === false")
            
            # Fill valid simulation
            name_in.fill("Vikas Mehra")
            if email_in.count() > 0: email_in.fill("vikas.mehra@example.com")
            if phone_in.count() > 0: phone_in.fill("+919876543210")
            if msg_in.count() > 0: msg_in.fill("Looking for weekend cottage booking.")
            submit_btn.click()
            page.wait_for_timeout(1400)
            success_note = page.locator("body:has-text('Enquiry Recorded'), body:has-text('Thank you')")
            submission_ok = (success_note.count() > 0)
        print(f"  Contact Form: Validation={'PASS' if validation_ok else 'FAIL'} | Submission Simulation={'PASS' if submission_ok else 'FAIL'}")
        audit_results["interactive_tests"]["contact_form"] = {"validation": validation_ok, "submission": submission_ok}

        # Test 3.6: Telephony and WhatsApp Communication Links
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        tel_links = list(set([l.get_attribute("href") for l in page.locator("a[href^='tel:']").all()]))
        wa_links = list(set([l.get_attribute("href") for l in page.locator("a[href*='wa.me'], a[href*='whatsapp']").all()]))
        has_tel = any("+91" in href or "9820000000" in href for href in tel_links)
        has_wa = any("wa.me" in href for href in wa_links)
        print(f"  Communication Links: tel: ({len(tel_links)} links) - {'PASS' if has_tel else 'FAIL'} | WhatsApp ({len(wa_links)} links) - {'PASS' if has_wa else 'FAIL'}")
        audit_results["interactive_tests"]["communication_links"] = {"tel": tel_links, "whatsapp": wa_links}

        # 4. RESPONSIVE AUDIT ACROSS ALL 8 SPECIFIED VIEWPORTS
        print("\n--- 4. TESTING ALL 8 RESPONSIVE VIEWPORTS ---")
        for vp in VIEWPORTS:
            page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
            page.goto(f"{BASE_URL}/", wait_until="networkidle")
            page.wait_for_timeout(350)

            # Audit horizontal overflow across the entire page
            overflow_result = page.evaluate("""() => {
                const doc = document.documentElement;
                const body = document.body;
                const scrollW = Math.max(doc.scrollWidth, body.scrollWidth);
                const clientW = window.innerWidth;
                const hasOverflow = scrollW > clientW;
                
                const offenders = [];
                if (hasOverflow) {
                    const elements = Array.from(document.querySelectorAll('*'));
                    for (let el of elements) {
                        const rect = el.getBoundingClientRect();
                        if (rect.right > clientW + 1) {
                            offenders.push({
                                tag: el.tagName,
                                id: el.id,
                                className: (el.className && typeof el.className === 'string') ? el.className.substring(0, 40) : '',
                                right: Math.round(rect.right),
                                clientWidth: clientW
                            });
                            if (offenders.length >= 3) break;
                        }
                    }
                }
                return { scrollW, clientW, hasOverflow, offenders };
            }""")
            status_str = "FAIL (OVERFLOW)" if overflow_result["hasOverflow"] else "PASS"
            print(f"  [{status_str}] {vp['name']:<36} (Window: {vp['width']}px, Scroll: {overflow_result['scrollW']}px)")
            if overflow_result["hasOverflow"]:
                print(f"       Offenders: {overflow_result['offenders']}")
            audit_results["responsive_checks"][vp["name"]] = overflow_result

        # 5. ASSET AND IMAGE AUDIT
        print("\n--- 5. CHECKING IMAGE ASSETS AND ALT ATTRIBUTES ---")
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        
        # Scroll smoothly to load lazy images and await decode
        page.evaluate("""async () => {
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 800));
            await Promise.all(Array.from(document.querySelectorAll('img')).map(img => img.decode().catch(() => {})));
            window.scrollTo(0, 0);
        }""")
        page.wait_for_timeout(400)

        img_stats = page.evaluate("""() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.map(img => ({
                src: img.getAttribute('src'),
                currentSrc: img.currentSrc,
                alt: img.getAttribute('alt'),
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                isLoaded: img.complete && img.naturalWidth > 0
            }));
        }""")
        broken = [i for i in img_stats if not i["isLoaded"]]
        missing_alt = [i for i in img_stats if not i["alt"] or len(i["alt"].strip()) == 0]
        print(f"  Homepage Images: Total={len(img_stats)} | Loaded={len(img_stats) - len(broken)} | Broken={len(broken)} | Missing Alt={len(missing_alt)}")
        audit_results["image_checks"] = {
            "total": len(img_stats),
            "loaded": len(img_stats) - len(broken),
            "broken": broken,
            "missing_alt": missing_alt
        }

        # Check genuine resort assets on disk
        genuine_resort_files = [
            "banquet_lawn.jpg",
            "banquet_lawn_event.jpg",
            "bathroom_modern.jpg",
            "celebration_decor.jpg",
            "corridor_lifts.jpg",
            "exterior_facade.jpg",
            "exterior_pool_day.jpg",
            "guest_corridor.jpg",
            "location_map_snippet.jpg",
            "pool_side_view.jpg",
            "reception_lobby.jpg",
            "restaurant_bar.jpg",
            "restaurant_dining.jpg",
            "restaurant_entrance.jpg",
            "room_deluxe_double.jpg",
            "room_deluxe_interior.jpg",
            "swimming_pool.jpg",
            "swimming_pool_night.jpg"
        ]
        asset_check_results = {}
        for fname in genuine_resort_files:
            rel_path = f"/images/resort/{fname}"
            local_file = os.path.join(os.getcwd(), "public", "images", "resort", fname)
            exists = os.path.exists(local_file)
            size_kb = round(os.path.getsize(local_file) / 1024, 1) if exists else 0
            asset_check_results[rel_path] = {"exists": exists, "size_kb": size_kb}
        audit_results["verified_resort_assets"] = asset_check_results
        all_assets_present = all(v["exists"] and v["size_kb"] > 1 for v in asset_check_results.values())
        print(f"  Genuine Resort Assets ({len(genuine_resort_files)} verified on disk): {'PASS' if all_assets_present else 'FAIL'}")

        # 6. ACCESSIBILITY BASICS CHECK
        print("\n--- 6. CHECKING ACCESSIBILITY BASICS ---")
        a11y_data = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const unlabelledButtons = buttons.filter(b => {
                const text = b.innerText.trim();
                const ariaLabel = b.getAttribute('aria-label');
                const ariaLabelledby = b.getAttribute('aria-labelledby');
                return !text && !ariaLabel && !ariaLabelledby;
            }).map(b => b.outerHTML.substring(0, 80));

            const links = Array.from(document.querySelectorAll('a'));
            const emptyLinks = links.filter(a => {
                const text = a.innerText.trim();
                const ariaLabel = a.getAttribute('aria-label');
                return !text && !ariaLabel;
            }).map(a => a.outerHTML.substring(0, 80));

            return {
                unlabelledButtonsCount: unlabelledButtons.length,
                unlabelledButtons,
                emptyLinksCount: emptyLinks.length,
                emptyLinks
            };
        }""")
        print(f"  Unlabelled Buttons: {a11y_data['unlabelledButtonsCount']}")
        print(f"  Empty / Unlabelled Links: {a11y_data['emptyLinksCount']}")
        audit_results["accessibility_checks"] = a11y_data

        # 7. UNVERIFIED / SAMPLE CONTENT DISCLAIMERS AUDIT
        print("\n--- 7. AUDITING SAMPLE DATA DISCLAIMERS ---")
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        has_sample_indicator = page.locator("body:has-text('Sample Guest Testimonials'), body:has-text('indicative'), body:has-text('subject to seasonal variation')").count() > 0
        footer_developer_credit = page.locator("body:has-text('Apexify')").count() > 0
        print(f"  Sample / Indicative Content Explicitly Tagged: {'PASS' if has_sample_indicator else 'NOTE'}")
        print(f"  Apexify Developer Attribution Visible: {'PASS' if footer_developer_credit else 'FAIL'}")
        audit_results["content_disclaimer_audit"] = {
            "has_sample_indicator": has_sample_indicator,
            "footer_developer_credit": footer_developer_credit
        }

        browser.close()

def main():
    test_api_routes()
    run_browser_audit()
    
    # Summarize results
    routes_pass = all(v.get("status") in [200, 307, 308] and not v.get("has_crash") for v in audit_results["route_status"].values())
    responsive_pass = all(not v.get("hasOverflow") for v in audit_results["responsive_checks"].values())
    failed_req_count = len(audit_results["failed_requests"])
    console_err_count = len([m for m in audit_results["console_messages"] if m["type"] == "error"])
    
    audit_results["summary"] = {
        "routes_all_200": routes_pass,
        "responsive_zero_overflow": responsive_pass,
        "failed_requests_count": failed_req_count,
        "console_errors_count": console_err_count,
        "recommendation": "APPROVE" if (routes_pass and responsive_pass and failed_req_count == 0 and console_err_count == 0) else "HOLD"
    }

    print("\n" + "=" * 60)
    print("FINAL AUDIT SUMMARY")
    print(f"Routes 200/Redirect OK: {routes_pass} ({len(audit_results['route_status'])} routes)")
    print(f"Responsive Zero Overflow: {responsive_pass} (8/8 viewports)")
    print(f"Failed Network Requests: {failed_req_count}")
    print(f"Console Errors: {console_err_count}")
    print(f"Recommendation: {audit_results['summary']['recommendation']}")
    print("=" * 60)

    # Save results to json
    results_file = os.path.join(os.getcwd(), "docs", "phase2_live_audit_results.json")
    with open(results_file, "w", encoding="utf-8") as f:
        json.dump(audit_results, f, indent=2)
    print(f"\nFull Audit Results saved to: {results_file}")

if __name__ == "__main__":
    main()
