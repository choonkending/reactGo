import { GOOGLE_ANALYTICS_ID } from '../../../../config/env';
import assets from '../../../../public/assets/manifest.json';

export const createHeadScripts = () => (
  `
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${GOOGLE_ANALYTICS_ID}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
  `
);

export const createAppScripts = () => (
  `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`
);

