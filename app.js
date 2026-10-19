(function () {
	'use strict';

	const NEW_ORIGIN = 'https://javranking.cc';
	const pathname = window.location.pathname || '/';
	const search = window.location.search || '';
	const hash = window.location.hash || '';
	const targetUrl = NEW_ORIGIN + pathname + search + hash;

	const MESSAGES = {
		'zh-hans': {
			noticeBadge: '站点域名迁移公告',
			title: 'JavRanking 已迁至 javranking.cc',
			desc: '为提供更优质稳定的访问服务，原域名 javranking.top 现已全面搬迁至全新主站 javranking.cc。所有排行榜单、影片详情及演职人员数据已完整保留，请点击下方链接访问新站。',
			targetLabel: '目标访问地址',
			primaryBtn: '前往目标页面',
			secondaryBtn: '访问新站首页',
			copyBtn: '复制链接',
			copiedBtn: '✓ 已复制',
			feature1Title: '数据完整继承',
			feature1Desc: '全站精选影片、真实口碑评价、历史榜单及演职人员数据保持实时同步。',
			feature2Title: '全路由无缝映射',
			feature2Desc: '您当前访问的指定作品或榜单页面参数已完整映射，点击即可直达对应页面。',
			feature3Title: '请更新您的书签',
			feature3Desc: '请将您的浏览器收藏夹或快捷方式更新为 javranking.cc，以便日后直接访问。',
			crawlerSectionTitle: '致搜索引擎爬虫与访客的迁移声明 (Search Engine Notice)',
			crawlerProse: '<strong>重要声明：</strong>JavRanking 官方影视排行榜与资料展示站已自 2026 年正式将服务整体迁往新顶级域名 <strong>https://javranking.cc</strong>。原域名 javranking.top 的所有静态页面内容、结构化数据（Schema.org）、OpenGraph 元信息及 Sitemap 索引现已永久归属于 javranking.cc。请各大搜索引擎爬虫追踪新站链接并更新索引权重。',
		},
		'zh-hant': {
			noticeBadge: '站點網域遷移公告',
			title: 'JavRanking 已遷至 javranking.cc',
			desc: '為提供更優質穩定的訪問服務，原網域 javranking.top 現已全面搬遷至全新主站 javranking.cc。所有排行榜單、影片詳情及演職員數據已完整保留，請點擊下方連結訪問新站。',
			targetLabel: '目標訪問地址',
			primaryBtn: '前往目標頁面',
			secondaryBtn: '訪問新站首頁',
			copyBtn: '複製連結',
			copiedBtn: '✓ 已複製',
			feature1Title: '數據完整繼承',
			feature1Desc: '全站精選影片、真實口碑評價、歷史榜單及演職員數據保持即時同步。',
			feature2Title: '全路由無縫映射',
			feature2Desc: '您當前訪問的指定作品或榜單頁面參數已完整映射，點擊即可直達對應頁面。',
			feature3Title: '請更新您的書籤',
			feature3Desc: '請將您的瀏覽器收藏夾或捷徑更新為 javranking.cc，以便日後直接訪問。',
			crawlerSectionTitle: '致搜尋引擎爬蟲與訪客的遷移聲明 (Search Engine Notice)',
			crawlerProse: '<strong>重要聲明：</strong>JavRanking 官方影視排行榜與資料展示站已自 2026 年正式將服務整體遷往新頂級網域 <strong>https://javranking.cc</strong>。原網域 javranking.top 的所有靜態頁面內容、結構化資料（Schema.org）、OpenGraph 中繼資訊及 Sitemap 索引現已永久歸屬於 javranking.cc。請各大搜尋引擎爬蟲追蹤新站連結並更新索引權重。',
		},
		'en': {
			noticeBadge: 'Official Domain Migration Notice',
			title: 'JavRanking Has Moved to javranking.cc',
			desc: 'To provide faster and more reliable service, JavRanking has migrated from javranking.top to our new official home javranking.cc. All ranking charts, movie details, and cast profiles have been completely moved.',
			targetLabel: 'Destination URL',
			primaryBtn: 'Go to Target Page',
			secondaryBtn: 'Visit Homepage',
			copyBtn: 'Copy Link',
			copiedBtn: '✓ Copied',
			feature1Title: '100% Content Preserved',
			feature1Desc: 'All curated rankings, user reviews, all-time charts, and film catalogs remain fully intact.',
			feature2Title: 'Direct URL Mapping',
			feature2Desc: 'Your requested movie or ranking path parameters are preserved for direct manual navigation.',
			feature3Title: 'Please Update Bookmarks',
			feature3Desc: 'Please update your browser bookmarks and shortcuts to javranking.cc for continued access.',
			crawlerSectionTitle: 'Permanent Domain Migration Notice for Search Engines',
			crawlerProse: '<strong>Notice to Web Crawlers & Users:</strong> JavRanking has officially transitioned its web service from javranking.top to <strong>https://javranking.cc</strong>. All canonical URLs, structured metadata (Schema.org), and sitemap indexes now reside under javranking.cc. Search engine crawlers (Googlebot, Bingbot, etc.) are requested to index and attribute rankings to the new domain.',
		}
	};

	// 1. Detect Locale
	function detectLocale() {
		if (pathname.startsWith('/zh-hant') || pathname.startsWith('/zh-tw') || pathname.startsWith('/zh-hk')) {
			return 'zh-hant';
		}
		if (pathname.startsWith('/en')) {
			return 'en';
		}
		if (pathname.startsWith('/zh-hans') || pathname.startsWith('/zh-cn')) {
			return 'zh-hans';
		}

		const langs = navigator.languages || [navigator.language || ''];
		for (const l of langs) {
			const lower = (l || '').toLowerCase();
			if (lower.includes('zh-tw') || lower.includes('zh-hk') || lower.includes('zh-hant')) {
				return 'zh-hant';
			}
			if (lower.startsWith('en')) {
				return 'en';
			}
			if (lower.includes('zh')) {
				return 'zh-hans';
			}
		}
		return 'zh-hans';
	}

	let currentLocale = detectLocale();

	// 2. Bind DOM Anchor Elements (no window.location redirection)
	const elTargetUrl = document.getElementById('target-url');
	const elPrimaryBtn = document.getElementById('btn-primary-action');
	const elSecondaryBtn = document.getElementById('btn-secondary-action');
	const elCopyBtn = document.getElementById('copy-url-btn');
	const elCanonical = document.getElementById('canonical-tag');

	if (elTargetUrl) {
		elTargetUrl.href = targetUrl;
		elTargetUrl.textContent = targetUrl;
	}
	if (elPrimaryBtn) {
		elPrimaryBtn.href = targetUrl;
	}
	if (elSecondaryBtn) {
		elSecondaryBtn.href = NEW_ORIGIN + '/';
	}
	if (elCanonical) {
		elCanonical.href = targetUrl;
	}

	// 3. Render Locale Texts
	function renderLocale(locale) {
		currentLocale = locale;
		document.documentElement.lang = locale === 'zh-hant' ? 'zh-Hant' : (locale === 'en' ? 'en' : 'zh-Hans');
		const t = MESSAGES[locale] || MESSAGES['zh-hans'];

		document.querySelectorAll('[data-i18n]').forEach((node) => {
			const key = node.getAttribute('data-i18n');
			if (t[key]) {
				node.textContent = t[key];
			}
		});

		document.querySelectorAll('[data-i18n-html]').forEach((node) => {
			const key = node.getAttribute('data-i18n-html');
			if (t[key]) {
				node.innerHTML = t[key];
			}
		});

		document.querySelectorAll('.lang-btn').forEach((btn) => {
			if (btn.getAttribute('data-locale') === locale) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});
	}

	// 4. Copy Button Logic
	if (elCopyBtn) {
		elCopyBtn.addEventListener('click', () => {
			const t = MESSAGES[currentLocale] || MESSAGES['zh-hans'];
			navigator.clipboard.writeText(targetUrl).then(() => {
				elCopyBtn.textContent = t.copiedBtn;
				setTimeout(() => {
					elCopyBtn.textContent = t.copyBtn;
				}, 2000);
			}).catch(() => {
				const range = document.createRange();
				range.selectNodeContents(elTargetUrl);
				const sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			});
		});
	}

	// 5. Language Switcher Buttons
	document.querySelectorAll('.lang-btn').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const loc = btn.getAttribute('data-locale');
			if (loc && MESSAGES[loc]) {
				renderLocale(loc);
			}
		});
	});

	// Initialize UI with neutral text and standard <a> links
	renderLocale(currentLocale);

})();
