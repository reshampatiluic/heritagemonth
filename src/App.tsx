import { useRef, useState, useEffect } from "react";
import "./App.css";
import cat1 from "./assets/cat1.gif";
import cat2 from "./assets/cat2.gif";
import cat3 from "./assets/cat3.gif";

function App() {
  const [step, setStep] = useState(1);
  const [noPos, setNoPos] = useState<{ top: string; left: string }>({
    top: "0px",
    left: "0px",
  });

  const yesRef = useRef<HTMLButtonElement | null>(null);
  const noRef = useRef<HTMLButtonElement | null>(null);

  // 🟢 When Screen 2 loads, place "No" button right next to "Yes"
  useEffect(() => {
    if (step === 2 && yesRef.current && noRef.current) {
      const yesRect = yesRef.current.getBoundingClientRect();

      // compute offset relative to viewport
      const startTop = yesRect.top + window.scrollY;
      const startLeft = yesRect.right + 20; // 20px gap on right

      setNoPos({
        top: `${startTop}px`,
        left: `${startLeft}px`,
      });
    }
  }, [step]);

  // 💨 Move "No" button to a random visible position on hover
  const moveNo = () => {
    const btn = noRef.current;
    const btnW = btn?.offsetWidth ?? 100;
    const btnH = btn?.offsetHeight ?? 40;
    const margin = 20;

    const maxTop = Math.max(window.innerHeight - btnH - margin, margin);
    const maxLeft = Math.max(window.innerWidth - btnW - margin, margin);

    const newTop = Math.random() * (maxTop - margin) + margin;
    const newLeft = Math.random() * (maxLeft - margin) + margin;

    setNoPos({
      top: `${Math.round(newTop)}px`,
      left: `${Math.round(newLeft)}px`,
    });
  };

  return (
    <div className="app">
      {/* --- Screen 1 --- */}
      {step === 1 && (
        <div className="screen slide-in">
          <div className="message">
            <p>
              Hi Daniel! <br />
              Happy Hispanic Heritage Month!! <br />
        
              I was wondering...
            </p>
          </div>
          <img src={cat1} alt="cat1" className="cat" />
          <button onClick={() => setStep(2)}>If...</button>
        </div>
      )}

      {/* --- Screen 2 --- */}
      {step === 2 && (
        <div className="screen slide-in">
          <div className="message">
            <p>If you will be my b*@ner? 💕</p>
          </div>
          <img src={cat2} alt="cat2" className="cat" />

          {/* Yes button (static) */}
          <div className="buttons">
            <button ref={yesRef} onClick={() => setStep(3)}>
              Yes 😍
            </button>
          </div>

          {/* No button (dodges) */}
          <button
            ref={noRef}
            className="no-btn"
            style={{
              position: "fixed",
              top: noPos.top,
              left: noPos.left,
            }}
            onMouseEnter={moveNo}
          >
            No 😭
          </button>
        </div>
      )}

      {/* --- Screen 3 --- */}
      {step === 3 && (
        <div className="screen slide-in">
          <div className="message">
            <p>
              Yay!! 🎉 <br /> I feel so lucky
            </p>
          </div>
          <img src={cat3} alt="cat3" className="cat jump" />
        </div>
      )}
    </div>
  );
}

export default App;
