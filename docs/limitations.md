# Limitations

## Chrome Incompatibility

**In short**: Google Chrome/Chromium is currently incompatible with the method FineFind uses to determine the position of a search result.

**Detailed technical explanation**:
After FineFind detects that a new result has been found using the selectionchange event, it attempts to determine the position of the result. To achieve this, FineFind utilizes `window.getSelection().getRangeAt(0)`.
This is where the issue arises. Mozilla Firefox treats Find in Page (CTRL+F) results as a standard text selection, which allows `getRangeAt(0)` to return a valid range object. In contrast, Chrome/Chromium's Find in Page implementation uses a pseudo-selection that is not exposed as a normal selection.
As a result, calling `window.getSelection().getRangeAt(0)` in Chrome/Chromium throws an `Uncaught IndexSizeError: Failed to execute 'getRangeAt' on 'Selection': 0 is not a valid index` error.
Due to this behavior, there is currently no way to determine the exact position of a search result in Chrome/Chromium. Consequently, FineFind is unable to display the in-page indicator for search results in these browsers.

## Textarea and Input Limitations

**In short**: FineFind does not work inside `<textarea>` or `<input>` elements in most cases, due to how their content is handled by browsers.

**Detailed technical explanation**:
The text content within a `<textarea>` or `<input>` is not rendered as regular DOM text nodes. Instead, it is part of the element's internal value and not part of the document’s actual DOM structure (at least according to my research). This means that FineFind cannot access the individual characters or their positions using standard DOM methods like `window.getSelection()`.

As a result, FineFind is unable to detect the position of a search result within these elements, preventing it from displaying its indicator.

In some cases, highlighting inside `<input>` fields appears to work. However, this behavior is not consistent and may vary depending on the browser or specific conditions.

For now, FineFind does not support highlighting search results inside `<textarea>` and `<input>` fields reliably. This is a technical limitation inherent to how browsers handle form element content.
