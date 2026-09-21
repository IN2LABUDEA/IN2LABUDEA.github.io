/* In2Lab Academic — main.js */
(function () {

  /* ── Mobile nav toggle ───────────────────────────────────────── */
  var toggle = document.querySelector('.navbar-toggle');
  var nav    = document.querySelector('.navbar-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  /* ── Tag & type filtering ────────────────────────────────────── */

  // Collect all filterable items (have data-tags attribute)
  var allItems = Array.prototype.slice.call(
    document.querySelectorAll('[data-tags]')
  );

  if (allItems.length === 0) return; // no filterable content on this page

  // Active state
  var activeTags = [];   // array of tag-id strings
  var activeType = 'all'; // for publications type filter

  /* ── Helpers ─────────────────────────────────────────────────── */

  function itemTags(el) {
    var raw = el.getAttribute('data-tags') || '';
    return raw ? raw.split(',').map(function(t){ return t.trim(); }) : [];
  }

  function itemVisible(el) {
    var tags  = itemTags(el);
    var type  = el.getAttribute('data-type') || null;

    // Tag match: show if no tags active OR item has at least one active tag
    var tagOk = activeTags.length === 0 ||
      activeTags.some(function(t){ return tags.indexOf(t) !== -1; });

    // Type match: show if 'all' selected or type matches
    var typeOk = activeType === 'all' || type === activeType;

    return tagOk && typeOk;
  }

  function applyFilters() {
    var visible = 0;
    allItems.forEach(function(el) {
      if (itemVisible(el)) {
        el.style.display = '';
        visible++;
      } else {
        el.style.display = 'none';
      }
    });

    // Update count display
    var countEl = document.querySelector('.filter-count');
    if (countEl) {
      var total = allItems.length;
      if (activeTags.length === 0 && activeType === 'all') {
        countEl.textContent = 'Showing all ' + total + ' items';
      } else {
        countEl.textContent = 'Showing ' + visible + ' of ' + total;
      }
    }

    // Show/hide clear button
    var clearBtn = document.getElementById('filter-clear');
    if (clearBtn) {
      clearBtn.style.display =
        (activeTags.length > 0 || activeType !== 'all') ? 'inline-flex' : 'none';
    }

    // Show/hide year-group headings (pub page) — hide group if all children hidden
    document.querySelectorAll('.pub-year-group').forEach(function(group) {
      var kids = Array.prototype.slice.call(group.querySelectorAll('[data-tags]'));
      var anyVisible = kids.some(function(k){ return k.style.display !== 'none'; });
      group.style.display = anyVisible ? '' : 'none';
    });
  }

  /* ── Tag filter buttons ──────────────────────────────────────── */

  document.querySelectorAll('[data-filter-tag]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tag = btn.getAttribute('data-filter-tag');
      var idx = activeTags.indexOf(tag);
      if (idx === -1) {
        activeTags.push(tag);
        btn.classList.add('tag-active');
      } else {
        activeTags.splice(idx, 1);
        btn.classList.remove('tag-active');
      }
      applyFilters();
    });
  });

  /* ── Publication type filter buttons ────────────────────────── */

  document.querySelectorAll('.type-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      activeType = btn.getAttribute('data-type') || 'all';
      document.querySelectorAll('.type-btn').forEach(function(b){
        b.classList.remove('active');
      });
      btn.classList.add('active');
      applyFilters();
    });
  });

  /* ── Clear button ────────────────────────────────────────────── */

  var clearBtn = document.getElementById('filter-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      activeTags = [];
      activeType = 'all';
      document.querySelectorAll('[data-filter-tag]').forEach(function(b){
        b.classList.remove('tag-active');
      });
      document.querySelectorAll('.type-btn').forEach(function(b){
        b.classList.remove('active');
      });
      var allBtn = document.querySelector('.type-btn[data-type="all"]');
      if (allBtn) allBtn.classList.add('active');
      applyFilters();
    });
    // Hide initially
    clearBtn.style.display = 'none';
  }

  // Initial count display
  applyFilters();

})();
