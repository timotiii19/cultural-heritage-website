# Arts page design backup

This is the exact Arts page saved before the cohesive-layout redesign. It includes the photo-number and source-link removals requested before that redesign.

## Switch designs in the browser

Open the Arts page and select **Previous design** in the design options at the top. Select **New design** to return to the simplified layout. Your choice stays selected after reloading the page.

## Restore the original source code

Double-click `Restore-ArtsDesign.cmd` in this folder, or run it from the website's project folder:

```powershell
.\design-backups\arts-before-cohesive\Restore-ArtsDesign.cmd
```

Or restore the single file directly:

```powershell
Copy-Item -LiteralPath .\design-backups\arts-before-cohesive\ArtPage.jsx -Destination .\src\pages\arts\ArtPage.jsx -Force
```

This restores the original `ArtPage.jsx`, including its original design, and removes the browser design switch. It leaves the Home page, References page, shared styles, photos, and research data unchanged. The added comparison component and stylesheet become unused and can remain in place.

The original `arts.css` is also retained here as a reference. The redesign does not modify that stylesheet.
