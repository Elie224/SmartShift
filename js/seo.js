(function () {
  function ensureMeta(propertyOrName, value, isName) {
    var selector = isName
      ? 'meta[name="' + propertyOrName + '"]'
      : 'meta[property="' + propertyOrName + '"]';
    var meta = document.head.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      if (isName) meta.setAttribute('name', propertyOrName);
      else meta.setAttribute('property', propertyOrName);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', value);
  }

  function ensureLink(rel, href) {
    var selector = 'link[rel="' + rel + '"]';
    var link = document.head.querySelector(selector);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  function getDescription() {
    var meta = document.head.querySelector('meta[name="description"]');
    return meta ? meta.getAttribute('content') || '' : '';
  }

  function getAbsoluteUrl(path) {
    try {
      return new URL(path, window.location.origin).toString();
    } catch (e) {
      return window.location.origin + path;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pageUrl = window.location.origin + window.location.pathname;
    var title = document.title || 'SmartShift';
    var description = getDescription();

    ensureLink('canonical', pageUrl);

    ensureMeta('og:title', title, false);
    if (description) ensureMeta('og:description', description, false);
    ensureMeta('og:type', 'website', false);
    ensureMeta('og:url', pageUrl, false);

    // Image sociale par défaut (peut être remplacée plus tard)
    var socialImage = getAbsoluteUrl('/images/logo.png');
    ensureMeta('og:image', socialImage, false);

    ensureMeta('twitter:card', 'summary_large_image', true);
    ensureMeta('twitter:title', title, true);
    if (description) ensureMeta('twitter:description', description, true);
    ensureMeta('twitter:image', socialImage, true);
  });
})();
