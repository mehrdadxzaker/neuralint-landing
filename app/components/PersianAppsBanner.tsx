export default function PersianAppsBanner() {
  return (
    <aside className="persian-apps-banner" aria-label="Persian keyboards by NeuralInt">
      <div className="persian-banner-intro">
        <span lang="fa" dir="rtl">فارسی، درست و حسابی</span>
        <a href="/persian-keyboards/">Persian keyboards for iPhone &amp; iPad <span aria-hidden="true">↗</span></a>
      </div>
      <nav className="persian-banner-links" aria-label="Persian apps">
        <a href="/apps/persian-swipe/">Persian Swipe <span>Swipe &amp; tap</span></a>
        <a href="/apps/persian-ink/">Persian Ink <span>Apple Pencil · iPad</span></a>
        <a className="persian-language-link" href="/fa/" lang="fa" dir="rtl">راهنمای فارسی ←</a>
      </nav>
    </aside>
  );
}
