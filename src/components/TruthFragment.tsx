"use client";

import { useState, useEffect, useCallback } from "react";

const TRUTHS = [
  "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。",
  "悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是我。",
  "世界只由我构成，所以，我才能理解你。",
  "没有必要给死者供花了……",
  "幸福的每一天……每一天都很幸福……我便是生活在这样一个世界上……",
  "下一辆列车是特别快车，开往夏夜大三角。",
  "我们的情人不过是随便借个名字，用幻想吹出来的肥皂泡。",
  "拿去吧，由于不是出自真心，话就说得格外动听。",
  "隐藏的诱惑，一直都存在于人们的身边。",
  "我们的头脑比天空更辽阔。",
  "天空的起始和终焉……终焉和起始的天空……",
  "她即世界的少女……原本就是不应存在于这个世界之中的。",
  "这一切都并非是什么超常现象什么神什么幽灵……全部是你独自一人一手策划的。",
  "人必须有所信才可以向前走下去。",
  "世界就是我所看到的、摸到的，并且感受到的东西。",
  "如果世界就是我，那其他人是什么？",
  "光没办法消除黑暗……因为光，是在黑暗的诱惑之下才出现的。",
  "没有容器，液体便无法装满。",
  "无论在多么黑暗之中，都能看到那束光。",
  "我借由死亡重生为战士……本应该是这样的，好痛。",
  "答案就在这里，并且你是可以得到那个答案，也是可以无视那个答案的存在。",
  "什么都不曾改变，一切都已改变。",
];

export function TruthFragment() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const show = useCallback(() => {
    setQuote(TRUTHS[Math.floor(Math.random() * TRUTHS.length)]);
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") hide(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

  if (!mounted) return null;

  return (
    <>
      <button className="truth-fragment" onClick={show} aria-label="揭示一段真理">
        <span className="truth-fragment-dot" />
      </button>

      {open && (
        <div className="truth-overlay" onClick={hide}>
          <div className="truth-card" onClick={(e) => e.stopPropagation()}>
            <div className="truth-card-mark" aria-hidden="true" />
            <p className="truth-card-text">{quote}</p>
            <button className="truth-card-close" onClick={hide}>
              闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
