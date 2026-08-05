# UI fonts — Iran Yekan / Iran Sans

Product UI Persian text must use **Iran Yekan** or **Iran Sans** only (licensed files you already own).  
Do **not** commit unpaid font downloads. Do **not** use Geist as the primary UI font.

## Scaffold choice

This repo is scaffolded for **Iran Yekan** as the primary family.  
To use **Iran Sans** instead: drop Iran Sans files with the names below *or* rename paths in `src/app/globals.css` `@font-face` rules.

## Where to put files

```
public/fonts/
  IranYekan-Regular.woff2
  IranYekan-Medium.woff2
  IranYekan-Bold.woff2
  README.md          ← this file
```

Optional extra weights if you have them:

```
  IranYekan-Light.woff2     (300)
  IranYekan-ExtraBold.woff2 (800)
```

### Iran Sans alternative filenames

If you prefer Iran Sans, use these names and update `globals.css` `font-family` / `@font-face` to `IranSans`:

```
  IranSans-Regular.woff2
  IranSans-Medium.woff2
  IranSans-Bold.woff2
```

## Formats

- Prefer **`.woff2`**
- `.woff` or `.ttf` work if you add matching `src:` lines in `globals.css`

## Behavior without files

CSS `@font-face` points at the paths above. If files are missing, the browser **falls back** to system UI fonts — build still works. Add files before sales demos so Persian UI looks correct.

## License

You are responsible for having a valid license for Iran Yekan / Iran Sans on this project.
