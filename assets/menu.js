/* Einziges eigenes Skript der Seite: Menü auf schmalen Bildschirmen auf- und zuklappen.
   Wird von der Startseite und den Unterseiten geladen (kein Fremdserver, keine Cookies). */
(function () {
  var knopf = document.getElementById('menu-knopf');
  var nav = document.getElementById('hauptnav');
  if (!knopf || !nav) return;

  function setzen(offen) {
    knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    knopf.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
    nav.classList.toggle('offen', offen);
  }

  knopf.addEventListener('click', function () {
    setzen(knopf.getAttribute('aria-expanded') !== 'true');
  });

  /* Nach dem Sprung zu einem Abschnitt soll das Menü nicht offen stehen bleiben. */
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setzen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') {
      setzen(false);
      knopf.focus();
    }
  });
})();
