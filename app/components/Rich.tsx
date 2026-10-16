import { Fragment } from "react";

// Arabic runs (letters, marks and the spaces/punctuation between them).
const AR = /([؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿](?:[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\s\-/،؟]*[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿؟])?)/;

function arabic(text: string, key: string) {
  return text.split(AR).map((part, i) =>
    i % 2 ? (
      <bdi key={`${key}-${i}`} lang="ar" className="ar">
        {part}
      </bdi>
    ) : (
      <Fragment key={`${key}-${i}`}>{part}</Fragment>
    ),
  );
}

/** Prose with **bold** and inline Arabic wrapped for correct direction. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/).map((part, i) =>
        i % 2 ? <strong key={i}>{arabic(part, `b${i}`)}</strong> : <Fragment key={i}>{arabic(part, `t${i}`)}</Fragment>,
      )}
    </>
  );
}
