import { useEffect } from "react";

const VISIBLE_ROWS = 5;

// Every table on every page shows its header and the first 5 rows; the rest appear when the table is scrolled.
// Row heights differ from page to page, so the height is measured instead of guessed.
// A table can opt out with data-all-rows on the <table>.
export function useFiveRowTables(root) {
  useEffect(() => {
    const container = root.current;
    if (!container) return undefined;
    let frame = 0;

    const fit = () => {
      frame = 0;
      for (const table of container.querySelectorAll("table")) {
        const box = table.parentElement;
        if (!box || table.hasAttribute("data-all-rows")) continue;
        const rows = Array.from(table.tBodies).flatMap((body) => Array.from(body.rows));
        // Loading skeletons and empty/error rows are not data rows.
        const dataRows = rows.filter((row) => !row.matches(".animate-pulse") && !row.querySelector(".animate-pulse") && row.cells.length > 1);
        if (dataRows.length <= VISIBLE_ROWS || table.offsetHeight === 0) {
          if (box.dataset.fiveRows) {
            box.style.maxHeight = "";
            delete box.dataset.fiveRows;
          }
          continue;
        }
        const head = table.tHead ? table.tHead.offsetHeight : 0;
        const body = dataRows.slice(0, VISIBLE_ROWS).reduce((total, row) => total + row.offsetHeight, 0);
        box.style.maxHeight = `${head + body + 2}px`;
        box.style.overflowY = "auto";
        box.style.scrollbarGutter = "stable";
        box.dataset.fiveRows = "1";
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(fit);
    };

    // New rows arrive when a page loads or changes its data; widths change when the window is resized.
    // The observer callback runs before the browser paints, so the height is set without a visible jump.
    const observer = new MutationObserver(fit);
    observer.observe(container, { childList: true, subtree: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [root]);
}
