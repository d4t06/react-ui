"use client";
import { useState, useRef } from "react";

const vowelMap: Record<string, string> = {
   aa: "â",
   aw: "ă",
   ee: "ê",
   oo: "ô",
   ow: "ơ",
   uw: "ư",
   dd: "đ",
};

const toneMap: Record<string, string> = {
   s: "́",
   f: "̀",
   r: "̉",
   x: "̃",
   j: "̣",
};

const vowels = "aăâeêioôơuưyAĂÂEÊIOÔƠUƯY";

// Apply tone to correct vowel (simplified rule)
function applyTone(word: string, toneKey: string): string {
   const tone = toneMap[toneKey];
   if (!tone) return word;

   // find last vowel (basic heuristic)
   for (let i = word.length - 1; i >= 0; i--) {
      if (vowels.includes(word[i])) {
         return word.slice(0, i) + word[i] + tone + word.slice(i + 1);
      }
   }
   return word;
}

function applyCasePattern(source: string, target: string): string {
   // ALL CAPS → Â
   if (source === source.toUpperCase()) {
      return target.toUpperCase();
   }

   // Capitalized → Â
   if (source[0] === source[0].toUpperCase()) {
      return target[0].toUpperCase() + target.slice(1);
   }

   // lowercase → â
   return target;
}

function replaceWithCase(word: string, key: string, value: string) {
   const regex = new RegExp(key, "gi");

   return word.replace(regex, (match) => {
      return applyCasePattern(match, value);
   });
}

function hasVowel(word: string): boolean {
   return word.split("").some((c) => vowels.includes(c));
}

function applyTelex(word: string): string {
   let result = word;

   // vowel transforms
   Object.entries(vowelMap).forEach(([key, val]) => {
      result = replaceWithCase(result, key, val);
   });

   // tone handling (FIXED)
   const lastChar = result[result.length - 1];

   if (toneMap[lastChar]) {
      const base = result.slice(0, -1);

      // ✅ only apply tone if base has vowel
      if (base && hasVowel(base)) {
         result = applyTone(base, lastChar);
      } else {
         // ❗ keep the character as normal text
         return result;
      }
   }

   return result.normalize("NFC");
}

export default function TelexInput() {
   const [value, setValue] = useState("");
   const ref = useRef<HTMLTextAreaElement>(null);

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target;
      const cursor = el.selectionStart;

      const text = el.value;

      // Split at cursor
      const beforeCursor = text.slice(0, cursor);
      const afterCursor = text.slice(cursor);

      // Find current word
      const match = beforeCursor.match(/(\S+)$/);
      if (!match) {
         setValue(text);
         return;
      }

      const word = match[0];
      const startIndex = beforeCursor.length - word.length;

      const converted = applyTelex(word);

      const newBefore = beforeCursor.slice(0, startIndex) + converted;

      const newText = newBefore + afterCursor;

      setValue(newText);

      // Restore cursor position (approximate)
      requestAnimationFrame(() => {
         if (ref.current) {
            const newPos = startIndex + converted.length;
            ref.current.setSelectionRange(newPos, newPos);
         }
      });
   };

   return (
      <div style={{ padding: 20 }}>
         <h2>Vietnamese Telex Input</h2>
         <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            rows={5}
            style={{
               width: "100%",
               fontSize: 18,
               padding: 10,
            }}
            placeholder="Type Telex here..."
         />
      </div>
   );
}
